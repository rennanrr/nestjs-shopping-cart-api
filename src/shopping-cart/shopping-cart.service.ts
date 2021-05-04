import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { Repository } from 'typeorm';
import { ShoppingCartDTO } from './shopping-cart.dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart) private readonly repo: Repository<ShoppingCart>,
  ) { }

  public async getAll(params: {id?:string, userId?: string}): Promise<ShoppingCartDTO[]> {
    try {
      const listFromRepo = await this.repo.find({ relations: ["products"], where:{...params} });
      const listFromDTO = await Promise.all(
        listFromRepo.map(async cart => 
          await ShoppingCartDTO.fromEntity(cart)
          )
        );
      return listFromDTO
    }
    catch(error) {
      return error;
    }
  }

  public async create(dto: ShoppingCartDTO): Promise<ShoppingCartDTO> {
    return this.repo.save(ShoppingCartDTO.toEntity(dto))
      .then(e => ShoppingCartDTO.fromEntity(e));
  }
}
