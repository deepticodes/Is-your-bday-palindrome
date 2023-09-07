function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}
//console.log(reverseStr('hello'));

function isPalindrome(str) {
    var reverse = reverseStr(str);
    if(str == reverse) {
        return true;
    }
    return false;
}
// console.log(isPalindrome('242'));
// console.log(isPalindrome('oppo'));
// console.log(isPalindrome('racecar'));
// console.log(isPalindrome('mom'));

// function isPalindrome(str) {
//     var reverse = reverseStr(str);
//     return str === reverseStr;
// }


function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };
    if(date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    //month
    if(date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    //year
    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.date + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

//gets Next date
function getNextDate(date) {
    var day = date.day + 1; // increment the day => 32
    var month =date.month;
    var year = date.year;

    var daysInMonth =  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

    //check for february
    if(month == 2) {
        //check for leap year
        if(isLeapYear(year)) { // 2020 => true
            if(day > 29){ // false
                day = 1;
                month++; // increment the month
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++; // increment the month
            }
        }
    }
    // check for other formats
    else{
        // check if the day exceeds the max days in month
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++; // increment the month
        }
    }
    //increment the year if month is greater than 12
    if(month > 12){
        month = 1;
        year++;
    }
    return{
        day: day,
        month: month,
        year: year
    };
}

// get next palindrome date
function checkPalindromeForAllDateformats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
    for(var i=0; i<listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
   if (year % 400 === 0) return true;

   if (year % 100 === 0) return false;

   if (year % 4 === 0) return true;

   return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if(isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
          } else {
                if (day > 28) {
                    day = 1;
                    month++;
                }
            }
        }else {
           if (day > daysInMonth[month - 1 ]) {
                    day = 1;
                    month++;
                }           
             }
             if (month > 12) {
                month = 1;
                year++;
             }
             return {
                day: day,
                month: month,
                year: year,
             };
        }
    function getNextPalindromeDate(date) {
        var nextDate = getNextDate(date);
        var ctr = 0;

        while(1) {
            ctr++;
            var dateStr = convertDateToStr(nextDate);
            var resultList = checkPalindromeForAllDateformats(dateStr);

            for (let i = 0; i < resultList.length; i++) {
                if(resultList[i]) {
                    return [ctr, nextDate];
                }
            }
            nextDate = getNextDate(nextDate);
        }
    }

    function getPreviousDate(date) {
        var day = date.day - 1;
        var month = date.month;
        var year = date.year;

        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (day == 0) {
            month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if(month === 2) {
            if (isLeapYear(year)){
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
        }

    return {
        day: day,
        month: month,
        year: year,
    };
}

function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var ctr = 0;

    while(1) {
        ctr++;
        var dateStr = convertDateToStr(previousDate);
        var resultList = checkPalindromeForAllDateformats(dateStr);

        for (let i = 0; i < resultList; i++) {
            if (resultList[i]) {
                return [ctr, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");


function clickHandler(e) {
    var bdayStr = dateInputRef.value;

    if (bdayStr!= ""){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: (listOfDate[2]),
            month: (listOfDate[1]),
            year: (listOfDate[0])
        };
        console.log(date);
        var isPalindrome = checkPalindromeForAllDateformats(date);
        console.log(isPalindrome);

        if (isPalindrome) {
            resultRef.innerText = "Yay! your bday is a Palindrome!!";
        }
        else {
            resultRef.innerText = "Sorry! your bday is not a Palindrome!!";
        }
    }
}

// function clickHandler(e) {
//     // console.log(dateInputRef.value);
//       var bdayStr = dateInputRef.value;

//     if(bdayStr != " ")
//     {
//         var listOfDate = bdayStr.split("-");
//         var date = {
//             day: Number(listOfDate[2]),
//             month: Number(listOfDate[1]),
//             year: Number(listOfDate[0])
//         };

//         if (bdayStr !== "") {
//             var date = bdayStr.split("-");
//             var yyyy = date[0];
//             var mm = date[1];
//             var dd = date[2];

//             var date = {
//                 day: Number(dd),
//                 month: Number(mm),
//                 year: Number(yyyy),
//             };

//             // var dateStr =  convertDateToStr(date);
//             // var list = checkPalindromeForAllDateformats(dateStr);
//             // var isPalindrome = false;

//             // for (let i = 0; i < list.length; i++) {
//             //     if (list[i]) {
//             //         isPalindrome = true;
//             //         break;
//             //     }
//             // }

// //             if (!isPalindrome) {
// //                 const [ctr1, nextDate] = getNextPalindromeDate(date);
// //                 const [ctr2, prevDate] = getPreviousPalindromeDate(date);

// //                 if (ctr1 > ctr2) {
// //                     resultRef.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by {$ctr2} days.`;
// //                 } else {
// //                     resultRef.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by {$ctr1} days.`;
// //                 }
// //             } else {
// //                 resultRef.innerText = "Yay! Your birthday is palindrome!";
// //             }
// //         }
// //     }
// //}
//        console.log(date);
//        var isPalindrome = checkPalindromeForAllDateformats(date);
//        console.log(isPalindrome);
//        if(isPalindrome) {
//         resultRef.innerText = "Yay! your bday is a Palindrome!!"
//        }
//        else {
//        //resultRef.innerText = "Sorry! your bday is not a Palindrome!!"
//        var [ctr, nextDate] = getNextDate(date);

//        resultRef.innerText = `The next palidrome date is ${nextDate.day}-${nextDate-month}-${nextDate.year}, you missed it by ${ctr} days!`
//     }
// }


showBtnRef.addEventListener('click',clickHandler); 