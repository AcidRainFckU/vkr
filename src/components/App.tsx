import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/auth";
import { useAppSelector } from "../hooks/useAppSelector";
import { User } from "../redux/user/types";
import "../sass/App.scss";
import ProtectedRoute from "./layouts/ProtectedRoleRoute";
import ErrorPage from "./pages/404";
import AdminPanel from "./pages/admin/adminPanel";
import AdminUsers from "./pages/admin/AdminUsers";
import CoursesComponent from "./pages/admin/CoursesComponent";
import HomePage from "./pages/user/homePage";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Settings from "./pages/settings";

function App() {
  const { checkAuth } = useAuth();
  const user: User = useAppSelector((store) => store.user) as User;
  useEffect(() => {
    checkAuth();
  }, []);

  if (user?.banned) {
    return (
      <div className="App">
        <Routes>
          <Route path="/banned" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/banned" replace />} />
        </Routes>
      </div>
    );
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<HomePage />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRoute condition={["superuser"]}>
                <AdminPanel currentTab={1}>{<AdminUsers />}</AdminPanel>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cources"
            element={
              <ProtectedRoute condition={["superuser"]}>
                <AdminPanel currentTab={2}>
                  <CoursesComponent />
                </AdminPanel>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </div>
  );
}

export default App;
