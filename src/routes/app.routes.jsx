//import Dashboard from '../layouts/Dashboard.jsx';
import { Switch } from 'react-router-dom';
import { dashboardLayout } from '@/layouts/DashboardLayout';
import Loader from '@/helper/loaders';
import { auth } from '../utils/auth';
import AppRoute from './AppRoute';
import { publicLayout } from '@/layouts/PublicLayout';
import MaterialComponents from '@/components/Testing/MaterialComponents';
import LoginPage from '@/containers/Login';
import ForgotPasswordPage from '@/containers/ForgotPassword';
import ResetpasswordPage from '@/containers/Resetpassword';
import { errorLayout } from '@/layouts/ErrorLayout';

const QualityDashboardPage = Loader(() =>
  import(/* webpackChunkName: "QualityDashboardPage" */ '@/containers/QualityDashboard/QualityDashboard'),
);

const MeasureDetails = Loader(() =>
  import(/* webpackChunkName: "MeasureDetails" */ '@/containers/MeasureDetails/MeasureDetails'),
);

// const LoginPage = Loader(() =>
//   import(/* webpackChunkName: "LoginPage" */ '@/containers/Login'),
// );

// const ForgotPasswordPage = Loader(() =>
//   import(/* webpackChunkName: "ForgotPage" */ '@/containers/ForgotPassword'),
// );

// const ResetpasswordPage = Loader(() =>
//   import(/* webpackChunkName: "ResetpasswordPage" */ '@/containers/Resetpassword'),
// );

const Help = Loader(() =>
  import(/* webpackChunkName: "ResetpasswordPage" */ '@/containers/Welcome'),
);

const NotFoundPage = Loader(() =>
  import(/* webpackChunkName: "NotFoundPage" */ '@/containers/not-found-page.component'),
);

const SSORouter = Loader(() =>
  import(/* webpackChunkName: "NotFoundPage" */ '@/containers/SSORouter/SSORouter'),
);

const Routers = store => {
  return (
    <div className="fi-grid fi-grid--hor fi-grid--root fi-grid--root-2">
      <div className="fi-grid fi-grid--hor fi-grid--root fi-grid--root-3">
        <Switch>
          <AppRoute
            exact={true}
            path="/"
            component={LoginPage}
            requireAuth={auth}
            layout={publicLayout}
            store={store}
            type="public"
          />

          <AppRoute
            exact={true}
            path="/login"
            component={LoginPage}
            requireAuth={auth}
            layout={publicLayout}
            store={store}
            type="public"
          />

          <AppRoute
            exact
            path="/dashboard"
            component={QualityDashboardPage}
            requireAuth={auth}
            layout={dashboardLayout}
            store={store}
          />
          <AppRoute
            exact
            path="/layout"
            component={dashboardLayout}
            requireAuth={auth}
            layout={dashboardLayout}
            store={store}
          />

          <AppRoute
            exact
            path="/help"
            component={Help}
            requireAuth={auth}
            layout={dashboardLayout}
            store={store}
          />

          <AppRoute
            exact
            path="/measuredetails"
            component={MeasureDetails}
            requireAuth={auth}
            layout={dashboardLayout}
            store={store}
          />
          <AppRoute
            exact
            path="/SSORouter"
            component={SSORouter}
            requireAuth={() => false}
            layout={publicLayout}
            type="public"
          />
          <AppRoute
            exact
            path="/forgotpassword"
            component={ForgotPasswordPage}
            requireAuth={() => false}
            layout={publicLayout}
            store={store}
            type="public"
          />
          <AppRoute
            exact
            path="/materialcomponents"
            component={MaterialComponents}
            requireAuth={() => false}
            layout={publicLayout}
            store={store}
            type="public"
          />
          <AppRoute
            exact
            path="/resetpassword"
            component={ResetpasswordPage}
            requireAuth={() => false}
            layout={publicLayout}
            store={store}
            type="public"
          />
          <AppRoute
            exact
            path="*"
            component={NotFoundPage}
            requireAuth={() => false}
            layout={errorLayout}
            store={store}
            type="public"
          />
        </Switch>
      </div>
    </div>
  );
};

export default Routers;
