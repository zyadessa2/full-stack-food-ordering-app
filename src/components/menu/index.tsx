
import MenuItem from "./MenuItem"
import { ProductWithRelation } from "@/types/product"

const Menu = ({items} : {items : ProductWithRelation[]}) => {
  return items.length > 0?(
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {items.map((item)=>(
                    <MenuItem key={item.id} item={item}/>
                ))}
            </ul>
  ):(
    <p className="text-red-500 text-center">No Product Found</p>
  )
}

export default Menu