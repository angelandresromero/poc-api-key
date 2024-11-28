export class CreateApiKeyInput {
    name: string;
    userId: string;
    expirationDate?: Date;
}