# Wordle Assistant

A Wordle solver running on ABAP transpiled into JS

## Solution

The application is available at https://
## Design

The solution is based on [Zwordle](https://github.com/hdegroot/zwordle) by Huge de Groot. The original code was adjusted slightly to be compatible with [Open-ABAP](https://github.com/open-abap/open-abap). This ABAP code was then transpiled in JavaScript using the [ABAP to JS transpiler](https://github.com/abaplint/transpiler). Some placeholders was added for passing user input to this JS code. Finally, the 
JS code was bundled together with the [abaplint runtime](https://github.com/abaplint/abaplint) using [browserify](https://browserify.org/). The resulting website therefore consists of only two files: One for HTML and one for JavaScript.

## Code

- [Open-ABAP Code]()
- [Transpiled JS Code]()

## Credits

[Zwordle by Hugo de Groot](https://github.com/hdegroot/zwordle): MIT

[Transpiler by Lars Hvam](https://github.com/abaplint/transpiler): MIT

Port of Zwordle to Transpiler and stand-alone Website by Marc Bernard: MIT