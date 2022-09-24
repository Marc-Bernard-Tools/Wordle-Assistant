require('./abap.js');

global.runABAP = function() {
    document.getElementById("console").innerHTML = myABAP();
}
