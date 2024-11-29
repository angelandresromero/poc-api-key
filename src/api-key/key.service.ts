import { InjectRepository } from "@nestjs/typeorm";
import { KeyEntity } from "./entity/key.entity";
import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { randomBytes, pbkdf2Sync } from "crypto";
import { CreateApiKeyInput } from "./dto/create-api-key.input";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";

@Injectable()
export class KeyService {
  private readonly MAGIC_SALT = 'salt';
  constructor
  (@InjectRepository(KeyEntity) private keyRepository: Repository<KeyEntity>,
  @Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async create(input: CreateApiKeyInput) {
    const apiKey = this.generateApiKey();
    const hashedKey = this.hashApiKey(apiKey);

    const keyInput = {
      ...input,
      key: hashedKey
    }
    const newKey: Omit<KeyEntity, 'id'> = this.keyRepository.create(keyInput);

    try {
      await this.keyRepository.save(newKey);
    } catch (error) {
      if (error.code === '23505') { // POSTGRES UNIQUE CONSTRAINT ERROR
        return this.create(input);
      }
      throw error;
    }

    return { apiKey }
  }

  async findMany(userId: string) {
    return this.keyRepository.find({ where:  {userId}, select: ['id', 'name', 'createdAt', 'revoked', 'expirationDate'] });
  }

  async validate(rawKey: string): Promise<boolean> {
    const hashedKey = this.hashApiKey(rawKey);
    let key: KeyEntity;
    key = await this.getChachedKey(hashedKey);
    if (!key){
      key = await this.keyRepository.findOne({ where: { key: hashedKey } });
      // maybe a calculated ttl is not as good as a fixed value
      await this.cacheManager.set(hashedKey, key, this.calculateTTL(key.expirationDate));
    } 
    return this.isActiveKey(key)
  }

  async revoke(id: string) {
    return (await this.keyRepository.update(id, { revoked: true }))?.affected;
  }

  private generateApiKey(): string {
    return 'cts_' + randomBytes(32).toString('hex');
  }

  private hashApiKey(apiKey: string): string {
    return pbkdf2Sync(apiKey, this.MAGIC_SALT, 1000, 64, 'sha512').toString('hex');
  }

  async getChachedKey(key: string): Promise<KeyEntity> {
    return this.cacheManager.get(key);
  }

  isActiveKey(key: KeyEntity): boolean {
    if (key && !key.revoked) {
      if (key.expirationDate && new Date() > key.expirationDate) {
          return false; // The key has expired
      }
      return true;
    }

    return false; // The key has expired
  }

  calculateTTL(expirationDate: Date) {
    return Math.floor((expirationDate.getTime() - new Date().getTime()) / 1000);
  }
}