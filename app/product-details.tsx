import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ProductDetails = () => {
    const { id, title, description, price, image, rating } = useLocalSearchParams();

    console.log('Image URL:', image);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: image as string }}
                style={styles.productImage}
                onError={(error) => console.log('Image error:', error.nativeEvent.error)}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{title}</Text>
                <Text style={styles.productDescription}>{description}</Text>
                <View style={styles.productDetails}>
                    <Text style={styles.productPrice}>${price}</Text>
                    <Text style={styles.productRating}>{rating} stars</Text>
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    productImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productRating: {
        fontSize: 16,
        color: '#666',
    },
});

export default ProductDetails;