import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useCartContext } from "../../contexts/CartContext";

const Cart = ()=>{
    const {cart, total, addItemCart, removeItemCart} = useCartContext();

    
    return(
        <Container>
            <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>
            {cart.length <= 0 && 
                <div className="flex flex-col items-center justify-center">
                    <p className="font-medium">Seu carrinho está vazio</p>
                    <Link className="bg-slate-600 my-3 px-3 p-1 text-white font-medium rounded" to="/">Acessar produtos</Link>
                </div>
            }
            {cart && cart.map(item => (
                <section key={item.id} className="flex items-center justify-between border-b-2 border-gray-300">
                    <img
                        className="w-28"
                        src={item.cover} 
                        alt={item.title} 
                    />
                    <strong>
                        Preço: {item.price.toLocaleString('pt-br', {currency:"BRL", style:"currency"})}
                    </strong>
                    <div className="flex gap-3 items-center justify-center">
                        <button onClick={() => removeItemCart(item)} className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">-</button>
                        <span>{item.amount}</span>
                        <button onClick={() => addItemCart(item)} className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2">+</button>
                    </div>
                    <strong className="float-right">
                        Subtotal: {item.total.toLocaleString('pt-br', {style:"currency", currency:"BRL"})}
                    </strong>
                </section>
            ))}
            {cart.length > 0 &&
                <p className="font-bold mt-4">Total: {total}</p>
            }
        </Container>
    )
}

export default Cart;