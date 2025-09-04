"use client";
import * as React from "react";
import {
  Box,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
  CardActionArea,
} from "@mui/material";

export type TimelineItem = {
  id: string;
  /** ISO string o cualquier valor aceptado por new Date() */
  datetimeISO: string;
  /** Título principal (ej. "Controles [8.25] actualizado.") */
  title: string;
  /** Texto breve que sigue al título (ej. "Descripción: …") */
  subtitle?: string;
  /** Texto del chip (ej. "Módulo: Controles") */
  tagLabel?: string;
  /** Color del chip: usar color MUI o un HEX */
  tagColor?: "default" | "primary" | "secondary" | "success" | "warning" | "info" | "error" | string;
  /** Deshabilita interacción visual */
  disabled?: boolean;
};

export type TimelineListProps = {
  items: TimelineItem[];
  /** Llamado al hacer click en una tarjeta */
  onItemClick?: (item: TimelineItem) => void;
  /** Color de la línea vertical (HEX o nombre de color CSS) */
  lineColor?: string;
  /** Color de los bullets (si no se quiere igual que la línea) */
  dotColor?: string;
  /** Espaciado vertical entre ítems */
  itemGap?: number;
  /** Máximo de ancho por tarjeta (útil en layouts centrados) */
  maxItemWidth?: number | string;
  /** Formateador opcional de la fecha mostrada */
  formatDate?: (date: Date) => string;
};

const defaultFormatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
  }).format(d);

/**
 * Lista con estilo de timeline (línea vertical + bullets) y tarjetas MUI.
 * 100% reutilizable: controlas items, colores, click, formato de fecha, etc.
 */
export function TimelineList({
  items,
  onItemClick,
  lineColor = "#d32f2f",
  dotColor,
  itemGap = 4,
  maxItemWidth = "100%",
  formatDate = defaultFormatDate,
}: TimelineListProps) {
  const bulletColor = dotColor ?? lineColor;

  return (
    <Box
      position="relative"
      sx={{
        // Línea vertical izquierda
        "&::before": {
          content: '""',
          position: "absolute",
          left: 20, // alineado con bullets
          top: 0,
          bottom: 0,
          width: "4px",
          bgcolor: lineColor,
          borderRadius: "4px",
        },
      }}
    >
      <Stack spacing={itemGap} pt={0.5}>
        {items.map((item, idx) => {
          const date = new Date(item.datetimeISO);

          // soporte de chips: si es string no MUI, aplicamos sx
          const chipIsMuiColor =
            item.tagColor === undefined ||
            [
              "default",
              "primary",
              "secondary",
              "success",
              "warning",
              "info",
              "error",
            ].includes(item.tagColor);

          const cardInner = (
            <Card
              elevation={1}
              sx={{
                borderRadius: "12px",
                backgroundColor: '#f8f9fb'
              }}
            >
              <Grid container>
                <Grid size={12}>
                  <Box p={2.5}>
                    <Typography
                      variant="caption"
                      sx={{ display: "block", color: "text.secondary", mb: 0.5 }}
                    >
                      {formatDate(date)}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, lineHeight: 1.25, mb: 1 }}
                    >
                      {item.title}
                      {item.subtitle ? (
                        <Typography
                          component="span"
                          variant="h6"
                          sx={{ fontWeight: 400 }}
                        >
                          {" "}
                          {item.subtitle}
                        </Typography>
                      ) : null}
                    </Typography>

                    {item.tagLabel ? (
                      chipIsMuiColor ? (
                        <Chip
                          label={item.tagLabel}
                          size="small"
                          color={
                            (item.tagColor as
                              | "default"
                              | "primary"
                              | "secondary"
                              | "success"
                              | "warning"
                              | "info"
                              | "error") ?? "success"
                          }
                          sx={{ fontWeight: 700 }}
                        />
                      ) : (
                        <Chip
                          label={item.tagLabel}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            bgcolor: item.tagColor as string,
                            color: "#fff",
                          }}
                        />
                      )
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
            </Card>
          );

          return (
            <Box key={item.id} position="relative">
              {/* Bullet */}
              <Box
                sx={{
                  position: "absolute",
                  left: 12, // centrado sobre la línea (4px + margen)
                  top: 18,
                  width: 16,
                  height: 16,
                  bgcolor: bulletColor,
                  borderRadius: "50%",
                  boxShadow: "0 0 0 3px #fff",
                }}
              />
              {/* Contenido */}
                <Box ml={5} sx={{ maxWidth: "calc(100% - 40px)" }}>
                    {onItemClick && !item.disabled ? (
                        <CardActionArea onClick={() => onItemClick(item)} sx={{ borderRadius: "12px" }}>
                        {cardInner}
                        </CardActionArea>
                    ) : (
                        cardInner
                    )}
                </Box>

              {/* peq. separador visual entre items y la línea */}
              {idx === items.length - 1 ? (
                <Box height={2} />
              ) : (
                <Box height={0} />
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
