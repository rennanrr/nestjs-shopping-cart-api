import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ShoppingCart } from './shopping-cart.entity';

@Entity({ name: 'product' })
export class ProductCart extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => ShoppingCart, (shoppingCart: ShoppingCart) => shoppingCart.id)
  cartId: ShoppingCart;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  price: number;

  @Column({ type: 'integer', default: 1 })
  quantity: number;
}