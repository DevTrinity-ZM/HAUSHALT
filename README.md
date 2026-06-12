# HAUSHALT - Smart Budget Management for Zambian Students

A comprehensive React Native + Expo mobile application designed specifically for Zambian students to manage personal finances, track expenses, share costs with roommates, and plan grocery shopping intelligently. Built with Supabase backend.

## 🎯 Target Audience

HAUSHALT is tailored for Zambian university students who need to:
- Track monthly expenses and stay within budget
- Split shared expenses (rent, groceries, utilities) with roommates
- Plan grocery shopping with price comparisons across Zambian stores
- Manage finances in Zambian Kwacha (ZMW)

## 🇿🇲 Zambian-Specific Features

- **Currency**: Uses Zambian Kwacha (ZMW/K) throughout the app
- **Locations**: Pre-configured Zambian cities (Kitwe, Lusaka) with custom location support
- **Stores**: Major Zambian retailers (Shoprite, Pick n Pay, Game, Spar, Choppies, local markets)
- **Grocery Database**: Built-in catalog of typical Zambian products (mealie meal, kapenta, rape, kalembula, chibuki, etc.)
- **User Types**: Designed for Zambian student living situations (hostel, private rental, sharing with roommates)

## Recent Updates
- **Infrastructure fixes**: Resolved routing errors, import issues, and service configuration problems
- **Code quality**: Fixed TypeScript errors, reduced lint warnings from 41 to 33 (0 errors)
- **Service improvements**: Added missing service functions and implemented AsyncStorage for persistence
- **Navigation**: Fixed route structure and removed invalid route references
- **Schema fixes**: Added missing budget fields to user_preferences table, created migration script
- **User state persistence**: Implemented AsyncStorage-based user state saving after login

## Features

### Core Features (Working ✅)

#### 🏠 Dashboard
- **Budget Overview**: Monthly budget summary with progress bars and spending insights
- **Recent Expenses**: Quick view of latest spending with categorization
- **Spending Insights**: Visual feedback on budget utilization and over-budget warnings
- **Group Summary**: Quick view of shared expense groups and outstanding balances

#### 💰 Budget Management
- **Budget Categories**: Pre-configured categories (Groceries 45%, Transport 15%, Airtime/Data 10%, Rent 30%, Personal 15%)
- **Custom Categories**: Add and modify budget categories based on personal needs
- **Progress Tracking**: Real-time progress bars showing spending vs. budget limits
- **Budget Alerts**: Visual warnings when approaching or exceeding budget limits
- **Monthly Overview**: View and manage budgets by month with historical data

#### 📝 Expense Tracking
- **Add Expenses**: Quick expense entry with automatic amount and merchant detection
- **Smart Categorization**: Auto-categorizes expenses based on keywords (e.g., "Shoprite" → Groceries, "MTN" → Airtime)
- **Expense Categories**: Groceries, Transport, Airtime/Data, Utilities, Rent, Entertainment, Healthcare, Education, Personal
- **Expense History**: View and track all past expenses with filtering options
- **Merchant Recognition**: Automatic merchant extraction from expense descriptions

#### 👥 Group Expense Sharing
- **Create Groups**: Form expense-sharing groups with roommates, friends, or family
- **Add Members**: Invite members via email or student ID with role management (admin/member)
- **Split Expenses**: Add shared expenses and split costs evenly or custom amounts
- **Balance Tracking**: Real-time balance tracking showing who owes whom
- **Settlement System**: Track and settle up debts between group members
- **Group Details**: View group expenses, member contributions, and settlement history

#### 🛒 Grocery Shopping Planning
- **Location Selection**: Choose from Zambian cities (Kitwe, Lusaka) or create custom locations
- **Store Options**: Select from major retailers (Shoprite, Pick n Pay, Game, Spar, Choppies) and local markets
- **Price Database**: Built-in catalog of Zambian grocery items with realistic baseline prices
- **Shopping Modes**: Single-store shopping or multi-store budget comparison
- **Shopping Lists**: Create and manage shopping lists with estimated costs
- **Price Suggestions**: Get estimated prices for common Zambian grocery items

#### 👤 User Profile & Settings
- **Profile Management**: View and edit personal information (name, email, student ID)
- **User Types**: Select living situation (student in hostel, renting privately, professional, sharing with roommates)
- **Location Preferences**: Set primary location for personalized features
- **Household Size**: Specify number of people sharing expenses
- **Budget Settings**: Customize monthly budget, currency preferences, alert settings
- **Data Export**: Export financial data for external analysis

#### 🔐 Authentication
- **Sign Up**: User registration with email, password, and profile information
- **Sign In**: Secure login with email/password authentication
- **Session Management**: Persistent sessions with AsyncStorage
- **Password Recovery**: Forgot password functionality (Supabase Auth)

#### 📱 Onboarding Flow
- **Welcome Screen**: Feature overview and app introduction
- **Basic Info Collection**: Gather user profile data for personalized experience
- **Budget Suggestions**: AI-powered budget recommendations based on user profile
- **Quick Start**: Get started quickly with pre-configured settings

### Features In Progress (Needs Connection 🔧)
- **Grocery Shopping Integration**: UI complete, needs state management refactoring to connect to GroceryService
- **Price Tracking**: Historical price tracking and comparison features

### Features Not Started 🚧
- **Notifications**: Push notifications for budget alerts and expense reminders
- **Help & Feedback**: UI complete, needs backend integration
- **Account Deletion**: UI complete, needs implementation

## Tech Stack

### Frontend
- **Framework**: React Native + Expo SDK ~54.0
- **Language**: TypeScript ~5.9.2
- **Navigation**: Expo Router v6.0 (file-based routing)
- **State Management**: React Context API with useReducer
- **UI Components**: Custom component library with dark theme
- **Icons**: Expo Symbols (SF Symbols) for iOS-style icons
- **Animations**: React Native Reanimated ~4.1.1
- **Gestures**: React Native Gesture Handler ~2.28.0
- **Web Support**: Expo Web with Vercel deployment

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/password)
- **Real-time**: Supabase Realtime for live data synchronization
- **Storage**: AsyncStorage for local data persistence
- **Client**: @supabase/supabase-js v2.100.0

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint with Expo config
- **Build System**: Expo CLI with Metro bundler
- **Environment**: dotenv for environment variable management

## Web Deployment (Vercel)

### Environment Variables Required
For web deployment on Vercel, you need to set these environment variables:

- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

### Local Web Build
```bash
# Build the web version locally
npm run web:build

# Preview the built web version
npm run web
```

### Vercel Deployment Steps
1. Push your code to GitHub
2. Import your project in Vercel
3. Add the environment variables in Vercel project settings
4. Deploy - Vercel will automatically run `npm run web:build`
5. Your app will be available at your Vercel domain

### Notes
- The web build outputs to the `dist/` directory
- Vercel automatically handles static file serving
- Single Page Application routing is configured in vercel.json

## Project Structure

```
myApp/
├── app/                        # Main application code
│   ├── (auth)/                 # Auth screens (sign-in, sign-up)
│   ├── (onboarding)/           # Onboarding flow (welcome, basic-info, suggested-budget)
│   ├── (tabs)/                 # Main app tabs (dashboard, budget, groups, grocery, profile)
│   ├── _layout.tsx             # Root layout with navigation
│   ├── index.tsx               # Root redirect
│   └── *.tsx                   # Modal screens (add-expense, budget-settings, etc.)
├── components/                 # Reusable UI components
│   ├── ui/                     # UI primitives (Button, Card, Input, IconSymbol)
│   └── *.tsx                   # ThemedText, ThemedView, HapticTab
├── contexts/                   # React Context providers
│   └── app-context.tsx         # Auth + App state management
├── lib/                        # Backend services
│   ├── auth.ts                 # Supabase auth service
│   ├── supabase.ts             # Supabase client + realtime
│   ├── storage.ts              # AsyncStorage for user state persistence
│   ├── database-types.ts       # TypeScript types
│   └── services/               # Data services
│       ├── profile-service.ts  # User profile CRUD
│       ├── budget-service.ts   # Budget categories CRUD
│       ├── expense-service.ts  # Expenses CRUD
│       ├── group-service.ts    # Groups & members CRUD
│       └── grocery-service.ts  # Grocery & shopping CRUD
├── utils/                      # Utility functions
│   ├── budgetCalculations.ts   # Budget math
│   ├── expenseCategorization.ts # Auto-categorization
│   ├── groceryData.ts          # Grocery price data
│   ├── groupCalculations.ts    # Split calculations
│   ├── priceSuggestions.ts     # Price suggestions
│   ├── validation.ts           # Input validation
└── supabase-schema.sql         # Database schema (run in Supabase)
```

## Database Schema

### Tables Overview

#### User Management
- `auth.users` - Supabase managed authentication users
- `user_profiles` - Extended user information (name, student ID, user type, location, household size, income)
- `user_preferences` - App settings and preferences (currency, budget alerts, auto-categorization, monthly budget)

#### Budget & Expenses
- `budget_categories` - Monthly budget allocations by category with color coding
- `expenses` - Individual expense records with categorization and group association
- `budget_settings` - Budget configuration and alert thresholds

#### Group Expense Sharing
- `groups` - Expense sharing groups with status tracking
- `group_members` - Group membership with roles (admin/member)
- `group_expenses` - Shared expense records with split information
- `settlements` - Payment settlement tracking between group members

#### Grocery Shopping
- `grocery_items` - Product catalog with baseline prices and categories
- `grocery_trips` - Shopping trip records with item lists
- `price_records` - Historical price data for trend analysis

### Database Setup

#### Initial Setup
Run the complete schema setup in your Supabase SQL Editor:
```bash
# Copy and run the contents of supabase-schema.sql
```

#### Migration for Existing Databases
If you already have the schema installed, run the migration script:
```sql
-- Run migration-add-budget-preferences.sql to add missing fields
-- This adds: currency, budget_alerts, auto_categorize, monthly_budget
```

#### RLS Policies
The schema includes Row Level Security (RLS) policies to ensure users can only access their own data. Key policies include:
- User profiles: Users can only view/edit their own profile
- Budget categories: Users can only manage their own budgets
- Groups: Users can only view groups they created or are members of
- Expenses: Users can only view their own expenses or shared group expenses

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your mobile device (for testing)
- Supabase account (free tier works)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create `.env.local` in the project root:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select existing one
3. Navigate to Project Settings → API
4. Copy the Project URL and anon/public key

### 3. Database Setup
1. **Create Database Tables**: Run the schema setup script
   ```bash
   # Copy the contents of supabase-schema.sql
   # Paste in Supabase SQL Editor and execute
   ```

2. **Run RLS Policy Fix** (Important for groups functionality):
   ```sql
   DO $$
   DECLARE
       pol RECORD;
   BEGIN
       FOR pol IN SELECT policyname FROM pg_policies WHERE tablename IN ('groups', 'group_members')
       LOOP
           EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, 
               CASE WHEN pol.tablename = 'groups' THEN 'groups' ELSE 'group_members' END);
       END LOOP;
   END $$;

   ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
   ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Groups view" ON groups FOR SELECT USING (created_by = auth.uid());
   CREATE POLICY "Groups create" ON groups FOR INSERT WITH CHECK (created_by = auth.uid());
   CREATE POLICY "Groups update" ON groups FOR UPDATE USING (created_by = auth.uid());
   CREATE POLICY "Groups delete" ON groups FOR DELETE USING (created_by = auth.uid());

   CREATE POLICY "Members view" ON group_members FOR SELECT USING (user_id = auth.uid());
   CREATE POLICY "Members insert" ON group_members FOR INSERT WITH CHECK (user_id = auth.uid());
   CREATE POLICY "Members delete" ON group_members FOR DELETE USING (user_id = auth.uid());
   ```

3. **Run Migration** (if updating existing database):
   ```bash
   # Run migration-add-budget-preferences.sql to add missing fields
   ```

### 4. Start Development Server
```bash
# Standard start
npx expo start

# Clear cache (recommended after changes or if encountering issues)
npx expo start --clear

# Manual cache clear
rm -rf node_modules/.cache
npx expo start
```

### 5. Testing
- **iOS**: Press `i` in terminal or use Expo Go app
- **Android**: Press `a` in terminal or use Expo Go app
- **Web**: Press `w` in terminal (limited functionality)

### Troubleshooting
- **Routing warnings**: Run `npx expo start --clear`
- **Bundling errors**: Clear cache and restart
- **Database connection**: Verify environment variables and Supabase project status

## Current Status

### Fully Working ✅
- **User Authentication**: Complete sign up/in flow with Supabase Auth
- **Dashboard**: Budget overview, recent expenses, spending insights, group summaries
- **Budget Management**: Categories display, progress tracking, settings configuration
- **Expense Tracking**: Add expenses with smart categorization, expense history
- **Group Management**: Create groups, add members, view group details
- **Expense Sharing**: Add shared expenses, split costs, balance tracking
- **Profile Management**: View and edit user profiles
- **Onboarding Flow**: Welcome → Sign Up → Basic Info → Suggested Budget → Dashboard
- **Real-time Updates**: Supabase Realtime for live data synchronization
- **Service Infrastructure**: All CRUD operations implemented and connected
- **Navigation**: Proper Expo Router structure with tab navigation

### Recently Completed 🔧
- **Database Integration**: All screens connected to respective services
- **User State Persistence**: AsyncStorage for session management
- **Expense Categorization**: Smart auto-categorization based on keywords
- **Group Functionality**: Complete group expense sharing with settlements
- **Budget Settings**: User preferences and budget configuration
- **TypeScript Coverage**: Full type safety across the application
- **Error Handling**: Comprehensive error handling and user feedback

### In Development 🚧
- **Grocery Shopping Integration**: Connecting UI to GroceryService
- **Price Tracking**: Historical price data and trend analysis
- **Advanced Analytics**: Spending patterns and insights

### Planned Features �
- **Push Notifications**: Budget alerts and expense reminders
- **Data Export**: CSV/PDF export for financial records
- **Help & Support**: In-app help documentation and feedback system
- **Account Management**: Account deletion and data cleanup

## Navigation Flow

```
App Entry
  └── index.tsx → Redirect to /(tabs)/dashboard

Auth (if not logged in)
  └── (auth)/sign-in.tsx or sign-up.tsx

Onboarding (after sign up)
  └── (onboarding)/welcome.tsx → sign-up.tsx → basic-info.tsx → dashboard.tsx

Main App (Tabs)
  └── (tabs)/
      ├── dashboard.tsx (Home)
      ├── groups.tsx
      ├── budget.tsx
      ├── grocery.tsx
      └── profile.tsx

Modals
  └── add-expense.tsx
      add-shared-expense.tsx
      budget-settings.tsx
      create-group.tsx
      edit-profile.tsx
      etc.
```

## Services API

All services return `{ success: boolean, data?: T, error?: string }`:

```typescript
// Profile
ProfileService.getProfile(userId)
ProfileService.upsertProfile(profileData)
ProfileService.searchUsers(query, currentUserId)

// Budget
BudgetService.getBudgetCategories(userId, month, year)
BudgetService.upsertBudgetCategory(categoryData)
BudgetService.getUserPreferences(userId) // ✅ Recently added
BudgetService.upsertUserPreferences(preferences)
BudgetService.getBudgetOverview(userId, month, year)

// Expenses
ExpenseService.getExpenses(userId, limit, offset)
ExpenseService.addExpense(expenseData)
ExpenseService.updateExpense(expenseId, updates)
ExpenseService.deleteExpense(expenseId)

// Groups
GroupService.getUserGroups(userId)
GroupService.getGroupDetails(groupId)
GroupService.createGroup(groupData, userId) // ✅ Fixed to include created_by
GroupService.addGroupMember(groupId, userId, role)
GroupService.addGroupMembers(groupId, userIds, role)
GroupService.createGroupExpense(expenseData)

// Grocery
GroceryService.getGroceryItems()
GroceryService.searchGroceryItems(query)
GroceryService.createTrip(tripData)
GroceryService.getUserTrips(userId)
GroceryService.getTripDetails(tripId)
GroceryService.addItemToTrip(tripId, itemId, price, quantity)
GroceryService.removeItemFromTrip(tripId, itemId)
GroceryService.completeTrip(tripId)
```

## Troubleshooting

### Metro bundler cache issues
If you experience routing warnings, bundling errors, or stale code:
```bash
npx expo start --clear
# or manually:
rm -rf node_modules/.cache
npx expo start
```

### Common errors
- **"No route named 'grocery' exists"** - Clear Metro cache with `npx expo start --clear`
- **"Network request failed"** - Check Supabase URL and anon key in `.env.local`
- **TypeScript/Import errors** - Run `npm run lint` to identify specific issues
- **AsyncStorage errors** - Fixed in recent updates, ensure cache is cleared

### Supabase connection issues
- Check `.env.local` variables
- Verify Supabase project is running
- Check RLS policies are set correctly

### Group loading error (recursion)
Run the SQL fix in Supabase SQL Editor (see Setup section)

### Duplicate profile rows
```sql
DELETE FROM user_profiles 
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id) id 
  FROM user_profiles 
  ORDER BY user_id, created_at DESC
);
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test on both iOS and Android
5. Submit pull request

## License

MIT License - See LICENSE file for details

## Contact

For support, email support@haushalt.app or open an issue on GitHub.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
