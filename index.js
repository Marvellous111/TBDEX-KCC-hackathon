import { Web5 } from '@web5/api';
import { VCProtocolDefinition } from './src/protocols/index.js';
import { IssueKcc } from './src/VerifiableCredentials/index.js';
import { GetWritePermissions } from "./src/services/index.js";

const ALICE_DID = "did:dht:rr1w5z9hdjtt76e6zmqmyyxc5cfnwjype6prz45m6z1qsbm8yjao"
const DWNCREATION_STATUS_ENUM = {
  success: "success",
  failure: "failure"
};
Object.freeze(DWNCREATION_STATUS_ENUM);
var dwncreationstatus = DWNCREATION_STATUS_ENUM.failure;


//STEP 1: Creating the DID and DWN as the issuer using the Community DWN
const {web5, did: issuerDid} = await Web5.connect({
  didCreateOptions: {
    // Use community DWN instance hosted on Google Cloud
    dwnEndpoints: ['https://dwn.gcda.xyz']
  },
  registration: {
    onSuccess: () => {
      dwncreationstatus = DWNCREATION_STATUS_ENUM.success;
      console.log("Issuers DID, DWN created");
    },
    onFailure: (error) => {
      dwncreationstatus = DWNCREATION_STATUS_ENUM.failure;
      console.error("An error occured while creating the issuers DID, DWN");
      throw new Error("Error message: ", error);
    }
  }
});

if (dwncreationstatus == DWNCREATION_STATUS_ENUM.failure) {
  throw new Error("An error occured due to creating Issuers DWN hence the rest of the code won't run.");
}
// Creating the issuers bearer did
  const { did: issuerBearerDid } = await web5.agent.identity.get({ didUri: issuerDid });

  //STEP 2: Issuing Alice a KCC that includes evidence and changing it to a VC JWT.
  try {
    var vc = await IssueKcc(issuerDid, ALICE_DID);
    var signedVc = await vc.sign({ did: issuerBearerDid });
  } catch (error) {
    console.error("An error occured while creating a DID and DWN with the DIF community DWN Instance");
    throw new Error("Error message: ", error);
  }

  //STEP 3: Installing protocol to issuers DWN
  try {
    const { protocol, status: protocolStatus } = await web5.dwn.protocols.configure({
      message: {
        definition: VCProtocolDefinition
      }
    });
    console.log("Protocol installation status: ", protocolStatus); 
    //sends protocol to remote DWNs immediately (vs waiting for sync)
    const { status: protocolSendStatus } = await protocol.send(issuerDid);
    console.log("Protocol send status: ", protocolSendStatus);
  } catch (error) {
    console.error("An error occured while installing protocol on Issuers DWN");
    throw new Error("Error message: ", error);
  }


  //STEP 4: Obtain permission to write to Alice DWN
  try {
    const permission = await GetWritePermissions(issuerDid);
    console.log(permission); 
  } catch (error) {
    console.error("An error occured while getting permission to write to Alice DWN");
    throw new Error("Error message: ", error);
  }

  //STEP 5: Store the VC JWT as a private record in Alice DWN
  try {
    const { record: SendRecord } = await web5.dwn.records.create({
      data: signedVc,
      message: {
        recipient: ALICE_DID,
        dataFormat: 'application/vc+jwt',
        schema: VCProtocolDefinition.types.credential.schema,
        protocolPath: 'credential',
        protocolRole: 'issuer',
        protocol: VCProtocolDefinition.protocol,
      }
    });
    if (typeof SendRecord === 'undefined') {
      throw new Error("There seems to be an error in the way you are sending your records");
    }
    console.log("User record is: ", SendRecord.id);
    // Immediately send record to users remote DWNs (optional)
    const { status: sendStatus } = await SendRecord.send(ALICE_DID);
    console.log("Record send status: ", sendStatus);
  } catch (error) {
    console.error("An error occured while writing to Alice DWN");
    throw new Error(error);
  }
  //STEP 6: Get Record Id from Alice DID DWN Record
  try {
    const AliceRecord = await web5.dwn.records.query({
      from: ALICE_DID,
      message: {
        filter: {
          schema: VCProtocolDefinition.types.credential.schema,
          dataFormat: 'application/vc+jwt',
          protocolPath: 'credential',
          protocol: VCProtocolDefinition.protocol,
        },
        dateSort: 'createdDescending'
      },
    });
    if (typeof AliceRecord === 'undefined') {
      throw new Error("There is an error in the way you are filtering for records.");
    }
    var alice_record_id = '';
    if (AliceRecord.status.code == 200) {
      alice_record_id = AliceRecord.records[0].id;
    }
    console.log("Alice record ID is: ", alice_record_id);
  } catch (error) {
    console.error("An error occured while getting the record ID from Alice's DWN");
    throw new Error(error);
  }