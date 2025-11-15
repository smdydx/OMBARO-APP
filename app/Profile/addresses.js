
import React from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, Plus, Edit2, Trash2, Home, Briefcase } from 'lucide-react-native';

export default function Addresses() {
  const router = useRouter();

  const addresses = [
    {
      id: 1,
      type: 'Home',
      icon: Home,
      address: '123, MG Road, Bangalore',
      landmark: 'Near Metro Station',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      icon: Briefcase,
      address: '456, Cyber City, Gurgaon',
      landmark: 'DLF Phase 2',
      isDefault: false,
    },
  ];

  const AddressCard = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View style={styles.typeTag}>
          <item.icon size={14} color="#1e3a8a" />
          <Text style={styles.typeText}>{item.type}</Text>
        </View>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>
      <Text style={styles.addressText}>{item.address}</Text>
      <Text style={styles.landmarkText}>Landmark: {item.landmark}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}>
          <Edit2 size={16} color="#1e3a8a" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]}>
          <Trash2 size={16} color="#dc2626" />
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Addresses</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {addresses.map((item) => (
            <AddressCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addBtn}>
        <Plus size={24} color="#fff" />
        <Text style={styles.addBtnText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  scroll: { flex: 1 },
  container: { padding: 20, paddingBottom: 100 },

  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  typeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e3a8a',
    marginLeft: 6,
  },
  defaultBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16a34a',
  },
  addressText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 6,
  },
  landmarkText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
  },
  deleteBtn: {
    backgroundColor: '#fef2f2',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3a8a',
    marginLeft: 6,
  },
  deleteText: {
    color: '#dc2626',
  },

  addBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1e3a8a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 8,
  },
});