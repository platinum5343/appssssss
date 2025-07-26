import { Stack } from "expo-router";
import './globals.css';
import { CartProvider } from './context/CartContext';
import {  TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native';

export default function RootLayout() {
    return (
        <CartProvider>
            <SafeAreaView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{
                    title: 'Products',
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/cart')}>
                            <Text style={{ marginRight: 10 }}>Cart</Text>
                        </TouchableOpacity>
                    ),
                }} />
                <Stack.Screen name="product-details" options={{
                    title: 'Product Details',
                }} />
                <Stack.Screen name="cart" options={{
                    title: 'Cart',
                }} />
            </Stack>
                </SafeAreaView >
        </CartProvider>
    );
}
