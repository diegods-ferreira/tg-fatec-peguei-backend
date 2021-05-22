import Order from '@modules/orders/infra/typeorm/entities/Order';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import User from '@modules/users/infra/typeorm/entities/User';
import { container } from 'tsyringe';
import { addDays } from 'date-fns';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';

function shuffleItems(items: any) {
  const shuffledItems = items;
  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledItems[i];
    shuffledItems[i] = shuffledItems[j];
    shuffledItems[j] = temp;
  }

  return shuffledItems;
}

function shuffleUsers(users: User[]): User[] {
  const shuffledUsers = users;
  for (let i = shuffledUsers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffledUsers[i];
    shuffledUsers[i] = shuffledUsers[j];
    shuffledUsers[j] = temp;
  }

  return shuffledUsers;
}

function getRandomItems(quantity: number, items: any) {
  const shuffledItems = shuffleItems(items);

  const itemsToReturn = [];
  for (let i = 0; i < (quantity === 0 ? 1 : quantity); i++) {
    itemsToReturn.push(shuffledItems[i]);
  }

  return itemsToReturn;
}

class OrdersSeed {
  async execute(users: User[]): Promise<Order[]> {
    const cadeiraGamer = {
      name: 'Cadeira Gamer MX5 Verde',
      quantity: 1,
      weight: 15,
      width: 53,
      height: 125,
      depth: 52,
      packing: 'Caixa de papelão com isopor',
      category_id: 9,
      weight_unit_id: 8,
      dimension_unit_id: 6,
      description: 'Cadeira Gamer ergonômica MX5 verde',
      image: 'seed-item-cadeira-gamer.jpg',
    };

    const kitCamisetas = {
      name: 'Kit 5 camisetas basic',
      quantity: 3,
      weight: 1,
      width: 35,
      height: 50,
      depth: 20,
      packing: 'Saco lacre',
      category_id: 7,
      weight_unit_id: 8,
      dimension_unit_id: 6,
      description: 'Kit camisetas masculinas tamanho M e G',
      image: 'seed-item-kit-camisetas.jpg',
    };

    const kitProdutosNatura = {
      name: 'Kit produtos Natura',
      quantity: 2,
      weight: 2,
      width: 50,
      height: 50,
      depth: 30,
      packing: 'Caixa de papelão',
      category_id: 10,
      weight_unit_id: 8,
      dimension_unit_id: 6,
      description: 'Kit cremes, perfumes e desodorantes Natura',
      image: 'seed-item-kit-produtos-natura.png',
    };

    const ps3 = {
      name: 'Playstation 3 usado',
      quantity: 1,
      weight: 2.1,
      width: 50,
      height: 20,
      depth: 15,
      packing: 'Caixa de papelão com isopor',
      category_id: 3,
      weight_unit_id: 8,
      dimension_unit_id: 6,
      description: 'Console playstation 3 usado',
      image: 'seed-item-ps3.png',
    };

    const tvLg40 = {
      name: 'TV LG 40 polegadas',
      quantity: 1,
      weight: 18.9,
      width: 122,
      height: 70.6,
      depth: 4.7,
      packing: 'Caixa de papelão com isopor',
      category_id: 5,
      weight_unit_id: 8,
      dimension_unit_id: 6,
      description: 'Smart TV LG AI ThinQ OLED55CXPSA 4K 55" 100V/240V',
      image: 'seed-item-tv-lg-40.jpg',
    };

    const items = [cadeiraGamer, kitCamisetas, kitProdutosNatura, ps3, tvLg40];

    const americanasPindaSP = {
      name: 'Americanas',
      address: 'R. dos Andradas, 463 - Centro',
      city: 'Pindamonhangaba',
      state: 'SP',
      latitude: -22.924807365216935,
      longitude: -45.46439595979104,
    };

    const taubateShopping = {
      name: 'Taubaté Shopping',
      address: 'Av. Charles Schnneider, 1700 - Vila Costa',
      city: 'Taubaté',
      state: 'SP',
      latitude: -23.022496704867468,
      longitude: -45.58190583095397,
    };

    const shoppingPatioPinda = {
      name: 'Shopping Patio Pinda',
      address:
        'R. Alcides Ramos Nogueira, 650 - Nossa Sra. do Perpetuo Socorro',
      city: 'Pindamonhangaba',
      state: 'SP',
      latitude: -22.946801166514067,
      longitude: -45.481220688626024,
    };

    const kalungaSaoJose = {
      name: 'Kalunga',
      address: 'Av. Dep. Benedito Matarazzo, 9403 - Jardim Oswaldo Cruz',
      city: 'São José dos Campos',
      state: 'SP',
      latitude: -23.199633279641358,
      longitude: -45.88167582622675,
    };

    const centerValeShoppingSaoJose = {
      name: 'CenterVale Shopping',
      address: 'Av. Dep. Benedito Matarazzo, 9403 - Jardim Oswaldo Cruz',
      city: 'São José dos Campos',
      state: 'SP',
      latitude: -23.19939105887748,
      longitude: -45.88137560153074,
    };

    const establishments = [
      americanasPindaSP,
      taubateShopping,
      shoppingPatioPinda,
      kalungaSaoJose,
      centerValeShoppingSaoJose,
    ];

    const array = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
    ];

    const createOrder = container.resolve(CreateOrderService);

    const createOrderPromises = array.map(async () => {
      const randomNumber = Math.floor(Math.random() * 5);
      const usersRandomNumber = Math.floor(Math.random() * 10);
      const shuffledUsers = shuffleUsers(users);

      const order = await createOrder.execute({
        requester_id: shuffledUsers[usersRandomNumber].id,
        pickup_date: addDays(new Date(), randomNumber),
        pickup_establishment: establishments[randomNumber].name,
        pickup_address: establishments[randomNumber].address,
        pickup_city: establishments[randomNumber].city,
        pickup_state: establishments[randomNumber].state,
        pickup_latitude: establishments[randomNumber].latitude,
        pickup_longitude: establishments[randomNumber].longitude,
        delivery_address: shuffledUsers[usersRandomNumber].address,
        delivery_city: shuffledUsers[usersRandomNumber].city,
        delivery_state: shuffledUsers[usersRandomNumber].state,
        items: getRandomItems(randomNumber, items),
      });

      return order;
    });

    const orders = Promise.all(createOrderPromises);

    const updateOrder = container.resolve(UpdateOrderService);

    const updateOrderPromises = (await orders).map(async order => {
      const updatedOrder = await updateOrder.execute({
        delivery_address: order.delivery_address,
        delivery_city: order.delivery_city,
        delivery_state: order.delivery_state,
        id: order.id,
        pickup_address: order.pickup_address,
        pickup_city: order.pickup_city,
        pickup_date: order.pickup_date,
        pickup_establishment: order.pickup_establishment,
        pickup_latitude: order.pickup_latitude,
        pickup_longitude: order.pickup_longitude,
        pickup_state: order.pickup_state,
        requester_id: order.requester_id,
        purchase_invoice: 'seed-order-purchase-invoice.pdf',
      });

      return updatedOrder;
    });

    const updatedOrders = Promise.all(updateOrderPromises);

    return updatedOrders;
  }
}

export default OrdersSeed;
