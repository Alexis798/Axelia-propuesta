"use client";
import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

type Props = {
  /** Porcentaje actual 0..100 */
  value: number;
  /** Objetivo 0..100 */
  goalPercent: number;
  /** Tendencia trimestral (ej: 3.5 para +3.5%) */
  quarterlyTrend: number;
  /** Texto del estado (chip) */
  statusLabel?: string;
  /** Enfoque clave / recomendación */
  focusHint: string;
  /** Click del botón "Valorar Madurez con IA" */
  onEvaluate?: () => void;

  /** Tamaño del gauge en rem (ancho x alto). Si no se pasa, usa px por defecto */
  gaugeWidthRem?: number;
  gaugeHeightRem?: number;
};

function useRootFontSize(): number {
  const [size, setSize] = React.useState(16);
  React.useEffect(() => {
    const update = () =>
      setSize(parseFloat(getComputedStyle(document.documentElement).fontSize));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export function MaturityAnalysisCard({
  value,
  goalPercent,
  quarterlyTrend,
  statusLabel = "ESTABLECIDO",
  focusHint,
  onEvaluate,
  gaugeWidthRem,
  gaugeHeightRem,
}: Props) {
  const root = useRootFontSize();
  const gaugeW = gaugeWidthRem ? Math.round(gaugeWidthRem * root) : 320;
  const gaugeH = gaugeHeightRem ? Math.round(gaugeHeightRem * root) : 220;

  const trendPositive = quarterlyTrend >= 0;
  const trendColor = trendPositive ? "success.main" : "error.main";

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid rgba(109, 40, 217, 0.25)", // morado sutil
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        bgcolor: "rgba(124,77,255,0.06)", // fondo lila muy suave
        position: "relative",
        overflow: "hidden",
        // franja superior degradada
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background:
            "linear-gradient(90deg, #6f42c1 0%, #7b61ff 50%, #9b59ff 100%)",
        },
      }}
    >
      <CardContent sx={{ pt: 3 }}>
        {/* Botón superior */}
        <Box mb={2} display="flex" justifyContent="flex-start">
          <Button
            onClick={onEvaluate}
            startIcon={<AutoFixHighIcon />}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "999px",
              px: 1.5,
              background:
                "linear-gradient(90deg, #7b61ff 0%, #9b59ff 100%)",
              color: "#fff",
              boxShadow: "0 6px 16px rgba(123,97,255,0.3)",
              "&:hover": {
                filter: "brightness(0.95)",
                background:
                  "linear-gradient(90deg, #7357ff 0%, #a06aff 100%)",
              },
            }}
          >
            Valorar Madurez con IA
          </Button>
        </Box>

        <Grid container spacing={4} alignItems="center">
          {/* Izquierda: Gauge */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle1"
              mb={1}
              sx={{ color: "text.secondary" }}
            >
              Nivel de Madurez
            </Typography>

            <Box position="relative" width={gaugeW} height={gaugeH}>
              <Gauge
                width={gaugeW}
                height={gaugeH}
                value={value}
                startAngle={-110}
                endAngle={110}
                innerRadius="70%"
                outerRadius="100%"
                cornerRadius={12}
                sx={{
                  // color de aguja / arco activo
                  "& .MuiGauge-valueArc": { fill: "#3f51b5" },
                  "& .MuiGauge-referenceArc": { fill: "rgba(63,81,181,0.15)" },
                }}
              />
              {/* Overlay de textos */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "58%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Porcentaje
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "text.primary" }}
                >
                  {value.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Derecha: análisis */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, color: "#3f2b96" }}>
              Análisis de Madurez
            </Typography>

            <Grid container spacing={2} alignItems="center">
              {/* Objetivo */}
              <Grid item xs={7}>
                <Typography variant="body2" color="text.secondary">
                  Nivel Objetivo:
                </Typography>
              </Grid>
              <Grid item xs={5} textAlign="right">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: 700,
                    color: "success.dark",
                  }}
                >
                  <Typography component="span">{goalPercent}%</Typography>
                  <TrackChangesIcon fontSize="small" />
                </Box>
              </Grid>

              {/* Tendencia */}
              <Grid item xs={7}>
                <Typography variant="body2" color="text.secondary">
                  Tendencia Trimestral:
                </Typography>
              </Grid>
              <Grid item xs={5} textAlign="right">
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    fontWeight: 700,
                    color: trendColor,
                  }}
                >
                  {trendPositive ? (
                    <ArrowUpwardIcon fontSize="small" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                  <Typography component="span">
                    {trendPositive ? "+" : ""}
                    {quarterlyTrend.toFixed(1)}%
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Estado */}
            <Box mt={2} mb={2}>
              <Chip
                label={statusLabel}
                color="info"
                sx={{
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: 0.2,
                  borderRadius: "999px",
                }}
              />
            </Box>

            {/* Enfoque clave */}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                bgcolor: "#ffffff",
                borderRadius: 1.5,
                px: 1.25,
                py: 1,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <FmdGoodIcon
                fontSize="small"
                sx={{ color: "#6f42c1", mt: "2px" }}
              />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong style={{ color: "#3f2b96" }}>Enfoque Clave:</strong>{" "}
                {focusHint}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
