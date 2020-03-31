const colors = require('colors');

colors.disable();
const ParkingLot = require('../src/ParkingLot');

const instance = new ParkingLot();

describe('Parking lot', () => {
   let logSpy;
   beforeEach(() => {
      logSpy = jest.spyOn(console, 'log').mockImplementation();
   });

   afterEach(() => {
      logSpy.mockRestore();
   });

   it('should create a parking space', () => {
      instance.createParkingLot(6);
      expect(logSpy).toHaveBeenCalledWith('Created a parking lot with 6 slots');
      expect(instance.spaceSize).toEqual(6);
   });

   it('should can park a car', () => {
      instance.parkCar('park KA-01-HH-3141', 'Black');
      expect(logSpy).toHaveBeenCalledWith('Allocated slot number: 1');
   });

   /* TODO:  */
   // it('should give status about filled spots and available spots', () => {
   //    instance.status();
   //    expect(logSpy).toHaveBeenCalledWith(`Slot No.      Registration No      Colour`);
   // });

   it('should can unpark a car', () => {
      instance.parkCar('park KA-04-TH-1341', 'White');
      instance.leaveCar(1);
      expect(logSpy).toHaveBeenCalledWith('Slot number 1 is free');
   });

   it('should find car by color', () => {
      instance.parkCar('WB-142-TYH-9341', 'Red');
      instance.parkCar('DL-X42-TYH-2341', 'Black');
      instance.parkCar('MH-Y42-601-1S41', 'Red');
      instance.carsWithColor('Red');
      expect(logSpy).toHaveBeenCalledWith('WB-142-TYH-9341, MH-Y42-601-1S41');
   });

   it('should find slot number by car registration number', () => {
      instance.getSlotsByRegNo('WB-142-TYH-9341');
      expect(logSpy).toHaveBeenCalledWith('1');
      instance.getSlotsByRegNo('NA-000-000');
      expect(logSpy).toHaveBeenCalledWith('Not found');
   });

   it('should find slot number by car colour', () => {
      instance.getSlotNoByColor('Red');
      expect(logSpy).toHaveBeenCalledWith('1, 4');
   });
});
