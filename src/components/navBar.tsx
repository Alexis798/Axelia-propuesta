"use client";
import { AccountBalanceRounded, ErrorOutlineRounded, HomeRounded, ListAltRounded, SecurityRounded, SettingsRounded, StorageRounded } from "@mui/icons-material";
import { NavItem, VerticalAppBar } from "./NavBar/VerticalAppBar"

export const NavBar = () => {

    const items: NavItem[] = [
        { id: "home", label: "Inicio", icon: HomeRounded, href: "/" },
        { id: "db", label: "Datos", icon: StorageRounded, href: "/datos" },
        { id: "alerts", label: "Alertas", icon: ErrorOutlineRounded, href: "/alertas" },
        { id: "security", label: "Seguridad", icon: SecurityRounded, href: "/seguridad" },
        { id: "bank", label: "Banca", icon: AccountBalanceRounded, href: "/banca" },
        { id: "tasks", label: "Tareas", icon: ListAltRounded, href: "/tareas" },
        { id: "settings", label: "Ajustes", icon: SettingsRounded, href: "/ajustes" },
    ];

    return (
        <VerticalAppBar
            items={items}
            selectedId="home"
            onToggleMenu={() => console.log("toggle")}
        />
    )
}