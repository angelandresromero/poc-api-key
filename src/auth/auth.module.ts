import { PassportModule } from "@nestjs/passport";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiKeyStrategy } from "./apiKey.strategy";
import { KeyModule } from "src/api-key/key.module";

@Module({
imports: [PassportModule, KeyModule],
providers: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}