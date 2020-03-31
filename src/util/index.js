function validateNumber(value) {
   const num = Number(value);
   if (typeof num === 'number' && !Number.isNaN(num)) return true;
   return false;
}

function validateRegNoFormat() {}

module.exports = {
   validateNumber,
   validateRegNoFormat,
};
