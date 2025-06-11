import React from "react";
import aliensImg from "../assets/aliens.gif";
import "@fontsource/monaspace-krypton";

const GreetingView = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-6 bg-base-100/50">
      <div className="max-w-md text-center space-y-6 font-special">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-28 h-20 sm:w-42 sm:h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
              <img
                src={aliensImg}
                alt="aliens"
                className="w-24 h-16 sm:w-38 sm:h-28 rounded-xl"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">
          <span className="text-sm">Welcome to</span> SecreT RoomS
        </h2>
        <p className="text-xs md:text-lg text-base-content/60">
          Chat with your Friends and Family or Discover New People!
        </p>
      </div>
    </div>
  );
};

export default GreetingView;
