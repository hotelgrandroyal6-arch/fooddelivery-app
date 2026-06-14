import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestaurantDetailScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState([]);

  const categories = ['All', 'Appetizers', 'Main Course', 'Desserts', 'Beverages'];
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      category: 'Main Course',
      price: 350,
      description: 'Classic pizza with fresh mozzarella',
      image: 'https://via.placeholder.com/150?text=Pizza',
    },
    {
      id: 2,
      name: 'Caesar Salad',
      category: 'Appetizers',
      price: 250,
      description: 'Crispy romaine lettuce with parmesan',
      image: 'https://via.placeholder.com/150?text=Salad',
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      category: 'Desserts',
      price: 200,
      description: 'Rich and moist chocolate cake',
      image: 'https://via.placeholder.com/150?text=Cake',
    },
    {
      id: 4,
      name: 'Fresh Juice',
      category: 'Beverages',
      price: 120,
      description: 'Freshly squeezed orange juice',
      image: 'https://via.placeholder.com/150?text=Juice',
    },
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const MenuItem = ({ item }) => (
    <View style={styles.menuItemCard}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <View style={styles.menuItemFooter}>
          <Text style={styles.menuItemPrice}>₹{item.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#D4A574" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Restaurant Header */}
        <View>
          <Image
            source={{ uri: restaurant.image }}
            style={styles.headerImage}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{restaurant.rating}</Text>
            <Text style={styles.reviews}>({restaurant.reviews} reviews)</Text>
          </View>
          <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={14} color="#D4A574" />
              <Text style={styles.infoText}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="bicycle" size={14} color="#D4A574" />
              <Text style={styles.infoText}>₹{restaurant.deliveryFee}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="wallet" size={14} color="#D4A574" />
              <Text style={styles.infoText}>Min ₹{restaurant.minOrder}</Text>
            </View>
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MenuItem item={item} />}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Cart Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart', { items: cartItems })}
        >
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.cartButtonText}>
            View Cart ({cartItems.length})
          </Text>
          <Text style={styles.cartButtonPrice}>
            ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantHeader: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  cuisine: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 6,
  },
  categoriesScroll: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#D4A574',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  menuSection: {
    padding: 12,
    paddingBottom: 100,
  },
  menuItemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    backgroundColor: '#eee',
  },
  menuItemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  menuItemDescription: {
    fontSize: 11,
    color: '#999',
    marginVertical: 4,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D4A574',
  },
  addButton: {
    backgroundColor: '#D4A574',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D4A574',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  cartButtonPrice: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RestaurantDetailScreen;