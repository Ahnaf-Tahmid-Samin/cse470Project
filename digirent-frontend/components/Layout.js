import React, { useEffect, useState } from "react";
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";

export default function Layout({ children, size, user }) {
  const { totalUniqueItems } = useCart();
  const [totalItemCount, setTotalItemCount] = useState(0);
  const router = useRouter();
  const logoutHandler = () => {
    deleteCookie("token");
    window.location.href = "/";
  };
  useEffect(() => {
    setTotalItemCount(totalUniqueItems);
  }, [totalUniqueItems]);
  return (
    <div className={`flex flex-col ${size}`}>
      <div className="h-20 px-12 flex justify-between items-center bg-black text-white">
        <Link href={"/"}>
          <a className="text-2xl font-semibold">DigiRent</a>
        </Link>
        <div className="flex gap-3 font-semibold">
          {user ? (
            <>
              <Link href={"/account"}>
                <a
                  className={`${
                    router.pathname === "/account"
                      ? "text-red-800"
                      : "text-white"
                  } hover:text-red-800`}
                >
                  Account
                </a>
              </Link>
              <button
                className="text-white hover:text-red-800"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <a className="text-white hover:text-red-800">Login</a>
              </Link>
              <Link href={"/signup"}>
                <a className="text-white hover:text-red-800">Singup</a>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="main h-full">{children}</div>
    </div>
  );
}
