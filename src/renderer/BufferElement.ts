import ShaderDataType from "../support/ShaderDataType";

interface BufferElement {
	name: string;
	type: ShaderDataType;
	size: number;
	offset: number;
	normalized: boolean;
}

export function createBufferElement(type: ShaderDataType, name: string, normalized: boolean = false): BufferElement {
	return {
		type: type,
		name: name,
		size: type.valueOf(),
		offset: 0,
		normalized: normalized
	};
}

export default BufferElement;