"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export type DonutDatum = { label: string; value: number; color?: string };

type DonutChartCardProps = {
  data: DonutDatum[];
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  widthRem?: number;
  heightRem?: number;
  innerRadiusRem?: number;
  outerRadiusRem?: number;
  showLegend?: boolean;
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

function useContainerSize<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  React.useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return { ref, ...size };
}

export function DonutChartCard({
  data,
  width,
  height,
  innerRadius = 70,
  outerRadius = 110,
  widthRem,
  heightRem,
  innerRadiusRem,
  outerRadiusRem,
  showLegend = true,
}: DonutChartCardProps) {
  const root = useRootFontSize();

  // Preferencia rem > px > default
  const desiredW = widthRem !== undefined ? Math.round(widthRem * root) : (width ?? 320);
  const desiredH = heightRem !== undefined ? Math.round(heightRem * root) : (height ?? 300);
  const desiredIR = innerRadiusRem !== undefined ? Math.round(innerRadiusRem * root) : innerRadius;
  const desiredOR = outerRadiusRem !== undefined ? Math.round(outerRadiusRem * root) : outerRadius;

  // Medimos el espacio REAL disponible del wrapper (lo mete SimpleCard)
  const { ref, w: cw, h: ch } = useContainerSize<HTMLDivElement>();

  // Capamos tamaño del chart al contenedor
  const chartW = Math.max(0, Math.min(desiredW, cw || desiredW));
  const chartH = Math.max(0, Math.min(desiredH, ch || desiredH));

  // Márgenes + espacio para legend abajo
  const margin = { top: 8, right: 8, bottom: showLegend ? 56 : 8, left: 8 };
  const availW = Math.max(0, chartW - margin.left - margin.right);
  const availH = Math.max(0, chartH - margin.top - margin.bottom);

  // Diámetro máximo disponible (quedándonos también con el alto útil)
  const diameter = Math.max(0, Math.min(availW, availH));
  // Escalamos radios para que NUNCA pasen el diámetro (ni se corten).
  const originalOR = Math.max(1, desiredOR);
  const ratioIR = Math.min(0.98, Math.max(0.1, desiredIR / originalOR)); // preserva grosor relativo
  const safeOR = Math.floor(Math.min(originalOR, diameter / 2));
  const safeIR = Math.floor(safeOR * ratioIR);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",      // ← aprovecha el alto del slot en la card
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <PieChart
        series={[
          {
            innerRadius: safeIR,
            outerRadius: safeOR,
            paddingAngle: 2,
            cornerRadius: 4,
            data: data.map((d, i) => ({
              id: i,
              value: d.value,
              label: d.label,
              color: d.color,
            })),
          },
        ]}
        width={chartW}
        height={chartH}
        margin={margin}
        slotProps={
          showLegend
            ? {
                legend: {
                  position: { vertical: "bottom", horizontal: "center" } as const,
                },
              }
            : undefined
        }
      />
    </div>
  );
}
