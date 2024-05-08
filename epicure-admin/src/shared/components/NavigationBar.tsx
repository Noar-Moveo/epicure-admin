import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface NavigationBarProps {
  collections: string[];
  handleListItemClick: (
    event: React.MouseEvent<HTMLDivElement>,
    index: string
  ) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  collections,
  handleListItemClick,
}) => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <Typography variant="h6" sx={{ p: 2 }}>
        COLLECTION TYPES
      </Typography>
      <List>
        {collections.map((name) => (
          <ListItemButton
            key={name}
            onClick={(event) => handleListItemClick(event, name)}
            sx={{
              bgcolor: "transparent",
              "&:hover": { bgcolor: "lightblue" },
              padding: "10px 20px",
            }}
          >
            <ListItemText primary={name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default NavigationBar;
