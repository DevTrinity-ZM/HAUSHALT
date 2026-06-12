-- Fix RLS infinite recursion for group_members table
-- This removes the circular dependency in the "Group admins can manage memberships" policy
 
-- Drop the problematic policy
DROP POLICY IF EXISTS "Group admins can manage memberships" ON group_members;
 
-- The existing policies provide sufficient basic membership management:
-- - Group members can view their own membership
-- - Users can join/leave groups
-- - Users can update their own membership
-- Admin management will be handled at the application level
 
-- Note: The circular dependency was caused by the policy querying group_members
-- to check if a user is an admin, which triggered the same policy again.
 