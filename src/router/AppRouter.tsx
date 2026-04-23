import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import { useGlobalContext } from "../state/index.tsx";

import Loader from "../components/Loader";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";

const LoginPage = lazy(() => import("../pages/Login"));
const CampaignsPage = lazy(() => import("../pages/Campaigns"));
const NewCampaignPage = lazy(() => import("../pages/NewCampaign"));
const CampaignPage = lazy(() => import("../pages/Campaign"));
const SellersPage = lazy(() => import("../pages/Sellers"));
const SellerInvitationPage = lazy(() => import("../pages/SellerInvitation"));
const PrizesPage = lazy(() => import("../pages/Prizes"));
const RaffleTicketsPage = lazy(() => import("../pages/RaffleTickets"));
const NewPrizePage = lazy(() => import("../pages/NewPrize"));
const NewRaffleTicketPage = lazy(() => import("../pages/NewRaffleTicket"));
const DrawResultPage = lazy(() => import("../pages/DrawResultPage"));

function AppRouter() {
  // const {
  //   state: { isLogged },
  // } = useGlobalContext();

  return (
    <Suspense fallback={<Loader />}>
      {/* {isLogged && <NavBar />} */}
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route
          path={"/"}
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <CampaignsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/new"}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <NewCampaignPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId"}
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <CampaignPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/edit"}
          element={
            <PrivateRoute allowedRoles={["user", "admin"]}>
              <NewCampaignPage isEdit={true} />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/sellers"}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <SellersPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/sellers/invite"}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <SellerInvitationPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/prizes"}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <PrizesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/prizes/new"}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <NewPrizePage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/raffle-tickets"}
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <RaffleTicketsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/raffle-tickets/new"}
          element={
            <PrivateRoute allowedRoles={["admin", "seller"]}>
              <NewRaffleTicketPage />
            </PrivateRoute>
          }
        />
        <Route
          path={"/campaigns/:campaignId/draw"}
          element={
            <PrivateRoute allowedRoles={["admin", "seller"]}>
              <DrawResultPage />
            </PrivateRoute>
          }
        />
        <Route path={"/not-found"} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
