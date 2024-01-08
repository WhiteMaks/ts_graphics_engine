import IWebGLShader from "../IWebGLShader";
import WebGLExt from "../../wrappers/WebGLExt";

class WebGLVertexShader implements IWebGLShader {
	private readonly gl: WebGLExt;
	private readonly vs: WebGLShader;

	public constructor(gl: WebGLExt, code: string) {
		this.gl = gl;
		this.vs = this.gl.createVertexShader();
		this.gl.setShaderSource(this.vs, code);
	}

	public getShader(): WebGLShader {
		return this.vs;
	}

	public clean(): void {
		this.gl.deleteShader(this.vs);
	}
}

export default WebGLVertexShader;