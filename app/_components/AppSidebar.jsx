import { SidebarContent } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "@/components/AppSidebar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                    </SidebarGroup>
                </SidebarContent>
            </SidebarHeader>
        </Sidebar>
    )
}
export default AppSidebar;