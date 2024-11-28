import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { KeyService } from "./key.service";
import { CreateApiKeyInput } from "./dto/create-api-key.input";

@Controller('key')
export class KeyController {
    constructor(private readonly keyService: KeyService) {}
    
    @Post()
    create(@Body() input: CreateApiKeyInput){
        return this.keyService.create(input);
    }

    @Get()
    async findMany(
        @Query('userId') userId: string
    ){
        return this.keyService.findMany(userId);
    }

    @Delete()
    async revoke(
        @Body() input: { id: string }
    ){
        return this.keyService.revoke(input.id);
    }


    @Post('validate') // this shouldnt be able to be called from the outside
    async validate(
      @Query('key') key: string
    ){
        return this.keyService.validate(key);
    }
}