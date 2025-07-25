import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ProductDetails = () => {
    const { id, title, description, price, image, rating } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            {/*<Image source={{ uri: image }} style={styles.productImage} />*/}
            <Text style={styles.productTitle}>{title}</Text>
            <Text style={styles.productDescription}>{description}</Text>
            <Text style={styles.productPrice}>${price}</Text>
            <Text style={styles.productRating}>{rating} stars</Text>
        </View>
    );
};
export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productRating: {
        fontSize: 16,
        color: '#666',
    },
});
