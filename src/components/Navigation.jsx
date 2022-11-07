import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-[95%] max-w-[700px] border border-cyan rounded-md p-2 mt-[5rem] flex gap-5 justify-between">
      <NavLink
        end
        className={({ isActive }) =>
          `flex-1 text-center  rounded p-[2px] font-bold ${
            isActive ? "bg-cyan text-gray-300" : "bg-gray-200 hover:text-cyan"
          }`
        }
        to="/"
      >
        Crypto
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex-1 text-center  rounded p-[2px] font-bold ${
            isActive ? "bg-cyan text-gray-300" : "bg-gray-200 hover:text-cyan"
          }`
        }
        to="trending"
      >
        Trinding
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `flex-1 text-center  rounded p-[2px]  font-bold ${
            isActive ? "bg-cyan text-gray-300" : "bg-gray-200 hover:text-cyan"
          }`
        }
        to="saved"
      >
        Saved
      </NavLink>
    </div>
  );
};

export default Navigation;
