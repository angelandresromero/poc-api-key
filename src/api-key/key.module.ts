import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KeyEntity } from "./entity/key.entity";
import { KeyService } from "./key.service";
import { KeyController } from "./key.controller";

@Module({
    imports: [TypeOrmModule.forFeature([KeyEntity])],
    providers: [KeyService],
    controllers: [KeyController]
})
export class KeyModule {}