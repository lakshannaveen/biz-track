// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Fade,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   useMediaQuery,
//   useTheme,
//   AppBar,
//   Toolbar,
//   Container
// } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import CloseIcon from '@mui/icons-material/Close';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import CompanyDashboard from './companyDashboad/index';
// import { KpiCard } from "../../components/Charts/KpiCard";
// import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
// import { TraineesDivisionBreakdown } from "../../components/Charts/TraineesDivisionBreakdown";
// import { TraineesOverview } from "../../components/Charts/TraineesOverview";
// import WeeklyAttendanceTrend from "../../components/Charts/WeeklyAttendanceTrend";
// import { EmployeeTypeChart } from "../../components/Charts/EmployeeTypeChart";
// import { CDPLCBreakdown } from "../../components/Charts/CDPLCBreakdown";
// import QuickAccessSection from "../../components/Cards/QuickAccessSection";
// import {
//   GetCdlBasedDivison,
//   GetTraineeBasedTypes,
//   GetTraineeDivisionAttendance,
//   GetAllAttendance,
//   GetCDLWeekAttendance,
// } from "../../action/Attendance";
// import { EmployeeStrengthAttendanceChart } from "../../components/Charts/EmployeeStrengthAttendanceChart";
// import { Person } from "@material-ui/icons";

// // ─── KPI Card Skeleton ────────────────────────────────────────────────────────
// const KpiCardSkeleton = () => (
//   <Box
//     sx={{
//       position: "relative",
//       background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)",
//       borderRadius: "20px",
//       padding: "24px",
//       overflow: "hidden",
//       border: "1px solid rgba(255,255,255,0.8)",
//       boxShadow: "0 4px 24px rgba(0,74,173,0.06)",
//       "@keyframes shimmer": {
//         "0%": { backgroundPosition: "-200% 0" },
//         "100%": { backgroundPosition: "200% 0" },
//       },
//       "&::after": {
//         content: '""',
//         position: "absolute",
//         inset: 0,
//         background:
//           "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
//         backgroundSize: "200% 100%",
//         animation: "shimmer 1.8s infinite",
//         borderRadius: "20px",
//       },
//     }}
//   >
//     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2.5 }}>
//       <Box
//         sx={{
//           width: "45%",
//           height: 13,
//           backgroundColor: "rgba(0,74,173,0.12)",
//           borderRadius: "6px",
//         }}
//       />
//       <Box
//         sx={{
//           width: 38,
//           height: 38,
//           backgroundColor: "rgba(0,74,173,0.1)",
//           borderRadius: "10px",
//         }}
//       />
//     </Box>
//     <Box
//       sx={{
//         width: "55%",
//         height: 34,
//         backgroundColor: "rgba(0,74,173,0.14)",
//         borderRadius: "8px",
//         mb: 1.5,
//       }}
//     />
//     <Box
//       sx={{
//         width: "35%",
//         height: 11,
//         backgroundColor: "rgba(0,74,173,0.08)",
//         borderRadius: "6px",
//       }}
//     />
//   </Box>
// );

// // ─── Chart Skeleton ───────────────────────────────────────────────────────────
// const ChartSkeleton = ({ height = 300 }) => (
//   <Box
//     sx={{
//       position: "relative",
//       background: "linear-gradient(135deg, #f7f9ff 0%, #eef2ff 100%)",
//       borderRadius: "20px",
//       padding: "24px",
//       height: height,
//       overflow: "hidden",
//       border: "1px solid rgba(0,74,173,0.06)",
//       boxShadow: "0 4px 24px rgba(0,74,173,0.05)",
//       "@keyframes shimmer2": {
//         "0%": { backgroundPosition: "-200% 0" },
//         "100%": { backgroundPosition: "200% 0" },
//       },
//       "&::after": {
//         content: '""',
//         position: "absolute",
//         inset: 0,
//         background:
//           "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
//         backgroundSize: "200% 100%",
//         animation: "shimmer2 1.8s infinite",
//         borderRadius: "20px",
//       },
//     }}
//   >
//     <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//       <Box
//         sx={{
//           width: "28%",
//           height: 20,
//           backgroundColor: "rgba(0,74,173,0.1)",
//           borderRadius: "6px",
//         }}
//       />
//       <Box
//         sx={{
//           width: "16%",
//           height: 20,
//           backgroundColor: "rgba(0,74,173,0.07)",
//           borderRadius: "6px",
//         }}
//       />
//     </Box>
//     <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: "70%" }}>
//       {[65, 80, 50, 90, 70, 85, 60].map((h, i) => (
//         <Box
//           key={i}
//           sx={{
//             flex: 1,
//             height: `${h}%`,
//             backgroundColor: "rgba(0,74,173,0.08)",
//             borderRadius: "6px 6px 0 0",
//           }}
//         />
//       ))}
//     </Box>
//   </Box>
// );
 
// // ─── Navigation Drawer Component ───────────────────────────────────────────────
// const NavigationDrawer = ({ open, onClose, activeTab, onTabChange }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 
//   const overviewItems = [
//     {
//       id: 4,
//       label: 'Company',
//       icon: <DashboardIcon />,
//       color: '#ef4444',
//       //description: 'Company overview and metrics',
//       isBold: true 
//     },
//     {
//       id: 5,
//       label: 'Own',
//       icon: <Person />,
//       color: '#f59e0b',
//       //description: 'Personal dashboard and KPIs',
//       isBold: true,
//       disabled: true
//     },
//   ];

//   // Main dashboard items
//   const mainItems = [
//     {
//       id: 0,
//       label: 'HR Dashboard',
//       icon: <PeopleAltIcon />,
//       color: '#004AAD',
//       description: 'Employee attendance and performance metrics'
//     },
//     {
//       id: 1,
//       label: 'Financial Dashboard',
//       icon: <AccountBalanceIcon />,
//       color: '#10b981',
//       description: 'Budget tracking and fiscal overview',
//       disabled: true
//     },
//     {
//       id: 2,
//       label: 'Sales Performance',
//       icon: <TrendingUp />,
//       color: '#f59e0b',
//       description: 'Sales metrics and targets',
//       disabled: true
//     },
//     {
//       id: 3,
//       label: 'Customer Support',
//       icon: <Users />,
//       color: '#8b5cf6',
//       description: 'Support ticket analytics',
//       disabled: true
//     },
//   ];

//   // Other KPIs section items
//   const otherKpisItems = [
//     {
//       id: 7,
//       label: 'Operational KPIs',
//       icon: <Clock />,
//       color: '#06b6d4',
//       description: 'Operational efficiency metrics',
//       disabled: true
//     },
//     {
//       id: 8,
//       label: 'Quality Metrics',
//       icon: <UserCheck />,
//       color: '#8b5cf6',
//       description: 'Quality assurance indicators',
//       disabled: true
//     },
//     {
//       id: 9,
//       label: 'Project Status',
//       icon: <TrendingUp />,
//       color: '#f43f5e',
//       description: 'Project completion rates',
//       disabled: true
//     },
//   ];

//   const handleTabClick = (tabId) => {
//     onTabChange(tabId);
//     onClose();
//   };

//   // Helper function to render menu items
//   const renderMenuItems = (items, showDivider = false) => (
//     <>
//       <List sx={{ p: 0 }}>
//         {items.map((item) => (
//           <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
//             <ListItemButton
//               onClick={() => handleTabClick(item.id)}
//               disabled={item.disabled}
//               selected={activeTab === item.id}
//               sx={{
//                 borderRadius: '12px',
//                 py: 1.5,
//                 px: 2,
//                 transition: 'all 0.2s ease',
//                 ...(item.isBold && {
//                   borderLeft: '4px solid',
//                   borderLeftColor: item.color,
//                   backgroundColor: 'rgba(239,68,68,0.04)',
//                 }),
//                 '&.Mui-selected': {
//                   backgroundColor: `${item.color}12`,
//                   '&:hover': {
//                     backgroundColor: `${item.color}20`,
//                   },
//                   '& .MuiListItemIcon-root': {
//                     color: item.color,
//                   },
//                   '& .MuiListItemText-primary': {
//                     color: item.color,
//                     fontWeight: 600,
//                   },
//                 },
//                 '&:hover': {
//                   backgroundColor: 'rgba(0,74,173,0.04)',
//                   transform: 'translateX(4px)',
//                 },
//                 '&.Mui-disabled': {
//                   opacity: 0.5,
//                   cursor: 'not-allowed',
//                 },
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 40,
//                   color: activeTab === item.id ? item.color : '#64748b',
//                   transition: 'color 0.2s ease',
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.label}
//                 secondary={item.description}
//                 primaryTypographyProps={{
//                   fontSize: '0.95rem',
//                   fontWeight: item.isBold ? 700 : (activeTab === item.id ? 600 : 500),
//                   ...(item.isBold && {
//                     color: item.color,
//                   }),
//                 }}
//                 secondaryTypographyProps={{
//                   fontSize: '0.75rem',
//                   sx: { color: 'text.secondary', mt: 0.5 }
//                 }}
//               />
//               {item.disabled && (
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     bgcolor: 'rgba(0,0,0,0.04)',
//                     px: 1,
//                     py: 0.5,
//                     borderRadius: '4px',
//                     color: 'text.secondary',
//                     fontSize: '0.7rem'
//                   }}
//                 >
//                   Coming Soon
//                 </Typography>
//               )}
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       {showDivider && (
//         <Divider sx={{ my: 2, borderColor: 'rgba(0,74,173,0.08)' }} />
//       )}
//     </>
//   );

//   return (
//     <Drawer
//       anchor="left"
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         sx: {
//           width: isMobile ? '85%' : 320,
//           maxWidth: 320,
//           borderTopRightRadius: 20,
//           borderBottomRightRadius: 20,
//           background: 'linear-gradient(135deg, #ffffff 0%, #fafcff 100%)',
//           boxShadow: '8px 0 32px rgba(0,74,173,0.12)',
//         }
//       }}
//     >
//       <Box sx={{ p: 3 }}>
//         {/* Header */}
//         <Box sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           mb: 3
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Box
//               sx={{
//                 width: 32,
//                 height: 32,
//                 borderRadius: '10px',
//                 background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <DashboardIcon sx={{ color: 'white', fontSize: 18 }} />
//             </Box>
//             <Typography
//               sx={{
//                 fontSize: '1.2rem',
//                 fontWeight: 700,
//                 background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//               }}
//             >
//               Dashboards
//             </Typography>
//           </Box>
//           <IconButton onClick={onClose} size="small">
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Divider sx={{ mb: 2, borderColor: 'rgba(0,74,173,0.08)' }} />

//         {/* Overview Section with Company & Own */}
//         <Typography
//           variant="subtitle2"
//           sx={{
//             px: 2,
//             mb: 1,
//             color: '#ef4444',
//             fontWeight: 700,
//             fontSize: '0.85rem',
//             textTransform: 'uppercase',
//             letterSpacing: '0.5px'
//           }}
//         >
//           OVERVIEW
//         </Typography>
//         {renderMenuItems(overviewItems, true)}

//         {/* Main Dashboards Section */}
//         <Typography
//           variant="subtitle2"
//           sx={{
//             px: 2,
//             mb: 1,
//             color: '#004AAD',
//             fontWeight: 600,
//             fontSize: '0.85rem',
//             textTransform: 'uppercase',
//             letterSpacing: '0.5px'
//           }}
//         >
//           KPI'S 
//         </Typography>
//         {renderMenuItems(mainItems, false)}

//         {/* Underline after Customer Support */}
//         <Divider sx={{ my: 2, borderColor: 'rgba(0,74,173,0.12)', borderBottomWidth: 2 }} />

//         {/* Other KPIs Section */}
//         <Typography
//           variant="subtitle2"
//           sx={{
//             px: 2,
//             mb: 1,
//             color: '#f43f5e',
//             fontWeight: 600,
//             fontSize: '0.85rem',
//             textTransform: 'uppercase',
//             letterSpacing: '0.5px'
//           }}
//         >
//           OTHER KPIs
//         </Typography>
//         {renderMenuItems(otherKpisItems, false)}

        
//       </Box>
//     </Drawer>
//   );
// };

// // ─── KPI Cards Grid ───────────────────────────────────────────────────────────
// const KpiCardsGrid = ({
//   loadingStates,
//   kpiAttendance,
//   kpiActualStrength,
//   kpiEligibleStrength,
//   kpiAttendanceRate,
// }) => {
//   const cards = [
//     {
//       label: "Total Workforce",
//       target: kpiActualStrength,
//       icon: Users,
//       sparkColor: "#004AAD",
//       accent: "rgba(0,74,173,0.12)",
//       accentSolid: "#004AAD",
//       delay: 0,
//       suffix: undefined,
//     },
//     {
//       label: "Total Attendance",
//       target: kpiAttendance,
//       icon: UserCheck,
//       sparkColor: "#8b5cf6",
//       accent: "rgba(139,92,246,0.12)",
//       accentSolid: "#8b5cf6",
//       delay: 1,
//       suffix: undefined,
//     },

//     {
//       label: "Eligible Workforce",
//       target: kpiEligibleStrength,
//       icon: Clock,
//       sparkColor: "#f43f5e",
//       accent: "rgba(244,63,94,0.12)",
//       accentSolid: "#f43f5e",
//       delay: 2,
//       suffix: undefined,
//     },
//     {
//       label: "Attendance Rate",
//       target: kpiAttendanceRate,
//       icon: TrendingUp,
//       sparkColor: "#06b6d4",
//       accent: "rgba(6,182,212,0.12)",
//       accentSolid: "#06b6d4",
//       delay: 3,
//       suffix: "%",
//     },
//   ];

//   return (
//     <Box
//       sx={{
//         display: "grid",
//         gridTemplateColumns: {
//           xs: "1fr 1fr",
//           sm: "1fr 1fr",
//           md: "1fr 1fr",
//           lg: "repeat(4, 1fr)",
//         },
//         gap: { xs: "10px", sm: "14px", md: "16px" },
//         marginBottom: "20px",
//       }}
//     >
//       {cards.map((card, index) =>
//         loadingStates.allAttendance ? (
//           <KpiCardSkeleton key={index} />
//         ) : (
//           <KpiCard
//             key={index}
//             label={card.label}
//             target={card.target}
//             icon={card.icon}
//             sparkColor={card.sparkColor}
//             delay={card.delay}
//             suffix={card.suffix}
//           />
//         )
//       )}
//     </Box>
//   );
// };

// // ─── Main Dashboard ─────────────────────────────────────────────────────────── 
// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const [selectedYear, setSelectedYear] = useState(() => { 
//     return new Date().getFullYear().toString();
//   });

//   const {
//     divisionData,
//     traineeTypes,
//     traineeDivision,
//     allAttendance,
//     loading,
//     weeklyAttendance,
//   } = useSelector((state) => state.attendanceCard);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState(4);
//   const [cachedAllAttendance, setCachedAllAttendance] = useState(null);
//   const [cachedTraineeTypes, setCachedTraineeTypes] = useState(null);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   const [loadingStates, setLoadingStates] = useState({
//     divisionData: true,
//     traineeTypes: true,
//     traineeDivision: true,
//     allAttendance: true,
//     weeklyAttendance: true,
//   });

//   const today = new Date().toISOString().split("T")[0];
//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   useEffect(() => {
//     const cachedTrainee = localStorage.getItem("dashboard_traineeTypes");
//     if (cachedTrainee) {
//       setCachedTraineeTypes(JSON.parse(cachedTrainee));
//       setLoadingStates((prev) => ({ ...prev, traineeTypes: false }));
//     }
//     setDataLoaded(true);
//   }, []);

//   useEffect(() => {
//     if (divisionData && divisionData.length > 0)
//       setLoadingStates((prev) => ({ ...prev, divisionData: false }));
//   }, [divisionData]);

//   useEffect(() => {
//     if (traineeTypes && traineeTypes.length > 0) {
//       setLoadingStates((prev) => ({ ...prev, traineeTypes: false }));
//       localStorage.setItem("dashboard_traineeTypes", JSON.stringify(traineeTypes));
//     }
//   }, [traineeTypes]);

//   useEffect(() => {
//     if (traineeDivision && traineeDivision.length > 0)
//       setLoadingStates((prev) => ({ ...prev, traineeDivision: false }));
//   }, [traineeDivision]);

//   useEffect(() => {
//     if (allAttendance && allAttendance.length > 0) {
//       setLoadingStates((prev) => ({ ...prev, allAttendance: false }));
//       localStorage.setItem("dashboard_allAttendance", JSON.stringify(allAttendance));
//     }
//   }, [allAttendance]);

//   useEffect(() => {
//     if (weeklyAttendance && weeklyAttendance.length > 0)
//       setLoadingStates((prev) => ({ ...prev, weeklyAttendance: false }));
//   }, [weeklyAttendance]);

//   useEffect(() => {
//     const metaThemeColor = document.querySelector('meta[name="theme-color"]');
//     if (metaThemeColor) metaThemeColor.setAttribute("content", "#004AAD");

//     const fetchData = async () => {
//       try {
//         if (!cachedAllAttendance) dispatch(GetAllAttendance(today, today));
//         if (!cachedTraineeTypes) dispatch(GetTraineeBasedTypes(today));
//         dispatch(GetCdlBasedDivison(today, today));
//         dispatch(GetTraineeDivisionAttendance(today, today));
//         dispatch(GetCDLWeekAttendance(today));
//       } catch (error) {
//         console.error("Error dispatching actions:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch, cachedAllAttendance, cachedTraineeTypes, today]);

//   // ── Transforms ──
//   const transformedDivisionData =
//     divisionData?.map((item) => ({
//       division: item.HLD_DIV_CODE || item.HLD_DIV_CODE || "Unknown",
//       rate: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
//       categories: {
//         executive: {
//           st: parseInt(item.STRENGTH_EXECUTIVE) || 0,
//           at: parseInt(item.ATTENDANCE_EXECUTIVE) || 0,
//           percent: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
//         },
//         supervisory: {
//           st: parseInt(item.STRENGTH_SUPERVISORY) || 0,
//           at: parseInt(item.ATTENDANCE_SUPERVISORY) || 0,
//           percent: parseFloat(item.PERCENTAGE_SUPERVISORY) || 0,
//         },
//         clerical: item.STRENGTH_CLERICAL
//           ? { st: parseInt(item.STRENGTH_CLERICAL) || 0, at: 0, percent: 0 }
//           : null,
//       },
//     })) || [];

//   const transformedTraineeByDivision =
//     traineeDivision
//       ?.map((item) => ({
//         division: item.V_DIVNAME || item.HLD_DIV_CODE || "Unknown",
//         clerical_strength: parseInt(item.STRENGTH_CLERICAL) || 0,
//         clerical_attendance: parseInt(item.ATTENDANCE_CLERICAL) || 0,
//         industrial_strength: parseInt(item.STRENGTH_INDUSTRIAL) || 0,
//         industrial_attendance: parseInt(item.ATTENDANCE_INDUSTRIAL) || 0,
//         total_strength:
//           (parseInt(item.STRENGTH_CLERICAL) || 0) +
//           (parseInt(item.STRENGTH_INDUSTRIAL) || 0),
//         total_attendance:
//           (parseInt(item.ATTENDANCE_CLERICAL) || 0) +
//           (parseInt(item.ATTENDANCE_INDUSTRIAL) || 0),
//         total_percent: 0,
//       }))
//       .map((item) => ({
//         ...item,
//         total_percent:
//           item.total_strength > 0
//             ? Math.round((item.total_attendance / item.total_strength) * 100)
//             : 0,
//       })) || [];

//   const employeeTypeData = cachedTraineeTypes || traineeTypes || [];

//   const totalEmployees =
//     divisionData?.reduce(
//       (sum, item) =>
//         sum +
//         (parseInt(item.STRENGTH_EXECUTIVE) || 0) +
//         (parseInt(item.STRENGTH_SUPERVISORY) || 0),
//       0
//     ) || 0;

//   const totalAttendance =
//     divisionData?.reduce(
//       (sum, item) =>
//         sum +
//         (parseInt(item.ATTENDANCE_EXECUTIVE) || 0) +
//         (parseInt(item.ATTENDANCE_SUPERVISORY) || 0),
//       0
//     ) || 0;

//   const attendanceRate =
//     totalEmployees > 0 ? Math.round((totalAttendance / totalEmployees) * 100) : 0;

//   const totalAttendanceItem = (allAttendance || []).find((item) => {
//     const typeValue =
//       item?.Type || item?.TYPE || item?.EmployeeType || item?.employeeType;
//     return typeof typeValue === "string" && typeValue.toUpperCase() === "TOTAL";
//   });

//   const kpiActualStrength =
//     parseInt(totalAttendanceItem?.ActualStrength) || totalEmployees || 0;
//   const kpiAttendance =
//     parseInt(totalAttendanceItem?.Attendance) || totalAttendance || 0;
 
//   const kpiEligibleStrength =
//     parseInt(totalAttendanceItem?.EligibleStrength) || 0;
 
//   const kpiAttendanceRate = kpiActualStrength > 0
//     ? Math.round((kpiAttendance / kpiActualStrength) * 100)
//     : 0;
 
//   const apiWeek = weeklyAttendance || [];
//   const attendanceFromApi = apiWeek.map((item) => ({
//     v: parseInt(item.Attendance) || 0,
//     dayName: item.DayName || "",
//   }));
//   const eligibleFromApi = apiWeek.map((item) => ({
//     v: parseInt(item.Eligible) || 0,
//     dayName: item.DayName || "",
//   }));
//   const rateForChart = attendanceFromApi.map((a, i) => {
//     const el = eligibleFromApi[i]?.v || 0;
//     return {
//       v: el ? Math.max(0, Math.min(100, Math.round((a.v / el) * 100))) : 0,
//       dayName: a.dayName,
//     };
//   });

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "calc(100vh - 120px)", 
//         backgroundColor: "#f8faff",
//         padding: { xs: "20px 14px", sm: "28px 20px", md: "36px 28px" },
//         backgroundImage:
//           "radial-gradient(rgba(0,74,173,0.06) 1px, transparent 1px)",
//         backgroundSize: "28px 28px",
//         overflow: "hidden", // Prevent outer container from scrolling
//       }}
//     >
//       {/* Hamburger Menu Button and Header - Fixed at top */}
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           mb: 3,
//           flexShrink: 0,  
//         }}
//       >
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton
//             onClick={toggleDrawer}
//             sx={{
//               backgroundColor: '#ffffff',
//               boxShadow: '0 2px 8px rgba(0,74,173,0.12)',
//               borderRadius: '12px',
//               padding: '10px',
//               '&:hover': {
//                 backgroundColor: '#f5f5f5',
//                 transform: 'scale(1.05)',
//               },
//               transition: 'all 0.2s ease',
//             }}
//           >
//             <MenuIcon sx={{ color: '#004AAD' }} />
//           </IconButton>

//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               background: 'linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontSize: { xs: '1.2rem', sm: '1.5rem' },
//             }}
//           >
//             {activeTab === 0 ? 'HR Dashboard' :
//               activeTab === 1 ? 'Financial Dashboard' :
//                 activeTab === 4 ? 'Company Overview' :
//                   activeTab === 5 ? 'Own Overview' :
//                     'Dashboard'}
//           </Typography>
//         </Box>

//         {/* Optional: Add date display or other actions here */}
//         <Typography
//           variant="body2"
//           sx={{
//             color: '#64748b',
//             backgroundColor: '#ffffff',
//             padding: '6px 12px',
//             borderRadius: '20px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
//             display: { xs: 'none', sm: 'block' }
//           }}
//         >
//           {new Date().toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//           })}
//         </Typography>
//       </Box>

//       {/* Navigation Drawer */}
//       <NavigationDrawer
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         activeTab={activeTab}
//         onTabChange={handleTabChange}
//       />

//       {/* Scrollable Content Area */}
//       <Box
//         sx={{
//           flex: 1,
//           overflowY: 'auto',
//           overflowX: 'hidden',
//           pr: { xs: 0, sm: 1 },  
//           '&::-webkit-scrollbar': {
//             width: '0px',
//           },
//           '&::-webkit-scrollbar-track': {
//             background: '#f1f1f1',
//             borderRadius: '10px',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             background: '#f8faff',
//             borderRadius: '10px',
//             '&:hover': {
//               background: '#a8a8a8',
//             },
//           },
//         }}
//       >
//         {/* ── HR Dashboard ── */}
//         {activeTab === 0 && (
//           <Fade in={true} timeout={600}>
//             <Box>
//               {/* Section label - Now scrollable */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1.5,
//                   mb: 2,
//                   mt: 0.5,
//                 }}
//               > 
//               </Box>

//               {/* ── KPI Cards ── */}
//               <KpiCardsGrid
//                 loadingStates={loadingStates}
//                 kpiAttendance={kpiAttendance}
//                 kpiActualStrength={kpiActualStrength}
//                 kpiEligibleStrength={kpiEligibleStrength}
//                 kpiAttendanceRate={kpiAttendanceRate}
//               />

//               {/* ── Employee Strength vs Attendance ── */}
//               <Box sx={{ marginBottom: "24px" }}>
//                 {loadingStates.allAttendance ? (
//                   <ChartSkeleton height={350} />
//                 ) : (
//                   <EmployeeStrengthAttendanceChart
//                     allAttendance={cachedAllAttendance || allAttendance}
//                   />
//                 )}
//               </Box>

//               {/* ── Weekly Attendance ── */}
//               <Box sx={{ marginBottom: "24px" }}>
//                 <Box
//                   sx={{
//                     display: "grid",
//                     gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
//                     gap: "16px",
//                   }}
//                 >
//                   {/* Weekly Attendance Trend */}
//                   <Box>
//                     {loadingStates.weeklyAttendance ? (
//                       <ChartSkeleton height={300} />
//                     ) : apiWeek.length > 0 ? (
//                       <WeeklyAttendanceTrend
//                         eligibleData={eligibleFromApi}
//                         attendanceData={attendanceFromApi}
//                         rateData={rateForChart}
//                       />
//                     ) : (
//                       <WeeklyAttendanceTrend
//                         eligibleData={[]}
//                         attendanceData={[]}
//                         rateData={[]}
//                       />
//                     )}
//                   </Box>

//                   {/* Employee Type Chart */} 
//                 </Box>
//               </Box>

//               {/* ── CDPLC Breakdown ── */}
//               <Box sx={{ marginBottom: "24px" }}>
//                 {loadingStates.divisionData ? (
//                   <ChartSkeleton height={300} />
//                 ) : (
//                   <CDPLCBreakdown hadDate={today} />
//                 )}
//               </Box>

//               {/* ── Division Breakdown ── */}
//               <Box sx={{ marginBottom: "24px" }}>
//                 {loadingStates.divisionData ? (
//                   <ChartSkeleton height={400} />
//                 ) : (
//                   transformedDivisionData.length > 0 && (
//                     <DivisionBreakdown divisionData={transformedDivisionData} />
//                   )
//                 )}
//               </Box>
              
//               <Box sx={{ marginBottom: "24px" }}>
//                 {loadingStates.traineeTypes ? (
//                   <ChartSkeleton height={300} />
//                 ) : (
//                   <EmployeeTypeChart employeeTypeData={employeeTypeData} />
//                 )}
//               </Box>
              
//               <Box sx={{ marginBottom: "24px" }}>
//                 {loadingStates.traineeDivision ? (
//                   <ChartSkeleton height={400} />
//                 ) : (
//                   <TraineesDivisionBreakdown traineeDivisionData={traineeDivision} />
//                 )}
//               </Box>

//               {/* Add bottom padding for better scrolling experience */}
//               <Box sx={{ height: '20px' }} />
//             </Box>
//           </Fade>
//         )}

//         {/* ── Financial Dashboard ── */}
//         {activeTab === 1 && (
//           <Fade in={true} timeout={500}>
//             <Box
//               sx={{
//                 background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//                 color: "white",
//                 padding: "40px 36px",
//                 borderRadius: "20px",
//                 marginBottom: "32px",
//                 boxShadow: "0 8px 40px rgba(16,185,129,0.25)",
//               }}
//             >
//               <Typography
//                 variant="h4"
//                 sx={{ fontWeight: 700, marginBottom: "8px", fontSize: "28px" }}
//               >
//                 Financial Dashboard
//               </Typography>
//               <Typography sx={{ fontSize: "16px", opacity: 0.85, fontWeight: 400 }}>
//                 Financial metrics, budgets, and fiscal performance overview.
//               </Typography>
//               <Box sx={{ marginTop: "24px" }}>
//                 <Typography sx={{ fontSize: "14px", opacity: 0.75, fontStyle: "italic" }}>
//                   Financial dashboard content coming soon...
//                 </Typography>
//               </Box>
//             </Box>
//           </Fade>
//         )}
//         {activeTab === 4 && (
//           <Fade in={true} timeout={600}>
//             <Box>
//               <CompanyDashboard selectedYear="2026" />
//             </Box>
//           </Fade>
//         )}

//       </Box>
//     </Box>
//   );
// };

// export default Dashboard;



import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Fade,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Users, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyDashboard from "./companyDashboad/index";
import { DivisionBreakdown } from "../../components/Charts/DivisionBreakdown";
import { TraineesDivisionBreakdown } from "../../components/Charts/TraineesDivisionBreakdown";
import WeeklyAttendanceTrend from "../../components/Charts/WeeklyAttendanceTrend";
import { EmployeeTypeChart } from "../../components/Charts/EmployeeTypeChart";
import { CDPLCBreakdown } from "../../components/Charts/CDPLCBreakdown";
import {
  GetCdlBasedDivison,
  GetTraineeBasedTypes,
  GetTraineeDivisionAttendance,
  GetAllAttendance,
  GetCDLWeekAttendance,
} from "../../action/Attendance";
import { Person } from "@material-ui/icons";

// ─── Type normalization ───────────────────────────────────────────────────────
const normalizeType = (value) => {
  const s = (value || "").toString().trim().toLowerCase();
  if (s.includes("cdplc")) return "CDPLC";
  if (s.includes("trainee")) return "Trainee";
  if (s.includes("sub") && s.includes("l")) return "Sub (L)";
  if (s.includes("sub") && s.includes("f")) return "Sub (F)";
  if (s.includes("kry") || s.includes("site")) return "KRY Site";
  return (value || "").toString().trim();
};

const TYPE_ORDER  = { CDPLC: 1, "Sub (L)": 2, "Sub (F)": 3, Trainee: 4, "KRY Site": 5 };
const CARD_TYPES  = ["CDPLC","Trainee", "Sub (L)", "Sub (F)", ];

// ─── Card color config ────────────────────────────────────────────────────────
const TYPE_CONFIG = {
  CDPLC:      { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#c9ddf7", numColor: "#222427", rateColor: "#0314fa" },
  Trainee:    { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
  "Sub (L)":  { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
  "Sub (F)":  { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
  "KRY Site": { pill: "#E6F1FB", pillText: "#1e2225", arc: "#0314fa", arcTrack: "#DBEAFE", numColor: "#222427", rateColor: "#0314fa" },
};

// ─── Build per-type breakdown ─────────────────────────────────────────────────
const buildTypeBreakdown = (allAttendance = []) => {
  const transformed = (allAttendance || [])
    .filter((item) => {
      const t = (item?.Type || item?.TYPE || item?.EmployeeType || item?.employeeType || "").toString().trim();
      return t && t.toUpperCase() !== "TOTAL";
    })
    .map((item) => {
      const type       = normalizeType(item?.Type || item?.TYPE || item?.EmployeeType || "Unknown");
      const strength   = parseInt(item?.ActualStrength || item?.Strength || 0) || 0;
      const eligible   = parseInt(item?.EligibleStrength || item?.Eligible || item?.EligibleCount || item?.EligibleAttendance || 0) || 0;
      const attendance = parseInt(item?.Attendance || 0) || 0;
      return { type, strength, eligible, attendance };
    });

  const merged = {};
  transformed.forEach((row) => {
    if (!merged[row.type]) merged[row.type] = { ...row };
    else {
      merged[row.type].strength   += row.strength;
      merged[row.type].eligible   += row.eligible;
      merged[row.type].attendance += row.attendance;
    }
  });

  return Object.values(merged).sort(
    (a, b) => (TYPE_ORDER[a.type] || 99) - (TYPE_ORDER[b.type] || 99)
  );
};

// ─── Arc Gauge SVG ────────────────────────────────────────────────────────────
const ARC_LENGTH = Math.PI * 42;  

const ArcGauge = ({ rate, color, trackColor }) => {
  const offset = ARC_LENGTH - (ARC_LENGTH * Math.min(rate, 100)) / 100;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, pb: 1.5, pt: 0.5 }}>
      <svg width="100" height="54" viewBox="0 0 100 54" style={{ overflow: "visible" }}>
        <path
          d="M8,50 A42,42 0 0,1 92,50"
          fill="none"
          stroke={trackColor}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M8,50 A42,42 0 0,1 92,50"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={ARC_LENGTH}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
    </Box>
  );
};

// ─── Single Attendance KPI Card ───────────────────────────────────────────────
const AttendanceKpiCard = ({ type, strength, eligible, attendance, onClick }) => {
  const cfg  = TYPE_CONFIG[type] || TYPE_CONFIG["CDPLC"];
  const rate = eligible > 0 ? Math.round((attendance / eligible) * 100) : 0;
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Paper
      elevation={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      sx={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "0.5px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: isInteractive ? "pointer" : "default",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.09)",
        },
      }}
    >
      {/* ── Header: type pill + rate ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          px: "16px",
          pt: "14px",
          pb: "12px",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            px: "9px",
            py: "3px",
            borderRadius: "20px",
            backgroundColor: cfg.pill,
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 700, color: cfg.pillText }}>
            {type}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: "20px", fontWeight: 700, color: cfg.rateColor, lineHeight: 1 }}>
            {rate}%
          </Typography>
          <Typography sx={{ fontSize: "10px", color: cfg.rateColor, mt: "1px" }}>
           
          </Typography>
        </Box>
      </Box>
      <Divider />

      {/* ── Attendance number (hero) ── */}
      <Box sx={{ textAlign: "center", pt: "14px", pb: 0 }}>
        <Typography
          sx={{
            fontSize: "10px",
            color: "text.secondary",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            mb: "4px",
          }}
        >
          Attendance
        </Typography>
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
            color: cfg.numColor,
            lineHeight: 1,
          }}
        >
          {(attendance || 0).toLocaleString()}
        </Typography>
      </Box>

      {/* ── Arc gauge ── */}
      <ArcGauge rate={rate} color={cfg.arc} trackColor={cfg.arcTrack} />

      {/* ── Strength + Eligible ── */}
      <Divider />
      <Box sx={{ px: "16px", pt: "10px", pb: "14px", display: "flex", flexDirection: "column", gap: "7px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "11px", color: "text.secondary" ,fontWeight: 600}}>Eligible Strength</Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "text.primary" }}>
            {(eligible || 0).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontSize: "11px", color: "text.secondary" ,fontWeight: 600}}>Actual Strength</Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "text.primary" }}>
            {(strength || 0).toLocaleString()}
          </Typography>
        </Box>
        
      </Box>
    </Paper>
  );
};

// ─── KPI Card Skeleton ────────────────────────────────────────────────────────
const KpiCardSkeleton = () => (
  <Box
    sx={{
      position: "relative",
      background: "linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)",
      borderRadius: "16px",
      padding: "16px",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.8)",
      height: 220,
      "@keyframes shimmer": {
        "0%":   { backgroundPosition: "-200% 0" },
        "100%": { backgroundPosition: "200% 0"  },
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.8s infinite",
        borderRadius: "16px",
      },
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box sx={{ width: "40%", height: 22, backgroundColor: "rgba(0,74,173,0.1)", borderRadius: "10px" }} />
      <Box sx={{ width: "20%", height: 22, backgroundColor: "rgba(0,74,173,0.08)", borderRadius: "6px"  }} />
    </Box>
    <Box sx={{ width: "50%", height: 36, backgroundColor: "rgba(0,74,173,0.12)", borderRadius: "6px", mx: "auto", mb: 1 }} />
    <Box sx={{ width: 100,    height: 54, backgroundColor: "rgba(0,74,173,0.07)", borderRadius: "50px", mx: "auto", mb: 2 }} />
    {[1, 2].map((i) => (
      <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ width: "30%", height: 11, backgroundColor: "rgba(0,74,173,0.06)", borderRadius: "6px" }} />
        <Box sx={{ width: "25%", height: 11, backgroundColor: "rgba(0,74,173,0.10)", borderRadius: "6px" }} />
      </Box>
    ))}
  </Box>
);

// ─── Chart Skeleton ───────────────────────────────────────────────────────────
const ChartSkeleton = ({ height = 300 }) => (
  <Box
    sx={{
      position: "relative",
      background: "linear-gradient(135deg, #f7f9ff 0%, #eef2ff 100%)",
      borderRadius: "20px",
      padding: "24px",
      height,
      overflow: "hidden",
      border: "1px solid rgba(0,74,173,0.06)",
      "@keyframes shimmer2": {
        "0%":   { backgroundPosition: "-200% 0" },
        "100%": { backgroundPosition: "200% 0"  },
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer2 1.8s infinite",
        borderRadius: "20px",
      },
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Box sx={{ width: "28%", height: 20, backgroundColor: "rgba(0,74,173,0.1)",  borderRadius: "6px" }} />
      <Box sx={{ width: "16%", height: 20, backgroundColor: "rgba(0,74,173,0.07)", borderRadius: "6px" }} />
    </Box>
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: "70%" }}>
      {[65, 80, 50, 90, 70, 85, 60].map((h, i) => (
        <Box key={i} sx={{ flex: 1, height: `${h}%`, backgroundColor: "rgba(0,74,173,0.08)", borderRadius: "6px 6px 0 0" }} />
      ))}
    </Box>
  </Box>
);

// ─── Employee Type KPI Cards Grid ─────────────────────────────────────────────
const EmployeeTypeKpiGrid = ({ allAttendance, loading, onCardClick }) => {
  const breakdown = buildTypeBreakdown(allAttendance);
  const byType = {};
  breakdown.forEach((row) => { byType[row.type] = row; });

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
        gap: { xs: "10px", sm: "12px", md: "14px" },
        mb: "24px",
        alignItems: "start",
      }}
    >
      {CARD_TYPES.map((type) =>
        loading ? (
          <KpiCardSkeleton key={type} />
        ) : (
          <AttendanceKpiCard
            key={type}
            type={type}
            strength={byType[type]?.strength   || 0}
            eligible={byType[type]?.eligible   || 0}
            attendance={byType[type]?.attendance || 0}
            onClick={onCardClick ? () => onCardClick(type) : undefined}
          />
        )
      )}
    </Box>
  );
};

// ─── Navigation Drawer ────────────────────────────────────────────────────────
const NavigationDrawer = ({ open, onClose, activeTab, onTabChange }) => {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const overviewItems = [
    { id: 4, label: "Company", icon: <DashboardIcon />, color: "#ef4444", isBold: true },
    { id: 5, label: "Own",     icon: <Person />,        color: "#f59e0b", isBold: true, disabled: true },
  ];
  const mainItems = [
    { id: 0, label: "HR Dashboard",       icon: <PeopleAltIcon />,     color: "#004AAD", description: "Employee attendance and performance metrics" },
    { id: 1, label: "Financial Dashboard", icon: <AccountBalanceIcon />, color: "#10b981", description: "Budget tracking and fiscal overview",        disabled: true },
    { id: 2, label: "Sales Performance",   icon: <TrendingUp />,        color: "#f59e0b", description: "Sales metrics and targets",                  disabled: true },
    { id: 3, label: "Customer Support",    icon: <Users />,             color: "#8b5cf6", description: "Support ticket analytics",                   disabled: true },
  ];
  const otherKpisItems = [
    { id: 7, label: "Operational KPIs", icon: <Clock />,      color: "#06b6d4", description: "Operational efficiency metrics", disabled: true },
    { id: 8, label: "Quality Metrics",  icon: <UserCheck />,  color: "#8b5cf6", description: "Quality assurance indicators",   disabled: true },
    { id: 9, label: "Project Status",   icon: <TrendingUp />, color: "#f43f5e", description: "Project completion rates",       disabled: true },
  ];

  const handleTabClick = (tabId) => { onTabChange(tabId); onClose(); };

  const renderMenuItems = (items, showDivider = false) => (
    <>
      <List sx={{ p: 0 }}>
        {items.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleTabClick(item.id)}
              disabled={item.disabled}
              selected={activeTab === item.id}
              sx={{
                borderRadius: "12px", py: 1.5, px: 2, transition: "all 0.2s ease",
                ...(item.isBold && { borderLeft: "4px solid", borderLeftColor: item.color, backgroundColor: "rgba(239,68,68,0.04)" }),
                "&.Mui-selected": {
                  backgroundColor: `${item.color}12`,
                  "&:hover": { backgroundColor: `${item.color}20` },
                  "& .MuiListItemIcon-root": { color: item.color },
                  "& .MuiListItemText-primary": { color: item.color, fontWeight: 600 },
                },
                "&:hover": { backgroundColor: "rgba(0,74,173,0.04)", transform: "translateX(4px)" },
                "&.Mui-disabled": { opacity: 0.5 },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: activeTab === item.id ? item.color : "#64748b", transition: "color 0.2s ease" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: item.isBold ? 700 : activeTab === item.id ? 600 : 500,
                  ...(item.isBold && { color: item.color }),
                }}
                secondaryTypographyProps={{ fontSize: "0.75rem", sx: { color: "text.secondary", mt: 0.5 } }}
              />
              {item.disabled && (
                <Typography variant="caption" sx={{ bgcolor: "rgba(0,0,0,0.04)", px: 1, py: 0.5, borderRadius: "4px", color: "text.secondary", fontSize: "0.7rem" }}>
                  Coming Soon
                </Typography>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {showDivider && <Divider sx={{ my: 2, borderColor: "rgba(0,74,173,0.08)" }} />}
    </>
  );

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "85%" : 320,
          maxWidth: 320,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          background: "linear-gradient(135deg, #ffffff 0%, #fafcff 100%)",
          boxShadow: "8px 0 32px rgba(0,74,173,0.12)",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: "10px", background: "linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <DashboardIcon sx={{ color: "white", fontSize: 18 }} />
            </Box>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, background: "linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Dashboards
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </Box>

        <Divider sx={{ mb: 2, borderColor: "rgba(0,74,173,0.08)" }} />

        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: "#ef4444", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          OVERVIEW
        </Typography>
        {renderMenuItems(overviewItems, true)}

        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: "#004AAD", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          KPI'S
        </Typography>
        {renderMenuItems(mainItems, false)}

        <Divider sx={{ my: 2, borderColor: "rgba(0,74,173,0.12)", borderBottomWidth: 2 }} />

        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, color: "#f43f5e", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
          OTHER KPIs
        </Typography>
        {renderMenuItems(otherKpisItems, false)}
      </Box>
    </Drawer>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    divisionData,
    traineeTypes,
    traineeDivision,
    allAttendance,
    loading,
    weeklyAttendance,
  } = useSelector((state) => state.attendanceCard);

  const [drawerOpen, setDrawerOpen]                   = useState(false);
  const [activeTab, setActiveTab]                     = useState(4);
  const [cachedAllAttendance, setCachedAllAttendance] = useState(null);
  const [cachedTraineeTypes, setCachedTraineeTypes]   = useState(null);
  const cdplcChartRef = useRef(null);
  const traineeTypeChartRef = useRef(null);

  const [loadingStates, setLoadingStates] = useState({
    divisionData:     true,
    traineeTypes:     true,
    traineeDivision:  true,
    allAttendance:    true,
    weeklyAttendance: true,
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const cachedTrainee = localStorage.getItem("dashboard_traineeTypes");
    if (cachedTrainee) {
      setCachedTraineeTypes(JSON.parse(cachedTrainee));
      setLoadingStates((prev) => ({ ...prev, traineeTypes: false }));
    }
  }, []);

  useEffect(() => { if (divisionData?.length > 0)    setLoadingStates((p) => ({ ...p, divisionData:    false })); }, [divisionData]);
  useEffect(() => {
    if (traineeTypes?.length > 0) {
      setLoadingStates((p) => ({ ...p, traineeTypes: false }));
      localStorage.setItem("dashboard_traineeTypes", JSON.stringify(traineeTypes));
    }
  }, [traineeTypes]);
  useEffect(() => { if (traineeDivision?.length > 0)  setLoadingStates((p) => ({ ...p, traineeDivision:  false })); }, [traineeDivision]);
  useEffect(() => {
    if (allAttendance?.length > 0) {
      setLoadingStates((p) => ({ ...p, allAttendance: false }));
      localStorage.setItem("dashboard_allAttendance", JSON.stringify(allAttendance));
    }
  }, [allAttendance]);
  useEffect(() => { if (weeklyAttendance?.length > 0) setLoadingStates((p) => ({ ...p, weeklyAttendance: false })); }, [weeklyAttendance]);

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) metaThemeColor.setAttribute("content", "#004AAD");
    const fetchData = async () => {
      try {
        if (!cachedAllAttendance) dispatch(GetAllAttendance(today, today));
        if (!cachedTraineeTypes)  dispatch(GetTraineeBasedTypes(today));
        dispatch(GetCdlBasedDivison(today, today));
        dispatch(GetTraineeDivisionAttendance(today, today));
        dispatch(GetCDLWeekAttendance(today));
      } catch (error) {
        console.error("Error dispatching actions:", error);
      }
    };
    fetchData();
  }, [dispatch, cachedAllAttendance, cachedTraineeTypes, today]);

  const transformedDivisionData =
    divisionData?.map((item) => ({
      division: item.HLD_DIV_CODE || "Unknown",
      rate: parseFloat(item.PERCENTAGE_EXECUTIVE) || 0,
      categories: {
        executive:   { st: parseInt(item.STRENGTH_EXECUTIVE)   || 0, at: parseInt(item.ATTENDANCE_EXECUTIVE)   || 0, percent: parseFloat(item.PERCENTAGE_EXECUTIVE)   || 0 },
        supervisory: { st: parseInt(item.STRENGTH_SUPERVISORY) || 0, at: parseInt(item.ATTENDANCE_SUPERVISORY) || 0, percent: parseFloat(item.PERCENTAGE_SUPERVISORY) || 0 },
        clerical: item.STRENGTH_CLERICAL ? { st: parseInt(item.STRENGTH_CLERICAL) || 0, at: 0, percent: 0 } : null,
      },
    })) || [];

  const employeeTypeData  = cachedTraineeTypes || traineeTypes || [];
  const apiWeek           = weeklyAttendance || [];
  const attendanceFromApi = apiWeek.map((item) => ({ v: parseInt(item.Attendance) || 0, dayName: item.DayName || "" }));
  const eligibleFromApi   = apiWeek.map((item) => ({ v: parseInt(item.Eligible)   || 0, dayName: item.DayName || "" }));
  const rateForChart      = attendanceFromApi.map((a, i) => {
    const el = eligibleFromApi[i]?.v || 0;
    return { v: el ? Math.max(0, Math.min(100, Math.round((a.v / el) * 100))) : 0, dayName: a.dayName };
  });

  const attendanceData = cachedAllAttendance || allAttendance || [];

  const handleAttendanceCardClick = (type) => {
    if (type === "CDPLC") {
      setActiveTab(0);
      requestAnimationFrame(() => {
        cdplcChartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    if (type === "Trainee") {
      setActiveTab(0);
      requestAnimationFrame(() => {
        traineeTypeChartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
        backgroundColor: "#f8faff",
        padding: { xs: "20px 14px", sm: "28px 20px", md: "36px 28px" },
        backgroundImage: "radial-gradient(rgba(0,74,173,0.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexShrink: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 8px rgba(0,74,173,0.12)",
              borderRadius: "12px",
              padding: "10px",
              "&:hover": { backgroundColor: "#f5f5f5", transform: "scale(1.05)" },
              transition: "all 0.2s ease",
            }}
          >
            <MenuIcon sx={{ color: "#004AAD" }} />
          </IconButton>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #004AAD 0%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            {activeTab === 0 ? "HR Dashboard"
              : activeTab === 1 ? "Financial Dashboard"
              : activeTab === 4 ? "Company Overview"
              : activeTab === 5 ? "Own Overview"
              : "Dashboard"}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "#64748b",
            backgroundColor: "#ffffff",
            padding: "6px 12px",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            display: { xs: "none", sm: "block" },
          }}
        >
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </Typography>
      </Box>

      <NavigationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ── Scrollable content ── */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          pr: { xs: 0, sm: 1 },
          "&::-webkit-scrollbar": { width: "0px" },
        }}
      >
        {/* ── HR Dashboard ── */}
        {activeTab === 0 && (
          <Fade in timeout={600}>
            <Box>

              {/* ── Attendance KPI Cards ── */}
              <EmployeeTypeKpiGrid
                allAttendance={attendanceData}
                loading={loadingStates.allAttendance}
                onCardClick={handleAttendanceCardClick}
              />

              {/* ── Weekly Attendance ── */}
              <Box sx={{ mb: "24px" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "16px" }}>
                  <Box>
                    {loadingStates.weeklyAttendance ? (
                      <ChartSkeleton height={300} />
                    ) : (
                      <WeeklyAttendanceTrend
                        eligibleData={eligibleFromApi}
                        attendanceData={attendanceFromApi}
                        rateData={rateForChart}
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              {/* ── CDPLC Breakdown ── */}
              <Box ref={cdplcChartRef} sx={{ mb: "24px" }}>
                {loadingStates.divisionData ? <ChartSkeleton height={300} /> : <CDPLCBreakdown hadDate={today} />}
              </Box>

              {/* ── Division Breakdown ── */}
              <Box sx={{ mb: "24px" }}>
                {loadingStates.divisionData ? (
                  <ChartSkeleton height={400} />
                ) : (
                  transformedDivisionData.length > 0 && (
                    <DivisionBreakdown divisionData={transformedDivisionData} />
                  )
                )}
              </Box>

              {/* ── Employee Type Chart ── */}
              <Box ref={traineeTypeChartRef} sx={{ mb: "24px" }}>
                {loadingStates.traineeTypes ? <ChartSkeleton height={300} /> : <EmployeeTypeChart employeeTypeData={employeeTypeData} />}
              </Box>

              {/* ── Trainees Division Breakdown ── */}
              <Box sx={{ mb: "24px" }}>
                {loadingStates.traineeDivision ? <ChartSkeleton height={400} /> : <TraineesDivisionBreakdown traineeDivisionData={traineeDivision} />}
              </Box>

              <Box sx={{ height: "20px" }} />
            </Box>
          </Fade>
        )}

        {/* ── Financial Dashboard ── */}
        {activeTab === 1 && (
          <Fade in timeout={500}>
            <Box sx={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "white", padding: "40px 36px", borderRadius: "20px", mb: "32px", boxShadow: "0 8px 40px rgba(16,185,129,0.25)" }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: "8px", fontSize: "28px" }}>Financial Dashboard</Typography>
              <Typography sx={{ fontSize: "16px", opacity: 0.85 }}>Financial metrics, budgets, and fiscal performance overview.</Typography>
              <Typography sx={{ mt: "24px", fontSize: "14px", opacity: 0.75, fontStyle: "italic" }}>Financial dashboard content coming soon...</Typography>
            </Box>
          </Fade>
        )}

        {/* ── Company Overview ── */}
        {activeTab === 4 && (
          <Fade in timeout={600}>
            <Box>
              <CompanyDashboard selectedYear="2026" />
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;