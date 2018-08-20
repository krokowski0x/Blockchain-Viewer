import Block from "./block";

export default class Blockchain {
	constructor() {
		this.chain = [Block.genesis()];
	}

	addBlock(data) {
		const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
		this.chain.push(block);

		return block;
	}

	isValidChain(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
			return false;

		for (let i = 1; i < chain.length; i++) {
			const block = chain[i];
			const lastBlock = chain[i - 1];

			if (
				block.lastHash !== lastBlock.hash ||
				block.hash !== Block.blockHash(block)
			)
				return false;
		}

		return true;
	}

	replaceChain(newChain) {
		if (newChain.length <= this.chain.length)
			throw new Error("Received chain is not longer than the current chain.");
		else if (!this.isValidChain(newChain))
			throw new Error("The received chain is not valid.");

		this.chain = newChain;
	}
}
