import IShaderProgram from "../../../renderer/IShaderProgram";
import IWebGLShader from "./IWebGLShader";
import WebGLExt from "../wrappers/WebGLExt";
import Vector4 from "../../../maths/impl/Vector4";
import Vector3 from "../../../maths/impl/Vector3";
import Matrix4 from "../../../maths/impl/Matrix4";

class WebGLShaderProgram implements IShaderProgram {
	private readonly locationsCache: Map<string, WebGLUniformLocation>;
	private readonly gl: WebGLExt;
	private readonly program: WebGLProgram;
	private readonly vertexShader: IWebGLShader;
	private readonly fragmentShader: IWebGLShader;

	public constructor(gl: WebGLExt, vertexShader: IWebGLShader, fragmentShader: IWebGLShader) {
		this.locationsCache = new Map<string, WebGLUniformLocation>();

		this.gl = gl;
		this.vertexShader = vertexShader;
		this.fragmentShader = fragmentShader;
		this.program = this.gl.createProgram();
		this.gl.attachShader(this.program, this.vertexShader.getShader());
		this.gl.attachShader(this.program, this.fragmentShader.getShader());
		this.gl.linkProgram(this.program);

		this.vertexShader.clean();
		this.fragmentShader.clean();
	}

	public bind(): void {
		this.gl.useProgram(this.program);
	}

	public unbind(): void {
		this.gl.removeProgram();
	}

	public setUniform3f(name: string, vector: Vector3): void {
		this.gl.uniform3f(this.getUniformLocation(name), vector);
	}

	public setUniform4f(name: string, vector: Vector4): void {
		this.gl.uniform4f(this.getUniformLocation(name), vector);
	}

	public setUniform1i(name: string, value: number): void {
		this.gl.uniform1i(this.getUniformLocation(name), value);
	}

	public setUniformMatrix4f(name: string, matrix: Matrix4): void {
		this.gl.uniformMatrix4fv(this.getUniformLocation(name), false, new Float32Array(matrix.getArray()));
	}

	private getUniformLocation(name: string): WebGLUniformLocation {
		let location: WebGLUniformLocation | undefined = this.locationsCache.get(name);

		if (!location) {
			location = this.gl.getUniformLocation(this.program, name);
			this.locationsCache.set(name, location);
		}

		return location;
	}

	public clean(): void {
		this.vertexShader.clean();
		this.fragmentShader.clean();
		this.gl.deleteProgram(this.program);
	}
}

export default WebGLShaderProgram;