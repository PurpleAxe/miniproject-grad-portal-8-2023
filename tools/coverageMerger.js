// https://yonatankra.com/how-to-create-a-workspace-coverage-report-in-nrwl-nx-monorepo/

const glob = require('glob');
const fs = require('fs');
const path = require('path');

const getLcovFiles = function () {
 return glob.sync('coverage/**/lcov.info');
};

(async function(){
  const files = getLcovFiles();
  const mergedReport = files.reduce((mergedReport, currFile) => mergedReport += fs.readFileSync(currFile), '');
  await fs.writeFile(path.resolve('./coverage/lcov.info'), mergedReport, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})();