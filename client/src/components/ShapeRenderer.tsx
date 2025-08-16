import React from "react";
import { Shape, Color } from "../types";
import { ShapeContainer } from "./styled";

interface ShapeRendererProps {
  shape: Shape;
  color: Color;
  size?: number;
}

const ShapeRenderer: React.FC<ShapeRendererProps> = ({
  shape,
  color,
  size = 60,
}) => {
  const getShapePath = () => {
    switch (shape) {
      case Shape.TRIANGLE:
        return `M ${size / 2} 10 L ${size - 10} ${size - 10} L 10 ${
          size - 10
        } Z`;
      case Shape.SQUARE:
        return `M 10 10 L ${size - 10} 10 L ${size - 10} ${size - 10} L 10 ${
          size - 10
        } Z`;
      case Shape.DIAMOND:
        return `M ${size / 2} 10 L ${size - 10} ${size / 2} L ${size / 2} ${
          size - 10
        } L 10 ${size / 2} Z`;
      case Shape.CIRCLE:
        return `M ${size / 2} 10 A ${size / 2 - 10} ${size / 2 - 10} 0 0 1 ${
          size / 2
        } ${size - 10} A ${size / 2 - 10} ${size / 2 - 10} 0 0 1 ${
          size / 2
        } 10`;
      default:
        return "";
    }
  };

  const getColorValue = () => {
    switch (color) {
      case Color.RED:
        return "#ff4757";
      case Color.GREEN:
        return "#2ed573";
      case Color.BLUE:
        return "#3742fa";
      case Color.YELLOW:
        return "#ffa502";
      default:
        return "#000";
    }
  };

  return (
    <ShapeContainer>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={getShapePath()}
          fill={getColorValue()}
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </ShapeContainer>
  );
};

export default ShapeRenderer;
