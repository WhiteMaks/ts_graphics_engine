import BaseLayer from "../impl/BaseLayer";
import MouseEvent from "../../../../events_system/src/mouse/MouseEvent";
import KeyboardEvent from "../../../../events_system/src/keyboard/KeyboardEvent";
import IGraphicsContext from "../../renderer/IGraphicsContext";

class DebugLayer extends BaseLayer<MouseEvent, KeyboardEvent> {
	private readonly graphicsContext: IGraphicsContext;

	public constructor(graphicsContext: IGraphicsContext) {
		super("Debug layer");

		this.graphicsContext = graphicsContext;
	}

	public attach(): void {
		this.graphicsContext.printDebugInfo();
	}

	public detach(): void {

	}

	public update(timestamp: number): void {
	}

	public keyboardInput(event: KeyboardEvent): void {

	}

	public mouseInput(event: MouseEvent): void {

	}

}

export default DebugLayer;