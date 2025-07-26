import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { CartContext } from '../context/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';



// Mock product data
const products = [
    {
        id: 1,
        title: 'Apple iPhone 14',
        description: 'A high-end smartphone from Apple',
        price: 999.99,
        category: 'Electronics',
        image: require('../../assets/iphone14.jpg'),
        rating: 4.5
    },
    {
        id: 2,
        title: 'Samsung Galaxy S22',
        description: 'A high-end smartphone from Samsung',
        price: 899.99,
        category: 'Electronics',
        image: require('../../assets/samsungs22.jpg'),
        rating: 4.3
    },
    {
        id: 3,
        title: 'Nike Air Max 270',
        description: 'A popular running shoe from Nike',
        price: 129.99,
        category: 'Fashion',
        image: require('../../assets/Nike_Air_Max_270.jpg'),
        rating: 4.2
    },
    {
        id: 4,
        title: 'Adidas Superstar',
        description: 'A classic basketball shoe from Adidas',
        price: 89.99,
        category: 'Fashion',
        image: require('../../assets/Adidas_Superstar.jpg'),
        rating: 4.1
    },
    {
        id: 5,
        title: 'Sony WH-1000XM4',
        description: 'A high-end wireless headphone from Sony',
        price: 349.99,
        category: 'Electronics',
        image: require('../../assets/Sony_WH-1000XM4.jpg'),
        rating: 4.6
    },
    {
        id: 6,
        title: 'Levi\'s 511 Jeans',
        description: 'A popular style of jeans from Levi\'s',
        price: 59.99,
        category: 'Fashion',
        image: require('../../assets/Levi_511_Jeans.jpg'),
        rating: 4.0
    },
    {
        id: 7,
        title: 'Canon EOS Rebel T8i',
        description: 'A popular DSLR camera from Canon',
        price: 749.99,
        category: 'Electronics',
        image: require('../../assets/Canon_EOS_Rebel_T8i.jpg'),
        rating: 4.4
    },
    {
        id: 8,
        title: 'Nivea Face Cream',
        description: 'A rich and nourishing face cream from Nivea',
        price: 14.99,
        category: 'Beauty & Personal Care',
        image: require('../../assets/Nivea_Face_Cream.jpg'),
        rating: 4.5,
    },
    {
        id: 9,
        title: 'Pampers Diapers',
        description: 'A pack of diapers for babies from Pampers',
        price: 24.99,
        category: 'Baby Products',
        image: require('../../assets/Pampers_Diapers.jpg'),
        rating: 4.8,
    },
    {
        id: 10,
        title: 'Purina Dog Food',
        description: 'A bag of dog food from Purina',
        price: 49.99,
        category: 'Pet Supplies',
        image: require('../../assets/Purina_Dog_Food.jpg'),
        rating: 4.6,
    },
    {
        id: 11,
        title: 'The Alchemist Book',
        description: 'A bestselling novel by Paulo Coelho',
        price: 12.99,
        category: 'Books',
        image: require('../../assets/The_Alchemist_Book.jpg'),
        rating: 4.9,
    },
    {
        id: 12,
        title: 'Maybelline Mascara',
        description: 'A popular mascara from Maybelline',
        price: 9.99,
        category: 'Beauty & Personal Care',
        image: require('../../assets/Maybelline_Mascara.jpg'),
        rating: 4.4,
    },
    {
        id: 13,
        title: 'Baby Monitor',
        description: 'A high-quality baby monitor for parents',
        price: 99.99,
        category: 'Baby Products',
        image: require('../../assets/Baby_Monitor.jpg'),
        rating: 4.7,
    },
    {
        id: 14,
        title: 'Cat Tree',
        description: 'A sturdy cat tree for felines',
        price: 69.99,
        category: 'Pet Supplies',
        image: require('../../assets/Cat_Tree.jpg'),
        rating: 4.5,
    },
    {
        id: 15,
        title: 'The Hunger Games Book',
        description: 'A bestselling dystopian novel by Suzanne Collins',
        price: 15.99,
        category: 'Books',
        image: require('../../assets/The_Hunger_Games_Book.jpg'),
        rating: 4.8,
    },
    {
        id: 16,
        title: 'L\'Oreal Shampoo',
        description: 'A nourishing shampoo from L\'Oreal',
        price: 11.99,
        category: 'Beauty & Personal Care',
        image: require('../../assets/LOreal_Shampoo.jpg'),
        rating: 4.6,
    },
    {
        id: 17,
        title: 'Gucci Handbag',
        description: 'A luxurious handbag from Gucci',
        price: 599.99,
        category: 'Fashion',
        image: require('../../assets/Gucci_Handbag.jpg'),
        rating: 4.9,
    },
];

const categories = [
    { label: 'All', value: 'all' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Beauty & Personal Care', value: 'Beauty & Personal Care' },
    { label: 'Baby Products', value: 'Baby Products' },
    { label: 'Pet Supplies', value: 'Pet Supplies' },
    { label: 'Books', value: 'Books' },
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
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);


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
            <View style={styles.header}>
                <Text style={styles.title}>Product Listing</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search products"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        style={styles.searchInput}
                    />
                    <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
                </View>
            </View>
            <View style={styles.filterContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleCategoryChange(itemValue)}
                >
                    {categories.map((category) => (
                        <Picker.Item label={category.label} value={category.value} key={category.value} />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedSortOption}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleSortOptionChange(itemValue)}
                >
                    {sortOptions.map((option) => (
                        <Picker.Item label={option.label} value={option.value} key={option.value} />
                    ))}
                </Picker>
            </View>
            <FlatList
                data={productList}
                ListEmptyComponent={
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No products found. Please try a different search or category.
                    </Text>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push({
                            pathname: '/product-details',
                            params: {
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                price: item.price,
                                image: item.image,
                                rating: item.rating,
                            },
                        })}
                    >
                        <View style={styles.productCard}>
                            <Image source={item.image} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productTitle}>{item.title}</Text>
                                <Text style={styles.productPrice}>${item.price}</Text>
                                <Text style={styles.productRating}>{item.rating} stars</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (addItemToCart) {
                                            addItemToCart({ id: item.id, title: item.title, price: item.price, quantity: 1 });
                                        } else {
                                            console.error('addItemToCart is not defined');
                                        }
                                    }}
                                    style={styles.addToCartButton}
                                >
                                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        backgroundColor: '#3498db',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        maxWidth: 250, // Add this line to limit the width of the search container
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    picker: {
        width: 150,
        height: 50,
    },
    productCard: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    productInfo: {
        marginLeft: 20,
        flex: 1,
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
    addToCartButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});


export default ProductListing;