import { ApiModelProperty } from '@nestjs/swagger';
import { IsObject, IsUUID, } from 'class-validator';
import { ProductCart } from '../entity/product-cart.entity';
import { ShoppingCart } from '../entity/shopping-cart.entity';

export class ShoppingCartDTO implements Readonly<ShoppingCartDTO> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsUUID()
  userId: string;

  @ApiModelProperty({ required: true })
  @IsObject()
  product: ProductCart[];

  public static from(dto: Partial<ShoppingCartDTO>) {
    const it = new ShoppingCartDTO();
    it.id = dto.id;
    it.userId = dto.userId;
    return it;
  }

  public static fromEntity(entity: ShoppingCart) {
    return this.from({
      id: entity.id,
      userId: entity.userId,
      product: entity.products
    });
  }

  public static toEntity(dto: Partial<ShoppingCartDTO>) {
    const it = new ShoppingCart();
    it.id = dto.id;
    it.userId = dto.userId;
    it.createDateTime = new Date();
    it.createdBy = dto.userId;
    it.lastChangedBy = dto.userId;
    return it;
  }
}