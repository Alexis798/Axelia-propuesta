"use client";
import * as React from "react";
import { Box, Typography } from "@mui/material";

type GaugeDialProps = {
  value: number;
  min?: number;
  max?: number;
  size?: number;          // px del SVG
  radius?: number;        // radio del arco
  label?: string;
  animationMs?: number;
  reverseScale?: boolean; // ⬅️ 0 izq → 100 der
};

export const GaugeDial: React.FC<GaugeDialProps> = ({
  value,
  min = 0,
  max = 100,
  size = 420,
  radius = 170,              // un poco menor para que no se corte
  label = "Porcentaje",
  animationMs = 600,
  reverseScale = true,       // ⬅️ invertido por defecto (como pediste)
}) => {
  const v = Math.max(min, Math.min(max, value));
  const range = max - min;

  // Geometría
  const cx = size / 2;
  const cy = size / 2 + 30;            // menos bajo para no cortar el arco
  const startAngle = 180;              // izquierda
  const endAngle = 0;                  // derecha

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const polar = (angleDeg: number, r: number) => {
    const a = toRad(angleDeg);
    return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
  };

  // Ángulo visual del valor
  const t = (v - min) / range;
  const angle = reverseScale
    ? startAngle - t * (startAngle - endAngle)   // 0→izq, 1→der
    : endAngle + t * (startAngle - endAngle);    // 0→der, 1→izq

  // Ticks y labels
  const majorStep = 10;
  const minorStep = 5;
  const tickOuter = radius;
  const tickLenMajor = 18;
  const tickLenMinor = 10;

  const ticks: Array<{ angle: number; length: number; label?: string }> = [];
  for (let i = min; i <= max; i += minorStep) {
    // si la escala es invertida, el valor i va a la posición opuesta
    const frac = (i - min) / range;
    const pos = reverseScale
      ? startAngle - frac * (startAngle - endAngle)
      : endAngle + frac * (startAngle - endAngle);
    const isMajor = i % majorStep === 0;
    ticks.push({
      angle: pos,
      length: isMajor ? tickLenMajor : tickLenMinor,
      label: isMajor ? String(i) : undefined,
    });
  }

  // Aguja base apuntando a la DERECHA (para rotar en CW/CCW según angle)
  const needleThickness = 14;
  const needleInner = 26;
  const needleOuter = radius - 22;
  const needlePoints = [
    `${cx + needleInner},${cy - needleThickness / 2}`,
    `${cx + needleInner},${cy + needleThickness / 2}`,
    `${cx + needleOuter},${cy}`,
    `${cx + needleOuter + 14},${cy}`,
  ].join(" ");

  return (
    <Box sx={{ width: "100%", maxWidth: size, mx: "auto", position: "relative", aspectRatio: "1 / 0.7" }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}: ${v.toFixed(2)}`}>
        {/* arco de fondo (completo sin redondeo en puntas) */}
        <path
          d={describeArc(cx, cy, radius, startAngle, endAngle)}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={14}
          strokeLinecap="butt"    // ⬅️ puntas rectas para que se vea completo
        />

        {/* ticks */}
        {ticks.map((t, idx) => {
          const p1 = polar(t.angle, tickOuter);
          const p2 = polar(t.angle, tickOuter - t.length);
          const labelPos = polar(t.angle, tickOuter - t.length - 18);
          return (
            <g key={idx}>
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="rgba(33,33,33,0.6)"
                strokeWidth={t.label ? 3 : 1.5}
                strokeLinecap="round"
              />
              {t.label && (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fontSize={16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgba(33,33,33,0.8)"
                  style={{ fontFamily: "Inter, system-ui, Arial, sans-serif" }}
                >
                  {t.label}
                </text>
              )}
            </g>
          );
        })}

        {/* aguja: rotamos en sentido horario negativo desde la derecha */}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${-angle}deg)`,
            transition: `transform ${animationMs}ms cubic-bezier(.2,.8,.2,1)`,
          }}
        >
          <polygon points={needlePoints} fill="#3f51b5" opacity={0.9} />
        </g>

        {/* tornillo centro */}
        <circle cx={cx} cy={cy} r={6} fill="#3f51b5" />
      </svg>

      {/* textos: MÁS ABAJO para no tocar la aguja */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "60%",                 // ⬅️ baja los textos
          transform: "translateY(-10%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <Typography variant="h5" sx={{ color: "rgba(33,33,33,0.75)", fontWeight: 500, mb: 0.25 }}>
          {label}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: "rgba(33,33,33,0.85)" }}>
          {v.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

// helpers
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}
