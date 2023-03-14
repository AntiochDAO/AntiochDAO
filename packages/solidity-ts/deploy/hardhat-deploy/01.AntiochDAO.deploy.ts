import { ethers } from 'hardhat';
import { DeployFunction } from 'hardhat-deploy/types';

import { THardhatRuntimeEnvironmentExtended } from '~helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const MemberNFTContract = await ethers.getContract('AntiochDAOMember');
  await deploy('AntiochDAO', {
    from: deployer,
    args: [MemberNFTContract.address],
    log: true,
  });
};

export default func;
func.tags = ['AntiochDAO'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
