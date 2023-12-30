/**
 * Класс обертка над стандартными методами WebGL
 */
class WebGLExt {
	/**
	 * Контекст для работы с WebGL
	 * @private
	 */
	private readonly context: WebGL2RenderingContext;

	/**
	 * Название компании которой принадлежит браузер
	 * @private
	 */
	private readonly vendor: string;
	/**
	 * Название видеокарты на которой происходит рендеринг
	 * @private
	 */
	private readonly renderer: string;

	/**
	 * Конструктор создания объекта WebGL
	 * @param context выбранный контекст для работы с WebGL
	 */
	public constructor(context: WebGL2RenderingContext) {
		this.context = context; //сохранение контекста

		this.clearColor(
			0,
			0,
			0
		);

		const debugInfo = this.context.getExtension('WEBGL_debug_renderer_info');

		if (debugInfo) {
			this.vendor = this.context.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
			this.renderer = this.context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
		} else {
			this.vendor = "HIDDEN";
			this.renderer = "HIDDEN";
		}
	}

	/**
	 * Включение тесты глубины
	 */
	public enableDepthTest(): void {
		this.context.enable(this.context.DEPTH_TEST);
	}

	/**
	 * Включение смешивания пикселей
	 */
	public enableBlend(): void {
		this.context.enable(this.context.BLEND);
	}

	/**
	 * Выключение смешивания пикселей
	 */
	public disableBlend(): void {
		this.context.disable(this.context.BLEND);
	}

	/**
	 * Включение прозрачности пикселей
	 */
	public blendFuncSrcAlphaOneMinusSrcAlpha(): void {
		//Функция для математического преобразования цвета для получения итогового цвета смешивания
		this.context.blendFunc(
			this.context.SRC_ALPHA, //SRC; Канал для математических преобразований (в данном случае канал отвечающий за прозрачность (A) в RGBA)
			this.context.ONE_MINUS_SRC_ALPHA //DEST: для получения правильного цвета смешивания нужно из единицы вычесть канал A
		);
		//R = (R(SCR) * SRC) + (R(DEST) * (1 - DEST))
		//G = (G(SCR) * SRC) + (G(DEST) * (1 - DEST))
		//B = (B(SCR) * SRC) + (B(DEST) * (1 - DEST))
		//A = (A(SCR) * SRC) + (A(DEST) * (1 - DEST))
		//
		//К примеру есть цветовой вектор красного цвета на половину прозрачный (канал A = 0.5) (1.0, 0.0, 0.0, 0.5)
		//SRC(red) = 0.5
		//DEST(red) = 1.0 - 0.5 = 0.5
		//И есть цветовой вектор синего цвета не прозрачный (канал A = 1.0) (0.0, 0.0, 1.0, 1.0)
		//Тогда итоговый цвет будет равен
		//R = ((1.0 * 0.5) + (0.0 * (1 - 0.5))) = 0.5
		//G = ((0.0 * 0.5) + (0.0 * (1 - 0.5))) = 0.0
		//B = ((0.0 * 0.5) + (1.0 * (1 - 0.5))) = 0.5
		//A = ((0.5 * 0.5) + (1.0 * (1 - 0.5))) = 0.75
	}

	/**
	 * Заливка экрана выбранным цветом
	 * @param red значение красного цвета
	 * @param green значение зеленого цвета
	 * @param blue значение синего цвета
	 */
	public clearColor(red: number, green: number, blue: number): void {
		this.clearColorWithAlpha(
			red,
			green,
			blue,
			1.0
		)
	}

	/**
	 * Заливка экрана выбранным цветом с прозрачностью
	 * @param red значение красного цвета
	 * @param green значение зеленого цвета
	 * @param blue значение синего цвета
	 * @param alpha значение прозрачности цвета
	 */
	public clearColorWithAlpha(red: number, green: number, blue: number, alpha: number): void {
		this.context.clearColor(
			red,
			green,
			blue,
			alpha
		);
	}

	/**
	 * Отчистка буфера цвета
	 */
	public clearColorBuffer(): void {
		this.context.clear(this.context.COLOR_BUFFER_BIT);
	}

	/**
	 * Отчистка буфера глубины
	 */
	public clearDepthBuffer(): void {
		this.context.clear(this.context.DEPTH_BUFFER_BIT);
	}

	/**
	 * Установка новой области просмотра
	 * @param x значение x левого нижнего угла
	 * @param y значение y левого нижнего угла
	 * @param width значение ширины окна
	 * @param height значение высоты окна
	 */
	public setViewport(x: number, y: number, width: number, height: number): void {
		this.context.viewport(
			0,
			0,
			width,
			height
		);
	}

	/**
	 * Создание объекта для хранения вершинного шейдера
	 */
	public createVertexShader(): WebGLShader {
		let result = this.context.createShader(this.context.VERTEX_SHADER);
		//если возникла ошибка во время создания шейдера, то Exception
		if (!result) {
			throw new Error("Ошибка создания вершинного шейдера");
		}
		return result;
	}

	/**
	 * Создание объекта для хранения фрагментного шейдера
	 */
	public createFragmentShader(): WebGLShader {
		let result = this.context.createShader(this.context.FRAGMENT_SHADER);
		//если возникла ошибка во время создания шейдера, то Exception
		if (!result) {
			throw new Error("Ошибка создания фрагментного шейдера");
		}
		return result;
	}

	/**
	 * Удаление шейдера
	 * @param shader
	 */
	public deleteShader(shader: WebGLShader): void {
		this.context.deleteShader(shader);
	}

	/**
	 * Установка исходного кода для шейдера
	 * @param shader шейдер в котором необходимо установить исходный код
	 * @param sourceCode исходный код для шейдера
	 */
	public setShaderSource(shader: WebGLShader, sourceCode: string): void {
		this.context.shaderSource(
			shader,
			sourceCode
		);

		this.context.compileShader(shader);

		//если возникла ошибка при компиляции шейдера, то подсказка будет в консоли
		if (!this.context.getShaderParameter(shader, this.context.COMPILE_STATUS)) {
			const shaderLog = this.context.getShaderInfoLog(shader);
			this.deleteShader(shader);
			throw new Error( shaderLog ?? "Ошибка компиляции шейдера");
		}
	}

	/**
	 * Создание программы
	 */
	public createProgram(): WebGLProgram {
		let result = this.context.createProgram();
		//если возникла ошибка во время создания программы, то Exception
		if (!result) {
			throw new Error("Ошибка создания программы");
		}
		return result;
	}

	/**
	 * Удаление программы
	 */
	public deleteProgram(program: WebGLProgram): void {
		this.context.deleteProgram(program);
	}

	/**
	 * Прикрепление шейдера к программе
	 * @param program шейдерная программа
	 * @param shader шейдер для прикрепления к программе
	 */
	public attachShader(program: WebGLProgram, shader: WebGLShader): void {
		this.context.attachShader(
			program,
			shader
		);
	}

	/**
	 * Связывание программы с шейдерами
	 * @param program
	 */
	public linkProgram(program: WebGLProgram): void {
		this.context.linkProgram(program);

		//если возникла ошибка при связывании шейдеров с программой, то подсказка будет в консоли
		if (!this.context.getProgramParameter(program, this.context.LINK_STATUS)) {
			const programLog = this.context.getProgramInfoLog(program);
			throw new Error(programLog ?? "Ошибка связывания программы с шейдерами");
		}
	}

	/**
	 * Установка программы как часть текущего состояния рендеринга
	 * @param program программа для использования
	 */
	public useProgram(program: WebGLProgram): void {
		this.context.useProgram(program);
	}

	/**
	 * Удаление программы из текущего состояния рендеринга
	 */
	public removeProgram() {
		this.context.useProgram(null);
	}

	/**
	 * Создание VAO
	 */
	public createVertexArray(): WebGLVertexArrayObject {
		let result = this.context.createVertexArray();
		//если возникла ошибка во время создания VAO, то Exception
		if (!result) {
			throw new Error("Ошибка создания VAO");
		}
		return result;
	}

	/**
	 * Удаление VAO
	 * @param vao
	 */
	public deleteVertexArray(vao: WebGLVertexArrayObject): void {
		this.context.deleteVertexArray(vao);
	}

	/**
	 * Связывание VAO с массивом имен
	 * @param vao
	 */
	public bindVertexArray(vao: WebGLVertexArrayObject): void {
		this.context.bindVertexArray(vao);
	}

	/**
	 * Отвязывание VAO от массива имен
	 */
	public unbindVertexArray(): void {
		this.context.bindVertexArray(null);
	}

	/**
	 * Создание текстуры
	 */
	public createTexture(): WebGLTexture {
		const result = this.context.createTexture();
		//если возникла ошибка во время создания текстуры, то Exception
		if (!result) {
			throw new Error("Ошибка создания текстуры");
		}
		return result;
	}

	/**
	 * Удаление текстуры
	 */
	public deleteTexture(texture: WebGLTexture): void {
		this.context.deleteTexture(texture);
	}

	/**
	 * Отвязывание текстуры от цели текстурирования
	 */
	public unbindTexture2D(): void {
		this.context.bindTexture(this.context.TEXTURE_2D, null);
	}

	/**
	 * Связывание текстуры к цели текстурирования
	 * @param texture текстура для связывания
	 */
	public bindTexture2D(texture: WebGLTexture): void {
		this.context.bindTexture(
			this.context.TEXTURE_2D,
			texture
		);
	}

	/**
	 * Установка параметра для текстуры
	 */
	public tex2DParameteriMinFilterLinear(): void {
		this.context.texParameteri(
			this.context.TEXTURE_2D,
			this.context.TEXTURE_MIN_FILTER,
			this.context.LINEAR
		);
	}

	/**
	 * Установка параметра для текстуры
	 */
	public tex2DParameteriMagFilterLinear(): void {
		this.context.texParameteri(
			this.context.TEXTURE_2D,
			this.context.TEXTURE_MAG_FILTER,
			this.context.LINEAR
		);
	}

	/**
	 * Установка параметра для текстуры
	 */
	public tex2DParameteriWrapSClampToEdge(): void {
		this.context.texParameteri(
			this.context.TEXTURE_2D,
			this.context.TEXTURE_WRAP_S,
			this.context.CLAMP_TO_EDGE
		);
	}

	/**
	 * Установка параметра для текстуры
	 */
	public tex2DParameteriWrapTClampToEdge(): void {
		this.context.texParameteri(
			this.context.TEXTURE_2D,
			this.context.TEXTURE_WRAP_T,
			this.context.CLAMP_TO_EDGE
		);
	}

	/**
	 * Установка 2D изображение текстуры
	 * @param level уровень детализации
	 * @param texture изображение текстуры
	 */
	public texImage2DRGBAUbyte(level: number, texture: HTMLImageElement): void {
		this.context.texImage2D(
			this.context.TEXTURE_2D,
			level,
			this.context.RGBA,
			this.context.RGBA,
			this.context.UNSIGNED_BYTE,
			texture
		);
	}

	/**
	 * Генерация MIM карты для указанной цели текстурирования
	 */
	public generateMipmap2D() {
		this.context.generateMipmap(this.context.TEXTURE_2D);
	}

	/**
	 * Создание буфера
	 */
	public createBuffer(): WebGLBuffer {
		const result = this.context.createBuffer();
		//если возникла ошибка во время создания буфера, то Exception
		if (!result) {
			throw new Error("Ошибка создания буфера");
		}
		return result;
	}

	/**
	 * Удаление буфера
	 * @param buffer буфер для удаления
	 */
	public deleteBuffer(buffer: WebGLBuffer): void {
		this.context.deleteBuffer(buffer);
	}

	/**
	 * Связывание объекта буфера с атрибутами вершин
	 * @param vbo буфер который необходимо связать
	 */
	public bindArrayBuffer(vbo: WebGLBuffer): void {
		this.context.bindBuffer(
			this.context.ARRAY_BUFFER,
			vbo
		);
	}

	/**
	 * Отвязывание объекта буфера от атрибутов вершин
	 */
	public unbindArrayBuffer(): void {
		this.context.bindBuffer(
			this.context.ARRAY_BUFFER,
			null
		);
	}

	/**
	 * Связывание объекта буфера с элементами атрибутов вершин
	 * @param vbo буфер который необходимо связать
	 */
	public bindElementArrayBuffer(vbo: WebGLBuffer): void {
		this.context.bindBuffer(
			this.context.ELEMENT_ARRAY_BUFFER,
			vbo
		);
	}

	/**
	 * Создание нового статического хранилища данных для буфера с атрибутами вершин
	 * @param data массив данных
	 */
	public arrayBufferStaticData(data: BufferSource): void {
		this.context.bufferData(
			this.context.ARRAY_BUFFER,
			data,
			this.context.STATIC_DRAW
		);
	}

	/**
	 * Создание нового статического хранилища данных для буфера с элементами атрибутов вершин
	 * @param data массив данных
	 */
	public elementArrayBufferStaticData(data: BufferSource): void {
		this.context.bufferData(
			this.context.ELEMENT_ARRAY_BUFFER,
			data,
			this.context.STATIC_DRAW
		);
	}

	/**
	 * Включение массива атрибутов вершин по указанному индексу
	 * @param index индекс для включения
	 */
	public enableVertexAttribArray(index: number): void {
		this.context.enableVertexAttribArray(index);
	}

	/**
	 * Выключение массива атрибутов вершин по указанному индексу
	 * @param index индекс для выключения
	 */
	public disableVertexAttribArray(index: number): void {
		this.context.disableVertexAttribArray(index);
	}

	/**
	 * Определение массива данных типа Float атрибутов вершин
	 * @param index индекс на котором будет расположен массив данных
	 * @param size количество компонентов на компонент (если в массиве на одну точку приходиться координаты x, y, z, то size должен быть равен 3)
	 * @param normalized
	 * @param stride шаг от одного атрибута к другом (если все идет по порядку (x1, y1, z1, x2, y2, z2, ...), то stride должен быть равен 0)
	 * @param offset смещение первого компонента
	 */
	public vertexAttribPointerFloat(index: number, size: number, normalized: boolean, stride: number, offset: number) {
		this.context.vertexAttribPointer(
			index,
			size,
			this.context.FLOAT,
			normalized,
			stride,
			offset
		);
	}

	/**
	 * Определение массива данных типа UNSIGNED_INT атрибутов вершин
	 * @param index индекс на котором будет расположен массив данных
	 * @param size количество компонентов на компонент (если в массиве на одну точку приходиться координаты x, y, z, то size должен быть равен 3)
	 * @param normalized
	 * @param stride шаг от одного атрибута к другом (если все идет по порядку (x1, y1, z1, x2, y2, z2, ...), то stride должен быть равен 0)
	 * @param offset смещение первого компонента
	 */
	public vertexAttribPointerUint(index: number, size: number, normalized: boolean, stride: number, offset: number) {
		this.context.vertexAttribPointer(
			index,
			size,
			this.context.UNSIGNED_INT,
			normalized,
			stride,
			offset
		);
	}

	/**
	 * Визуализация треугольников из VAO
	 * @param first начальный индекс
	 * @param count количество треугольников для визуализации
	 */
	public drawTriangleArrays(first: number, count: number): void {
		this.context.drawArrays(
			this.context.TRIANGLES,
			first,
			count
		);
	}

	/**
	 * Визуализация треугольников из элементов VAO
	 * @param count количество треугольников для визуализации
	 * @param offset смещение
	 */
	public drawTriangleElementsUshort(count: number, offset: number): void {
		this.context.drawElements(
			this.context.TRIANGLES,
			count,
			this.context.UNSIGNED_SHORT,
			offset
		);
	}

	/**
	 * Визуализация треугольников из элементов VAO
	 * @param count количество треугольников для визуализации
	 * @param offset смещение
	 */
	public drawTriangleElementsUint(count: number, offset: number): void {
		this.context.drawElements(
			this.context.TRIANGLES,
			count,
			this.context.UNSIGNED_INT,
			offset
		);
	}

	/**
	 * Визуализация линий из элементов VAO
	 * @param count количество линий для визуализации
	 * @param offset смещение
	 */
	public drawLineElementsUshort(count: number, offset: number): void {
		this.context.drawElements(
			this.context.LINES,
			count,
			this.context.UNSIGNED_SHORT,
			offset
		);
	}

	/**
	 * Получение местоположения униформы в программе
	 * @param program программа
	 * @param name имя униформы
	 */
	public getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation {
		const result = this.context.getUniformLocation(
			program,
			name
		);

		//если возникла ошибка во время получение униформы, то Exception
		if (!result) {
			throw new Error("Ошибка получения униформы с именем [ " + name + " ]");
		}
		return result;
	}

	/**
	 * Установка данных в униформу для текущего объекта программы
	 * @param location положение униформы
	 * @param transpose нужно ли транспонировать матрицу
	 * @param data данные для установки в униформу
	 */
	public uniformMatrix4fv(location: WebGLUniformLocation, transpose: boolean, data: Float32List): void {
		this.context.uniformMatrix4fv(
			location,
			transpose,
			data
		);
	}

	/**
	 * Установка данных в униформу для текущего объекта программы
	 * @param location положение униформы
	 * @param x компонента X
	 * @param y компонента Y
	 * @param z компонента Z
	 */
	public uniform3f(location: WebGLUniformLocation, x: number, y: number, z: number): void {
		this.context.uniform3f(
			location,
			x,
			y,
			z
		);
	}

	/**
	 * Установка данных в униформу для текущего объекта программы
	 * @param location положение униформы
	 * @param x компонента X
	 * @param y компонента Y
	 * @param z компонента Z
	 * @param w компонента W
	 */
	public uniform4f(location: WebGLUniformLocation, x: number, y: number, z: number, w: number): void {
		this.context.uniform4f(
			location,
			x,
			y,
			z,
			w
		);
	}

	/**
	 * Установка данных на заданную позицию
	 * @param location положение униформы
	 * @param value позиция
	 */
	public uniform1i(location: WebGLUniformLocation, value: number): void {
		this.context.uniform1i(
			location,
			value
		);
	}

	/**
	 * Установка данных на заданную позицию
	 * @param location положение униформы
	 * @param value позиция
	 */
	public uniformF(location: WebGLUniformLocation, value: number): void {
		this.context.uniform1f(
			location,
			value
		);
	}

	/**
	 * Использование текстурного регистра в слоте
	 * @param slot слот который необходимо использовать
	 */
	public activeTexture(slot: number) {
		this.context.activeTexture(this.context.TEXTURE0 + slot);
	}

	/**
	 * @deprecated Нельзя отдавать наружу контекст!!!
	 */
	public getContext(): WebGL2RenderingContext {
		return this.context;
	}
}

export default WebGLExt;