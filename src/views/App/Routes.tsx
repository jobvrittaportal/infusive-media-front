import { Suspense, lazy, } from 'react'
import { Routes, Route, Navigate,} from 'react-router-dom'
import * as routesNames from '../../constant/routes'
import Layout from '../../default/Layout'
import { useAuth } from '../../hooks/useAuth'
import Loader from '../../components/Loader'


const Login = lazy(() => import('../Login'));
const ForgotPassword = lazy(() => import('../ForgotPassword'));
const Dashboard = lazy(() => import('../Dashboard'));
const LeadList = lazy(() => import('../Leads/LeadList/leadList'));
const Company = lazy(() => import('../Leads/company/Company'));
const Roles = lazy(() => import('../AdminControl/roles'));
const Pages = lazy(() => import('../AdminControl/pages'));
const Users = lazy(() => import('../AdminControl/users'));
const NewRole = lazy(() => import('../AdminControl/newRole'));
const NewPage = lazy(() => import('../AdminControl/newPage'));
const Support = lazy(() => import('../Support/RaiseTicket'));
const TicketDetails = lazy(() => import('../Support/TicketDetail'));
 

// MASTERS
const IndustryType = lazy(() => import('..//Masters/industryTypes'));


const AppRoutes = () => {
  const { loggedin, hasPermission } = useAuth();

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
            { hasPermission('Dashboard') && (<Route path={routesNames.DASHBOARD} element={<Suspense fallback={<Loader/>}><Layout><Dashboard /></Layout></Suspense>} /> )}
            { hasPermission('LeadLists') && (<Route path={routesNames.LEADLIST} element={<Suspense fallback={<Loader/>}><Layout><LeadList /></Layout></Suspense>} />)}
            <Route path={routesNames.COMPANIES} element={<Suspense fallback={<Loader/>}><Layout><Companies /></Layout></Suspense>} />
            { hasPermission('Roles') && (<Route path={routesNames.ROLES} element={<Suspense fallback={<Loader/>}><Layout><Roles /></Layout></Suspense>} /> )}
            <Route path={routesNames.PAGES} element={<Suspense fallback={<Loader/>}><Layout><Pages /></Layout></Suspense>} />
            <Route path={routesNames.NEWPAGE} element={<Suspense fallback={<Loader/>}><Layout><NewPage /></Layout></Suspense>} />
            <Route path={routesNames.USERS} element={<Suspense fallback={<Loader/>}><Layout><Users /></Layout></Suspense>} />
            <Route path={routesNames.NEWROLE} element={<Suspense fallback={<Loader/>}><Layout><NewRole /></Layout></Suspense>} />
            <Route path={routesNames.SUPPORT} element={<Suspense fallback={<Loader/>}><Layout><Support /></Layout></Suspense>} />
            <Route path={routesNames.TICKETDETAIL} element={<Suspense fallback={<Loader/>}><Layout><TicketDetails /></Layout></Suspense>} />
            <Route path={routesNames.COMPANY} element={<Suspense fallback={<Loader/>}><Layout><Company /></Layout></Suspense>} />
            <Route path={routesNames.INDUSTRYTYPES} element={<Suspense fallback={<Loader/>}><Layout><IndustryType/></Layout></Suspense>} />
            
            {/* Default Route */}
            <Route path="*" element={<Navigate to={routesNames.DASHBOARD} />} />
          </>
        )
      }
    </Routes>
  );
};


export default AppRoutes
