import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCart } from './product-cart.entity';

@Entity({ name: 'shoppingCart' })
export class ShoppingCart extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { unique: true })
  userId: string;

  @OneToMany(() => ProductCart, (product: ProductCart) => product.cart)
  product: ProductCart[];
}