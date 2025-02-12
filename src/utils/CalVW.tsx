import {useMediaQuery} from "react-responsive";

export const MobileCalVW = (px:number) => `${(px / 360) * 100}vw`;
export const DeskTopCalVW = (px:number) => `${(px / 1920) * 100}vw`;

export const useIsMobile = () => {
  return useMediaQuery({ maxWidth: 768 });
};

export const sizes = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1920px",
};

export const media = {
  mobile: `(max-width: ${sizes.mobile})`,
  tablet: `(max-width: ${sizes.tablet})`,
  desktop: `(max-width: ${sizes.desktop})`,
};