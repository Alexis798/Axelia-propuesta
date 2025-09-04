import { CalendarMonthRounded } from "@mui/icons-material"
import { Chip, Grid, Typography } from "@mui/material"

export const ListCards = () => {
    return (
        <Grid container direction="row" alignItems="top" justifyContent="space-between" sx={{ backgroundColor: '#f8f9fb', px: '1rem', py: '0.75rem', borderRadius: '0.45rem' }} spacing={2}>
            <Grid size={2}>
                <CalendarMonthRounded color="primary" />
            </Grid>
            <Grid size={6}>
                <Typography fontSize="0.95rem" fontWeight={600} mb="0.25rem" color="#212529">Desarrollar la política del SGSI alineada con los objetivos del negocio y requisitos regulatorios</Typography>
                <Typography fontSize="0.8rem" color="#6c757d">Tipo de Tarea: default</Typography>
            </Grid>
            <Grid size={4}>
                <Typography fontSize="0.8rem" mb="0.25rem" color="#212529" textAlign="right">Vencimiento</Typography>
                <Chip color="warning" label="September 06, 2025 00:00:00 +0000" />
            </Grid>
        </Grid>
    )
}