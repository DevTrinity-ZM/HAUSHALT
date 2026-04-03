import { supabase } from '../supabase';

// Define types locally to avoid circular dependencies
type GroceryItem = {
  id: string;
  name: string;
  category: 'grains' | 'oils' | 'vegetables' | 'proteins' | 'dairy' | 'household' | 'other';
  unit: string;
  baseline_price: number;
  last_updated: string;
};

type GroceryTrip = {
  id: string;
  user_id: string;
  store: string;
  location: string;
  estimated_total: number;
  actual_total: number | null;
  status: 'planning' | 'shopping' | 'completed';
  date: string;
  created_at: string;
  updated_at: string;
};

type GroceryTripInsert = {
  user_id: string;
  store: string;
  location: string;
  estimated_total: number;
  actual_total?: number | null;
  status?: 'planning' | 'shopping' | 'completed';
  date: string;
};

type GroceryTripItem = {
  id: string;
  trip_id: string;
  item_id: string;
  suggested_price: number;
  actual_price: number | null;
  quantity: number;
  added_at: string;
};

type PriceRecord = {
  id: string;
  item_id: string;
  price: number;
  store: string;
  location: string;
  user_id: string;
  date: string;
  confidence: 'high' | 'medium' | 'low';
};

export class GroceryService {
  // Get all grocery items
  static async getGroceryItems(): Promise<{ success: boolean; data?: GroceryItem[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_items')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Get grocery items error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to get grocery items' 
      };
    }
  }

  // Search grocery items
  static async searchGroceryItems(
    query: string, 
    limit: number = 10
  ): Promise<{ success: boolean; data?: GroceryItem[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_items')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(limit);

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Search grocery items error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to search grocery items' 
      };
    }
  }

  // Get items by category
  static async getItemsByCategory(
    category: string
  ): Promise<{ success: boolean; data?: GroceryItem[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_items')
        .select('*')
        .eq('category', category)
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Get items by category error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to get items by category' 
      };
    }
  }

  // Create a new grocery trip
  static async createGroceryTrip(
    tripData: GroceryTripInsert
  ): Promise<{ success: boolean; data?: GroceryTrip; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_trips')
        .insert(tripData)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Create grocery trip error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to create grocery trip' 
      };
    }
  }

  // Get user's grocery trips
  static async getUserGroceryTrips(
    userId: string, 
    limit: number = 20
  ): Promise<{ success: boolean; data?: GroceryTrip[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_trips')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Get user grocery trips error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to get user grocery trips' 
      };
    }
  }

  // Get grocery trip with items
  static async getGroceryTripDetails(
    tripId: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_trips')
        .select(`
          *,
          grocery_trip_items(
            id,
            quantity,
            suggested_price,
            actual_price,
            added_at,
            grocery_items(
              id,
              name,
              unit,
              category
            )
          )
        `)
        .eq('id', tripId)
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Get grocery trip details error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to get grocery trip details' 
      };
    }
  }

  // Add item to grocery trip
  static async addTripItem(
    tripId: string, 
    itemId: string, 
    suggestedPrice: number, 
    quantity: number = 1
  ): Promise<{ success: boolean; data?: GroceryTripItem; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_trip_items')
        .insert({
          trip_id: tripId,
          item_id: itemId,
          suggested_price: suggestedPrice,
          quantity,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Add trip item error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to add trip item' 
      };
    }
  }

  // Update actual price for trip item
  static async updateTripItemPrice(
    tripItemId: string, 
    actualPrice: number
  ): Promise<{ success: boolean; data?: GroceryTripItem; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_trip_items')
        .update({
          actual_price: actualPrice,
        })
        .eq('id', tripItemId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Update trip item price error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to update trip item price' 
      };
    }
  }

  // Complete grocery trip
  static async completeGroceryTrip(
    tripId: string, 
    actualTotal: number
  ): Promise<{ success: boolean; data?: GroceryTrip; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('grocery_trips')
        .update({
          actual_total: actualTotal,
          status: 'completed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', tripId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Complete grocery trip error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to complete grocery trip' 
      };
    }
  }

  // Record price data
  static async recordPrice(
    itemId: string, 
    price: number, 
    store: string, 
    location: string, 
    userId: string,
    confidence: 'high' | 'medium' | 'low' = 'medium'
  ): Promise<{ success: boolean; data?: PriceRecord; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('price_records')
        .insert({
          item_id: itemId,
          price,
          store,
          location,
          user_id: userId,
          date: new Date().toISOString().split('T')[0], // Today's date
          confidence,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { success: true, data };
    } catch (error: any) {
      console.error('Record price error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to record price' 
      };
    }
  }

  // Get price suggestions for an item
  static async getPriceSuggestions(
    itemId: string, 
    location: string, 
    store?: string
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      let query = supabase
        .from('price_records')
        .select('*')
        .eq('item_id', itemId)
        .eq('location', location)
        .order('date', { ascending: false })
        .limit(20);

      if (store && store !== 'other') {
        query = query.eq('store', store);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return { 
          success: true, 
          data: { 
            price: 0, 
            confidence: 'low', 
            sampleSize: 0,
            range: { min: 0, max: 0 }
          } 
        };
      }

      const prices = data.map(record => record.price);
      const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      const confidence = data.length >= 5 ? 'high' : data.length >= 2 ? 'medium' : 'low';

      return { 
        success: true, 
        data: { 
          price: Math.round(average / 5) * 5, // Round to nearest 5
          confidence,
          sampleSize: data.length,
          range: { 
            min: Math.round(min / 5) * 5, 
            max: Math.round(max / 5) * 5 
          }
        } 
      };
    } catch (error: any) {
      console.error('Get price suggestions error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to get price suggestions' 
      };
    }
  }

  // Subscribe to grocery trip changes
  static subscribeToGroceryTrip(
    tripId: string, 
    callback: (payload: any) => void
  ) {
    return supabase
      .channel(`grocery_trip_${tripId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'grocery_trips',
          filter: `id=eq.${tripId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'grocery_trip_items',
          filter: `trip_id=eq.${tripId}`,
        },
        callback
      )
      .subscribe();
  }
}
