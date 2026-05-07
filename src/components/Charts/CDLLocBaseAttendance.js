import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Business,
  CheckCircle,
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Cancel,
  LocationOn,
  People,
  Visibility,
} from "@mui/icons-material";

const isPresent = (emp) => emp.inn && emp.inn !== "NR" && emp.inn !== "";

const normalizeRow = (item) => ({
  loc: (item?.Location || item?.location || "").trim() || "Unknown",
  sno: item?.Sno || item?.sno || "",
  repname: item?.Name || item?.name || "",
  des: item?.Desc || item?.des || "",
  inn: item?.CIN || item?.inn || "",
  pout: item?.COUT || item?.pout || "",
  cno: item?.CNO || item?.cno || "",
});

const MobileLocationPanel = React.memo(
  ({ location, employees, isExpanded, onToggle, onViewAll }) => {
    const strength = employees.length;
    const present = employees.filter(isPresent).length;
    const absent = strength - present;
    const rate = strength > 0 ? Math.round((present / strength) * 100) : 0;
    const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";

    return (
      <Box sx={{ mb: 1.5 }}>
        <Box
          onClick={() => onToggle(location)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 2,
            py: 1.5,
            bgcolor: isExpanded ? "#004AAD" : "#fff",
            border: "1.5px solid",
            borderColor: isExpanded ? "#004AAD" : "#e2e8f0",
            borderRadius: isExpanded ? "14px 14px 0 0" : "14px",
            cursor: "pointer",
            transition: "all 0.25s ease",
            userSelect: "none",
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: isExpanded ? "rgba(255,255,255,0.2)" : "#e8f0fe",
              flexShrink: 0,
            }}
          >
            <LocationOn sx={{ fontSize: 18, color: isExpanded ? "#fff" : "#004AAD" }} />
          </Avatar>

          <Typography
            sx={{
              flex: 1,
              fontWeight: 700,
              fontSize: "0.88rem",
              color: isExpanded ? "#fff" : "#1e293b",
              lineHeight: 1.3,
            }}
          >
            {location}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
            <Chip
              icon={
                <People
                  sx={{
                    fontSize: "13px !important",
                    color: isExpanded ? "#fff !important" : "#004AAD !important",
                  }}
                />
              }
              label={strength}
              size="small"
              sx={{
                height: 24,
                fontSize: "0.72rem",
                fontWeight: 700,
                bgcolor: isExpanded ? "rgba(255,255,255,0.18)" : "#e8f0fe",
                color: isExpanded ? "#fff" : "#004AAD",
                "& .MuiChip-icon": { ml: "4px" },
              }}
            />
            <Chip
              label={`${rate}%`}
              size="small"
              sx={{
                height: 24,
                fontSize: "0.72rem",
                fontWeight: 700,
                bgcolor: isExpanded ? "rgba(255,255,255,0.18)" : `${rateColor}18`,
                color: isExpanded ? "#fff" : rateColor,
              }}
            />
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              transition: "transform 0.25s ease",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              color: isExpanded ? "#fff" : "#94a3b8",
            }}
          >
            <KeyboardArrowDown />
          </Box>
        </Box>

        <Collapse in={isExpanded} timeout={250} unmountOnExit>
          <Box
            sx={{
              border: "1.5px solid #004AAD",
              borderTop: "none",
              borderRadius: "0 0 14px 14px",
              overflow: "hidden",
              bgcolor: "#f8faff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderBottom: "1px solid #e2e8f0",
                bgcolor: "#fff",
              }}
            >
              {[
                { label: "Strength", value: strength, color: "#004AAD", bg: "#e8f0fe" },
                { label: "Present", value: present, color: "#16a34a", bg: "#dcfce7" },
                { label: "Absent", value: absent, color: "#dc2626", bg: "#fee2e2" },
              ].map((s) => (
                <Box
                  key={s.label}
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    py: 1.5,
                    borderRight: "1px solid #f1f5f9",
                    "&:last-child": { borderRight: "none" },
                  }}
                >
                  <Typography sx={{ fontSize: "0.65rem", color: "#64748b", mb: 0.3 }}>
                    {s.label}
                  </Typography>
                  <Typography sx={{ fontSize: "1.05rem", fontWeight: 800, color: s.color }}>
                    {s.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr",
                  gap: 0.5,
                  px: 1,
                  py: 0.75,
                  bgcolor: "#e8f0fe",
                  borderRadius: "8px",
                  mb: 0.5,
                }}
              >
                {["Svc No", "Name", "Designation", "IN"].map((h) => (
                  <Typography key={h} sx={{ fontSize: "0.62rem", fontWeight: 700, color: "#004AAD" }}>
                    {h}
                  </Typography>
                ))}
              </Box>

              {employees.map((emp, idx) => {
                const present = isPresent(emp);
                return (
                  <Box
                    key={emp.sno || idx}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1.4fr 1.4fr 0.5fr",
                      gap: 0.5,
                      px: 1,
                      py: 0.9,
                      bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
                      borderRadius: "6px",
                      mb: 0.25,
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.68rem", color: "#475569" }}>
                      {emp.sno || "-"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#1e293b",
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                      }}
                    >
                      {emp.repname || "-"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        color: "#1e293b",
                        lineHeight: 1.2,
                        wordBreak: "break-word",
                      }}
                    >
                      {emp.des || "-"}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: present ? 700 : 400,
                        color: present ? "#16a34a" : "#f30a0a",
                      }}
                    >
                      {present ? emp.inn : "NR"}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ px: 2, py: 1.5 }}>
              <Button
                fullWidth
                variant="contained"
                size="small"
                startIcon={<Visibility />}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewAll({ location, employees, strength, present, absent, rate });
                }}
                sx={{
                  bgcolor: "#004AAD",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  py: 1,
                  "&:hover": { bgcolor: "#002d7a" },
                }}
              >
                Full Details
              </Button>
            </Box>
          </Box>
        </Collapse>
      </Box>
    );
  }
);

const DetailDrawer = ({ open, onClose, data }) => {
  if (!data) return null;
  const { location, employees, strength, present, absent, rate } = data;
  const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      disableSwipeToOpen
      sx={{
        "& .MuiDrawer-paper": {
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ pt: 1.5, pb: 0.5, display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: "#cbd5e1" }} />
      </Box>

      <Box
        sx={{
          px: 2.5,
          py: 2,
          bgcolor: "#004AAD",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
            {location}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", mt: 0.3 }}>
            {strength} employees
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#fff" }}>
          <Close />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexShrink: 0, borderBottom: "1px solid #f1f5f9" }}>
        {[
          { label: "Total", value: strength, color: "#004AAD" },
          { label: "Present", value: present, color: "#16a34a" },
          { label: "Absent", value: absent, color: "#dc2626" },
          { label: "Rate", value: `${rate}%`, color: rateColor },
        ].map((s) => (
          <Box
            key={s.label}
            sx={{
              flex: 1,
              textAlign: "center",
              py: 1.5,
              borderRight: "1px solid #f1f5f9",
              "&:last-child": { borderRight: "none" },
            }}
          >
            <Typography sx={{ fontSize: "0.63rem", color: "#64748b" }}>{s.label}</Typography>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: 800, color: s.color }}>
              {s.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ overflowY: "auto", flex: 1, px: 2, py: 1.5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr",
            gap: 0.5,
            px: 1,
            py: 0.8,
            bgcolor: "#e8f0fe",
            borderRadius: "8px",
            mb: 1,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          {["Svc No", "Name", "Designation", "IN Time", "Status"].map((h) => (
            <Typography key={h} sx={{ fontSize: "0.6rem", fontWeight: 700, color: "#004AAD" }}>
              {h}
            </Typography>
          ))}
        </Box>

        {employees.map((emp, idx) => {
          const present = isPresent(emp);
          return (
            <Box
              key={emp.sno || idx}
              sx={{
                display: "grid",
                gridTemplateColumns: "0.8fr 1.4fr 1fr 0.8fr 0.6fr",
                gap: 0.5,
                px: 1,
                py: 1,
                bgcolor: idx % 2 === 0 ? "#fff" : "#f8faff",
                borderRadius: "8px",
                mb: 0.5,
                alignItems: "center",
                border: "1px solid #f1f5f9",
              }}
            >
              <Typography sx={{ fontSize: "0.65rem", color: "#475569" }}>
                {emp.sno || "-"}
              </Typography>
              <Box>
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.2 }}>
                  {emp.repname || "-"}
                </Typography>
                <Typography sx={{ fontSize: "0.6rem", color: "#94a3b8" }}>
                  {emp.cno ? `Clk: ${emp.cno}` : ""}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "0.62rem", color: "#64748b", lineHeight: 1.2 }}>
                {emp.des || "-"}
              </Typography>
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: present ? 700 : 400,
                    color: present ? "#16a34a" : "#94a3b8",
                  }}
                >
                  {present ? emp.inn : "NR"}
                </Typography>
                {emp.pout && (
                  <Typography sx={{ fontSize: "0.58rem", color: "#94a3b8" }}>
                    OUT: {emp.pout}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {present ? (
                  <CheckCircle sx={{ fontSize: 16, color: "#16a34a" }} />
                ) : (
                  <Cancel sx={{ fontSize: 16, color: "#dc2626" }} />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </SwipeableDrawer>
  );
};

const DesktopTableView = ({ locationGroups, expandedRow, onExpand, onViewDetails }) => (
  <TableContainer>
    <Table>
      <TableHead sx={{ bgcolor: "#004AAD" }}>
        <TableRow>
          <TableCell sx={{ color: "white", fontWeight: "bold", width: "35%" }}>Location</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
            Strength
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
            Present
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
            Attendance
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }} align="center">
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(locationGroups).map(([location, employees]) => {
          const strength = employees.length;
          const present = employees.filter(isPresent).length;
          const absent = strength - present;
          const rate = strength > 0 ? Math.round((present / strength) * 100) : 0;
          const rateColor = rate >= 80 ? "#16a34a" : rate >= 60 ? "#d97706" : "#dc2626";
          const expanded = expandedRow === location;

          return (
            <React.Fragment key={location}>
              <TableRow hover sx={{ "&:hover": { bgcolor: "rgba(0,74,173,0.04)" } }}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Business sx={{ color: "#004AAD" }} />
                    <Typography fontWeight={500}>{location}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={strength}
                    size="small"
                    sx={{ bgcolor: "#e8f0fe", color: "#004AAD", fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={present}
                    size="small"
                    sx={{ bgcolor: "#dcfce7", color: "#16a34a", fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${rate}%`}
                    size="small"
                    sx={{ bgcolor: `${rateColor}18`, color: rateColor, fontWeight: "bold" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => onExpand(location)} sx={{ color: "#004AAD" }}>
                    {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => onViewDetails({ location, employees, strength, present, absent, rate })}
                    sx={{ ml: 1, borderColor: "#004AAD", color: "#004AAD", textTransform: "none" }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} sx={{ py: 0 }}>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ m: 2, bgcolor: "#f8faff", borderRadius: "12px", p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 2, fontWeight: "bold", color: "#004AAD" }}
                      >
                        Employee List - {location}
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#e8f0fe" }}>
                            {[
                              "Service No",
                              "Name",
                              "Designation",
                              "Clock No",
                              "IN Time",
                              "Prev. OUT",
                              "Status",
                            ].map((h) => (
                              <TableCell key={h}>
                                <b>{h}</b>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employees.map((emp, idx) => {
                            const present = isPresent(emp);
                            return (
                              <TableRow key={emp.sno || idx}>
                                <TableCell>{emp.sno || "-"}</TableCell>
                                <TableCell>{emp.repname || "-"}</TableCell>
                                <TableCell>{emp.des || "-"}</TableCell>
                                <TableCell>{emp.cno || "-"}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={present ? emp.inn : "NR"}
                                    size="small"
                                    sx={{
                                      bgcolor: present ? "#dcfce7" : "#fee2e2",
                                      color: present ? "#16a34a" : "#dc2626",
                                      fontSize: "0.7rem",
                                    }}
                                  />
                                </TableCell>
                                <TableCell>{emp.pout || "-"}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={present ? "Present" : "Absent"}
                                    size="small"
                                    icon={
                                      present ? (
                                        <CheckCircle sx={{ fontSize: "12px !important" }} />
                                      ) : (
                                        <Cancel sx={{ fontSize: "12px !important" }} />
                                      )
                                    }
                                    sx={{
                                      bgcolor: present ? "#dcfce7" : "#fee2e2",
                                      color: present ? "#16a34a" : "#dc2626",
                                      fontSize: "0.7rem",
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

const DGESatt = ({ data = [], loading = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [expandedRow, setExpandedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const scrollRef = useRef(null);
  const handleToggle = useCallback((location) => {
    setExpandedRow((prev) => (prev === location ? null : location));
  }, []);

  const handleViewDetails = useCallback((locationData) => {
    setSelectedLocation(locationData);
    setDrawerOpen(true);
  }, []);


  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <Typography>Loading CDPLC location attendance...</Typography>
        </Box>
      </Paper>
    );
  }

  const locationGroups = {};
  data.forEach((item) => {
    const loc = item.loc?.trim() || "Unknown";
    if (!locationGroups[loc]) locationGroups[loc] = [];
    locationGroups[loc].push(item);
  });

  const totalLocations = Object.keys(locationGroups).length;
  const totalEmployees = data.length;
  const totalPresent = data.filter(isPresent).length;

  return (
    <>
      <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,74,173,0.06)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 0.5, fontWeight: 700, color: "#004AAD", fontSize: { xs: "1rem", sm: "1.2rem" } }}
            >
              CDPLC Employee Strength - Location
            </Typography>
            <Typography sx={{ color: "#64748b", fontSize: "0.8rem" }}>
              {totalLocations} locations, {totalEmployees} employees, {totalPresent} present
            </Typography>
          </Box>
        </Box>

        {isMobile ? (
          <Box
            ref={scrollRef}
            sx={{
              maxHeight: "calc(100vh - 180px)",
              overflowY: "auto",
              overflowX: "hidden",
              pr: 0.5,
              "&::-webkit-scrollbar": { width: 4 },
              "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
              "&::-webkit-scrollbar-thumb": { bgcolor: "#cbd5e1", borderRadius: 4 },
            }}
          >
            {Object.entries(locationGroups).map(([location, employees]) => (
              <MobileLocationPanel
                key={location}
                location={location}
                employees={employees}
                isExpanded={expandedRow === location}
                onToggle={handleToggle}
                onViewAll={handleViewDetails}
              />
            ))}

            <Box sx={{ height: 80 }} />
          </Box>
        ) : (
          <DesktopTableView
            locationGroups={locationGroups}
            expandedRow={expandedRow}
            onExpand={handleToggle}
            onViewDetails={handleViewDetails}
          />
        )}
      </Paper>

      <DetailDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setTimeout(() => setSelectedLocation(null), 300);
        }}
        data={selectedLocation}
      />
    </>
  );
};

export const CDLLocBaseAttendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("Attendancedashboard/GetCdllocbaseAttendance");
        const resultSet = response?.data?.ResultSet || [];
        const normalized = resultSet.map(normalizeRow);
        if (active) setData(normalized);
      } catch (err) {
        if (active) setError("Failed to load CDPLC location attendance.");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <Paper sx={{ p: 3, borderRadius: "20px" }}>
        <Typography sx={{ color: "#dc2626", fontWeight: 600 }}>{error}</Typography>
      </Paper>
    );
  }

  return <DGESatt data={data} loading={loading} />;
};
