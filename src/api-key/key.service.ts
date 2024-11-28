import { InjectRepository } from "@nestjs/typeorm";
import { KeyEntity } from "./entity/key.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { randomBytes, pbkdf2Sync } from "crypto";
import { CreateApiKeyInput } from "./dto/create-api-key.input";

@Injectable()
export class KeyService {
  private readonly MAGIC_SALT = 'salt';
  constructor(@InjectRepository(KeyEntity) private keyRepository: Repository<KeyEntity>) { }

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
      if (error.code === '23505') { // Código de error para violación de unicidad en PostgreSQL
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
    console.log(rawKey)
    const hashedKey = this.hashApiKey(rawKey);
    const keyEntity = await this.keyRepository.findOne({ where: { key: hashedKey } });
    
    if (keyEntity && !keyEntity.revoked) {
        if (keyEntity.expirationDate && new Date() > keyEntity.expirationDate) {
            return false;  // The key has expired
        }
        return true;
    }
    return false;
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
}