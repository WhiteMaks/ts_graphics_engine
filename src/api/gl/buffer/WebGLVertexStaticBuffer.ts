import IBuffer from "../../../renderer/IBuffer";
import WebGLExt from "../wrappers/WebGLExt";
import BufferLayout from "../../../renderer/BufferLayout";

class WebGLVertexStaticBuffer implements IBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLBuffer;
	private readonly count: number;

	private layout: BufferLayout | null;

	public constructor(gl: WebGLExt, data: BufferSource, count: number) {
		this.gl = gl;
		this.buffer = gl.createBuffer();
		this.count = count;
		this.layout = null;

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

	public setLayout(layout: BufferLayout): void {
		this.layout = layout;
	}

	public getLayout(): BufferLayout {
		return this.layout!;
	}
}

export default WebGLVertexStaticBuffer;