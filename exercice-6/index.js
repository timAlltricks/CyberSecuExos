'use strict';

/**
 * check phone number
 */
function checkPhoneNumber(phone){
    var pattern = new RegExp("^0(1|6|7)\\d{8}$", "g");
    return (phone.match(pattern) != null);
}
alert("0638546975 : " + checkPhoneNumber("0638546975"));