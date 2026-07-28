/**
 * ShipNow's authoritative design-token source.
 *
 * Keep screen-specific measurements under `layout` rather than adding them to
 * reusable scales. Tailwind's CSS theme in `src/app/globals.css` mirrors the
 * reusable values from this file because Tailwind v4 is CSS-first.
 */
export const colors = {
  brand: {
    primary: "#856DF3",
    light: "#E3DDFF",
    dark: "#2A1298",
  },
  text: {
    primary: "#333333",
    secondary: "#757575",
  },
  surface: {
    page: "#F0F0F0",
    input: "#F5F5F5",
    // TODO(figma): confirm card and additional surface colors.
    card: "#FEFEFE",
  },
  border: {
    // TODO(figma): confirm input and default border colors.
    default: "#E0E0E0",
  },
  action: {
    dark: "#333333",
  },
  status: {
    success: "#007837",
    successLight: "#D9F9E7",
    warning: "#D97706",
    error: "#F04A4A",
    neutral: "#757575",
    info: "#235BC2",
    infoLight: "#E3EDFF",
  },
} as const;

export const fontFamily = {
  sans: "var(--font-nunito-sans), Arial, Helvetica, sans-serif",
} as const;

export const fontSize = {
  // TODO(figma): confirm remaining font sizes.
  body: "1rem",
  small: "0.875rem",
  large: "1.125rem",
} as const;

export const fontWeight = {
  // TODO(figma): confirm remaining font weights.
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  // TODO(figma): confirm remaining line heights.
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.625",
} as const;

export const spacing = {
  0: "0px",
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
} as const;

export const radii = {
  nav: "4px",
  control: "8px",
  // TODO(figma): confirm additional radii.
  card: "12px",
  full: "9999px",
} as const;

export const shadows = {
  // TODO(figma): confirm shadows.
  card: "0 1px 3px rgb(0 0 0 / 0.1)",
} as const;

export const breakpoints = {
  mobile: "375px",
  tablet: "768px",
  desktop: "1440px",
} as const;

export const layout = {
  shell: {
    sidebarWidth: "223px",
    railWidth: "68px",
  },
  login: {
    leftPanelWidth: "720px",
    referenceHeight: "1024px",
    leftPanelPadding: "106px",
    contentGap: "42px",
    logoLockupWidth: "264.52px",
    logoLockupHeight: "72px",
    logoSymbolWidth: "46.96px",
    logoSymbolHeight: "46.96px",
    headlineBlockWidth: "487px",
    headlineInternalGap: "12px",
    heroImageWidth: "553px",
    heroImageHeight: "499px",
    formWidth: "400px",
    inputHeight: "38px",
    buttonHeight: "44px",
    truckImageWidth: "410px",
    truckImageHeight: "386px",
    phoneImageWidth: "178.461px",
    phoneImageHeight: "228px",
    stackedPanelHeight: "1024px",
    mobilePanelHeight: "812px",
  },
} as const;

export const tokens = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  radii,
  shadows,
  breakpoints,
  layout,
} as const;

export type Colors = typeof colors;
export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type Spacing = typeof spacing;
export type Radii = typeof radii;
export type Shadows = typeof shadows;
export type Breakpoints = typeof breakpoints;
export type Layout = typeof layout;
export type DesignTokens = typeof tokens;
