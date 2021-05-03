import { ApiModelProperty } from '@nestjs/swagger';
import { IsDecimal, IsNumber, IsObject, IsUUID, } from 'class-validator';
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

  @ApiModelProperty()
  @IsDecimal()
  totalQuantity: number;

  @ApiModelProperty()
  @IsNumber()
  totalPrice: number;

  public static from(dto: Partial<ShoppingCartDTO>) {
    const it = new ShoppingCartDTO();
    it.id = dto.id;
    it.userId = dto.userId;
    it.products = dto.products;
    it.totalPrice = dto.totalPrice;
    it.totalQuantity = dto.totalQuantity;
    return it;
  }

  public static async fromEntity(entity: ShoppingCart) {
    let totalQuantity = 0;
    let totalPrice = 0;
    const products = await Promise.all(
      entity.products.map(product => {
        totalQuantity +=  product.quantity;
        totalPrice += product.quantity * product.price;
        return ProductCartDTO.fromEntity(product)
        }
      )
    );
    return this.from({
      id: entity.id,
      userId: entity.userId,
      products: products,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      totalQuantity: totalQuantity
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