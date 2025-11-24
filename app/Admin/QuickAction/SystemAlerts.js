import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";

const COLORS = {
  primary: "#014D2A",
  primaryLight: "#10B981",
  primaryDark: "#013B1F",
  accent: "#00FF87",
  danger: "#EF4444",
  warning: "#F59E0B",
  success: "#10B981",
  bg: "#FFFFFF",
  textMuted: "#047857",
  border: "#D1FAE5",
};

export default function SystemAlerts({ onBack }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const styles = getStyles(isMobile);

  const alerts = [
    {
      id: 1,
      type: "critical",
      icon: <AlertCircle color={COLORS.danger} size={24} />,
      title: "Multiple Failed Login Attempts",
      description: "5 failed login attempts detected from IP 192.168.1.1",
      timestamp: "2 minutes ago",
      action: "Review Security",
    },
    {
      id: 2,
      type: "success",
      icon: <CheckCircle color={COLORS.success} size={24} />,
      title: "Monthly Revenue Target Achieved",
      description: "Monthly revenue target of ₹10L exceeded by 15%",
      timestamp: "1 hour ago",
      action: "View Report",
    },
    {
      id: 3,
      type: "success",
      icon: <CheckCircle color={COLORS.success} size={24} />,
      title: "Database Backup Completed",
      description: "Daily database backup completed successfully at 02:30 AM",
      timestamp: "3 hours ago",
      action: "View Backup",
    },
    {
      id: 4,
      type: "warning",
      icon: <Clock color={COLORS.warning} size={24} />,
      title: "Vendor Registration Requests Pending",
      description: "12 new vendor registration requests awaiting approval",
      timestamp: "5 hours ago",
      action: "Review Requests",
    },
    {
      id: 5,
      type: "critical",
      icon: <XCircle color={COLORS.danger} size={24} />,
      title: "Low System Disk Space",
      description: "Server disk space has dropped below 10% capacity",
      timestamp: "6 hours ago",
      action: "Manage Space",
    },
    {
      id: 6,
      type: "warning",
      icon: <AlertCircle color={COLORS.warning} size={24} />,
      title: "SSL Certificate Expiring Soon",
      description: "SSL certificate will expire in 30 days",
      timestamp: "1 day ago",
      action: "Renew Certificate",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.primary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>System Alerts</Text>
          <Text style={styles.headerSubtitle}>{alerts.length} Active Alerts</Text>
        </View>
      </LinearGradient>

      {/* Alerts List */}
      <ScrollView
        style={styles.alertsContainer}
        contentContainerStyle={styles.alertsContent}
        showsVerticalScrollIndicator={false}
      >
        {alerts.map((alert) => (
          <View key={alert.id} style={[styles.alertCard, styles[`alert${alert.type}`]]}>
            <View style={styles.alertIconContainer}>
              {alert.icon}
            </View>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDescription}>{alert.description}</Text>
              <View style={styles.alertFooter}>
                <Text style={styles.alertTime}>{alert.timestamp}</Text>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>{alert.action}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = (isMobile) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0FDF4",
    },
    header: {
      paddingTop: Platform.OS === "ios" ? 40 : 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    headerContent: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 13,
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: "500",
    },
    alertsContainer: {
      flex: 1,
    },
    alertsContent: {
      padding: 16,
      paddingBottom: 80,
    },
    alertCard: {
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      flexDirection: "row",
      backgroundColor: COLORS.bg,
      borderLeftWidth: 4,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    alertcritical: {
      borderLeftColor: COLORS.danger,
      backgroundColor: "#FEF2F2",
    },
    alertsuccess: {
      borderLeftColor: COLORS.success,
      backgroundColor: "#F0FDF4",
    },
    alertwarning: {
      borderLeftColor: COLORS.warning,
      backgroundColor: "#FFFBEB",
    },
    alertIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
    alertContent: {
      flex: 1,
    },
    alertTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: COLORS.primary,
      marginBottom: 4,
    },
    alertDescription: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginBottom: 8,
      lineHeight: 18,
    },
    alertFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    alertTime: {
      fontSize: 11,
      color: COLORS.textMuted,
      fontWeight: "500",
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: COLORS.accent,
    },
    actionButtonText: {
      fontSize: 11,
      fontWeight: "700",
      color: COLORS.primary,
    },
  });
