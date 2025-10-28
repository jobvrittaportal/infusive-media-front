import { Navigate, Route, Routes } from "react-router-dom";
import * as routesNames from "./RouteConstant";
import { otherRoutes } from "./otherRoute";
import { authRoutes } from "./authRoute";
import { useAuth } from "../common/context/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const allRoutes = isAuthenticated ? [...otherRoutes] : [...authRoutes];
  return (
    <Routes>
      {allRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? routesNames.DASHBOARD : routesNames.LOGIN}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
