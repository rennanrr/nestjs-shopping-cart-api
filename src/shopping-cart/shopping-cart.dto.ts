import { ApiModelProperty } from '@nestjs/swagger';
import { IsObject, IsUUID, } from 'class-validator';
import { ProductCart } from '../entity/product-cart.entity';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { ProductCartDTO } from '../product-cart/product-cart.dto'

export class ShoppingCartDTO implements Readonly<ShoppingCartDTO> {
  @ApiModelProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiModelProperty({ required: true })
  @IsUUID()
  userId: string;

  @ApiModelProperty({ required: true })
  @IsObject()
  products: ProductCartDTO[];

  public static from(dto: Partial<ShoppingCartDTO>) {
    const it = new ShoppingCartDTO();
    it.id = dto.id;
    it.userId = dto.userId;
    it.products = dto.products;
    return it;
  }

  public static async fromEntity(entity: ShoppingCart) {
    const products = await Promise.all(
      entity.products.map(product => 
        ProductCartDTO.fromEntity(product)
      )
    );
    return this.from({
      id: entity.id,
      userId: entity.userId,
      products: products
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