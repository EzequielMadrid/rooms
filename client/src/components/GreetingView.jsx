import React from "react";
import aliensImg from "../assets/aliens.gif";
import "@fontsource/monaspace-krypton";

const GreetingView = ({ fullname }) => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-6 bg-base-100/50">
      <div className="max-w-md text-center space-y-6 font-special">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-72 h-72 rounded-2xl flex items-center justify-center">
              <img
                src={aliensImg}
                alt="aliens"
                className="object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
        <h2 className="text-sm flex items-center justify-center gap-2">
          Welcome <span className="font-bold">{fullname}</span>
        </h2>
      </div>
    </div>
  );
};

export default GreetingView;
