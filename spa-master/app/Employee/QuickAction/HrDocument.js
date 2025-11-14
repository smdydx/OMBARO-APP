// HRDocumentsScreen.js
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ---------- theme ----------
const COLORS = {
  gradientStart: "#7C3AED", // purple-600
  gradientEnd: "#2563EB",   // blue-600
  bg: "#F5F7FB",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#6B7280",
  primary: "#2563EB",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  border: "#E5E7EB",
  chipBg: "#F3F4F6",
  shadow: "rgba(15, 23, 42, 0.06)",
};

const S = {
  radius: 16,
  gap: 12,
};

// ---------- reusable UI ----------
const BackButton = ({ onPress }) => (
  <Pressable onPress={onPress} style={styles.backBtn} android_ripple={{ color: "rgba(255,255,255,0.15)", borderless: true }}>
    <Ionicons name="chevron-back" size={22} color="#FFF" />
  </Pressable>
);

const SegBtn = ({ label, active, onPress }) => (
  <Pressable
    onPress={onPress}
    style={[
      styles.segBtn,
      active && { backgroundColor: "#FFF" },
    ]}
  >
    <Text style={[styles.segLabel, active && { color: COLORS.text, fontWeight: "700" }]}>{label}</Text>
  </Pressable>
);

const Chip = ({ label, tone = "default", icon }) => {
  const toneMap = {
    default: { bg: COLORS.chipBg, fg: COLORS.text },
    success: { bg: "rgba(16,185,129,0.12)", fg: COLORS.success },
    warning: { bg: "rgba(245,158,11,0.16)", fg: COLORS.warning },
  };
  const t = toneMap[tone] || toneMap.default;
  return (
    <View style={[styles.chip, { backgroundColor: t.bg }]}>
      {icon ? <View style={{ marginRight: 6 }}>{icon}</View> : null}
      <Text style={[styles.chipText, { color: t.fg }]}>{label}</Text>
    </View>
  );
};

const Button = ({ label, onPress, variant = "solid", icon }) => {
  const solid = variant === "solid";
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        solid
          ? { backgroundColor: "#E6F0FF", borderColor: "#CDE1FF" }
          : { backgroundColor: "#F3F4F6", borderColor: COLORS.border },
      ]}
    >
      {icon ? <View style={{ marginRight: 8 }}>{icon}</View> : null}
      <Text style={[styles.btnText, { color: COLORS.primary }]}>{label}</Text>
    </Pressable>
  );
};

const StatCard = ({ title, value, tone = "default", note }) => {
  const bgMap = {
    default: "#EEF5FF",
    success: "rgba(16,185,129,0.10)",
    lilac: "rgba(139,92,246,0.10)",
  };
  const fgMap = {
    default: COLORS.primary,
    success: COLORS.success,
    lilac: "#7C3AED",
  };
  return (
    <View style={[styles.statCard, { backgroundColor: bgMap[tone] }]}>
      <Text style={[styles.statValue, { color: fgMap[tone] }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {note ? <Text style={styles.statNote}>{note}</Text> : null}
    </View>
  );
};

const RatingDots = ({ value = 0, outOf = 5 }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Array.from({ length: outOf }).map((_, i) => {
        const filled = i < Math.floor(value);
        return (
          <MaterialIcons
            key={i}
            name="circle"
            size={12}
            color={filled ? "#FACC15" : "#E5E7EB"}
            style={{ marginRight: 6 }}
          />
        );
      })}
      <Text style={{ color: COLORS.muted, marginLeft: 6 }}>{value.toFixed(1)}/{outOf.toFixed(1)}</Text>
    </View>
  );
};

// ---------- DATA (demo) ----------
const DOCS = [
  {
    id: "1",
    title: "Offer Letter",
    desc: "Initial job offer letter with terms and conditions",
    date: "15/01/2024",
    by: "HR Manager",
    icon: <MaterialCommunityIcons name="file-document" size={22} color="#2563EB" />,
  },
  {
    id: "2",
    title: "Appointment Letter",
    desc: "Official appointment confirmation letter",
    date: "20/01/2024",
    by: "HR Manager",
    icon: <MaterialCommunityIcons name="file-document-outline" size={22} color="#7C3AED" />,
  },
  {
    id: "3",
    title: "Employment Contract",
    desc: "Detailed employment contract with all terms",
    date: "20/01/2024",
    by: "HR Manager",
    icon: <MaterialCommunityIcons name="file-certificate-outline" size={22} color="#10B981" />,
  },
  {
    id: "4",
    title: "Salary Increment Letter",
    desc: "Annual salary increment notification",
    date: "01/04/2024",
    by: "HR Manager",
    icon: <MaterialCommunityIcons name="file-percent-outline" size={22} color="#F59E0B" />,
  },
  {
    id: "5",
    title: "Employee of the Month",
    desc: "Recognition for outstanding performance in March 2024",
    date: "05/04/2024",
    by: "Department Head",
    icon: <MaterialCommunityIcons name="medal-outline" size={22} color="#0EA5E9" />,
  },
];

const SALARIES = [
  {
    id: "d2024-12",
    month: "December 2024",
    status: "Paid",
    paidOn: "30/12/2024",
    net: 55750,
    basic: 50000,
    gross: 71000,
    allowances: 21000,
    deductions: 15250,
  },
  {
    id: "d2024-11",
    month: "November 2024",
    status: "Paid",
    paidOn: "30/11/2024",
    net: 55750,
    basic: 50000,
    gross: 71000,
    allowances: 21000,
    deductions: 15250,
  },
  {
    id: "d2025-01",
    month: "January 2025",
    status: "Pending",
    paidOn: null,
    net: 55750,
    basic: 50000,
    gross: 71000,
    allowances: 21000,
    deductions: 15250,
  },
];

const PERF = {
  rating: 4.2,
  goal: 95,
  reviews: 3,
  cards: [
    {
      id: "annual-2024",
      title: "Annual Review",
      subtitle: "2024",
      period: "January 2024 - December 2024",
      rating: 4.0,
      achievements: [
        "Successfully onboarded 15 new spas",
        "Improved customer satisfaction by 20%",
        "Led team training initiatives",
      ],
      improvements: ["Time management skills", "Technical documentation"],
    },
    {
      id: "mid-2024",
      title: "Mid-Year Review",
      subtitle: "2024",
      period: "January 2024 - June 2024",
      summary:
        "Excellent performance in the first half of the year. Consistently meeting targets and showing leadership qualities.",
      rating: 4.2,
    },
  ],
};

// ---------- main ----------
export default function HrDocument({ navigation }) {
  const [tab, setTab] = useState("Documents"); // "Documents" | "Salary" | "Performance"

  // iOS top-padding nicety
  const topInset = Platform.OS === "ios" ? 6 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: topInset }]}
      >
        <BackButton onPress={() => navigation?.goBack?.()} />
        <View style={{ alignItems: "center", marginTop: 6 }}>
          <Text style={styles.headerTitle}>HR Documents</Text>
          <Text style={styles.headerSub}>Documents, salary & performance</Text>
        </View>

        <View style={styles.segWrap}>
          {["Documents", "Salary", "Performance"].map((t) => (
            <SegBtn key={t} label={t} active={t === tab} onPress={() => setTab(t)} />
          ))}
        </View>
      </LinearGradient>

      {/* Body */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {tab === "Documents" && <DocumentsTab />}

        {tab === "Salary" && <SalaryTab />}

        {tab === "Performance" && <PerformanceTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- Tab implementations ----------
const DocumentsTab = () => {
  return (
    <View>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Official Documents</Text>
        <Button
          label="Upload"
          onPress={() => {}}
          variant="solid"
          icon={<Feather name="upload" size={16} color={COLORS.primary} />}
        />
      </View>

      {DOCS.map((d) => (
        <View key={d.id} style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.docIcon}>{d.icon}</View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{d.title}</Text>
              <Text style={styles.cardDesc}>{d.desc}</Text>

              <View style={{ marginTop: 10 }}>
                <Text style={styles.meta}>
                  <Text style={styles.metaLabel}>Uploaded: </Text>
                  {d.date}{"  "}
                  <Text style={styles.metaLabel}>By: </Text>
                  {d.by}
                </Text>
              </View>

              <View style={styles.rowBtns}>
                <Button
                  label="View"
                  onPress={() => {}}
                  icon={<Feather name="eye" size={16} color={COLORS.primary} />}
                />
                <Button
                  label="Download"
                  onPress={() => {}}
                  icon={<Feather name="download" size={16} color={COLORS.primary} />}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const SalaryRow = ({ s }) => {
  const statusTone = s.status === "Paid" ? "success" : "warning";
  const rupee = (n) =>
    "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={styles.cardTitle}>{s.month}</Text>
          <View style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}>
            <Chip
              label={s.status}
              tone={statusTone}
            />
            <Text style={[styles.meta, { marginLeft: 10 }]}>
              <Text style={styles.metaLabel}>
                {s.status === "Paid" ? "Paid: " : ""}
              </Text>
              {s.paidOn || ""}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.netAmt}>{rupee(s.net)}</Text>
          <Text style={styles.muted}>Net Salary</Text>
        </View>
      </View>

      <View style={styles.salaryGrid}>
        <View style={{ flex: 1 }}>
          <Text style={styles.muted}>Basic Salary</Text>
          <Text style={styles.bold}>{rupee(s.basic)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.muted}>Gross Salary</Text>
          <Text style={styles.bold}>{rupee(s.gross)}</Text>
        </View>
      </View>

      <View style={styles.salaryGrid}>
        <View style={{ flex: 1 }}>
          <Text style={styles.muted}>Total Allowances</Text>
          <Text style={[styles.bold, { color: COLORS.success }]}>+{rupee(s.allowances)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.muted}>Total Deductions</Text>
          <Text style={[styles.bold, { color: COLORS.danger }]}>-{rupee(s.deductions)}</Text>
        </View>
      </View>

      <View style={styles.rowBtns}>
        <Button
          label="View Details"
          onPress={() => {}}
          icon={<Feather name="eye" size={16} color={COLORS.primary} />}
        />
        <Button
          label="Download Slip"
          onPress={() => {}}
          icon={<Feather name="download" size={16} color={COLORS.primary} />}
        />
      </View>
    </View>
  );
};

const SalaryTab = () => (
  <View>
    <Text style={styles.sectionTitle}>Salary Records</Text>
    {SALARIES.map((s) => (
      <SalaryRow key={s.id} s={s} />
    ))}
  </View>
);

const PerformanceCard = ({ item }) => {
  const hasBullets = Array.isArray(item.achievements);
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View>
          <Text style={styles.cardTitle}>
            {item.title}{" "}
            <Text style={{ color: COLORS.muted, fontWeight: "600" }}>{item.subtitle}</Text>
          </Text>
          <Text style={[styles.muted, { marginTop: 4 }]}>{item.period}</Text>
        </View>
        <RatingDots value={item.rating} />
      </View>

      {hasBullets ? (
        <>
          <Text style={[styles.bold, { marginTop: 14 }]}>Key Achievements:</Text>
          <View style={{ marginTop: 6 }}>
            {item.achievements.map((a, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={{ marginRight: 8, color: COLORS.primary }}>•</Text>
                <Text style={styles.cardDesc}>{a}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.bold, { marginTop: 10 }]}>Areas for Improvement:</Text>
          <View style={{ marginTop: 6 }}>
            {item.improvements?.map((a, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 6 }}>
                <Text style={{ marginRight: 8, color: "#7C3AED" }}>•</Text>
                <Text style={styles.cardDesc}>{a}</Text>
              </View>
            ))}
          </View>

          <View style={styles.rowBtns}>
            <Button
              label="View Full Review"
              onPress={() => {}}
              icon={<Feather name="eye" size={16} color={COLORS.primary} />}
            />
            <Button
              label="Download PDF"
              onPress={() => {}}
              icon={<Feather name="download" size={16} color={COLORS.primary} />}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={[styles.cardDesc, { marginTop: 12 }]}>{item.summary}</Text>
          <View style={{ marginTop: 12 }}>
            <Button
              label="View Full Review"
              onPress={() => {}}
              icon={<Feather name="eye" size={16} color={COLORS.primary} />}
            />
          </View>
        </>
      )}
    </View>
  );
};

const PerformanceTab = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Performance Reviews</Text>

      <View style={{ gap: 12 }}>
        <StatCard title="Overall Rating" value={PERF.rating.toFixed(1)} note=" " tone="default" />
        <StatCard title="Goal Achievement" value={`${PERF.goal}%`} tone="success" note=" " />
        <StatCard title="Reviews Completed" value={String(PERF.reviews)} tone="lilac" note=" " />
      </View>

      {PERF.cards.map((c) => (
        <PerformanceCard key={c.id} item={c} />
      ))}
    </View>
  );
};

// ---------- styles ----------
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  headerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    marginTop: 2,
  },
  segWrap: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 14,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  segBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  segLabel: { color: "#F3F4F6", fontSize: 14, fontWeight: "600" },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 12,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: S.radius,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text },
  cardDesc: { color: COLORS.text, opacity: 0.85, lineHeight: 20 },

  docIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F1F5FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  meta: { color: COLORS.muted },
  metaLabel: { color: COLORS.muted, fontWeight: "700" },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  btnText: { fontWeight: "800" },
  rowBtns: { flexDirection: "row", marginTop: 14 },

  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  chipText: { fontSize: 12, fontWeight: "700" },

  statCard: {
    borderRadius: S.radius,
    padding: 18,
    marginBottom: 12,
  },
  statValue: { fontSize: 36, fontWeight: "900" },
  statTitle: { color: COLORS.text, fontWeight: "700", marginTop: 6 },
  statNote: { color: COLORS.muted, marginTop: 2 },

  salaryGrid: {
    flexDirection: "row",
    gap: 16,
    marginTop: 12,
  },
  muted: { color: COLORS.muted },
  bold: { fontWeight: "800", color: COLORS.text },
  netAmt: { fontSize: 22, fontWeight: "900", color: COLORS.success },
});
