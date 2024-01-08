import IGraphicsContext from "../renderer/IGraphicsContext";
import RendererAPI from "../renderer/RendererAPI";
import WebGLContext from "../api/gl/renderer/impl/WebGLContext";
import Renderer from "../renderer/Renderer";

class GraphicsContextFactory {

	public static createContext(canvasElement: HTMLCanvasElement): IGraphicsContext {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: return new WebGLContext(canvasElement);
		}
	}

}

export default GraphicsContextFactory;