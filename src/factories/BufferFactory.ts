import IBuffer from "../renderer/IBuffer";
import Renderer from "../renderer/Renderer";
import RendererAPI from "../renderer/RendererAPI";
import IGraphicsContext from "../renderer/IGraphicsContext";
import WebGLContext from "../api/gl/renderer/WebGLContext";
import IArrayBuffer from "../renderer/IArrayBuffer";
import WebGLVertexArrayBuffer from "../api/gl/buffer/WebGLVertexArrayBuffer";
import WebGLUint16IndexStaticBuffer from "../api/gl/buffer/WebGLUint16IndexStaticBuffer";
import WebGLFloat32VertexStaticBuffer from "../api/gl/buffer/WebGLFloat32VertexStaticBuffer";

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