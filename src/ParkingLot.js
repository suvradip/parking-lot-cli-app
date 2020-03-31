const Car = require('./Car');
const Space = require('./Space');

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
         console.log(`Created a parking lot with ${this.spaceSize} slots`);
      } else {
         console.log(`Parking lot already created with ${this.spaceSize} slots.`);
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
         console.log('Parking lot is not created.');
      } else if (nearestSlot > 0) {
         const car = new Car(regNumber, color);
         const slot = new Space(nearestSlot);
         slot.setCar(car);
         this.space.set(nearestSlot, slot);
         console.log(`Allocated slot number: ${nearestSlot}`);
      } else {
         console.log('Sorry, parking lot is full');
      }
   }

   status() {
      if (this.spaceSize === 0) {
         console.log('Parking lot is not created.');
      } else {
         console.log('Slot No.      Registration No      Colour');
         this.space.forEach((space, slotNumber) => {
            if (!space.availability) {
               console.log(`${slotNumber}      ${space.car.regNo}      ${space.car.regNo}`);
            }
         });
      }
   }
}

module.exports = ParkingLot;
