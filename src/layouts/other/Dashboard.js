import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Import chart components
import { KpiCard } from "../../components/Charts/KpiCard";
import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
import { TraineesOverview } from "../../components/Charts/TraineesOverview";
import DashboardTabs from "../../components/Charts/DashboardTabs";
import WeeklyAttendanceTrend from "../../components/Charts/WeeklyAttendanceTrend";
import { EmployeeTypeChart } from "../../components/Charts/EmployeeTypeChart";
import { CDPLCBreakdown } from "../../components/Charts/CDPLCBreakdown";
import QuickAccessSection from "../../components/Cards/QuickAccessSection";

// Import actions
import {
  GetCdlBasedDivison,
  GetTraineeBasedTypes,
  GetTraineeDivisionAttendance,
  GetAllAttendance,
  GetCDLWeekAttendance,
} from "../../action/Attendance";

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

// Main Dashboard Component
const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    divisionData,
    traineeTypes,
    traineeDivision,
    allAttendance,
    loading,
    weeklyAttendance,
  } = useSelector((state) => state.attendanceCard);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }

    // Fetch data on component mount
    //const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    // Use a 2021 date because backend data exists for 2021 (not 2026)
    const today = "2021-02-19";
    // Week end date for weekly attendance API (sample)
    const weekDate = "2021-03-01";
    try {
      dispatch(GetCdlBasedDivison(today, today));
      dispatch(GetTraineeBasedTypes(today));
      dispatch(GetTraineeDivisionAttendance(today, today));
      dispatch(GetAllAttendance(today, today));
      dispatch(GetCDLWeekAttendance(weekDate));
    } catch (error) {
      console.error("Error dispatching actions:", error);
    }
  }, [dispatch]);

  // Transform division data for charts
  const transformedDivisionData =
    divisionData?.map((item) => ({
      division: item.V_DIVNAME || item.HLD_DIV_CODE || "Unknown",
      rate: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
      categories: {
        executive: {
          st: parseInt(item.STRENGTH_EXECUTIVE) || 0,
          at: parseInt(item.ATTENDANCE_EXECUTIVE) || 0,
          percent: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
        },
        supervisory: {
          st: parseInt(item.STRENGTH_SUPERVISORY) || 0,
          at: parseInt(item.ATTENDANCE_SUPERVISORY) || 0,
          percent: parseFloat(item.PERCENTAGE_SUPERVISORY) || 0,
        },
        clerical: item.STRENGTH_CLERICAL
          ? {
              st: parseInt(item.STRENGTH_CLERICAL) || 0,
              at: 0, // Assuming no attendance data for clerical in this API
              percent: 0,
            }
          : null,
      },
    })) || [];

  console.log("Division Data:", divisionData);
  console.log("Transformed Division Data:", transformedDivisionData);
  console.log("Trainee Types:", traineeTypes);
  console.log("Trainee Division:", traineeDivision);
  console.log("All Attendance:", allAttendance);
  console.log(
    "Weekly Attendance (from GetCDLWeekAttendance):",
    weeklyAttendance,
  );

  // Transform trainee types data
  const transformedTraineeOverall =
    traineeTypes?.map((item) => ({
      category: item.TYPE || "Unknown",
      strength: parseInt(item.STRENGTH) || 0,
      attendance: parseInt(item.ATTENDANCE) || 0,
      percent: parseFloat(item.PERCENTAGE) || 0,
    })) || [];

  // Transform trainee division data
  const transformedTraineeByDivision =
    traineeDivision
      ?.map((item) => ({
        division: item.V_DIVNAME || item.HLD_DIV_CODE || "Unknown",
        clerical_strength: parseInt(item.STRENGTH_CLERICAL) || 0,
        clerical_attendance: parseInt(item.ATTENDANCE_CLERICAL) || 0,
        industrial_strength: parseInt(item.STRENGTH_INDUSTRIAL) || 0,
        industrial_attendance: parseInt(item.ATTENDANCE_INDUSTRIAL) || 0,
        total_strength:
          (parseInt(item.STRENGTH_CLERICAL) || 0) +
          (parseInt(item.STRENGTH_INDUSTRIAL) || 0),
        total_attendance:
          (parseInt(item.ATTENDANCE_CLERICAL) || 0) +
          (parseInt(item.ATTENDANCE_INDUSTRIAL) || 0),
        total_percent: 0, // Will calculate below
      }))
      .map((item) => ({
        ...item,
        total_percent:
          item.total_strength > 0
            ? Math.round((item.total_attendance / item.total_strength) * 100)
            : 0,
      })) || [];

  // For now, using empty array for traineeByDivision since the API response wasn't provided
  const traineeByDivision = [];

  // Sample data for employee type chart
  const employeeTypeData = traineeTypes || [
    { category: "Executive", count: 150 },
    { category: "Supervisory", count: 250 },
    { category: "Clerical", count: 100 },
  ];

  // Sample data for CDPLC breakdown
  const cdplcData = [
    { name: "CDPLC A", value: 300 },
    { name: "CDPLC B", value: 250 },
    { name: "CDPLC C", value: 200 },
  ];

  const radialData = [
    { label: "Present", value: 65 },
    { label: "Absent", value: 35 },
  ];

  // Calculate KPI values from data
  const totalEmployees =
    divisionData?.reduce(
      (sum, item) =>
        sum +
        (parseInt(item.STRENGTH_EXECUTIVE) || 0) +
        (parseInt(item.STRENGTH_SUPERVISORY) || 0),
      0,
    ) || 0;

  const totalAttendance =
    divisionData?.reduce(
      (sum, item) =>
        sum +
        (parseInt(item.ATTENDANCE_EXECUTIVE) || 0) +
        (parseInt(item.ATTENDANCE_SUPERVISORY) || 0),
      0,
    ) || 0;

  const attendanceRate =
    totalEmployees > 0
      ? Math.round((totalAttendance / totalEmployees) * 100)
      : 0;

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
          {/* <Box
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
            </Typography>
          </Box> */}

          {/* KPI Cards Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: "16px",
              marginBottom: "22px",
            }}
          >
            <KpiCard
              label="Total Strength"
              target={totalEmployees || 0}
              icon={Users}
              sparkData={sparklines.total}
              sparkColor="#3b82f6"
              delay={0}
            />

            <KpiCard
              label="Present Today"
              target={totalAttendance || 0}
              icon={UserCheck}
              sparkData={sparklines.attendance}
              sparkColor="#8b5cf6"
              delay={1}
            />

            <KpiCard
              label="Absent"
              target={Math.max(
                (totalEmployees || 0) - (totalAttendance || 0),
                0,
              )}
              icon={Users}
              sparkData={sparklines.eligible}
              sparkColor="#f43f5e"
              delay={2}
            />

            <KpiCard
              label="Attendance Rate"
              target={attendanceRate}
              suffix="%"
              icon={TrendingUp}
              sparkData={sparklines.rate}
              sparkColor="#06b6d4"
              delay={3}
            />
          </Box>

          {/* Weekly trend and Employee Type charts side-by-side */}
          <Box
            sx={{
              marginTop: "32px",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: "16px",
            }}
          >
            {/* Weekly attendance: prefer API data, fallback to sample sparklines */}
            {(() => {
              const apiWeek = weeklyAttendance || [];

              // Transform API response: GetCDLWeekAttendance returns {Attendance, Eligible, DayName, AttDate}
              if (apiWeek && apiWeek.length > 0) {
                const attendanceFromApi = apiWeek.map((item) => ({
                  v: parseInt(item.Attendance) || 0,
                  dayName: item.DayName || "",
                }));
                const eligibleFromApi = apiWeek.map((item) => ({
                  v: parseInt(item.Eligible) || 0,
                  dayName: item.DayName || "",
                }));

                // Calculate rate based on API data: (Attendance / Eligible) * 100
                const rateForChart = attendanceFromApi.map((a, i) => {
                  const el = eligibleFromApi[i]?.v || 0;
                  const rate = el ? Math.round((a.v / el) * 100) : 0;
                  return {
                    v: Math.max(0, Math.min(100, rate)),
                    dayName: a.dayName,
                  };
                });

                return (
                  <WeeklyAttendanceTrend
                    eligibleData={eligibleFromApi}
                    attendanceData={attendanceFromApi}
                    rateData={rateForChart}
                  />
                );
              }

              // fallback to sample data if no API data
              return (
                <WeeklyAttendanceTrend
                  eligibleData={sparklines.eligible}
                  attendanceData={sparklines.attendance}
                  rateData={sparklines.rate}
                />
              );
            })()}

            <EmployeeTypeChart employeeTypeData={employeeTypeData} />
          </Box>

          {/* CDPLC Category Attendance Chart */}
          <Box sx={{ marginTop: "32px" }}>
            <CDPLCBreakdown cdplcData={cdplcData} radialData={radialData} />
          </Box>

          {/* Division Attendance Rate Chart */}
          {transformedDivisionData &&
            transformedDivisionData.length > 0 &&
            !loading && (
              <Box sx={{ marginTop: "32px" }}>
                <DivisionBreakdown divisionData={transformedDivisionData} />
              </Box>
            )}

          {loading && (
            <Box
              sx={{
                marginTop: "32px",
                padding: "40px",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Loading dashboard data...
              </Typography>
            </Box>
          )}

          {/* Trainees Overview Charts */}
          {/* <Box sx={{ marginTop: "32px" }}>
            <TraineesOverview
              traineeOverall={transformedTraineeOverall}
              traineeByDivision={transformedTraineeByDivision}
            />
          </Box> */}

          {/* Quick Access Section */}
          <QuickAccessSection />
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
