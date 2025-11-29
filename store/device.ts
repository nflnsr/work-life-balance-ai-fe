import { create } from "zustand";

type TDevice = {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
};

const useDeviceStore = create<TDevice>((set) => ({
  isMobile: true,
  setIsMobile: (isMobile: boolean) => {
    set({ isMobile });
  },
}));

export { useDeviceStore  };
