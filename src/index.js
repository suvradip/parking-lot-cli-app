const colors = require('colors');
const readline = require('readline');
const ParkingLot = require('./ParkingLot');
const { validateNumber } = require('./util/index');

const parkingLot = new ParkingLot();

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   terminal: false,
});

console.log(`List of supported commands are -`);
console.log('');
console.log(colors.cyan(`create_parking_lot <size>`));
console.log(colors.cyan(`park <registration number> <color>`));
console.log(colors.cyan(`leave <slot number>`));
console.log(colors.cyan(`status`));
console.log(colors.cyan(`registration_numbers_for_cars_with_colour <color>`));
console.log(colors.cyan(`slot_numbers_for_cars_with_colour <registration number>`));
console.log(colors.cyan(`press CTRL + c or type 'exit' to exit`));
console.log(`---------------X------------------`);
console.log('Please enter your command');

const takeInputs = (prompt, handler) => {
   rl.question(prompt, (input) => {
      if (handler(input)) {
         takeInputs(prompt, handler);
      } else {
         rl.close();
      }
   });
};

takeInputs('\n$ ', (input) => {
   // console.log(colors.cyan(`> ${input}`));
   const command = input.split(' ');
   switch (command[0]) {
      case 'create_parking_lot':
         try {
            if (validateNumber(command[1])) {
               parkingLot.createParkingLot(parseInt(command[1], 10));
            } else {
               console.log(colors.red('please enter a valid number'));
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

      case 'leave':
         try {
            if (validateNumber(command[1])) {
               parkingLot.leaveCar(parseInt(command[1], 10));
            } else {
               console.log('please enter a valid number'.red);
            }
         } catch (error) {
            console.warn('[status] Something went wrong'.red);
            console.error(error);
         }

         break;

      case 'registration_numbers_for_cars_with_colour':
         try {
            parkingLot.carsWithColor(command[1]);
         } catch (error) {
            console.warn('[registration_numbers_for_cars_with_colour] Something went wrong'.red);
            console.error(error);
         }

         break;

      case 'slot_numbers_for_cars_with_colour':
         try {
            parkingLot.carsWithColor(command[1]);
         } catch (error) {
            console.warn('[slot_numbers_for_cars_with_colour] Something went wrong'.red);
            console.error(error);
         }

         break;

      case 'help':
         break;

      case 'exit':
         return false;

      default:
         console.log('Nothing to do!');
         return true;
   }
   return true;
});
