// Need to add an ID as a key pair value to the notes in the JSON array //
// ID is used to determine specific note clicked/added/deleted in the pre-existing index.js code //
// Utilized Module 11 - Activity 22 code for UUID function to export a random number code for UUDI //

module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);