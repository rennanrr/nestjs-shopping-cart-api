import { createConnection, ConnectionOptions } from 'typeorm';
import * as _ from 'lodash';
import { configService } from '../config/config.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../entity/shopping-cart.entity';
import { ShoppingCartDTO } from '../shopping-cart/shopping-cart.dto';
import { ProductCartService } from '../shopping-cart/product-cart/product-cart.service';
import { ProductCart } from '../entity/product-cart.entity';
import { ProductCartDTO } from '../shopping-cart/product-cart/product-cart.dto';

async function run() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const cartService = new ShoppingCartService(connection.getRepository(ShoppingCart));
  const productService = new ProductCartService(connection.getRepository(ProductCart));
  const work = _.range(21, 31)
  .map(iterator => 
    ShoppingCartDTO.from({
      userId:`f38f2e4e-017c-4bb0-8733-ebfe63676e${iterator}`
    })
  )
  .map(cartDTO => 
    cartService.create(cartDTO).then(cart => {
      console.log('Shopping Car added', cart.id);
      return cart
    })
  ).map(async cart => {
    productService.create(
      ProductCartDTO.from({
        cartId: (await cart).id,
        price: Math.random() * 10,
        quantity: Math.floor(Math.random() * 10)
      })
    )
  })

  return await Promise.all(work);
}

run()
  .then(response => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));