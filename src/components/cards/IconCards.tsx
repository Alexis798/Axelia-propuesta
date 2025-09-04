import { IIconCards } from "@/types/components/Cards";
import { WatchLaterRounded } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";

export const IconCard = ({
  children,
  title,
  icon: Icon
}: IIconCards ) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="stretch"
      minHeight="25.8rem"
      maxHeight="25.8rem"
      sx={{
        backgroundColor: "#FFF",
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
        <Typography variant="h6" mb={2} color="#1a237e" fontWeight={700}>
          <Icon sx={{ verticalAlign: 'middle', marginInlineEnd: '0.5rem' }}/>
          {title}
        </Typography>
      </Grid>

      {/* Área de contenido: ocupa el resto, centro seguro */}
        <Grid
            size={12}
            sx={{
                flexGrow: 1,
                minHeight: 0,                 
                maxHeight: "20.8rem",
                overflowY: "auto",            // <— scroll vertical
                overflowX: "hidden",          // evita scroll horizontal
                scrollbarGutter: "stable",    // reserva espacio del scrollbar (Chrome/Edge/FF)
                pr: 1,                        // pequeño padding para que no tape el scrollbar
            }}
        >
            {children}
        </Grid>
    </Grid>
  );
};
