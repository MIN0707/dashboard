import { User } from './models';
import { connectToDb } from './utils';

export async function fetchUsers(q) {
  const regex = new RegExp(q, 'i');
  try {
    connectToDb();
    const users = await User.find({
      username: { $regex: regex },
    });
    return users;
  } catch (err) {
    console.log(err);
  }
}
