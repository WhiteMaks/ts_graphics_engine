import WebGLVertexStaticBuffer from "../impl/WebGLVertexStaticBuffer";
import WebGLExt from "../../wrappers/WebGLExt";

class WebGLFloat32VertexStaticBuffer extends WebGLVertexStaticBuffer {

	public constructor(gl: WebGLExt, data: number[]) {
		super(gl, new Float32Array(data), data.length);
	}

}

export default WebGLFloat32VertexStaticBuffer;