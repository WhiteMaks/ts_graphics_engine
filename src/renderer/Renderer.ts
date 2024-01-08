import RendererAPI from "./RendererAPI";
import IArrayBuffer from "./IArrayBuffer";
import IShaderProgram from "./IShaderProgram";

abstract class Renderer {
	private static rendererAPI: RendererAPI = RendererAPI.WEB_GL;

	public static getAPI(): RendererAPI {
		return this.rendererAPI;
	}

	public static setAPI(api: RendererAPI): void {
		Renderer.rendererAPI = api;
	}

	public abstract draw(arrayBuffer: IArrayBuffer, shaderProgram: IShaderProgram): void;
}

export default Renderer;