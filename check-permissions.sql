-- Check your current permissions in Supabase
SELECT 
    current_user as "Your Current User",
    session_user as "Session User",
    current_database() as "Database";

-- Check if you can see auth.users
SELECT 'Can view auth.users' as permission_check
FROM information_schema.tables 
WHERE table_schema = 'auth' 
AND table_name = 'users'
AND has_table_privilege(current_user, 'auth.users', 'SELECT');

-- Check if you can modify auth.users
SELECT 'Can modify auth.users' as permission_check
FROM information_schema.tables 
WHERE table_schema = 'auth' 
AND table_name = 'users'
AND has_table_privilege(current_user, 'auth.users', 'UPDATE');

-- List all users in auth.users (if you have permission)
SELECT 
    email,
    email_confirmed_at,
    created_at,
    CASE 
        WHEN email_confirmed_at IS NOT NULL THEN 'Confirmed'
        ELSE 'Not Confirmed'
    END as status
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;
