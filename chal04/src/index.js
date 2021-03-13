const h2 = document.querySelector('h2');

const now = new Date();
const day = now.getDate();
const month = now.getMonth();
const year = now.getFullYear();

const isPassingChris = (function (month, day) {
  if (month == 12 && day >= 25) {
    return true;
  }
  return false;
})(month, day);

const nextChrisYear = (function (isPassingChris, year) {
  if (isPassingChris) {
    return year + 1;
  } else {
    return year;
  }
})(isPassingChris, year);

const nextChirsDate = new Date(nextChrisYear, 11, 25);

let untilChris = nextChirsDate - now + 9 * 60 * 1000;

console.log(untilChris);

const convertMsToDate = (ms) => {
  const msToS = Math.round(ms / 1000);
  const seconds = parseInt(msToS % 60);
  const minutes = parseInt((msToS / 60) % 60);
  const hours = parseInt((msToS / 60 / 60) & 24);
  const days = parseInt(msToS / 60 / 60 / 24);
  return `${days}d ${hours > 10 ? hours : '0' + hours}h ${
    minutes > 10 ? minutes : '0' + minutes
  }m ${seconds > 10 ? seconds : '0' + seconds}s`;
};

const handleText = () => {
  const dDay = convertMsToDate(untilChris);
  untilChris -= 1000;
  h2.innerHTML = dDay;
};

setInterval(handleText, 1000);
