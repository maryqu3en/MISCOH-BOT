import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const LandingPage = lazy(() => import("../pages/Landing"));
const LoginPage = lazy(() => import("../pages/Login"));
const SignupPage = lazy(() => import("../pages/Signup"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));
const UserLayout = lazy(() => import("../layouts/UserLayout"));
const ChatPage = lazy(() => import("../pages/ChatPage"));

const UserChat = () => <div style={{ padding: "2rem" }}>Select or start a chat!</div>;

const AppRoutes = () => (
  <Suspense fallback={<LoadingScreen />}>
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
