import React, { useState, useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CartContext } from '../context/CartContext';


// Mock product data
const products = [
    {
        id: 1,
        title: 'Apple iPhone 14',
        description: 'A high-end smartphone from Apple',
        price: 999.99,
        category: 'Electronics',
        image: 'https://example.com/iphone14.jpg',
        rating: 4.5
    },
    {
        id: 2,
        title: 'Samsung Galaxy S22',
        description: 'A high-end smartphone from Samsung',
        price: 899.99,
        category: 'Electronics',
        image: 'https://example.com/s22.jpg',
        rating: 4.3
    },
    {
        id: 3,
        title: 'Nike Air Max 270',
        description: 'A popular running shoe from Nike',
        price: 129.99,
        category: 'Fashion',
        image: 'https://example.com/airmax270.jpg',
        rating: 4.2
    },
    {
        id: 4,
        title: 'Adidas Superstar',
        description: 'A classic basketball shoe from Adidas',
        price: 89.99,
        category: 'Fashion',
        image: 'https://example.com/superstar.jpg',
        rating: 4.1
    },
    {
        id: 5,
        title: 'Sony WH-1000XM4',
        description: 'A high-end wireless headphone from Sony',
        price: 349.99,
        category: 'Electronics',
        image: 'https://example.com/wh1000xm4.jpg',
        rating: 4.6
    },
    {
        id: 6,
        title: 'Levi\'s 511 Jeans',
        description: 'A popular style of jeans from Levi\'s',
        price: 59.99,
        category: 'Fashion',
        image: 'https://example.com/511jeans.jpg',
        rating: 4.0
    },
    {
        id: 7,
        title: 'Canon EOS Rebel T8i',
        description: 'A popular DSLR camera from Canon',
        price: 749.99,
        category: 'Electronics',
        image: 'https://example.com/eosrebelt8i.jpg',
        rating: 4.4
    },
];

const categories = [
    { label: 'All', value: 'all' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
];

const sortOptions = [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: High to Low', value: 'rating-desc' },
    { label: 'Rating: Low to High', value: 'rating-asc' },
];

const ProductListing = () => {
    const [productList, setProductList] = useState(products);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSortOption, setSelectedSortOption] = useState('price-asc');
    const { addItemToCart } = useContext(CartContext)!;

    const filterAndSortProducts = (category: string, query: string, sortOption: string) => {
        let filteredProducts = products;

        if (category !== 'all') {
            filteredProducts = filteredProducts.filter((product) => product.category === category);
        }

        if (query) {
            filteredProducts = filteredProducts.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        switch (sortOption) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating-asc':
                filteredProducts.sort((a, b) => a.rating - b.rating);
                break;
            case 'rating-desc':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                break;
        }

        setProductList(filteredProducts);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        filterAndSortProducts(category, searchQuery, selectedSortOption);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        filterAndSortProducts(selectedCategory, query, selectedSortOption);
    };

    const handleSortOptionChange = (sortOption: string) => {
        setSelectedSortOption(sortOption);
        filterAndSortProducts(selectedCategory, searchQuery, sortOption);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Products</Text>
            <TextInput
                placeholder="Search products"
                value={searchQuery}
                onChangeText={handleSearch}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Picker
                selectedValue={selectedCategory}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue) => handleCategoryChange(itemValue)}
            >
                {categories.map((category) => (
                    <Picker.Item label={category.label} value={category.value} key={category.value} />
                ))}
            </Picker>
            <Picker
                selectedValue={selectedSortOption}
                style={{ height: 50, width: 200 }}
                onValueChange={(itemValue) => handleSortOptionChange(itemValue)}
            >
                {sortOptions.map((option) => (
                    <Picker.Item label={option.label} value={option.value} key={option.value} />
                ))}
            </Picker>
            <FlatList
                data={productList}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No products found. Please try a different search or category.
                    </Text>
                }
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: '/product-details',
                                    params: {
                                        id: item.id,
                                        title: item.title,
                                        description: item.description,
                                        price: item.price,
                                        image: item.image,
                                        rating: item.rating,
                                    },
                                })
                            }
                        >
                            <View style={styles.productCard}>
                                <Image source={{ uri: item.image }} style={styles.productImage} />
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <Text style={styles.productPrice}>${item.price}</Text>
                                <Text style={styles.productRating}>{item.rating} stars</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (addItemToCart) {
                                    addItemToCart({ id: item.id, title: item.title, price: item.price, quantity: 1 });
                                } else {
                                    console.error('addItemToCart is not defined');
                                }
                            }}
                        >
                            <Text style={{ color: 'blue' }}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productCard: {
        marginBottom: 20,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#666',
    },
    productRating: {
        fontSize: 16,
        color: '#666',
    },
});

export default ProductListing;