import { useNavigation } from "@react-navigation/native";
import {
  AlertCircle,
  BarChart2,
  Briefcase,
  CheckSquare,
  Clock,
  FileText,
  MapPin,
  Plus,
  Settings,
  User,
  UserCheck,
  Users,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Overview() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {/* QUICK ACTIONS */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickContainer}>
        <QuickAction
          icon={<Plus color="#fff" size={18} />}
          bg="#0284c7"
          title="Onboard New Spa"
          desc="Add a new spa to platform"
        />
        <QuickAction
          icon={<MapPin color="#0284c7" size={18} />}
          title="Manage Spas"
          desc="View and edit existing spas"
        />
        <QuickAction
          icon={<AlertCircle color="#0284c7" size={18} />}
          title="Review Approvals"
          desc="8 items need attention"
        />
        <QuickAction
          icon={<Users color="#0284c7" size={18} />}
          title="Vendor Relations"
          desc="Manage vendor partnerships"
        />
        <QuickAction
          icon={<BarChart2 color="#0284c7" size={18} />}
          title="Analytics"
          desc="View performance metrics"
        />
        <QuickAction
          icon={<Settings color="#0284c7" size={18} />}
          title="System Settings"
          desc="Configure preferences"
          nav={() => navigation.navigate("Employee/QuickAction/systemSetting")}
        />

        <QuickAction
          icon={<User color="#0284c7" size={18} />}
          title="My Profile"
          desc="View and edit profile"
          nav={() => navigation.navigate("Employee/QuickAction/MyProfile")}
        />

        <QuickAction
          icon={<Clock color="#0284c7" size={18} />}
          title="Self Attendance"
          desc="Mark attendance with location"
          nav={() => navigation.navigate("Employee/QuickAction/SelfAttendance")}
        />
        <QuickAction
          icon={<CheckSquare color="#0284c7" size={18} />}
          title="Leave Management"
          desc="Apply for leave or view history"
          nav={() => navigation.navigate("Employee/QuickAction/LeaveManage")}
        />
        <QuickAction
          icon={<Briefcase color="#0284c7" size={18} />}
          title="HR Documents"
          desc="Salary, documents & performance"
          nav={() => navigation.navigate("Employee/QuickAction/HrDocument")}
        />
      </View>

      {/* RECENT ACTIVITY */}
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <View style={styles.activityContainer}>
        <ActivityCard
          icon={<Plus color="#22c55e" size={18} />}
          title="Serenity Spa successfully onboarded"
          desc="Added 12 services, verified documentation"
          time="2 hours ago"
        />
        <ActivityCard
          icon={<FileText color="#3b82f6" size={18} />}
          title="Bliss Spa details updated"
          desc="Contact information and operating hours modified"
          time="1 day ago"
        />
        <ActivityCard
          icon={<UserCheck color="#a855f7" size={18} />}
          title="New vendor partnership approved"
          desc="Ayurvedic Wellness Center joined the platform"
          time="3 days ago"
        />
      </View>
    </ScrollView>
  );
}

/* ---- Internal Components ---- */

const QuickAction = ({ icon, title, desc, bg, nav }) => (
  <TouchableOpacity
    onPress={nav}
    style={[styles.quickCard, bg && { backgroundColor: bg, borderColor: bg }]}
    activeOpacity={0.85}
  >
    <View style={styles.quickRow}>
      <View style={[styles.quickIcon, bg && { backgroundColor: "transparent" }]}>
        {icon}
      </View>
      <View>
        <Text style={[styles.quickTitle, bg && { color: "#fff" }]}>{title}</Text>
        <Text style={[styles.quickDesc, bg && { color: "#e0f2fe" }]}>{desc}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ActivityCard = ({ icon, title, desc, time }) => (
  <View style={styles.activityCard}>
    <View style={styles.activityRow}>
      {icon}
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activityDesc}>{desc}</Text>
      </View>
    </View>
    <Text style={styles.activityTime}>{time}</Text>
  </View>
);

/* ---- Styles (only those used here) ---- */

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  quickContainer: { paddingHorizontal: 16 },
  quickCard: {
    borderWidth: 1,
    borderColor: "#bae6fd",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  quickRow: { flexDirection: "row", alignItems: "center" },
  quickIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  quickTitle: { fontWeight: "600", fontSize: 14 },
  quickDesc: { fontSize: 12, color: "#666" },

  activityContainer: { paddingHorizontal: 16, marginBottom: 20 },
  activityCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  activityRow: { flexDirection: "row", alignItems: "center" },
  activityTitle: { fontWeight: "600", fontSize: 13 },
  activityDesc: { color: "#666", fontSize: 12 },
  activityTime: { alignSelf: "flex-end", color: "#999", fontSize: 11, marginTop: 6 },
});
