"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

type Props = {
  categories: string[];   // eje Y (band)
  values: number[];       // serie única
  color?: string;
  // Tamaños en px (fallback)
  width?: number;
  height?: number;
  // Tamaños en rem (si se pasan, tienen prioridad)
  widthRem?: number;
  heightRem?: number;
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

export function HorizontalBarChartCard({
  categories,
  values,
  color = "#3f51b5",
  width = 520,
  height = 300,
  widthRem,
  heightRem,
  horizontalGrid = true,
}: Props) {
  const root = useRootFontSize();
  const w = widthRem !== undefined ? Math.round(widthRem * root) : width;
  const h = heightRem !== undefined ? Math.round(heightRem * root) : height;

  return (
    <BarChart
      layout="horizontal"
      yAxis={[{ scaleType: "band", data: categories }]}
      xAxis={[{ min: 0 }]}
      series={[{ data: values, color }]}
      width={w}
      height={h}
      grid={horizontalGrid ? { horizontal: true } : undefined}
    />
  );
}
