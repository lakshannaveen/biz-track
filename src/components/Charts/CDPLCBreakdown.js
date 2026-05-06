import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { GetCDLCategoryAtt } from "../../action/Attendance";
import { CDPLCCustomTooltip } from "./ChartUtils";

const seriesColors = {
  strength: "#f59e0b",
  attendance: "#3b82f6",
};

export function CDPLCBreakdown({
  cdplcData: propCdplcData,
  radialData: propRadialData,
  hadDate,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const {
    cdplcData: reduxCdplcData,
    loading,
    msg,
  } = useSelector((state) => state.attendanceCard);

  // Use Redux data, fallback to props
  const apiData =
    reduxCdplcData && reduxCdplcData.length > 0
      ? reduxCdplcData
      : propCdplcData;

  useEffect(() => {
    // Fetch data with provided date or today's date by default
    const dateToFetch = hadDate || new Date().toISOString().split("T")[0];
    console.log("CDPLCBreakdown: Fetching data for date:", dateToFetch);
    dispatch(GetCDLCategoryAtt(dateToFetch));
  }, [dispatch, hadDate]);

  // Transform API data to component format
  const transformedCdplc = apiData
    ? apiData
        .filter((item) => item.Type && item.Type.toUpperCase() !== "TOTAL")
        .map((item) => {
          const typeName = item.Type.toUpperCase();
          return {
            name: typeName,
            attendance: item.Attendance || 0,
            strength: item.ActualStrength || item.Strength || 0,
            actualPct: item.ActualPercentage,
            eligiblePct: item.EligiblePercentage,
          };
        })
    : [];

  // Get overall percentage from TOTAL entry
  const totalItem = apiData?.find(
    (item) => item.Type && item.Type.toUpperCase() === "TOTAL",
  );
  const overallPercentage = totalItem ? totalItem.ActualPercentage : "N/A";

  // debug: ensure data is present during development
  // eslint-disable-next-line no-console
  console.log("CDPLCBreakdown: loaded data", {
    apiData,
    transformedCdplc,
    overallPercentage,
    loading,
    msg,
    reduxCdplcData,
  });

  // Show loading state
  if (loading && !apiData) {
    return (
      <Box
        sx={{
          animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
          opacity: 0,
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(24px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <Typography sx={{ color: "#64748b" }}>
            Loading chart data...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Show error state
  if (msg && !apiData) {
    return (
      <Box
        sx={{
          animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
          opacity: 0,
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(24px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <Typography sx={{ color: "#ef4444" }}>
            Error loading chart data: {msg}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Show empty state
  if (!apiData || (transformedCdplc && transformedCdplc.length === 0)) {
    return (
      <Box
        sx={{
          animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
          opacity: 0,
          "@keyframes fadeInUp": {
            "0%": { opacity: 0, transform: "translateY(24px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "400px",
          }}
        >
          <Typography sx={{ color: "#64748b" }}>
            No data available for the selected date
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        animation: `fadeInUp 0.5s ease-out 0.2s forwards`,
        opacity: 0,
        "@keyframes fadeInUp": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#1a2d4d",
              }}
            >
              CDPLC Category 
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "4px",
              }}
            >
              Actual attendance %
            </Typography>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#2512ca",
              }}
            >
              {overallPercentage}%
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Overall Actual
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: "288px", width: "100%", marginBottom: "16px" }}>
          <ResponsiveContainer width="100%" height="100%">
            {/* Previous chart (radial) */}
            {/*
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={6}
                background={{
                  fill: "rgba(0, 0, 0, 0.04)",
                }}
                label={false}
              />
              <Tooltip
                content={(props) => (
                  <CDPLCCustomTooltip {...props} cdplcData={transformedCdplc} />
                )}
              />
            </RadialBarChart>
            */}

            {/* Current chart (bar) */}
            <BarChart
              data={transformedCdplc}
              layout="vertical"
              margin={{
                top: 8,
                right: isMobile ? 12 : 24,
                bottom: 8,
                left: isMobile ? 0 : 24,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,0,0,0.08)"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={(value) => Number(value).toLocaleString()}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={isMobile ? 70 : 90}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#475569", fontSize: 11 }}
              />
              <Tooltip
                content={(props) => (
                  <CDPLCCustomTooltip {...props} cdplcData={transformedCdplc} />
                )}
              />
              <Bar
                dataKey="strength"
                name="Actual Strength"
                fill={seriesColors.strength}
                radius={[0, 8, 8, 0]}
                barSize={isMobile ? 14 : 18}
              />
              <Bar
                dataKey="attendance"
                name="Attendance"
                fill={seriesColors.attendance}
                radius={[0, 8, 8, 0]}
                barSize={isMobile ? 14 : 18}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            marginTop: "8px",
          }}
        >
          {[
            { label: "Actual Strength", color: seriesColors.strength },
            { label: "Attendance", color: seriesColors.attendance },
          ].map((item) => (
            <Box
              key={item.label}
              sx={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  backgroundColor: item.color,
                }}
              />
              <Typography sx={{ fontSize: "12px", color: "#64748b" }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Total Heading */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: "#1a2d4d",
            marginTop: "24px",
            marginBottom: "12px",
          }}
        >
          TOTAL
        </Typography>

        {/* Category Cards */}
        <Box
          sx={{
            marginTop: "16px",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "12px",
          }}
        >
          {/* Card 1: Actual Strength */}
          <Box
            sx={{
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                color: "#64748b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Actual Strength
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: seriesColors.strength,
              }}
            >
              {totalItem?.ActualStrength || "N/A"}
            </Typography>
          </Box>

          {/* Card 2: Attendance */}
          <Box
            sx={{
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                color: "#64748b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Attendance
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: seriesColors.attendance,
              }}
            >
              {totalItem?.Attendance || "N/A"}
            </Typography>
          </Box>

          {/* Card 3: Eligible Percentage */}
          <Box
            sx={{
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              padding: "12px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                color: "#64748b",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "8px",
              }}
            >
              Eligible Percentage
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: "#f59e0b",
              }}
            >
              {totalItem?.EligiblePercentage
                ? `${Math.round(totalItem.EligiblePercentage * 100) / 100}%`
                : "N/A"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
