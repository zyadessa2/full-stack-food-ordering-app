import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelation } from "@/types/product";

const MenuItem = ({item} : {item : ProductWithRelation}) => {
  return (
    <li key={item.id}>
      <div className="relative w-48 h-48 mx-auto">
        <Image src={item.image} className="object-cover" alt={item.name} fill />
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4>{item.name}</h4>
        <strong className="text-accent">
          {formatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
      <AddToCartButton item={item}/>
    </li>
  );
};

export default MenuItem;
