import { UsersModule } from '@/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
