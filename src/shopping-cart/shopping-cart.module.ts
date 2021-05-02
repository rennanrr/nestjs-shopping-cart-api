import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartService } from '../product-cart/product-cart.service';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductCart } from '../entities/product-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, ProductCart])],
  providers: [ShoppingCartService, ProductCartService],
  controllers: [ShoppingCartController],
  exports: []
})
export class ShoppingCartModule { }
