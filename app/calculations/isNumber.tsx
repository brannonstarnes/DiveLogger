 //Checks textInputs for numbers only
 export default function isNumber(value: any) {
    return /^[0-9]+$/.test(value);
  }