import '~helpers/hardhat-imports';
import '~tests/utils/chai-imports';

import { expect } from 'chai';
import { AntiochDAOMember__factory, AntiochDAOMember } from 'generated/contract-types';
import hre from 'hardhat';

import { getHardhatSigners } from '~helpers/functions/accounts';

describe('🚩 Challenge 0: 🎟 Simple NFT Example 🤓', function () {
  this.timeout(180000);

  // console.log("hre:",Object.keys(hre)) // <-- you can access the hardhat runtime env here

  describe('AntiochDAOMembershipToken', function () {
    let daoMemberToken: AntiochDAOMember;

    before(async () => {
      const { deployer } = await getHardhatSigners(hre);
      const factory = new AntiochDAOMember__factory(deployer);
      daoMemberToken = await factory.deploy();
    });

    beforeEach(async () => {
      // put stuff you need to run before each test here
    });

    describe('mintItem()', function () {
      it('Should be able to mint an NFT', async function () {
        const { user1 } = await getHardhatSigners(hre);

        console.log('\t', ' 🧑‍🏫 Tester Address: ', user1.address);

        const startingBalance = await daoMemberToken.balanceOf(user1.address);
        console.log('\t', ' ⚖️ Starting balance: ', startingBalance.toNumber());

        console.log('\t', ' 🔨 Minting...');
        const mintResult = await daoMemberToken.safeMint(user1.address);
        console.log('\t', ' 🏷  mint tx: ', mintResult.hash);

        console.log('\t', ' ⏳ Waiting for confirmation...');
        const txResult = await mintResult.wait(1);
        expect(txResult.status).to.equal(1);

        console.log('\t', ' 🔎 Checking new balance: ', startingBalance.toNumber());
        expect(await daoMemberToken.balanceOf(user1.address)).to.equal(startingBalance.add(1));
      });
    });
  });
});
