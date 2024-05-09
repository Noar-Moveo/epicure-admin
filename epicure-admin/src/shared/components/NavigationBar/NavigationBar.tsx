import React from "react";
import { Toolbar, Divider, ListItemText } from "@mui/material";
import { collection } from "../../../resources/resources";
import {
  StyledDrawer,
  CollectionTitle,
  StyledListItemButton,
  StyledList,
} from "./NavigationBar.style";
import { NavigationBarProps } from "./NavigationBar.type";

const NavigationBar: React.FC<NavigationBarProps> = ({
  collections,
  handleListItemClick,
}) => {
  return (
    <StyledDrawer variant="permanent">
      <Toolbar />
      <Divider />
      <CollectionTitle variant="h6">{collection}</CollectionTitle>
      <StyledList>
        {collections.map((name) => (
          <StyledListItemButton
            key={name}
            onClick={(event) => handleListItemClick(event, name)}
          >
            <ListItemText primary={name} />
          </StyledListItemButton>
        ))}
      </StyledList>
    </StyledDrawer>
  );
};

export default NavigationBar;
