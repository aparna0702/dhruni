function formatIndianCurrency(number) {
  const [integerPart, decimalPart] = String(number).split(".");
  const formattedIntegerPart = integerPart.replace(
    /(\d)(?=(\d\d)+\d$)/g,
    "$1,"
  );
  const formattedNumber = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
  return `₹ ${formattedNumber}`;
}

function formatDateToString(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid Date object");
  }
  const formattedDateString = date.toLocaleString("en-US", {
    month: "short", // Short month name
    day: "2-digit", // Two-digit day of the month
    year: "numeric", // Full year
  });
  return formattedDateString;
}

function getSpentYearsAgent(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid Date object");
  }
  const currentDate = new Date();
  const spentYears = currentDate.getFullYear() - date.getFullYear();
  return spentYears;
}

function getDaysFromNow(providedTime) {
  var currentTime = new Date();
  var providedDateTime = new Date(providedTime);
  var timeDifference = currentTime - providedDateTime;
  var daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export {
  formatIndianCurrency,
  formatDateToString,
  getSpentYearsAgent,
  getDaysFromNow,
};
