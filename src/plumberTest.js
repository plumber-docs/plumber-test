let TestRunner = require('./testRunner')
let ToolExamples = require('./toolExamples')
let _ = require('lodash')
let Mocha = require('mocha')
let Suite = Mocha.Suite


class PlumberTest {
  static runTests(directory) {
    console.log('Running Tests!')
    let mocha = new Mocha({timeout: 60000})
    let suite = Suite.create(mocha.suite, 'Plumber suite')

    ToolExamples.fromYamlFile(directory + '/plumber.yaml', (toolExamples) => {
      _.each(toolExamples.examples, (toolExample) => TestRunner.runTest(toolExample, suite))
      mocha.run((failures) => {
        process.on('exit', () => {
          process.exit(failures);
        });
      })
    })
  }
}

module.exports = PlumberTest