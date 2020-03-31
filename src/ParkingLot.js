const colors = require('colors');
const Car = require('./Car');
const Space = require('./Space');

function search(data, size, fields) {
   const [[key, value]] = Object.entries(fields);
   const filteredData = [];
   for (let slotNumber = 1; slotNumber <= size; slotNumber += 1) {
      const space = data.get(slotNumber);
      if (!space.availability && space.car[key] === value) {
         filteredData.push({
            ...space,
         });

         if (space.car[key] === 'regNo') break;
      }
   }

   return filteredData;
}

class ParkingLot {
   constructor() {
      this.space = new Map();
      this.spaceSize = 0;
   }

   createParkingLot(size) {
      if (this.spaceSize === 0) {
         for (let i = 0; i < size; i += 1) {
            const slotNumber = i + 1;
            this.space.set(slotNumber, new Space(slotNumber));
         }

         this.spaceSize = size;
         console.log(colors.green(`Created a parking lot with ${this.spaceSize} slots`));
      } else {
         console.log(colors.yellow(`Parking lot already created with ${this.spaceSize} slots.`));
      }
   }

   get nearestSlotNumber() {
      let slot = 0;
      for (let slotNumber = 1; slotNumber <= this.spaceSize; slotNumber += 1) {
         const space = this.space.get(slotNumber);
         if (space.availability) {
            slot = slotNumber;
            break;
         }
      }

      return slot;
   }

   parkCar(regNumber, color) {
      const nearestSlot = this.nearestSlotNumber;
      if (this.spaceSize === 0) {
         console.log(colors.yellow('Parking lot is not created.'));
      } else if (nearestSlot > 0) {
         const car = new Car(regNumber, color);
         const slot = new Space(nearestSlot);
         slot.setCar(car);
         this.space.set(nearestSlot, slot);
         console.log(colors.green(`Allocated slot number: ${nearestSlot}`));
      } else {
         console.log('Sorry, parking lot is full');
      }
   }

   status() {
      if (this.spaceSize === 0) {
         console.log(colors.yellow('Parking lot is not created.'));
      } else {
         console.log('Slot No.      Registration No      Colour');
         this.space.forEach((space, slotNumber) => {
            if (!space.availability) {
               console.log(`${slotNumber}      ${space.car.regNo}      ${space.car.color}`);
            }
         });
      }
   }

   leaveCar(slotNumber) {
      if (this.spaceSize === 0) {
         console.log(colors.yellow('Parking lot is not created.'));
      } else if (this.space.has(slotNumber)) {
         if (!this.space.get(slotNumber).availability) {
            this.space.get(slotNumber).car = null;
            this.space.get(slotNumber).availability = true;
            console.log(`Slot No. ${slotNumber} is available for parking new vehicle now`);
         } else {
            console.log(`There is no vehicle parked at ${slotNumber}`.red);
         }
      }
   }

   carsWithColor(color = '') {
      if (this.spaceSize === 0) {
         console.log(colors.yellow('Parking lot is not created.'));
      } else {
         const result = search(this.space, this.spaceSize, { color });
         if (result.length === 0) console.log('Not found');
         console.log(colors.green(Array.prototype.map.call(result, (item) => item.car.regNo).join(', ')));
      }
   }

   carsWithRegNo(regNo = '') {
      if (this.spaceSize === 0) {
         console.log(colors.yellow('Parking lot is not created.'));
      } else {
         const result = search(this.space, this.spaceSize, { regNo });
         if (result.length === 0) console.log('Not found');
         console.log(colors.green(Array.prototype.map.call(result, (item) => item.slotId).join(', ')));
      }
   }
}

module.exports = ParkingLot;
