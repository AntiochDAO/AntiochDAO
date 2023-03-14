import { DeployFunction } from 'hardhat-deploy/types';

import { THardhatRuntimeEnvironmentExtended } from '~helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('AntiochDAOMember', {
    from: deployer,
    args: [],
    log: true,
  });
};
export default func;
func.tags = ['AntiochDAOMember'];
