import { HeaderComponent } from "@/components/headerComponent";
import { TitleCards } from "@/components/cards/TitleCards";
import { ListAltRounded, LockOpenOutlined, Shield } from "@mui/icons-material";
import { KpiCards } from "@/components/cards/KPICards";
import { Grid } from "@mui/material";
import { SimpleCard } from "@/components/cards/SimpleCards";
import { DonutChartCard } from "@/components/charts/DonutChartCard";
import { BarChartCard } from "@/components/charts/BarChartCard";
import { HeatmapMatrixCard } from "@/components/charts/HeatmapChartCard";
import { HorizontalBarChartCard } from "@/components/charts/HorizontalBarChartCard";

export default function Home() {

  const KPIData = [
    { title: "Controles Activos", number: "0%", icon: Shield, colorMetric: "#0d6efd" },
    { title: "Tareas Pendientes", number: "204", icon: ListAltRounded, colorMetric: "#ffc107", chipText: "147 vencidas", colorChip: "error" },
    { title: "Tareas Pendientes", number: "91.67%", icon: LockOpenOutlined, colorMetric: "#198754", chipText: "22/24 activos", colorChip: "primary" },
  ]

  return (
    <div>
      <main>
        <HeaderComponent />
        <Grid container direction="column" px={{ xs: 0, lg: "12.5rem" }} pl={{ xs: '6rem'  }} pr={{ xs: '2rem' }} mt="2rem">
          <TitleCards icon={ Shield } text="Dashboard" />
          
          <Grid container direction="row" justifyContent="left" spacing={2}>
            {KPIData.map(( item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ index }>
                <KpiCards title={ item.title } number={ item.number } icon={ item.icon } colorMetric={ item.colorMetric } chipText={ item.chipText } colorChip={ item.colorChip } />
              </Grid>
            ))}
          </Grid>

          {/* Fila 0 */}
          <Grid container direction="row" justifyContent="space-between" spacing={2} mt="1rem" mb="1rem">
            <Grid size={{ xs: 12 }}>
              <SimpleCard title="Controles">
                <DonutChartCard
                  data={[
                    { label: "Adoptado", value: 100, color: "#66bb6a" },
                    { label: "No Adoptado", value: 0, color: "#ef5350" },
                    { label: "No Evaluado", value: 0, color: "#ffa726" },
                  ]}
                />
              </SimpleCard>
            </Grid>
          </Grid>

          {/* Fila 1 */}
          <Grid container direction="row" justifyContent="space-between" spacing={2} mt="1rem" mb="1rem">
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Controles">
                <DonutChartCard
                  data={[
                    { label: "Adoptado", value: 100, color: "#66bb6a" },
                    { label: "No Adoptado", value: 0, color: "#ef5350" },
                    { label: "No Evaluado", value: 0, color: "#ffa726" },
                  ]}
                />
              </SimpleCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Madurez por Capítulos">
                <DonutChartCard
                  data={[
                    { label: "Organizacionales", value: 40, color: "#42a5f5" },
                    { label: "Controles de Personas", value: 40, color: "#66bb6a" },
                    { label: "Controles Físicos", value: 50, color: "#ffca28" },
                    { label: "Controles Tecnológicos", value: 50, color: "#ef5350" },
                  ]}
                />
              </SimpleCard>
            </Grid>
          </Grid>

          {/* Fila 2 */}
          <Grid container direction="row" justifyContent="space-between" spacing={2} mt="1rem" mb="1rem">
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Identificación de Riesgos">
                <BarChartCard
                  categories={["Físico", "Información", "Personal", "Red", "Software"]}
                  series={[{ data: [180, 600, 70, 10, 420], color: "#3f51b5" }]}
                />
              </SimpleCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Plan de Mitigación">
                <BarChartCard
                  categories={["Review", "To do"]}
                  series={[{ data: [350, 700], color: "#3f51b5" }]}
                />
              </SimpleCard>
            </Grid>
          </Grid>

          {/* Fila 3 */}
          <Grid container direction="row" justifyContent="space-between" spacing={2} mt="1rem" mb="1rem">
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Evaluación Riesgos Inicial">
                <HeatmapMatrixCard
                  xLabels={["1", "2", "3"]}     // Prob
                  yLabels={["1", "2", "3"]}     // Imp (de abajo a arriba)
                  matrix={[
                    [1, 7, 1],      // y=1
                    [56, 412, 73],  // y=2
                    [31, 735, 15],  // y=3
                  ]}
                  colorScale={["#2e7d32", "#ffee58", "#d32f2f"]}
                />
              </SimpleCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Evaluación Riesgos Residuales">
                <HeatmapMatrixCard
                  xLabels={["1", "2", "3"]}
                  yLabels={["1", "2", "3"]}
                  matrix={[
                    [555, 50, 0],   // y=1
                    [491, 9, 1],    // y=2
                    [0, 0, 0],      // y=3
                  ]}
                  colorScale={["#2e7d32", "#ffee58", "#d32f2f"]}
                />
              </SimpleCard>
            </Grid>
          </Grid>

          {/* Fila 4 */}
          <Grid container direction="row" justifyContent="space-between" spacing={2} mt="1rem" mb="1rem">
            <Grid size={{ xs: 12, md: 8}}>
              <SimpleCard title="Evaluación Riesgos Inicial">
                <HeatmapMatrixCard
                  xLabels={["1", "2", "3"]}     // Prob
                  yLabels={["1", "2", "3"]}     // Imp (de abajo a arriba)
                  matrix={[
                    [1, 7, 1],      // y=1
                    [56, 412, 73],  // y=2
                    [31, 735, 15],  // y=3
                  ]}
                  colorScale={["#2e7d32", "#ffee58", "#d32f2f"]}
                />
              </SimpleCard>
            </Grid>
            <Grid size={{ xs: 12, md: 4}}>
              <SimpleCard title="Evaluación Riesgos Residuales">
                <HeatmapMatrixCard
                  xLabels={["1", "2", "3"]}
                  yLabels={["1", "2", "3"]}
                  matrix={[
                    [555, 50, 0],   // y=1
                    [491, 9, 1],    // y=2
                    [0, 0, 0],      // y=3
                  ]}
                  colorScale={["#2e7d32", "#ffee58", "#d32f2f"]}
                />
              </SimpleCard>
            </Grid>
          </Grid>

          {/* Fila 5 */}
          <Grid container direction="row" justifyContent="space-between" spacing={2} mt="1rem" mb="1rem">
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Distribución por tipo de tarea">
                <HorizontalBarChartCard
                  categories={["riesgos", "default", "Controles", "Activos"]}
                  values={[152, 48, 4, 1]}
                  color="#3f51b5"
                  widthRem={28}
                  heightRem={16}
                />
              </SimpleCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6}}>
              <SimpleCard title="Tareas por Estado">
                <DonutChartCard
                  data={[
                    { label: "Review", value: 56,  color: "#3f51b5" }, // azul
                    { label: "To do",  value: 148, color: "#66bb6a" }, // verde
                    { label: "Done",   value: 2,   color: "#fbc02d" }, // amarillo
                  ]}
                  widthRem={22}
                  heightRem={16}
                  innerRadiusRem={5}
                  outerRadiusRem={8}
                  showLegend
                />
              </SimpleCard>
            </Grid>
          </Grid>

        </Grid>
      </main>
    </div>
  );
}
