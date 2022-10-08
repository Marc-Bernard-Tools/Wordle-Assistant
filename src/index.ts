import { ABAP } from "@abaplint/runtime";

const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();

async function myABAP() {
    try {
        abap.console.clear();

        const js = "abap = abapLocal;\n" +

        // >>> BEGIN of transpiled ABAP code >>>

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
        return output.toString();
    } catch (error) {
        console.log(error.message);
    }
}

const abap = new ABAP();