import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartDTO } from './product-cart.dto';

@Controller('product')
export class ProductCartController {
  constructor(private service: ProductCartService) { }

  @Get()
  public async getAll(): Promise<ProductCartDTO[]> {
    return await this.service.getAll()
  }

  @Post()
  public async post(@Body() dto: ProductCartDTO): Promise<ProductCartDTO> {
    return this.service.create(dto);
  }

}