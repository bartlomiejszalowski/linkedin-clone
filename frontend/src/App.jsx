import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useGetAuthUser } from "./hooks/useGetQueryActions";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";

function App() {
  const { authUser, isLoading, error } = useGetAuthUser();

  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/network"
          element={authUser ? <NetworkPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </Layout>
  );
}

export default App;
