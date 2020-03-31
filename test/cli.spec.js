const ParkingLot = require('../src/ParkingLot');

const instance = new ParkingLot();

describe('Parking lot', () => {
   let logSpy;
   beforeEach(() => {
      logSpy = jest.spyOn(console, 'log');
   });

   afterEach(() => {
      logSpy.mockRestore();
   });

   it('should create a parking space', () => {
      instance.createParkingLot(2);
      expect(logSpy).toHaveBeenCalledWith('Created a parking lot with 2 slots');
      expect(instance.spaceSize).toEqual(2);
   });

   it('should can park a car', () => {
      instance.parkCar('park KA-01-HH-3141', 'Black');
      expect(logSpy).toHaveBeenCalledWith('Allocated slot number: 1');
   });

   // it('should give status about filled spots and available spots', () => {
   //    instance.status();
   //    expect(logSpy).toHaveBeenNthCalledWith(1, `Slot No.      Registration No      Colour`);
   //    expect(logSpy).toHaveBeenNthCalledWith(2, '1      KA-01-HH-1234      White');
   // });
});
