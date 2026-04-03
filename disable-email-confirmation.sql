-- Disable Email Confirmation for HAUSHALT App
-- Run this AFTER the main schema is successfully installed
-- This requires admin privileges - run in Supabase SQL Editor

-- Step 1: Auto-confirm all existing users
UPDATE auth.users 
SET email_confirmed_at = now() 
WHERE email_confirmed_at IS NULL;

-- Step 2: Set default to auto-confirm new users
ALTER TABLE auth.users 
ALTER COLUMN email_confirmed_at SET DEFAULT now();

-- Step 3: Create a trigger to auto-confirm new users
CREATE OR REPLACE FUNCTION public.auto_confirm_user()
RETURNS TRIGGER AS $$
BEGIN
    NEW.email_confirmed_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_user();

-- Step 4: Verify the changes
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
