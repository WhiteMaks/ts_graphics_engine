import IShaderProgram from "../IShaderProgram";
import IShader from "../IShader";
import WebGLExt from "../../wrappers/WebGLExt";

class ShaderProgram implements IShaderProgram {
	private readonly gl: WebGLExt;
	private readonly program: WebGLProgram;
	private readonly locations: Map<string, WebGLUniformLocation>;
	private readonly vertexShader: IShader;
	private readonly fragmentShader: IShader;

	public constructor(gl: WebGLExt, vertexShader: IShader, fragmentShader: IShader) {
		this.locations = new Map<string, WebGLUniformLocation>();

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

	public setUniform4f(name: string, x: number, y: number, z: number, w: number): void {
		this.gl.uniform4f(this.getUniformLocation(name), x, y, z, w);
	}

	public setUniform1i(name: string, value: number): void {
		this.gl.uniform1i(this.getUniformLocation(name), value);
	}

	public setUniformMatrix4f(name: string, matrix: number[]): void {
		this.gl.uniformMatrix4fv(this.getUniformLocation(name), false, new Float32Array(matrix));
	}

	private getUniformLocation(name: string): WebGLUniformLocation {
		let location: WebGLUniformLocation | undefined = this.locations.get(name);

		if (!location) {
			location = this.gl.getUniformLocation(this.program, name);
			this.locations.set(name, location);
		}

		return location;
	}

	public clean(): void {
		this.vertexShader.clean();
		this.fragmentShader.clean();
		this.gl.deleteProgram(this.program);
	}
}

export default ShaderProgram;