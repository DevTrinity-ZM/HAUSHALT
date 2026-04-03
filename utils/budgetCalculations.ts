export interface BudgetCategory {
  name: string;
  plannedAmount: number;
  spentAmount: number;
  percentage: number;
  color: string;
}

export interface UserProfile {
  userType: 'student_hostel' | 'student_private' | 'professional' | 'sharing_roommates';
  location: 'kitwe' | 'lusaka' | 'other';
  householdSize: number;
  monthlyIncome?: number;
}

export interface BudgetSuggestion {
  category: string;
  amount: number;
  percentage: number;
  reasoning: string;
}

// Location-based budget multipliers
const LOCATION_MULTIPLIERS = {
  kitwe: 0.9,  // Lower cost of living
  lusaka: 1.2, // Higher cost of living
  other: 1.0
};

// User type budget allocations
const USER_TYPE_ALLOCATIONS = {
  student_hostel: {
    groceries: 45,
    transport: 15,
    airtime_data: 12,
    rent: 0, // Included in hostel fees
    personal: 20,
    utilities: 8
  },
  student_private: {
    groceries: 35,
    transport: 12,
    airtime_data: 10,
    rent: 30,
    personal: 8,
    utilities: 5
  },
  professional: {
    groceries: 25,
    transport: 10,
    airtime_data: 5,
    rent: 35,
    personal: 15,
    utilities: 10
  },
  sharing_roommates: {
    groceries: 30,
    transport: 12,
    airtime_data: 8,
    rent: 25, // Split among roommates
    personal: 15,
    utilities: 10
  }
};

export function generateBudgetSuggestions(profile: UserProfile): BudgetSuggestion[] {
  const baseBudget = profile.monthlyIncome || 2000; // Default if no income provided
  const locationMultiplier = LOCATION_MULTIPLIERS[profile.location] || 1.0;
  const adjustedBudget = baseBudget * locationMultiplier;
  
  const allocations = USER_TYPE_ALLOCATIONS[profile.userType];
  const suggestions: BudgetSuggestion[] = [];
  
  Object.entries(allocations).forEach(([category, percentage]) => {
    const amount = Math.round((adjustedBudget * percentage / 100) * 100) / 100;
    
    let reasoning = '';
    switch (category) {
      case 'groceries':
        reasoning = profile.householdSize > 1 
          ? `Based on ${profile.householdSize} people sharing groceries`
          : 'Standard grocery budget for single person';
        break;
      case 'rent':
        reasoning = profile.userType === 'student_hostel'
          ? 'Not applicable - included in hostel fees'
          : `Split housing costs for ${profile.location}`;
        break;
      case 'transport':
        reasoning = `Average transport costs in ${profile.location}`;
        break;
      case 'airtime_data':
        reasoning = 'Moderate data and airtime usage';
        break;
      default:
        reasoning = 'Standard allocation based on profile';
    }
    
    suggestions.push({
      category: category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      amount,
      percentage,
      reasoning
    });
  });
  
  return suggestions;
}

export function calculateBudgetProgress(
  categories: BudgetCategory[]
): {
  totalBudget: number;
  totalSpent: number;
  totalPercentage: number;
  isOverBudget: boolean;
} {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.plannedAmount, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const totalPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  
  return {
    totalBudget,
    totalSpent,
    totalPercentage: Math.round(totalPercentage * 10) / 10,
    isOverBudget: totalPercentage > 100
  };
}

export function categorizeSpending(transactions: Array<{
  amount: number;
  description: string;
  date: Date;
}>): BudgetCategory[] {
  // This would integrate with the expense categorization utility
  // For now, return sample categories
  return [
    { name: 'Groceries', plannedAmount: 1677, spentAmount: 1200, percentage: 71, color: '#10B981' },
    { name: 'Transport', plannedAmount: 400, spentAmount: 180, percentage: 45, color: '#F59E0B' },
    { name: 'Airtime/Data', plannedAmount: 300, spentAmount: 250, percentage: 83, color: '#8B5CF6' },
    { name: 'Rent', plannedAmount: 800, spentAmount: 800, percentage: 100, color: '#6366F1' },
    { name: 'Personal', plannedAmount: 500, spentAmount: 20, percentage: 4, color: '#6B7280' }
  ];
}

export function getBudgetInsights(categories: BudgetCategory[]): {
  highestSpending: string;
  lowestSpending: string;
  riskCategories: string[];
  savings: number;
} {
  const sortedBySpending = [...categories].sort((a, b) => b.spentAmount - a.spentAmount);
  const riskCategories = categories
    .filter(cat => cat.percentage > 80)
    .map(cat => cat.name);
  
  const totalPlanned = categories.reduce((sum, cat) => sum + cat.plannedAmount, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spentAmount, 0);
  const savings = totalPlanned - totalSpent;
  
  return {
    highestSpending: sortedBySpending[0]?.name || 'None',
    lowestSpending: sortedBySpending[sortedBySpending.length - 1]?.name || 'None',
    riskCategories,
    savings: Math.max(0, savings)
  };
}
