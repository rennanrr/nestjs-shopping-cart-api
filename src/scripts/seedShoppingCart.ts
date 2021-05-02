import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../entities/shopping-cart.entity';
import { ShoppingCartDTO } from '../shopping-cart/shopping-cart.dto';

async function run() {

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const itemService = new ShoppingCartService(connection.getRepository(ShoppingCart));

  const work = async () => {
    const cartExemple1 = 
    ShoppingCartDTO.from({
      userId: "9a1ae580-ab8d-11eb-bcbc-0242ac130002"
    });
    itemService.create(cartExemple1);
    const cartExemple2 = 
    ShoppingCartDTO.from({
      userId: "a0ca5bf4-ab8d-11eb-bcbc-0242ac130002"
    });
    itemService.create(cartExemple2);
  }
  return work;

}

run()
  .then(() => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));