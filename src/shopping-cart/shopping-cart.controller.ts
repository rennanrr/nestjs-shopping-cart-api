import { Controller, Get, Post, Body, Param, Query, Res, Response } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDTO } from './shopping-cart.dto';

@Controller('cart')
export class ShoppingCartController {
  constructor(private service: ShoppingCartService) { }

  @Get()
  public async getAll(@Query() reqParams: {id?: string, userId?: string}): Promise<ShoppingCartDTO[]> {
    return await this.service.getAll(reqParams);
  }

  @Post()
  public async post(@Body() dto: ShoppingCartDTO): Promise<ShoppingCartDTO> {
    return this.service.create(dto);
  }

}
