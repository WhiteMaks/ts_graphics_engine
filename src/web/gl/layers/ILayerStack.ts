import ILayer from "./ILayer";
import Cleanable from "../../support/Cleanable";

interface ILayerStack<LAYER extends ILayer<any, any>> extends Cleanable {

	push(layer: LAYER): void;

	pushOverlay(layer: LAYER): void;

	getLayers(): LAYER[];

}

export default ILayerStack;