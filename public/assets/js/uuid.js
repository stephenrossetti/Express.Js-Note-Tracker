// Utilized Module 11 - Activity 22 code for UUID function to export a random number code for UUDI //
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);