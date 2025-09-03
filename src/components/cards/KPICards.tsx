import { IKpiCards } from "@/types/components/Cards"
import { Box, Chip, ChipProps, Grid, Typography } from "@mui/material"

export const KpiCards = ({ title, number, icon: Icon, colorMetric, colorChip, chipText }: IKpiCards) => {
    return (
        <Grid 
            container 
            direction="row"
            justifyContent="space-between"
            minHeight="9.25rem"
            maxHeight="9.25rem"
            sx={{
                backgroundColor: '#FFF',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                borderLeft: '.25rem solid #1a237e',
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            <Grid size={11}>
                <Typography variant="h6" fontSize="0.9rem" color="#6c757d" mb="0.25rem">{ title }</Typography>
                <Typography variant="h2" fontSize="2rem" fontWeight={600} color={ colorMetric } mb="0.5rem">{ number }</Typography>
                { chipText != null && (
                    <Box pt="1rem">
                        <Chip
                            label={ chipText }
                            color={(colorChip ?? undefined) as ChipProps["color"]}
                            sx={{
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                borderRadius: "0.25rem",
                                py: "0.31rem",
                                px: "0.47rem",
                                height: "auto",
                            }}
                        />
                    </Box>
                )}
            </Grid>
            <Grid size={1}>
                <Icon sx={{ verticalAlign: 'middle', fontSize: '2rem', color: colorMetric }} />
            </Grid>
        </Grid>
    )
}