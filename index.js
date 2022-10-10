"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("@abaplint/runtime");
const abap = new runtime_1.ABAP();
const AsyncFunction = new Function(`return Object.getPrototypeOf(async function(){}).constructor`)();
function runABAP() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            abap.console.clear();
            // >>> BEGIN of transpiled ABAP code >>>
            const js = "abap = abapLocal;\n" +
                "abap.statements.write(new abap.types.Character({ length: 5 }).set('hello'));";
            // <<< END of transpiled ABAP code <<<
            try {
                const f = new AsyncFunction("abapLocal", js);
                yield f(abap);
            }
            catch (e) {
                console.log("An error was thrown: " + e.toString());
            }
            const output = abap.console.get();
            console.log(output);
            return output;
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
function run() {
    const app = document.getElementById("app");
    const p = document.createElement("p");
    p.textContent = runABAP().toString();
    app === null || app === void 0 ? void 0 : app.appendChild(p);
}
function main() {
    var _a;
    (_a = document.getElementById("run")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => run());
}
main();
//# sourceMappingURL=index.js.map