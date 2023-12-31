import VertexBufferElement from "./support/VertexBufferElement";

interface IBufferLayout {

	pushFloat(size: number, normalized: boolean): void;

	pushUint(size: number, normalized: boolean): void;

	getElements(): VertexBufferElement[];

	getStride(): number;
}

export default IBufferLayout;