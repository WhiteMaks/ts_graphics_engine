import Cleanable from "../support/Cleanable";

interface IShaderProgram extends Cleanable {

	bind(): void;

	unbind(): void;

	setUniform4f(name: string, x: number, y: number, z: number, w: number): void;

	setUniform1i(name: string, value: number): void;

}

export default IShaderProgram;