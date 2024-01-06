import GraphicsElement from "./gl/support/GraphicsElement";
import IGraphicsLogic from "./IGraphicsLogic";
import Vector4 from "../maths/impl/Vector4";

/**
 * Класс графического приложения
 */
class GraphicsApplication {
	/**
	 * Объект для работы с графическим элементом
	 * @private
	 */
	private readonly graphicElement: GraphicsElement;
	/**
	 * Объект для работы с логикой графического приложения
	 * @private
	 */
	private readonly logic: IGraphicsLogic;

	/**
	 * Идентификатор фрейма анимации
	 * @private
	 */
	private frame: number;

	/**
	 * Конструктор для создания объекта графического приложения
	 */
	public constructor(parentElement: HTMLElement, logic: IGraphicsLogic) {
		this.logic = logic; //сохранение логики приложения

		this.graphicElement = new GraphicsElement(
			parentElement
		);

		this.frame = 0;
	}

	/**
	 * Запуск графического приложения
	 */
	public start(): void {
		this.init();

		this.startNewFrame();
	}

	/**
	 * Установка нового цвета для пространства
	 * @param color цветовой вектор
	 */
	public setSpaceColor(color: Vector4): void {
		this.graphicElement.setSpaceColor(color);
	}

	/**
	 * Инициализация графического приложения внутри родительского вэб элемента
	 * @private
	 */
	private init(): void {
		this.graphicElement.init();

		this.logic.init(this.graphicElement);
	}

	/**
	 * Отправить запрос на отрисовку нового кадра
	 * @private
	 */
	private startNewFrame(): void {
		if (this.graphicElement.shouldBeClose()) {
			window.cancelAnimationFrame(this.frame);
			this.clean();
			return;
		}

		this.frame = window.requestAnimationFrame(
			(timestamp: number) => this.loop(timestamp)
		);
	}

	/**
	 * Цикл рендеринга
	 * @param timestamp времени с момента старта цикла
	 * @private
	 */
	private loop(timestamp: number): void {
		this.input();
		this.update(timestamp);
		this.render();
		this.endFrame();
		this.startNewFrame();
	}

	/**
	 * Обработка ввода
	 * @private
	 */
	private input(): void {
		this.logic.input();
	}

	/**
	 * Обновление кадра
	 * @param timestamp времени с момента старта цикла
	 * @private
	 */
	private update(timestamp: number): void {
		this.graphicElement.update();
		this.logic.update(timestamp);
	}

	/**
	 * Отрисовка кадра
	 * @private
	 */
	private render(): void {
		this.graphicElement.render();
		this.logic.render();
	}

	/**
	 * Завершить отрисовку кадра
	 * @private
	 */
	private endFrame(): void {

	}

	/**
	 * Отчистка ресурсов графического приложения
	 * @private
	 */
	private clean(): void {
		this.logic.clean();
	}

}

export default GraphicsApplication;