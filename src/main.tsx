import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CartProvider} from "./contexts/CartContext.tsx";
import {Toaster} from "react-hot-toast"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster position='bottom-center' reverseOrder={false} />
      <App />
    </CartProvider>
  </StrictMode>,
)
