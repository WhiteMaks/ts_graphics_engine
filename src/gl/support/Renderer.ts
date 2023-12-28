import IArrayBuffer from "../buffers/IArrayBuffer";
import IBuffer from "../buffers/IBuffer";
import IShaderProgram from "../shaders/IShaderProgram";
import WebGLExt from "../wrappers/WebGLExt";

class Renderer {
	private readonly gl: WebGLExt;

	public constructor(gl: WebGLExt) {
		this.gl = gl;
	}

	public draw(arrayBuffer: IArrayBuffer, indexBuffer: IBuffer, shaderProgram: IShaderProgram): void {
		shaderProgram!.bind()
		arrayBuffer.bind();
		indexBuffer.bind();

		this.gl.drawTriangleElementsUshort(indexBuffer.getCount(), 0);
	}
}

export default Renderer;