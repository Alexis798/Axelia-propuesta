import { ArrowUpward, AutoFixHighRounded, LightbulbCircleRounded, TrackChangesRounded } from "@mui/icons-material";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { GaugeDial } from "../charts/GaulDial";

export const MainCard = ({
  children,
  title,
}: { children: React.ReactNode; title: string }) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      minHeight="30rem"
      maxHeight={{ xs: '40rem', md: "30rem" }}
      spacing={2}
      sx={{
        backgroundColor: "#e8eaf6",
        borderRadius: "0.75rem",
        p: "1.5rem",
        borderTop: ".25rem solid #1a237e",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
        transition:
          "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
        },
        boxSizing: "border-box",
      }}
    >
    
      <Grid size={12}>
        <Grid container>
            <Grid size={{ xs: 8, sm: 6, md: 4}}>
                <Button variant="contained" sx={{ backgroundColor: '#6f42c1' }}>
                    <AutoFixHighRounded sx={{ verticalAlign: 'middle', marginInlineEnd: '0.5rem'}} /> Valorar Madurez con IA
                </Button>
            </Grid>
        </Grid>
      </Grid>

      <Grid size={12}>
        <Typography variant="h6" mb={2} color="#6c757d" fontWeight={700}>
          {title}
        </Typography>
      </Grid>

      {/* Área de contenido: ocupa el resto, centro seguro */}
      <Grid
        size={6}
        sx={{
          flexGrow: 1,
          minHeight: 0,                  
          justifyContent: "center",
          overflow: "hidden",            
        }}
      >
        {children}
      </Grid>
      <Grid size={6}>
        <Grid container direction="row" justifyContent="space-between">
            <Grid size={12} mb="1.25rem">
                <Typography variant="h5" fontSize="1.3rem" mb="1.25rem" pb="0.5rem" sx={{ borderBottom: '2px solid #4a148c'}} color="#4a148c">Análisis de Madurez</Typography>
            </Grid>
            <Grid size={6} mb="0.75rem" py="0.5rem">
                <Typography fontSize="1rem" color="#6c757d" fontWeight={500}>Nivel Objetivo:</Typography>
            </Grid>
            <Grid size={6}>
                <Grid container justifyContent="right">
                    <Typography variant="caption" fontSize="1.1rem" color="#1A237E">85%<TrackChangesRounded sx={{ marginInlineStart: '0.5rem', verticalAlign: 'middle', color: '#198754'}} /></Typography>
                </Grid>
            </Grid>
             <Grid size={6} mb="0.75rem" py="0.5rem">
                <Typography fontSize="1rem" color="#6c757d" fontWeight={500}>Tendencia Trimestral:</Typography>
            </Grid>
            <Grid size={6}>
                <Grid container justifyContent="right">
                    <Typography variant="caption" fontSize="1.1rem" color="#1A237E">+3.5%<ArrowUpward sx={{ marginInlineStart: '0.5rem', verticalAlign: 'middle', color: '#198754'}} /></Typography>
                </Grid>
            </Grid>
            <Grid size={12}>
                <Chip color="info" label="ESTABLECIDO" />
            </Grid>
            <Grid size={12}>
                <Grid container mt="1rem" mb="1rem" p="0.75rem" sx={{ backgroundColor: '#ffffff80', borderRadius: '0.7rem'}}>
                    <Typography color="#4a148c" fontSize="0.8rem"><LightbulbCircleRounded sx={{ verticalAlign: 'middle', marginInlineEnd: '0.2rem' }}/><strong>Enfoque Clave:</strong> Fortalecer controles de acceso a datos y programas de concienciación.</Typography>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
