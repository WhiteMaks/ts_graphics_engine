import WebGLExt from "../wrappers/WebGLExt";
import Vector4 from "../maths/impl/Vector4";

/**
 * Класс для создания нового графического элемента и взаимодействия с ним
 */
class GraphicsElement {

	/**
	 * Canvas вэб элемент
	 * @private
	 */
	private readonly canvasElement: HTMLCanvasElement;
	/**
	 * Родительский элемент (в который необходимо встроить canvas)
	 * @private
	 */
	private readonly parentElement: HTMLElement;

	/**
	 * Объект для работы с WebGL
	 * @private
	 */
	private readonly gl: WebGLExt;

	/**
	 * Объект для хранения цвета пространства
	 * @private
	 */
	private spaceColor: Vector4;

	/**
	 * Конструктор для создания объекта графического элемента в родительском элементе
	 * @param parentElement родительский элемент
	 */
	public constructor(parentElement: HTMLElement) {
		this.parentElement = parentElement;

		this.canvasElement = document.createElement("canvas"); //создание вэб элемента canvas
		this.canvasElement.style.display = "block";
		this.canvasElement.style.width = "100%";
		this.canvasElement.style.height = "100%";
		//запрет на получение контекст меню при нажатии на правую кнопку мыши, так как права кнопка мыши может быть использована для вращения камерой
		this.canvasElement.oncontextmenu = function () {
			return false
		};

		const webGLContext = this.canvasElement.getContext("webgl2"); //получение контекста для работы с WebGL

		//если выбранный контекст не проинициализирован, значит либо его не существует, либо браузер не может с ним работать
		if (!webGLContext) {
			throw new Error("Невозможно проинициализировать WebGL. Данный браузер не поддерживает данный контекст [ webgl2 ]");
		}

		//инициализация объекта WebGL с выбранным контекстом
		this.gl = new WebGLExt(
			webGLContext //выбранный контекст
		);
		this.gl.enableDepthTest(); //включение проверки удаленности объектов
		this.gl.enableBlend(); //включение смешивания пикселей
		this.gl.blendFuncSrcAlphaOneMinusSrcAlpha(); //включение прозрачности

		this.spaceColor = new Vector4(0, 0, 0, 1);
	}

	/**
	 * Проверка на то что графический элемент должен быть закрыт
	 */
	public shouldBeClose(): boolean {
		return this.canvasElement.offsetParent == null;
	}

	/**
	 * Инициализация графического элемента
	 */
	public init(): void {
		this.destroy();
		this.embedToElement();
		this.addListenerResizeWindow();
	}

	/**
	 * Отрисовка графического элемента
	 */
	public render(): void {
		this.setClearColor(this.spaceColor);

		this.gl.clearColorBuffer();
		this.gl.clearDepthBuffer();
	}

	/**
	 * Получение объекта WebGL
	 */
	public getWebGL(): WebGLExt {
		return this.gl;
	}

	/**
	 * Получение ширины графического элемента
	 */
	public getWidth(): number {
		return this.canvasElement.width;
	}

	/**
	 * Получение высоты графического элемента
	 */
	public getHeight(): number {
		return this.canvasElement.height;
	}

	/**
	 * Обновление графического элемента
	 */
	public update(): void {

	}

	/**
	 * Уничтожение графического элемента
	 */
	public destroy(): void {
		const canvasElement = this.parentElement.lastElementChild;
		if (canvasElement) {
			this.parentElement.removeChild(canvasElement);
		}
	}

	/**
	 * Установка нового цвета для пространства
	 * @param color цветовой вектор
	 */
	public setSpaceColor(color: Vector4): void {
		this.spaceColor = color;
	}

	public getCanvasElement(): HTMLCanvasElement {
		return this.canvasElement;
	}

	/**
	 * Встраивание графического элемента (canvas) в родительский элемент
	 * @private
	 */
	private embedToElement(): void {
		this.parentElement.append(this.canvasElement); //встраивание canvas элемента внутрь родительского

		this.resizeCanvasElement(); //заполнение canvas элемента под размер родительского
	}

	/**
	 * Добавление слушателя на изменение окна браузера
	 * @private
	 */
	private addListenerResizeWindow(): void {
		window.addEventListener(
			"resize",
			() =>
				this.resizeCanvasElement()
		);
	}

	private setClearColor(color: Vector4) {
		this.gl.clearColorWithAlpha(
			color.getX(),
			color.getY(),
			color.getZ(),
			color.getW()
		);
	}

	/**
	 * Обновление области просмотра
	 * @private
	 */
	private updateViewport() {
		this.gl.setViewport(
			0,
			0,
			this.canvasElement.width,
			this.canvasElement.height
		);
	}

	/**
	 * Обновление размеров canvas элемента
	 * @private
	 */
	private resizeCanvasElement(): void {
		this.canvasElement.width = this.parentElement.offsetWidth; //задание длины для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента
		this.canvasElement.height = this.parentElement.offsetHeight; //задание высоты для canvas элемента таким же как у родительского, таким образом canvas всегда будет занимать все пространство родительского элемента

		this.updateViewport();
	}
}

export default GraphicsElement;