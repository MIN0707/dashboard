'use server';

import { revalidatePath } from 'next/cache';
import { Product, User } from './models';
import { connectToDb } from './utils';
import { redirect } from 'next/dist/server/api-utils';
import bcrypt from 'bcrypt';

export async function addUser(formData) {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const salt = await bcrypt.getSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function addProduct(formData) {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      color,
      size,
    });
    await newProduct.save();
  } catch (err) {
    console.log(err);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}
