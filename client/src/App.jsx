import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import HubPage from "./pages/HubPage";
import SignUpPage from "./pages/SignUpPage";
import SigninPage from "./pages/SigninPage";
import ConfigPage from "./pages/ConfigPage";
import AvatarPage from "./pages/AvatarPage";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-pulse" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HubPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signin"
          element={!authUser ? <SigninPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<ConfigPage />} />
        <Route
          path="/avatar"
          element={authUser ? <AvatarPage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
