'use server';

import { revalidatePath } from 'next/cache';
import { Product, User } from './models';
import { connectToDb } from './utils';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

export async function addUser(formData) {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const salt = await bcrypt.genSalt(10);
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
  const { title, cat, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const newProduct = new Product({
      title,
      cat,
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

export async function updateUser(formData) {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        updateFields[key] === '' || (undefined && delete updateFields[key]),
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function updateProduct(formData) {
  const { id, title, cat, desc, price, stock, color, size } =
    Object.fromEntries(formData);
  try {
    connectToDb();
    const updateFields = {
      title,
      cat,
      desc,
      price,
      stock,
      color,
      size,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        updateFields[key] === '' || (undefined && delete updateFields[key]),
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteUser(formData) {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  revalidatePath('/dashboard/user');
}

export async function deleteProduct(formData) {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  revalidatePath('/dashboard/products');
}
