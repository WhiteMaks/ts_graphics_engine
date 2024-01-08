import BufferElement from "./BufferElement";

class BufferLayout {
	private readonly elements: BufferElement[];

	private stride: number;

	public constructor(elements: BufferElement[]) {
		this.elements = elements;
		this.stride = 0;

		this.calculateStride();
	}

	public getElements(): BufferElement[] {
		return this.elements;
	}

	public getStride(): number {
		return this.stride;
	}

	private calculateStride(): void {
		let offset = 0;

		for (const element of this.elements) {
			element.offset = offset;
			offset += element.size;
			this.stride += element.size
		}
	}
}

export default BufferLayout;