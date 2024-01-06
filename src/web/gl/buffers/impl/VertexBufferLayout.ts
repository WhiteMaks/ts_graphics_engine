import IBufferLayout from "../IBufferLayout";
import VertexBufferElement from "../support/VertexBufferElement";
import NumberType from "../support/NumberType";

class VertexBufferLayout implements IBufferLayout {
	private readonly elements: VertexBufferElement[];

	private stride;

	public constructor() {
		this.elements = [];
		this.stride = 0;
	}

	public pushFloat(size: number, normalized: boolean): void {
		this.elements.push({
			type: NumberType.FLOAT,
			size: size,
			normalized: normalized
		});
		this.stride += size * NumberType.FLOAT.valueOf();
	}

	public pushUint(size: number, normalized: boolean): void {
		this.elements.push({
			type: NumberType.UNSIGNED_INT,
			size: size,
			normalized: normalized
		});
		this.stride += size * NumberType.UNSIGNED_INT.valueOf();

	}

	public getElements(): VertexBufferElement[] {
		return this.elements;
	}

	public getStride(): number {
		return this.stride;
	}
}

export default VertexBufferLayout;