import { ABAP } from "@abaplint/runtime";

const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();

const abap = new ABAP();

try {
    abap.console.clear();
    abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));
    try {
        const f = new AsyncFunction("abapLocal", js);
        await f(abap);
        console.log(abap.console.get());
    } catch (e) {
        console.log("An error was thrown: " + e.toString());
    }
} catch (error) {
    console.log(error.message);
}