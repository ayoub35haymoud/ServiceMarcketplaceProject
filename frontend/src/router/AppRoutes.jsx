import React from 'react';
import { useRoutes } from 'react-router-dom';
import Routes from './routes';
import ProtectedRoute from './ProtectedRoute';

const applyGuards = (routes) => {
  return routes.map((route) => {
    // Check if the route or its children have guards
    const guardedElement = route.guard ? (
      <ProtectedRoute element={route.element} />
    ) : (
      route.element
    );

    return {
      ...route,
      element: guardedElement,
      children: route.children ? applyGuards(route.children) : undefined,
    };
  });
};

const AppRoutes = () => {
  const routes = applyGuards(Routes); // Apply guards
  const element = useRoutes(routes); // Use guarded routes

  return element;
};

export default AppRoutes;
