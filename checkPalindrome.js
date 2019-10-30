/**
 * check palindrome
 * @return {Boolean} isPalindrome
 */
function checkPalindrome(str){
    var i = 0;
    while(str.charAt(i) && i <= (str.length / 2) && str.charAt(i) === str.charAt(str.length - (i + 1))) i++;
    if(--i === str.length / 2 || str.length - (i * 2) === 1) return true;
    return false;
}

alert("timit : " + checkPalindrome("timit"));
alert("timtim : " + checkPalindrome("timtim"));