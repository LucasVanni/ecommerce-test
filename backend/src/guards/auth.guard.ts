import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    // Se a rota for pública, permite o acesso
    if (isPublic) {
      return true;
    }

    // Aqui você pode adicionar sua lógica de autenticação
    const apiKey = request.headers['api_key'];
    return apiKey === process.env.API_KEY;
  }
}
