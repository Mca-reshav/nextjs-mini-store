"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { routePath } from "@/types/route";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart, clearCart } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    clearCart();
    logout();
    router.push(routePath.login);
  };

  const firstName = user?.name?.split(" ")[0];

  return (
    <nav className="w-full bg-gray-900 text-white px-4 py-4">
      
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold">
            MiniStore
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center flex-1">
          <NavLink href="/" active={isActive("/")}>Home</NavLink>
          <NavLink href={routePath.products} active={isActive(routePath.products)}>Products</NavLink>
          <NavLink href={routePath.about} active={isActive(routePath.about)}>About</NavLink>

          {user && (
            <NavLink href={routePath.cart} active={isActive(routePath.cart)}>
              <span className="relative">
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-1">
                    {cart.length > 99 ? "99+" : cart.length}
                  </span>
                )}
              </span>
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {user ? (
            <>
              <span className="text-sm">
                Hi, <strong>{firstName}</strong>
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href={routePath.login}
              className={`px-3 py-1 rounded text-sm ${
                isActive(routePath.login)
                  ? "bg-yellow-400 text-black"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`hover:text-gray-300 whitespace-nowrap ${
        active ? "text-yellow-400 font-semibold" : ""
      }`}
    >
      {children}
    </Link>
  );
}