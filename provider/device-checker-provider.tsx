"use client";

import { useDeviceStore } from "@/store/device";
import { useEffect } from "react";

export function DeviceCheckerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsMobile } = useDeviceStore();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice =
      /mobile|android|ios|iphone|ipad|ipod|windows phone/i.test(userAgent);
    setIsMobile(isMobileDevice);
  }, []);

  return <>{children}</>;
}
