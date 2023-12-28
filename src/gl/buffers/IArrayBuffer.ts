import IBuffer from "./IBuffer";
import IBufferLayout from "./IBufferLayout";

interface IArrayBuffer extends IBuffer {

	addBuffer(buffer: IBuffer, layout: IBufferLayout): void;

}

export default IArrayBuffer;