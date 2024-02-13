import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
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

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-2">
            <div className="box1">
              <img
                src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                alt="profile"
                className="h-8 w-8 rounded-full img1"
              />
              <div className="gradient1"></div>
            </div>
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              {/* <p className="tiny-medium  text-light-3">@{user.username}</p> */}
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
