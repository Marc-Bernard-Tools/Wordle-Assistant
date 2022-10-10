const abaplint = require("./node_modules/@abaplint/runtime/build/src/index");

const abap = new abaplint.ABAP();

const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();

async function runABAP(letter1, letter2, letter3, letter4, letter5, black, orange) {
    try {
        abap.console.clear();

        // Read ABAP from file
        const fs = require("fs");
        let code = fs.readFileSync("abap.js", "utf8");

        // Replace variables with input
        code = code
            .replace("$$letter1$$", letter1)
            .replace("$$letter2$$", letter2)
            .replace("$$letter3$$", letter3)
            .replace("$$letter4$$", letter4)
            .replace("$$letter5$$", letter5)
            .replace("$$black$$", black)
            .replace("$$orange$$", orange)
            .replace("$$letter1_len$$", letter1.length)
            .replace("$$letter2_len$$", letter2.length)
            .replace("$$letter3_len$$", letter3.length)
            .replace("$$letter4_len$$", letter4.length)
            .replace("$$letter5_len$$", letter5.length)
            .replace("$$black_len$$", black.length)
            .replace("$$orange_len$$", orange.length);

        // Ready to run
        const js = "abap = abapLocal;\n" + code;

        try {
            const f = new AsyncFunction("abapLocal", js);
            await f(abap);
        } catch (e) {
            console.log("An error was thrown: " + e.toString());
        }

        const output = abap.console.get();
        //console.log(output);

        return output.toString();
    } catch (error) {
        console.log(error.message);
    }
}

global.run = async function run() {
    const app = document.getElementById("app");
    const letter1 = document.getElementById("letter1").value;
    const letter2 = document.getElementById("letter2").value;
    const letter3 = document.getElementById("letter3").value;
    const letter4 = document.getElementById("letter4").value;
    const letter5 = document.getElementById("letter5").value;
    const black = document.getElementById("black").value;
    const orange = document.getElementById("orange").value;
    app.textContent = await runABAP(letter1, letter2, letter3, letter4, letter5, black, orange);
}
