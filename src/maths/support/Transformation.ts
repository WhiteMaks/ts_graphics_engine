import Vector3 from "../impl/Vector3";
import Matrix4 from "../impl/Matrix4";

/**
 * Класс для работы с трансформациями
 */
class Transformation {
	/**
	 * Массив содержащий единичную матрицу
	 * @private
	 */
	private static readonly IDENTITY_MATRIX: Matrix4 = new Matrix4([]).identity();

	/**
	 * Получение мировой матрицы
	 * @param translationVector вектор перемещения
	 * @param rotationVector вектор поворота
	 * @param scaleX масштабирование по оси X
	 * @param scaleY масштабирование по оси Y
	 * @param scaleZ масштабирование по оси Z
	 */
	public static getWorldMatrix(translationVector: Vector3, rotationVector: Vector3, scaleX: number, scaleY: number, scaleZ: number): Matrix4 {
		const translationMatrix = this.getTranslationMatrix(this.IDENTITY_MATRIX, translationVector);
		const rotationXMatrix = this.getRotationXMatrix(translationMatrix, Transformation.degreesToRadians(rotationVector.getX()));
		const rotationXYMatrix = this.getRotationYMatrix(rotationXMatrix, Transformation.degreesToRadians(rotationVector.getY()));
		const rotationXYZMatrix = this.getRotationZMatrix(rotationXYMatrix, Transformation.degreesToRadians(rotationVector.getZ()));
		return this.getScale(rotationXYZMatrix, scaleX, scaleY, scaleZ);
	}

	/**
	 * Получение матрицы перспективной проекции (для корректного отображения 3D пространства)
	 * @param aspectRatio отношение между высотой и шириной экрана
	 * @param fieldOfView угол поля зрения (в радианах)
	 * @param zNear расстояние до ближней плоскости
	 * @param zFar расстояние до дальней плоскости
	 */
	public static getPerspectiveProjectionMatrix(aspectRatio: number, fieldOfView: number, zNear: number, zFar: number): Matrix4 {
		const f = 1 / Math.tan(fieldOfView / 2);
		const nf = 1 / (zNear - zFar);

		return new Matrix4([
			f / aspectRatio, 0, 0, 0,
			0, f, 0, 0,
			0, 0, (zFar + zNear) * nf, -1,
			0, 0, 2 * zFar * zNear * nf, 0
		]);
	}

	/**
	 * Получение матрицы ортогональной проекции (для корректного отображения 2D пространства)
	 * @param left левая граница усеченного конуса
	 * @param right правая граница усеченного конуса
	 * @param bottom нижняя граница усеченного конуса
	 * @param top верхняя граница усеченного конуса
	 * @param near ближайшая граница усеченного конуса
	 * @param far дальняя граница усеченного конуса
	 */
	public static getOrthogonalProjectionMatrix(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
		const leftMinusRight = 1 / (left - right);
		const bottomMinusTop = 1 / (bottom - top);
		const farMinusNear = 1 / (far - near);

		return new Matrix4([
			(-2) * leftMinusRight, 0, 0, 0,
			0, (-2) * bottomMinusTop, 0, 0,
			0, 0, (-2) * farMinusNear, 0,
			(left + right) * leftMinusRight, (top + bottom) * bottomMinusTop, (-1) * (far + near) * farMinusNear, 1
		]);
	}


	/**
	 * Получение матрицы ортогональной проекции (для корректного отображения 2D пространства)
	 * @param left левая граница усеченного конуса
	 * @param right правая граница усеченного конуса
	 * @param bottom нижняя граница усеченного конуса
	 * @param top верхняя граница усеченного конуса
	 */
	public static getOrthogonalProjectionMatrixWithoutNearFar(left: number, right: number, bottom: number, top: number): Matrix4 {
		const leftMinusRight = 1 / (left - right);
		const bottomMinusTop = 1 / (bottom - top);

		return new Matrix4([
			(-2) * leftMinusRight, 0, 0, 0,
			0, (-2) * bottomMinusTop, 0, 0,
			0, 0, (-1), 0,
			(left + right) * leftMinusRight, (top + bottom) * bottomMinusTop, 0, 1
		]);
	}

	/**
	 * Получение матрицы просмотра
	 * @param position позиция с которой необходимо получить матрицу
	 * @param rotation поворот по которому необходимо получить матрицу
	 */
	public static getViewMatrix(position: Vector3, rotation: Vector3): Matrix4 {
		const rotationXMatrix = this.getRotationMatrix(this.IDENTITY_MATRIX, Transformation.degreesToRadians(rotation.getX()), new Vector3(1, 0, 0));
		const rotationXYMatrix = this.getRotationMatrix(rotationXMatrix, Transformation.degreesToRadians(rotation.getY()), new Vector3(0, 1, 0));
		const rotationXYZMatrix = this.getRotationMatrix(rotationXYMatrix, Transformation.degreesToRadians(rotation.getZ()), new Vector3(0, 0, 1));
		return this.getTranslationMatrix(rotationXYZMatrix, new Vector3(-position.getX(), -position.getY(), -position.getZ()));
	}

	/**
	 * Перевод градусов в радианы
	 * @param angle значение угла в градусах
	 */
	public static degreesToRadians(angle: number): number {
		return angle * (Math.PI / 180);
	}

	/**
	 * Получение матрицы перемещения
	 * @param matrix матрица, которую необходимо преобразовать
	 * @param translationVector вектор перемещения
	 * @private
	 */
	private static getTranslationMatrix(matrix: Matrix4, translationVector: Vector3): Matrix4 {
		return new Matrix4([
			matrix.a11(), matrix.a12(), matrix.a13(), matrix.a14(),
			matrix.a21(), matrix.a22(), matrix.a23(), matrix.a24(),
			matrix.a31(), matrix.a32(), matrix.a33(), matrix.a34(),
			matrix.a11() * translationVector.getX() + matrix.a21() * translationVector.getY() + matrix.a31() * translationVector.getZ() + matrix.a41(), matrix.a12() * translationVector.getX() + matrix.a22() * translationVector.getY() + matrix.a32() * translationVector.getZ() + matrix.a42(), matrix.a13() * translationVector.getX() + matrix.a23() * translationVector.getY() + matrix.a33() * translationVector.getZ() + matrix.a43(), matrix.a14() * translationVector.getX() + matrix.a24() * translationVector.getY() + matrix.a34() * translationVector.getZ() + matrix.a44()
		]);
	}

	/**
	 * Получение матрицы поворота по оси X
	 * @param matrix матрица, которую необходимо преобразовать
	 * @param angleX угол по оси X (в радианах) на который необходимо повернуть
	 * @private
	 */
	private static getRotationXMatrix(matrix: Matrix4, angleX: number): Matrix4 {
		const sinAngle = Math.sin(angleX);
		const cosAngle = Math.cos(angleX);

		return new Matrix4([
			matrix.a11(), matrix.a12(), matrix.a13(), matrix.a14(),
			matrix.a21() * cosAngle + matrix.a31() * sinAngle, matrix.a22() * cosAngle + matrix.a32() * sinAngle, matrix.a23() * cosAngle + matrix.a33() * sinAngle, matrix.a24() * cosAngle + matrix.a34() * sinAngle,
			matrix.a31() * cosAngle - matrix.a21() * sinAngle, matrix.a32() * cosAngle - matrix.a22() * sinAngle, matrix.a33() * cosAngle - matrix.a23() * sinAngle, matrix.a34() * cosAngle - matrix.a24() * sinAngle,
			matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
		]);
	}

	/**
	 * Получение матрицы поворота по оси Y
	 * @param matrix матрица, которую необходимо преобразовать
	 * @param angleY угол по оси Y (в радианах) на который необходимо повернуть
	 */
	private static getRotationYMatrix(matrix: Matrix4, angleY: number): Matrix4 {
		const sinAngle = Math.sin(angleY);
		const cosAngle = Math.cos(angleY);

		return new Matrix4([
			matrix.a11() * cosAngle - matrix.a31() * sinAngle, matrix.a12() * cosAngle - matrix.a32() * sinAngle, matrix.a13() * cosAngle - matrix.a33() * sinAngle, matrix.a14() * cosAngle - matrix.a34() * sinAngle,
			matrix.a21(), matrix.a22(), matrix.a23(), matrix.a24(),
			matrix.a11() * sinAngle + matrix.a31() * cosAngle, matrix.a12() * sinAngle + matrix.a32() * cosAngle, matrix.a13() * sinAngle + matrix.a33() * cosAngle, matrix.a14() * sinAngle + matrix.a34() * cosAngle,
			matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
		]);
	}

	/**
	 * Получение матрицы поворота по оси Z
	 * @param matrix матрица, которую необходимо преобразовать
	 * @param angleZ угол по оси Z (в радианах) на который необходимо повернуть
	 * @private
	 */
	private static getRotationZMatrix(matrix: Matrix4, angleZ: number): Matrix4 {
		const sinAngle = Math.sin(angleZ);
		const cosAngle = Math.cos(angleZ);

		return new Matrix4([
			matrix.a11() * cosAngle + matrix.a21() * sinAngle, matrix.a12() * cosAngle + matrix.a22() * sinAngle, matrix.a13() * cosAngle + matrix.a23() * sinAngle, matrix.a14() * cosAngle + matrix.a24() * sinAngle,
			matrix.a21() * cosAngle - matrix.a11() * sinAngle, matrix.a22() * cosAngle - matrix.a12() * sinAngle, matrix.a23() * cosAngle - matrix.a13() * sinAngle, matrix.a24() * cosAngle - matrix.a14() * sinAngle,
			matrix.a31(), matrix.a32(), matrix.a33(), matrix.a34(),
			matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
		]);
	}

	/**
	 * Получение матрицы масштабирования
	 * @param matrix матрица, которую необходимо преобразовать
	 * @param x масштабирование по оси X
	 * @param y масштабирование по оси Y
	 * @param z масштабирование по оси Z
	 * @private
	 */
	private static getScale(matrix: Matrix4, x: number, y: number, z: number): Matrix4 {
		return new Matrix4([
			matrix.a11() * x, matrix.a12() * x, matrix.a13() * x, matrix.a14() * x,
			matrix.a21() * y, matrix.a22() * y, matrix.a23() * y, matrix.a24() * y,
			matrix.a31() * z, matrix.a32() * z, matrix.a33() * z, matrix.a34() * z,
			matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
		]);
	}

	/**
	 * Получение матрицы поворота по заданной оси вращения
	 * @param matrix матрица, которую необходимо преобразовать
	 * @param angle угол поворота (в радианах)
	 * @param axis вектор оси вращения
	 * @private
	 */
	private static getRotationMatrix(matrix: Matrix4, angle: number, axis: Vector3): Matrix4 {
		const sinAngle = Math.sin(angle);
		const cosAngle = Math.cos(angle);

		const oneMinusCosAngle = 1 - cosAngle;

		const normalizedVector = axis.getNormalization();

		const a = normalizedVector.getX() * normalizedVector.getX() * oneMinusCosAngle + cosAngle;
		const b = normalizedVector.getY() * normalizedVector.getX() * oneMinusCosAngle + normalizedVector.getZ() * sinAngle;
		const c = normalizedVector.getZ() * normalizedVector.getX() * oneMinusCosAngle - normalizedVector.getY() * sinAngle;
		const d = normalizedVector.getX() * normalizedVector.getY() * oneMinusCosAngle - normalizedVector.getZ() * sinAngle;
		const e = normalizedVector.getY() * normalizedVector.getY() * oneMinusCosAngle + cosAngle;
		const f = normalizedVector.getZ() * normalizedVector.getY() * oneMinusCosAngle + normalizedVector.getX() * sinAngle;
		const g = normalizedVector.getX() * normalizedVector.getZ() * oneMinusCosAngle + normalizedVector.getY() * sinAngle;
		const h = normalizedVector.getY() * normalizedVector.getZ() * oneMinusCosAngle - normalizedVector.getX() * sinAngle;
		const i = normalizedVector.getZ() * normalizedVector.getZ() * oneMinusCosAngle + cosAngle;

		return new Matrix4([
			matrix.a11() * a + matrix.a21() * b + matrix.a31() * c, matrix.a12() * a + matrix.a22() * b + matrix.a32() * c, matrix.a13() * a + matrix.a23() * b + matrix.a33() * c, matrix.a14() * a + matrix.a24() * b + matrix.a34() * c,
			matrix.a11() * d + matrix.a21() * e + matrix.a31() * f, matrix.a12() * d + matrix.a22() * e + matrix.a32() * f, matrix.a13() * d + matrix.a23() * e + matrix.a33() * f, matrix.a14() * d + matrix.a24() * e + matrix.a34() * f,
			matrix.a11() * g + matrix.a21() * h + matrix.a31() * i, matrix.a12() * g + matrix.a22() * h + matrix.a32() * i, matrix.a13() * g + matrix.a23() * h + matrix.a33() * i, matrix.a14() * g + matrix.a24() * h + matrix.a34() * i,
			matrix.a41(), matrix.a42(), matrix.a43(), matrix.a44()
		]);
	}

}


export default Transformation;