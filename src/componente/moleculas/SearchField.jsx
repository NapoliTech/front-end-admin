import React, { useState, useEffect } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Box,
  Chip,
  Tooltip,
  Fade,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  TuneRounded as FilterIcon,
  Person as PersonIcon,
  Tag as TagIcon,
  CalendarToday as CalendarIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";

const SearchField = ({ onSearch, placeholder = "Buscar pedidos..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showClear, setShowClear] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  const filterOptions = [
    { id: "cliente", label: "Cliente", icon: <PersonIcon fontSize="small" /> },
    { id: "codigo", label: "Código", icon: <TagIcon fontSize="small" /> },
    { id: "data", label: "Data", icon: <CalendarIcon fontSize="small" /> },
    {
      id: "entrega",
      label: "Tipo de Entrega",
      icon: <ShippingIcon fontSize="small" />,
    },
  ];

  // Efeito para mostrar/esconder o botão de limpar
  useEffect(() => {
    setShowClear(searchTerm.length > 0);
  }, [searchTerm]);

  // Efeito para atualizar a pesquisa quando o termo ou filtros mudam
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch({ term: searchTerm, filters: activeFilters });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeFilters, onSearch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch({ term: "", filters: activeFilters });
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filterId) => {
    if (activeFilters.includes(filterId)) {
      setActiveFilters(activeFilters.filter((id) => id !== filterId));
    } else {
      setActiveFilters([...activeFilters, filterId]);
    }
    handleFilterClose();
  };

  const handleRemoveFilter = (filterId) => {
    setActiveFilters(activeFilters.filter((id) => id !== filterId));
  };

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Paper
        elevation={1}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: 2,
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
          },
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          inputProps={{ "aria-label": "buscar pedidos" }}
        />
        <Fade in={showClear}>
          <IconButton
            sx={{ p: "10px" }}
            aria-label="limpar busca"
            onClick={handleClearSearch}
          >
            <ClearIcon />
          </IconButton>
        </Fade>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <Tooltip title="Filtros de busca">
          <IconButton
            color={activeFilters.length > 0 ? "primary" : "default"}
            sx={{ p: "10px" }}
            aria-label="filtros"
            onClick={handleFilterClick}
          >
            <FilterIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {filterOptions.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleFilterSelect(option.id)}
              selected={activeFilters.includes(option.id)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Paper>

      {activeFilters.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
          {activeFilters.map((filterId) => {
            const filter = filterOptions.find((opt) => opt.id === filterId);
            return (
              <Chip
                key={filterId}
                icon={filter.icon}
                label={filter.label}
                size="small"
                onDelete={() => handleRemoveFilter(filterId)}
                color="primary"
                variant="outlined"
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SearchField;
