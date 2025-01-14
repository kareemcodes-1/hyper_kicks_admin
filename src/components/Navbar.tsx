import { useEffect, useState } from "react";

import { useStore } from "../store/store";
import { Link } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  PresentationChartLineIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Theme, useTheme } from "../provider/ThemeProvider";
import {
  Select,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

const items = [
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
];

const Navbar = () => {
  const { adminInfo, logout } = useStore();
  const [openProfileMenu, setOpenProfileMenu] = useState<boolean>(false);
  const [openCommandBar, setOpenCommandBar] = useState<boolean>(false);
  const { setTheme } = useTheme();
  const [openThemeSelect, setOpenThemeSelect] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenCommandBar((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  async function Logout() {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="pb-[.5rem] flex items-center justify-between w-full">
      <div className="flex items-center space-x-4 lg:w-auto w-[65%]">
        <button
          onClick={() => setOpenCommandBar(true)}
          className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground px-4 py-2 relative h-8 w-full flex-1 md:flex-none justify-start rounded-md bg-muted/25 hover:bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-search absolute left-1.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <span className="ml-3">Search</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      <CommandDialog open={openCommandBar} onOpenChange={setOpenCommandBar}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {items.map((item) => (
              <a key={item.title} href={item.url} className="cursor-pointer">
                <CommandItem className="cursor-pointer">
                  {item.title}
                </CommandItem>
              </a>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <div className="flex items-center gap-[.5rem] relative">
        <button onClick={() => setOpenThemeSelect(!openThemeSelect)}
          className="inline-flex relative items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 w-9 scale-95 rounded-full"
          type="button"
          id="radix-:rgk:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <svg
            style={{ width: "1.5rem", height: "1.5rem" }}
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-sun size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          >
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-moon absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          >
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </button>

        <Select open={openThemeSelect} onOpenChange={(open) => setOpenThemeSelect(open)} onValueChange={(value: Theme) => setTheme(value)}> {/* No need for `onOpenChange` unless tracking state */}
  
      <SelectContent className="absolute lg:right-[-77rem] left-[12.5rem] top-[3.8rem]">
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>

        <button
          type="button"
          onClick={() => setOpenProfileMenu(!openProfileMenu)}
        >
          <img
            src={adminInfo?.avatar}
            alt={adminInfo?.name}
            className="w-[1.5rem] h-[1.5rem] rounded-full relative"
          />
        </button>

        {openProfileMenu && (
          <div className="absolute right-0 top-[2rem] mt-2 w-[10rem] bg-white dark:bg-[#0f172a] border  rounded-lg shadow-lg z-50">
            <ul className="flex flex-col text-[.925rem]">
              <Link to="/settings/profile" className="px-4 py-2 hover:bg-gray-100 hover:dark:bg-[#0f172a] cursor-pointer">
                 Profile
              </Link>
              <Link to="/settings" className="px-4 py-2 hover:bg-gray-100 hover:dark:bg-[#0f172a] cursor-pointer">
                 Settings
              </Link>
              <li
                className="px-4 py-2 hover:bg-gray-100 hover:dark:bg-[#0f172a] cursor-pointer"
                onClick={Logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
