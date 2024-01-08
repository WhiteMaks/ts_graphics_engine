import Renderer from "../renderer/Renderer";
import IGraphicsContext from "../renderer/IGraphicsContext";
import RendererAPI from "../renderer/RendererAPI";
import WebGLContext from "../api/gl/renderer/impl/WebGLContext";
import WebGLRenderer from "../api/gl/renderer/ext/WebGLRenderer";

class RendererFactory {

	public static create(graphicsContext: IGraphicsContext): Renderer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLRenderer(gl)
			}
		}
	}

}

export default RendererFactory;