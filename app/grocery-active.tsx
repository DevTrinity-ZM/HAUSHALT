import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ShoppingListItem, ZAMBIAN_STORES, ZAMBIAN_LOCATIONS } from '@/utils/groceryData';

export default function GroceryActiveScreen() {
  const params = useLocalSearchParams<{ store: string; location: string; listId: string }>();
  const router = useRouter();
  
  const [store] = useState(params.store || 'shoprite');
  const [location] = useState(params.location || 'kitwe');
  const [actualPrices, setActualPrices] = useState<{ [key: string]: string }>({});
  
  const storeName = ZAMBIAN_STORES.find(s => s.id === store)?.name || store;
  const locationName = ZAMBIAN_LOCATIONS.find(l => l.id === location)?.name || location;
  
  // Mock shopping list - in real app, this would come from state/API
  const shoppingList: ShoppingListItem[] = [
    {
      id: '1',
      item: { id: '1', name: 'Mealie meal', category: 'grains', unit: '25kg bag', baselinePrice: 180, lastUpdated: new Date() },
      suggestedPrice: 180,
      quantity: 1,
      added: new Date(),
    },
    {
      id: '2',
      item: { id: '6', name: 'Cooking oil', category: 'oils', unit: '2L bottle', baselinePrice: 85, lastUpdated: new Date() },
      suggestedPrice: 85,
      quantity: 1,
      added: new Date(),
    },
    {
      id: '3',
      item: { id: '22', name: 'Sugar', category: 'household', unit: '2kg', baselinePrice: 65, lastUpdated: new Date() },
      suggestedPrice: 65,
      quantity: 1,
      added: new Date(),
    },
    {
      id: '4',
      item: { id: '4', name: 'Bread', category: 'grains', unit: 'loaf', baselinePrice: 20, lastUpdated: new Date() },
      suggestedPrice: 20,
      quantity: 1,
      added: new Date(),
    },
    {
      id: '5',
      item: { id: '14', name: 'Kapenta', category: 'proteins', unit: 'small bucket', baselinePrice: 45, lastUpdated: new Date() },
      suggestedPrice: 45,
      quantity: 1,
      added: new Date(),
    },
  ];
  
  const updateActualPrice = (itemId: string, price: string) => {
    setActualPrices(prev => ({
      ...prev,
      [itemId]: price
    }));
  };
  
  const calculateEstimatedTotal = () => {
    return shoppingList.reduce((total, item) => total + (item.suggestedPrice * item.quantity), 0);
  };
  
  const calculateActualTotal = () => {
    return shoppingList.reduce((total, item) => {
      const actualPrice = actualPrices[item.id] ? parseFloat(actualPrices[item.id]) : item.suggestedPrice;
      return total + (actualPrice * item.quantity);
    }, 0);
  };
  
  const calculateDifference = () => {
    return calculateActualTotal() - calculateEstimatedTotal();
  };
  
  const saveTrip = () => {
    const missingPrices = shoppingList.filter(item => !actualPrices[item.id]);
    if (missingPrices.length > 0) {
      Alert.alert('Missing Prices', 'Please enter actual prices for all items before saving.');
      return;
    }
    
    // In real app, this would save to database
    Alert.alert(
      'Trip Saved!',
      `Your shopping trip has been saved. ${calculateDifference() >= 0 ? 'You spent' : 'You saved'} K${Math.abs(calculateDifference())}.`,
      [
        { text: 'OK', onPress: () => router.push('/(tabs)/dashboard') }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Update Actual Prices</ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <Card style={styles.locationCard}>
          <View style={styles.locationInfo}>
            <IconSymbol size={20} name="cart.fill" color="#0066CC" />
            <ThemedText style={styles.locationText}>
              {storeName} • {locationName}
            </ThemedText>
          </View>
        </Card>
        
        <ThemedText style={styles.instruction}>
          Enter the actual prices you paid at the store:
        </ThemedText>
        
        <View style={styles.itemsSection}>
          {shoppingList.map(item => (
            <Card key={item.id} style={styles.itemCard}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <ThemedText style={styles.itemName}>{item.item.name}</ThemedText>
                  <ThemedText style={styles.itemUnit}>{item.item.unit}</ThemedText>
                </View>
              </View>
              
              <View style={styles.priceRow}>
                <View style={styles.priceColumn}>
                  <ThemedText style={styles.priceLabel}>Suggested:</ThemedText>
                  <ThemedText style={styles.suggestedPrice}>K{item.suggestedPrice}</ThemedText>
                </View>
                
                <View style={styles.priceColumn}>
                  <ThemedText style={styles.priceLabel}>Actual:</ThemedText>
                  <TextInput
                    style={styles.actualInput}
                    placeholder="K0"
                    placeholderTextColor="#666"
                    value={actualPrices[item.id] || ''}
                    onChangeText={(text) => updateActualPrice(item.id, text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>
        
        <Card variant="elevated" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Estimated:</ThemedText>
            <ThemedText style={styles.estimatedTotal}>K{calculateEstimatedTotal()}</ThemedText>
          </View>
          
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Actual:</ThemedText>
            <ThemedText style={styles.actualTotal}>K{calculateActualTotal()}</ThemedText>
          </View>
          
          <View style={[styles.summaryRow, styles.differenceRow]}>
            <ThemedText style={styles.summaryLabel}>Difference:</ThemedText>
            <ThemedText style={[
              styles.difference,
              calculateDifference() >= 0 ? styles.overspend : styles.underspend
            ]}>
              {calculateDifference() >= 0 ? '+' : ''}K{calculateDifference()}
            </ThemedText>
          </View>
          
          <ThemedText style={styles.differenceText}>
            {calculateDifference() >= 0 ? 'You spent more than estimated' : 'You saved money!'}
          </ThemedText>
        </Card>
        
        <View style={styles.spacer} />
        
        <Button
          title="Save Trip →"
          onPress={saveTrip}
          size="large"
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 24,
  },
  locationCard: {
    padding: 15,
    marginBottom: 20,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  itemsSection: {
    marginBottom: 20,
  },
  itemCard: {
    padding: 20,
    marginBottom: 15,
  },
  itemHeader: {
    marginBottom: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemUnit: {
    fontSize: 14,
    opacity: 0.7,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceColumn: {
    flex: 1,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  suggestedPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  actualInput: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#404040',
    textAlign: 'center',
    minWidth: 80,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  estimatedTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
  actualTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  differenceRow: {
    borderTopWidth: 1,
    borderTopColor: '#404040',
    paddingTop: 12,
    marginTop: 4,
  },
  difference: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  overspend: {
    color: '#EF4444',
  },
  underspend: {
    color: '#10B981',
  },
  differenceText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 8,
  },
  spacer: {
    height: 20,
  },
});
