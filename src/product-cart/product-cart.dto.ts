import { ApiModelProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsObject, IsString, IsUUID, } from 'class-validator';
import { ProductCart } from '../entity/product-cart.entity';
import { ShoppingCart } from '../entity/shopping-cart.entity';

export class ProductCartDTO implements Readonly<ProductCartDTO> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsString()
  cartId: string;

  @ApiModelProperty({ required: true })
  @IsDecimal()
  quantity: number;

  @ApiModelProperty({ required: true })
  @IsNumber()
  price: number;

  public static from(dto: Partial<ProductCartDTO>) {
    const it = new ProductCartDTO();
    it.id = dto.id;
    it.cartId = dto.cartId;
    it.price = dto.price;
    it.quantity = dto.quantity;
    return it;
  }

  public static async fromEntity(entity: ProductCart) {
    return this.from({
      id: entity.id,
      price: entity.price,
      quantity: entity.quantity
    });
  }

  public static toEntity(dto: Partial<ProductCartDTO>) {
    const it = new ProductCart();
    it.id = dto.id;
    //it.cart = {id: dto.cartId};
    it.price = dto.price;
    it.quantity = dto.quantity;
    it.createDateTime = new Date();
    return it;
  }
}