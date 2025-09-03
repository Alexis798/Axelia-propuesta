"use client";
import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export type DonutDatum = { label: string; value: number; color?: string };

type DonutChartCardProps = {
  data: DonutDatum[];
  // Tamaños en px (fallback)
  width?: number;
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  // Tamaños en rem (si se pasan, tienen prioridad)
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

export function DonutChartCard({
  data,
  // ⬇️ Defaults alineados con BarChartCard
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

  // ⬇️ Misma prioridad: rem > px > default
  const w = widthRem !== undefined ? Math.round(widthRem * root) : (width ?? 320);
  const h = heightRem !== undefined ? Math.round(heightRem * root) : (height ?? 250);
  const ir = innerRadiusRem !== undefined ? Math.round(innerRadiusRem * root) : innerRadius;
  const or = outerRadiusRem !== undefined ? Math.round(outerRadiusRem * root) : outerRadius;

  return (
    <PieChart
      series={[
        {
          innerRadius: ir,
          outerRadius: or,
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
      width={w}
      height={h}
      // Deja espacio para la leyenda abajo (no empuja a la derecha)
      margin={{ top: 8, right: 8, bottom: showLegend ? 56 : 8, left: 8 }}
      // Sin 'direction' ni 'hidden' para evitar TS2322
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
  );
}
