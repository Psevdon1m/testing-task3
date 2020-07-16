const MyToken = artifacts.require('MyToken');

contract('MyToken', async (accounts) => {
	let instance;
	before('Gets deployed instance of a cntract', async () => {
		instance = await MyToken.deployed();
	});

	it('should check total supply amount after deployment', async () => {
		const totalSupply = await instance.totalSupply();
		assert.equal(totalSupply.toNumber(), 1000);
	});

	it('should check that owner obtained all the tokens', async () => {
		const totalSupply = await instance.totalSupply();
		const balance = await instance.balanceOf(accounts[0]);
		assert.equal(balance.toNumber(), totalSupply);
	});

	it('checks the transfer function', async () => {
		await instance.transfer(accounts[1], 100, { from: accounts[0] });

		const senderBalance = await instance.balanceOf(accounts[0]);
		const receiverBalance = await instance.balanceOf(accounts[1]);

		assert.equal(senderBalance.toNumber(), 900);
		assert.equal(receiverBalance.toNumber(), 100);
	});
});
