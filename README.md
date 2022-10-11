# Wordle Assistant

A Wordle solver running on ABAP transpiled into JS

## Solution

The application is available at [https://wordle.marcbernardtools.com](https://wordle.marcbernardtools.com).

![image](https://user-images.githubusercontent.com/59966492/194974023-7b2ebb3c-5562-416a-beee-0be8877a1506.png)

## Example Result

![image](https://user-images.githubusercontent.com/59966492/194974100-5064a97a-cbd4-43b4-bcf7-b8d5e25b1700.png)

## Design

The solution is based on [Zwordle](https://github.com/hdegroot/zwordle) by Huge de Groot. The original code was adjusted slightly to be compatible with [Open-ABAP](https://github.com/open-abap/open-abap). This ABAP code was then transpiled in JavaScript using the [ABAP to JS transpiler](https://github.com/abaplint/transpiler). Some placeholders was added for passing user input to this JS code. Finally, the 
JS code was bundled together with the [abaplint runtime](https://github.com/abaplint/abaplint) using [browserify](https://browserify.org/). The resulting website therefore consists of only two files: One for HTML and one for JavaScript.

## Code

- [Open-ABAP Code](https://github.com/Marc-Bernard-Tools/Wordle-on-ABAP/blob/main/zwordle.abap)
- [Transpiled JS Code](https://github.com/Marc-Bernard-Tools/Wordle-on-ABAP/blob/main/abap.js)

## Credits

[Zwordle by Hugo de Groot](https://github.com/hdegroot/zwordle): MIT

[Transpiler by Lars Hvam](https://github.com/abaplint/transpiler): MIT

[Port of Zwordle to transpiler and stand-alone website by Marc Bernard](https://github.com/mbtools): MIT
