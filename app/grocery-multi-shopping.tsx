import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Alert, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { 
  ShoppingListItem,
  MultiStoreBudget,
  UNIVERSAL_STORES, 
  ZAMBIAN_LOCATIONS 
} from '@/utils/groceryData';

export default function GroceryMultiShoppingScreen() {
  const params = useLocalSearchParams<{ budgetId: string; location: string; locationName?: string }>();
  const router = useRouter();
  
  const [location] = useState(params.location || 'kitwe');
  const [locationName] = useState(params.locationName || 'Kitwe');
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [actualPrices, setActualPrices] = useState<{ [key: string]: string }>({});
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  
  // Mock multi-store budget - in real app, this would come from state/API
  const multiStoreBudget: MultiStoreBudget = {
    id: params.budgetId || '1',
    location,
    items: [
      // Shoprite items
      {
        id: '1',
        item: { id: '1', name: 'Mealie meal', category: 'grains', unit: '25kg bag', baselinePrice: 180, lastUpdated: new Date() },
        suggestedPrice: 180,
        quantity: 1,
        added: new Date(),
        storeId: 'shoprite',
      },
      {
        id: '2',
        item: { id: '6', name: 'Cooking oil', category: 'oils', unit: '2L bottle', baselinePrice: 85, lastUpdated: new Date() },
        suggestedPrice: 85,
        quantity: 1,
        added: new Date(),
        storeId: 'shoprite',
      },
      // Local Market items
      {
        id: '3',
        item: { id: '22', name: 'Sugar', category: 'household', unit: '2kg', baselinePrice: 65, lastUpdated: new Date() },
        suggestedPrice: 60,
        quantity: 1,
        added: new Date(),
        storeId: 'local_market',
      },
      {
        id: '4',
        item: { id: '9', name: 'Tomatoes', category: 'vegetables', unit: 'kg', baselinePrice: 25, lastUpdated: new Date() },
        suggestedPrice: 20,
        quantity: 2,
        added: new Date(),
        storeId: 'local_market',
      },
      // Butcher items
      {
        id: '5',
        item: { id: '14', name: 'Kapenta', category: 'proteins', unit: 'small bucket', baselinePrice: 45, lastUpdated: new Date() },
        suggestedPrice: 40,
        quantity: 1,
        added: new Date(),
        storeId: 'butcher',
      },
    ],
    stores: ['shoprite', 'local_market', 'butcher'],
    estimatedTotal: 425,
    date: new Date(),
    status: 'shopping',
  };
  
  const currentStore = multiStoreBudget.stores[currentStoreIndex];
  const currentStoreItems = multiStoreBudget.items.filter(item => item.storeId === currentStore);
  
  const getStoreName = (storeId: string) => {
    return UNIVERSAL_STORES.find(s => s.id === storeId)?.name || storeId;
  };
  
  const updateActualPrice = (itemId: string, price: string) => {
    setActualPrices(prev => ({
      ...prev,
      [itemId]: price
    }));
  };
  
  const addMissingItem = () => {
    if (!newItemName.trim()) {
      Alert.alert('Item Required', 'Please enter an item name');
      return;
    }
    
    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      item: {
        id: `custom_${Date.now()}`,
        name: newItemName.trim(),
        category: 'other',
        unit: 'item',
        baselinePrice: 50,
        lastUpdated: new Date()
      },
      suggestedPrice: 50,
      quantity: 1,
      added: new Date(),
      storeId: currentStore,
    };
    
    // In real app, this would update the budget
    Alert.alert('Item Added', `"${newItemName}" added to your shopping list.`);
    setNewItemName('');
    setShowAddItem(false);
  };
  
  const calculateStoreEstimated = (storeId: string) => {
    return multiStoreBudget.items
      .filter(item => item.storeId === storeId)
      .reduce((total, item) => total + (item.suggestedPrice * item.quantity), 0);
  };
  
  const calculateStoreActual = (storeId: string) => {
    return multiStoreBudget.items
      .filter(item => item.storeId === storeId)
      .reduce((total, item) => {
        const actualPrice = actualPrices[item.id] ? parseFloat(actualPrices[item.id]) : item.suggestedPrice;
        return total + (actualPrice * item.quantity);
      }, 0);
  };
  
  const calculateTotalEstimated = () => {
    return multiStoreBudget.items.reduce((total, item) => total + (item.suggestedPrice * item.quantity), 0);
  };
  
  const calculateTotalActual = () => {
    return multiStoreBudget.items.reduce((total, item) => {
      const actualPrice = actualPrices[item.id] ? parseFloat(actualPrices[item.id]) : item.suggestedPrice;
      return total + (actualPrice * item.quantity);
    }, 0);
  };
  
  const calculateDifference = () => {
    return calculateTotalActual() - calculateTotalEstimated();
  };
  
  const goToNextStore = () => {
    if (currentStoreIndex < multiStoreBudget.stores.length - 1) {
      setCurrentStoreIndex(prev => prev + 1);
    }
  };
  
  const goToPreviousStore = () => {
    if (currentStoreIndex > 0) {
      setCurrentStoreIndex(prev => prev - 1);
    }
  };
  
  const saveShoppingTrip = () => {
    const missingPrices = multiStoreBudget.items.filter(item => !actualPrices[item.id]);
    if (missingPrices.length > 0) {
      Alert.alert('Missing Prices', 'Please enter actual prices for all items before saving.');
      return;
    }
    
    // In real app, this would save to database
    Alert.alert(
      'Shopping Trip Complete!',
      `Your multi-store shopping trip has been saved. ${calculateDifference() >= 0 ? 'You spent' : 'You saved'} K${Math.abs(calculateDifference())}.`,
      [
        { text: 'OK', onPress: () => router.push('/(tabs)/dashboard') }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Multi-Store Shopping</ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <Card style={styles.locationCard}>
          <View style={styles.locationInfo}>
            <IconSymbol size={20} name="cart.fill" color="#0066CC" />
            <ThemedText style={styles.locationText}>
              {locationName} • {multiStoreBudget.stores.length} stores
            </ThemedText>
          </View>
        </Card>
        
        {/* Store Navigation */}
        <View style={styles.storeNavigation}>
          <TouchableOpacity
            onPress={goToPreviousStore}
            disabled={currentStoreIndex === 0}
            style={[styles.navButton, currentStoreIndex === 0 && styles.disabledNav]}
          >
            <IconSymbol size={20} name="chevron.right" color={currentStoreIndex === 0 ? '#666' : '#FFFFFF'} />
          </TouchableOpacity>
          
          <View style={styles.storeIndicator}>
            <ThemedText style={styles.storeIndicatorText}>
              Store {currentStoreIndex + 1} of {multiStoreBudget.stores.length}
            </ThemedText>
            <ThemedText style={styles.currentStoreName}>
              {getStoreName(currentStore)}
            </ThemedText>
          </View>
          
          <TouchableOpacity
            onPress={goToNextStore}
            disabled={currentStoreIndex === multiStoreBudget.stores.length - 1}
            style={[styles.navButton, currentStoreIndex === multiStoreBudget.stores.length - 1 && styles.disabledNav]}
          >
            <IconSymbol size={20} name="chevron.right" color={currentStoreIndex === multiStoreBudget.stores.length - 1 ? '#666' : '#FFFFFF'} />
          </TouchableOpacity>
        </View>
        
        {/* Store Progress */}
        <View style={styles.progressBar}>
          {multiStoreBudget.stores.map((storeId, index) => (
            <View
              key={storeId}
              style={[
                styles.progressSegment,
                index <= currentStoreIndex && styles.completedSegment
              ]}
            />
          ))}
        </View>
        
        {/* Current Store Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Items at {getStoreName(currentStore)}</ThemedText>
            <TouchableOpacity onPress={() => setShowAddItem(true)}>
              <IconSymbol size={20} name="plus.circle.fill" color="#10B981" />
            </TouchableOpacity>
          </View>
          
          {currentStoreItems.map(item => (
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
          
          {/* Store Summary */}
          <Card variant="elevated" style={styles.storeSummaryCard}>
            <View style={styles.summaryRow}>
              <ThemedText style={styles.summaryLabel}>Store Total:</ThemedText>
              <ThemedText style={styles.storeTotal}>
                K{calculateStoreActual(currentStore)}
              </ThemedText>
            </View>
          </Card>
        </View>
        
        {/* Overall Summary */}
        <Card variant="elevated" style={styles.overallSummaryCard}>
          <ThemedText style={styles.overallTitle}>Overall Shopping Summary</ThemedText>
          
          {multiStoreBudget.stores.map(storeId => (
            <View key={storeId} style={styles.storeSummaryRow}>
              <ThemedText style={styles.storeSummaryName}>{getStoreName(storeId)}</ThemedText>
              <ThemedText style={styles.storeSummaryAmount}>
                K{calculateStoreActual(storeId)}
              </ThemedText>
            </View>
          ))}
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <ThemedText style={styles.summaryLabel}>Total Spent:</ThemedText>
            <ThemedText style={styles.totalAmount}>K{calculateTotalActual()}</ThemedText>
          </View>
          
          <View style={styles.summaryRow}>
            <ThemedText style={styles.summaryLabel}>Budget:</ThemedText>
            <ThemedText style={styles.budgetAmount}>K{calculateTotalEstimated()}</ThemedText>
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
        </Card>
        
        {/* Add Item Modal */}
        {showAddItem && (
          <Card style={styles.addItemModal}>
            <ThemedText style={styles.modalTitle}>Add Missing Item</ThemedText>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter item name..."
              placeholderTextColor="#666"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setShowAddItem(false)}
                variant="outline"
                size="small"
              />
              <Button
                title="Add Item"
                onPress={addMissingItem}
                size="small"
              />
            </View>
          </Card>
        )}
        
        <View style={styles.spacer} />
        
        <Button
          title="Complete Shopping Trip →"
          onPress={saveShoppingTrip}
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
  storeNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  navButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  disabledNav: {
    opacity: 0.5,
  },
  storeIndicator: {
    alignItems: 'center',
    flex: 1,
  },
  storeIndicatorText: {
    fontSize: 12,
    opacity: 0.7,
    color: '#FFFFFF',
  },
  currentStoreName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressBar: {
    flexDirection: 'row',
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressSegment: {
    flex: 1,
    backgroundColor: '#404040',
    marginHorizontal: 1,
  },
  completedSegment: {
    backgroundColor: '#10B981',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
  storeSummaryCard: {
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  storeTotal: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
  overallSummaryCard: {
    padding: 20,
    marginBottom: 20,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  storeSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storeSummaryName: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  storeSummaryAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#404040',
    paddingTop: 8,
    marginTop: 4,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  differenceRow: {
    marginTop: 8,
  },
  difference: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overspend: {
    color: '#EF4444',
  },
  underspend: {
    color: '#10B981',
  },
  addItemModal: {
    padding: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#404040',
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacer: {
    height: 20,
  },
});
