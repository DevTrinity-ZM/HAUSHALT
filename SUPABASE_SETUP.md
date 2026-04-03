# Supabase Backend Integration Setup Guide

This guide will help you set up the complete Supabase backend for the HAUSHALT budget app with real-time synchronization.

## Prerequisites

- A Supabase account (https://supabase.com)
- Node.js and npm installed
- Basic knowledge of SQL and database concepts

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign in with GitHub, Google, or email
4. Click "New Project"
5. Choose your organization
6. Enter project details:
   - **Project Name**: `haushalt-budget-app`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose the closest region to your users
7. Click "Create new project"
8. Wait for the project to be set up (2-3 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL editor
5. Click **"Run"** to execute the schema

This will create:
- All necessary tables with proper relationships
- Row Level Security (RLS) policies
- Indexes for performance
- Initial grocery items data
- Triggers for automatic timestamp updates

## Step 3: Configure Environment Variables

1. In your Supabase project, go to **Settings** → **API**
2. Copy the **Project URL** and **anon public key**
3. Create a `.env.local` file in your project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Replace with your actual Supabase credentials

## Step 4: Set Up Authentication

1. In Supabase, go to **Authentication** → **Settings**
2. Configure the following:

### Site URL
```
exp://127.0.0.1:8081
```

### Redirect URLs (add these):
```
exp://127.0.0.1:8081
haushalt://auth/callback
haushalt://auth/reset-password
```

### Additional Providers
- Enable **Email** provider (already enabled by default)
- Enable **Google** provider if you want Google sign-in:
  - Add your Google OAuth credentials
  - Set authorized redirect URIs

## Step 5: Enable Real-time Subscriptions

1. Go to **Database** → **Replication**
2. For each table, click **"Enable"**:
   - user_profiles
   - budget_categories  
   - expenses
   - groups
   - group_members
   - group_expenses
   - settlements
   - grocery_trips
   - grocery_trip_items
   - price_records
   - user_preferences

## Step 6: Test the Connection

1. Update your app's entry point to use the new services
2. Run your app:
   ```bash
   npm start
   ```
3. Test sign up and sign in functionality
4. Verify data appears in Supabase tables

## Step 7: Real-time Features Testing

The app now includes real-time synchronization:

### Features Enabled:
- **Live expense updates**: When one user adds an expense, it appears instantly for all group members
- **Budget progress**: Real-time budget updates as expenses are added
- **Group activities**: Live updates for group expenses and settlements
- **Grocery price updates**: Community price sharing in real-time

### Testing Real-time:
1. Open the app on two devices/simulators
2. Sign in with different accounts
3. Create a shared group
4. Add expenses from one device
5. Watch updates appear on the other device instantly

## Database Schema Overview

### Core Tables:
- **user_profiles**: User information and preferences
- **budget_categories**: Monthly budget allocations
- **expenses**: Individual expense records
- **groups**: Shared expense groups
- **group_members**: Group membership management
- **group_expenses**: Shared expense records
- **settlements**: Debt settlements between users

### Grocery System:
- **grocery_items**: Master list of grocery items
- **grocery_trips**: Shopping trip records
- **grocery_trip_items**: Items in each trip
- **price_records**: Historical price data for suggestions

### Security Features:
- **Row Level Security**: Users can only access their own data
- **Group-based access**: Proper sharing rules for group data
- **JWT authentication**: Secure user sessions

## API Integration Points

### Authentication Service (`lib/auth.ts`)
- Sign up/in/out functionality
- Session management
- Password reset
- OAuth integration

### Data Services (`lib/services/`)
- **ProfileService**: User profile management
- **ExpenseService**: Expense CRUD operations
- **BudgetService**: Budget category management
- **GroupService**: Group and settlement management
- **GroceryService**: Shopping and price tracking

### Real-time Hooks (`hooks/use-realtime-data.ts`)
- Live data synchronization
- Automatic UI updates
- Connection status monitoring

## Performance Optimizations

### Database Indexes:
- User-based queries indexed by `user_id`
- Date-based queries indexed by `date`
- Group queries indexed by `group_id`

### Real-time Optimizations:
- Efficient subscription management
- Automatic cleanup of unused channels
- Connection status monitoring

## Troubleshooting

### Common Issues:

1. **"No rows returned" error**
   - Check if RLS policies are properly set
   - Verify user is authenticated

2. **Real-time not working**
   - Ensure replication is enabled for tables
   - Check network connection
   - Verify Supabase URL and keys

3. **Authentication errors**
   - Check redirect URLs in Supabase settings
   - Verify environment variables
   - Ensure proper OAuth configuration

4. **Performance issues**
   - Check database indexes
   - Monitor query performance in Supabase dashboard
   - Consider adding more indexes for slow queries

## Production Considerations

### Security:
- Never expose service role keys in client code
- Use proper RLS policies
- Monitor authentication logs
- Set up email verification

### Scaling:
- Monitor database size and performance
- Set up proper backup strategies
- Consider read replicas for high traffic
- Implement caching where appropriate

### Monitoring:
- Set up Supabase dashboards
- Monitor real-time connection usage
- Track authentication events
- Set up alerts for unusual activity

## Next Steps

1. **Custom Functions**: Add database functions for complex calculations
2. **Storage**: Use Supabase Storage for file uploads (receipts, etc.)
3. **Edge Functions**: Implement server-side logic for complex operations
4. **Analytics**: Set up usage analytics and reporting
5. **Push Notifications**: Integrate push notifications for real-time alerts

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [React Native Integration](https://supabase.com/docs/guides/getting-started/quickstarts/react-native)
- [Realtime Subscriptions](https://supabase.com/docs/guides/realtime)

Your HAUSHALT app is now fully integrated with Supabase backend and ready for production!
