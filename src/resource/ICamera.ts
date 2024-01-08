import Vector3 from "../maths/impl/Vector3";
import Matrix4 from "../maths/impl/Matrix4";

interface ICamera {

	update(): void;

	setPosition(position: Vector3): void;

	getPosition(): Vector3;

	setRotation(rotation: Vector3): void;

	getRotation(): Vector3;

	getProjectionMatrix(): Matrix4;

	getViewMatrix(): Matrix4;

	getViewProjectionMatrix(): Matrix4;
}

export default ICamera;