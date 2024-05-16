import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import resources from "../../../resources/resources.json";
import {
  searchBarContainerStyle,
  textFieldStyle,
  buttonStyle,
} from "./SearchBar.style";
import { ISearchBarProps } from "./SearchBar.type";

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Box sx={searchBarContainerStyle}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onKeyDown={handleKeyPress}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={textFieldStyle}
        autoComplete="off"
      />
      <Button variant="contained" onClick={handleSearch} sx={buttonStyle}>
        {resources.Search}
      </Button>
    </Box>
  );
};

export default SearchBar;
