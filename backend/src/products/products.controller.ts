import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../decorators/public.decorator';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  getAllProducts(
    @Query('limit') limit: number = 30,
    @Query('skip') skip: number = 0,
  ) {
    return this.productsService.getAllProducts(limit, skip);
  }

  @Get(':id')
  getProductById(@Param('id') id: number) {
    return this.productsService.getProductById(id);
  }

  @Get('search')
  searchProducts(@Query('q') query: string) {
    return this.productsService.searchProducts(query);
  }

  @Get('categories')
  getAllCategories() {
    return this.productsService.getAllCategories();
  }

  @Get('category-list')
  getCategoryList() {
    return this.productsService.getCategoryList();
  }

  @Get('category/:category')
  getProductsByCategory(@Param('category') category: string) {
    return this.productsService.getProductsByCategory(category);
  }

  @Get('pagination')
  getProductsWithPagination(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('select') select: string,
  ) {
    return this.productsService.getProductsWithPagination(limit, skip, select);
  }

  @Get('sort')
  sortProducts(
    @Query('sortBy') sortBy: string,
    @Query('order') order: 'asc' | 'desc',
  ) {
    return this.productsService.sortProducts(sortBy, order);
  }

  @Post()
  addProduct(@Body() product: any) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: number, @Body() product: any) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
