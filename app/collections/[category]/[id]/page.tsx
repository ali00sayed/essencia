import React from 'react';
import { collectionsData } from '@/lib/constants/Collections';
import ProductListPage from './ProductListPage';

type Category = keyof typeof collectionsData;

type Props = {
  params: {
    category: Category;
    id: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { category, id } = await params;
  return <ProductListPage id={id} category={category} />;
}
