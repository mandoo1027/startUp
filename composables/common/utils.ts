import * as XLSX from "xlsx";
import _ from "lodash";

export const $utils = {
  /**
   * 유효성 체크 공통 함수
   * return {true or false, errorMessages[]}
   */
  validateForm: (formRef: any) => {
    formRef?.value?.validate();
    let isValid = true;
    let validId = "";
    const errorMessages: string[] = [];

    formRef.value.items.forEach((item: any) => {
      if (!item.isValid) {
        if (!validId) {
          validId = item.id;
        }
        isValid = item.isValid;

        errorMessages.push(...item.errorMessages);
      }
    });

    if (errorMessages.length > 0) {
      $fx.throwAlert("입력항목 경고 메세지를 확인하세요.", "경고").then(() => {
        document.getElementById(validId).focus();
      });
    }

    return { isValid, errorMessages };
  },
  /**
   * 유효성 체크 공통 함수
   * return true,false
   */
  validate: async (validateForm: any) => {
    let result = await validateForm.value.validate();
    if (result.hasOwnProperty("valid")) {
      return result.valid;
    } else {
      return result?.length === 0 ? true : false;
    }
  },
  /**
   * 주어진 년, 월, 일만큼 현재 날짜에 더하거나 뺀 날짜를 '년-월-일' 형태로 반환.
   *
   * @param {number} yearsToAdd - 더하거나 뺄 년 (음수일 경우 빼기)
   * @param {number} monthsToAdd - 더하거나 뺄 월 (음수일 경우 빼기)
   * @param {number} daysToAdd - 더하거나 뺄 일 (음수일 경우 빼기)
   * @returns {Date} - '변경된 Date
   */
  getDate: (yearsToAdd = 0, monthsToAdd = 0, daysToAdd = 0) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + yearsToAdd);
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
    currentDate.setDate(currentDate.getDate() + daysToAdd);

    return currentDate;
  },

  /**
   * 주어진 년, 월, 일만큼 현재 날짜에 더하거나 뺀 날짜를 '년월일' 숫자만 문자열로 형태로 반환.
   *
   * @param {number} yearsToAdd - 더하거나 뺄 년 (음수일 경우 빼기)
   * @param {number} monthsToAdd - 더하거나 뺄 월 (음수일 경우 빼기)
   * @param {number} daysToAdd - 더하거나 뺄 일 (음수일 경우 빼기)
   * @returns {Date} - '변경된 Date
   */
  getDateYYYYMMDD: (yearsToAdd = 0, monthsToAdd = 0, daysToAdd = 0) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + yearsToAdd);
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
    currentDate.setDate(currentDate.getDate() + daysToAdd);

    return $utils.formatDate(currentDate).replace(/-/gi, "");
  },

  /**
   * 14자리 날짜str값을 format형태로 변경하여 전달한다
   * @param {string} dateString - 14자리 날짜str
   * @param {string} format - 대문자 format형식
   */
  getFormatDate: (dateString: string, format = "YYYY-MM-DD HH:MM:SS") => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hours = dateString.substring(8, 10);
    const minutes = dateString.substring(10, 12);
    const seconds = dateString.substring(12, 14);

    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    return format
      .replace("YYYY", date.getFullYear())
      .replace("MM", String(date.getMonth() + 1).padStart(2, "0"))
      .replace("DD", String(date.getDate()).padStart(2, "0"))
      .replace("HH", String(date.getHours()).padStart(2, "0"))
      .replace("MM", String(date.getMinutes()).padStart(2, "0"))
      .replace("SS", String(date.getSeconds()).padStart(2, "0"));
  },

  /**
   *  랜덤값 리턴
   * @returns 난수 10개
   */
  getRandomNumber: () => {
    let randomNumbers = [];
    for (let i = 0; i < 10; i++) {
      randomNumbers.push(Math.floor(Math.random() * 10));
    }
    let combinedString = randomNumbers.join("");
    return combinedString;
  },
  /**
   * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
   * ex) if (isEmpty(form.keyword)) {
   * alert!("검색조건을 입력하세요.");
   * }
   */
  isEmpty(value: any) {
    if (!value) {
      return true;
    }
    return false;
  },

  findMenu(menuList: Array, toPath: string) {
    const result = _.find(
      menuList,
      (item) =>
        toPath.indexOf(item.menuCode) > -1 || toPath.indexOf(item.filePath) > -1
    );
    if (result) {
      return result;
    }

    for (let i = 0; i < menuList?.length; i++) {
      let childData = menuList[i];
      let foundMenu = this.findMenu(childData?.children, toPath);
      if (foundMenu) {
        return foundMenu;
      }
    }
    return null;
  },
  /**
   * 입력값에 특정 문자(chars)가 있는지 체크
   * 특정 문자를 허용하지 않으려 할 때 사용
   * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
   * alert!("이름 필드에는 특수 문자를 사용할 수 없습니다.");
   * }
   */
  containsChars(value: string, chars: string) {
    for (var inx = 0; inx < value.length; inx++) {
      if (chars.indexOf(value.charAt(inx)) != -1) return true;
    }
    return false;
  },

  /**
   * 입력값이 특정 문자(chars)만으로 되어있는지 체크
   * 특정 문자만 허용하려 할 때 사용
   * ex) if (!this.containsCharsOnly(form.blood,"ABO")) {
   * alert!("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
   * }
   */
  containsCharsOnly(value: string, chars: string) {
    for (var inx = 0; inx < value.length; inx++) {
      if (chars.indexOf(value.charAt(inx)) == -1) return false;
    }
    return true;
  },

  /**
   * 입력값이 알파벳인지 체크
   * 아래 isAlphabet() 부터 isNumComma()까지의 메소드가
   * 자주 쓰이는 경우에는 var chars 변수를
   * global 변수로 선언하고 사용하도록 한다.
   * ex) var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   * var lowercase = "abcdefghijklmnopqrstuvwxyz";
   * var number = "0123456789";
   * isAlphaNum(value) {
   * var chars = uppercase + lowercase + number;
   * return this.containsCharsOnly(value,chars);
   * }
   */
  isAlphabet(value: string) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값이 알파벳 대문자인지 체크
   */
  isUpperCase(value: string) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값이 알파벳 소문자인지 체크
   */
  isLowerCase(value: string) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값에 숫자만 있는지 체크
   */
  isNumber(value: string) {
    var chars = "0123456789";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값이 알파벳,숫자로 되어있는지 체크
   */
  isAlphaNum(value: string) {
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값이 숫자,대시(-)로 되어있는지 체크
   */
  isNumDash(value: string) {
    var chars = "-0123456789";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값이 숫자,콤마(,)로 되어있는지 체크
   */
  isNumComma(value: string) {
    var chars = ",0123456789";
    return this.containsCharsOnly(value, chars);
  },

  /**
   * 입력값이 이메일 형식인지 체크
   * ex) if (!isValidEmail(form.email)) {
   * alert!("올바른 이메일 주소가 아닙니다.");
   * }
   */
  isValidEmail(value: string) {
    // var format = /^(\S+)@(\S+)\.([A-Za-z]+)$/;
    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    return isValidFormat(value, format);
  },

  /**
   * 입력값이 전화번호 형식(숫자-숫자-숫자)인지 체크
   */
  isValidPhone(value: string) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(value, format);
  },

  formatMaskPhoneNumber(phoneNumber: String) {
    if (!phoneNumber) return;
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    const maskedPhoneNumber = `010-${digitsOnly.substring(3, 5)}**-****`;
    return maskedPhoneNumber;
  },
  formatPhoneNumber(phoneNumber: String) {
    if (!phoneNumber) return;
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    const maskedPhoneNumber = `${digitsOnly.substring(0, 3)}-${digitsOnly.substring(
      3,
      7
    )}-${digitsOnly.substring(7)}`;
    return maskedPhoneNumber;
  },
  /**
   * 날짜 포맷 리턴
   *  dateStr : 20230101
   *  format : . , - , /
   *  isShowFormat : ture , false
   **/
  formatDate(
    dateStr: String,
    format: String = "-",
    isShowFormat: Boolean = true
  ) {
    if (!isShowFormat) {
      format = "";
    }
    if (!dateStr) return "";
    if (typeof dateStr === "object") {
      const nowDate = new Date(dateStr);
      const year = nowDate.getFullYear();
      const month = String(nowDate.getMonth() + 1).padStart(2, "0");
      const date = String(nowDate.getDate()).padStart(2, "0");
      const returnDate = `${year}${format}${month}${format}${date}`;
      return returnDate;
    } else {
      const strDate = dateStr.substr(0, 8);
      const returnDate = `${strDate.substr(0, 4)}${format}${strDate.substr(
        4,
        2
      )}${format}${strDate.substr(6, 2)}`;
      return returnDate;
    }
  },

  /**
   * 입력값의 바이트 길이를 리턴
   * ex) if (getByteLength(form.title) > 100) {
   * alert!("제목은 한글 50자(영문 100자) 이상 입력할 수 없습니다.");
   * }
   * Author : Wonyoung Lee
   */
  getByteLength(value: string) {
    var byteLength = 0;
    for (var inx = 0; inx < value.length; inx++) {
      var oneChar = escape(value.charAt(inx));
      if (oneChar.length == 1) {
        byteLength++;
      } else if (oneChar.indexOf("%u") != -1) {
        byteLength += 2;
      } else if (oneChar.indexOf("%") != -1) {
        byteLength += oneChar.length / 3;
      }
    }
    return byteLength;
  },
  /**
   * currency 표현. 세자리 마다 콤마
   */
  numberCurrencyFormat(n, x) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
  },

  /**
   * 입력값에서 콤마를 없앤다.
   */
  removeComma(value: string) {
    return value.replace(/,/gi, "");
  },
  /**
   * 입력 숫자에서 천단위 콤마 추가.
   */
  addComma(value: any) {
    if (value === 0 || !value) value = "0";
    if (this.isEmpty(value) || !this.isNumber(value)) {
      return;
    }
    const numbercValue = parseFloat(value);
    return numbercValue.toLocaleString("en-Us");
  },
  addNumDashComma(value: any) {
    if (value === 0) value = "0";
    if (this.isEmpty(value) || !this.isNumDash(value)) {
      return;
    }
    const numbercValue = parseFloat(value);
    return numbercValue.toLocaleString("en-Us");
  },
  excelRead(file, excelReadData) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary", codepage: 949 });

      // 예를 들어 첫 번째 워크시트의 데이터를 가져옵니다.
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];

      // 워크시트의 데이터를 JSON 형식으로 변환합니다.
      const dataParsed = XLSX.utils.sheet_to_json(ws);
      excelReadData.value = dataParsed;
    };
    reader?.readAsBinaryString(file);
  },
  excelDownCsv(filename, data) {
    //데이터를 워크시트로 변환
    const worksheet = XLSX.utils.json_to_sheet(data);

    //워트시트를 워크북에 추가
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    //CSV 형식으로 내보내기
    XLSX.writeFile(workbook, filename + ".csv");
  },
  makeRowData(readData) {},
  /**
   *  list : 배열 리스트
   *  정렬 대상 컬럼
   *   true : asc , false : desc
   */

  sortByColumn(list, column, ascending = true) {
    list.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (ascending) {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  },

  /**
   * 2023.11.09 numberhan, ciphers_han, num_han   추가
   * 숫자를 한글로 전환 (소수점,'-'부호는 변환하지않음) ASIS기준 mode값 2만사용/소수점X -> TOBE에서 생락
   */
  numberhan(num: String) {
    console.log("numberhan==", num);
    let sNumberHan = "";

    if (this.isEmpty(num) || num === "0") {
      return;
    }

    num = String(num);
    if (num.indexOf(".") > -1) {
      return;
    } else {
      num = num.replace(/,/gi, "");
      let len = num.length;
      let temp1 = "";
      let temp2 = "";
      let mark = num.indexOf("-"); // 숫자에 -가 입력되었을 경우 한글로 변환하지 않음.

      if (mark >= 0) {
        num = num.substr(mark + 1, len);
        len = len - 1;
      }

      if (len / 4 > 3 && len / 4 <= 4) {
        if (len % 4 == 0) {
          temp1 =
            this.ciphers_han(num.substring(0, 4), "조") +
            this.ciphers_han(num.substring(4, 8), "억") +
            this.ciphers_han(num.substring(8, 12), "만") +
            this.ciphers_han(num.substring(12, 16), "");
        } else {
          temp1 =
            (num.substring(0, len % 4), "조") +
            this.ciphers_han(num.substring(len % 4, (len % 4) + 4), "억") +
            this.ciphers_han(
              num.substring((len % 4) + 4, (len % 4) + 8),
              "만"
            ) +
            this.ciphers_han(num.substring((len % 4) + 8, (len % 4) + 12), "");
        }
      } else if (len / 4 > 2 && len / 4 <= 3) {
        if (len % 4 == 0) {
          temp1 =
            this.ciphers_han(num.substring(0, 4), "억") +
            this.ciphers_han(num.substring(4, 8), "만") +
            this.ciphers_han(num.substring(8, 12), "");
        } else {
          temp1 =
            this.ciphers_han(num.substring(0, len % 4), "억") +
            this.ciphers_han(num.substring(len % 4, (len % 4) + 4), "만") +
            this.ciphers_han(num.substring((len % 4) + 4, (len % 4) + 8), "");
        }
      } else if (len / 4 > 1 && len / 4 <= 2) {
        if (len % 4 == 0) {
          temp1 =
            this.ciphers_han(num.substring(0, 4), "만") +
            this.ciphers_han(num.substring(4, len), "");
        } else {
          temp1 =
            this.ciphers_han(num.substring(0, len % 4), "만") +
            this.ciphers_han(num.substring(len % 4, len), "");
        }
      } else if (len / 4 <= 1) {
        temp1 = this.ciphers_han(num.substring(0, len), "");
      }

      for (var i = 0; i < temp1.length; i++) {
        temp2 = temp2 + this.num_han(temp1.substring(i, i + 1));
      }

      let temp3 = String(temp2);
      temp3 = temp3.replace(/억 만/gi, "억 ");
      temp3 = temp3.replace(/조 억/gi, "조 ");

      if (mark >= 0) {
        temp3 = "-" + temp3;
      }

      return temp3;
    }
  },

  ciphers_han(num: String, unit: String) {
    console.log("ciphers_han=num=", num);
    console.log("ciphers_han=unit=", unit);
    let len = num.length;
    let temp = "";

    if (len === 1) {
      temp = num;
    } else if (len === 2) {
      temp = num.substring(0, 1) + "십" + num.substring(1, 2);
    } else if (len === 3) {
      temp =
        num.substring(0, 1) +
        "백" +
        num.substring(1, 2) +
        "십" +
        num.substring(2, 3);
    } else if (len === 4) {
      temp =
        num.substring(0, 1) +
        "천" +
        num.substring(1, 2) +
        "백" +
        num.substring(2, 3) +
        "십" +
        num.substring(3, 4);
    }

    num = new String(temp);
    num = num.replace(/0십/gi, "");
    num = num.replace(/0백/gi, "");
    num = num.replace(/0천/gi, "");

    if (num != "0" && !this.isEmpty(unit)) {
      num += unit;
    }
    return num;
  },

  num_han(num: String) {
    if (num === "1") return "일";
    else if (num === "2") return "이";
    else if (num === "3") return "삼";
    else if (num === "4") return "사";
    else if (num === "5") return "오";
    else if (num === "6") return "육";
    else if (num === "7") return "칠";
    else if (num === "8") return "팔";
    else if (num === "9") return "구";
    else if (num === "십") return "십";
    else if (num === "백") return "백";
    else if (num === "천") return "천";
    else if (num === "만") return "만";
    else if (num === "억") return "억";
    else if (num === "조") return "조";
    else if (num === "0") return "";
  },

  /**
   * 사업자번호
   * 2023.11.22   추가
   * 10자리 사업자 번호  1234567890=> 123-45-67890
   */
  bizNumberformatter(params: String) {
    if (!$utils.isEmpty(params)) {
      return (
        params.substring(0, 3) +
        "-" +
        params.substring(3, 5) +
        "-" +
        params.substring(5)
      );
    }
    return "";
  },

  /**
   * 입력값에서 HTML 특수코드를 특수문자로 변환
   */
  convertRegexToHtml(value: string) {
    if (value) {
      value = value.replaceAll("&amp;", "&");
      value = value.replaceAll("&quot;", '"');
      value = value.replaceAll("&#39;", "'");
      value = value.replaceAll("&rarr;", "→");
      value = value.replaceAll("\n", "</br>");
      return value;
    }
  },
  convertRegexToText(value: string) {
    if (value) {
      value = value.replaceAll("&amp;", "&");
      value = value.replaceAll("&lt;", "<");
      value = value.replaceAll("&gt;", ">");
      value = value.replaceAll("&quot;", '"');
      value = value.replaceAll("&#39;", "'");
      value = value.replaceAll("&rarr;", "→");
      return value;
    }
  },

  /**
   * 공통코드리스트 값 가져오기
   * codeList : 공통코드 리스트
   * code 찾을 코드
   * isDeep : 객체로 리턴 여부
   */
  getCodeValue(codeList: Array, code: String, isDeep: boolean = false) {
    const findData = codeList.find((item) => item.code === code);
    if (isDeep) {
      return findData;
    } else {
      return findData?.name;
    }
  },
};
