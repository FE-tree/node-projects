const commander = require('commander')

commander
  .version('0.0.1')
  .description('a test cli commander')
  .option('-n, --name <name>', 'your name', 'tree')
  .option('-a, --age <age>', 'your age', '22')
  .option('-e, --enjoy [enjoy]')
  .action(option => {
    console.log('name: ', option.name);
    console.log('age: ', option.age);
    console.log('enjoy: ', option.enjoy);
  })

  commander.parse(process.argv)