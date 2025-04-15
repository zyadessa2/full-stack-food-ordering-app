import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";


export const getProductsByCategory = cache(
  () => {
    const products = db.category.findMany({
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
    return products;
  },
  ["products-by-category"],
  { revalidate: 3600 }
);

export const getBestSellers = cache(
  (limit?: number | undefined) => {
  const bestSallers =  db.product.findMany({
    where:{
      orders:{
        some:{} // هاتلى المنتجات الى فيها على الاقل اوردر واحد
      }
    },
    orderBy:{
      orders:{
        _count:'desc', // رتبلى المنتجات 
      }
    },
    include: {
      sizes: true,
      extras: true,
    },
    take: limit, // هاتلى ليمت معين لحد 
  });
  return bestSallers;
} , ["best-sellers"], {revalidate : 3600}) 
