async function GetWritePermissions(IssuerDidUri) {
  try {
    const writeDataResponse = await fetch(` https://vc-to-dwn.tbddev.org/authorize?issuerDid=${IssuerDidUri}`);
    if (!writeDataResponse.ok) {
      throw new Error(`Response status ${writeDataResponse.status}`);
    }
    const permissionJson = await writeDataResponse.json();
    return permissionJson;
  } catch (error) {
    console.error("An error occured");
    console.error(error.message);
  }
}

export default GetWritePermissions;