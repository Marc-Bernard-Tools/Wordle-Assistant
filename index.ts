import { ABAP } from "@abaplint/runtime";

const abap = new ABAP();

const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();

async function runABAP() {
    try {
        abap.console.clear();

        // >>> BEGIN of transpiled ABAP code >>>

        const js = "abap = abapLocal;\n" +

            "abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));";

        // <<< END of transpiled ABAP code <<<

        try {
            const f = new AsyncFunction("abapLocal", js);
            await f(abap);
        } catch (e) {
            console.log("An error was thrown: " + e.toString());
        }

        const output = abap.console.get();
        console.log(output);

        return output;
    } catch (error) {
        console.log(error.message);
    }
}

function run() {
    const app = document.getElementById("app");
    const p = document.createElement("p");
    p.textContent = runABAP().toString();
    app?.appendChild(p);
}

function main() {
    document.getElementById("run")?.addEventListener('click', (e: Event) => run());
}

main();
