import { Product, User } from './models';
import { connectToDb } from './utils';

export async function fetchUsers(q, page) {
  const regex = new RegExp(q, 'i');

  const ITEM_PER_PAGE = 2;

  try {
    connectToDb();
    const count = await User.find({
      username: { $regex: regex },
    }).count();

    const users = await User.find({
      username: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, users };
  } catch (err) {
    console.log(err);
  }
}

export async function fetchProducts(q, page) {
  const regex = new RegExp(q, 'i');

  const ITEM_PER_PAGE = 2;

  try {
    connectToDb();
    const count = await Product.find({
      title: { $regex: regex },
    }).count();

    const products = await Product.find({
      title: { $regex: regex },
    })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));

    return { count, products };
  } catch (err) {
    console.log(err);
  }
}
