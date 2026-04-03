import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { suggestSettlements, formatCurrency } from '@/utils/groupCalculations';

export default function SettleUpScreen() {
  const router = useRouter();
  
  // Sample data - in real app, this would come from state/API
  const balances = [
    { userId: '1', userName: 'Christopher', amount: 125, isOwed: true },
    { userId: '2', userName: 'Niza', amount: 75, isOwed: true },
  ];

  const settlements = suggestSettlements(balances);

  const handleSettleUp = (from: string, to: string, amount: number) => {
    Alert.alert(
      'Confirm Settlement',
      `Pay ${formatCurrency(amount)} to ${to}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Pay Now', 
          onPress: () => {
            // Here you would integrate with payment system
            Alert.alert(
              'Success', 
              `Payment of ${formatCurrency(amount)} to ${to} initiated!`,
              [
                { 
                  text: 'OK', 
                  onPress: () => router.push('/(tabs)/groups')
                }
              ]
            );
          }
        }
      ]
    );
  };

  const goBack = () => {
    router.push('/(tabs)/groups');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Settle Up</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <ThemedText style={styles.sectionTitle}>Suggested Settlements</ThemedText>
          
          {settlements.length === 0 ? (
            <View style={styles.emptyState}>
              <IconSymbol size={48} name="checkmark.circle.fill" color="#10B981" />
              <ThemedText style={styles.emptyText}>All settled up!</ThemedText>
              <ThemedText style={styles.emptySubtext}>No payments needed at this time.</ThemedText>
            </View>
          ) : (
            settlements.map((settlement, index) => (
              <View key={index} style={styles.settlementItem}>
                <View style={styles.settlementInfo}>
                  <View style={styles.settlementHeader}>
                    <IconSymbol size={20} name="arrow.up.circle.fill" color="#EF4444" />
                    <ThemedText style={styles.settlementText}>
                      {settlement.from} pays {settlement.to}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.settlementAmount}>
                    {formatCurrency(settlement.amount)}
                  </ThemedText>
                </View>
                
                <Button
                  title={`Pay ${formatCurrency(settlement.amount)}`}
                  onPress={() => handleSettleUp(settlement.from, settlement.to, settlement.amount)}
                  size="small"
                  variant="outline"
                />
              </View>
            ))
          )}
        </Card>
        
        <Card style={styles.summaryCard}>
          <ThemedText style={styles.sectionTitle}>Balance Summary</ThemedText>
          
          {balances.map((balance, index) => (
            <View key={index} style={styles.balanceItem}>
              <View style={styles.balanceInfo}>
                <IconSymbol 
                  size={20} 
                  name={balance.isOwed ? "arrow.up.circle.fill" : "arrow.down.circle.fill"} 
                  color={balance.isOwed ? "#EF4444" : "#10B981"} 
                />
                <ThemedText style={styles.balanceName}>{balance.userName}</ThemedText>
              </View>
              <ThemedText style={[
                styles.balanceAmount,
                balance.isOwed ? styles.owesAmount : styles.owedAmount
              ]}>
                {balance.isOwed ? 'You owe' : 'You are owed'} {formatCurrency(balance.amount)}
              </ThemedText>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#2A2A2A',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#404040',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  settlementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#404040',
  },
  settlementInfo: {
    flex: 1,
  },
  settlementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  settlementText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  settlementAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 5,
  },
  summaryCard: {
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#404040',
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#404040',
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  balanceName: {
    fontSize: 16,
    marginLeft: 10,
    color: '#FFFFFF',
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  owesAmount: {
    color: '#EF4444',
  },
  owedAmount: {
    color: '#10B981',
  },
});
