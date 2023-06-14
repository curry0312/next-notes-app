"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.jpg";
import avator from "../public/avator.jpg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

export default function Navbar() {
  const [isUserLogin, setIsUserLogin] = useState<boolean>(false);
  const [isMobileMenuDropDown, setIsMenuDropDown] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      setIsUserLogin(false);
    } else {
      setIsUserLogin(true);
      console.log("session:", session);
    }
  }, [session]);

  return (
    <nav className="flex justify-between items-center bg-white px-4 py-4">
      {/*Logo*/}
      <div className="flex items-center">
        <Link
          href={"/"}
          className="flex items-center font-bold text-black text-3xl"
        >
          <Image
            src={logo}
            alt="logo"
            height={40}
            width={40}
            className="rounded-full"
          />
          NOTES
        </Link>
      </div>
      {isUserLogin === true ? (
        <div>
          {/*Normal screen size*/}
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              <Link href={"/note/createNote"} className="nav_link">
                Create Note
              </Link>
              <Link href={"/profile"} className="nav_link">
                Profile
              </Link>
              <button className="nav_link" onClick={() => signOut()}>
                Sign Out
              </button>
            </div>
            <button className="flex items-center">
              <Image
                src={avator}
                alt="avator"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div
                className="sm:hidden"
                onClick={() =>
                  setIsMenuDropDown((current) => (current = !current))
                }
              >
                <ArrowDropDownIcon
                  sx={{ color: "black" }}
                  className={
                    isMobileMenuDropDown === true
                      ? "transition duration-300 ease-in-out rotate-180"
                      : "transition duration-300 ease-in-out rotate-0"
                  }
                />
              </div>
            </button>
          </div>
          {/*mobile screen size*/}
          <div
            className={
              isMobileMenuDropDown === true
                ? "fixed top-16 right-0 flex flex-col items-end gap-2 p-5 bg-white translate-y-0 transition duration-300 ease-in-out sm:hidden"
                : "fixed top-16 right-0 flex flex-col items-end gap-2 p-5 bg-white -translate-y-[200%] transition duration-300 ease-in-out sm:hidden"
            }
          >
            <Link href={"/note/createNote"} className="nav_link">
              Create Note
            </Link>
            <Link href={"/profile"} className="nav_link">
              Profile
            </Link>
            <button className="nav_link" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
          <button className="flex items-center sm:hidden">
            <Image
              src={avator}
              alt="avator"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div
              className="sm:hidden"
              onClick={() =>
                setIsMenuDropDown((current) => (current = !current))
              }
            >
              <ArrowDropDownIcon
                sx={{ color: "black" }}
                className={
                  isMobileMenuDropDown === true
                    ? "transition duration-300 ease-in-out rotate-180"
                    : "transition duration-300 ease-in-out rotate-0"
                }
              />
            </div>
          </button>
        </div>
      ) : (
        <div>
          {/*Normal screen size*/}
          <div className="hidden sm:flex sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              <button className="nav_link" onClick={() => signIn()}>
                Sign In
              </button>
              <Link href={"/register"} className="nav_link">
                Register
              </Link>
            </div>
            <button className="flex items-center">
              <Image
                src={avator}
                alt="avator"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div
                className="sm:hidden"
                onClick={() =>
                  setIsMenuDropDown((current) => (current = !current))
                }
              >
                <ArrowDropDownIcon
                  sx={{ color: "black" }}
                  className={
                    isMobileMenuDropDown === true
                      ? "transition duration-300 ease-in-out rotate-180"
                      : "transition duration-300 ease-in-out rotate-0"
                  }
                />
              </div>
            </button>
          </div>
          {/*mobile screen size*/}
          <div
            className={
              isMobileMenuDropDown === true
                ? "fixed top-16 right-0 flex flex-col items-end gap-2 p-5 bg-white translate-y-0 transition duration-300 ease-in-out sm:hidden"
                : "fixed top-16 right-0 flex flex-col items-end gap-2 p-5 bg-white -translate-y-[200%] transition duration-300 ease-in-out sm:hidden"
            }
          >
            <button className="nav_link" onClick={() => signIn()}>
              Sign In
            </button>
            <Link href={"/register"} className="nav_link">
              Register
            </Link>
          </div>
          <button className="flex items-center sm:hidden">
            <Image
              src={avator}
              alt="avator"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div
              className="sm:hidden"
              onClick={() =>
                setIsMenuDropDown((current) => (current = !current))
              }
            >
              <ArrowDropDownIcon
                sx={{ color: "black" }}
                className={
                  isMobileMenuDropDown === true
                    ? "transition duration-300 ease-in-out rotate-180"
                    : "transition duration-300 ease-in-out rotate-0"
                }
              />
            </div>
          </button>
        </div>
      )}
    </nav>
  );
}
