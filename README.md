# Getting Started

## Prerequisites
This projects uses Node.js. You must ensure to complete installation by :-
1.Node.js :- you can download node by official website https://nodejs.org.
2.npm :- It is default package manager for Node.js. 
After installation, verify by checking node version
```bash
node -v
```

## Run locally
Clone the project
```bash
git clone https://github.com/syednida01/Caching-Proxy-Server.git
```

Go to the project directory
```bash
cd Caching-Proxy-Server
```

Install dependencies
``` bash
npm install
```

# Usage
## Start the server
User should be able to start the caching proxy server by running a command like following:
``` bash
node ./index.js start-cache --port <number> --origin <url>
```

-`--port:` is the port on which the caching proxy server will run.
-`--origin:` is the URL of the server to which the requests will be forwarded.

For example, if the user runs the following command:
```bash
caching-proxy --port 3000 --origin http://dummyjson.com
```

## Clear the cache
User can be able to clear the cache by running following command:
```bash
node ./index.js clear-cache
```
