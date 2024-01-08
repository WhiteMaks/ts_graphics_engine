import Cleanable from "../../../support/Cleanable";

interface IWebGLShader extends Cleanable {

	getShader(): WebGLShader;

}

export default IWebGLShader;