import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, applyDecorators, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as passport from 'passport';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    return new Promise((resolve, reject) => {
      passport.authenticate('headerapikey', {
        session: false }, 
        value => {
        if (!value) {
          return reject(new UnauthorizedException('Invalid API Key'));
        }
        resolve(true);
      })(req);
    });
  }
}

export function RequireApiKey() {
    return applyDecorators(UseGuards(ApiKeyGuard));
  }