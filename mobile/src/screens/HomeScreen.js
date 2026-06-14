import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Sky Lounge',
      cuisine: 'Continental, Italian',
      rating: 4.8,
      reviews: 450,
      deliveryTime: '30-40 mins',
      deliveryFee: 50,
      minOrder: 200,
      image: 'https://via.placeholder.com/300x200?text=Sky+Lounge',
      isOpen: true,
    },
  ]);

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetail', { restaurant });
  };

  const RestaurantCard = ({ restaurant }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => handleRestaurantPress(restaurant)}
    >
      <Image
        source={{ uri: restaurant.image }}
        style={styles.restaurantImage}
      />
      {!restaurant.isOpen && (
        <View style={styles.closedOverlay}>
          <Text style={styles.closedText}>Closed</Text>
        </View>
      )}
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <Text style={styles.reviews}>({restaurant.reviews})</Text>
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.detail}>{restaurant.deliveryTime}</Text>
          <Text style={styles.detail}>₹{restaurant.deliveryFee} delivery</Text>
          <Text style={styles.detail}>₹{restaurant.minOrder} min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#D4A574" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THE GRAND ROYAL</Text>
        <Text style={styles.headerSubtitle}>Food Delivery</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#ccc"
          />
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <FlatList
            data={restaurants}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RestaurantCard restaurant={item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#D4A574',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#eee',
  },
  closedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  closedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 11,
    color: '#666',
  },
});

export default HomeScreen;