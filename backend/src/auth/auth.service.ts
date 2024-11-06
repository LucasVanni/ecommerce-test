import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { LoginUserDto } from '../users/dto/users.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByLogin(loginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '2h',
      }),
    };
  }

  async recoveryPassword(email: string, recoveryLink: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    const payload = { email: user.email };
    const token = this.jwtService.sign(payload, {
      privateKey: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    // Enviar o token do usuário por e-mail
    await this.emailService.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      text: `Você solicitou a recuperação de senha. Clique no link a seguir para redefinir sua senha: ${recoveryLink}?token=${token}`,
      html: `<p>Você solicitou a recuperação de senha. Clique no link a seguir para redefinir sua senha:</p>
              <p><a href="${recoveryLink}?token=${token}">Redefinir Senha</a></p>`,
    });

    return {
      message: 'Token de recuperação de senha enviado para o e-mail',
      token,
    };
  }

  async resetPassword(token: string, password: string) {
    let email: string;

    try {
      const decoded = this.jwtService.decode(token);
      email = decoded.email;
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    return this.usersService.resetPassword(email, password);
  }
}
