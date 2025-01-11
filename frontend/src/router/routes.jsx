import React from 'react';

// Lazy load pages
const Login = React.lazy(() => import('../pages/Login'));
const Register = React.lazy(() => import('../pages/Register'));
const CustomerDashboard = React.lazy(() => import('../pages/CustomerDashboard'));
const ProviderDashboard = React.lazy(() => import('../pages/ProviderDashboard'));
const AddService = React.lazy(() => import('../components/Dashboard/AddService'));
const About = React.lazy(() => import('../components/Dashboard/About'));
const EditProfile = React.lazy(() => import('../pages/EditProfile'));
const MainLayout = React.lazy(() => import('../layouts/MainLayout'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const NotFound = React.lazy(()=> import('../pages/NotFound'));
// Route configuration
const routes = [
  {
    path : '/',
    element : <MainLayout/>,
    children : [
      {
        path : '/',
        element : <HomePage/>,
        children : [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
          {
            path: '/customer-dashboard',
            element: <CustomerDashboard />,
            guard: true
          },
          {
            path: '/provider-dashboard',
            element: (
                <ProviderDashboard />
            ),
            guard: true,
            children: [
              {
                path: 'addService',
                element: <AddService />,
              },
              {
                path: 'about',
                element: <About />,
              },
            ]
          },
          {
            path: '/edite-profile',
            element: (
                <EditProfile />
            ),
            guard: true
          }
        ],
      },
      
    ]
  },
  {
    path : '*',
    element : <NotFound/>

  }
  
];

export default routes;
