export interface ExpenseCategory {
  name: string;
  keywords: string[];
  icon: string;
  color: string;
}

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  {
    name: 'Groceries',
    keywords: ['shoprite', 'pick n pay', 'choppies', 'food', 'groceries', 'market', 'spar', 'muvi', 'game'],
    icon: 'cart',
    color: '#10B981'
  },
  {
    name: 'Transport',
    keywords: ['kombi', 'bus', 'taxi', 'uber', 'bolt', 'fuel', 'petrol', 'transport', 'travel'],
    icon: 'car',
    color: '#F59E0B'
  },
  {
    name: 'Airtime/Data',
    keywords: ['mtn', 'airtel', 'zamtel', 'airtime', 'data', 'wifi', 'internet', 'bundle'],
    icon: 'phone',
    color: '#8B5CF6'
  },
  {
    name: 'Utilities',
    keywords: ['zesco', 'water', 'electricity', 'utility', 'power', 'bill'],
    icon: 'bolt',
    color: '#EF4444'
  },
  {
    name: 'Rent',
    keywords: ['rent', 'landlord', 'accommodation', 'hostel', 'boarding'],
    icon: 'home',
    color: '#6366F1'
  },
  {
    name: 'Entertainment',
    keywords: ['movie', 'cinema', 'netflix', 'showmax', 'music', 'spotify', 'game'],
    icon: 'play',
    color: '#EC4899'
  },
  {
    name: 'Healthcare',
    keywords: ['pharmacy', 'clinic', 'hospital', 'medicine', 'doctor', 'health'],
    icon: 'heart',
    color: '#F43F5E'
  },
  {
    name: 'Education',
    keywords: ['books', 'stationery', 'school', 'tuition', 'course', 'exam'],
    icon: 'book',
    color: '#3B82F6'
  },
  {
    name: 'Personal',
    keywords: ['clothing', 'shoes', 'personal', 'grooming', 'hair'],
    icon: 'person',
    color: '#6B7280'
  }
];

export function categorizeExpense(description: string): ExpenseCategory {
  const lowerDescription = description.toLowerCase();
  
  for (const category of EXPENSE_CATEGORIES) {
    for (const keyword of category.keywords) {
      if (lowerDescription.includes(keyword)) {
        return category;
      }
    }
  }
  
  // Default to Personal if no match found
  return EXPENSE_CATEGORIES.find(cat => cat.name === 'Personal')!;
}

export function extractAmount(description: string): number | null {
  // Extract amount from description like "Shoprite 350" or "MTN K100"
  const amountRegex = /(?:K|ZMW)?\s*(\d+(?:\.\d{2})?)/i;
  const match = description.match(amountRegex);
  
  if (match) {
    return parseFloat(match[1]);
  }
  
  return null;
}

export function parseExpenseInput(input: string): {
  category: ExpenseCategory;
  amount: number | null;
  merchant: string;
  cleanDescription: string;
} {
  const amount = extractAmount(input);
  const category = categorizeExpense(input);
  
  // Extract merchant name (first word before amount)
  const parts = input.trim().split(/\s+/);
  const merchant = parts[0] || '';
  
  return {
    category,
    amount,
    merchant,
    cleanDescription: input.trim()
  };
}
