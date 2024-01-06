import ILayer from "../ILayer";

abstract class BaseLayer<MOUSE_EVENT, KEYBOARD_EVENT> implements ILayer<MOUSE_EVENT, KEYBOARD_EVENT> {
	private readonly name: string;

	protected constructor(name: string = "layer") {
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}

	abstract attach(): void;

	abstract detach(): void;

	abstract keyboardInput(event: KEYBOARD_EVENT): void;

	abstract mouseInput(event: MOUSE_EVENT): void;

	abstract update(timestamp: number): void;

}

export default BaseLayer;