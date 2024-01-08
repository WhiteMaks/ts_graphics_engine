import WebGLIndexStaticBuffer from "../impl/WebGLIndexStaticBuffer";
import WebGLExt from "../../wrappers/WebGLExt";

class WebGLUint16IndexStaticBuffer extends WebGLIndexStaticBuffer {

	public constructor(gl: WebGLExt, data: number[]) {
		super(gl, new Uint16Array(data), data.length);
	}

}

export default WebGLUint16IndexStaticBuffer;