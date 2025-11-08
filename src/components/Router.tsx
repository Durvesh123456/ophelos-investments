import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import FundsPage from '@/components/pages/FundsPage';
import MutualFundsPage from '@/components/pages/MutualFundsPage';
import SIFPage from '@/components/pages/SIFPage';
import AIFPage from '@/components/pages/AIFPage';
import PMSPage from '@/components/pages/PMSPage';
import InvestorResourcesPage from '@/components/pages/InvestorResourcesPage';
import AumDetailsPage from '@/components/pages/AumDetailsPage';
import ContactPage from '@/components/pages/ContactPage';
import StockMarketPage from '@/components/pages/StockMarketPage';
import ResponsesPage from '@/components/pages/ResponsesPage';


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
        path: "funds",
        element: <FundsPage />,
      },
      {
        path: "funds/mutual-fund",
        element: <MutualFundsPage />,
      },
      {
        path: "funds/sif",
        element: <SIFPage />,
      },
      {
        path: "funds/aif",
        element: <AIFPage />,
      },
      {
        path: "funds/pms",
        element: <PMSPage />,
      },
      {
        path: "mutual-funds",
        element: <Navigate to="/funds/mutual-fund" replace />,
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
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "stock-market",
        element: <StockMarketPage />,
      },
      {
        path: "responses",
        element: <ResponsesPage />,
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
