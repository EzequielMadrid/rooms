import React from "react";
import aliensImg from "../assets/aliens.gif";

const GreetingView = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-42 h-32 rounded-2xl bg-primary/10 flex items-center justify-center ">
              <img
                src={aliensImg}
                alt="aliens"
                className="w-38 h-28 rounded-xl"
              />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Welcome to SecreT RoomS</h2>
        <p className="text-base-content/60">
          Chat with your Friends and Family or Discover New People!
        </p>
      </div>
    </div>
  );
};

export default GreetingView;
