import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsProps } from "../Home";
import { api } from "../../services/api";
import Container from "../../components/Container";
import { BsCartPlus } from "react-icons/bs";
import { useCartContext } from "../../contexts/CartContext";


const Product = ()=>{
    const {addItemCart} = useCartContext();
    const {id} = useParams();
    const [product, setProduct] = useState<ProductsProps>();

    useEffect(()=>{
        const getProduct = async()=>{
            const response:ProductsProps = await api.get(`/products/${id}`);
            setProduct(response.data);
        }
        getProduct();
    })
    
    return (
        <Container>
            {
                !product &&
                <h1 className="mt-4 text-center text-4xl font-bold">Item não encontrado</h1>
            }
            {product && 
                <div className="grid gap-4 items-center grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                    <div>
                        <img src={product?.cover} alt={product?.title} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold my-4">{product?.title}</h1>
                        <p>{product?.description}</p>
                        <div className="flex gap-3 items-center mt-4 mb-4">
                            <strong className="text-zinc-700/90">{product.price.toLocaleString('pt-br', {style:"currency", currency:"BRL"})}</strong>
                            <button onClick={() => addItemCart(product) } className="bg-zinc-900 p-1 rounded">
                                <BsCartPlus  size={20} color="#fff" />
                            </button>
                        </div>
                    </div>
                </div>
            }
        </Container>
    )
}

export default Product;