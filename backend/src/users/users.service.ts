import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { LoginUserDto } from './dto/users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(private entityManager: EntityManager) {}

  async create(email: string, password: string): Promise<User> {
    const userExists = await this.entityManager.findOne(User, {
      where: { email },
    });
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user = this.entityManager.create(User, { email, password });
    return this.entityManager.save(user);
  }

  async findByLogin(loginUserDto: LoginUserDto): Promise<User | undefined> {
    const user = await this.findByEmail(loginUserDto.email);
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      return user;
    }
    return undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.entityManager.findOne(User, { where: { email } });
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.password);
  }
}
