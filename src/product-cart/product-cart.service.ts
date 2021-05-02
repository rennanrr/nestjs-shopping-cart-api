import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCartDTO } from './product-cart.dto';
import { ProductCart } from '../entity/product-cart.entity';

@Injectable()
export class ProductCartService {
  constructor(
    @InjectRepository(ProductCart) private readonly repo: Repository<ProductCart>,
  ) { }

  public async getAll(): Promise<ProductCartDTO[]> {
    return await this.repo.find()
      .then(carts => carts.map(e => ProductCartDTO.fromEntity(e)));
  }

  public async create(dto: ProductCartDTO): Promise<ProductCartDTO> {
    return this.repo.save(ProductCartDTO.toEntity(dto))
      .then(e => ProductCartDTO.fromEntity(e));
  }
}
