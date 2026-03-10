import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  People,
  EventAvailable,
  AccessTime,
} from "@mui/icons-material";
import AttendanceService from "../../service/AttendanceService";
import LeaveService from "../../service/LeaveService";
import dayjs from "dayjs";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [punctuality, setPunctuality] = useState(null);
  const [leaveSummary, setLeaveSummary] = useState(null);

  // Color palette matching the project theme
  const colors = {
    primary: "#1976d2",
    secondary: "#dc004e",
    success: "#4caf50",
    warning: "#ff9800",
    info: "#2196f3",
    purple: "#9c27b0",
    teal: "#009688",
    pink: "#e91e63",
  };

  const chartColors = [
    colors.primary,
    colors.success,
    colors.warning,
    colors.purple,
    colors.teal,
    colors.pink,
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const currentMonth = dayjs().format("YYYY-MM");
      const currentYear = dayjs().format("YYYY");

      // Fetch all data in parallel
      const [attendance, leave, punct, summary] = await Promise.allSettled([
        AttendanceService.GetAttendanceCard(currentMonth),
        LeaveService.GetLeaveBalance(currentYear),
        LeaveService.GetPunctuality(currentYear),
        LeaveService.GetLeaveSummary(currentYear),
      ]);

      if (attendance.status === "fulfilled") {
        setAttendanceData(attendance.value.data);
      }
      if (leave.status === "fulfilled") {
        setLeaveBalance(leave.value.data);
      }
      if (punct.status === "fulfilled") {
        setPunctuality(punct.value.data);
      }
      if (summary.status === "fulfilled") {
        setLeaveSummary(summary.value.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const getMonthlyAttendanceData = () => {
    // Use actual attendance data if available, otherwise sample data
    if (attendanceData && Array.isArray(attendanceData)) {
      return attendanceData.map((item) => ({
        month: item.Month || item.month || "N/A",
        present: item.Present || item.present || 0,
        absent: item.Absent || item.absent || 0,
        late: item.Late || item.late || 0,
      }));
    }
    // Sample data structure - adjust based on actual API response
    return [
      { month: "Jan", present: 22, absent: 2, late: 1 },
      { month: "Feb", present: 20, absent: 1, late: 2 },
      { month: "Mar", present: 23, absent: 0, late: 1 },
      { month: "Apr", present: 21, absent: 2, late: 0 },
      { month: "May", present: 22, absent: 1, late: 1 },
      { month: "Jun", present: 23, absent: 0, late: 0 },
    ];
  };

  const getLeaveBalanceData = () => {
    // Sample data - adjust based on actual API response
    if (!leaveBalance || !Array.isArray(leaveBalance)) {
      return [
        { name: "Annual Leave", value: 12 },
        { name: "Sick Leave", value: 8 },
        { name: "Casual Leave", value: 5 },
        { name: "Other", value: 3 },
      ];
    }
    return leaveBalance.map((item) => ({
      name: item.LeaveType || item.name || "Leave",
      value: item.Balance || item.value || 0,
    }));
  };

  const getPunctualityTrendData = () => {
    // Use actual punctuality data if available, otherwise sample data
    if (punctuality && Array.isArray(punctuality)) {
      return punctuality.map((item) => ({
        month: item.Month || item.month || "N/A",
        onTime: item.OnTime || item.onTime || 0,
        late: item.Late || item.late || 0,
      }));
    }
    // Sample data - adjust based on actual API response
    return [
      { month: "Jan", onTime: 95, late: 5 },
      { month: "Feb", onTime: 92, late: 8 },
      { month: "Mar", onTime: 98, late: 2 },
      { month: "Apr", onTime: 94, late: 6 },
      { month: "May", onTime: 96, late: 4 },
      { month: "Jun", onTime: 97, late: 3 },
    ];
  };

  const getLeaveTrendsData = () => {
    // Use actual leave summary data if available, otherwise sample data
    if (leaveSummary && Array.isArray(leaveSummary)) {
      return leaveSummary.map((item) => ({
        month: item.Month || item.month || "N/A",
        approved: item.Approved || item.approved || 0,
        pending: item.Pending || item.pending || 0,
        rejected: item.Rejected || item.rejected || 0,
      }));
    }
    // Sample data - adjust based on actual API response
    return [
      { month: "Jan", approved: 3, pending: 1, rejected: 0 },
      { month: "Feb", approved: 2, pending: 0, rejected: 0 },
      { month: "Mar", approved: 4, pending: 2, rejected: 1 },
      { month: "Apr", approved: 3, pending: 0, rejected: 0 },
      { month: "May", approved: 5, pending: 1, rejected: 0 },
      { month: "Jun", approved: 2, pending: 1, rejected: 0 },
    ];
  };

  // Stats Cards Component
  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        borderRadius: 3,
        border: `1px solid ${color}30`,
        height: "100%",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: color, my: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: 2,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#333", mb: 1 }}>
          HR Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Overview of your attendance, leave, and performance metrics
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Attendance Rate"
            value="96%"
            subtitle="This month"
            icon={<People sx={{ color: "white" }} />}
            color={colors.success}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Leave Balance"
            value="15"
            subtitle="Days remaining"
            icon={<EventAvailable sx={{ color: "white" }} />}
            color={colors.primary}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Punctuality"
            value="97%"
            subtitle="On-time arrival"
            icon={<AccessTime sx={{ color: "white" }} />}
            color={colors.warning}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatCard
            title="Performance"
            value="A+"
            subtitle="Overall rating"
            icon={<TrendingUp sx={{ color: "white" }} />}
            color={colors.purple}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={2}>
        {/* Monthly Attendance Chart */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Monthly Attendance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getMonthlyAttendanceData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    style={{ fontSize: "12px" }}
                    stroke="#666"
                  />
                  <YAxis style={{ fontSize: "12px" }} stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px" }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="present"
                    fill={colors.success}
                    radius={[8, 8, 0, 0]}
                    name="Present"
                  />
                  <Bar
                    dataKey="absent"
                    fill={colors.secondary}
                    radius={[8, 8, 0, 0]}
                    name="Absent"
                  />
                  <Bar
                    dataKey="late"
                    fill={colors.warning}
                    radius={[8, 8, 0, 0]}
                    name="Late"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Balance Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Leave Balance Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getLeaveBalanceData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getLeaveBalanceData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={chartColors[index % chartColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Punctuality Trend Area Chart */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Punctuality Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getPunctualityTrendData()}>
                  <defs>
                    <linearGradient id="colorOnTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={colors.success}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={colors.success}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={colors.warning}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={colors.warning}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    style={{ fontSize: "12px" }}
                    stroke="#666"
                  />
                  <YAxis style={{ fontSize: "12px" }} stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px" }}
                    iconType="circle"
                  />
                  <Area
                    type="monotone"
                    dataKey="onTime"
                    stroke={colors.success}
                    fillOpacity={1}
                    fill="url(#colorOnTime)"
                    name="On Time %"
                  />
                  <Area
                    type="monotone"
                    dataKey="late"
                    stroke={colors.warning}
                    fillOpacity={1}
                    fill="url(#colorLate)"
                    name="Late %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Leave Trends Line Chart */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Leave Request Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getLeaveTrendsData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    style={{ fontSize: "12px" }}
                    stroke="#666"
                  />
                  <YAxis style={{ fontSize: "12px" }} stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px" }}
                    iconType="circle"
                  />
                  <Line
                    type="monotone"
                    dataKey="approved"
                    stroke={colors.success}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Approved"
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke={colors.warning}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Pending"
                  />
                  <Line
                    type="monotone"
                    dataKey="rejected"
                    stroke={colors.secondary}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Rejected"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Insights */}
      <Box sx={{ mt: 3 }}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Quick Insights
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip
              label="100% Attendance Last Week"
              color="success"
              variant="outlined"
            />
            <Chip
              label="3 Pending Leave Requests"
              color="warning"
              variant="outlined"
            />
            <Chip
              label="15 Days Leave Balance"
              color="primary"
              variant="outlined"
            />
            <Chip
              label="Perfect Punctuality Streak: 7 Days"
              color="info"
              variant="outlined"
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
