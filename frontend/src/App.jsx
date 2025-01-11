import { Suspense , } from "react";
import React, { useState, useEffect } from "react";
import AppRoutes from "./router/AppRoutes";
import LoadingSpinner from "./components/LoadingSpinner";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Display spinner for 3 seconds

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    //  <Suspense fallback={<LoadingSpinner/>}>
       <AppRoutes/>
    // </Suspense>
  )
}

export default App
