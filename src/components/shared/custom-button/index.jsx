import { Button } from "@mui/material";
import PropTypes from "prop-types";

const CustomButton = ({ text, icon: Icon, variant = "primary", onClick, sx = {}, ...props }) => {
  return (
    <Button
      {...props}
      startIcon={Icon ? <Icon sx={{ fontSize: 16 }} /> : null}
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        fontSize: "0.875rem",
        px: 2.2,
        py: 1,
        borderRadius: "8px",
        minHeight: 38,
        lineHeight: 1,
        transition: "all 0.15s",
        ...(variant === "primary" && {
          bgcolor: "#DC2626",
          color: "#fff",
          border: "1px solid #DC2626",
          "&:hover": { bgcolor: "#B91C1C", borderColor: "#B91C1C" },
        }),
        ...(variant === "ghost" && {
          color: "#fff",
          bgcolor: "#18181B",
          border: "1px solid #27272A",
          "&:hover": { bgcolor: "#27272A", borderColor: "#3F3F46" },
        }),
        ...(variant === "outline" && {
          color: "#FAFAFA",
          bgcolor: "transparent",
          border: "1px solid #27272A",
          "&:hover": { bgcolor: "#18181B", borderColor: "#3F3F46" },
        }),
        ...(variant === "subtle" && {
          color: "#A1A1AA",
          bgcolor: "transparent",
          border: "1px solid transparent",
          "&:hover": { bgcolor: "#18181B", color: "#fff" },
        }),
        ...sx,
      }}
    >
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  variant: PropTypes.oneOf(["primary", "ghost", "outline", "subtle"]),
  onClick: PropTypes.func,
  sx: PropTypes.object,
};

export default CustomButton;
