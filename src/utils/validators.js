export default function validateCpfCnpj(value) {
  function buildDigit(arr) {
    const isCpf = arr.length < 11;
    const digit =
      arr
        .map((val, idx) => {
          return val * ((!isCpf ? idx % 8 : idx) + 2);
        })
        .reduce((total, current) => {
          return total + current;
        }) % 11;

    if (digit < 2 && isCpf) return false;

    return 11 - digit;
  }

  const cpfCnpj = value.replace(/\D/g, "");

  const allEquals = cpfCnpj.split("").every(char => char === cpfCnpj[0]);
  if (allEquals) return false;

  if ([11, 14].indexOf(cpfCnpj.length) < 0) return false;

  const array = cpfCnpj
    .split("")
    .reverse()
    .slice(2);
  array.unshift(buildDigit(array));
  array.unshift(buildDigit(array));

  return cpfCnpj === array.reverse().join("");
}

const isDate = value => {
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(value)) return false;

  const parts = value.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

  return day > 0 && day <= monthLength[month - 1];
};

export { isDate };
