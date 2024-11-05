import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { LoginUserDto } from '../../src/users/dto/users.dto';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [],
          synchronize: true,
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'token' }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should return a token when logging in', async () => {
    const loginUserDto: LoginUserDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const result = await authController.login(loginUserDto);
    expect(result).toEqual({ access_token: 'token' });
  });
});
