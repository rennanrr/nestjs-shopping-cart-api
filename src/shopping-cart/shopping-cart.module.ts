import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCartService } from './product-cart/product-cart.service';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductCart } from '../entity/product-cart.entity';
import { ProductCartController } from './product-cart/product-cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart, ProductCart])],
  providers: [ShoppingCartService, ProductCartService],
  controllers: [ShoppingCartController, ProductCartController],
  exports: []
})
export class ShoppingCartModule { }
