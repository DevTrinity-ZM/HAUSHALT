import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
// import { supabase } from '@/lib/supabase';

export default function WelcomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    // Navigate to sign up
    router.push('/(auth)/sign-up');
  };

  const handleSignIn = () => {
    // Navigate to sign in
    router.push('/(auth)/sign-in');
  };

  // TODO: Check if user is already authenticated
  const checkAuthStatus = async () => {
    try {
      // const { data: { session } } = await supabase.auth.getSession();
      // if (session) {
      //   router.replace('/(tabs)');
      // }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.titleSection}>
          <View style={styles.iconContainer}>
            <IconSymbol size={60} name="home" color="#0066CC" />
          </View>
          <ThemedText type="title" style={styles.title}>
            HAUSHALT
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Your smart budget companion for Zambian students
          </ThemedText>
        </View>
        
        <View style={styles.featuresSection}>
          <Card style={styles.featureCard}>
            <View style={styles.featureItem}>
              <IconSymbol size={24} name="dollarsign.circle.fill" color="#10B981" />
              <View style={styles.featureContent}>
                <ThemedText style={styles.featureTitle}>Smart Budgeting</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Track expenses and manage your monthly budget
                </ThemedText>
              </View>
            </View>
          </Card>
          
          <Card style={styles.featureCard}>
            <View style={styles.featureItem}>
              <IconSymbol size={24} name="person.2.fill" color="#8B5CF6" />
              <View style={styles.featureContent}>
                <ThemedText style={styles.featureTitle}>Shared Expenses</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Split costs with roommates and friends
                </ThemedText>
              </View>
            </View>
          </Card>
          
          <Card style={styles.featureCard}>
            <View style={styles.featureItem}>
              <IconSymbol size={24} name="cart.fill" color="#F59E0B" />
              <View style={styles.featureContent}>
                <ThemedText style={styles.featureTitle}>Grocery Planning</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Compare prices and plan shopping trips
                </ThemedText>
              </View>
            </View>
          </Card>
        </View>
        
        <Card style={styles.card}>
          <Button
            title={loading ? "Loading..." : "Let's get started"}
            onPress={handleGetStarted}
            size="large"
            style={styles.button}
            disabled={loading}
          />
        </Card>
        
        <View style={styles.signInSection}>
          <ThemedText style={styles.signInText}>
            Already have an account?{' '}
          </ThemedText>
          <ThemedText 
            type="link" 
            onPress={handleSignIn}
            style={styles.signInLink}
          >
            Sign in
          </ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.8,
    color: '#FFFFFF',
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureCard: {
    marginBottom: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#2A2A2A',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureContent: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#2A2A2A',
  },
  button: {
    width: '100%',
  },
  signInSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
  },
  signInLink: {
    color: '#0066CC',
  },
});
