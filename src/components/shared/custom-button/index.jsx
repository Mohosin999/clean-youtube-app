import { Button } from "@mui/material";
import PropTypes from "prop-types";

const CustomButton = ({ text, icon: Icon, variant = "primary", ...props }) => {
  return (
    <Button
      {...props}
      startIcon={Icon ? <Icon fontSize="small" /> : null}
      sx={{
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.9rem",
        px: 2.5,
        py: 1,
        borderRadius: "10px",
        minHeight: 42,

        ...(variant === "primary" && {
          background: "linear-gradient(135deg, #ff9800, #ff6f00)",
          color: "#000",
          "&:hover": {
            background: "linear-gradient(135deg, #ffa726, #ff8f00)",
          },
        }),

        ...(variant === "ghost" && {
          color: "#fff",
          backgroundColor: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.12)",
          },
        }),

        ...(variant === "outline" && {
          color: "#ff9800",
          border: "1px solid rgba(255,152,0,0.6)",
          "&:hover": {
            backgroundColor: "rgba(255,152,0,0.08)",
          },
        }),
      }}
    >
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  variant: PropTypes.oneOf(["primary", "ghost", "outline"]),
};

export default CustomButton;
