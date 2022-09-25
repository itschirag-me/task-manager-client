import React from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Loader from "./components/common/Loader";
import LandingPage from "./components/LandingPage";

const App = () => {
  const { apiLoader } = useAuth();

  if (apiLoader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "0.5rem",
            padding: "1rem",
            background: "#fff",
            color: "#FFBE78",
            fontSize: "1rem",
            fontWeight: "normal",
          },
          success: {
            iconTheme: {
              primary: "#FFBE78",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#FFBE78",
              secondary: "white",
            },
          },
        }}
      />
      <LandingPage />
    </>
  );
};

export default App;
