import { Grid, Typography } from "@mui/material"

export const SimpleCard = ({ children, title } : { children: React.ReactNode; title: string }) => {
    return (
        <Grid 
            container 
            direction="row"
            justifyContent="space-between"
            minHeight="25.8rem"
            maxHeight="25.8rem"
            sx={{
                backgroundColor: '#FFF',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                borderTop: '.25rem solid #1a237e',
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                },
            }}
        >
            <Typography variant="h6" mb={2} color="#6c757d" fontWeight={700}>{title}</Typography>
            { children }
        </Grid>
    )
}