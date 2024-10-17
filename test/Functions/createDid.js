import { Web5 } from '@web5/api';
import { VerifiableCredential } from '@web5/credentials';

import { VCProtocolDefinition } from '../../src/protocols/index.js';


async function createTestUserDid() {
  const { web5, did: TestUserDid } = await Web5.connect();
  const userData = {web5, TestUserDid}
  return userData;
}

export default createTestUserDid;