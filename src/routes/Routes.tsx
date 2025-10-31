import { Navigate, Route, Routes } from 'react-router-dom';
import * as routesNames from './RouteConstant';
import { otherRoutes } from './otherRoute';
import { authRoutes } from './authRoute';
import { useAuth } from '../common/context/AuthContext';
import { PermissionProvider } from '../common/context/PermissionContext';

const AppRoutes = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const allRoutes = isAuthenticated ? [...otherRoutes] : [...authRoutes];
  return (
    <PermissionProvider user={user}>
      <Routes>
        {allRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? routesNames.DASHBOARD : routesNames.LOGIN} />}
        />
      </Routes>
    </PermissionProvider>
  );
};

export default AppRoutes;
