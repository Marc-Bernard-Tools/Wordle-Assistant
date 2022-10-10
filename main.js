const abaplint = require('./node_modules/@abaplint/runtime/build/src/index');

const abap = new abaplint.ABAP();

const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();

async function runABAP() {
    try {
        abap.console.clear();

        // Read ABAP from file (needs https://github.com/browserify/brfs)
        const fs = require('fs');
        const code = fs.readFileSync('abap.js', 'utf8');
        const js = "abap = abapLocal;\n" + code;

        // >>> BEGIN of transpiled ABAP code >>>

        // const js = "abap = abapLocal;\n" + code;

            //"abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));";

        // <<< END of transpiled ABAP code <<<

        try {
            const f = new AsyncFunction("abapLocal", js);
            await f(abap);
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

global.run = async function run() {
    const app = document.getElementById("app");
    const p = document.createElement("p");
    p.textContent = await runABAP();
    app.appendChild(p);
}
