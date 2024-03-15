import { colors } from "@mui/material";
import tinycolor from "tinycolor2";

const primary = "#0D0C22";
const secondary = "#53B0F8";
const white = "#FFFFFF";
const black = "#000000";
const background = "#FFFFFF";
const textPrimary = "#0D0C22";
const textSecondary = "#6E6D7A";

const lightenRate = 7.5;
const darkenRate = 7.5;

export default {
  type: "light",
  common: {
    black: black,
    white: white,
  },
  primary: {
    main: primary,
    light: tinycolor(primary).lighten(lightenRate).toHexString(),
    dark: tinycolor(primary).darken(darkenRate).toHexString(),
  },
  secondary: {
    main: secondary,
    light: tinycolor(secondary).lighten(lightenRate).toHexString(),
    dark: tinycolor(secondary).darken(darkenRate).toHexString(),
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: textPrimary,
    secondary: textSecondary,
    link: primary,
  },
  background: {
    default: background,
    paper: white,
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
};