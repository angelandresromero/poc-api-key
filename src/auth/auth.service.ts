import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  validateApiKey(apiKey: string): boolean {
    return apiKey === process.env.API_KEY;
  }
}