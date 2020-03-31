require('colors');
const readline = require('readline');
const ParkingLot = require('./ParkingLot');
const { validateNumber } = require('./util/index');

const parkingLot = new ParkingLot();

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   terminal: false,
});

const takeInputs = (prompt, handler) => {
   rl.question(prompt, (input) => {
      if (handler(input) !== false) {
         takeInputs(prompt, handler);
      } else {
         rl.close();
      }
   });
};

takeInputs('', (input) => {
   console.log(`> ${input}`.yellow);
   const command = input.split(' ');
   switch (command[0]) {
      case 'create_parking_lot':
         try {
            if (validateNumber(command[1])) {
               parkingLot.createParkingLot(parseInt(command[1], 10));
            } else {
               console.log('please enter a valid number');
            }
         } catch (error) {
            console.warn('[create_parking_lot] Something went wrong');
            console.error(error);
         }

         break;

      case 'park':
         try {
            parkingLot.parkCar(command[1], command[2]);
         } catch (error) {
            console.warn('[status] Something went wrong');
            console.error(error);
         }

         break;

      case 'status':
         try {
            parkingLot.status();
         } catch (error) {
            console.warn('[status] Something went wrong');
            console.error(error);
         }

         break;

      default:
         return undefined;
   }
   return undefined;
});
