import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import Patterns from "../components/Patterns";
import prototypeImg from "../assets/prototype.gif";
import { Eye, EyeOff, Loader2, Lock, ChevronsRight } from "lucide-react";

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signin, isSignin } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signin(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <img
                  src={prototypeImg}
                  alt="prototype"
                  className="w-24 h-24 rounded-full"
                />{" "}
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-widest">
                Hello there !
              </h1>
              <p className="text-base-content/60 tracking-wider">
                Your People is waiting
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <ChevronsRight className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 pointer-events-none z-10" />
                <input
                  type="email"
                  className="input input-bordered w-full pl-12 focus:outline-none"
                  placeholder="peter_NY@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Pass</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40 pointer-events-none z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSignin}
            >
              {isSignin ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an User?{" "}
              <Link to="/signup" className="link link-primary">
                Create User
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side (only on Larger Screens) */}
      <Patterns
        title={"Technology of the Future"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
};

export default SigninPage;
