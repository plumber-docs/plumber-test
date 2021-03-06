let fs = require('fs')
let SuperAgent = require('superagent')
class ToolExamples {
  static fromYamlFile(file, callback) {
      fs.readFile(file, 'utf8', (error, data) => {
      if (error) {
        throw(error);
      }
      SuperAgent
      .post('https://development-plumber-api.herokuapp.com/api/examples.json')
      .set('Content-Type', 'text/plain')
      .send(data)
      .end((error, result) => {
        if(error){
          throw(error)
        }
        callback(result.body)
      })
    });
  }
}

module.exports = ToolExamples