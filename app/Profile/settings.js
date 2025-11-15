
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight, Globe, Info, Moon, Volume2 } from 'lucide-react-native';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const router = useRouter();

  const MenuItem = ({ title, subtitle, icon: Icon, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Icon size={20} color="#1e3a8a" />
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuText}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtext}>{subtitle}</Text>}
      </View>
      <ChevronRight size={20} color="#cbd5e1" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <MenuItem title="Language" subtitle="English" icon={Globe} onPress={() => {}} />
          <MenuItem title="Dark Mode" subtitle="Off" icon={Moon} onPress={() => {}} />
          <MenuItem title="Sound & Vibration" subtitle="On" icon={Volume2} onPress={() => {}} />

          <Text style={styles.sectionTitle}>About</Text>
          <MenuItem title="App Version" subtitle="1.0.0" icon={Info} onPress={() => {}} />
        </View>
      </ScrollView>
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
  container: { padding: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 8,
    marginBottom: 16,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuText: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  menuSubtext: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
});