import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types/indext";
import Loader from "./Loader";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: signOut } = useSignOutAccount();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <div className="cube">
            <div className="top"></div>
            <div>
              <span style={{ "--i": 0 } as React.CSSProperties}></span>
              <span style={{ "--i": 1 } as React.CSSProperties}></span>
              <span style={{ "--i": 2 } as React.CSSProperties}></span>
              <span style={{ "--i": 3 } as React.CSSProperties}></span>
            </div>
          </div>
          <h1 className="a">Viraj_Gram</h1>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="profiler">
            <li className="icon facebook">
              <span className="tooltip">Profile</span>
              <span className="profiler1">
                <div className="flex gap-3 items-center">
                  <div className="box">
                    <img
                      src={
                        user.imageUrl || "/assets/icons/profile-placeholder.svg"
                      }
                      alt="profile"
                      className="h-14 w-14 rounded-full absolute img"
                    />
                    <div className="gradient"></div>
                  </div>
                  <div className="flex flex-col">
                    <p className="body-bold">{user.name}</p>
                    <p className="small-regular text-light-3">
                      @{user.username}
                    </p>
                  </div>
                </div>
              </span>
            </li>
          </Link>
        )}
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium ">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
