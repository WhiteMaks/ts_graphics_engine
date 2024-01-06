import Cleanable from "../../support/Cleanable";

interface IShader extends Cleanable {

	getShader(): WebGLShader;

}

export default IShader;