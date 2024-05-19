import { styled } from "@mui/material/styles";
import { AppBar, Box, Typography as Typography } from "@mui/material";

const drawerWidth = 240;

export const MainContainer = styled(Box)({
  display: "flex",
});

export const StyledAppBar = styled(AppBar)(() => ({
  width: `calc(100% - ${drawerWidth}px)`,
  position: "fixed",
}));

export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

export const UpperCaseTypography = styled(Typography)({
  textTransform: "uppercase",
});

export const ToolbarContainer = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
});
