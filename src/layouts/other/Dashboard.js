import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";

// Import chart components
import { KpiCard } from "../../components/Charts/KpiCard";
import { EmployeeTypeChart } from "../../components/Charts/EmployeeTypeChart";
import { CDPLCBreakdown } from "../../components/Charts/CDPLCBreakdown";
import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
import { TraineesOverview } from "../../components/Charts/TraineesOverview";
import DashboardTabs from "../../components/Charts/DashboardTabs";

// Simulated sparkline data
const sparklines = {
  total: [
    { v: 3720 },
    { v: 3750 },
    { v: 3800 },
    { v: 3780 },
    { v: 3820 },
    { v: 3860 },
    { v: 3891 },
  ],
  eligible: [
    { v: 3100 },
    { v: 3150 },
    { v: 3200 },
    { v: 3180 },
    { v: 3250 },
    { v: 3300 },
    { v: 3331 },
  ],
  attendance: [
    { v: 2400 },
    { v: 2450 },
    { v: 2500 },
    { v: 2480 },
    { v: 2530 },
    { v: 2560 },
    { v: 2579 },
  ],
  rate: [
    { v: 72 },
    { v: 74 },
    { v: 75 },
    { v: 73 },
    { v: 76 },
    { v: 76 },
    { v: 77 },
  ],
};

// Division Attendance Data
const divisionData = [
  {
    division: "DBU",
    rate: 92,
    categories: {
      executive: { st: 31, at: 30, percent: 97 },
      supervisory: { st: 26, at: 22, percent: 85 },
      clerical: { st: 7, at: 7, percent: 100 },
      industrial: { st: 1, at: 0, percent: 100 },
    },
  },
  {
    division: "DMD",
    rate: 75,
    categories: {
      executive: { st: 58, at: 50, percent: 86 },
      supervisory: { st: 32, at: 25, percent: 78 },
      clerical: { st: 2, at: 2, percent: 100 },
      industrial: { st: 40, at: 22, percent: 55 },
    },
  },
  {
    division: "DCH",
    rate: 100,
    categories: {
      executive: { st: 1, at: 1, percent: 100 },
      supervisory: null,
      clerical: null,
      industrial: null,
    },
  },
  {
    division: "DMP",
    rate: 88,
    categories: {
      executive: { st: 8, at: 8, percent: 100 },
      supervisory: { st: 10, at: 8, percent: 80 },
      clerical: { st: 19, at: 17, percent: 89 },
      industrial: { st: 11, at: 9, percent: 82 },
    },
  },
  {
    division: "DPR",
    rate: 78,
    categories: {
      executive: { st: 78, at: 68, percent: 87 },
      supervisory: { st: 128, at: 107, percent: 84 },
      clerical: { st: 11, at: 11, percent: 100 },
      industrial: { st: 716, at: 543, percent: 78 },
    },
  },
  {
    division: "DYA",
    rate: 75,
    categories: {
      executive: { st: 17, at: 13, percent: 76 },
      supervisory: { st: 37, at: 33, percent: 89 },
      clerical: { st: 1, at: 1, percent: 100 },
      industrial: { st: 263, at: 191, percent: 73 },
    },
  },
  {
    division: "DFI",
    rate: 79,
    categories: {
      executive: { st: 6, at: 6, percent: 100 },
      supervisory: null,
      clerical: { st: 6, at: 5, percent: 83 },
      industrial: null,
    },
  },
  {
    division: "DHA",
    rate: 55,
    categories: {
      executive: { st: 13, at: 11, percent: 85 },
      supervisory: { st: 12, at: 6, percent: 50 },
      clerical: { st: 8, at: 8, percent: 100 },
      industrial: { st: 77, at: 35, percent: 45 },
    },
  },
];

// Trainee Overall Data
const traineeOverall = [
  {
    category: "CLERICAL",
    strength: 2,
    attendance: 0,
    percent: 0,
  },
  {
    category: "INDUSTRIAL",
    strength: 144,
    attendance: 116,
    percent: 81,
  },
];

// Trainee by Division Data
const traineeByDivision = [
  {
    division: "Ship Repair",
    clerical_strength: 0,
    clerical_attendance: 0,
    industrial_strength: 3,
    industrial_attendance: 3,
    total_strength: 3,
    total_attendance: 3,
    total_percent: 100,
  },
  {
    division: "MD/Directors",
    clerical_strength: 0,
    clerical_attendance: 0,
    industrial_strength: 5,
    industrial_attendance: 4,
    total_strength: 5,
    total_attendance: 4,
    total_percent: 80,
  },
  {
    division: "Chairman's Office",
    clerical_strength: 0,
    clerical_attendance: 0,
    industrial_strength: 0,
    industrial_attendance: 0,
    total_strength: 0,
    total_attendance: 0,
    total_percent: 0,
  },
  {
    division: "Supply & Matl",
    clerical_strength: 0,
    clerical_attendance: 0,
    industrial_strength: 0,
    industrial_attendance: 0,
    total_strength: 0,
    total_attendance: 0,
    total_percent: 0,
  },
  {
    division: "Production",
    clerical_strength: 1,
    clerical_attendance: 0,
    industrial_strength: 84,
    industrial_attendance: 69,
    total_strength: 85,
    total_attendance: 69,
    total_percent: 81,
  },
  {
    division: "Yard",
    clerical_strength: 0,
    clerical_attendance: 0,
    industrial_strength: 19,
    industrial_attendance: 15,
    total_strength: 19,
    total_attendance: 15,
    total_percent: 79,
  },
  {
    division: "Finance",
    clerical_strength: 0,
    clerical_attendance: 0,
    industrial_strength: 0,
    industrial_attendance: 0,
    total_strength: 0,
    total_attendance: 0,
    total_percent: 0,
  },
  {
    division: "HRD & AM",
    clerical_strength: 1,
    clerical_attendance: 0,
    industrial_strength: 32,
    industrial_attendance: 25,
    total_strength: 33,
    total_attendance: 25,
    total_percent: 76,
  },
];

// Employee Type Data
const employeeTypeData = [
  {
    type: "CDPLC",
    strength: 1620,
    attendance: 1239,
    eligible: 1440,
  },
  {
    type: "Trainee",
    strength: 146,
    attendance: 116,
    eligible: 146,
  },
  {
    type: "Sub (L)",
    strength: 2081,
    attendance: 1208,
    eligible: 1666,
  },
  {
    type: "Sub (F)",
    strength: 44,
    attendance: 16,
    eligible: 34,
  },
];

// CDPLC Category Attendance Data
const cdplcData = [
  {
    name: "CLERICAL",
    actualPct: 94,
    eligiblePct: 94,
    fill: "#06b6d4",
    attendance: 51,
    strength: 54,
  },
  {
    name: "EXECUTIVE",
    actualPct: 88,
    eligiblePct: 89,
    fill: "#3b82f6",
    attendance: 187,
    strength: 212,
  },
  {
    name: "SUPERVISORY",
    actualPct: 82,
    eligiblePct: 86,
    fill: "#8b5cf6",
    attendance: 201,
    strength: 245,
  },
  {
    name: "INDUSTRIAL",
    actualPct: 72,
    eligiblePct: 85,
    fill: "#10b981",
    attendance: 800,
    strength: 1109,
  },
];

const radialData = cdplcData.map((d) => ({
  name: d.name,
  value: d.actualPct,
  fill: d.fill,
}));

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 120px)",
        backgroundColor: "#ffffff",
        padding: "32px 24px",
      }}
    >
      {/* Dashboard Tabs */}
      <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* HR Dashboard */}
      {activeTab === 0 && (
        <>
          {/* Welcome Section */}
          <Box
            sx={{
              background: "linear-gradient(135deg, #004AAD 0%, #0066FF 100%)",
              color: "white",
              padding: "32px",
              borderRadius: "16px",
              marginBottom: "32px",
              boxShadow: "0 8px 32px rgba(0, 74, 173, 0.3)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                marginBottom: "8px",
                fontSize: "28px",
              }}
            >
              Welcome to BizTrack Dashboard
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                opacity: 0.9,
                fontWeight: 400,
              }}
            >
              Real-time workforce analytics and port operations overview.
            </Typography>
          </Box>

          {/* KPI Cards Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <KpiCard
              label="Total Employees"
              target={3891}
              icon={Users}
              sparkData={sparklines.total}
              sparkColor="#3b82f6"
              trend="+12%"
              trendPositive={true}
              delay={0}
            />

            <KpiCard
              label="Eligible Strength"
              target={3331}
              icon={UserCheck}
              sparkData={sparklines.eligible}
              sparkColor="#8b5cf6"
              trend="85% of total"
              trendPositive={true}
              delay={1}
            />

            <KpiCard
              label="Total Attendance"
              target={2579}
              icon={Clock}
              sparkData={sparklines.attendance}
              sparkColor="#10b981"
              trend="77% rate"
              trendPositive={true}
              delay={2}
            />

            <KpiCard
              label="Attendance Rate"
              target={77}
              suffix="%"
              icon={TrendingUp}
              sparkData={sparklines.rate}
              sparkColor="#06b6d4"
              trend="+2% vs last week"
              trendPositive={true}
              delay={3}
            />
          </Box>

          {/* Employee Type Strength vs Attendance Chart */}
          <Box sx={{ marginTop: "32px" }}>
            <EmployeeTypeChart employeeTypeData={employeeTypeData} />
          </Box>

          {/* CDPLC Category Attendance Chart */}
          <Box sx={{ marginTop: "32px" }}>
            <CDPLCBreakdown cdplcData={cdplcData} radialData={radialData} />
          </Box>

          {/* Trainees Overview Charts */}
          <Box sx={{ marginTop: "32px" }}>
            <TraineesOverview
              traineeOverall={traineeOverall}
              traineeByDivision={traineeByDivision}
            />
          </Box>

          {/* Division Attendance Rate Chart */}
          <Box sx={{ marginTop: "32px" }}>
            <DivisionBreakdown divisionData={divisionData} />
          </Box>
        </>
      )}

      {/* Financial Dashboard */}
      {activeTab === 1 && (
        <Box
          sx={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            padding: "32px",
            borderRadius: "16px",
            marginBottom: "32px",
            boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              marginBottom: "8px",
              fontSize: "28px",
            }}
          >
            Financial Dashboard
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              opacity: 0.9,
              fontWeight: 400,
            }}
          >
            Financial metrics, budgets, and fiscal performance overview.
          </Typography>
          <Box sx={{ marginTop: "24px" }}>
            <Typography
              sx={{
                fontSize: "14px",
                opacity: 0.8,
                fontStyle: "italic",
              }}
            >
              Financial dashboard content coming soon...
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
