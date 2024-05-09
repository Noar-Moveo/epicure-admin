import { styled } from "@mui/material/styles";
import { Drawer, List, ListItemButton, Typography } from "@mui/material";
import colors from "../../../data/colors";

const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

export const CollectionTitle = styled(Typography)({
  padding: 16,
  fontSize: "0.875rem",
});

export const StyledListItemButton = styled(ListItemButton)({
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: colors.lightblue,
  },
  padding: "10px 20px",
});

export const StyledList = styled(List)({});
