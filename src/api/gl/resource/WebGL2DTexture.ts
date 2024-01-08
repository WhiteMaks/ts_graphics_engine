import ITexture from "../../../resource/ITexture";
import WebGLExt from "../wrappers/WebGLExt";

class WebGL2DTexture implements ITexture {
	private readonly gl: WebGLExt;
	private readonly texture: WebGLTexture;

	public constructor(gl: WebGLExt, image: HTMLImageElement) {
		this.gl = gl;

		this.texture = this.gl.createTexture();

		image.onload = () => {
			this.gl.bindTexture2D(this.texture);
			this.gl.tex2DParameteriMinFilterLinear();
			this.gl.tex2DParameteriMagFilterLinear();
			this.gl.tex2DParameteriWrapSClampToEdge();
			this.gl.tex2DParameteriWrapTClampToEdge();
			this.gl.texImage2DRGBAUbyte(0, image);
		}
	}

	public bind(slot: number): void {
		this.gl.activeTexture(slot);
		this.gl.bindTexture2D(this.texture);
	}

	public unbind(): void {
		this.gl.unbindTexture2D();
	}

	public clean(): void {
		this.gl.deleteTexture(this.texture);
	}

}

export default WebGL2DTexture;