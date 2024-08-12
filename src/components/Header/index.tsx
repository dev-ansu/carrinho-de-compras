import { Link } from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi"
import { useCartContext } from "../../contexts/CartContext";

const Header = ()=>{
    const {cartAmount} = useCartContext();
    
    return (
        <header className="w-full px-1 bg-slate-200">
            <nav className="w-full max-w-7xl h-14 px-5 mx-auto flex items-center justify-between">
                <Link className="font-bold text-2xl" to="/">DevShop</Link>

                <Link to="/cart" className="relative">
                    <FiShoppingCart size={24} color="#121212  " />
                    {cartAmount > 0 &&
                        <span className="text-white -right-3 -top-3 text-xs absolute px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center">
                            {cartAmount}
                        </span>
                    }
                </Link>
            </nav>
        </header>
    )
}

export default Header;