# Mercury
Powered by
<div>
  <img src="https://github.com/driemworks/ipfs-ether-demo/blob/master/resources/ipfs-logo.png" width="250" height="250" >
  <img src="https://github.com/driemworks/ipfs-ether-demo/blob/master/resources/ethereum.jpg" width="250" height="250" />
</div>

Mercury is an API that provides authenticated access to event logs stored in IPFS via Orbit-DB. [TODO]

## TODOS

- add request validation (yup)
- security considerations
- test coverage

## Setup

- First, install ipfs. When running the app, run the daemon with pubsub enabled

    ``` bash
        ipfs daemon --enable-pubsub-experiment
    ```

- navigate to the root directory and execute

    ``` bash
        npm install
    ```

    and then

    ``` bash
        npm start
    ```

- by default, the API will run on port 3000.

## REST API

### Login

- URL: `host:port/login/{address}`
- Description: Authenticate with the API by signing a message with your ethereum account and allowing Mercury to verify the signature.
- Method: `POST`
- params:
  - address: The expected address of the ethereum account
- payload:

  ``` json
  {
    "v": "String",
    "r": "array",
    "s": "array",
    "msg": "String"
  }
  ```

  where the v, r, and s values are as defined below
  - https://github.com/ConsenSys/eth-lightwallet#signingsignmsghashkeystore-pwderivedkey-msghash-signingaddress-hdpathstring
  - https://github.com/ConsenSys/eth-lightwallet#signingrecoveraddressrawmsg-v-r-s

### Add Event

- URL: `host:port/{address}/events`
- Description: Allow the user to publish an event to their event log. 
- Method: `PATCH`
- headers: 
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>` : The JWT retrieved after logging in
- payload: `any string value`
- params:
  - `address`: The ethereum address to identify a unique docstore 
  - `docstoreName` is the name of the docstore in which the data will be persisted. For more information, view the orbit db documentation.
  - `id` is the unique id of a resource in the specified docstore.

### Retrieve Events

- URL: `host:port/{address}/events/{limit}`
- Description: Allow the user to read events from their event log.
- Method: `GET`
- headers: 
  - `Authorization: Bearer [token]` : The JWT retrieved after logging in
- params:
  - `address`: The ethereum address to identify a unique docstore
  - `limit` is the number of events to retrieve from the log
