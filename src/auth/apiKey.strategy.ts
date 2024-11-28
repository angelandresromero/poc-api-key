import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { KeyService } from "src/api-key/key.service";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
    constructor(private readonly apiKeyService: KeyService) {
        super({ header: 'Authorization'}, false, async (apiKey: string, done) => {
            /**
             * On a jwt + api key combined strategy, this bypass the api key check when a jwt is received in Authorization header
             * Same should be done on the jwt strategy to bypass the jwt check if an api key is received
             */
            const isjJwt = apiKey.startsWith('Bearer eyJh') 
            console.log({context: 'strategy', isjJwt, apiKey})
            if (isjJwt) {
                return done(true);
            }
            const checkKey = await apiKeyService.validate(apiKey)
            console.log({context: 'strategy', apiKey, checkKey})
            if (!checkKey) {
                return done(false);
            }
            return done(true);
        })
    }
}