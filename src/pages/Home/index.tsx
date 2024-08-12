import {BsCartPlus} from "react-icons/bs"
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useCartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

export interface ProductsProps{
    id:number; 
    title: string;
    description: string;
    price:number;
    cover: string;
}

const Home = ()=>{
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const {addItemCart} = useCartContext();

    useEffect(()=>{
        const getProducts = async()=>{
            const response = await api.get("/products");
            setProducts(response.data);
        }
        getProducts();
    },[])


    const handleAddCartItem = (product: ProductsProps)=>{
        addItemCart(product);    
    }

    return (
        <div>
            <Container>
                <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Produtos em alta</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
                    {products && products.map(product => (
                        <Link to={`/product/${product.id}`}>
                            <section key={product.id} className="w-full ">
                                <img  
                                className="w-full rounded-lg max-h-70 mb-2"
                                src={product.cover}
                                alt={product.title} />
                                <p className="font-medium mt-1 mb-2">{product.title}</p>
                                <div className="flex gap-3 items-center">
                                    <strong className="text-zinc-700/90">{product.price.toLocaleString('pt-br', {style:"currency", currency:"BRL"})}</strong>
                                    <button onClick={()=> handleAddCartItem(product)} className="bg-zinc-900 p-1 rounded">
                                        <BsCartPlus  size={20} color="#fff" />
                                    </button>
                                </div>
                            </section>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;