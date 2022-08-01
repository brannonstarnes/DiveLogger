export default function stringifyTime(dateObj: Date) {
  let hours = addLeadingZerosToTimes(dateObj.getHours());
  let min = addLeadingZerosToTimes(dateObj.getMinutes());
  let sec = addLeadingZerosToTimes(dateObj.getSeconds());
  console.log(hours, ":", min, "::", sec);

  return `${hours}:${min}::${sec}`;
}

export function addLeadingZerosToTimes(timeIncrement: number | string) {
  if (timeIncrement < 10) {
    console.log("added zero to ", timeIncrement);
    timeIncrement = `0${timeIncrement}`;
  }
  return timeIncrement;
}

export function roundUpTime(time: number) {
  let conversion = time / 60000;
  let newTime = Math.ceil(conversion);
  return addLeadingZerosToTimes(newTime);
}

export function millisToMinutesAndSeconds(millis: number) {
  var minutes = Math.floor(millis / 60000);
  var seconds = (millis % 60000) / 1000;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
}
