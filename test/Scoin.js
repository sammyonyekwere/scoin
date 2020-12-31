var Scoin = artifacts.require("./Scoin.sol");

contract('Scoin', function(accounts) {
    it('sets the total supply upon deployment', function() {
        return Scoin.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1000000')
        })
    });
})