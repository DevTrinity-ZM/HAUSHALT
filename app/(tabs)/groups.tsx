import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/contexts/app-context';
import { GroupService } from '@/lib/services/group-service';

export default function GroupsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGroups();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadGroups = async () => {
    try {
      const result = await GroupService.getUserGroups(user.id);
      if (result.success && result.data) {
        setGroups(result.data);
      }
    } catch (error) {
      console.error('Error loading groups:', error);
      // Keep mock data as fallback
      setGroups([
        {
          id: '1',
          name: 'Diggers Lodge',
          members: '4 members • Active',
          balance: 'You owe K125',
          status: 'active',
        },
        {
          id: '2',
          name: 'CS Study Group',
          members: '3 members • Active',
          balance: 'All settled',
          status: 'settled',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = () => {
    router.push('/create-group');
  };

  const handleViewGroup = (groupId: string) => {
    router.push(`/group-detail?id=${groupId}`);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Groups</ThemedText>
        
        <Button
          title="+ Create New Group"
          onPress={handleCreateGroup}
          size="large"
          style={styles.createButton}
        />
        
        <View style={styles.spacer} />
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ThemedText style={styles.loadingText}>Loading groups...</ThemedText>
          </View>
        ) : (
          groups.map((group) => (
            <Card key={group.id} style={styles.groupCard}>
              <View style={styles.groupHeader}>
                <View style={styles.groupInfo}>
                  <ThemedText style={styles.groupName}>{group.name}</ThemedText>
                  <ThemedText style={styles.groupMembers}>{group.members}</ThemedText>
                </View>
                <IconSymbol 
                  size={24} 
                  name={group.status === 'active' ? 'person.2.fill' : 
                        group.status === 'settled' ? 'checkmark.circle.fill' : 
                        'clock.fill'} 
                  color={group.status === 'active' ? '#0066CC' : 
                       group.status === 'settled' ? '#10B981' : '#666'} 
                />
              </View>
              
              <ThemedText style={[
                styles.groupBalance,
                group.status === 'active' && styles.owesText,
                group.status === 'settled' && styles.settledText,
                group.status === 'completed' && styles.completedText
              ]}>
                {group.balance}
              </ThemedText>
              
              {group.status !== 'completed' && (
                <Button
                  title="View Details →"
                  onPress={() => handleViewGroup(group.id)}
                  variant="outline"
                  size="small"
                  style={styles.viewButton}
                />
              )}
            </Card>
          ))
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#FFFFFF',
  },
  createButton: {
    marginBottom: 30,
  },
  spacer: {
    height: 20,
  },
  groupCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#404040',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  groupMembers: {
    fontSize: 14,
    opacity: 0.8,
    color: '#FFFFFF',
  },
  groupBalance: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  owesText: {
    color: '#EF4444',
  },
  settledText: {
    color: '#10B981',
  },
  completedText: {
    color: '#666',
  },
  viewButton: {
    marginTop: 'auto',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
