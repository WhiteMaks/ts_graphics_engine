import GraphicsElement from "./gl/support/GraphicsElement";
import Cleanable from "./support/Cleanable";

/**
 * Интерфейс для работы с графической логикой
 */
interface IGraphicsLogic extends Cleanable {

	/**
	 * Инициализация графической логики
	 */
	init(graphicsElement: GraphicsElement): void;

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

export default IGraphicsLogic;