import { useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function GroupDetailScreen() {
  const router = useRouter();
  
  const members = ['TC (you)', 'Christopher', 'Niza', 'Thandiwe'];
  
  const expenses = [
    {
      id: '1',
      name: 'ZESCO',
      amount: 'K500',
      paidBy: 'TC',
      eachOwes: 'K125',
      payments: [
        { name: 'Christopher', status: 'paid' },
        { name: 'Niza', status: 'pending' },
        { name: 'Thandiwe', status: 'pending' },
      ]
    },
    {
      id: '2',
      name: 'Water',
      amount: 'K300',
      paidBy: 'Christopher',
      eachOwes: 'K75',
      youOwe: 'K75',
    }
  ];

  const goBack = () => {
    router.push('/(tabs)/groups');
  };

  const addExpense = () => {
    router.push('/add-shared-expense');
  };

  const settleUp = () => {
    router.push('/settle-up');
  };

  const getPaymentIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return 'checkmark.circle.fill';
      case 'pending':
        return 'clock.fill';
      default:
        return 'circle.fill';
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Diggers Lodge</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <ThemedView style={styles.content}>
        <Card style={styles.membersCard}>
          <ThemedText style={styles.sectionTitle}>Members</ThemedText>
          <View style={styles.membersList}>
            {members.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <IconSymbol 
                  size={20} 
                  name={member.includes('(you)') ? 'person.fill' : 'person.2.fill'} 
                  color="#0066CC" 
                />
                <ThemedText style={styles.memberName}>{member}</ThemedText>
              </View>
            ))}
          </View>
        </Card>
        
        <Button
          title="+ Add Shared Expense"
          onPress={addExpense}
          size="large"
          style={styles.addButton}
        />
        
        <ThemedText style={styles.sectionTitle}>Recent Expenses</ThemedText>
        
        {expenses.map((expense) => (
          <Card key={expense.id} style={styles.expenseCard}>
            <View style={styles.expenseHeader}>
              <View style={styles.expenseInfo}>
                <ThemedText style={styles.expenseName}>{expense.name}</ThemedText>
                <ThemedText style={styles.expenseAmount}>{expense.amount}</ThemedText>
              </View>
              <IconSymbol size={24} name="bolt.fill" color="#F59E0B" />
            </View>
            
            <View style={styles.expenseDetails}>
              <ThemedText style={styles.paidBy}>Paid by: {expense.paidBy}</ThemedText>
              <ThemedText style={styles.eachOwes}>Each owes: {expense.eachOwes}</ThemedText>
            </View>
            
            {expense.payments ? (
              <View style={styles.paymentsSection}>
                <ThemedText style={styles.paymentsTitle}>Payments:</ThemedText>
                {expense.payments.map((payment, paymentIndex) => (
                  <View key={paymentIndex} style={styles.paymentItem}>
                    <IconSymbol 
                      size={16} 
                      name={getPaymentIcon(payment.status)} 
                      color={getPaymentColor(payment.status)} 
                    />
                    <ThemedText style={styles.paymentText}>
                      {payment.name}
                    </ThemedText>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.youOweSection}>
                <IconSymbol size={16} name="arrow.up.circle.fill" color="#EF4444" />
                <ThemedText style={styles.youOwe}>You owe {expense.youOwe}</ThemedText>
              </View>
            )}
          </Card>
        ))}
        
        <Card style={styles.balancesCard}>
          <ThemedText style={styles.sectionTitle}>Balances</ThemedText>
          
          <View style={styles.balanceItem}>
            <IconSymbol size={20} name="arrow.up.circle.fill" color="#EF4444" />
            <ThemedText style={styles.balanceText}>You owe: K125</ThemedText>
          </View>
          
          <View style={styles.balanceItem}>
            <IconSymbol size={20} name="arrow.down.circle.fill" color="#10B981" />
            <ThemedText style={styles.balanceText}>You are owed: K0</ThemedText>
          </View>
          
          <Button
            title="Settle Up →"
            onPress={settleUp}
            size="large"
            style={styles.settleButton}
          />
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF',
  },
  membersCard: {
    padding: 20,
    marginBottom: 20,
  },
  membersList: {
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  addButton: {
    marginBottom: 30,
  },
  expenseCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#404040',
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  expenseInfo: {
    flex: 1,
  },
  expenseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  expenseDetails: {
    marginBottom: 15,
  },
  paidBy: {
    fontSize: 14,
    opacity: 0.8,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  eachOwes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentsSection: {
    marginTop: 10,
  },
  paymentsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFFFFF',
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  youOweSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  youOwe: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 8,
  },
  balancesCard: {
    padding: 20,
    marginTop: 20,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  settleButton: {
    marginTop: 15,
  },
});
