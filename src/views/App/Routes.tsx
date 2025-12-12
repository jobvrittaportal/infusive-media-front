import { Suspense, lazy, } from 'react'
import { Routes, Route, Navigate, } from 'react-router-dom'
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
const Designation = lazy(() => import('../Masters/designation'));
const Country = lazy(() => import('../Masters/country'));
const City = lazy(() => import('../Masters/city'))
const State = lazy(() => import('../Masters/state'))
const Source = lazy(() => import('../Masters/source'))
const Status = lazy(() => import('../Masters/status'))


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
        ) : (
          <>
            {hasPermission('Dashboard') && (<Route path={routesNames.DASHBOARD} element={<Suspense fallback={<Loader />}><Layout><Dashboard /></Layout></Suspense>} />)}
            {hasPermission('LeadLists') && (<Route path={routesNames.LEADLIST} element={<Suspense fallback={<Loader />}><Layout><LeadList /></Layout></Suspense>} />)}
            {hasPermission('Company') && (<Route path={routesNames.COMPANY} element={<Suspense fallback={<Loader />}><Layout><Company /></Layout></Suspense>} />)}
            {hasPermission('Roles') && (<Route path={routesNames.ROLES} element={<Suspense fallback={<Loader />}><Layout><Roles /></Layout></Suspense>} />)}
            {hasPermission('Pages') && (<Route path={routesNames.PAGES} element={<Suspense fallback={<Loader />}><Layout><Pages /></Layout></Suspense>} />)}
            {hasPermission('Pages') && (<Route path={routesNames.NEWPAGE} element={<Suspense fallback={<Loader />}><Layout><NewPage /></Layout></Suspense>} />)}
            {hasPermission('Users') && (<Route path={routesNames.USERS} element={<Suspense fallback={<Loader />}><Layout><Users /></Layout></Suspense>} />)}
            {hasPermission('Roles') && (<Route path={routesNames.NEWROLE} element={<Suspense fallback={<Loader />}><Layout><NewRole /></Layout></Suspense>} />)}
            {hasPermission('RaiseTickets') && (<Route path={routesNames.SUPPORT} element={<Suspense fallback={<Loader />}><Layout><Support /></Layout></Suspense>} />)}
            {hasPermission('RaiseTickets') && (<Route path={routesNames.TICKETDETAIL} element={<Suspense fallback={<Loader />}><Layout><TicketDetails /></Layout></Suspense>} />)}
            {hasPermission('Company') && (<Route path={routesNames.COMPANY} element={<Suspense fallback={<Loader />}><Layout><Company /></Layout></Suspense>} />)}
            {hasPermission('IndustryType') && (<Route path={routesNames.INDUSTRYTYPES} element={<Suspense fallback={<Loader />}><Layout><IndustryType /></Layout></Suspense>} />)}
            {hasPermission('Designation') && (<Route path={routesNames.DESIGNATION} element={<Suspense fallback={<Loader />}><Layout><Designation /></Layout></Suspense>} />)}
            {hasPermission('Country') && (<Route path={routesNames.COUNTRY} element={<Suspense fallback={<Loader />}><Layout><Country /></Layout></Suspense>} />)}
            {hasPermission('City') && (<Route path={routesNames.CITY} element={<Suspense fallback={<Loader />}><Layout><City /></Layout></Suspense>} />)}
            {hasPermission('State') && (<Route path={routesNames.STATE} element={<Suspense fallback={<Loader />}><Layout><State /></Layout></Suspense>} />)}
            {hasPermission('Source') && (<Route path={routesNames.SOURCE} element={<Suspense fallback={<Loader />}><Layout><Source /></Layout></Suspense>} />)}
            {hasPermission('Status') && (<Route path={routesNames.STATUS} element={<Suspense fallback={<Loader />}><Layout><Status /></Layout></Suspense>} />)}

            {/* Default Route */}
            <Route path="*" element={<Navigate to={routesNames.DASHBOARD} />} />
          </>
        )
      }
    </Routes>
  );
};


export default AppRoutes
