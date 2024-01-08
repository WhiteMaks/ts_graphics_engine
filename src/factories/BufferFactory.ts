import IBuffer from "../renderer/IBuffer";
import Renderer from "../renderer/Renderer";
import RendererAPI from "../renderer/RendererAPI";
import IGraphicsContext from "../renderer/IGraphicsContext";
import WebGLContext from "../api/gl/renderer/impl/WebGLContext";
import WebGLFloat32VertexStaticBuffer from "../api/gl/renderer/ext/WebGLFloat32VertexStaticBuffer";
import WebGLUint16IndexStaticBuffer from "../api/gl/renderer/ext/WebGLUint16IndexStaticBuffer";
import IArrayBuffer from "../renderer/IArrayBuffer";
import WebGLVertexArrayBuffer from "../api/gl/renderer/impl/WebGLVertexArrayBuffer";

class BufferFactory {

	public static createFloat32VertexStaticBuffer(graphicsContext: IGraphicsContext, data: number[]): IBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLFloat32VertexStaticBuffer(gl, data)
			}
		}
	}

	public static createUint16IndexStaticBuffer(graphicsContext: IGraphicsContext, data: number[]): IBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLUint16IndexStaticBuffer(gl, data)
			}
		}
	}

	public static createVertexArrayBuffer(graphicsContext: IGraphicsContext): IArrayBuffer {
		switch (Renderer.getAPI()) {
			case RendererAPI.WEB_GL: {
				const gl = (graphicsContext as WebGLContext).getGL();
				return new WebGLVertexArrayBuffer(gl)
			}
		}
	}

}

export default BufferFactory;