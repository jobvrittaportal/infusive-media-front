import { Navigate, Route, Routes } from "react-router-dom"
import * as routesNames from './RouteConstant'
import { Suspense } from "react"
import Layout from "../common/components/layout"
import { Dashboard, Login, ForgotPassword } from "../pages"


const AppRoutes = () => {

    return (
        <Routes>


            <>
                <Route path={routesNames.LOGIN} element={<Suspense> <Login /> </Suspense>} />
                <Route path="*" element={<Navigate to={routesNames.LOGIN} />} />
                <Route path={routesNames.FORGOTPASSWORD} element={<Suspense ><ForgotPassword /></Suspense>} />

            </>

            <>
                <Route path={routesNames.DASHBOARD} element={<Suspense><Layout><Dashboard /></Layout></Suspense>} />
                {/* <Route path={routesNames.LEADLIST} element={<Suspense><Layout><LeadList /></Layout></Suspense>} /> */}
                {/*  <Route path={routesNames.COMPANIES} element={<Suspense><Layout><Companies /></Layout></Suspense>} /> */}

                <Route path='*' element={<Navigate to={routesNames.DASHBOARD} />} />

            </>
        </Routes>
    )
}

export default AppRoutes
