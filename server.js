const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');


class CachingProxyServer{
    constructor(port,origin){
        this.port = port;
        this.origin = origin;
        this.app = express();
        this.cache = new NodeCache({stdTTL:3600});//default ttl set to 10 minute = 600 sec
    }

    async handleRequest(req,res){
        const url = `${this.origin.replace(/\/+$/,'')}/${req.originalUrl.replace(/^\+/,'')}`;
        console.log(`forwarding req to: ${url}`);
        const cachedResponse = this.cache.get(url);

        if(cachedResponse){
            res.setHeader('X-Cache','HIT');
            return res.status(200).send(cachedResponse.data);
        }
    
        try{
            const result = await axios.get(url);
            const resultData = result.data; //simplified data
            this.cache.set(url , resultData);
            res.setHeader('X-Cache','MISS');
            res.status(result.status).send(resultData);
        }
    
        catch(error){
            console.log(`error fetching data from: ${url}`);
            return res.status(500).json({error:'failed to fetch data'});
        }
    }

    start(){
        this.app.get('*', this.handleRequest.bind(this));
        this.app.listen(this.port , ()=>{
            console.log(`caching proxy server running on port ${this.port}`);
        });
    }

    clearCache(){
        this.cache.flushAll();
    }
}

module.exports = CachingProxyServer;