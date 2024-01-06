import Vector4 from "../../maths/impl/Vector4";
import WebGLExt from "../gl/wrappers/WebGLExt";

interface IGraphicsContext {

	init(): void;

	clearColorBuffer(): void;

	clearDepthBuffer(): void;

	setViewport(x: number, y: number, width: number, height: number): void;

	clearColor(color: Vector4): void;

	printDebugInfo(): void;

	/**
	 * @deprecated
	 */
	getGL(): WebGLExt;
}

export default IGraphicsContext;