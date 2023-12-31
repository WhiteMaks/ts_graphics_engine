import IShader from "../IShader";
import WebGLExt from "../../wrappers/WebGLExt";

class FragmentShader implements IShader {
	private readonly gl: WebGLExt;
	private readonly vs: WebGLShader;

	public constructor(gl: WebGLExt, code: string) {
		this.gl = gl;
		this.vs = this.gl.createFragmentShader();
		this.gl.setShaderSource(this.vs, code);
	}

	public getShader(): WebGLShader {
		return this.vs;
	}

	public clean(): void {
		this.gl.deleteShader(this.vs);
	}
}

export default FragmentShader;