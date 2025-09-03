"use client";

import * as React from "react";
import NextLink from "next/link";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Link as MUILink,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import MenuRounded from "@mui/icons-material/MenuRounded";

export type NavItem = {
  id: string;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap>;
  href?: string;
};

type VerticalAppBarProps = {
  items: NavItem[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onToggleMenu?: () => void;
  widthPx?: number; // ancho del rail (default 64)
};

export function VerticalAppBar({
  items,
  selectedId,
  onSelect,
  onToggleMenu,
  widthPx = 64,
}: VerticalAppBarProps) {
  return (
    <Box
      component="nav"
      sx={{
        position: "fixed",
        inset: 0,
        right: "auto",
        width: `${widthPx}px`,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 1,
        gap: 1.25,
        background:
          "linear-gradient(180deg, #6f42c1 0%, #7b61ff 50%, #6f42c1 100%)",
        boxShadow: "2px 0 14px rgba(0,0,0,0.25)",
        borderRight: "1px solid rgba(255,255,255,0.15)",
        zIndex: (t) => t.zIndex.appBar,
        // franja superior
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
        },
      }}
    >
      {/* Botón menú */}
      <IconButton
        aria-label="Abrir menú"
        onClick={onToggleMenu}
        sx={{
          color: "#fff",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
          mt: 0.5,
        }}
      >
        <MenuRounded />
      </IconButton>

      <Divider
        flexItem
        sx={{ borderColor: "rgba(255,255,255,0.2)", width: "60%" }}
      />

      {/* Items */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1.25,
          width: "100%",
        }}
      >
        {items.map(({ id, label, icon: Icon, href }) => {
          const active = id === selectedId;
          const button = (
            <IconButton
              aria-label={label}
              onClick={href ? undefined : () => onSelect?.(id)}
              sx={{
                color: "#fff",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.14)" },
                ...(active && {
                  backgroundColor: "rgba(255,255,255,0.18)",
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.25)",
                }),
              }}
            >
              <Icon />
            </IconButton>
          );

          return (
            <Tooltip key={id} title={label} placement="right">
              {href ? (
                <MUILink
                  component={NextLink}
                  href={href}
                  underline="none"
                  sx={{ color: "inherit" }}
                >
                  {button}
                </MUILink>
              ) : (
                button
              )}
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
}
