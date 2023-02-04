import http from 'node:http';
import url from 'node:url';

const createLoadBalancer = (servers: string[]) => {
    let serverIndex = 0;

    const getServerURL = () => {
        if (serverIndex === servers.length) {
            serverIndex = 0;
        }
        return servers[serverIndex++];
    };

    return http.createServer(async (req, res) => {
        try {
            const serverURL = getServerURL();
            const { hostname, port } = url.parse(serverURL);

            console.log(`Operation processed on the ${port} port`);

            const options = {
                hostname,
                port,
                path: req.url,
                method: req.method,
                headers: req.headers,
            };

            const proxy = http.request(options, proxyRes => {
                Object.keys(proxyRes.headers).forEach(header => {
                    res.setHeader(header, proxyRes.headers[header] || '');
                });
                res.statusCode = proxyRes.statusCode ?? 404;
                proxyRes.pipe(res);
            });

            req.pipe(proxy);
        } catch (e) {
            console.log(e);
            res.writeHead(500, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    });
};

export default createLoadBalancer;
