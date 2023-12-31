import WebGLExt from "../../wrappers/WebGLExt";
import IArrayBuffer from "../IArrayBuffer";
import IBuffer from "../IBuffer";
import IBufferLayout from "../IBufferLayout";
import NumberType from "../support/NumberType";

class VertexArrayBuffer implements IArrayBuffer {
	private readonly gl: WebGLExt;
	private readonly buffer: WebGLVertexArrayObject;

	public constructor(gl: WebGLExt) {
		this.gl = gl;

		this.buffer = gl.createVertexArray();

		this.bind();
	}

	public getCount(): number {
        return 0;
    }

	public addBuffer(buffer: IBuffer, layout: IBufferLayout): void {
		this.bind();

		buffer.bind();

		const elements = layout.getElements();

		let offset = 0;
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i];

			this.gl.enableVertexAttribArray(i);

			switch (element.type) {
				case NumberType.FLOAT: {
					this.gl.vertexAttribPointerFloat(i, element.size, element.normalized, layout.getStride(), offset);
					break;
				}
				case NumberType.UNSIGNED_INT: {
					this.gl.vertexAttribPointerUint(i, element.size, element.normalized, layout.getStride(), offset);
					break;
				}
				default: {
					throw new Error("NumberType [ " + element.type + " ] not supported");
				}
			}

			offset += element.size * element.type.valueOf();
		}
	}

	public bind(): void {
		this.gl.bindVertexArray(this.buffer);
	}

	public unbind(): void {
		this.gl.unbindVertexArray();
	}

	public clean(): void {
		this.gl.deleteVertexArray(this.buffer);
	}
}

export default VertexArrayBuffer;