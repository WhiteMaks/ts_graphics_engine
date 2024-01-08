import Cleanable from "../support/Cleanable";

interface ITexture extends Cleanable {

	bind(slot: number): void;

	unbind(): void;

}

export default ITexture;