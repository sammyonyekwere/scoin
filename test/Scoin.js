var Scoin = artifacts.require("./Scoin.sol");

contract('Scoin', function(accounts) {
    var tokenInstance;
    it('initializes the contract with the correct values', function() {
        return Scoin.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Scoin Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'SCT', 'has the right symbol');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'Scoin Token v1.0', 'has the right standard');
        })
    })



    it('allocates the total supply upon deployment', function() {
        return Scoin.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 24000000, 'sets the total supply to 24000000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 24000000, 'allocates the initial supply to the super account');
        });
    });

    it('transfers token ownership', function() {
        return Scoin.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 999929387499299);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message contain revert');
            return tokenInstance.transfer.call(accounts[1], 2000000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 2000000, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the token are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the token are transferred to');
            assert.equal(receipt.logs[0].args._value, 2000000, 'logs the amount transferred');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 2000000, 'adds the amount to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 22000000, 'deducts the amount from the sender account')
        })
    })


});