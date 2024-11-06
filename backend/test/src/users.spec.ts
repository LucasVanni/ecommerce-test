import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../../src/users/dto/user.dto';
import { UsersController } from '../../src/users/users.controller';
import { User } from '../../src/users/users.entity';
import { UsersService } from '../../src/users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue({ email: 'test@example.com' }),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'test',
    };
    const result = await usersController.register(createUserDto);
    expect(result).toEqual({ email: 'test@example.com' });
  });

  it('should throw an error if user already exists', async () => {
    jest
      .spyOn(usersService, 'create')
      .mockRejectedValue(new Error('User already exists'));

    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'test',
    };

    await expect(usersController.register(createUserDto)).rejects.toThrow(
      'User already exists',
    );
  });
});
