"use client";
import * as React from "react";
import {
  Box,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

type HeatmapMatrixCardProps = {
  xLabels: string[];          // columnas (ej: Prob: 1..3)
  yLabels: string[];          // filas (ej: Imp: 1..3) de abajo hacia arriba
  matrix: number[][];         // [fila][columna] → y, x (misma dimensión que labels)
  min?: number;               // si no lo pasas, se calcula
  max?: number;               // si no lo pasas, se calcula
  colorScale?: readonly string[]; // stops de color (>=2). ej: verde-amarillo-rojo
  cellSizePx?: number;        // tamaño de cada celda (cuadrada)
  valueFormatter?: (v: number) => string;
};

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  const c = (n: number) => n.toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolateHex(c1: string, c2: string, t: number) {
  const A = hexToRgb(c1);
  const B = hexToRgb(c2);
  return rgbToHex({
    r: Math.round(lerp(A.r, B.r, t)),
    g: Math.round(lerp(A.g, B.g, t)),
    b: Math.round(lerp(A.b, B.b, t)),
  });
}

function colorAt(t: number, stops: readonly string[]) {
  if (stops.length === 1) return stops[0];
  const n = stops.length - 1;
  const p = Math.min(Math.max(t, 0), 1) * n;
  const i = Math.min(Math.floor(p), n - 1);
  const localT = p - i;
  return interpolateHex(stops[i], stops[i + 1], localT);
}

export function HeatmapMatrixCard({
  xLabels,
  yLabels,
  matrix,
  min,
  max,
  colorScale = ["#2e7d32", "#ffee58", "#d32f2f"],
  cellSizePx = 44,
  valueFormatter = (v) => String(v),
}: HeatmapMatrixCardProps) {
  const theme = useTheme();

  const computedMin = React.useMemo(
    () =>
      min ??
      Math.min(...matrix.flat().map((v) => (Number.isFinite(v) ? v : 0))),
    [matrix, min]
  );
  const computedMax = React.useMemo(
    () =>
      max ??
      Math.max(...matrix.flat().map((v) => (Number.isFinite(v) ? v : 0))),
    [matrix, max]
  );

  const norm = (v: number) => {
    if (computedMax === computedMin) return 0.5;
    return (v - computedMin) / (computedMax - computedMin);
  };

  const gridCols = `80px repeat(${xLabels.length}, ${cellSizePx}px)`;
  const gap = 6;

  return (
      <>
        {/* Cabecera X + Matriz + Etiquetas Y */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: gridCols,
            alignItems: "center",
            rowGap: `${gap}px`,
            columnGap: `${gap}px`,
            mb: 2,
          }}
        >
          {/* Esquina vacía */}
          <Box />

          {/* Encabezados de columnas (xLabels) */}
          {xLabels.map((xl) => (
            <Typography
              key={`xh-${xl}`}
              variant="body2"
              align="center"
              sx={{ color: theme.palette.text.secondary }}
            >
              {xl}
            </Typography>
          ))}

          {/* Filas: label Y + celdas */}
          {yLabels.map((yl, yIdx) => {
            const rowIndex = yLabels.length - 1 - yIdx; // para mostrar de abajo hacia arriba
            return (
              <React.Fragment key={`row-${yl}`}>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {yl}
                </Typography>
                {xLabels.map((_, x) => {
                  const v = matrix[rowIndex]?.[x] ?? 0;
                  const t = norm(v);
                  const bg = colorAt(t, colorScale);
                  return (
                    <Tooltip
                      key={`cell-${rowIndex}-${x}`}
                      title={
                        <Box>
                          <div>
                            <strong>{`(${yl}, ${xLabels[x]})`}</strong>
                          </div>
                          <div>{valueFormatter(v)}</div>
                        </Box>
                      }
                      arrow
                    >
                      <Box
                        role="figure"
                        aria-label={`${yl} - ${xLabels[x]}: ${valueFormatter(
                          v
                        )}`}
                        sx={{
                          width: `${cellSizePx}px`,
                          height: `${cellSizePx}px`,
                          borderRadius: 1,
                          backgroundColor: bg,
                          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color:
                            t > 0.6
                              ? "rgba(255,255,255,0.9)"
                              : theme.palette.text.primary,
                          fontSize: "0.8rem",
                          userSelect: "none",
                        }}
                      >
                        {v}
                      </Box>
                    </Tooltip>
                  );
                })}
              </React.Fragment>
            );
          })}
        </Box>

        {/* Leyenda */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="caption">
            {valueFormatter(computedMin)}
          </Typography>
          <Box
            sx={{
              flex: 1,
              height: 10,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${colorScale.join(",")})`,
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)",
            }}
          />
          <Typography variant="caption">
            {valueFormatter(computedMax)}
          </Typography>
        </Box>
      </>
  );
}
