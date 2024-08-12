import { createBrowserRouter, Link } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import Product from "./pages/Product";
import Container from "./components/Container";
import Header from "./components/Header";

export const routes = createBrowserRouter([
    {
        element:<Layout />, //Layout
        children:[
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/cart",
                element: <Cart />
            },
            {
                path:"/product/:id",
                element:<Product />
            }
        ]
    },
    {
        path:"*",
        element:
        <>
            <Header />
            <Container>
                <div className="flex flex-col justify-center items-center mt-8">
                    <h1 className="text-3xl font-bold text-center">404 - Página não encontrada</h1>
                    <Link to="/" className="bg-zinc-900 p-1 rounded text-white mt-4 mb-4">Voltar para página inicial</Link>
                </div>
            </Container>,
        </>
    }
]);