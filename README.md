# Mercury
![symbol](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mercury_symbol.svg/1200px-Mercury_symbol.svg.png | width=200)


Mercury is a RESTful API which interacts with orbit-db to interact with data stored in IPFS. The intention is to provide applications with the ability to leverage IPFS/OrbitDB without having to rely on IPFS within the front end application. This allows front end applications, written in any language, to interact with IPFS without having to explicitly rely on it as a dependency. 

## Pending Items
[-] add request validation
[-] security considerations
[-] add tests 

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

### update 
- URL: `host:port/update/{docstoreName}/{resourceId}`
- Description: The update endpoint creates a document or updates an existing document identified by its docstore name and id.
- Method: `PATCH`
- headers: `Content-Type: application/json`
- payload: `any string value`
- params: 
    -  `docstoreName` is the name of the docstore in which the data will be persisted. For more information, view the orbit db documentation.
    -  `id` is the unique id of a resource in the specified docstore.



### read
- URL: `host:port/read/{docstoreName}/{id}`
- Description: The read endpoint retrieves an entry from orbit-db as specified by it's docstore name and id.
- Method: `GET`
- params: 
    -  `docstoreName` is the name of the docstore in which the data will be persisted. For more information, view the orbit db documentation.
    -  `id` is the unique id of a resource in the specified docstore.

