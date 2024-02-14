import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export const SearchBar = ({ setSearchQuery }) => (
  <form className="border-violet-700 border-2 rounded-md text-white">
    <TextField
      className="bg-violet-900/60 "
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Search"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "purple" }} />
    </IconButton>
  </form>
);
