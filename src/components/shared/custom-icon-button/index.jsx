import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * CustomIconButton Component
 * A reusable and customizable IconButton component for navigation with added styles and features.
 *
 * @param {string} to - The navigation path for the button.
 * @param {boolean} disabled - Whether the button is disabled. Defaults to `false`.
 * @param {string} size - The size of the button. Defaults to `"medium"`.
 * @param {React.ElementType} icon - The icon component to render inside the button.
 * @param {boolean} isSmallScreen - Indicates if the screen is small to adjust styles accordingly.
 * @param {object} additionalStyles - Additional styles to merge with default styles.
 * @param {string} title - Tooltip or title text for the button.
 */
const CustomIconButton = ({
  to,
  disabled = false,
  size = "medium",
  icon: Icon,
  isSmallScreen,
  additionalStyles = {},
  title,
}) => {
  // Default styles for the IconButton
  const defaultStyles = {
    backgroundColor: "#004445",
    color: "fff",
    "&:hover": { backgroundColor: "#081f37" },
    "&:disabled": { backgroundColor: "#666" },
    width: isSmallScreen ? "32px" : "42px",
    height: isSmallScreen ? "32px" : "42px",
  };

  return (
    <IconButton
      to={to}
      component={Link}
      disabled={disabled}
      size={isSmallScreen ? "small" : size}
      title={title}
      sx={{ ...defaultStyles, ...additionalStyles }}
    >
      <Icon
        fontSize={isSmallScreen ? "small" : "medium"}
        sx={{ color: "#fff" }}
      />
    </IconButton>
  );
};

// Prop validation using PropTypes
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
