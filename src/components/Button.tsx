import { styled } from "utils/stitches.config";
export const Button = styled("button", {
  fontWeight: "$bold",
  transition: "all",
  transitionDuration: "0.1s",
  padding: "$2 $4",
  display: "flex",
  justifyContent: "center",

  "&:hover": {
    boxShadow: "$md",
  },

  "&:active": {
    transform: "translateY(2px)",
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary200",
        color: "$primary900",

        "&:hover, &:focus": {
          backgroundColor: "$primary300",
        },
      },
      secondary: {
        backgroundColor: "$secondary200",
        color: "$secondary900",

        "&:hover, &:focus": {
          backgroundColor: "$secondary300",
        },
      },
      ghost: {},
    },
    rounded: {
      default: {
        borderRadius: "$sm",
      },
      full: {
        borderRadius: "$full",
      },
      none: {},
    },
    kind: {
      filled: { boxShadow: "$sm" },
      outlined: {
        backgroundColor: "transparent",
        border: "solid currentcolor",
        borderWidth: "$2",
        boxShadow: "$sm",
      },
      ghost: {},
    },
    size: {
      small: {
        padding: "$1 $3",
        fontSize: "$sm",
      },
      default: {
        padding: "$2 $4",
      },
      large: {
        fontSize: "$xl",
        padding: "$3 $5",
        md: {
          fontSize: "$2xl",
          padding: "$6 $8",
        },
      },
    },
  },

  compoundVariants: [
    {
      variant: "primary",
      kind: "outlined",
      css: {
        "&:hover, &:focus": {
          backgroundColor: "$primary100",
        },
      },
    },
    {
      variant: "secondary",
      kind: "outlined",
      css: {
        "&:hover, &:focus": {
          backgroundColor: "$secondary100",
        },
      },
    },
  ],

  defaultVariants: {
    variant: "primary",
    rounded: "default",
    kind: "filled",
    size: "default",
  },
});
