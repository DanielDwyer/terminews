const https = require('https')

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
    'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 9_3_5 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13G36 Safari/601.1'
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
