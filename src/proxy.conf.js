let tokenValue=''
const PROXY_CONFIG = {
  "/tunnel": {
      "target": "http://localhost:8080/kuch-bhi-part2",
      "changeOrigin": true,
      "secure": false,
      "ws":false,
      //"logLevel": "debug",
      "onProxyRes": function(pr, req, res) {
        
        if (pr.headers['guacamole-tunnel-token']) {
            console.log("the token is (inside if condn.):",pr.headers['guacamole-tunnel-token']);
            tokenValue=pr.headers['guacamole-tunnel-token'];
          }
          console.log("the token is (outside if condn.):",pr.headers['guacamole-tunnel-token']);
        },
      "onProxyReq": function(pr, req, res) {
        if((pr.path.indexOf('write') != -1) || (pr.path.indexOf('read') != -1)){
          var result=pr.setHeader('Guacamole-Tunnel-Token', tokenValue);
        }
      }
    }
};
module.exports = PROXY_CONFIG;