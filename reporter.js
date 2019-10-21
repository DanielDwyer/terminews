const https = require('https');
const generateRandom = require('./user_agent_generator');

const httpsRequest = (params, postData) => new Promise((resolve, reject) => {
  var req = https.request(params, (res) => {
    // reject on bad status
    if (res.statusCode < 200 || res.statusCode >= 300) return reject(new Error('statusCode=' + res.statusCode));
    
    // cumulate data
    var body = [];
    res.on('data', (chunk) => {
      body.push(chunk);
    });

    // resolve on end
    res.on('end', () => {
      try {
        body = Buffer.concat(body).toString();
      } catch (e) {
        reject(e);
      }
      resolve(body);
    });
  });

  // reject on request error
  req.on('error', (err) => {
    // This is not a "Second reject", just a different sort of failure
    reject(err);
  });

  if (postData) req.write(postData);
  
  // IMPORTANT to call end on request
  req.end();
});


const reporter = () => {
  const headers = {
    'User-Agent': generateRandom.userAgent()
  };

  const options = {
    host: 'www.nytimes.com',
    headers: headers,
    method: 'GET',
  };

  return httpsRequest(options);
};

module.exports = {
  report: () => {
    //test route
    return "News news news!"
  },
  reporter,
}
