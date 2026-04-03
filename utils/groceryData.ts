// Zambian grocery items with baseline prices and categories
export interface GroceryItem {
  id: string;
  name: string;
  category: 'grains' | 'oils' | 'vegetables' | 'proteins' | 'dairy' | 'household' | 'other';
  unit: string;
  baselinePrice: number; // in ZMW
  lastUpdated: Date;
}

export interface ShoppingListItem {
  id: string;
  item: GroceryItem;
  suggestedPrice: number;
  actualPrice?: number;
  quantity: number;
  added: Date;
  storeId?: string; // Which store this item is planned for
}

export interface MultiStoreBudget {
  id: string;
  location: string;
  items: ShoppingListItem[];
  stores: string[]; // Array of store IDs
  estimatedTotal: number;
  actualTotal?: number;
  date: Date;
  status: 'planning' | 'shopping' | 'completed';
}

export interface GroceryTrip {
  id: string;
  store: string;
  location: string;
  items: ShoppingListItem[];
  estimatedTotal: number;
  actualTotal?: number;
  date: Date;
  status: 'planning' | 'shopping' | 'completed';
}

export interface PriceSuggestion {
  price: number;
  range: { min: number; max: number };
  confidence: 'high' | 'medium' | 'low';
  sampleSize: number;
}

// Zambian grocery database with realistic baseline prices
export const ZAMBIAN_GROCERY_ITEMS: GroceryItem[] = [
  // Grains
  { id: '1', name: 'Mealie meal', category: 'grains', unit: '25kg bag', baselinePrice: 180, lastUpdated: new Date() },
  { id: '2', name: 'Breakfast meal', category: 'grains', unit: '10kg bag', baselinePrice: 120, lastUpdated: new Date() },
  { id: '3', name: 'Rice', category: 'grains', unit: '5kg bag', baselinePrice: 85, lastUpdated: new Date() },
  { id: '4', name: 'Bread', category: 'grains', unit: 'loaf', baselinePrice: 20, lastUpdated: new Date() },
  { id: '5', name: 'Rolls', category: 'grains', unit: '6 pack', baselinePrice: 15, lastUpdated: new Date() },
  
  // Oils
  { id: '6', name: 'Cooking oil', category: 'oils', unit: '2L bottle', baselinePrice: 85, lastUpdated: new Date() },
  { id: '7', name: 'Margarine', category: 'oils', unit: '500g', baselinePrice: 25, lastUpdated: new Date() },
  { id: '8', name: 'Chibuku', category: 'oils', unit: '1L', baselinePrice: 15, lastUpdated: new Date() },
  
  // Vegetables
  { id: '9', name: 'Tomatoes', category: 'vegetables', unit: 'kg', baselinePrice: 25, lastUpdated: new Date() },
  { id: '10', name: 'Onions', category: 'vegetables', unit: 'kg', baselinePrice: 20, lastUpdated: new Date() },
  { id: '11', name: 'Potatoes', category: 'vegetables', unit: 'kg', baselinePrice: 15, lastUpdated: new Date() },
  { id: '12', name: 'Rape', category: 'vegetables', unit: 'bunch', baselinePrice: 10, lastUpdated: new Date() },
  { id: '13', name: 'Kalembula', category: 'vegetables', unit: 'bunch', baselinePrice: 8, lastUpdated: new Date() },
  
  // Proteins
  { id: '14', name: 'Kapenta', category: 'proteins', unit: 'small bucket', baselinePrice: 45, lastUpdated: new Date() },
  { id: '15', name: 'Chicken', category: 'proteins', unit: 'whole', baselinePrice: 65, lastUpdated: new Date() },
  { id: '16', name: 'Beef', category: 'proteins', unit: 'kg', baselinePrice: 120, lastUpdated: new Date() },
  { id: '17', name: 'Eggs', category: 'proteins', unit: '30 pack', baselinePrice: 35, lastUpdated: new Date() },
  { id: '18', name: 'Dried fish', category: 'proteins', unit: 'kg', baselinePrice: 150, lastUpdated: new Date() },
  
  // Dairy
  { id: '19', name: 'Milk', category: 'dairy', unit: '1L', baselinePrice: 18, lastUpdated: new Date() },
  { id: '20', name: 'Yoghurt', category: 'dairy', unit: '500ml', baselinePrice: 12, lastUpdated: new Date() },
  { id: '21', name: 'Cheese', category: 'dairy', unit: '200g', baselinePrice: 45, lastUpdated: new Date() },
  
  // Household
  { id: '22', name: 'Sugar', category: 'household', unit: '2kg', baselinePrice: 65, lastUpdated: new Date() },
  { id: '23', name: 'Salt', category: 'household', unit: '1kg', baselinePrice: 8, lastUpdated: new Date() },
  { id: '24', name: 'Soap', category: 'household', unit: 'bar', baselinePrice: 10, lastUpdated: new Date() },
  { id: '25', name: 'Toilet paper', category: 'household', unit: '12 rolls', baselinePrice: 55, lastUpdated: new Date() },
  { id: '26', name: 'Matches', category: 'household', unit: 'box', baselinePrice: 5, lastUpdated: new Date() },
  
  // Other
  { id: '27', name: 'Fanta', category: 'other', unit: '2L', baselinePrice: 22, lastUpdated: new Date() },
  { id: '28', name: 'Coke', category: 'other', unit: '2L', baselinePrice: 25, lastUpdated: new Date() },
  { id: '29', name: 'Juice', category: 'other', unit: '1L', baselinePrice: 18, lastUpdated: new Date() },
  { id: '30', name: 'Biscuits', category: 'other', unit: 'pack', baselinePrice: 12, lastUpdated: new Date() },
];

// Store options in Zambia
export const ZAMBIAN_STORES = [
  { id: 'shoprite', name: 'Shoprite', type: 'supermarket' },
  { id: 'picknpay', name: 'Pick n Pay', type: 'supermarket' },
  { id: 'game', name: 'Game', type: 'supermarket' },
  { id: 'spar', name: 'Spar', type: 'supermarket' },
  { id: 'choppies', name: 'Choppies', type: 'supermarket' },
  { id: 'local_market', name: 'Local Market', type: 'market' },
  { id: 'other', name: 'Other', type: 'other' },
];

// Location options - now supports custom locations
export const ZAMBIAN_LOCATIONS = [
  { id: 'kitwe', name: 'Kitwe' },
  { id: 'lusaka', name: 'Lusaka' },
];

// Universal store options - works anywhere
export const UNIVERSAL_STORES = [
  { id: 'shoprite', name: 'Shoprite', type: 'supermarket' },
  { id: 'picknpay', name: 'Pick n Pay', type: 'supermarket' },
  { id: 'game', name: 'Game', type: 'supermarket' },
  { id: 'spar', name: 'Spar', type: 'supermarket' },
  { id: 'choppies', name: 'Choppies', type: 'supermarket' },
  { id: 'local_market', name: 'Local Market', type: 'market' },
  { id: 'street_vendor', name: 'Street Vendor', type: 'market' },
  { id: 'small_shop', name: 'Small Shop', type: 'convenience' },
  { id: 'pharmacy', name: 'Pharmacy', type: 'pharmacy' },
  { id: 'hardware', name: 'Hardware Store', type: 'hardware' },
  { id: 'butcher', name: 'Butcher', type: 'butcher' },
  { id: 'bakery', name: 'Bakery', type: 'bakery' },
  { id: 'other', name: 'Other', type: 'other' },
];

// Custom location interface
export interface CustomLocation {
  id: string;
  name: string;
  province?: string;
  district?: string;
  isCustom: boolean;
}
