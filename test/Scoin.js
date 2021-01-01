var Scoin = artifacts.require("./Scoin.sol");

contract('Scoin', function(accounts) {
    var tokenInstance;
    it('sets the total supply upon deployment', function() {
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