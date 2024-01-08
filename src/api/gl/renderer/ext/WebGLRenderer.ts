import IArrayBuffer from "../../../../renderer/IArrayBuffer";
import IShaderProgram from "../../../../renderer/IShaderProgram";
import WebGLExt from "../../wrappers/WebGLExt";
import Renderer from "../../../../renderer/Renderer";

class WebGLRenderer extends Renderer {
	private readonly gl: WebGLExt;

	public constructor(gl: WebGLExt) {
		super();

		this.gl = gl;
	}

	public draw(arrayBuffer: IArrayBuffer, shaderProgram: IShaderProgram): void {
		shaderProgram!.bind()
		arrayBuffer.bind();
		// indexBuffer.bind();

		this.gl.drawTriangleElementsUshort(arrayBuffer.getIndexBuffer().getCount(), 0);
	}
}

export default WebGLRenderer;