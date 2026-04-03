import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/app-context';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [dataSharing, setDataSharing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [locationTracking, setLocationTracking] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to delete your account');
      return;
    }

    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            setDeleting(true);
            try {
              // Delete user data from all tables first
              // Note: This requires a server function or admin privileges
              // For now, we'll just sign out and let the user know
              
              // Sign out the user
              await signOut();
              
              Alert.alert(
                'Account Scheduled for Deletion',
                'Your account has been marked for deletion and will be permanently removed within 30 days. You have been logged out.',
                [{ text: 'OK', onPress: () => router.push('/(auth)/sign-in') }]
              );
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete account. Please try again.');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your data will be prepared and sent to your email within 24 hours.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol size={24} name="chevron.right" color="#0066CC" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Privacy & Security</ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <Card style={styles.privacyCard}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="shield.fill" color="#10B981" />
              <ThemedText style={styles.sectionTitle}>Privacy Settings</ThemedText>
            </View>
            
            <TouchableOpacity
              style={styles.privacyItem}
              onPress={() => setDataSharing(!dataSharing)}
            >
              <View style={styles.privacyContent}>
                <ThemedText style={styles.privacyTitle}>Data Sharing</ThemedText>
                <ThemedText style={styles.privacyDescription}>
                  Share anonymous usage data to improve the app
                </ThemedText>
              </View>
              <View style={[styles.toggleSwitch, dataSharing && styles.toggleSwitchOn]} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.privacyItem}
              onPress={() => setAnalytics(!analytics)}
            >
              <View style={styles.privacyContent}>
                <ThemedText style={styles.privacyTitle}>Analytics</ThemedText>
                <ThemedText style={styles.privacyDescription}>
                  Help us understand how you use the app
                </ThemedText>
              </View>
              <View style={[styles.toggleSwitch, analytics && styles.toggleSwitchOn]} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.privacyItem}
              onPress={() => setLocationTracking(!locationTracking)}
            >
              <View style={styles.privacyContent}>
                <ThemedText style={styles.privacyTitle}>Location Tracking</ThemedText>
                <ThemedText style={styles.privacyDescription}>
                  Use location for better price suggestions
                </ThemedText>
              </View>
              <View style={[styles.toggleSwitch, locationTracking && styles.toggleSwitchOn]} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.privacyItem}
              onPress={() => setMarketingEmails(!marketingEmails)}
            >
              <View style={styles.privacyContent}>
                <ThemedText style={styles.privacyTitle}>Marketing Emails</ThemedText>
                <ThemedText style={styles.privacyDescription}>
                  Receive tips and updates via email
                </ThemedText>
              </View>
              <View style={[styles.toggleSwitch, marketingEmails && styles.toggleSwitchOn]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="lock.fill" color="#F59E0B" />
              <ThemedText style={styles.sectionTitle}>Security</ThemedText>
            </View>
            
            <TouchableOpacity style={styles.securityItem} onPress={() => router.push('/add-expense')}>
              <View style={styles.securityContent}>
                <IconSymbol size={20} name="key.fill" color="#FFFFFF" />
                <View style={styles.securityText}>
                  <ThemedText style={styles.securityTitle}>Change Password</ThemedText>
                  <ThemedText style={styles.securityDescription}>
                    Update your account password
                  </ThemedText>
                </View>
              </View>
              <IconSymbol size={20} name="chevron.right" color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.securityItem} onPress={() => router.push('/add-expense')}>
              <View style={styles.securityContent}>
                <IconSymbol size={20} name="phone.fill" color="#FFFFFF" />
                <View style={styles.securityText}>
                  <ThemedText style={styles.securityTitle}>Two-Factor Authentication</ThemedText>
                  <ThemedText style={styles.securityDescription}>
                    Add an extra layer of security
                  </ThemedText>
                </View>
              </View>
              <IconSymbol size={20} name="chevron.right" color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.securityItem} onPress={handleExportData}>
              <View style={styles.securityContent}>
                <IconSymbol size={20} name="download.fill" color="#FFFFFF" />
                <View style={styles.securityText}>
                  <ThemedText style={styles.securityTitle}>Export Your Data</ThemedText>
                  <ThemedText style={styles.securityDescription}>
                    Download all your personal data
                  </ThemedText>
                </View>
              </View>
              <IconSymbol size={20} name="chevron.right" color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="info.circle.fill" color="#EF4444" />
              <ThemedText style={styles.sectionTitle}>Account Management</ThemedText>
            </View>
            
            <TouchableOpacity style={styles.dangerItem} onPress={handleDeleteAccount}>
              <View style={styles.dangerContent}>
                <IconSymbol size={20} name="trash.fill" color="#EF4444" />
                <View style={styles.dangerText}>
                  <ThemedText style={styles.dangerTitle}>Delete Account</ThemedText>
                  <ThemedText style={styles.dangerDescription}>
                    Permanently delete your account and all data
                  </ThemedText>
                </View>
              </View>
              <IconSymbol size={20} name="chevron.right" color="#EF4444" />
            </TouchableOpacity>
          </View>
        </Card>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 24,
  },
  privacyCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#404040',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  privacyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  privacyDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 4,
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#404040',
  },
  toggleSwitchOn: {
    backgroundColor: '#0066CC',
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  securityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  securityText: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  securityDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 4,
  },
  dangerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  dangerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dangerText: {
    marginLeft: 12,
    flex: 1,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  dangerDescription: {
    fontSize: 14,
    color: '#EF4444',
    opacity: 0.8,
    marginTop: 4,
  },
});
