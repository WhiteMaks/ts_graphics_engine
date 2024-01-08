import Cleanable from "../support/Cleanable";
import BufferLayout from "./BufferLayout";

interface IBuffer extends Cleanable {

	/**
	 * Связать буфер
	 */
	bind(): void;

	/**
	 * Отвязать буфер
	 */
	unbind(): void;

	setLayout(layout: BufferLayout): void;

	getLayout(): BufferLayout;

	/**
	 * Количество элементов
	 */
	getCount(): number;

}

export default IBuffer;