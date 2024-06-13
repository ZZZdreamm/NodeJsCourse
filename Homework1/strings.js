function addStrings(str1, str2) {
  let result = "";
  let carry = 0;
  let i = str1.length - 1;
  let j = str2.length - 1;

  while (i >= 0 || j >= 0 || carry) {
    const digit1 = i >= 0 ? parseInt(str1[i]) : 0;
    const digit2 = j >= 0 ? parseInt(str2[j]) : 0;
    const sum = digit1 + digit2 + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }

  return result;
}


function subtractStrings(str1, str2) {
    let result = "";
    let borrow = 0;

    // Checking if result will be negative is needed for division operation
    let negative = false;
    if (str1.length < str2.length || (str1.length === str2.length && str1 < str2)) {
      negative = true;
      let temp = str1;
      str1 = str2;
      str2 = temp;
    }

    let i = str1.length - 1;
    let j = str2.length - 1;

    while (i >= 0) {
      const digit1 = parseInt(str1[i]) - borrow;
      const digit2 = j >= 0 ? parseInt(str2[j]) : 0;
      borrow = 0;

      if (digit1 < digit2) {
        borrow = 1;
        result = String(10 + digit1 - digit2) + result;
      } else {
        result = String(digit1 - digit2) + result;
      }

      i--;
      j--;
    }

    result = result.replace(/^0+/, "");

    if (negative) {
      result = "-" + result;
    }

    return result || "0";
  }

function multiplyStrings(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const result = Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = parseInt(str1[i]) * parseInt(str2[j]);
      const sum = mul + result[i + j + 1];
      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }

  return result.join("").replace(/^0+/, "") || "0";
}

function divideStrings(dividend, divisor) {
  let quotient = "";
  let remainder = "";

  if(divisor === "0") {
    return "Error: Division by zero";
  }

  for (let i = 0; i < dividend.length; i++) {
    remainder += dividend[i];
    let quotientDigit = 0;
    remainder = remainder.replace(/^0+/, "");
    while (subtractStrings(remainder, divisor) >= "0") {
      remainder = subtractStrings(remainder, divisor);
      quotientDigit++;
    }

    quotient += quotientDigit;
  }
  return quotient.replace(/^0+/, "") || "0";
}

String.prototype.plus = function (other) {
  return addStrings(this, other);
};

String.prototype.minus = function (other) {
  return subtractStrings(this, other);
};

String.prototype.multiply = function (other) {
  return multiplyStrings(this, other);
};

String.prototype.divide = function (other) {
  return divideStrings(this, other);
};

const a = "100000000000000000000000";
const b = "99999999999999999999999";

console.log(`${a} + ${b} = ${a.plus(b)}`);
console.log(`${a} - ${b} = ${a.minus(b)}`);
console.log(`${a} * ${b} = ${a.multiply(b)}`);
console.log(`${a} / ${b} = ${a.divide(b)}`, "\n");

const c = "54321";
const d = "10000";

console.log(`${c} + ${d} = ${c.plus(d)}`);
console.log(`${c} - ${d} = ${c.minus(d)}`);
console.log(`${c} * ${d} = ${c.multiply(d)}`);
console.log(`${c} / ${d} = ${c.divide(d)}`, "\n");

const e = "100";
const f = "200";

console.log(`${e} + ${f} = ${e.plus(f)}`);
console.log(`${e} - ${f} = ${e.minus(f)}`);
console.log(`${e} * ${f} = ${e.multiply(f)}`);
console.log(`${e} / ${f} = ${e.divide(f)}`, "\n");

console.log(`1 * 1 = ${"1".multiply("1")}`);
console.log(`100 - 100 = ${"100".minus("100")}`);
console.log(`12345 / 1 = ${"12345".divide("1")}`);
console.log(`12345 / 0 = ${"12345".divide("0")}`);


const g = "4444444444444444444000000000000000000000000000"
const h = "2"

console.log(`${g} / ${h} = ${g.divide(h)}`)

// Algorithm is correct and works as expected. Also, it works if second number is bigger than first number.