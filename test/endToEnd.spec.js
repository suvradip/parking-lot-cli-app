const path = require('path');

const { spawn } = require('child_process');

const ops = () => {
   const inputFile = path.resolve(__dirname, 'data', 'input.txt');
   const cliApp = path.resolve(__dirname, '..', 'src', 'index.js');
   const app = spawn('node', [cliApp, inputFile, '--no-color']);

   return new Promise((resolve, reject) => {
      let output = '';
      app.stdout.on('data', (chunk) => {
         output += chunk.toString();
      });
      app.on('error', (err) => {
         reject(err);
      });
      app.on('exit', () => {
         resolve(output.trim());
      });
   });
};

describe('End To End Suite', () => {
   it('full scenarios', async () => {
      const expected = [
         'Created a parking lot with 6 slots',
         'Allocated slot number: 1',
         'Allocated slot number: 2',
         'Allocated slot number: 3',
         'Allocated slot number: 4',
         'Allocated slot number: 5',
         'Allocated slot number: 6',
         'Slot number 4 is free',
         'Slot No.\tRegistration No\t\tColour',
         '1\t\tKA-01-HH-1234\t\tWhite',
         '2\t\tKA-01-HH-9999\t\tWhite',
         '3\t\tKA-01-BB-0001\t\tBlack',
         '5\t\tKA-01-HH-2701\t\tBlue',
         '6\t\tKA-01-HH-3141\t\tBlack',
         'Allocated slot number: 4',
         'Sorry, parking lot is full',
         'KA-01-HH-1234, KA-01-HH-9999, KA-01-P-333',
         '1, 2, 4',
         '6',
         'Not found',
      ];
      const data = await ops();

      expect(data).toEqual(expected.join('\n'));
   });
});
