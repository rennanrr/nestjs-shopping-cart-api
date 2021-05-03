import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ProductCartService } from './product-cart.service';
import { ProductCartDTO } from './product-cart.dto';
import { DeleteResult } from 'typeorm';

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

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<DeleteResult> {
    console.log(id);
    return this.service.delete(id);
  }

}