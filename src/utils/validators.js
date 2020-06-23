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
