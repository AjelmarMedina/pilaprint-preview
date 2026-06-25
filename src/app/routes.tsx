import { useState } from "react";
import {
  createBrowserRouter, useNavigate, Outlet, NavLink, useLocation,
} from "react-router";

import { LandingPage as LandingPageRoute } from "./routes/page";
import { TermsPage as TermsPageRoute } from "./routes/terms/page";
import { NotFoundPage as NotFoundPageRoute } from "./routes/not-found";

import { StudentLoginPage as StudentLoginPageRoute } from "./routes/student/login/page";
import { StudentRegisterPage as StudentRegisterPageRoute } from "./routes/student/register/page";
import { StudentDashboardLayout as StudentDashboardLayoutRoute } from "./routes/student/dashboard/layout";
import { StudentDashboardPage as StudentDashboardPageRoute } from "./routes/student/dashboard/page";
import { StudentOrdersPage as StudentOrdersPageRoute } from "./routes/student/dashboard/orders/page";
import { StudentWalletPage as StudentWalletPageRoute } from "./routes/student/dashboard/wallet/page";
import { StudentQueuePage as StudentQueuePageRoute } from "./routes/student/dashboard/queue/page";
import { StudentDocumentsPage as StudentDocumentsPageRoute } from "./routes/student/dashboard/documents/page";
import { StudentShopsPage as StudentShopsPageRoute } from "./routes/student/shops/page";
import { StudentOrderFlowPage as StudentOrderFlowPageRoute } from "./routes/student/order/page";
import { StudentOrderSuccessPage as StudentOrderSuccessPageRoute } from "./routes/student/order/success/page";

import { BusinessLoginPage as BusinessLoginPageRoute } from "./routes/business/login/page";
import { BusinessRegisterPage as BusinessRegisterPageRoute } from "./routes/business/register/page";
import { BusinessDashboardLayout as BusinessDashboardLayoutRoute } from "./routes/business/dashboard/layout";
import { BusinessDashboardPage as BusinessDashboardPageRoute } from "./routes/business/dashboard/page";
import { BusinessTransactionsPage as BusinessTransactionsPageRoute } from "./routes/business/dashboard/transactions/page";
import { BusinessAnalyticsPage as BusinessAnalyticsPageRoute } from "./routes/business/dashboard/analytics/page";
import { BusinessInventoryPage as BusinessInventoryPageRoute } from "./routes/business/dashboard/inventory/page";
import { BusinessQueuePage as BusinessQueuePageRoute } from "./routes/business/dashboard/queue/page";
import { BusinessOrderDetailsPage as BusinessOrderDetailsPageRoute } from "./routes/business/dashboard/orders/page";

export const router = createBrowserRouter([
  { path: "/",                    Component: LandingPageRoute },
  { path: "/terms",               Component: TermsPageRoute },
  { path: "/student/login",       Component: StudentLoginPageRoute },
  { path: "/student/register",    Component: StudentRegisterPageRoute },
  {
    path: "/student/dashboard",
    Component: StudentDashboardLayoutRoute,
    children: [
      { index: true,              Component: StudentDashboardPageRoute },
      { path: "orders",           Component: StudentOrdersPageRoute },
      { path: "wallet",           Component: StudentWalletPageRoute },
      { path: "queue",            Component: StudentQueuePageRoute },
      { path: "documents",        Component: StudentDocumentsPageRoute },
    ],
  },
  { path: "/student/shops",              Component: StudentShopsPageRoute },
  { path: "/student/order",             Component: StudentOrderFlowPageRoute },
  { path: "/student/order/success",     Component: StudentOrderSuccessPageRoute },
  { path: "/business/login",            Component: BusinessLoginPageRoute },
  { path: "/business/register",         Component: BusinessRegisterPageRoute },
  {
    path: "/business/dashboard",
    Component: BusinessDashboardLayoutRoute,
    children: [
      { index: true,              Component: BusinessDashboardPageRoute },
      { path: "transactions",     Component: BusinessTransactionsPageRoute },
      { path: "analytics",        Component: BusinessAnalyticsPageRoute },
      { path: "inventory",        Component: BusinessInventoryPageRoute },
      { path: "queue",            Component: BusinessQueuePageRoute },
      { path: "orders",           Component: BusinessOrderDetailsPageRoute },
    ],
  },
  { path: "*",                    Component: NotFoundPageRoute },
]);

// ─── App ──────────────────────────────────────────────────────────────────────

