"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export type BarSeries = { label?: string; data: number[]; color?: string };

type Props = {
  categories: string[];
  series: BarSeries[];
  width?: number;       // px
  height?: number;      // px
  widthRem?: number;    // ✅ alternativo en rem
  heightRem?: number;   // ✅ alternativo en rem
  horizontalGrid?: boolean;
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

export function BarChartCard({
  categories,
  series,
  width,
  height,
  widthRem,
  heightRem,
  horizontalGrid = true,
}: Props) {
  const root = useRootFontSize();
  const w = widthRem !== undefined ? Math.round(widthRem * root) : width ?? 320;
  const h = heightRem !== undefined ? Math.round(heightRem * root) : height ?? 300;

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: categories }]}
      series={series.map((s) => ({ data: s.data, label: s.label, color: s.color }))}
      width={w}
      height={h}
      grid={horizontalGrid ? { horizontal: true } : undefined}
    />
  );
}
