import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore";
import Patterns from "../components/Patterns";
import prototypeImg from "../assets/prototype.gif";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ChevronsRight,
  CircleUser,
} from "lucide-react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Pass is required");
    if (formData.password.length < 6)
      return toast.error("Pass must be at least 6 characters");
    return true;
  };

  const capitalizeFullName = (name) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const capitalizedFullName = capitalizeFullName(formData.fullName.trim());
    const success = validateForm();
    if (success === true) {
      signup({ ...formData, fullName: capitalizedFullName });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
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
                Join our Community
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <CircleUser className="absolute left-3 top-1/2 -translate-y-1/2 size-5 pointer-events-none z-10" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-12 focus:outline-none "
                  placeholder="Peter Parker"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
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
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create User"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an User?{" "}
              <Link to="/signin" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side (only on Larger Screens) */}
      <Patterns
        title={"Technology of the Future"}
        subtitle="Chat with Friends around the World!"
      />
    </div>
  );
};

export default SignupPage;
