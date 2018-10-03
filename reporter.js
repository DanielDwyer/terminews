const https = require('https')
const generateRandom = require('./user_agent_generator')

function httpsRequest(params, postData) {
    return new Promise(function(resolve, reject) {
        var req = https.request(params, function(res) {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            // resolve on end
            res.on('end', function() {
                try {
                    body = Buffer.concat(body).toString();
                } catch(e) {
                    reject(e);
                }
                /*
                NOTE - Access html that needs parsing here (body is a JS string)
                */
                //console.log("/n/n",body,"/n/n");
                resolve(body);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        // IMPORTANT
        req.end();
    });
}

const reporter = () => {

  const headers = {
    'User-Agent': generateRandom.userAgent()
  }

  const options = {
    host: 'www.nytimes.com',
    headers: headers,
    method: 'GET',
  }

  return httpsRequest(options)
}

// reporter().then((result) => {console.log("result",result)})

module.exports = {
  report: () => {
    //test route
    return "News news news!"
  },
  reporter:reporter,
}
