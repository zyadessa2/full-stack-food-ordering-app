import Menu from '@/components/menu';
import { getProductsByCategory } from '@/server/db/products';
import React from 'react'

 const MenuPage = async() => {
    
    const categorites = await getProductsByCategory();
  return (
    <main>
       {categorites.length > 0 ? (
        categorites.map((category) => (
          <section key={category.id} className="section-gap">
            <div className="container text-center">
              <h1 className="text-primary font-bold text-4xl italic mb-6">
                {category.name}
              </h1>
              <Menu items={category.products} />
            </div>
          </section>
        ))
      ) : (
        <p className="text-accent text-center py-20">
          there is no items
        </p>
      )}
    </main>
  )
}

export default MenuPage