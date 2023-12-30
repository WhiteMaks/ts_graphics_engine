interface IVector<EXTENSION extends IVector<any>> {

	/**
	 * Получение длины вектора
	 */
	getLength(): number;

	/**
	 * Получение нормализации вектора = вектор * инверсию_длины
	 */
	getNormalization(): EXTENSION;

	/**
	 * Получение инверсии длины вектора
	 */
	getInversionLength(): number;
}

export default IVector;