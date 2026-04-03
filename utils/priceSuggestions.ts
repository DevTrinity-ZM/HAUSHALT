import { GroceryItem, PriceSuggestion, CustomLocation } from './groceryData';

// Mock database of recent purchases (in real app, this would come from your backend)
interface PurchaseRecord {
  itemId: string;
  price: number;
  store: string;
  location: string;
  date: Date;
}

// Simulated purchase data for demonstration
const MOCK_PURCHASES: PurchaseRecord[] = [
  // Mealie meal prices in Kitwe
  { itemId: '1', price: 175, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-20') },
  { itemId: '1', price: 180, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-18') },
  { itemId: '1', price: 165, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-15') },
  { itemId: '1', price: 190, store: 'local_market', location: 'kitwe', date: new Date('2025-03-19') },
  { itemId: '1', price: 170, store: 'local_market', location: 'kitwe', date: new Date('2025-03-16') },
  { itemId: '1', price: 185, store: 'picknpay', location: 'kitwe', date: new Date('2025-03-17') },
  
  // Cooking oil prices in Kitwe
  { itemId: '6', price: 90, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-20') },
  { itemId: '6', price: 85, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-18') },
  { itemId: '6', price: 80, store: 'local_market', location: 'kitwe', date: new Date('2025-03-19') },
  { itemId: '6', price: 95, store: 'picknpay', location: 'kitwe', date: new Date('2025-03-17') },
  
  // Sugar prices in Kitwe
  { itemId: '22', price: 65, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-20') },
  { itemId: '22', price: 60, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-18') },
  { itemId: '22', price: 55, store: 'local_market', location: 'kitwe', date: new Date('2025-03-19') },
  
  // Bread prices in Kitwe
  { itemId: '4', price: 20, store: 'shoprite', location: 'kitwe', date: new Date('2025-03-20') },
  { itemId: '4', price: 18, store: 'local_market', location: 'kitwe', date: new Date('2025-03-19') },
  { itemId: '4', price: 22, store: 'picknpay', location: 'kitwe', date: new Date('2025-03-17') },
];

/**
 * Suggests a price for a grocery item based on recent purchases
 * Now works with universal locations and custom areas
 */
export function suggestItemPrice(
  item: GroceryItem,
  location: string,
  store?: string
): PriceSuggestion {
  // Get recent purchases of this item in this location (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  let recentPurchases = MOCK_PURCHASES.filter(p => 
    p.itemId === item.id &&
    p.location === location.toLowerCase() &&
    p.date >= thirtyDaysAgo
  );
  
  // Filter by store if specified
  if (store && store !== 'other') {
    recentPurchases = recentPurchases.filter(p => p.store === store.toLowerCase());
  }
  
  // If no data for this location, try to use national averages
  if (recentPurchases.length === 0) {
    recentPurchases = MOCK_PURCHASES.filter(p => 
      p.itemId === item.id &&
      p.date >= thirtyDaysAgo
    );
  }
  
  // Calculate suggestion based on data availability
  if (recentPurchases.length >= 5) {
    // High confidence - lots of data
    const prices = recentPurchases.map(p => p.price);
    const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    return {
      price: roundToNearest5(average),
      range: { min: roundToNearest5(min), max: roundToNearest5(max) },
      confidence: 'high',
      sampleSize: recentPurchases.length
    };
  } else if (recentPurchases.length >= 1) {
    // Medium confidence - some data
    const prices = recentPurchases.map(p => p.price);
    const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    
    return {
      price: roundToNearest5(average),
      range: { min: roundToNearest5(min), max: roundToNearest5(max) },
      confidence: 'medium',
      sampleSize: recentPurchases.length
    };
  } else {
    // Low confidence - use baseline price with location adjustment
    let adjustedPrice = item.baselinePrice;
    
    // Adjust price based on store type (universal logic)
    if (store) {
      adjustedPrice = adjustPriceForStoreType(adjustedPrice, store);
    }
    
    return {
      price: roundToNearest5(adjustedPrice),
      range: { 
        min: roundToNearest5(adjustedPrice * 0.9), 
        max: roundToNearest5(adjustedPrice * 1.1) 
      },
      confidence: 'low',
      sampleSize: 0
    };
  }
}

/**
 * Adjusts price based on store type for universal pricing
 */
function adjustPriceForStoreType(basePrice: number, storeType: string): number {
  const storeAdjustments: { [key: string]: number } = {
    'street_vendor': 0.9,      // Usually cheaper
    'small_shop': 0.95,        // Slightly cheaper
    'local_market': 0.92,      // Cheaper than supermarkets
    'pharmacy': 1.15,          // More expensive for groceries
    'hardware': 1.25,           // Much more expensive
    'butcher': 0.88,           // Usually cheaper for meat
    'bakery': 0.93,            // Usually cheaper for baked goods
    'supermarket': 1.0,         // Baseline
    'convenience': 1.1,         // More expensive
  };
  
  const adjustment = storeAdjustments[storeType] || 1.0;
  return basePrice * adjustment;
}

/**
 * Creates a custom location for shopping anywhere
 */
export function createCustomLocation(
  name: string,
  province?: string,
  district?: string
): CustomLocation {
  return {
    id: `custom_${Date.now()}`,
    name,
    province,
    district,
    isCustom: true,
  };
}

/**
 * Rounds price to nearest 5 (common Zambian pricing)
 */
function roundToNearest5(price: number): number {
  return Math.round(price / 5) * 5;
}

/**
 * Search for grocery items by name
 */
export function searchGroceryItems(query: string): GroceryItem[] {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  return ZAMBIAN_GROCERY_ITEMS.filter(item =>
    item.name.toLowerCase().includes(searchTerm)
  ).slice(0, 10); // Limit to 10 results
}

/**
 * Get items by category
 */
export function getItemsByCategory(category: string): GroceryItem[] {
  return ZAMBIAN_GROCERY_ITEMS.filter(item => item.category === category);
}

/**
 * Get popular items (most frequently purchased)
 */
export function getPopularItems(): GroceryItem[] {
  // In a real app, this would be based on actual purchase frequency
  return [
    ZAMBIAN_GROCERY_ITEMS.find(item => item.id === '1')!, // Mealie meal
    ZAMBIAN_GROCERY_ITEMS.find(item => item.id === '6')!, // Cooking oil
    ZAMBIAN_GROCERY_ITEMS.find(item => item.id === '22')!, // Sugar
    ZAMBIAN_GROCERY_ITEMS.find(item => item.id === '4')!, // Bread
    ZAMBIAN_GROCERY_ITEMS.find(item => item.id === '14')!, // Kapenta
    ZAMBIAN_GROCERY_ITEMS.find(item => item.id === '9')!, // Tomatoes
  ].filter(Boolean);
}

// Import the grocery items data
import { ZAMBIAN_GROCERY_ITEMS } from './groceryData';
