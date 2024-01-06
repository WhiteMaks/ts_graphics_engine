interface IMatrix<EXTENSION extends IMatrix<any>> {

	/**
	 * Сгенерировать единичную матрицу
	 */
	identity(): EXTENSION;

	/**
	 * Получить матрицу в виде массива
	 */
	getArray(): number[];

	/**
	 * Умножить матрицу на матрицу
	 */
	multiplyMatrix(matrix: EXTENSION): EXTENSION;
}

export default IMatrix;