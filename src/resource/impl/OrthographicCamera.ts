import ICamera from "../ICamera";
import Matrix4 from "../../maths/impl/Matrix4";
import Vector3 from "../../maths/impl/Vector3";
import Transformation from "../../maths/support/Transformation";

class OrthographicCamera implements ICamera {
	private projectionMatrix: Matrix4;
	private viewMatrix: Matrix4;
	private viewProjectionMatrix: Matrix4;

	private position: Vector3;
	private rotation: Vector3;

	public constructor(left: number, right: number, bottom: number, top: number) {
		this.position = new Vector3(0, 0, 0);
		this.rotation = new Vector3(0, 0, 0);

		this.projectionMatrix = Transformation.getOrthogonalProjectionMatrix(left, right, bottom, top, -1.0, 1.0);
		this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
		this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
	}

	public setPosition(position: Vector3): void {
		this.position = position;
	}

	public setRotation(rotation: Vector3): void {
		this.rotation = rotation;
	}

	public getPosition(): Vector3 {
		return this.position;
	}

	public getRotation(): Vector3 {
		return this.rotation;
	}

	public getProjectionMatrix(): Matrix4 {
		return this.projectionMatrix;
	}

	public getViewMatrix(): Matrix4 {
		return this.viewMatrix;
	}

	public getViewProjectionMatrix(): Matrix4 {
		return this.viewProjectionMatrix;
	}

	public update(): void {
		this.recalculateViewMatrix();
		this.recalculateProjectionMatrix();
		this.recalculateViewProjectionMatrix();
	}

	private recalculateViewMatrix(): void {
		this.viewMatrix = Transformation.getViewMatrix(this.position, this.rotation);
	}

	private recalculateProjectionMatrix(): void {

	}

	private recalculateViewProjectionMatrix(): void {
		this.viewProjectionMatrix = this.viewMatrix.multiplyMatrix(this.projectionMatrix);
	}

}

export default OrthographicCamera;