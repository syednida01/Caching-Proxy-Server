const yargs = require('yargs');
const CachingProxyServer = require('./server');


yargs.command('start','start caching proxy server',
    {
        port:{
            describe : 'port to run server on',
            demandOption :true,
            type : 'number'
        },
        origin: {
            describe : 'origin server url',
            demandOption : true,
            type : 'string',
        },
    },
    (argv) => {
        const {port, origin} = argv;
        const server = new CachingProxyServer(port , origin);
        server.start();
    }
)
.command('clear' , 'clear the cache',
    {},
    () => {
        const server = new CachingProxyServer();
        server.clearCache();
        console.log('cached has cleared');
    }
)
.help()
.argv;