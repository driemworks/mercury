# Mercury
Powered by
<div>
  <img src="https://github.com/driemworks/ipfs-ether-demo/blob/master/resources/ipfs-logo.png" width="250" height="250" >
  <img src="https://github.com/driemworks/ipfs-ether-demo/blob/master/resources/ethereum.jpg" width="250" height="250" />
</div>

Mercury is a REST API that interacts with orbit-db to interact with data stored in IPFS. Authentication to the API relies on ethereum, and is accomplished by verifying that a message has been signed by an expected user. Further interactions with the API is authenticated via a JWT token. 

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
    v: String,
    r: arrray,
    s: array,
    msg: String
  }
  ```

  where the v, r, and s values are as defined below
  - https://github.com/ConsenSys/eth-lightwallet#signingsignmsghashkeystore-pwderivedkey-msghash-signingaddress-hdpathstring
  - https://github.com/ConsenSys/eth-lightwallet#signingrecoveraddressrawmsg-v-r-s

### Upload

- URL: `host:port/update/{address}/{docstoreName}/{resourceId}`
- Description: The update endpoint creates a document or updates an existing document identified by its docstore name and id.
- Method: `PATCH`
- headers: `Content-Type: application/json`
- payload: `any string value`
- params:
  - `address`: The ethereum address to identify a unique docstore 
  - `docstoreName` is the name of the docstore in which the data will be persisted. For more information, view the orbit db documentation.
  - `id` is the unique id of a resource in the specified docstore.

### Read

- URL: `host:port/read/{address}/{docstoreName}/{id}`
- Description: The read endpoint retrieves an entry from orbit-db as specified by it's docstore name and id.
- Method: `GET`
- params:
  - `address`: The ethereum address to identify a unique docstore
  - `docstoreName` is the name of the docstore in which the data will be persisted. For more information, view the orbit db documentation.
  - `id` is the unique id of a resource in the specified docstore.
