import IGraphicsContext from "../../renderer/IGraphicsContext";
import WebGLExt from "../wrappers/WebGLExt";
import Vector4 from "../../../maths/impl/Vector4";

class WebGLContext implements IGraphicsContext {
	/**
	 * Canvas вэб элемент
	 * @private
	 */
	private readonly canvasElement: HTMLCanvasElement;
	/**
	 * Объект для работы с WebGL
	 * @private
	 */
	private readonly gl: WebGLExt;

	public constructor(canvasElement: HTMLCanvasElement) {
		this.canvasElement = canvasElement;

		const webGLContext = this.canvasElement.getContext("webgl2"); //получение контекста для работы с WebGL

		//если выбранный контекст не проинициализирован, значит либо его не существует, либо браузер не может с ним работать
		if (!webGLContext) {
			throw new Error("Невозможно проинициализировать WebGL. Данный браузер не поддерживает данный контекст [ webgl2 ]");
		}

		//инициализация объекта WebGL с выбранным контекстом
		this.gl = new WebGLExt(
			webGLContext //выбранный контекст
		);
	}

	public init(): void {
		this.gl.enableDepthTest(); //включение проверки удаленности объектов
		this.gl.enableBlend(); //включение смешивания пикселей
		this.gl.blendFuncSrcAlphaOneMinusSrcAlpha(); //включение прозрачности
	}

	public clearColorBuffer(): void {
		this.gl.clearColorBuffer();
	}

	public clearDepthBuffer(): void {
		this.gl.clearDepthBuffer();
	}

	public setViewport(x: number, y: number, width: number, height: number): void {
		this.gl.setViewport(x, y, width, height);
	}

	public clearColor(color: Vector4): void {
		this.gl.clearColorWithAlpha(color.getX(), color.getY(), color.getZ(), color.getW());
	}

	public getGL(): WebGLExt {
		return this.gl;
	}

}

export default WebGLContext;