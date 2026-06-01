import { Outlet } from "react-router-dom";
import { usePageTracking } from "./analystics/pageTrcking";
import { useSentryPageTracking } from "./analystics/SentryPagetrucker";

export function RootLayout() {
  usePageTracking();
  useSentryPageTracking();

  return <Outlet />;
}