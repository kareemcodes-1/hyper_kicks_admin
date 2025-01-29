

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"
import { PresentationChartLineIcon, RectangleGroupIcon, RectangleStackIcon, ShoppingCartIcon, UserGroupIcon } from "@heroicons/react/24/outline"

// Menu items.
export const items = [
  {
    title: "Dashbboard",
    url: "/",
    icon: RectangleGroupIcon,
  },
  {
    title: "Products",
    url: "/products",
    icon: PresentationChartLineIcon,
  },
  {
    title: "Collections",
    url: "/collections",
    icon: RectangleStackIcon,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: UserGroupIcon,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="!text-[.8rem]">Admin Interface</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu  className="!gap-[.7rem]">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="!text-[1rem]">
                      <item.icon className="!h-[1.1rem] !w-[1.1rem]"/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
