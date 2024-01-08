import IBuffer from "./IBuffer";

interface IArrayBuffer extends IBuffer {

	addVertexBuffer(buffer: IBuffer): void;

	setIndexBuffer(buffer: IBuffer): void;

	getVertexBuffers(): IBuffer[];

	getIndexBuffer(): IBuffer;

}

export default IArrayBuffer;