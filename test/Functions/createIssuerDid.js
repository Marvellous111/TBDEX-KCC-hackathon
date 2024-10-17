import { Web5 } from '@web5/api';

import { VCProtocolDefinition } from '../../src/protocols/index.js';

async function CreateTestIssuerDid() {
  const {web5, did: issuerDid} = await Web5.connect({
    sync: 'off',
    didCreateOptions: {
      // Use community DWN instance hosted on Google Cloud
      dwnEndpoints: ['https://dwn.gcda.xyz']
    },
    registration: {
      onSuccess: () => {
        /*
        Registration succeeded, set a local storage value to indicate the user 
        is registered and registration does not need to occur again
        */
      },
      onFailure: (error) => {
        /* 
        Registration failed, display an error message to the user, and pass in 
        the registration object again to retry next time the user connects
        */
      },
    },
  })
  const testIssuerDid = {web5, issuerDid};
  return testIssuerDid;
  // Creating the issuers bearer did
  /*const { did: issuerBearerDid } = await web5.agent.identity.get({ didUri: issuerDid });
  
  
  //Installing protocol to issuers Did created by DWN
  const { protocol, status } = await web5.dwn.protocols.configure({
    message: {
      definition: VCProtocolDefinition
    }
  });
  
  //sends protocol to remote DWNs immediately (vs waiting for sync)
  await protocol?.send(issuerDid);*/
}

export default CreateTestIssuerDid;