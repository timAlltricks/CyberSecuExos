/**
 * compute Notes
 * @return {Float} mean
 */
function computeNotes(notes){
    var total = 0;
    notes.forEach(element => {
        total += element;
    });
    return total/notes.length;
}

test = [10, 13, 13, 12, 15, 12, 11, 16, 14];
alert("mean : " + computeNotes(test));