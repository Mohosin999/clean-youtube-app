import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const CustomIconButton = ({ to, disabled = false, size = "medium", icon: Icon, isSmallScreen, additionalStyles = {}, title }) => {
  const defaultStyles = {
    background: "linear-gradient(135deg,#3B82F6,#06B6D4)",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(59,130,246,0.3)",
    "&:hover": { background: "linear-gradient(135deg,#2563EB,#0891B2)", transform: "translateY(-1px)" },
    "&:disabled": { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", boxShadow: "none" },
    width: isSmallScreen ? 36 : 44,
    height: isSmallScreen ? 36 : 44,
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "all 0.2s",
  };
  return (
    <IconButton to={to} component={Link} disabled={disabled} size={isSmallScreen ? "small" : size} title={title} sx={{ ...defaultStyles, ...additionalStyles }}>
      <Icon fontSize={isSmallScreen ? "small" : "medium"} sx={{ color: "#fff" }} />
    </IconButton>
  );
};

CustomIconButton.propTypes = {
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.elementType.isRequired,
  isSmallScreen: PropTypes.bool,
  additionalStyles: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default CustomIconButton;
