import RendererAPI from "./RendererAPI";
import IArrayBuffer from "./IArrayBuffer";
import Vector4 from "../maths/impl/Vector4";
import IShaderProgram from "./IShaderProgram";
import ICamera from "../resource/ICamera";
import Matrix4 from "../maths/impl/Matrix4";

abstract class Renderer {
	private static rendererAPI: RendererAPI = RendererAPI.WEB_GL;

	protected viewProjectionMatrix: Matrix4;

	protected constructor() {
		this.viewProjectionMatrix = new Matrix4([]);
	}

	public static getAPI(): RendererAPI {
		return this.rendererAPI;
	}

	public static setAPI(api: RendererAPI): void {
		Renderer.rendererAPI = api;
	}

	public begin(camera: ICamera): void {
		this.viewProjectionMatrix = camera.getViewProjectionMatrix();
	}

	public end(): void {

	}

	public abstract setClearColor(color: Vector4): void;

	public abstract clear(): void;

	public abstract drawTriangles(shaderProgram: IShaderProgram, arrayBuffer: IArrayBuffer): void;
}

export default Renderer;