import IBuffer from "../IBuffer";
import WebGLExt from "../../wrappers/WebGLExt";

class IndexStaticBuffer implements IBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLBuffer;
	private readonly count;

	public constructor(gl: WebGLExt, data: BufferSource, count: number) {
		this.gl = gl;
		this.buffer = gl.createBuffer();
		this.count = count;

		this.bind();
		gl.elementArrayBufferStaticData(data);
	}

	public bind(): void {
		this.gl.bindElementArrayBuffer(this.buffer);
	}

	public unbind(): void {
		this.gl.bindElementArrayBuffer(this.buffer);
	}

	public getCount(): number {
		return this.count;
	}

	public clean(): void {
		this.gl.deleteBuffer(this.buffer);
	}
}

export default IndexStaticBuffer;