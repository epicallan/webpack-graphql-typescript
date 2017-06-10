const makeTypeDefs = require('../dist/makeTypeDefs');

try {
    makeTypeDefs.generateTsFromGql({outFile: 'src/types/global.d.ts'});
} catch(error) {
    console.log(error);
}