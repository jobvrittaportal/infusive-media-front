import React from "react";
import { Button, ButtonProps, Spinner } from "@chakra-ui/react";
import MyDiv from "./CustomButton.style";

interface CustomButtonProps
  extends Omit<ButtonProps, "leftIcon" | "rightIcon"> {
  label: string;
  variantType?: "primary" | "secondary" | "outline" | "danger";
  bgColor?: string;
  color?: string;
  hoverBg?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  variantType = "primary",
  bgColor,
  color,
  hoverBg,
  width = "auto",
  height = "40px",
  fontSize = "14px",
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  ...rest
}) => {
  return (
    <MyDiv
      className={`custom-button ${variantType}`}
      bgColor={bgColor}
      color={color}
      hoverBg={hoverBg}
      width={width}
      height={height}
      fontSize={fontSize}
    >
      <Button
        width="100%"
        height="100%"
        borderRadius="8px"
        fontWeight="500"
        isDisabled={loading || disabled}
        {...rest}
      >
        {loading ? (
          <>
            <Spinner size="sm" color="white" mr={2} />
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="icon-left">{leftIcon}</span>}
            {label}
            {rightIcon && <span className="icon-right">{rightIcon}</span>}
          </>
        )}
      </Button>
    </MyDiv>
  );
};

export default CustomButton;
