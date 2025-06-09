import React from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import chipsImg from "../assets/chips.gif";
import { LogOut, Cog, CircleUser } from "lucide-react";

const FloatingNav = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="w-32 h-6 rounded-2xl bg-primary/30 flex items-center justify-center ">
                <img
                  src={chipsImg}
                  alt="Alien"
                  className="w-28 h-4 rounded-xl"
                />
              </div>
              <h1 className="text-lg font-bold">SecreT RoomS</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 transition-colors `}
            >
              <Cog className="w-4 h-4" />
              <span className="hidden sm:inline">Styles</span>
            </Link>
            {authUser && (
              <>
                <Link to={"/avatar"} className={`btn btn-sm gap-2`}>
                  <CircleUser className="size-5" />
                  <span className="hidden sm:inline">Avatar</span>
                </Link>
                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default FloatingNav;
