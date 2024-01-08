import RendererAPI from "./RendererAPI";
import IArrayBuffer from "./IArrayBuffer";
import Vector4 from "../maths/impl/Vector4";

abstract class Renderer {
	private static rendererAPI: RendererAPI = RendererAPI.WEB_GL;

	public static getAPI(): RendererAPI {
		return this.rendererAPI;
	}

	public static setAPI(api: RendererAPI): void {
		Renderer.rendererAPI = api;
	}

	public abstract begin(): void;

	public abstract end(): void;

	public abstract setClearColor(color: Vector4): void;

	public abstract clear(): void;

	public abstract submitArrayBuffer(arrayBuffer: IArrayBuffer): void;
}

export default Renderer;