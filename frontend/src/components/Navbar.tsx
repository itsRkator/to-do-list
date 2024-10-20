import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Box,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { TaskContext } from "./TaskContext";
import debounce from "lodash/debounce";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

const buttonConfigs = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Incomplete", value: "incomplete" },
];

const Navbar: React.FC = () => {
  const { fetchTasks } = useContext(TaskContext);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const statusRef = useRef(status);

  const handleFilter = (newStatus: string) => {
    setStatus(newStatus);
    fetchTasks(search, newStatus === "all" ? "" : newStatus);
  };

  useEffect(() => {
    statusRef.current = status; // Update the ref whenever status changes
  }, [status]);

  const debouncedFetchTasks = useRef(
    debounce((value: string) => {
      fetchTasks(value, statusRef.current === "all" ? "" : statusRef.current);
    }, 300)
  ).current;

  const handleSearch = useCallback(
    (value: string) => {
      setStatus(value);
      debouncedFetchTasks(value);
    },
    [debouncedFetchTasks]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Update the state immediately
    handleSearch(e.target.value);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", mb: { xs: 1, sm: 0 } }}
        >
          Today
        </Typography>
        <Search
          sx={{
            borderRadius: "1.5rem",
            height: "1rem",
            p: 1,
            border: "1px solid lightgrey",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            padding: "0.5rem",
            "&:hover": {
              border: "1px solid lightgrey",
            },
          }}
        >
          <SearchIconWrapper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "0.5rem",
            }}
          >
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={handleInputChange}
          />
        </Search>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            p: 1,
            flexDirection: { xs: "row", sm: "row" },
          }}
        >
          {buttonConfigs.map((button) => (
            <Button
              key={button.value}
              onClick={() => handleFilter(button.value)}
              variant={status === button.value ? "contained" : "outlined"}
              sx={{
                background: status === button.value ? "#54ad34" : "lightgrey",
                color: "white",
                textTransform: "none",
                height: "2rem",
                border: "none",
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
