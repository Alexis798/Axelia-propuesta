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
        gap: 1.25,
        backgroundColor: '#7e26ec',
        boxShadow: "2px 0 14px rgba(0,0,0,0.25)",
        borderRight: "1px solid rgba(255,255,255,0.15)",
        zIndex: (t) => t.zIndex.appBar,
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
