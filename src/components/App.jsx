import { useDispatch } from 'react-redux';
import { lazy, useEffect } from 'react';

import { useAuth } from 'hooks/useAuth';
import { Layout } from './Layout';
import { refreshUser } from 'redux/auth/auth-operations';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

const HomePage = lazy(() => import('../pages/Home'));
const RegisterPage = lazy(() => import('../pages/Register'));
const LoginPage = lazy(() => import('../pages/Login'));
const PhonebookPage = lazy(() => import('../pages/Phonebook'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/login"
                component={<RegisterPage />}
              />
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/phonebook"
                component={<LoginPage />}
              />
            }
          />

          <Route
            path="/phonebook"
            element={
              <PrivateRoute redirectTo="/login" component={<PhonebookPage />} />
            }
          />
          {/* <Route path="*" element={<HomePage />} /> */}
        </Route>
      </Routes>
    </>
  );
};
