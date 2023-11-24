import { NextApiRequest, NextApiResponse } from 'next';
import { CartProductStateProps } from 'types/cart';

let latestProducts: CartProductStateProps[];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { id, quantity, products } = req.body;
  // result = filter(products, { itemId: id });
  // subtotal = quantity! * result[0].offerPrice;
  // oldSubTotal = 0;

  // latestProducts = products.map((item: ProductCardProps) => {
  //   if (id === item.itemId) {
  //     oldSubTotal = item.quantity * (item.offerPrice || 0);
  //     return { ...item, quantity: quantity! };
  //   }
  //   return item;
  // });
  return res.status(200).json({ products: latestProducts, oldSubTotal: 0, subtotal: 0 });
}
