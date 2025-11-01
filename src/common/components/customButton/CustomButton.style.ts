import styled from "styled-components";

const MyDiv = styled.div<{
  bgColor?: string;
  color?: string;
  hoverBg?: string;
  width?: string;
  height?: string;
  fontSize?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  .chakra-button {
    font-family: "Poppins", sans-serif;
    font-size: ${({ fontSize }) => fontSize};
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.25s ease-in-out;

    &.chakra-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &.primary .chakra-button {
    background-color: #2482fd;
    color: #fff;
    &:hover {
      background-color: #1b6edb;
    }
  }

  &.secondary .chakra-button {
    background-color: #cfd1d5ff;
    color: #1d2939;
    &:hover {
      background-color: #e5e7eb;
    }
  }

  &.outline .chakra-button {
    background-color: transparent;
    border: 1.5px solid #2482fd;
    color: #2482fd;
    &:hover {
      background-color: rgba(36, 130, 253, 0.08);
    }
  }

  &.danger .chakra-button {
    background-color: #ef4444;
    color: #fff;
    &:hover {
      background-color: #dc2626;
    }
  }

  ${({ bgColor, color, hoverBg }) =>
    bgColor &&
    `
    .chakra-button {
      background-color: ${bgColor} !important;
      color: ${color || "#fff"} !important;
    }
    .chakra-button:hover {
      background-color: ${hoverBg || bgColor} !important;
      opacity: 0.9;
    }
  `}

  .icon-left,
  .icon-right {
    display: inline-flex;
    align-items: center;
  }

  .icon-left {
    margin-right: 6px;
  }

  .icon-right {
    margin-left: 6px;
  }
`;

export default MyDiv;
