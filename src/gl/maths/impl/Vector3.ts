import IVector from "../IVector";

/**
 * Класс для работы с векторами
 */
class Vector3 implements IVector<Vector3> {
	/**
	 * Компонента X вектора
	 * @private
	 */
	private x: number;
	/**
	 * Компонента Y вектора
	 * @private
	 */
	private y: number;
	/**
	 * Компонента Z вектора
	 * @private
	 */
	private z: number;

	/**
	 * Конструктор для создания нового вектора
	 * @param x компонента вектора X
	 * @param y компонента вектора Y
	 * @param z компонента вектора Z
	 */
	public constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * Установка значения компоненты вектора X
	 * @param x новое значение компонента X для вектора
	 */
	public setX(x: number): void {
		this.x = x;
	}

	/**
	 * Установка значения компоненты вектора Y
	 * @param y новое значение компонента Y для вектора
	 */
	public setY(y: number): void {
		this.y = y;
	}

	/**
	 * Установка значения компоненты вектора Z
	 * @param z новое значение компонента Z для вектора
	 */
	public setZ(z: number): void {
		this.z = z;
	}

	/**
	 * Получение значения компоненты X
	 */
	public getX(): number {
		return this.x;
	}

	/**
	 * Получение значения компоненты Y
	 */
	public getY(): number {
		return this.y;
	}

	/**
	 * Получение значения компоненты Z
	 */
	public getZ(): number {
		return this.z;
	}

	public getLength(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	public getNormalization(): Vector3 {
		const inversionLength = this.getInversionLength();

		return new Vector3(this.x * inversionLength, this.y * inversionLength, this.z * inversionLength);
	}

	public getInversionLength(): number {
		return 1 / this.getLength();
	}
}

export default Vector3;