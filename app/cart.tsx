import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from './context/CartContext';

const Cart = () => {
    const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext)!;

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    return (
        <View style={styles.container}>
            {cart.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Add a product to cart</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemPrice}>${item.price}</Text>
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => removeItemFromCart(item)}>
                                        <Text style={styles.quantityButton}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                                    <TouchableOpacity onPress={() => addItemToCart({ ...item, quantity: 1 })}>
                                        <Text style={styles.quantityButton}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total:</Text>
                        <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
                    </View>
                </>
            )}
            <TouchableOpacity
                style={[styles.checkoutButton, cart.length === 0 && styles.disabledButton]}
                disabled={cart.length === 0}
                onPress={() => alert('Order placed successfully!')}
            >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#666',
    },
    cartItem: {
        marginBottom: 20,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#666',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemQuantity: {
        fontSize: 16,
        color: '#666',
        marginHorizontal: 10,
    },
    quantityButton: {
        fontSize: 18,
        color: 'blue',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Cart;