import NumberType from "./NumberType";

interface VertexBufferElement {
	type: NumberType; //тип элементов
	size: number; //количество элементов для построения примитива
	normalized: boolean; //нормализованы ли данные (приведены к значению от 0 до 1)
}

export default VertexBufferElement;