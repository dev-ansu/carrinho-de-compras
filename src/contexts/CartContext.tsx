import {ReactNode, createContext, useContext, useState} from "react"
import { ProductsProps } from "../pages/Home"
import {toast} from "react-hot-toast"

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps)=> void,
    total: string;
    removeItemCart: (product: ProductsProps) => void,
}

interface CartProps extends ProductsProps{
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}

export const CartContext = createContext({} as CartContextData) 


export const CartProvider = ({children}: CartProviderProps)=>{
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("")
    
    const addItemCart = (newItem: ProductsProps)=>{
        const indexItem = cart.findIndex( item => item.id == newItem.id);
        if(indexItem !== -1){
            // se entrou aqui apenas adicionamos mais um quantidade
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].price * cartList[indexItem].amount;
            setCart(cartList);
            totalResultCart(cartList);
        toast.success("Item adicionado ao carrinho")

            return;
        }else{
            let data = {
                ...newItem,
                amount: 1,
                total: newItem.price,
            }
            setCart(products => [...products, data])
            totalResultCart([...cart, data])
        }
        toast.success("Item adicionado ao carrinho")
    }

    const removeItemCart = (product: ProductsProps)=>{
        const indexItem = cart.findIndex( item => item.id == product.id);

        if(cart[indexItem]?.amount > 1){
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].price * cartList[indexItem].amount;
            setCart(cartList);
            totalResultCart(cartList);
            toast.success("Item removido do carrinho")
            
            return;
        }

        const removeItem = cart.filter(item => item.id != product.id);
        toast.success("Item removido do carrinho")
        setCart(removeItem);
    }

    const totalResultCart = (items: CartProps[])=>{
        let myCart = items;
        let result:number = myCart.reduce((acc, obj)=> { return acc + obj.total}, 0)
        setTotal(result.toLocaleString('pt-br', {style:'currency', currency:'BRL'}))
    }

    return(
        <CartContext.Provider value={{ 
            cart,
            cartAmount: cart.length,
            addItemCart,
            total,
            removeItemCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCartContext = ():CartContextData=>{
    const context = useContext(CartContext)
    if(context === undefined){
        throw new Error('useCartContext must be abled within a CartProvider')
    }
    return context;
};