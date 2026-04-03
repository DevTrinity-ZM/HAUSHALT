export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          student_id: string
          user_type: 'student_hostel' | 'student_private' | 'professional' | 'sharing_roommates'
          location: 'kitwe' | 'lusaka' | 'other'
          household_size: number
          monthly_income: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          full_name: string
          email: string
          student_id: string
          user_type: 'student_hostel' | 'student_private' | 'professional' | 'sharing_roommates'
          location: 'kitwe' | 'lusaka' | 'other'
          household_size?: number
          monthly_income?: number
        }
        Update: {
          full_name?: string
          user_type?: 'student_hostel' | 'student_private' | 'professional' | 'sharing_roommates'
          location?: 'kitwe' | 'lusaka' | 'other'
          household_size?: number
          monthly_income?: number
        }
      }
      budget_categories: {
        Row: {
          id: string
          user_id: string
          name: string
          planned_amount: number
          spent_amount: number
          color: string
          month: number
          year: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          planned_amount: number
          spent_amount: number
          color: string
          month: number
          year: number
        }
        Update: {
          name?: string
          planned_amount?: number
          spent_amount?: number
          color?: string
        }
      }
      expenses: {
        Row: {
          id: string
          user_id: string
          description: string
          amount: number
          category: string
          merchant: string
          date: string
          is_shared: boolean
          group_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          description: string
          amount: number
          category: string
          merchant: string
          date: string
          is_shared?: boolean
          group_id?: string | null
        }
        Update: {
          description?: string
          amount?: number
          category?: string
          merchant?: string
          date?: string
          is_shared?: boolean
          group_id?: string | null
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          created_by: string
          status: 'active' | 'settled' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          created_by: string
          status?: 'active' | 'settled' | 'completed'
        }
        Update: {
          name?: string
          description?: string | null
          status?: 'active' | 'settled' | 'completed'
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: 'admin' | 'member'
          joined_at: string
        }
        Insert: {
          group_id: string
          user_id: string
          role?: 'admin' | 'member'
        }
        Update: {
          role?: 'admin' | 'member'
        }
      }
      group_expenses: {
        Row: {
          id: string
          group_id: string
          expense_id: string
          paid_by: string
          split_between: string[]
          amount: number
          description: string
          date: string
          created_at: string
        }
        Insert: {
          group_id: string
          expense_id: string
          paid_by: string
          split_between: string[]
          amount: number
          description: string
          date: string
        }
        Update: {
          paid_by?: string
          split_between?: string[]
          amount?: number
          description?: string
          date?: string
        }
      }
      settlements: {
        Row: {
          id: string
          group_id: string
          from_user: string
          to_user: string
          amount: number
          status: 'pending' | 'completed'
          created_at: string
          completed_at: string | null
        }
        Insert: {
          group_id: string
          from_user: string
          to_user: string
          amount: number
          status?: 'pending' | 'completed'
        }
        Update: {
          status?: 'pending' | 'completed'
          completed_at?: string | null
        }
      }
      grocery_items: {
        Row: {
          id: string
          name: string
          category: 'grains' | 'oils' | 'vegetables' | 'proteins' | 'dairy' | 'household' | 'other'
          unit: string
          baseline_price: number
          last_updated: string
        }
        Insert: {
          name: string
          category: 'grains' | 'oils' | 'vegetables' | 'proteins' | 'dairy' | 'household' | 'other'
          unit: string
          baseline_price: number
        }
        Update: {
          name?: string
          category?: 'grains' | 'oils' | 'vegetables' | 'proteins' | 'dairy' | 'household' | 'other'
          unit?: string
          baseline_price?: number
          last_updated?: string
        }
      }
      grocery_trips: {
        Row: {
          id: string
          user_id: string
          store: string
          location: string
          estimated_total: number
          actual_total: number | null
          status: 'planning' | 'shopping' | 'completed'
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          store: string
          location: string
          estimated_total: number
          actual_total?: number | null
          status?: 'planning' | 'shopping' | 'completed'
          date: string
        }
        Update: {
          store?: string
          location?: string
          estimated_total?: number
          actual_total?: number | null
          status?: 'planning' | 'shopping' | 'completed'
        }
      }
      grocery_trip_items: {
        Row: {
          id: string
          trip_id: string
          item_id: string
          suggested_price: number
          actual_price: number | null
          quantity: number
          added_at: string
        }
        Insert: {
          trip_id: string
          item_id: string
          suggested_price: number
          actual_price?: number | null
          quantity: number
        }
        Update: {
          suggested_price?: number
          actual_price?: number | null
          quantity?: number
        }
      }
      price_records: {
        Row: {
          id: string
          item_id: string
          price: number
          store: string
          location: string
          user_id: string
          date: string
          confidence: 'high' | 'medium' | 'low'
        }
        Insert: {
          item_id: string
          price: number
          store: string
          location: string
          user_id: string
          date: string
          confidence: 'high' | 'medium' | 'low'
        }
        Update: {
          price?: number
          confidence?: 'high' | 'medium' | 'low'
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          default_location: string
          default_store: string
          theme: string
          language: string
          budget_reminders: boolean
          price_alerts: boolean
          group_updates: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          default_location: string
          default_store: string
          theme: string
          language: string
          budget_reminders: boolean
          price_alerts: boolean
          group_updates: boolean
        }
        Update: {
          default_location?: string
          default_store?: string
          theme?: string
          language?: string
          budget_reminders?: boolean
          price_alerts?: boolean
          group_updates?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
