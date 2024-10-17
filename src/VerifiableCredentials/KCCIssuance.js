import { VerifiableCredential } from "@web5/credentials";

async function IssueKCC(issuerBearerDidUri, customerDidUri) {
  return await VerifiableCredential.create({
    issuer: issuerBearerDidUri, // Issuer's DID URI
    subject: customerDidUri, // Customer's DID URI 
    expirationDate: '2026-05-19T08:02:04Z',
    data: {
      countryOfResidence: "US", // 2 letter country code
      tier: "Gold", // optional KYC tier
      jurisdiction: { 
        country: "US" // optional 2 letter country code where IDV was performed
      }
    },
    credentialSchema: [
      {
        id: "https://vc.schemas.host/kcc.schema.json", // URL to the schema used
        type: "JsonSchema", // Format type of the schema used for the KCC
      },
    ],
    // (optional) Evidence describing the due diligence performed to verify the identity of the known customer
    evidence: [
      {
        "kind": "document_verification",
        "checks": ["passport", "utility_bill"]
      },
      {
        "kind": "sanction_screening",
        "checks": ["PEP"]
      }
    ]
  });
}

export default IssueKCC;