import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

// Count Up Hook
export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0);
  const raf = useRef();
  const start = useRef();

  useEffect(() => {
    start.current = undefined;
    const step = (ts) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration]);

  return count;
}

// KPI Card Component
export function KpiCard({
  label,
  target,
  suffix = "",
  icon: Icon,
  sparkData,
  sparkColor,
  trend,
  trendPositive,
  delay,
}) {
  const count = useCountUp(target, 1200 + delay * 200);

  return (
    <Box
      sx={{
        animation: `slideUp 0.5s ease-out ${delay * 0.12}s forwards`,
        opacity: 0,
        "@keyframes slideUp": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "@keyframes slideUp": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          color: "#1a2d4d",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
          },
          group: true,
        }}
      >
        {/* Ambient glow background */}
        <Box
          sx={{
            position: "absolute",
            right: "-32px",
            top: "-32px",
            width: "112px",
            height: "112px",
            borderRadius: "50%",
            filter: "blur(64px)",
            opacity: 0.2,
            backgroundColor: sparkColor,
            pointerEvents: "none",
            transition: "opacity 0.5s duration",
            "&:hover": {
              opacity: 0.4,
            },
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          {/* Header with Icon and Trend */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <Box
              sx={{
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: `${sparkColor}15`,
                color: sparkColor,
              }}
            >
              <Icon size={20} />
            </Box>
            <Box
              sx={{
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: "12px",
                backgroundColor: trendPositive
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(244, 63, 94, 0.1)",
                color: trendPositive ? "#10b981" : "#f43f5e",
              }}
            >
              {trend}
            </Box>
          </Box>

          {/* Value Section */}
          <Box sx={{ marginBottom: "12px" }}>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: 700,
                color: "#1a2d4d",
                letterSpacing: "-0.5px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {count.toLocaleString()}
              {suffix}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#64748b",
                marginTop: "4px",
                fontWeight: 500,
              }}
            >
              {label}
            </Typography>
          </Box>

          {/* Sparkline Chart */}
          <Box sx={{ height: "48px", width: "100%", marginLeft: "-4px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sparkData}
                margin={{ top: 2, right: 4, left: 4, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id={`spark-${label.replace(/\s/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={sparkColor}
                      stopOpacity={0.4}
                    />
                    <stop offset="95%" stopColor={sparkColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={sparkColor}
                  strokeWidth={2}
                  fill={`url(#spark-${label.replace(/\s/g, "")})`}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={1200}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
