import { Suspense, lazy, } from 'react'
import { Routes, Route, Navigate,} from 'react-router-dom'
import * as routesNames from '../../constant/routes'
import Layout from '../../default/Layout'
import { useAuth } from '../../hooks/useAuth'


const Login = lazy(() => import('../Login'));
const ForgotPassword = lazy(() => import('../ForgotPassword'));
const Dashboard = lazy(() => import('../Dashboard'));
const LeadList = lazy(() => import('../Leads/LeadList'));
const Companies = lazy(() => import('../Leads/Companies'));
const Roles = lazy(() => import('../AdminControl/roles'));
const Pages = lazy(() => import('../AdminControl/pages'));
const Users = lazy(() => import('../AdminControl/users'));
const NewRole = lazy(() => import('../AdminControl/newRole'));
const NewPage = lazy(() => import('../AdminControl/newPage'));
const Support = lazy(() => import('../Support/RaiseTicket'));
const TicketDetails = lazy(() => import('../Support/TicketDetail'));


const AppRoutes = () => {
  const { loggedin } = useAuth();

  return (
    <Routes>
      {
        !loggedin ? (
          <>
            <Route path={routesNames.LOGIN} element={<Suspense><Login /></Suspense>} />
            <Route path="*" element={<Navigate to={routesNames.LOGIN} />} />
            <Route path={routesNames.FORGOTPASSWORD} element={<Suspense><ForgotPassword /></Suspense>} />
          </> 
          ): ( 
          <>
            <Route path={routesNames.DASHBOARD} element={<Suspense><Layout><Dashboard /></Layout></Suspense>} />
            <Route path={routesNames.LEADLIST} element={<Suspense><Layout><LeadList /></Layout></Suspense>} />
            <Route path={routesNames.COMPANIES} element={<Suspense><Layout><Companies /></Layout></Suspense>} />
            <Route path={routesNames.ROLES} element={<Suspense><Layout><Roles /></Layout></Suspense>} />
            <Route path={routesNames.PAGES} element={<Suspense><Layout><Pages /></Layout></Suspense>} />
            <Route path={routesNames.NEWPAGE} element={<Suspense><Layout><NewPage /></Layout></Suspense>} />
            <Route path={routesNames.USERS} element={<Suspense><Layout><Users /></Layout></Suspense>} />
            <Route path={routesNames.NEWROLE} element={<Suspense><Layout><NewRole /></Layout></Suspense>} />
            <Route path={routesNames.SUPPORT} element={<Suspense><Layout><Support /></Layout></Suspense>} />
            <Route path={routesNames.TICKETDETAIL} element={<Suspense><Layout><TicketDetails /></Layout></Suspense>} />

            {/* Default Route */}
            <Route path="*" element={<Navigate to={routesNames.DASHBOARD} />} />
          </>
        )
      }
    </Routes>
  );
};


export default AppRoutes
