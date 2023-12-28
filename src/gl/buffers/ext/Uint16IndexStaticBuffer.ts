import IndexStaticBuffer from "../impl/IndexStaticBuffer";
import WebGLExt from "../../wrappers/WebGLExt";

class Uint16IndexStaticBuffer extends IndexStaticBuffer {

	public constructor(gl: WebGLExt, data: number[]) {
		super(gl, new Uint16Array(data), data.length);
	}

}

export default Uint16IndexStaticBuffer;