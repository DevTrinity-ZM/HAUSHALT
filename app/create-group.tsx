import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/app-context';
import { GroupService } from '@/lib/services/group-service';
import { validateGroupData } from '@/utils/groupCalculations';

export default function CreateGroupScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [groupName, setGroupName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState<string[]>(['You']);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [creating, setCreating] = useState(false);

  const addMember = () => {
    if (memberName.trim() && !members.includes(memberName.trim())) {
      setMembers([...members, memberName.trim()]);
      setMemberName('');
    }
  };

  const removeMember = (index: number) => {
    if (index !== 0) { // Don't remove "You"
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const createGroup = async () => {
    if (!user) {
      Alert.alert('Error', 'You must be logged in to create a group');
      return;
    }

    const validation = validateGroupData(groupName, members);
    
    if (!validation.isValid) {
      Alert.alert('Error', validation.error || 'Please check your input');
      return;
    }

    setCreating(true);
    try {
      // Create the group in Supabase
      const groupResult = await GroupService.createGroup(
        {
          name: groupName,
          description: `Group created by ${user.email || 'user'}`,
        },
        user.id
      );

      if (!groupResult.success || !groupResult.data) {
        throw new Error(groupResult.error || 'Failed to create group');
      }

      const groupId = groupResult.data.id;

      // Add creator as admin member
      const memberResult = await GroupService.addGroupMember(
        groupId,
        user.id,
        'admin'
      );

      if (!memberResult.success) {
        console.warn('Warning: Could not add creator as member:', memberResult.error);
      }

      Alert.alert(
        'Success', 
        `Group "${groupName}" created successfully!`,
        [
          { 
            text: 'OK', 
            onPress: () => router.push('/(tabs)/groups')
          }
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.message || 'Failed to create group. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setCreating(false);
    }
  };

  const goBack = () => {
    router.push('/(tabs)/groups');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Create Group</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Input
            label="Group Name"
            placeholder="Enter group name"
            value={groupName}
            onChangeText={setGroupName}
            error={errors.groupName}
          />
          
          <ThemedText style={styles.sectionTitle}>Members</ThemedText>
          
          <View style={styles.membersList}>
            {members.map((member, index) => (
              <View key={index} style={styles.memberItem}>
                <View style={styles.memberInfo}>
                  <IconSymbol 
                    size={20} 
                    name={index === 0 ? 'person.fill' : 'person.2.fill'} 
                    color="#0066CC" 
                  />
                  <ThemedText style={styles.memberName}>{member}</ThemedText>
                </View>
                {index !== 0 && (
                  <Button
                    title=""
                    onPress={() => removeMember(index)}
                    variant="ghost"
                    size="small"
                    icon={<IconSymbol size={16} name="xmark.circle.fill" color="#EF4444" />}
                  />
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.addMemberSection}>
            <Input
              placeholder="Add member name"
              value={memberName}
              onChangeText={setMemberName}
              onSubmitEditing={addMember}
              containerStyle={styles.memberInput}
            />
            <Button
              title="Add"
              onPress={addMember}
              variant="outline"
              size="small"
              style={styles.addButton}
            />
          </View>
        </Card>
        
        <Button
          title={creating ? "Creating..." : "Create Group"}
          onPress={createGroup}
          size="large"
          style={styles.createButton}
          disabled={!groupName.trim() || members.length < 2 || creating}
        />
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
    color: '#FFFFFF',
  },
  membersList: {
    marginBottom: 15,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#404040',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  addMemberSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  memberInput: {
    flex: 1,
  },
  addButton: {
    marginBottom: 20,
  },
  createButton: {
    marginTop: 10,
  },
});
