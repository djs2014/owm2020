const {promises: {readFile}} = require("fs");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let responseMessage = "";

    await readFile('data/dummy.json').then(fileBuffer => {
        // console.log(fileBuffer.toString());
        responseMessage = fileBuffer.toString();
      }).catch(error => {
        console.error(error.message);        
      });
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}