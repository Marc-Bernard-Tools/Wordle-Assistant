# Wordle Assistant

A Wordle solver running on ABAP transpiled into JS

## Solution

The application is available at [https://wordle.marcbernardtools.com](https://wordle.marcbernardtools.com).

![image](https://user-images.githubusercontent.com/59966492/194975012-fba4d76c-293e-47c8-bb1a-ba960230f4b7.png)

## Example Result

![image](https://user-images.githubusercontent.com/59966492/194975219-1d377dc6-5286-4148-9cab-66339d365dbb.png)

## Design

The solution is based on [Zwordle](https://github.com/hdegroot/zwordle) by Huge de Groot. The original code was adjusted slightly to be compatible with [Open-ABAP](https://github.com/open-abap/open-abap). This ABAP code was then transpiled into JavaScript using the [ABAP to JS transpiler](https://github.com/abaplint/transpiler). Some placeholders were added for passing user input to this JS code. Finally, the 
JS code was bundled together with the [abaplint runtime](https://github.com/abaplint/abaplint) using [browserify](https://browserify.org/). The resulting website consists of only three files: One for HTML, one for JavaScript, and one for the Favicon.

## Code

- [Open-ABAP Code](https://github.com/Marc-Bernard-Tools/Wordle-on-ABAP/blob/main/abap/zwordle.abap)
- [Transpiled JS Code](https://github.com/Marc-Bernard-Tools/Wordle-on-ABAP/blob/main/abap/abap.js)

## Credits

[Zwordle by Hugo de Groot](https://github.com/hdegroot/zwordle): MIT

[Transpiler by Lars Hvam](https://github.com/abaplint/transpiler): MIT

[Port of Zwordle to transpiler and stand-alone website by Marc Bernard](https://github.com/mbtools): MIT

## About

Made with :heart: in Canada

Copyright 2022 Marc Bernard <https://marcbernardtools.com/>

Follow [@marcfbe](https://twitter.com/marcfbe) on Twitter

<p><a href="https://marcbernardtools.com/"><img width="160" height="65" src="https://marcbernardtools.com/info/MBT_Logo_640x250_on_Gray.png" alt="MBT Logo"></a></p>
