const expect  = require('chai').expect;
const { getData, editData } = require("../index.js");


it('ensure html length meets expectations', (done) => {
    getData("https://www.nytimes.com").then((result) => {
      expect(result.length > 300000).to.be.true;
      done();
    });
});

it('ensure html structure meets expectations', (done) => {
    getData("https://www.nytimes.com").then((result) => {
      expect(
        result[0] +
          result[1] +
          result[2] +
          result[3] +
          result[4] +
          result[5] +
          result[6]
      ).to.equal("<!DOCTY");
      done();
    });
});
