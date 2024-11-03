# kcc-hackathon

To install dependencies:

```bash
npm install
```

To run:

```bash
node index.js
```

This project was created using `npm init`.

# ALL STEPS FOLLOWED IN THE INSTRUCTIONS

1. Creating the DID and DWN as the issuer using the Community DWN.
2. Issuing Alice a KCC that includes evidence and changing it to a VC JWT.
3. Installing protocol to issuers DWN.
4. Obtain permission to write to Alice DWN.
5. Store the VC JWT as a private record in Alice DWN.
6. Get Record Id from Alice DID DWN Record.

# Functionalities

1. Can store protocols under the protocol folder for easier installation and editing of protocols.
2. The DID persists after it is created.
3. The Credentials are equally stored in a folder for easier send and editing if necessary.
4. All the steps are followed to the letter with error handling in the case of a failure.
5. Test files can be created to tests the functions if necessary.
6. Used services folder to save the api for requesting permissions.
7. Step by step output of the services are logged on the screen in order to show progress.
8. The app is modular to ensure best programming experience of the app.
9. The password is not inputted for the sake of the hackathon.
