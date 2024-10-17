import { CreateTestIssuerDid, CreateTestUserDid, IssueKcc } from "./Functions/index.js";

//let testUserDidOptions = await CreateTestUserDid();
//let testIssuerDidOptions = await CreateTestIssuerDid();
//console.log("Test Issuer did is: ",testIssuerDidOptions.issuerDid);

let sendKCC = await IssueKcc("did:dht:7scw693hp7u6scb9nge8u8w4n9cdgabpw7re73uoycg8bqi65bjy", "did:dht:e4r74z6ssb8cj6hppzrothj5us8s4j6s65i14z1n6yhcrqh3pu4o");

console.log(sendKCC);