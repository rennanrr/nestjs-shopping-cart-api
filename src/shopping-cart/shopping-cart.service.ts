import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { ShoppingCartDTO } from './shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart) private readonly repo: Repository<ShoppingCart>,
  ) { }

  public async getAll(): Promise<ShoppingCartDTO[]> {
    return await this.repo.find()
      .then(carts => carts.map(e => ShoppingCartDTO.fromEntity(e)));
  }

  public async create(dto: ShoppingCartDTO): Promise<ShoppingCartDTO> {
    return this.repo.save(ShoppingCartDTO.toEntity(dto))
      .then(e => ShoppingCartDTO.fromEntity(e));
  }
}
