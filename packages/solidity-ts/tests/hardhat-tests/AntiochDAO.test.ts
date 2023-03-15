import '~helpers/hardhat-imports';
import '~tests/utils/chai-imports';

import { expect } from 'chai';
import { AntiochDAO__factory, AntiochDAO, AntiochDAOMember__factory, AntiochDAOMember } from 'generated/contract-types';
import hre from 'hardhat';

import { getHardhatSigners } from '~helpers/functions/accounts';

describe('YourContract', function () {
  let antiochDaoMember: AntiochDAOMember;
  let antiochDAO: AntiochDAO;

  before(async () => {
    const { deployer } = await getHardhatSigners(hre);
    const nftFactory = new AntiochDAOMember__factory(deployer);
    antiochDaoMember = await nftFactory.deploy();
    const factory = new AntiochDAO__factory(deployer);
    antiochDAO = await factory.deploy(antiochDaoMember.address);
  });

  beforeEach(async () => {
    // put stuff you need to run before each test here
  });

  it('Should return a quorum of 1', async function () {
    await antiochDAO.deployed();
    expect(await antiochDAO.quorum(0)).to.equal(1);
  });
});
