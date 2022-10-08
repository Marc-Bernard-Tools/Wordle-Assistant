"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("@abaplint/runtime");
const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();
async function myABAP() {
    try {
        abap.console.clear();
        // >>> BEGIN of transpiled ABAP code >>>
        const js = "abap = abapLocal;\n" +
            "abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));";
        // <<< END of transpiled ABAP code <<<
        try {
            const f = new AsyncFunction("abapLocal", js);
            await f(abap);
        }
        catch (e) {
            console.log("An error was thrown: " + e.toString());
        }
        const output = abap.console.get();
        console.log(output);
        return output.toString();
    }
    catch (error) {
        console.log(error.message);
    }
}
const abap = new runtime_1.ABAP();
function runABAP() {
    const app = document.getElementById("app");
    const p = document.createElement("p");
    p.textContent = myABAP().toString();
    app === null || app === void 0 ? void 0 : app.appendChild(p);
}
(_a = document.getElementById("run")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => runABAP());
//# sourceMappingURL=index.js.map