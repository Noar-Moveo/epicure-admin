import { styled } from "@mui/material/styles";
import { AppBar, Box, Typography as Typography } from "@mui/material";

const drawerWidth = 240;

export const MainContainer = styled(Box)({
  display: "flex",
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
  paddingLeft: theme.spacing(31),
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
