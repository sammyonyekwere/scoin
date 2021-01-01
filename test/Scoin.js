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
});