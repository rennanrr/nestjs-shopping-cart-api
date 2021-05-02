import { ApiModelProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsObject, IsUUID, } from 'class-validator';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { ProductCart } from '../entities/product-cart.entity';

export class ProductCartDTO implements Readonly<ProductCartDTO> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsObject()
  cart: ShoppingCart;

  @ApiModelProperty({ required: true })
  @IsUUID()
  productId: string;

  @ApiModelProperty({ required: true })
  @IsDecimal()
  quantity: number;

  @ApiModelProperty({ required: true })
  @IsNumber()
  price: number;

  public static from(dto: Partial<ProductCartDTO>) {
    const it = new ProductCartDTO();
    it.id = dto.id;
    it.cart = dto.cart;
    it.price = dto.price;
    it.productId = dto.productId;
    it.quantity = dto.quantity;
    return it;
  }

  public static fromEntity(entity: ProductCart) {
    return this.from({
      id: entity.id,
      cart: entity.cart,
      price: entity.price,
      productId: entity.productId,
      quantity: entity.quantity
    });
  }

  public static toEntity(dto: Partial<ProductCartDTO>) {
    const it = new ProductCart();
    it.id = dto.id;
    it.cart = dto.cart;
    it.price = dto.price;
    it.productId = dto.productId;
    it.quantity = dto.quantity;
    it.createDateTime = new Date();
    return it;
  }
}