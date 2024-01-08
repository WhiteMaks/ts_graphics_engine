import IShaderProgram from "../renderer/IShaderProgram";
import IGraphicsContext from "../renderer/IGraphicsContext";
import Renderer from "../renderer/Renderer";
import RendererAPI from "../renderer/RendererAPI";
import WebGLContext from "../api/gl/renderer/impl/WebGLContext";
import IWebGLShader from "../api/gl/renderer/IWebGLShader";
import WebGLVertexShader from "../api/gl/renderer/impl/WebGLVertexShader";
import WebGLFragmentShader from "../api/gl/renderer/impl/WebGLFragmentShader";
import WebGLShaderProgram from "../api/gl/renderer/impl/WebGLShaderProgram";

class ShaderProgramFactory {

	public static createProgram(graphicsContext: IGraphicsContext, vertexShaderCode: string, fragmentShaderCode: string): IShaderProgram {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				const vertexShader: IWebGLShader = new WebGLVertexShader(gl, vertexShaderCode);
				const fragmentShader: IWebGLShader = new WebGLFragmentShader(gl, fragmentShaderCode);
				return new WebGLShaderProgram(gl, vertexShader, fragmentShader);
			}
		}
	}

}

export default ShaderProgramFactory;