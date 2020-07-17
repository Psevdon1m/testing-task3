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

	it('checks the require statement in transfer function', async () => {
		try {
			await instance.transfer(accounts[1], 1000000000, { from: accounts[0] });
		} catch (e) {
			assert(e.message.includes('error, balance is insufficient'));
			return;
		}
		asser(false);
	});

	it('checks the transfer function', async () => {
		await instance.transfer(accounts[1], 100, { from: accounts[0] });

		const senderBalance = await instance.balanceOf(accounts[0]);
		const receiverBalance = await instance.balanceOf(accounts[1]);

		assert.equal(senderBalance.toNumber(), 900);
		assert.equal(receiverBalance.toNumber(), 100);
	});

	it('checks approve functions', async () => {
		await instance.approve(accounts[2], 200);
		const allowedAmount = await instance.allowance(accounts[0], accounts[2]);

		assert.equal(allowedAmount.toNumber(), 200);
	});

	it('checks transferFrom function', async () => {
		const amountToSend = 300;
		await instance.approve(accounts[2], amountToSend);
		const senderBalanceBefore = await instance.balanceOf(accounts[0]);
		const receiverBalanceBefore = await instance.balanceOf(accounts[2]);

		await instance.transferFrom(accounts[0], accounts[2], amountToSend, { from: accounts[2] });

		const senderBalanceAfter = await instance.balanceOf(accounts[0]);
		const receiverBalanceAfter = await instance.balanceOf(accounts[2]);

		assert.equal(senderBalanceAfter.toNumber(), senderBalanceBefore.toNumber() - amountToSend);
		assert.equal(receiverBalanceAfter.toNumber(), receiverBalanceBefore.toNumber() + amountToSend);
	});

	// it('checks approve functions', async () => {});
	// it('checks approve functions', async () => {});
});
