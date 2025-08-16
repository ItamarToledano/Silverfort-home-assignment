import React from "react";
import { Shape, Color } from "../types";
import { ShapeContainer } from "./styled";

interface ShapeRendererProps {
  shape: Shape;
  color: Color;
}

const SHAPE_SIZE = 60;

const ShapeRenderer: React.FC<ShapeRendererProps> = ({ shape, color }) => {
  const getShapePath = () => {
    const margin = 10;
    const center = SHAPE_SIZE / 2;
    const innerSize = SHAPE_SIZE - 2 * margin;

    const paths = {
      [Shape.TRIANGLE]: `M ${center} ${margin} L ${SHAPE_SIZE - margin} ${
        SHAPE_SIZE - margin
      } L ${margin} ${SHAPE_SIZE - margin} Z`,
      [Shape.SQUARE]: `M ${margin} ${margin} L ${
        SHAPE_SIZE - margin
      } ${margin} L ${SHAPE_SIZE - margin} ${SHAPE_SIZE - margin} L ${margin} ${
        SHAPE_SIZE - margin
      } Z`,
      [Shape.DIAMOND]: `M ${center} ${margin} L ${
        SHAPE_SIZE - margin
      } ${center} L ${center} ${SHAPE_SIZE - margin} L ${margin} ${center} Z`,
      [Shape.CIRCLE]: `M ${center} ${margin} A ${innerSize / 2} ${
        innerSize / 2
      } 0 0 1 ${center} ${SHAPE_SIZE - margin} A ${innerSize / 2} ${
        innerSize / 2
      } 0 0 1 ${center} ${margin}`,
    };

    return paths[shape] || "";
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
      <svg
        width={SHAPE_SIZE}
        height={SHAPE_SIZE}
        viewBox={`0 0 ${SHAPE_SIZE} ${SHAPE_SIZE}`}
      >
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
