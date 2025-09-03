import { HomeOutlined, NotificationsOutlined } from "@mui/icons-material"
import { Avatar, Breadcrumbs, Grid, Typography } from "@mui/material"
import Link from "next/link"

export const HeaderComponent = () => {
    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: '#FFF' }} px="30px" height="6.25rem">
            <Grid size={10}>
                <Grid container justifyContent="center" alignItems="center" height="2.5rem" sx={{ backgroundColor: "rgba(248,249,250,0.9)", borderRadius: '.5rem' }}>
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator="/"
                        sx={{ color: "primary.main", fontSize: "0.95rem" }}
                        >
                        {/* Primer nivel con ícono */}
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <HomeOutlined sx={{ mr: 0.5, fontSize: "1rem", verticalAlign: 'middle' }} />
                            Organizaciones
                        </Link>

                        {/* Segundo nivel */}
                        <Link underline="hover" color="inherit" href="/organizaciones/axelia">
                            Axelia
                        </Link>

                        {/* Último nivel (texto plano) */}
                        <Typography color="text.primary">Dashboard</Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
            <Grid size={2}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid size={6}>
                        <Grid container justifyContent="center">
                            <NotificationsOutlined sx={{ color: '#000' }} />
                        </Grid>
                    </Grid>
                    <Grid size={6}>
                        <Grid container direction="row">
                            <Grid size={6}>
                                <Avatar sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'green' }}>AN</Avatar>
                            </Grid>
                            <Grid size={6}>
                                <Typography color="#000" fontWeight="900" textAlign="left">Andres</Typography>
                                <Typography color="#000" fontWeight="300" textAlign="left">Andres</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}