import IGraphicsContext from "../renderer/IGraphicsContext";
import ITexture from "../resource/ITexture";
import Renderer from "../renderer/Renderer";
import RendererAPI from "../renderer/RendererAPI";
import WebGLContext from "../api/gl/renderer/WebGLContext";
import WebGL2DTexture from "../api/gl/resource/WebGL2DTexture";

class ResourceFactory {

	public static create2DTexture(graphicsContext: IGraphicsContext, image: HTMLImageElement): ITexture {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGL2DTexture(gl, image)
			}
		}
	}

}

export default ResourceFactory;