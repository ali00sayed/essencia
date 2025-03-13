import { collectionsData } from '@/lib/constants/Collections';

export function generateStaticParams() {
  const params: Array<{ category: string; id: string }> = [];

  Object.entries(collectionsData).forEach(([category, data]) => {
    data.items.forEach(item => {
      params.push({
        category,
        id: item.id,
      });
    });
  });

  return params;
}

export default generateStaticParams;
