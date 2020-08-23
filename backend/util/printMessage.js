const printMessage = (message, info) => {
  console.log(
    "[-----------------------------------------------------------------------]"
  );
  console.log(`[${message}] : ${info}`);
  console.log(
    "[-----------------------------------------------------------------------]"
  );
};

module.exports = printMessage;
