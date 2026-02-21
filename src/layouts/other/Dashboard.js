import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// Import chart components
import { KpiCard } from "../../components/Charts/KpiCard";
import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
import { TraineesOverview } from "../../components/Charts/TraineesOverview";

// Import actions
import {
  GetCdlBasedDivison,
  GetTraineeBasedTypes,
  GetTraineeDivisionAttendance,
  GetAllAttendance
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
  const { divisionData, traineeTypes, traineeDivision, allAttendance, loading } = useSelector(
    (state) => state.attendanceCard
  );

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#004AAD");
    }

    // Fetch data on component mount
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    try {
      dispatch(GetCdlBasedDivison(today, today));
      dispatch(GetTraineeBasedTypes(today));
      dispatch(GetTraineeDivisionAttendance(today, today));
      dispatch(GetAllAttendance(today, today));
    } catch (error) {
      console.error('Error dispatching actions:', error);
    }
  }, [dispatch]);

  // Transform division data for charts
  const transformedDivisionData = divisionData?.map(item => ({
    division: item.V_DIVNAME || item.HLD_DIV_CODE || 'Unknown',
    rate: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
    categories: {
      executive: {
        st: parseInt(item.STRENGTH_EXECUTIVE) || 0,
        at: parseInt(item.ATTENDANCE_EXECUTIVE) || 0,
        percent: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0
      },
      supervisory: {
        st: parseInt(item.STRENGTH_SUPERVISORY) || 0,
        at: parseInt(item.ATTENDANCE_SUPERVISORY) || 0,
        percent: parseFloat(item.PERCENTAGE_SUPERVISORY) || 0
      },
      clerical: item.STRENGTH_CLERICAL ? {
        st: parseInt(item.STRENGTH_CLERICAL) || 0,
        at: 0, // Assuming no attendance data for clerical in this API
        percent: 0
      } : null
    }
  })) || [];

  console.log('Division Data:', divisionData);
  console.log('Transformed Division Data:', transformedDivisionData);
  console.log('Trainee Types:', traineeTypes);
  console.log('Trainee Division:', traineeDivision);
  console.log('All Attendance:', allAttendance);

  // Transform trainee types data
  const transformedTraineeOverall = traineeTypes?.map(item => ({
    category: item.TYPE || 'Unknown',
    strength: parseInt(item.STRENGTH) || 0,
    attendance: parseInt(item.ATTENDANCE) || 0,
    percent: parseFloat(item.PERCENTAGE) || 0
  })) || [];

  // Transform trainee division data
  const transformedTraineeByDivision = traineeDivision?.map(item => ({
    division: item.V_DIVNAME || item.HLD_DIV_CODE || 'Unknown',
    clerical_strength: parseInt(item.STRENGTH_CLERICAL) || 0,
    clerical_attendance: parseInt(item.ATTENDANCE_CLERICAL) || 0,
    industrial_strength: parseInt(item.STRENGTH_INDUSTRIAL) || 0,
    industrial_attendance: parseInt(item.ATTENDANCE_INDUSTRIAL) || 0,
    total_strength: (parseInt(item.STRENGTH_CLERICAL) || 0) + (parseInt(item.STRENGTH_INDUSTRIAL) || 0),
    total_attendance: (parseInt(item.ATTENDANCE_CLERICAL) || 0) + (parseInt(item.ATTENDANCE_INDUSTRIAL) || 0),
    total_percent: 0 // Will calculate below
  })).map(item => ({
    ...item,
    total_percent: item.total_strength > 0 ? Math.round((item.total_attendance / item.total_strength) * 100) : 0
  })) || [];

  // For now, using empty array for traineeByDivision since the API response wasn't provided
  const traineeByDivision = [];

  // Calculate KPI values from data
  const totalEmployees = divisionData?.reduce((sum, item) => 
    sum + (parseInt(item.STRENGTH_EXECUTIVE) || 0) + (parseInt(item.STRENGTH_SUPERVISORY) || 0), 0) || 0;
  
  const totalAttendance = divisionData?.reduce((sum, item) => 
    sum + (parseInt(item.ATTENDANCE_EXECUTIVE) || 0) + (parseInt(item.ATTENDANCE_SUPERVISORY) || 0), 0) || 0;
  
  const attendanceRate = totalEmployees > 0 ? Math.round((totalAttendance / totalEmployees) * 100) : 0;

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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <Typography>Loading dashboard data...</Typography>
        </Box>
      ) : (
        <>
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
              target={totalEmployees}
              icon={Users}
              sparkData={sparklines.total}
              sparkColor="#3b82f6"
              trend="+12%"
              trendPositive={true}
              delay={0}
            />

            <KpiCard
              label="Eligible Strength"
              target={totalEmployees}
              icon={UserCheck}
              sparkData={sparklines.eligible}
              sparkColor="#8b5cf6"
              trend="85% of total"
              trendPositive={true}
              delay={1}
            />

            <KpiCard
              label="Total Attendance"
              target={totalAttendance}
              icon={Clock}
              sparkData={sparklines.attendance}
              sparkColor="#10b981"
              trend={`${attendanceRate}% rate`}
              trendPositive={true}
              delay={2}
            />

            <KpiCard
              label="Attendance Rate"
              target={attendanceRate}
              suffix="%"
              icon={TrendingUp}
              sparkData={sparklines.rate}
              sparkColor="#06b6d4"
              trend="+2% vs last week"
              trendPositive={true}
              delay={3}
            />
          </Box>

          {/* Division Attendance Rate Chart */}
          <Box sx={{ marginTop: "32px" }}>
            <DivisionBreakdown divisionData={transformedDivisionData} />
          </Box>

          {/* Trainees Overview Charts */}
          <Box sx={{ marginTop: "32px" }}>
            <TraineesOverview
              traineeOverall={transformedTraineeOverall}
              traineeByDivision={transformedTraineeByDivision}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Dashboard;
