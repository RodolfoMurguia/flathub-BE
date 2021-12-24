//helper function to get the env data from the file

import * as dotenv from 'dotenv';
import * as fs from 'fs';

let localData: any ;

if (process.env.NODE_ENV) {
    localData = dotenv.parse(fs.readFileSync(`.env`));
} else {
    localData = dotenv.parse(fs.readFileSync('.env'));
}

console.log(localData);
export const envData = localData;