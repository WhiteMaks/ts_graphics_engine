import IBuffer from "../IBuffer";
import WebGLExt from "../../wrappers/WebGLExt";

class VertexStaticBuffer implements IBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLBuffer;
	private readonly count: number;

	public constructor(gl: WebGLExt, data: BufferSource, count: number) {
		this.gl = gl;
		this.buffer = gl.createBuffer();
		this.count = count;

		this.bind();

		gl.arrayBufferStaticData(data);
	}

	public bind(): void {
		this.gl.bindArrayBuffer(this.buffer);
	}

	public unbind(): void {
		this.gl.unbindArrayBuffer();
	}

	public getCount(): number {
		return this.count;
	}

	public clean(): void {
		this.gl.deleteBuffer(this.buffer);
	}
}

export default VertexStaticBuffer;