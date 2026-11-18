
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    House,
    ShoppingBag,
    Info,
    PanelLeftClose,
    PanelLeftOpen,
    X,
} from "lucide-react";

interface SidebarProps {
    collapsed: boolean;
    mobileOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const navigation = [
    {
        label: "Home",
        href: "/",
        icon: House,
    },
    {
        label: "All Finds",
        href: "/all-finds",
        icon: ShoppingBag,
    },
    {
        label: "About",
        href: "/#about",
        icon: Info,
    },
];

export default function Sidebar({
    collapsed,
    mobileOpen,
    onToggle,
    onClose,
}: SidebarProps) {
    const pathname = usePathname();
    const [activeHash, setActiveHash] = useState("");

    useEffect(() => {
        const updateHash = () => {
            setActiveHash(window.location.hash);
        };

        updateHash();

        window.addEventListener("hashchange", updateHash);

        return () => {
            window.removeEventListener("hashchange", updateHash);
        };
    }, []);

    return (
        <>
            {mobileOpen && (
                <button
                    type="button"
                    className="sidebar-overlay"
                    aria-label="Close navigation"
                    onClick={onClose}
                />
            )}

            <aside
                className={`sidebar ${collapsed ? "sidebar-collapsed" : ""
                    } ${mobileOpen ? "sidebar-mobile-open" : ""}`}
            >
                <div className="sidebar-header">
                    <Link
                        href="/"
                        className="sidebar-brand"
                        aria-label="My Useful Finds home"
                        onClick={onClose}
                    >
                        {collapsed ? (
                            <span className="sidebar-brand-mark">M.</span>
                        ) : (
                            <span>
                                my useful finds<span className="sidebar-brand-dot">.</span>
                            </span>
                        )}
                    </Link>

                    <button
                        type="button"
                        className="sidebar-mobile-close"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-divider" />

                <nav className="sidebar-navigation" aria-label="Main navigation">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        const isActive =
                            item.href === "/"
                                ? pathname === "/" && activeHash !== "#about"
                                : item.href === "/all-finds"
                                    ? pathname.startsWith("/all-finds")
                                    : item.href === "/#about"
                                        ? pathname === "/" && activeHash === "#about"
                                        : false;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`sidebar-link ${isActive ? "sidebar-link-active" : ""
                                    }`}
                                onClick={() => {
                                    setActiveHash(item.href === "/#about" ? "#about" : "");
                                    onClose();
                                }}
                                title={collapsed ? item.label : undefined}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Icon size={19} strokeWidth={1.6} />

                                <span className="sidebar-link-label">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <div className="sidebar-divider" />

                    <button
                        type="button"
                        className="sidebar-toggle"
                        onClick={onToggle}
                        aria-label={
                            collapsed ? "Expand sidebar" : "Collapse sidebar"
                        }
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? (
                            <PanelLeftOpen size={19} strokeWidth={1.6} />
                        ) : (
                            <PanelLeftClose size={19} strokeWidth={1.6} />
                        )}

                        <span className="sidebar-link-label">
                            Collapse sidebar
                        </span>
                    </button>

                    {!collapsed && (
                        <p className="sidebar-tagline">
                            Useful things. Better living.
                        </p>
                    )}
                </div>
            </aside>
        </>
    );
}
