import WebGLExt from "./wrappers/WebGLExt";
import GraphicsElement from "./support/GraphicsElement";
import Cleanable from "./support/Cleanable";

/**
 * Интерфейс для работы с графической логикой
 */
interface GraphicsLogic extends Cleanable {

	/**
	 * Инициализация графической логики
	 */
	init(gl: WebGLExt): void;

	/**
	 * Обработка логики связанной с пользовательской логикой
	 */
	input(): void;

	/**
	 * Обработка логики обновления кадра
	 * @param timestamp времени с момента старта цикла
	 */
	update(timestamp: number): void;

	/**
	 * Обработка логики отрисовки кадра
	 */
	render(): void;
}

export default GraphicsLogic;