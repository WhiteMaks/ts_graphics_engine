import VertexStaticBuffer from "../impl/VertexStaticBuffer";
import WebGLExt from "../../wrappers/WebGLExt";

class Float32VertexStaticBuffer extends VertexStaticBuffer {

	public constructor(gl: WebGLExt, data: number[]) {
		super(gl, new Float32Array(data), data.length);
	}

}

export default Float32VertexStaticBuffer;