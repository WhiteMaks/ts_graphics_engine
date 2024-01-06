import IMatrix from "../IMatrix";

class Matrix4 implements IMatrix<Matrix4> {
	private readonly arrayMatrix: number[];

	public constructor(arrayMatrix: number[]) {
		this.arrayMatrix = arrayMatrix;
	}

	public identity(): Matrix4 {
		return new Matrix4([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);
	}

	public getArray(): number[] {
		return this.arrayMatrix;
	}

	public multiplyMatrix(matrix: Matrix4): Matrix4 {
		const a11 = this.a11() * matrix.a11() + this.a12() * matrix.a21() + this.a13() * matrix.a31() + this.a14() * matrix.a41();
		const a12 = this.a11() * matrix.a12() + this.a12() * matrix.a22() + this.a13() * matrix.a32() + this.a14() * matrix.a42();
		const a13 = this.a11() * matrix.a13() + this.a12() * matrix.a23() + this.a13() * matrix.a33() + this.a14() * matrix.a43();
		const a14 = this.a11() * matrix.a14() + this.a12() * matrix.a24() + this.a13() * matrix.a34() + this.a14() * matrix.a44();

		const a21 = this.a21() * matrix.a11() + this.a22() * matrix.a21() + this.a23() * matrix.a31() + this.a24() * matrix.a41();
		const a22 = this.a21() * matrix.a12() + this.a22() * matrix.a22() + this.a23() * matrix.a32() + this.a24() * matrix.a42();
		const a23 = this.a21() * matrix.a13() + this.a22() * matrix.a23() + this.a23() * matrix.a33() + this.a24() * matrix.a43();
		const a24 = this.a21() * matrix.a14() + this.a22() * matrix.a24() + this.a23() * matrix.a34() + this.a24() * matrix.a44();

		const a31 = this.a31() * matrix.a11() + this.a32() * matrix.a21() + this.a33() * matrix.a31() + this.a34() * matrix.a41();
		const a32 = this.a31() * matrix.a12() + this.a32() * matrix.a22() + this.a33() * matrix.a32() + this.a34() * matrix.a42();
		const a33 = this.a31() * matrix.a13() + this.a32() * matrix.a23() + this.a33() * matrix.a33() + this.a34() * matrix.a43();
		const a34 = this.a31() * matrix.a14() + this.a32() * matrix.a24() + this.a33() * matrix.a34() + this.a34() * matrix.a44();

		const a41 = this.a41() * matrix.a11() + this.a42() * matrix.a21() + this.a43() * matrix.a31() + this.a44() * matrix.a41();
		const a42 = this.a41() * matrix.a12() + this.a42() * matrix.a22() + this.a43() * matrix.a32() + this.a44() * matrix.a42();
		const a43 = this.a41() * matrix.a13() + this.a42() * matrix.a23() + this.a43() * matrix.a33() + this.a44() * matrix.a43();
		const a44 = this.a41() * matrix.a14() + this.a42() * matrix.a24() + this.a43() * matrix.a34() + this.a44() * matrix.a44();

		return new Matrix4([
			a11, a12, a13, a14,
			a21, a22, a23, a24,
			a31, a32, a33, a34,
			a41, a42, a43, a44,
		]);
	}

	public a11(): number {
		return this.arrayMatrix[0];
	}

	public a12(): number {
		return this.arrayMatrix[1];
	}

	public a13(): number {
		return this.arrayMatrix[2];
	}

	public a14(): number {
		return this.arrayMatrix[3];
	}

	public a21(): number {
		return this.arrayMatrix[4];
	}

	public a22(): number {
		return this.arrayMatrix[5];
	}

	public a23(): number {
		return this.arrayMatrix[6];
	}

	public a24(): number {
		return this.arrayMatrix[7];
	}

	public a31(): number {
		return this.arrayMatrix[8];
	}

	public a32(): number {
		return this.arrayMatrix[9];
	}

	public a33(): number {
		return this.arrayMatrix[10];
	}

	public a34(): number {
		return this.arrayMatrix[11];
	}

	public a41(): number {
		return this.arrayMatrix[12];
	}

	public a42(): number {
		return this.arrayMatrix[13];
	}

	public a43(): number {
		return this.arrayMatrix[14];
	}

	public a44(): number {
		return this.arrayMatrix[15];
	}
}

export default Matrix4;