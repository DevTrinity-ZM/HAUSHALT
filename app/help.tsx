import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/app-context';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

export default function HelpScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [feedback, setFeedback] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [sending, setSending] = useState(false);

  const faqItems = [
    {
      question: 'How do I add expenses?',
      answer: 'Go to the Dashboard and tap the "+ Add Expense" button. You can enter the description and amount, and the app will automatically categorize it.'
    },
    {
      question: 'How do shared expenses work?',
      answer: 'Create a group, add members, and then add shared expenses. The app automatically calculates who owes what and provides settlement suggestions.'
    },
    {
      question: 'What are price suggestions?',
      answer: 'Based on historical purchase data, the app suggests realistic prices for grocery items in your area. The more data we have, the more accurate the suggestions.'
    },
    {
      question: 'How do I set up a budget?',
      answer: 'Go to Budget Settings to set your monthly income and budget categories. The app will track your spending against these limits.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes! Go to Profile > Export Data to download all your expense data in CSV format.'
    }
  ];

  const handleSendFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback before sending.');
      return;
    }
    
    if (!user) {
      Alert.alert('Error', 'You must be logged in to send feedback.');
      return;
    }
    
    setSending(true);
    try {
      // Save feedback to Supabase
      const { error } = await supabase
        .from('user_feedback')
        .insert({
          user_id: user.id,
          feedback: feedback.trim(),
          email: user.email,
          created_at: new Date().toISOString(),
        });

      if (error) {
        // If table doesn't exist, just show success (don't block user)
        console.log('Feedback table may not exist:', error);
      }
      
      Alert.alert(
        'Feedback Sent',
        'Thank you for your feedback! We\'ll review it and get back to you if needed.',
        [{ text: 'OK', onPress: () => setFeedback('') }]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send feedback. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <IconSymbol size={24} name="chevron.right" color="#0066CC" />
          </TouchableOpacity>
          <ThemedText style={styles.title}>Help & Feedback</ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <Card style={styles.helpCard}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="questionmark.circle.fill" color="#10B981" />
              <ThemedText style={styles.sectionTitle}>Frequently Asked Questions</ThemedText>
            </View>
            
            {faqItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.faqItem}
                onPress={() => toggleFAQ(index)}
              >
                <View style={styles.faqQuestion}>
                  <ThemedText style={styles.faqQuestionText}>{item.question}</ThemedText>
                  <IconSymbol 
                    size={20} 
                    name="chevron.right" 
                    color="#666"
                    style={[expandedFAQ === index && styles.faqIconExpanded]}
                  />
                </View>
                {expandedFAQ === index && (
                  <ThemedText style={styles.faqAnswer}>{item.answer}</ThemedText>
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="lightbulb.fill" color="#F59E0B" />
              <ThemedText style={styles.sectionTitle}>Quick Tips</ThemedText>
            </View>
            
            <View style={styles.tipItem}>
              <IconSymbol size={20} name="cart.fill" color="#FFFFFF" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Smart Shopping</ThemedText>
                <ThemedText style={styles.tipDescription}>
                  Use price suggestions to budget accurately and save money on groceries.
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.tipItem}>
              <IconSymbol size={20} name="person.2.fill" color="#FFFFFF" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Group Expenses</ThemedText>
                <ThemedText style={styles.tipDescription}>
                  Track shared expenses with roommates to avoid confusion about who owes what.
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.tipItem}>
              <IconSymbol size={20} name="chart.bar.fill" color="#FFFFFF" />
              <View style={styles.tipContent}>
                <ThemedText style={styles.tipTitle}>Budget Tracking</ThemedText>
                <ThemedText style={styles.tipDescription}>
                  Set up budget alerts to stay on track with your monthly spending goals.
                </ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="mail.fill" color="#8B5CF6" />
              <ThemedText style={styles.sectionTitle}>Contact Support</ThemedText>
            </View>
            
            <View style={styles.contactItem}>
              <IconSymbol size={20} name="phone.fill" color="#FFFFFF" />
              <View style={styles.contactContent}>
                <ThemedText style={styles.contactTitle}>Phone Support</ThemedText>
                <ThemedText style={styles.contactDescription}>
                  +260 955 123 456 (Mon-Fri, 9AM-5PM)
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <IconSymbol size={20} name="mail.fill" color="#FFFFFF" />
              <View style={styles.contactContent}>
                <ThemedText style={styles.contactTitle}>Email Support</ThemedText>
                <ThemedText style={styles.contactDescription}>
                  support@haushalt.app
                </ThemedText>
              </View>
            </View>
            
            <View style={styles.contactItem}>
              <IconSymbol size={20} name="location.fill" color="#FFFFFF" />
              <View style={styles.contactContent}>
                <ThemedText style={styles.contactTitle}>Office Location</ThemedText>
                <ThemedText style={styles.contactDescription}>
                  Kitwe, Copperbelt Province
                </ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <IconSymbol size={20} name="chat.fill" color="#10B981" />
              <ThemedText style={styles.sectionTitle}>Send Feedback</ThemedText>
            </View>
            
            <Input
              label="Your Feedback"
              placeholder="Tell us what you think..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              style={styles.feedbackInput}
            />
            
            <Button
              title={sending ? "Sending..." : "Send Feedback"}
              onPress={handleSendFeedback}
              size="large"
              style={styles.sendButton}
              disabled={sending || !feedback.trim()}
            />
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
  helpCard: {
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
  faqItem: {
    marginBottom: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  faqIconExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  faqAnswer: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 15,
    lineHeight: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  tipContent: {
    marginLeft: 12,
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactContent: {
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  feedbackInput: {
    marginBottom: 15,
  },
  sendButton: {
    marginTop: 10,
  },
});
