import Cleanable from "../../support/Cleanable";
import Vector4 from "../../../maths/impl/Vector4";
import Vector3 from "../../../maths/impl/Vector3";
import Matrix4 from "../../../maths/impl/Matrix4";

interface IShaderProgram extends Cleanable {

	bind(): void;

	unbind(): void;

	setUniform3f(name: string, vector: Vector3): void;

	setUniform4f(name: string, vector: Vector4): void;

	setUniform1i(name: string, value: number): void;

	setUniformMatrix4f(name: string, matrix: Matrix4): void;

}

export default IShaderProgram;