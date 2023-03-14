/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createConnectorForHardhatContract } from 'eth-hooks/context';
import { invariant } from 'ts-invariant';

import * as toolkitContracts from '~common/generated/contract-types/';
import hardhatDeployedContractsJson from '~common/generated/hardhat_contracts.json';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * ### Instructions
 * 1. edit externalContracts.config.ts to add your external contract addresses.
 * 2. edit `appContractsConfig` function below and add them to the list
 * 3. run `yarn contracts:build` to generate types for contracts
 * 4. run `yarn deploy` to generate hardhat_contracts.json
 *
 * ### Summary
 * - called  by useAppContracts
 * @returns
 */
export const appContractsConfig = () => {
  try {
    const result = {
      AntiochDAOMember: createConnectorForHardhatContract(
        'AntiochDAOMember',
        toolkitContracts.AntiochDAOMember__factory,
        hardhatDeployedContractsJson
      ),
      AntiochDAO: createConnectorForHardhatContract(
        'AntiochDAO',
        toolkitContracts.AntiochDAO__factory,
        hardhatDeployedContractsJson
      ),
    } as const;

    return result;
  } catch (e) {
    invariant.error(
      '❌ appContractsConfig: ERROR with loading contracts please run `yarn contracts:build or yarn contracts:rebuild`.  Then run `yarn deploy`!'
    );
    invariant.error(e);
    throw e;
  }
};
