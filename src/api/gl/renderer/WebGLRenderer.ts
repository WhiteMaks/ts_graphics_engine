import IArrayBuffer from "../../../renderer/IArrayBuffer";
import WebGLExt from "../wrappers/WebGLExt";
import Renderer from "../../../renderer/Renderer";
import Vector4 from "../../../maths/impl/Vector4";
import IShaderProgram from "../../../renderer/IShaderProgram";

class WebGLRenderer extends Renderer {
	private readonly gl: WebGLExt;

	public constructor(gl: WebGLExt) {
		super();

		this.gl = gl;
	}

	public clear(): void {
		this.gl.clearColorBuffer();
		this.gl.clearDepthBuffer();
	}

	public setClearColor(color: Vector4): void {
		this.gl.clearColor(color.getX(), color.getY(), color.getZ(), color.getW());
	}

	public drawTriangles(shaderProgram: IShaderProgram, arrayBuffer: IArrayBuffer): void {
		shaderProgram.bind();
		shaderProgram.setUniformMatrix4f("u_ModelViewProjectionMatrix", this.viewProjectionMatrix);

		arrayBuffer.bind();
		this.gl.drawTriangleElementsUshort(arrayBuffer.getIndexBuffer().getCount(), 0);
	}
}

export default WebGLRenderer;