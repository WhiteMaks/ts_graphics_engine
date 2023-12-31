import Cleanable from "../support/Cleanable";

interface IBuffer extends Cleanable {

	/**
	 * Связать буфер
	 */
	bind(): void;

	/**
	 * Отвязать буфер
	 */
	unbind(): void;

	/**
	 * Количество элементов
	 */
	getCount(): number;

}

export default IBuffer;