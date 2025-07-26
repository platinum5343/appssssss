import { Stack } from "expo-router";
import './globals.css';
import { CartProvider } from './context/CartContext';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
    return (
        <CartProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            title: 'Products',
                            headerRight: () => (
                                <TouchableOpacity
                                    style={{ marginRight: 10, flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => router.push('/cart')}
                                >
                                    <Ionicons name="cart" size={24} color="black" />
                                    <Text style={{ marginLeft: 5, fontSize: 16 }}>Cart</Text>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="product-details"
                        options={{
                            title: 'Product Details',
                        }}
                    />
                    <Stack.Screen
                        name="cart"
                        options={{
                            title: 'Cart',
                        }}
                    />
                </Stack>
            </SafeAreaView>
        </CartProvider>
    );
}

