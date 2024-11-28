import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { KeyService } from "src/api-key/key.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private readonly apiKeyService: KeyService) {
        super({ header: 'Authorization'}, false, async (apiKey: string, done) => {
            const checkKey = await apiKeyService.validate(apiKey)
            console.log({context: 'strategy', apiKey, checkKey})
            if (!checkKey) {
                return done(false);
            }
            return done(true);
        })
    }
}