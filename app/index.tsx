import { Redirect } from 'expo-router';

export default function IndexScreen() {
  // This will be our entry point that determines where to route the user
  // For now, we'll redirect to onboarding. In a real app, this would check
  // if the user is authenticated and has completed onboarding
  // Updated: Root index route added to fix routing warnings
  return <Redirect href="/(onboarding)/welcome" />;
}
