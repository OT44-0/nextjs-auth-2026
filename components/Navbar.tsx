"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { ThemeModeButton } from "./ThemeModeButton";
import { signOut, useSession } from "@/lib/auth-client";

function Navbar() {
  const session = useSession();

  return (
    <NavigationMenu className="min-w-screen">
      <NavigationMenuList>
        {!session.data?.user ? (
          <>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/login">Login</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/register">Register</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              onClick={() => {
                signOut();
                window.location.href = "/";
              }}
            >
              <button>Log out</button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/profile/${session.data?.user.username}`}>
              {session.data?.user.username || "Profile"}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {session.data?.user.role === "ADMIN" && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/dashboard">Admin</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
        <NavigationMenuItem>
          <ThemeModeButton />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;
