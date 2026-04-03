import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="basic-info" options={{ title: 'Tell us about yourself' }} />
      <Stack.Screen name="suggested-budget" options={{ title: 'Your Suggested Budget' }} />
    </Stack>
  );
}
