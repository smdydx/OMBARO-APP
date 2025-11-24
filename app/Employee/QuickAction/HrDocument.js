import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, FileText, Download, Eye, Upload, Star } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

const COLORS = {
  gradient1: "#00FF87",
  gradient2: "#016B3A",
  gradient3: "#013B1F",
  gradient4: "#012B17",
  primary: "#016B3A",
  primaryLight: "#10B981",
  white: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#666666",
  textLight: "#999999",
  bg: "#FFFFFF",
  cardBg: "#F9FAFB",
  border: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
};

function useScale() {
  const { width, height } = useWindowDimensions();
  const base = Math.min(width, 480);
  const sw = (n) => Math.round((base / 390) * n);
  return { sw, width, height };
}

function DocumentCard({ title, description, date, uploadedBy, sw }) {
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(10),
    }}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: sw(8) }}>
        <View style={{
          width: sw(40),
          height: sw(40),
          borderRadius: sw(10),
          backgroundColor: `${COLORS.primary}15`,
          alignItems: "center",
          justifyContent: "center",
          marginRight: sw(10),
        }}>
          <FileText size={sw(18)} color={COLORS.primary} strokeWidth={2.5} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(2) }}>
            {title}
          </Text>
          <Text style={{ fontSize: sw(10), color: COLORS.textSecondary }}>
            {description}
          </Text>
        </View>
      </View>
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(8) }}>
        <Text style={{ fontSize: sw(9), color: COLORS.textLight }}>
          Uploaded: {date} • By: {uploadedBy}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: sw(8) }}>
        <TouchableOpacity style={{
          width: sw(32),
          height: sw(32),
          borderRadius: sw(8),
          backgroundColor: `${COLORS.info}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Eye size={sw(15)} color={COLORS.info} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          width: sw(32),
          height: sw(32),
          borderRadius: sw(8),
          backgroundColor: `${COLORS.success}15`,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Download size={sw(15)} color={COLORS.success} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SalaryCard({ month, year, status, netSalary, basicSalary, grossSalary, allowances, deductions, sw }) {
  const statusColor = status === "Paid" ? COLORS.success : COLORS.warning;
  const statusBg = status === "Paid" ? "#DCFCE7" : "#FEF9C3";
  
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(12),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(10) }}>
        <View>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text }}>
            {month} {year}
          </Text>
          <View style={{
            backgroundColor: statusBg,
            paddingHorizontal: sw(8),
            paddingVertical: sw(3),
            borderRadius: sw(6),
            marginTop: sw(4),
            alignSelf: "flex-start",
          }}>
            <Text style={{ fontSize: sw(9), fontWeight: "600", color: statusColor }}>
              {status} {status === "Paid" ? `• Paid: ${month === "January" ? "1/5" : month === "November" ? "11/30" : "12/30"}/2024` : ""}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.success }}>
            ₹{netSalary}
          </Text>
          <Text style={{ fontSize: sw(10), color: COLORS.textLight }}>Net Salary</Text>
        </View>
      </View>

      <View style={{
        backgroundColor: COLORS.white,
        borderRadius: sw(8),
        padding: sw(10),
        marginBottom: sw(10),
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(2) }}>Basic Salary</Text>
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>
            ₹{basicSalary}
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(2) }}>Gross Salary</Text>
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.text }}>
            ₹{grossSalary}
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(2) }}>Allowances</Text>
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: COLORS.success }}>
            +₹{allowances}
          </Text>
        </View>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ fontSize: sw(9), color: COLORS.textLight, marginBottom: sw(2) }}>Deductions</Text>
          <Text style={{ fontSize: sw(11), fontWeight: "700", color: "#EF4444" }}>
            -₹{deductions}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: sw(8) }}>
        <TouchableOpacity style={{
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.primaryLight,
          borderRadius: sw(8),
          paddingVertical: sw(8),
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.primary }}>
            View Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.primaryLight,
          borderRadius: sw(8),
          paddingVertical: sw(8),
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: sw(6),
        }}>
          <Download size={sw(13)} color={COLORS.primary} strokeWidth={2.5} />
          <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.primary }}>
            Download
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PerformanceCard({ title, period, rating, keyAchievements, improvementAreas, sw }) {
  const stars = Array(5).fill(0).map((_, i) => i < Math.floor(rating));
  
  return (
    <View style={{
      backgroundColor: COLORS.cardBg,
      borderRadius: sw(12),
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: sw(12),
      marginBottom: sw(12),
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: sw(8) }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: sw(12), fontWeight: "700", color: COLORS.text, marginBottom: sw(2) }}>
            {title}
          </Text>
          <Text style={{ fontSize: sw(10), color: COLORS.textLight }}>
            {period}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: sw(2) }}>
          {stars.map((isFilled, i) => (
            <Star
              key={i}
              size={sw(14)}
              color={COLORS.warning}
              fill={isFilled ? COLORS.warning : "transparent"}
              strokeWidth={isFilled ? 0 : 2}
            />
          ))}
        </View>
      </View>

      {keyAchievements && (
        <View style={{ marginBottom: sw(8) }}>
          <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.text, marginBottom: sw(4) }}>
            Key Achievements:
          </Text>
          {keyAchievements.map((achievement, i) => (
            <Text key={i} style={{ fontSize: sw(9), color: COLORS.textSecondary, marginLeft: sw(8), marginBottom: sw(2) }}>
              • {achievement}
            </Text>
          ))}
        </View>
      )}

      {improvementAreas && (
        <View style={{ marginBottom: sw(10) }}>
          <Text style={{ fontSize: sw(10), fontWeight: "600", color: COLORS.text, marginBottom: sw(4) }}>
            Areas for Improvement:
          </Text>
          {improvementAreas.map((area, i) => (
            <Text key={i} style={{ fontSize: sw(9), color: COLORS.textSecondary, marginLeft: sw(8), marginBottom: sw(2) }}>
              • {area}
            </Text>
          ))}
        </View>
      )}

      {!improvementAreas && (
        <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, marginBottom: sw(10), fontStyle: "italic" }}>
          Excellent performance in the first half of the year. Consistently meeting targets and showing leadership qualities.
        </Text>
      )}

      <View style={{ flexDirection: "row", gap: sw(8) }}>
        <TouchableOpacity style={{
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.primaryLight,
          borderRadius: sw(8),
          paddingVertical: sw(8),
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.primary }}>
            View Full
          </Text>
        </TouchableOpacity>
        {keyAchievements && (
          <TouchableOpacity style={{
            flex: 1,
            borderWidth: 1,
            borderColor: COLORS.primaryLight,
            borderRadius: sw(8),
            paddingVertical: sw(8),
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: sw(6),
          }}>
            <Download size={sw(13)} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.primary }}>
              PDF
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function HrDocument({ onBack }) {
  const { sw, width, height } = useScale();
  const nav = useNavigation();
  const [activeTab, setActiveTab] = useState("Documents");

  const documents = [
    { title: "Offer Letter", description: "Initial job offer letter with terms and conditions", date: "1/15/2024", uploadedBy: "HR Manager" },
    { title: "Appointment Letter", description: "Official appointment confirmation letter", date: "1/20/2024", uploadedBy: "HR Manager" },
    { title: "Employment Contract", description: "Detailed employment contract with all terms", date: "1/20/2024", uploadedBy: "HR Manager" },
    { title: "Salary Increment Letter", description: "Annual salary increment notification", date: "4/1/2024", uploadedBy: "HR Manager" },
    { title: "Employee of the Month", description: "Recognition for outstanding performance in March 2024", date: "4/5/2024", uploadedBy: "Department Head" },
  ];

  const salaryRecords = [
    { month: "December", year: 2024, status: "Paid", netSalary: "55,750", basicSalary: "50,000", grossSalary: "71,000", allowances: "21,000", deductions: "15,250" },
    { month: "November", year: 2024, status: "Paid", netSalary: "55,750", basicSalary: "50,000", grossSalary: "71,000", allowances: "21,000", deductions: "15,250" },
    { month: "January", year: 2025, status: "Pending", netSalary: "55,750", basicSalary: "50,000", grossSalary: "71,000", allowances: "21,000", deductions: "15,250" },
  ];

  const performanceReviews = [
    {
      title: "Annual Review 2024",
      period: "January 2024 - December 2024",
      rating: 4,
      keyAchievements: ["Successfully onboarded 15 new spas", "Improved customer satisfaction by 20%", "Led team training initiatives"],
      improvementAreas: ["Time management skills", "Technical documentation"],
    },
    {
      title: "Mid-Year Review 2024",
      period: "January 2024 - June 2024",
      rating: 4.2,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.gradient2 }}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.gradient2}
        translucent={false}
      />

      <LinearGradient 
        colors={[COLORS.gradient1, COLORS.gradient2, COLORS.gradient3, COLORS.gradient4]} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: Platform.OS === 'ios' ? sw(50) : sw(40),
          paddingBottom: sw(32),
          paddingHorizontal: sw(20),
        }}
      >
        <TouchableOpacity 
          onPress={() => onBack ? onBack() : nav.goBack()} 
          style={{
            width: sw(40),
            height: sw(40),
            borderRadius: sw(20),
            backgroundColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: sw(12),
          }}
        >
          <ArrowLeft size={sw(22)} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={{ alignItems: "center", marginBottom: sw(16) }}>
          <Text style={{ color: "#FFFFFF", fontSize: sw(16), fontWeight: "800", marginBottom: sw(5), textAlign: "center" }}>
            HR Documents
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: sw(10), textAlign: "center" }}>
            Documents, salary & performance
          </Text>
        </View>

        <View style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: sw(12),
          padding: sw(4),
          flexDirection: "row",
          gap: sw(4),
        }}>
          {["Documents", "Salary", "Performance"].map((label) => (
            <TouchableOpacity
              key={label}
              onPress={() => setActiveTab(label)}
              style={{
                flex: 1,
                paddingVertical: sw(10),
                paddingHorizontal: sw(8),
                borderRadius: sw(10),
                backgroundColor: activeTab === label ? "#FFFFFF" : "transparent",
                alignItems: "center",
              }}
            >
              <Text style={{
                color: activeTab === label ? COLORS.primary : "#FFFFFF",
                fontWeight: activeTab === label ? "700" : "600",
                fontSize: sw(11),
              }}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: COLORS.bg, borderTopLeftRadius: sw(24), borderTopRightRadius: sw(24), marginTop: 0 }}>
        <ScrollView 
          contentContainerStyle={{ paddingHorizontal: sw(16), paddingTop: sw(16), paddingBottom: sw(120) }} 
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "Documents" && (
            <>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: sw(12) }}>
                <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text }}>
                  Official Documents
                </Text>
                <TouchableOpacity style={{
                  borderWidth: 1,
                  borderColor: COLORS.primaryLight,
                  borderRadius: sw(8),
                  paddingHorizontal: sw(12),
                  paddingVertical: sw(6),
                  flexDirection: "row",
                  gap: sw(6),
                  alignItems: "center",
                }}>
                  <Upload size={sw(13)} color={COLORS.primary} strokeWidth={2.5} />
                  <Text style={{ fontSize: sw(11), fontWeight: "600", color: COLORS.primary }}>
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
              {documents.map((doc, index) => (
                <DocumentCard key={index} {...doc} sw={sw} />
              ))}
            </>
          )}

          {activeTab === "Salary" && (
            <>
              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Salary Records
              </Text>
              {salaryRecords.map((record, index) => (
                <SalaryCard key={index} {...record} sw={sw} />
              ))}
            </>
          )}

          {activeTab === "Performance" && (
            <>
              <View style={{
                flexDirection: "row",
                gap: sw(10),
                marginBottom: sw(16),
              }}>
                <View style={{
                  flex: 1,
                  backgroundColor: "#EFF6FF",
                  borderRadius: sw(12),
                  borderWidth: 1,
                  borderColor: "#BFE7FF",
                  padding: sw(12),
                  alignItems: "center",
                }}>
                  <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.info, marginBottom: sw(4) }}>
                    4.2
                  </Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, textAlign: "center" }}>
                    Overall Rating
                  </Text>
                </View>
                <View style={{
                  flex: 1,
                  backgroundColor: "#ECFDF5",
                  borderRadius: sw(12),
                  borderWidth: 1,
                  borderColor: "#A7F3D0",
                  padding: sw(12),
                  alignItems: "center",
                }}>
                  <Text style={{ fontSize: sw(16), fontWeight: "800", color: COLORS.success, marginBottom: sw(4) }}>
                    95%
                  </Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, textAlign: "center" }}>
                    Goal Achievement
                  </Text>
                </View>
                <View style={{
                  flex: 1,
                  backgroundColor: "#F3E8FF",
                  borderRadius: sw(12),
                  borderWidth: 1,
                  borderColor: "#E9D5FF",
                  padding: sw(12),
                  alignItems: "center",
                }}>
                  <Text style={{ fontSize: sw(16), fontWeight: "800", color: "#A855F7", marginBottom: sw(4) }}>
                    3
                  </Text>
                  <Text style={{ fontSize: sw(10), color: COLORS.textSecondary, textAlign: "center" }}>
                    Reviews Done
                  </Text>
                </View>
              </View>

              <Text style={{ fontSize: sw(13), fontWeight: "700", color: COLORS.text, marginBottom: sw(12) }}>
                Performance Reviews
              </Text>
              {performanceReviews.map((review, index) => (
                <PerformanceCard key={index} {...review} sw={sw} />
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
