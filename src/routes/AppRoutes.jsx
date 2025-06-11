import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/Landing";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import NotFoundPage from "../pages/NotFound";
import Spinner from "../components/Spinner";
import UserLayout from "../layouts/UserLayout";
import ChatPage from "../pages/ChatPage";

const UserChat = () => <div style={{ padding: "2rem" }}>Select or start a chat!</div>;

const AppRoutes = () => (
  <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/u/:userId" element={<UserLayout />}>
        <Route index element={<UserChat />} />
        <Route path="chat/:chatId" element={<ChatPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
