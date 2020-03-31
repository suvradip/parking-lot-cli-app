class Space {
   constructor(slotId, available = true) {
      this.slotId = slotId;
      this.availability = available;
      this.car = null;
   }

   setCar(carInstance) {
      this.availability = false;
      this.car = carInstance;
   }

   leaveCar() {
      this.car = null;
      this.availability = true;
   }
}
module.exports = Space;
