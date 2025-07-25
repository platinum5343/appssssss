import React, { createContext, useState } from 'react';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

interface CartContextProps {
    children: React.ReactNode;
}

interface CartContextValue {
    cart: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: CartContextProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addItemToCart = (item: CartItem) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
            );
        } else {
            setCart([...cart, item]);
        }
    };

    const removeItemFromCart = (item: CartItem) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);
        if (existingItem && existingItem.quantity > 1) {
            setCart(
                cart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            );
        } else {
            setCart(cart.filter((cartItem) => cartItem.id !== item.id));
        }
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };