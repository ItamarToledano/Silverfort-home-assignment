import React from "react";
import { Shape, Color } from "../types";
interface ShapeRendererProps {
    shape: Shape;
    color: Color;
    size?: number;
}
declare const ShapeRenderer: React.FC<ShapeRendererProps>;
export default ShapeRenderer;
