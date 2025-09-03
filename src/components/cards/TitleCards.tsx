import { ITitleCards } from "@/types/components/Cards"
import { Grid, Typography } from "@mui/material"

export const TitleCards = ({ icon: Icon, text }: ITitleCards ) => {
    return (
        <Grid container justifyContent="left" alignItems="center" sx={{ background: "linear-gradient(135deg, #1a237e, #4a148c)", borderRadius: '0.75rem', boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)" }} mb="2rem" height="5.6rem">
            <Grid size={12}>
                <Grid container px="1rem">
                    <Typography fontSize="1.75rem" color="#FFF"><Icon sx={{ verticalAlign: 'middle', marginInlineEnd: '1rem' }} />{ text }</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}