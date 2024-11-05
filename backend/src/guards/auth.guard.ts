import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
    const token = request.headers['token'];

    if (!token) {
      throw new UnauthorizedException();
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || typeof decodedToken === 'string') {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findByEmail(decodedToken.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
