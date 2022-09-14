const ABAP = require('@abaplint/runtime');

function myABAP() {
    try {
        const abap = new ABAP();
        abap.console.clear();

        // >>> BEGIN of transpiled ABAP code >>>

        abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));
        
        // <<< END of transpiled ABAP code <<<
        
        try {
            abap();
        } catch (e) {
            console.log("An error was thrown: " + e.toString());
        }
        const output = abap.console.get();
        console.log(output);
        return output.toString();
    } catch (error) {
        console.log(error.message);
    }
}

function runABAP() {
    document.getElementById("console").innerHTML = myABAP();
}