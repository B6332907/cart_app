import { createContext, useReducer, useContext, useEffect } from "react";
import products from "../data/products";
import CartReducer from "../reducer/CartReducer";
const CartContext = createContext()

const initState = (props) => {
    const {cart} = props
    return {
        products: cart,
        total: 0,
        amount: 0
    };
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CartReducer, initState)

    useEffect(() => {
        dispatch({ type: "CALCULATE_TOTAL" })
    }, [state.products])

    function formatMoney(money) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function addQuantity(id) {
        dispatch({ type: "ADD", payload: id })

    }

    function subTractQuantity(id) {
        dispatch({ type: "SUPTRACT", payload: id })
    }

    function removeItem(id) {
        dispatch({ type: "REMOVE", payload: id })
    }
    return (
        <CartContext.Provider value={{ ...state, formatMoney, removeItem, addQuantity, subTractQuantity }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    return useContext(CartContext)
}