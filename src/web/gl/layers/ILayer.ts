interface ILayer<MOUSE_EVENT, KEYBOARD_EVENT> {

	attach(): void;

	detach(): void;

	mouseInput(event: MOUSE_EVENT): void;

	keyboardInput(event: KEYBOARD_EVENT): void;

	update(timestamp: number): void;

	getName(): string;

}

export default ILayer;