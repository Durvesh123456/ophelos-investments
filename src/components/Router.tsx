import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import MutualFundsPage from '@/components/pages/MutualFundsPage';
import InvestorResourcesPage from '@/components/pages/InvestorResourcesPage';
import AumDetailsPage from '@/components/pages/AumDetailsPage';
import ContactPage from '@/components/pages/ContactPage';
import GoalPlannerPage from '@/components/pages/GoalPlannerPage';
import TempCleanup from '@/temp-cleanup';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "mutual-funds",
        element: <MutualFundsPage />,
      },
      {
        path: "investor-resources",
        element: <InvestorResourcesPage />,
      },
      {
        path: "aum-details",
        element: <AumDetailsPage />,
      },
      {
        path: "goal-planner",
        element: <GoalPlannerPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cleanup",
        element: <TempCleanup />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
