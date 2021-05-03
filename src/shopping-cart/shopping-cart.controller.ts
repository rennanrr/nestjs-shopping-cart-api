import { Controller, Get, Post, Body } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDTO } from './shopping-cart.dto';

@Controller('cart')
export class ShoppingCartController {
  constructor(private service: ShoppingCartService) { }

  @Get()
  public async getAll(): Promise<ShoppingCartDTO[]> {
    return await this.service.getAll()
  }

  @Post()
  public async post(@Body() dto: ShoppingCartDTO): Promise<ShoppingCartDTO> {
    return this.service.create(dto);
  }

}
