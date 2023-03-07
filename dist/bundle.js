(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
const abaplint = require("./node_modules/@abaplint/runtime/build/src/index");

const abap = new abaplint.ABAP();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
const AsyncFunction = (async function () { }).constructor;

async function runABAP(letter1, letter2, letter3, letter4, letter5, black, orange) {
    try {
        abap.console.clear();

        // Read ABAP from file
        
        let code = "class lcl_wordle {\r\n  static INTERNAL_TYPE = 'CLAS';\r\n  static IMPLEMENTED_INTERFACES = [];\r\n  async constructor_(INPUT) {\r\n    this.me = new abap.types.ABAPObject();\r\n    this.me.set(this);\r\n    this.word_tab = new abap.types.Table(new abap.types.String({qualifiedName: \"STRING\"}), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>string_table\");\r\n    this.letter_frequency_tab = new abap.types.Table(new abap.types.Structure({\"first_letter\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"}), \"other_letters\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"})}, \"lcl_wordle=>ty_letter_frequency\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"type\":\"STANDARD\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>ty_letter_frequency_tab\");\r\n    this.regex_string = new abap.types.String({qualifiedName: \"STRING\"});\r\n    this.matched_word_tab = new abap.types.Table(new abap.types.Structure({\"word\": new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"}), \"vowel_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-VOWEL_COUNT\"}), \"consonant_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-CONSONANT_COUNT\"}), \"contains_all_orange_letters\": new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"}), \"word_score\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"})}, \"lcl_wordle=>ty_matched_word\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"type\":\"STANDARD\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>ty_matched_word_tab\");\r\n    this.c_abc = lcl_wordle.c_abc;\r\n    return this;\r\n  }\r\n  async main(INPUT) {\r\n    let i_letter_1 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_letter_1) {i_letter_1.set(INPUT.i_letter_1);}\r\n    let i_letter_2 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_letter_2) {i_letter_2.set(INPUT.i_letter_2);}\r\n    let i_letter_3 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_letter_3) {i_letter_3.set(INPUT.i_letter_3);}\r\n    let i_letter_4 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_letter_4) {i_letter_4.set(INPUT.i_letter_4);}\r\n    let i_letter_5 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_letter_5) {i_letter_5.set(INPUT.i_letter_5);}\r\n    let i_black_letters = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_black_letters) {i_black_letters.set(INPUT.i_black_letters);}\r\n    let i_orange_letters = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\n    if (INPUT && INPUT.i_orange_letters) {i_orange_letters.set(INPUT.i_orange_letters);}\r\n    let inp = new abap.types.String({qualifiedName: \"STRING\"});\r\n    abap.statements.write(new abap.types.Character(16).set('WORDLE ASSISTANT'),{newLine: true});\r\n    inp.set(abap.operators.concat(i_letter_1,abap.operators.concat(i_letter_2,abap.operators.concat(i_letter_3,abap.operators.concat(i_letter_4,abap.operators.concat(i_letter_5,abap.operators.concat(i_black_letters,i_orange_letters)))))));\r\n    if (abap.compare.initial(inp)) {\r\n      abap.statements.write('',{newLine: true,skipLine: true});\r\n      abap.statements.write(new abap.types.Character(51).set('You have to fill in at least on of the input fields'),{newLine: true});\r\n      return;\r\n    }\r\n    if (abap.compare.initial(i_letter_1)) {\r\n      lcl_wordle.letter1.set(lcl_wordle.c_abc);\r\n    } else {\r\n      lcl_wordle.letter1.set((await this.clean_input({i_input: i_letter_1})));\r\n    }\r\n    if (abap.compare.initial(i_letter_2)) {\r\n      lcl_wordle.letter2.set(lcl_wordle.c_abc);\r\n    } else {\r\n      lcl_wordle.letter2.set((await this.clean_input({i_input: i_letter_2})));\r\n    }\r\n    if (abap.compare.initial(i_letter_3)) {\r\n      lcl_wordle.letter3.set(lcl_wordle.c_abc);\r\n    } else {\r\n      lcl_wordle.letter3.set((await this.clean_input({i_input: i_letter_3})));\r\n    }\r\n    if (abap.compare.initial(i_letter_4)) {\r\n      lcl_wordle.letter4.set(lcl_wordle.c_abc);\r\n    } else {\r\n      lcl_wordle.letter4.set((await this.clean_input({i_input: i_letter_4})));\r\n    }\r\n    if (abap.compare.initial(i_letter_5)) {\r\n      lcl_wordle.letter5.set(lcl_wordle.c_abc);\r\n    } else {\r\n      lcl_wordle.letter5.set((await this.clean_input({i_input: i_letter_5})));\r\n    }\r\n    lcl_wordle.black_letters.set((await this.clean_input({i_input: i_black_letters})));\r\n    lcl_wordle.orange_letters.set((await this.clean_input({i_input: i_orange_letters})));\r\n    inp.set(abap.operators.concat(lcl_wordle.letter1,abap.operators.concat(lcl_wordle.letter2,abap.operators.concat(lcl_wordle.letter3,abap.operators.concat(lcl_wordle.letter4,abap.operators.concat(lcl_wordle.letter5,abap.operators.concat(lcl_wordle.black_letters,lcl_wordle.orange_letters)))))));\r\n    if (abap.compare.initial(inp)) {\r\n      abap.statements.write('',{newLine: true,skipLine: true});\r\n      abap.statements.write(new abap.types.Character(51).set('You have to fill in at least on of the input fields'),{newLine: true});\r\n      return;\r\n    }\r\n    await this.remove_black_letters();\r\n    await this.build_word_tab_v2();\r\n    await this.build_letter_frequency_tab();\r\n    await this.build_regex_string();\r\n    await this.get_matched_words();\r\n    await this.display_output();\r\n  }\r\n  async clean_input(INPUT) {\r\n    let r_input = new abap.types.String({qualifiedName: \"STRING\"});\r\n    let i_input = new abap.types.String({qualifiedName: \"STRING\"});\r\n    if (INPUT && INPUT.i_input) {i_input.set(INPUT.i_input);}\r\n    let temp = new abap.types.String({qualifiedName: \"STRING\"});\r\n    temp.set(abap.builtin.to_upper({val: i_input}));\r\n    const indexBackup1 = abap.builtin.sy.get().index.get();\r\n    const unique1 = abap.builtin.strlen({val: temp}).get();\r\n    for (let unique2 = 0; unique2 < unique1; unique2++) {\r\n      abap.builtin.sy.get().index.set(unique2 + 1);\r\n      if (abap.compare.ca(temp.getOffset({length: 1}), lcl_wordle.c_abc)) {\r\n        r_input.set(abap.operators.concat(r_input,temp));\r\n      }\r\n      abap.statements.shift(temp, {direction: 'LEFT'});\r\n    }\r\n    abap.builtin.sy.get().index.set(indexBackup1);\r\n    return r_input;\r\n  }\r\n  async remove_black_letters() {\r\n    return lcl_wordle.remove_black_letters();\r\n  }\r\n  static async remove_black_letters() {\r\n    let black_letters_regex = new abap.types.String({qualifiedName: \"STRING\"});\r\n    if (abap.compare.initial(lcl_wordle.black_letters) === false) {\r\n      if (abap.compare.eq(abap.builtin.strlen({val: lcl_wordle.black_letters}), new abap.types.Integer().set(1))) {\r\n        black_letters_regex.set(lcl_wordle.black_letters.getOffset({offset: 0, length: 1}));\r\n      } else {\r\n        black_letters_regex.set(new abap.types.String().set(`[${abap.templateFormatting(lcl_wordle.black_letters)}]`));\r\n      }\r\n      abap.statements.replace({target: lcl_wordle.letter1, all: true, with: new abap.types.Character(0).set(''), regex: black_letters_regex});\r\n      abap.statements.replace({target: lcl_wordle.letter2, all: true, with: new abap.types.Character(0).set(''), regex: black_letters_regex});\r\n      abap.statements.replace({target: lcl_wordle.letter3, all: true, with: new abap.types.Character(0).set(''), regex: black_letters_regex});\r\n      abap.statements.replace({target: lcl_wordle.letter4, all: true, with: new abap.types.Character(0).set(''), regex: black_letters_regex});\r\n      abap.statements.replace({target: lcl_wordle.letter5, all: true, with: new abap.types.Character(0).set(''), regex: black_letters_regex});\r\n    }\r\n  }\r\n  async build_regex_string() {\r\n    let vletter1 = new abap.types.String({qualifiedName: \"STRING\"});\r\n    let vletter2 = new abap.types.String({qualifiedName: \"STRING\"});\r\n    let vletter3 = new abap.types.String({qualifiedName: \"STRING\"});\r\n    let vletter4 = new abap.types.String({qualifiedName: \"STRING\"});\r\n    let vletter5 = new abap.types.String({qualifiedName: \"STRING\"});\r\n    if (abap.compare.initial(lcl_wordle.letter1)) {\r\n      vletter1.set(new abap.types.Character(1).set('.'));\r\n    } else if (abap.compare.eq(abap.builtin.strlen({val: lcl_wordle.letter1}), new abap.types.Integer().set(1))) {\r\n      vletter1.set(lcl_wordle.letter1);\r\n    } else {\r\n      vletter1.set(new abap.types.String().set(`[${abap.templateFormatting(lcl_wordle.letter1)}]`));\r\n    }\r\n    if (abap.compare.initial(lcl_wordle.letter2)) {\r\n      vletter2.set(new abap.types.Character(1).set('.'));\r\n    } else if (abap.compare.eq(abap.builtin.strlen({val: lcl_wordle.letter2}), new abap.types.Integer().set(1))) {\r\n      vletter2.set(lcl_wordle.letter2);\r\n    } else {\r\n      vletter2.set(new abap.types.String().set(`[${abap.templateFormatting(lcl_wordle.letter2)}]`));\r\n    }\r\n    if (abap.compare.initial(lcl_wordle.letter3)) {\r\n      vletter3.set(new abap.types.Character(1).set('.'));\r\n    } else if (abap.compare.eq(abap.builtin.strlen({val: lcl_wordle.letter3}), new abap.types.Integer().set(1))) {\r\n      vletter3.set(lcl_wordle.letter3);\r\n    } else {\r\n      vletter3.set(new abap.types.String().set(`[${abap.templateFormatting(lcl_wordle.letter3)}]`));\r\n    }\r\n    if (abap.compare.initial(lcl_wordle.letter4)) {\r\n      vletter4.set(new abap.types.Character(1).set('.'));\r\n    } else if (abap.compare.eq(abap.builtin.strlen({val: lcl_wordle.letter4}), new abap.types.Integer().set(1))) {\r\n      vletter4.set(lcl_wordle.letter4);\r\n    } else {\r\n      vletter4.set(new abap.types.String().set(`[${abap.templateFormatting(lcl_wordle.letter4)}]`));\r\n    }\r\n    if (abap.compare.initial(lcl_wordle.letter5)) {\r\n      vletter5.set(new abap.types.Character(1).set('.'));\r\n    } else if (abap.compare.eq(abap.builtin.strlen({val: lcl_wordle.letter5}), new abap.types.Integer().set(1))) {\r\n      vletter5.set(lcl_wordle.letter5);\r\n    } else {\r\n      vletter5.set(new abap.types.String().set(`[${abap.templateFormatting(lcl_wordle.letter5)}]`));\r\n    }\r\n    this.regex_string.set(new abap.types.String().set(`^${abap.templateFormatting(vletter1)}${abap.templateFormatting(vletter2)}${abap.templateFormatting(vletter3)}${abap.templateFormatting(vletter4)}${abap.templateFormatting(vletter5)}$`));\r\n  }\r\n  async get_matched_words() {\r\n    let matched_word = new abap.types.Structure({\"word\": new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"}), \"vowel_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-VOWEL_COUNT\"}), \"consonant_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-CONSONANT_COUNT\"}), \"contains_all_orange_letters\": new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"}), \"word_score\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"})}, \"lcl_wordle=>ty_matched_word\");\r\n    let word_word = new abap.types.String({qualifiedName: \"STRING\"});\r\n    for await (const unique3 of abap.statements.loop(this.word_tab)) {\r\n      word_word.set(unique3);\r\n      abap.statements.find(word_word, {regex: this.regex_string});\r\n      if (abap.compare.eq(abap.builtin.sy.get().subrc, new abap.types.Integer().set(0))) {\r\n        matched_word.get().word.set(word_word);\r\n        matched_word.get().vowel_count.set((await this.get_vowel_count({i_word: matched_word.get().word})));\r\n        matched_word.get().consonant_count.set(abap.operators.minus(new abap.types.Integer().set(5),matched_word.get().vowel_count));\r\n        matched_word.get().contains_all_orange_letters.set((await this.contains_all_orange_letters({i_word: matched_word.get().word})));\r\n        matched_word.get().word_score.set((await this.get_word_score({i_word: matched_word.get().word})));\r\n        abap.statements.append({source: matched_word, target: this.matched_word_tab});\r\n      }\r\n    }\r\n  }\r\n  async display_output() {\r\n    let matched_word = new abap.types.Structure({\"word\": new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"}), \"vowel_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-VOWEL_COUNT\"}), \"consonant_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-CONSONANT_COUNT\"}), \"contains_all_orange_letters\": new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"}), \"word_score\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"})}, \"lcl_wordle=>ty_matched_word\");\r\n    let score = new abap.types.Integer({qualifiedName: \"I\"});\r\n    abap.statements.sort(this.matched_word_tab,{by: [{component: \"contains_all_orange_letters\", descending: true},{component: \"word_score\", descending: true}]});\r\n    abap.statements.write('',{newLine: true,skipLine: true});\r\n    abap.statements.write(new abap.types.Character(16).set('Black Letters:  '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.black_letters);\r\n    abap.statements.write(new abap.types.Character(16).set('Orange Letters: '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.orange_letters);\r\n    abap.statements.write(new abap.types.Character(16).set('Letter 1:       '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.letter1);\r\n    abap.statements.write(new abap.types.Character(16).set('Letter 2:       '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.letter2);\r\n    abap.statements.write(new abap.types.Character(16).set('Letter 3:       '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.letter3);\r\n    abap.statements.write(new abap.types.Character(16).set('Letter 4:       '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.letter4);\r\n    abap.statements.write(new abap.types.Character(16).set('Letter 5:       '),{newLine: true});\r\n    abap.statements.write(lcl_wordle.letter5);\r\n    abap.statements.write('',{newLine: true,skipLine: true});\r\n    abap.statements.write(new abap.types.Character(7).set('Word   '),{newLine: true});\r\n    abap.statements.write(new abap.types.Character(1).set(' '));\r\n    abap.statements.write(new abap.types.Character(6).set('Vowels'));\r\n    abap.statements.write(new abap.types.Character(1).set(' '));\r\n    abap.statements.write(new abap.types.Character(10).set('Consonants'));\r\n    abap.statements.write(new abap.types.Character(1).set(' '));\r\n    abap.statements.write(new abap.types.Character(11).set('All Orange?'));\r\n    abap.statements.write(new abap.types.Character(1).set(' '));\r\n    abap.statements.write(new abap.types.Character(10).set('Word Score'));\r\n    abap.statements.write(new abap.types.Character(48).set('------------------------------------------------'),{newLine: true});\r\n    for await (const unique4 of abap.statements.loop(this.matched_word_tab)) {\r\n      matched_word.set(unique4);\r\n      score.set(abap.operators.multiply(matched_word.get().word_score,new abap.types.Integer().set(100)));\r\n      abap.statements.write(matched_word.get().word,{newLine: true});\r\n      abap.statements.write(new abap.types.Character(3).set('   '));\r\n      abap.statements.write(matched_word.get().vowel_count);\r\n      abap.statements.write(new abap.types.Character(6).set('      '));\r\n      abap.statements.write(matched_word.get().consonant_count);\r\n      abap.statements.write(new abap.types.Character(10).set('          '));\r\n      abap.statements.write(matched_word.get().contains_all_orange_letters);\r\n      abap.statements.write(new abap.types.Character(11).set('           '));\r\n      abap.statements.write(score);\r\n    }\r\n  }\r\n  async get_vowel_count(INPUT) {\r\n    let r_count = new abap.types.Integer({qualifiedName: \"I\"});\r\n    let i_word = new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"});\r\n    if (INPUT && INPUT.i_word) {i_word.set(INPUT.i_word);}\r\n    let vowels_regex = new abap.types.String({qualifiedName: \"STRING\"});\r\n    vowels_regex.set('[AEIOUY]');\r\n    abap.statements.find(i_word, {regex: vowels_regex, first: false, count: r_count});\r\n    return r_count;\r\n  }\r\n  async contains_all_orange_letters(INPUT) {\r\n    let r_contains_all_orange_letters = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    let i_word = new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"});\r\n    if (INPUT && INPUT.i_word) {i_word.set(INPUT.i_word);}\r\n    let word = new abap.types.Character(6, {\"qualifiedName\":\"lcl_wordle=>char6\"});\r\n    let orange1 = new abap.types.Character(1, {});\r\n    let orange2 = new abap.types.Character(1, {});\r\n    let orange3 = new abap.types.Character(1, {});\r\n    let orange4 = new abap.types.Character(1, {});\r\n    let orange5 = new abap.types.Character(1, {});\r\n    let contains_orange1 = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    let contains_orange2 = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    let contains_orange3 = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    let contains_orange4 = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    let contains_orange5 = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    r_contains_all_orange_letters.set(new abap.types.Character(1).set('-'));\r\n    if (abap.compare.initial(lcl_wordle.orange_letters)) {\r\n      r_contains_all_orange_letters.set(abap.builtin.abap_true);\r\n    } else {\r\n      word.set(i_word);\r\n      orange1.set(lcl_wordle.orange_letters.getOffset({offset: 0, length: 1}));\r\n      orange2.set(lcl_wordle.orange_letters.getOffset({offset: 1, length: 1}));\r\n      orange3.set(lcl_wordle.orange_letters.getOffset({offset: 2, length: 1}));\r\n      orange4.set(lcl_wordle.orange_letters.getOffset({offset: 3, length: 1}));\r\n      orange5.set(lcl_wordle.orange_letters.getOffset({offset: 4, length: 1}));\r\n      if (abap.compare.ca(word, orange1) || abap.compare.initial(orange1)) {\r\n        contains_orange1.set(abap.builtin.abap_true);\r\n      }\r\n      if (abap.compare.ca(word, orange2) || abap.compare.initial(orange2)) {\r\n        contains_orange2.set(abap.builtin.abap_true);\r\n      }\r\n      if (abap.compare.ca(word, orange3) || abap.compare.initial(orange3)) {\r\n        contains_orange3.set(abap.builtin.abap_true);\r\n      }\r\n      if (abap.compare.ca(word, orange4) || abap.compare.initial(orange4)) {\r\n        contains_orange4.set(abap.builtin.abap_true);\r\n      }\r\n      if (abap.compare.ca(word, orange5) || abap.compare.initial(orange5)) {\r\n        contains_orange5.set(abap.builtin.abap_true);\r\n      }\r\n      if (abap.compare.eq(contains_orange1, abap.builtin.abap_true) && abap.compare.eq(contains_orange2, abap.builtin.abap_true) && abap.compare.eq(contains_orange3, abap.builtin.abap_true) && abap.compare.eq(contains_orange4, abap.builtin.abap_true) && abap.compare.eq(contains_orange5, abap.builtin.abap_true)) {\r\n        r_contains_all_orange_letters.set(abap.builtin.abap_true);\r\n      } else {\r\n        r_contains_all_orange_letters.set(new abap.types.Character(1).set('-'));\r\n      }\r\n    }\r\n    return r_contains_all_orange_letters;\r\n  }\r\n  async get_word_score(INPUT) {\r\n    let r_word_score = new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"});\r\n    let i_word = new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"});\r\n    if (INPUT && INPUT.i_word) {i_word.set(INPUT.i_word);}\r\n    if (abap.compare.gt(abap.builtin.strlen({val: lcl_wordle.letter1}), new abap.types.Integer().set(1))) {\r\n      r_word_score.set((abap.operators.add(r_word_score,await this.get_letter_frequency({i_letter: i_word.getOffset({offset: 0, length: 1}), i_first: abap.builtin.abap_true}))));\r\n    }\r\n    if (abap.compare.gt(abap.builtin.strlen({val: lcl_wordle.letter2}), new abap.types.Integer().set(1))) {\r\n      r_word_score.set((abap.operators.add(r_word_score,await this.get_letter_frequency({i_letter: i_word.getOffset({offset: 1, length: 1}), i_first: abap.builtin.abap_false}))));\r\n    }\r\n    if (abap.compare.gt(abap.builtin.strlen({val: lcl_wordle.letter3}), new abap.types.Integer().set(1))) {\r\n      r_word_score.set((abap.operators.add(r_word_score,await this.get_letter_frequency({i_letter: i_word.getOffset({offset: 2, length: 1}), i_first: abap.builtin.abap_false}))));\r\n    }\r\n    if (abap.compare.gt(abap.builtin.strlen({val: lcl_wordle.letter4}), new abap.types.Integer().set(1))) {\r\n      r_word_score.set((abap.operators.add(r_word_score,await this.get_letter_frequency({i_letter: i_word.getOffset({offset: 3, length: 1}), i_first: abap.builtin.abap_false}))));\r\n    }\r\n    if (abap.compare.gt(abap.builtin.strlen({val: lcl_wordle.letter5}), new abap.types.Integer().set(1))) {\r\n      r_word_score.set((abap.operators.add(r_word_score,await this.get_letter_frequency({i_letter: i_word.getOffset({offset: 4, length: 1}), i_first: abap.builtin.abap_false}))));\r\n    }\r\n    return r_word_score;\r\n  }\r\n  async get_letter_frequency(INPUT) {\r\n    let r_frequency = new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"});\r\n    let i_letter = new abap.types.Character(1, {\"qualifiedName\":\"lcl_wordle=>char1\"});\r\n    if (INPUT && INPUT.i_letter) {i_letter = INPUT.i_letter;}\r\n    let i_first = new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"});\r\n    if (INPUT && INPUT.i_first) {i_first = INPUT.i_first;}\r\n    let fs_frequency_ = new abap.types.FieldSymbol(new abap.types.Structure({\"first_letter\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"}), \"other_letters\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"})}, \"lcl_wordle=>ty_letter_frequency\"));\r\n    let v_index = new abap.types.Integer({qualifiedName: \"I\"});\r\n    v_index.set(abap.operators.add(abap.builtin.find({val: abap.builtin.sy.get().abcde, sub: i_letter}),new abap.types.Integer().set(1)));\r\n    abap.statements.readTable(this.letter_frequency_tab,{index: v_index,assigning: fs_frequency_});\r\n    abap.statements.assert(abap.compare.eq(abap.builtin.sy.get().subrc, new abap.types.Integer().set(0)));\r\n    if (abap.compare.eq(i_first, abap.builtin.abap_true)) {\r\n      r_frequency.set(fs_frequency_.get().first_letter);\r\n    } else {\r\n      r_frequency.set(fs_frequency_.get().other_letters);\r\n    }\r\n    return r_frequency;\r\n  }\r\n  async build_letter_frequency_tab() {\r\n    let frequency = new abap.types.Structure({\"first_letter\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"}), \"other_letters\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"})}, \"lcl_wordle=>ty_letter_frequency\");\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('5.7'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('7.8'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('6.0'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('2.0'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('9.4'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('4.0'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('6.1'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('3.8'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('3.9'));\r\n    frequency.get().other_letters.set(new abap.types.Character(4).set('11.0'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('4.1'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('1.4'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('3.3'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('3.0'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('3.7'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('2.3'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('3.9'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('8.2'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('1.1'));\r\n    frequency.get().other_letters.set(new abap.types.Character(4).set('0.21'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('1.0'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('2.5'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('3.1'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('5.3'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('5.6'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('2.7'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('2.2'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('7.2'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('2.5'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('6.1'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('7.7'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('2.8'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(4).set('0.49'));\r\n    frequency.get().other_letters.set(new abap.types.Character(4).set('0.24'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('6.0'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('7.3'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(4).set('11.0'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('8.7'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('5.0'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('6.7'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('2.9'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('3.3'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('1.5'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('1.0'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(3).set('2.7'));\r\n    frequency.get().other_letters.set(new abap.types.Character(4).set('0.91'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(4).set('0.05'));\r\n    frequency.get().other_letters.set(new abap.types.Character(4).set('0.27'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(4).set('0.36'));\r\n    frequency.get().other_letters.set(new abap.types.Character(3).set('1.6'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n    frequency.get().first_letter.set(new abap.types.Character(4).set('0.24'));\r\n    frequency.get().other_letters.set(new abap.types.Character(4).set('0.44'));\r\n    abap.statements.insertInternal({data: frequency, table: this.letter_frequency_tab});\r\n  }\r\n  async build_word_tab_v2() {\r\n    let lv_words = new abap.types.String({qualifiedName: \"STRING\"});\r\n    lv_words.set(abap.operators.concat(new abap.types.Character(114).set('AAHED,AALII,AARGH,AARTI,ABACA,ABACI,ABACK,ABACS,ABAFT,ABAKA,ABAMP,ABAND,ABASE,ABASH,ABASK,ABATE,ABAYA,ABBAS,ABBED,'),abap.operators.concat(new abap.types.Character(114).set('ABBES,ABBEY,ABBOT,ABCEE,ABEAM,ABEAR,ABELE,ABERS,ABETS,ABHOR,ABIDE,ABIES,ABLED,ABLER,ABLES,ABLET,ABLOW,ABMHO,ABODE,'),abap.operators.concat(new abap.types.Character(114).set('ABOHM,ABOIL,ABOMA,ABOON,ABORD,ABORE,ABORT,ABOUT,ABOVE,ABRAM,ABRAY,ABRIM,ABRIN,ABRIS,ABSEY,ABSIT,ABUNA,ABUNE,ABUSE,'),abap.operators.concat(new abap.types.Character(114).set('ABUTS,ABUZZ,ABYES,ABYSM,ABYSS,ACAIS,ACARI,ACCAS,ACCOY,ACERB,ACERS,ACETA,ACHAR,ACHED,ACHES,ACHOO,ACIDS,ACIDY,ACING,'),abap.operators.concat(new abap.types.Character(114).set('ACINI,ACKEE,ACKER,ACMES,ACMIC,ACNED,ACNES,ACOCK,ACOLD,ACORN,ACRED,ACRES,ACRID,ACROS,ACTED,ACTIN,ACTON,ACTOR,ACUTE,'),abap.operators.concat(new abap.types.Character(114).set('ACYLS,ADAGE,ADAPT,ADAWS,ADAYS,ADBOT,ADDAX,ADDED,ADDER,ADDIO,ADDLE,ADEEM,ADEPT,ADHAN,ADIEU,ADIOS,ADITS,ADMAN,ADMEN,'),abap.operators.concat(new abap.types.Character(114).set('ADMIN,ADMIT,ADMIX,ADOBE,ADOBO,ADOPT,ADORE,ADORN,ADOWN,ADOZE,ADRAD,ADRED,ADSUM,ADUKI,ADULT,ADUNC,ADUST,ADVEW,ADYTA,'),abap.operators.concat(new abap.types.Character(114).set('ADZED,ADZES,AECIA,AEDES,AEGIS,AEONS,AERIE,AEROS,AESIR,AFALD,AFARA,AFARS,AFEAR,AFFIX,AFIRE,AFLAJ,AFOOT,AFORE,AFOUL,'),abap.operators.concat(new abap.types.Character(114).set('AFRIT,AFROS,AFTER,AGAIN,AGAMA,AGAMI,AGAPE,AGARS,AGAST,AGATE,AGAVE,AGAZE,AGENE,AGENT,AGERS,AGGER,AGGIE,AGGRI,AGGRO,'),abap.operators.concat(new abap.types.Character(114).set('AGGRY,AGHAS,AGILA,AGILE,AGING,AGIOS,AGISM,AGIST,AGITA,AGLEE,AGLET,AGLEY,AGLOO,AGLOW,AGLUS,AGMAS,AGOGE,AGONE,AGONS,'),abap.operators.concat(new abap.types.Character(114).set('AGONY,AGOOD,AGORA,AGREE,AGRIA,AGRIN,AGROS,AGUED,AGUES,AGUNA,AGUTI,AHEAD,AHEAP,AHENT,AHIGH,AHIND,AHING,AHINT,AHOLD,'),abap.operators.concat(new abap.types.Character(114).set('AHULL,AHURU,AIDAS,AIDED,AIDER,AIDES,AIDOI,AIDOS,AIERY,AIGAS,AIGHT,AILED,AIMED,AIMER,AINEE,AINGA,AIOLI,AIRED,AIRER,'),abap.operators.concat(new abap.types.Character(114).set('AIRNS,AIRTH,AIRTS,AISLE,AITCH,AITUS,AIVER,AIYEE,AIZLE,AJIES,AJIVA,AJUGA,AJWAN,AKEES,AKELA,AKENE,AKING,AKITA,AKKAS,'),abap.operators.concat(new abap.types.Character(114).set('ALAAP,ALACK,ALAMO,ALAND,ALANE,ALANG,ALANS,ALANT,ALAPA,ALAPS,ALARM,ALARY,ALATE,ALAYS,ALBAS,ALBEE,ALBUM,ALCID,ALCOS,'),abap.operators.concat(new abap.types.Character(114).set('ALDEA,ALDER,ALDOL,ALECK,ALECS,ALEFS,ALEFT,ALEPH,ALERT,ALEWS,ALEYE,ALFAS,ALGAE,ALGAL,ALGAS,ALGID,ALGIN,ALGOR,ALGUM,'),abap.operators.concat(new abap.types.Character(114).set('ALIAS,ALIBI,ALIEN,ALIFS,ALIGN,ALIKE,ALINE,ALIST,ALIVE,ALIYA,ALKIE,ALKOS,ALKYD,ALKYL,ALLAY,ALLEE,ALLEL,ALLEY,ALLIS,'),abap.operators.concat(new abap.types.Character(114).set('ALLOD,ALLOT,ALLOW,ALLOY,ALLYL,ALMAH,ALMAS,ALMEH,ALMES,ALMUD,ALMUG,ALODS,ALOED,ALOES,ALOFT,ALOHA,ALOIN,ALONE,ALONG,'),abap.operators.concat(new abap.types.Character(114).set('ALOOF,ALOOS,ALOUD,ALOWE,ALPHA,ALTAR,ALTER,ALTHO,ALTOS,ALULA,ALUMS,ALURE,ALVAR,ALWAY,AMAHS,AMAIN,AMASS,AMATE,AMAUT,'),abap.operators.concat(new abap.types.Character(114).set('AMAZE,AMBAN,AMBER,AMBIT,AMBLE,AMBOS,AMBRY,AMEBA,AMEER,AMEND,AMENE,AMENS,AMENT,AMIAS,AMICE,AMICI,AMIDE,AMIDO,AMIDS,'),abap.operators.concat(new abap.types.Character(114).set('AMIES,AMIGA,AMIGO,AMINE,AMINO,AMINS,AMIRS,AMISS,AMITY,AMLAS,AMMAN,AMMON,AMMOS,AMNIA,AMNIC,AMNIO,AMOKS,AMOLE,AMONG,'),abap.operators.concat(new abap.types.Character(114).set('AMORT,AMOUR,AMOVE,AMOWT,AMPED,AMPLE,AMPLY,AMPUL,AMRIT,AMUCK,AMUSE,AMYLS,ANANA,ANATA,ANCHO,ANCLE,ANCON,ANDRO,ANEAR,'),abap.operators.concat(new abap.types.Character(114).set('ANELE,ANENT,ANGAS,ANGEL,ANGER,ANGLE,ANGLO,ANGRY,ANGST,ANIGH,ANILE,ANILS,ANIMA,ANIME,ANIMI,ANION,ANISE,ANKER,ANKHS,'),abap.operators.concat(new abap.types.Character(114).set('ANKLE,ANKUS,ANLAS,ANNAL,ANNAS,ANNAT,ANNEX,ANNOY,ANNUL,ANOAS,ANODE,ANOLE,ANOMY,ANSAE,ANTAE,ANTAR,ANTAS,ANTED,ANTES,'),abap.operators.concat(new abap.types.Character(114).set('ANTIC,ANTIS,ANTRA,ANTRE,ANTSY,ANURA,ANVIL,ANYON,AORTA,APACE,APAGE,APAID,APART,APAYD,APAYS,APEAK,APEEK,APERS,APERT,'),abap.operators.concat(new abap.types.Character(114).set('APERY,APGAR,APHID,APHIS,APIAN,APING,APIOL,APISH,APISM,APNEA,APODE,APODS,APOOP,APORT,APPAL,APPAY,APPEL,APPLE,APPLY,'),abap.operators.concat(new abap.types.Character(114).set('APPRO,APPUI,APPUY,APRES,APRON,APSES,APSIS,APSOS,APTED,APTER,APTLY,AQUAE,AQUAS,ARABA,ARAKS,ARAME,ARARS,ARBAS,ARBOR,'),abap.operators.concat(new abap.types.Character(114).set('ARCED,ARCHI,ARCOS,ARCUS,ARDEB,ARDOR,ARDRI,AREAD,AREAE,AREAL,AREAR,AREAS,ARECA,AREDD,AREDE,AREFY,AREIC,ARENA,ARENE,'),abap.operators.concat(new abap.types.Character(114).set('AREPA,ARERE,ARETE,ARETS,ARETT,ARGAL,ARGAN,ARGIL,ARGLE,ARGOL,ARGON,ARGOT,ARGUE,ARGUS,ARHAT,ARIAS,ARIEL,ARIKI,ARILS,'),abap.operators.concat(new abap.types.Character(114).set('ARIOT,ARISE,ARISH,ARKED,ARLED,ARLES,ARMED,ARMER,ARMET,ARMIL,ARMOR,ARNAS,ARNUT,AROBA,AROHA,AROID,AROMA,AROSE,ARPAS,'),abap.operators.concat(new abap.types.Character(114).set('ARPEN,ARRAH,ARRAS,ARRAY,ARRET,ARRIS,ARROW,ARROZ,ARSED,ARSES,ARSEY,ARSIS,ARSON,ARTAL,ARTEL,ARTIC,ARTIS,ARTSY,ARUHE,'),abap.operators.concat(new abap.types.Character(114).set('ARUMS,ARVAL,ARVEE,ARVOS,ARYLS,ASANA,ASCON,ASCOT,ASCUS,ASDIC,ASHED,ASHEN,ASHES,ASHET,ASIDE,ASKED,ASKER,ASKEW,ASKOI,'),abap.operators.concat(new abap.types.Character(114).set('ASKOS,ASPEN,ASPER,ASPIC,ASPIS,ASPRO,ASSAI,ASSAM,ASSAY,ASSES,ASSET,ASSEZ,ASSOT,ASTER,ASTIR,ASTUN,ASURA,ASWAY,ASWIM,'),abap.operators.concat(new abap.types.Character(114).set('ASYLA,ATAPS,ATAXY,ATIGI,ATILT,ATIMY,ATLAS,ATMAN,ATMAS,ATMOS,ATOCS,ATOKE,ATOKS,ATOLL,ATOMS,ATOMY,ATONE,ATONY,ATOPY,'),abap.operators.concat(new abap.types.Character(114).set('ATRIA,ATRIP,ATTAP,ATTAR,ATTIC,ATUAS,AUDAD,AUDIO,AUDIT,AUGER,AUGHT,AUGUR,AULAS,AULIC,AULOI,AULOS,AUMIL,AUNES,AUNTS,'),abap.operators.concat(new abap.types.Character(114).set('AUNTY,AURAE,AURAL,AURAR,AURAS,AUREI,AURES,AURIC,AURIS,AURUM,AUTOS,AUXIN,AVAIL,AVALE,AVANT,AVAST,AVELS,AVENS,AVERS,'),abap.operators.concat(new abap.types.Character(114).set('AVERT,AVGAS,AVIAN,AVINE,AVION,AVISE,AVISO,AVIZE,AVOID,AVOWS,AVYZE,AWAIT,AWAKE,AWARD,AWARE,AWARN,AWASH,AWATO,AWAVE,'),abap.operators.concat(new abap.types.Character(114).set('AWAYS,AWDLS,AWEEL,AWETO,AWFUL,AWING,AWMRY,AWNED,AWNER,AWOKE,AWOLS,AWORK,AXELS,AXIAL,AXILE,AXILS,AXING,AXIOM,AXION,'),abap.operators.concat(new abap.types.Character(114).set('AXITE,AXLED,AXLES,AXMAN,AXMEN,AXOID,AXONE,AXONS,AYAHS,AYAYA,AYELP,AYGRE,AYINS,AYONT,AYRES,AYRIE,AZANS,AZIDE,AZIDO,'),abap.operators.concat(new abap.types.Character(114).set('AZINE,AZLON,AZOIC,AZOLE,AZONS,AZOTE,AZOTH,AZUKI,AZURE,AZURN,AZURY,AZYGY,AZYME,AZYMS,BAAED,BAALS,BABAS,BABEL,BABES,'),abap.operators.concat(new abap.types.Character(114).set('BABKA,BABOO,BABUL,BABUS,BACCA,BACCO,BACCY,BACHA,BACHS,BACKS,BACON,BADDY,BADGE,BADLY,BAELS,BAFFS,BAFFY,BAFTS,BAGEL,'),abap.operators.concat(new abap.types.Character(114).set('BAGGY,BAGHS,BAGIE,BAHTS,BAHUS,BAHUT,BAILS,BAIRN,BAISA,BAITH,BAITS,BAIZA,BAIZE,BAJAN,BAJRA,BAJRI,BAJUS,BAKED,BAKEN,'),abap.operators.concat(new abap.types.Character(114).set('BAKER,BAKES,BALAS,BALDS,BALDY,BALED,BALER,BALES,BALKS,BALKY,BALLS,BALLY,BALMS,BALMY,BALOO,BALSA,BALTI,BALUN,BALUS,'),abap.operators.concat(new abap.types.Character(114).set('BAMBI,BANAK,BANAL,BANCO,BANCS,BANDA,BANDH,BANDS,BANDY,BANED,BANES,BANGS,BANIA,BANJO,BANKS,BANNS,BANTS,BANTY,BANYA,'),abap.operators.concat(new abap.types.Character(114).set('BAPUS,BARBE,BARBS,BARBY,BARCA,BARDE,BARDO,BARDS,BARDY,BARED,BARER,BARES,BARFI,BARFS,BARGE,BARIC,BARKS,BARKY,BARMS,'),abap.operators.concat(new abap.types.Character(114).set('BARMY,BARNS,BARNY,BARON,BARPS,BARRA,BARRE,BARRO,BARRY,BARYE,BASAL,BASAN,BASED,BASEN,BASER,BASES,BASHO,BASIC,BASIJ,'),abap.operators.concat(new abap.types.Character(114).set('BASIL,BASIN,BASIS,BASKS,BASON,BASSE,BASSI,BASSO,BASSY,BASTA,BASTE,BASTI,BASTO,BASTS,BATCH,BATED,BATES,BATHE,BATHS,'),abap.operators.concat(new abap.types.Character(114).set('BATIK,BATON,BATTA,BATTS,BATTU,BATTY,BAUDS,BAUKS,BAULK,BAURS,BAVIN,BAWDS,BAWDY,BAWKS,BAWLS,BAWNS,BAWRS,BAWTY,BAYED,'),abap.operators.concat(new abap.types.Character(114).set('BAYER,BAYES,BAYLE,BAYOU,BAYTS,BAZAR,BAZOO,BEACH,BEADS,BEADY,BEAKS,BEAKY,BEALS,BEAMS,BEAMY,BEANO,BEANS,BEANY,BEARD,'),abap.operators.concat(new abap.types.Character(114).set('BEARE,BEARS,BEAST,BEATH,BEATS,BEATY,BEAUS,BEAUT,BEAUX,BEBOP,BECAP,BECKE,BECKS,BEDAD,BEDEL,BEDES,BEDEW,BEDIM,BEDYE,'),abap.operators.concat(new abap.types.Character(114).set('BEECH,BEEDI,BEEFS,BEEFY,BEEPS,BEERS,BEERY,BEETS,BEFIT,BEFOG,BEGAD,BEGAN,BEGAR,BEGAT,BEGEM,BEGET,BEGIN,BEGOT,BEGUM,'),abap.operators.concat(new abap.types.Character(114).set('BEGUN,BEIGE,BEIGY,BEING,BEINS,BEKAH,BELAH,BELAR,BELAY,BELCH,BELEE,BELGA,BELIE,BELLE,BELLS,BELLY,BELON,BELOW,BELTS,'),abap.operators.concat(new abap.types.Character(114).set('BEMAD,BEMAS,BEMIX,BEMUD,BENCH,BENDS,BENDY,BENES,BENET,BENGA,BENIS,BENNE,BENNI,BENNY,BENTO,BENTS,BENTY,BEPAT,BERAY,'),abap.operators.concat(new abap.types.Character(114).set('BERES,BERET,BERGS,BERKO,BERKS,BERME,BERMS,BEROB,BERRY,BERTH,BERYL,BESAT,BESAW,BESEE,BESES,BESET,BESIT,BESOM,BESOT,'),abap.operators.concat(new abap.types.Character(114).set('BESTI,BESTS,BETAS,BETED,BETEL,BETES,BETHS,BETID,BETON,BETTA,BETTY,BEVEL,BEVER,BEVOR,BEVUE,BEVVY,BEWET,BEWIG,BEZEL,'),abap.operators.concat(new abap.types.Character(114).set('BEZES,BEZIL,BEZZY,BHAIS,BHAJI,BHANG,BHATS,BHELS,BHOOT,BHUNA,BHUTS,BIACH,BIALI,BIALY,BIBBS,BIBES,BIBLE,BICCY,BICEP,'),abap.operators.concat(new abap.types.Character(114).set('BICES,BIDDY,BIDED,BIDER,BIDES,BIDET,BIDIS,BIDON,BIELD,BIERS,BIFFO,BIFFS,BIFFY,BIFID,BIGAE,BIGGS,BIGGY,BIGHA,BIGHT,'),abap.operators.concat(new abap.types.Character(114).set('BIGLY,BIGOS,BIGOT,BIJOU,BIKED,BIKER,BIKES,BIKIE,BILBO,BILBY,BILED,BILES,BILGE,BILGY,BILKS,BILLS,BILLY,BIMAH,BIMAS,'),abap.operators.concat(new abap.types.Character(114).set('BIMBO,BINAL,BINDI,BINDS,BINER,BINES,BINGE,BINGO,BINGS,BINGY,BINIT,BINKS,BIOGS,BIOME,BIONT,BIOTA,BIPED,BIPOD,BIRCH,'),abap.operators.concat(new abap.types.Character(114).set('BIRDS,BIRKS,BIRLE,BIRLS,BIROS,BIRRS,BIRSE,BIRSY,BIRTH,BISES,BISKS,BISOM,BISON,BITCH,BITER,BITES,BITOS,BITOU,BITSY,'),abap.operators.concat(new abap.types.Character(114).set('BITTE,BITTS,BITTY,BIVIA,BIVVY,BIZES,BIZZO,BIZZY,BLABS,BLACK,BLADE,BLADS,BLADY,BLAER,BLAES,BLAFF,BLAGS,BLAHS,BLAIN,'),abap.operators.concat(new abap.types.Character(114).set('BLAME,BLAMS,BLAND,BLANK,BLARE,BLART,BLASE,BLASH,BLAST,BLATE,BLATS,BLATT,BLAUD,BLAWN,BLAWS,BLAYS,BLAZE,BLEAK,BLEAR,'),abap.operators.concat(new abap.types.Character(114).set('BLEAT,BLEBS,BLECH,BLEED,BLEEP,BLEES,BLEND,BLENT,BLERT,BLESS,BLEST,BLETS,BLEYS,BLIMP,BLIMY,BLIND,BLING,BLINI,BLINK,'),abap.operators.concat(new abap.types.Character(114).set('BLINS,BLINY,BLIPS,BLISS,BLIST,BLITE,BLITS,BLITZ,BLIVE,BLOAT,BLOBS,BLOCK,BLOCS,BLOGS,BLOKE,BLOND,BLOOD,BLOOK,BLOOM,'),abap.operators.concat(new abap.types.Character(114).set('BLOOP,BLORE,BLOTS,BLOWN,BLOWS,BLOWY,BLUBS,BLUDE,BLUDS,BLUDY,BLUED,BLUER,BLUES,BLUET,BLUEY,BLUFF,BLUID,BLUME,BLUNK,'),abap.operators.concat(new abap.types.Character(114).set('BLUNT,BLURB,BLURS,BLURT,BLUSH,BLYPE,BOABS,BOAKS,BOARD,BOARS,BOART,BOAST,BOATS,BOBAC,BOBAK,BOBAS,BOBBY,BOBOL,BOBOS,'),abap.operators.concat(new abap.types.Character(114).set('BOCCA,BOCCE,BOCCI,BOCKS,BODED,BODES,BODGE,BODHI,BODLE,BOEPS,BOETS,BOEUF,BOFFO,BOFFS,BOGAN,BOGEY,BOGGY,BOGIE,BOGLE,'),abap.operators.concat(new abap.types.Character(114).set('BOGUE,BOGUS,BOHEA,BOHOS,BOILS,BOING,BOINK,BOITE,BOKED,BOKEH,BOKES,BOKOS,BOLAR,BOLAS,BOLDS,BOLES,BOLIX,BOLLS,BOLOS,'),abap.operators.concat(new abap.types.Character(114).set('BOLTS,BOLUS,BOMAS,BOMBE,BOMBO,BOMBS,BONCE,BONDS,BONED,BONER,BONES,BONEY,BONGO,BONGS,BONIE,BONKS,BONNE,BONNY,BONUS,'),abap.operators.concat(new abap.types.Character(114).set('BONZA,BONZE,BOOAI,BOOAY,BOOBS,BOOBY,BOODY,BOOED,BOOFY,BOOGY,BOOHS,BOOKS,BOOKY,BOOLS,BOOMS,BOOMY,BOONS,BOORD,BOORS,'),abap.operators.concat(new abap.types.Character(114).set('BOOSE,BOOST,BOOTH,BOOTS,BOOTY,BOOZE,BOOZY,BOPPY,BORAK,BORAL,BORAS,BORAX,BORDE,BORDS,BORED,BOREE,BOREL,BORER,BORES,'),abap.operators.concat(new abap.types.Character(114).set('BORGO,BORIC,BORKS,BORMS,BORNA,BORNE,BORON,BORTS,BORTY,BORTZ,BOSIE,BOSKS,BOSKY,BOSOM,BOSON,BOSSY,BOSUN,BOTAS,BOTCH,'),abap.operators.concat(new abap.types.Character(114).set('BOTEL,BOTES,BOTHY,BOTTE,BOTTS,BOTTY,BOUGE,BOUGH,BOUKS,BOULE,BOULT,BOUND,BOUNS,BOURD,BOURG,BOURN,BOUSE,BOUSY,BOUTS,'),abap.operators.concat(new abap.types.Character(114).set('BOVID,BOWAT,BOWED,BOWEL,BOWER,BOWES,BOWET,BOWIE,BOWLS,BOWNE,BOWRS,BOWSE,BOXED,BOXEN,BOXER,BOXES,BOXLA,BOXTY,BOYAR,'),abap.operators.concat(new abap.types.Character(114).set('BOYAU,BOYED,BOYFS,BOYGS,BOYLA,BOYOS,BOYSY,BOZOS,BRAAI,BRACE,BRACH,BRACK,BRACT,BRADS,BRAES,BRAGS,BRAID,BRAIL,BRAIN,'),abap.operators.concat(new abap.types.Character(114).set('BRAKE,BRAKS,BRAKY,BRAME,BRAND,BRANE,BRANK,BRANS,BRANT,BRASH,BRASS,BRAST,BRATS,BRAVA,BRAVE,BRAVI,BRAVO,BRAWL,BRAWN,'),abap.operators.concat(new abap.types.Character(114).set('BRAWS,BRAXY,BRAYS,BRAZA,BRAZE,BREAD,BREAK,BREAM,BREDE,BREDS,BREED,BREEM,BREER,BREES,BREID,BREIS,BREME,BRENS,BRENT,'),abap.operators.concat(new abap.types.Character(114).set('BRERE,BRERS,BREVE,BREWS,BREYS,BRIAR,BRIBE,BRICK,BRIDE,BRIEF,BRIER,BRIES,BRIGS,BRIKI,BRIKS,BRILL,BRIMS,BRINE,BRING,'),abap.operators.concat(new abap.types.Character(114).set('BRINK,BRINS,BRINY,BRIOS,BRISE,BRISK,BRISS,BRITH,BRITS,BRITT,BRIZE,BROAD,BROCH,BROCK,BRODS,BROGH,BROGS,BROIL,BROKE,'),abap.operators.concat(new abap.types.Character(114).set('BROME,BROMO,BRONC,BROND,BROOD,BROOK,BROOL,BROOM,BROOS,BROSE,BROSY,BROTH,BROWN,BROWS,BRUGH,BRUIN,BRUIT,BRULE,BRUME,'),abap.operators.concat(new abap.types.Character(114).set('BRUNG,BRUNT,BRUSH,BRUSK,BRUST,BRUTE,BRUTS,BUATS,BUAZE,BUBAL,BUBAS,BUBBE,BUBBY,BUBUS,BUCHU,BUCKO,BUCKS,BUCKU,BUDAS,'),abap.operators.concat(new abap.types.Character(114).set('BUDDY,BUDGE,BUDIS,BUDOS,BUFFA,BUFFE,BUFFI,BUFFO,BUFFS,BUFFY,BUFOS,BUGGY,BUGLE,BUHLS,BUHRS,BUIKS,BUILD,BUILT,BUIST,'),abap.operators.concat(new abap.types.Character(114).set('BUKES,BULBS,BULGE,BULGY,BULKS,BULKY,BULLA,BULLS,BULLY,BULSE,BUMBO,BUMFS,BUMPH,BUMPS,BUMPY,BUNAS,BUNCE,BUNCH,BUNCO,'),abap.operators.concat(new abap.types.Character(114).set('BUNDE,BUNDH,BUNDS,BUNDT,BUNDU,BUNDY,BUNGS,BUNGY,BUNIA,BUNJE,BUNJY,BUNKO,BUNKS,BUNNS,BUNNY,BUNTS,BUNTY,BUNYA,BUOYS,'),abap.operators.concat(new abap.types.Character(114).set('BUPPY,BURAN,BURAS,BURBS,BURDS,BURET,BURFI,BURGH,BURGS,BURIN,BURKA,BURKE,BURKS,BURLS,BURLY,BURNS,BURNT,BUROO,BURPS,'),abap.operators.concat(new abap.types.Character(114).set('BURQA,BURRO,BURRS,BURRY,BURSA,BURSE,BURST,BUSBY,BUSED,BUSES,BUSHY,BUSKS,BUSKY,BUSSU,BUSTI,BUSTS,BUSTY,BUTCH,BUTEO,'),abap.operators.concat(new abap.types.Character(114).set('BUTES,BUTLE,BUTOH,BUTTE,BUTTS,BUTTY,BUTUT,BUTYL,BUXOM,BUYER,BUZZY,BWANA,BWAZI,BYDED,BYDES,BYKED,BYKES,BYLAW,BYRES,'),abap.operators.concat(new abap.types.Character(114).set('BYRLS,BYSSI,BYTES,BYWAY,CAAED,CABAL,CABAS,CABBY,CABER,CABIN,CABLE,CABOB,CABOC,CABRE,CACAO,CACAS,CACHE,CACKS,CACKY,'),abap.operators.concat(new abap.types.Character(114).set('CACTI,CADDY,CADEE,CADES,CADET,CADGE,CADGY,CADIE,CADIS,CADRE,CAECA,CAESE,CAFES,CAFFS,CAGED,CAGER,CAGES,CAGEY,CAGOT,'),abap.operators.concat(new abap.types.Character(114).set('CAHOW,CAIDS,CAINS,CAIRD,CAIRN,CAJON,CAJUN,CAKED,CAKES,CAKEY,CALFS,CALID,CALIF,CALIX,CALKS,CALLA,CALLS,CALMS,CALMY,'),abap.operators.concat(new abap.types.Character(114).set('CALOS,CALPA,CALPS,CALVE,CALYX,CAMAN,CAMAS,CAMEL,CAMEO,CAMES,CAMIS,CAMOS,CAMPI,CAMPO,CAMPS,CAMPY,CAMUS,CANAL,CANDY,'),abap.operators.concat(new abap.types.Character(114).set('CANED,CANEH,CANER,CANES,CANGS,CANID,CANNA,CANNS,CANNY,CANOE,CANON,CANSO,CANST,CANTO,CANTS,CANTY,CAPAS,CAPED,CAPER,'),abap.operators.concat(new abap.types.Character(114).set('CAPES,CAPEX,CAPHS,CAPIZ,CAPLE,CAPON,CAPOS,CAPOT,CAPRI,CAPUL,CAPUT,CARAP,CARAT,CARBO,CARBS,CARBY,CARDI,CARDS,CARDY,'),abap.operators.concat(new abap.types.Character(114).set('CARED,CARER,CARES,CARET,CAREX,CARGO,CARKS,CARLE,CARLS,CARNS,CARNY,CAROB,CAROL,CAROM,CARON,CARPI,CARPS,CARRS,CARRY,'),abap.operators.concat(new abap.types.Character(114).set('CARSE,CARTA,CARTE,CARTS,CARVE,CARVY,CASAS,CASCO,CASED,CASES,CASKS,CASKY,CASTE,CASTS,CASUS,CATCH,CATER,CATES,CATTY,'),abap.operators.concat(new abap.types.Character(114).set('CAUDA,CAUKS,CAULD,CAULK,CAULS,CAUMS,CAUPS,CAURI,CAUSA,CAUSE,CAVAS,CAVED,CAVEL,CAVER,CAVES,CAVIE,CAVIL,CAWED,CAWKS,'),abap.operators.concat(new abap.types.Character(114).set('CAXON,CEASE,CEAZE,CEBID,CECAL,CECUM,CEDAR,CEDED,CEDER,CEDES,CEDIS,CEIBA,CEILI,CEILS,CELEB,CELLA,CELLI,CELLO,CELLS,'),abap.operators.concat(new abap.types.Character(114).set('CELOM,CELTS,CENSE,CENTO,CENTS,CENTU,CEORL,CEPES,CERCI,CERED,CERES,CERGE,CERIA,CERIC,CERNE,CEROC,CEROS,CERTS,CERTY,'),abap.operators.concat(new abap.types.Character(114).set('CESSE,CESTA,CESTI,CETES,CETYL,CEZVE,CHACE,CHACK,CHACO,CHADO,CHADS,CHAFE,CHAFF,CHAFT,CHAIN,CHAIR,CHAIS,CHALK,CHALS,'),abap.operators.concat(new abap.types.Character(114).set('CHAMP,CHAMS,CHANA,CHANG,CHANK,CHANT,CHAOS,CHAPE,CHAPS,CHAPT,CHARA,CHARD,CHARE,CHARK,CHARM,CHARR,CHARS,CHART,CHARY,'),abap.operators.concat(new abap.types.Character(114).set('CHASE,CHASM,CHATS,CHAVE,CHAVS,CHAWK,CHAWS,CHAYA,CHAYS,CHEAP,CHEAT,CHECK,CHEEK,CHEEP,CHEER,CHEFS,CHEKA,CHELA,CHELP,'),abap.operators.concat(new abap.types.Character(114).set('CHEMO,CHEMS,CHERE,CHERT,CHESS,CHEST,CHETH,CHEVY,CHEWS,CHEWY,CHIAO,CHIAS,CHIBS,CHICA,CHICH,CHICK,CHICO,CHICS,CHIDE,'),abap.operators.concat(new abap.types.Character(114).set('CHIEF,CHIEL,CHIKS,CHILD,CHILE,CHILI,CHILL,CHIMB,CHIME,CHIMO,CHIMP,CHINA,CHINE,CHING,CHINK,CHINO,CHINS,CHIPS,CHIRK,'),abap.operators.concat(new abap.types.Character(114).set('CHIRL,CHIRM,CHIRO,CHIRP,CHIRR,CHIRT,CHIRU,CHITS,CHIVE,CHIVS,CHIVY,CHIZZ,CHOCK,CHOCO,CHOCS,CHODE,CHOGS,CHOIL,CHOIR,'),abap.operators.concat(new abap.types.Character(114).set('CHOKE,CHOKO,CHOKY,CHOLA,CHOLI,CHOMP,CHONS,CHOOF,CHOOK,CHOOM,CHOON,CHOPS,CHORD,CHORE,CHOSE,CHOTA,CHOTT,CHOUT,CHOUX,'),abap.operators.concat(new abap.types.Character(114).set('CHOWK,CHOWS,CHUBS,CHUCK,CHUFA,CHUFF,CHUGS,CHUMP,CHUMS,CHUNK,CHURL,CHURN,CHURR,CHUSE,CHUTE,CHUTS,CHYLE,CHYME,CHYND,'),abap.operators.concat(new abap.types.Character(114).set('CIBOL,CIDED,CIDER,CIDES,CIELS,CIGAR,CIGGY,CILIA,CILLS,CIMAR,CIMEX,CINCH,CINCT,CINES,CINQS,CIONS,CIPPI,CIRCA,CIRCS,'),abap.operators.concat(new abap.types.Character(114).set('CIRES,CIRLS,CIRRI,CISCO,CISSY,CISTS,CITAL,CITED,CITER,CITES,CIVES,CIVET,CIVIC,CIVIE,CIVIL,CIVVY,CLACH,CLACK,CLADE,'),abap.operators.concat(new abap.types.Character(114).set('CLADS,CLAES,CLAGS,CLAIM,CLAME,CLAMP,CLAMS,CLANG,CLANK,CLANS,CLAPS,CLAPT,CLARO,CLART,CLARY,CLASH,CLASP,CLASS,CLAST,'),abap.operators.concat(new abap.types.Character(114).set('CLATS,CLAUT,CLAVE,CLAVI,CLAWS,CLAYS,CLEAN,CLEAR,CLEAT,CLECK,CLEEK,CLEEP,CLEFS,CLEFT,CLEGS,CLEIK,CLEMS,CLEPE,CLEPT,'),abap.operators.concat(new abap.types.Character(114).set('CLERK,CLEVE,CLEWS,CLICK,CLIED,CLIES,CLIFF,CLIFT,CLIMB,CLIME,CLINE,CLING,CLINK,CLINT,CLIPE,CLIPS,CLIPT,CLITS,CLOAK,'),abap.operators.concat(new abap.types.Character(114).set('CLOAM,CLOCK,CLODS,CLOFF,CLOGS,CLOKE,CLOMB,CLOMP,CLONE,CLONK,CLONS,CLOOP,CLOOT,CLOPS,CLOSE,CLOTE,CLOTH,CLOTS,CLOUD,'),abap.operators.concat(new abap.types.Character(114).set('CLOUR,CLOUS,CLOUT,CLOVE,CLOWN,CLOWS,CLOYE,CLOYS,CLOZE,CLUBS,CLUCK,CLUED,CLUES,CLUEY,CLUMP,CLUNG,CLUNK,CLYPE,CNIDA,'),abap.operators.concat(new abap.types.Character(114).set('COACH,COACT,COADY,COALA,COALS,COALY,COAPT,COARB,COAST,COATE,COATI,COATS,COBBS,COBBY,COBIA,COBLE,COBRA,COBZA,COCAS,'),abap.operators.concat(new abap.types.Character(114).set('COCCI,COCCO,COCKS,COCKY,COCOA,COCOS,CODAS,CODEC,CODED,CODEN,CODER,CODES,CODEX,CODON,COEDS,COFFS,COGIE,COGON,COGUE,'),abap.operators.concat(new abap.types.Character(114).set('COHAB,COHEN,COHOE,COHOG,COHOS,COIFS,COIGN,COILS,COINS,COIRS,COITS,COKED,COKES,COLAS,COLBY,COLDS,COLED,COLES,COLEY,'),abap.operators.concat(new abap.types.Character(114).set('COLIC,COLIN,COLLS,COLLY,COLOG,COLON,COLOR,COLTS,COLZA,COMAE,COMAL,COMAS,COMBE,COMBI,COMBO,COMBS,COMBY,COMER,COMES,'),abap.operators.concat(new abap.types.Character(114).set('COMET,COMFY,COMIC,COMIX,COMMA,COMMO,COMMS,COMMY,COMPO,COMPS,COMPT,COMTE,COMUS,CONCH,CONDO,CONED,CONES,CONEY,CONFS,'),abap.operators.concat(new abap.types.Character(114).set('CONGA,CONGE,CONGO,CONIA,CONIC,CONIN,CONKS,CONKY,CONNE,CONNS,CONTE,CONTO,CONUS,CONVO,COOCH,COOED,COOEE,COOER,COOEY,'),abap.operators.concat(new abap.types.Character(114).set('COOFS,COOKS,COOKY,COOLS,COOMB,COOMS,COOMY,COONS,COOPS,COOPT,COOST,COOTS,COOZE,COPAL,COPAY,COPED,COPEN,COPER,COPES,'),abap.operators.concat(new abap.types.Character(114).set('COPPY,COPRA,COPSE,COPSY,COQUI,CORAL,CORAM,CORBE,CORBY,CORDS,CORED,CORER,CORES,COREY,CORGI,CORIA,CORKS,CORKY,CORMS,'),abap.operators.concat(new abap.types.Character(114).set('CORNI,CORNO,CORNS,CORNU,CORNY,CORPS,CORSE,CORSO,COSEC,COSED,COSES,COSET,COSEY,COSIE,COSTA,COSTE,COSTS,COTAN,COTED,'),abap.operators.concat(new abap.types.Character(114).set('COTES,COTHS,COTTA,COTTS,COUCH,COUDE,COUGH,COULD,COUNT,COUPE,COUPS,COURB,COURD,COURE,COURS,COURT,COUTA,COUTH,COVED,'),abap.operators.concat(new abap.types.Character(114).set('COVEN,COVER,COVES,COVET,COVEY,COVIN,COWAL,COWAN,COWED,COWER,COWKS,COWLS,COWPS,COWRY,COXAE,COXAL,COXED,COXES,COXIB,'),abap.operators.concat(new abap.types.Character(114).set('COYAU,COYED,COYER,COYLY,COYPU,COZED,COZEN,COZES,COZEY,COZIE,CRAAL,CRABS,CRACK,CRAFT,CRAGS,CRAIC,CRAIG,CRAKE,CRAME,'),abap.operators.concat(new abap.types.Character(114).set('CRAMP,CRAMS,CRANE,CRANK,CRANS,CRAPE,CRAPS,CRAPY,CRARE,CRASH,CRASS,CRATE,CRAVE,CRAWL,CRAWS,CRAYS,CRAZE,CRAZY,CREAK,'),abap.operators.concat(new abap.types.Character(114).set('CREAM,CREDO,CREDS,CREED,CREEK,CREEL,CREEP,CREES,CREME,CREMS,CRENA,CREPE,CREPS,CREPT,CREPY,CRESS,CREST,CREWE,CREWS,'),abap.operators.concat(new abap.types.Character(114).set('CRIAS,CRIBS,CRICK,CRIED,CRIER,CRIES,CRIME,CRIMP,CRIMS,CRINE,CRIOS,CRIPE,CRISE,CRISP,CRITH,CRITS,CROAK,CROCI,CROCK,'),abap.operators.concat(new abap.types.Character(114).set('CROCS,CROFT,CROGS,CROMB,CROME,CRONE,CRONK,CRONS,CRONY,CROOK,CROOL,CROON,CROPS,CRORE,CROSS,CROST,CROUP,CROUT,CROWD,'),abap.operators.concat(new abap.types.Character(114).set('CROWN,CROWS,CROZE,CRUCK,CRUDE,CRUDO,CRUDS,CRUDY,CRUEL,CRUES,CRUET,CRUFT,CRUMB,CRUMP,CRUNK,CRUOR,CRURA,CRUSE,CRUSH,'),abap.operators.concat(new abap.types.Character(114).set('CRUST,CRUSY,CRUVE,CRWTH,CRYER,CRYPT,CTENE,CUBBY,CUBEB,CUBED,CUBER,CUBES,CUBIC,CUBIT,CUDDY,CUFFO,CUFFS,CUIFS,CUING,'),abap.operators.concat(new abap.types.Character(114).set('CUISH,CUITS,CUKES,CULCH,CULET,CULEX,CULLS,CULLY,CULMS,CULPA,CULTI,CULTS,CULTY,CUMEC,CUMIN,CUNDY,CUNEI,CUNIT,CUNTS,'),abap.operators.concat(new abap.types.Character(114).set('CUPEL,CUPID,CUPPA,CUPPY,CURAT,CURBS,CURCH,CURDS,CURDY,CURED,CURER,CURES,CURET,CURFS,CURIA,CURIE,CURIO,CURLI,CURLS,'),abap.operators.concat(new abap.types.Character(114).set('CURLY,CURNS,CURNY,CURRS,CURRY,CURSE,CURSI,CURST,CURVE,CURVY,CUSEC,CUSHY,CUSKS,CUSPS,CUSPY,CUSSO,CUSUM,CUTCH,CUTER,'),abap.operators.concat(new abap.types.Character(114).set('CUTES,CUTEY,CUTIE,CUTIN,CUTIS,CUTTO,CUTTY,CUTUP,CUVEE,CUZES,CWTCH,CYANO,CYANS,CYBER,CYCAD,CYCAS,CYCLE,CYCLO,CYDER,'),abap.operators.concat(new abap.types.Character(114).set('CYLIX,CYMAE,CYMAR,CYMAS,CYMES,CYMOL,CYNIC,CYSTS,CYTES,CYTON,CZARS,DAALS,DABBA,DACES,DACHA,DACKS,DADAH,DADAS,DADDY,'),abap.operators.concat(new abap.types.Character(114).set('DADOS,DAFFS,DAFFY,DAGGA,DAGGY,DAHLS,DAIKO,DAILY,DAINE,DAINT,DAIRY,DAISY,DAKER,DALED,DALES,DALIS,DALLE,DALLY,DALTS,'),abap.operators.concat(new abap.types.Character(114).set('DAMAN,DAMAR,DAMES,DAMME,DAMNS,DAMPS,DAMPY,DANCE,DANCY,DANDY,DANGS,DANIO,DANKS,DANNY,DANTS,DARAF,DARBS,DARCY,DARED,'),abap.operators.concat(new abap.types.Character(114).set('DARER,DARES,DARGA,DARGS,DARIC,DARIS,DARKS,DARNS,DARRE,DARTS,DARZI,DASHI,DASHY,DATAL,DATED,DATER,DATES,DATOS,DATTO,'),abap.operators.concat(new abap.types.Character(114).set('DATUM,DAUBE,DAUBS,DAUBY,DAUDS,DAULT,DAUNT,DAURS,DAUTS,DAVEN,DAVIT,DAWAH,DAWDS,DAWED,DAWEN,DAWKS,DAWNS,DAWTS,DAYAN,'),abap.operators.concat(new abap.types.Character(114).set('DAYCH,DAYNT,DAZED,DAZER,DAZES,DEADS,DEAIR,DEALS,DEALT,DEANS,DEARE,DEARN,DEARS,DEARY,DEASH,DEATH,DEAVE,DEAWS,DEAWY,'),abap.operators.concat(new abap.types.Character(114).set('DEBAG,DEBAR,DEBBY,DEBEL,DEBES,DEBIT,DEBTS,DEBUD,DEBUG,DEBUR,DEBUS,DEBUT,DEBYE,DECAD,DECAF,DECAL,DECAN,DECAY,DECKO,'),abap.operators.concat(new abap.types.Character(114).set('DECKS,DECOR,DECOS,DECOY,DECRY,DEDAL,DEEDS,DEEDY,DEELY,DEEMS,DEENS,DEEPS,DEERE,DEERS,DEETS,DEEVE,DEEVS,DEFAT,DEFER,'),abap.operators.concat(new abap.types.Character(114).set('DEFFO,DEFIS,DEFOG,DEGAS,DEGUM,DEGUS,DEICE,DEIDS,DEIFY,DEIGN,DEILS,DEISM,DEIST,DEITY,DEKED,DEKES,DEKKO,DELAY,DELED,'),abap.operators.concat(new abap.types.Character(114).set('DELES,DELFS,DELFT,DELIS,DELLS,DELLY,DELOS,DELPH,DELTA,DELTS,DELVE,DEMAN,DEMES,DEMIC,DEMIT,DEMOB,DEMOI,DEMON,DEMOS,'),abap.operators.concat(new abap.types.Character(114).set('DEMPT,DEMUR,DENAR,DENAY,DENCH,DENES,DENET,DENIM,DENIS,DENSE,DENTS,DEOXY,DEPOT,DEPTH,DERAT,DERAY,DERBY,DERED,DERES,'),abap.operators.concat(new abap.types.Character(114).set('DERIG,DERMA,DERMS,DERNS,DERNY,DEROS,DERRO,DERRY,DERTH,DERVS,DESEX,DESHI,DESIS,DESKS,DESSE,DETER,DETOX,DEUCE,DEVAS,'),abap.operators.concat(new abap.types.Character(114).set('DEVEL,DEVIL,DEVIS,DEVON,DEVOS,DEVOT,DEWAN,DEWAR,DEWAX,DEWED,DEXES,DEXIE,DHABA,DHAKS,DHALS,DHIKR,DHOBI,DHOLE,DHOLL,'),abap.operators.concat(new abap.types.Character(114).set('DHOLS,DHOTI,DHOWS,DHUTI,DIACT,DIALS,DIANE,DIARY,DIAZO,DIBBS,DICED,DICER,DICES,DICEY,DICHT,DICKS,DICKY,DICOT,DICTA,'),abap.operators.concat(new abap.types.Character(114).set('DICTS,DICTY,DIDDY,DIDIE,DIDOS,DIDST,DIEBS,DIELS,DIENE,DIETS,DIFFS,DIGHT,DIGIT,DIKAS,DIKED,DIKER,DIKES,DILDO,DILLI,'),abap.operators.concat(new abap.types.Character(114).set('DILLS,DILLY,DIMBO,DIMER,DIMES,DIMLY,DIMPS,DINAR,DINED,DINER,DINES,DINGE,DINGO,DINGS,DINGY,DINIC,DINKS,DINKY,DINNA,'),abap.operators.concat(new abap.types.Character(114).set('DINOS,DINTS,DIODE,DIOLS,DIOTA,DIPPY,DIPSO,DIRAM,DIRER,DIRGE,DIRKE,DIRKS,DIRLS,DIRTS,DIRTY,DISAS,DISCI,DISCO,DISCS,'),abap.operators.concat(new abap.types.Character(114).set('DISHY,DISKS,DISME,DITAL,DITAS,DITCH,DITED,DITES,DITSY,DITTO,DITTS,DITTY,DITZY,DIVAN,DIVAS,DIVED,DIVER,DIVES,DIVIS,'),abap.operators.concat(new abap.types.Character(114).set('DIVNA,DIVOS,DIVOT,DIVVY,DIWAN,DIXIE,DIXIT,DIYAS,DIZEN,DIZZY,DJINN,DJINS,DOABS,DOATS,DOBBY,DOBES,DOBIE,DOBLA,DOBRA,'),abap.operators.concat(new abap.types.Character(114).set('DOBRO,DOCHT,DOCKS,DOCOS,DOCUS,DODDY,DODGE,DODGY,DODOS,DOEKS,DOERS,DOEST,DOETH,DOFFS,DOGES,DOGEY,DOGGO,DOGGY,DOGIE,'),abap.operators.concat(new abap.types.Character(114).set('DOGMA,DOHYO,DOILT,DOILY,DOING,DOITS,DOJOS,DOLCE,DOLCI,DOLED,DOLES,DOLIA,DOLLS,DOLLY,DOLMA,DOLOR,DOLOS,DOLTS,DOMAL,'),abap.operators.concat(new abap.types.Character(114).set('DOMED,DOMES,DOMIC,DONAH,DONAS,DONEE,DONER,DONGA,DONGS,DONKO,DONNA,DONNE,DONNY,DONOR,DONSY,DONUT,DOOBS,DOOCE,DOODY,'),abap.operators.concat(new abap.types.Character(114).set('DOOKS,DOOLE,DOOLS,DOOLY,DOOMS,DOOMY,DOONA,DOORN,DOORS,DOOZY,DOPAS,DOPED,DOPER,DOPES,DOPEY,DORAD,DORBA,DORBS,DOREE,'),abap.operators.concat(new abap.types.Character(114).set('DORES,DORIC,DORIS,DORKS,DORKY,DORMS,DORMY,DORPS,DORRS,DORSA,DORSE,DORTS,DORTY,DOSAI,DOSAS,DOSED,DOSEH,DOSER,DOSES,'),abap.operators.concat(new abap.types.Character(114).set('DOSHA,DOTAL,DOTED,DOTER,DOTES,DOTTY,DOUAR,DOUBT,DOUCE,DOUCS,DOUGH,DOUKS,DOULA,DOUMA,DOUMS,DOUPS,DOURA,DOUSE,DOUTS,'),abap.operators.concat(new abap.types.Character(114).set('DOVED,DOVEN,DOVER,DOVES,DOVIE,DOWAR,DOWDS,DOWDY,DOWED,DOWEL,DOWER,DOWIE,DOWLE,DOWLS,DOWLY,DOWNA,DOWNS,DOWNY,DOWPS,'),abap.operators.concat(new abap.types.Character(114).set('DOWRY,DOWSE,DOWTS,DOXED,DOXES,DOXIE,DOYEN,DOYLY,DOZED,DOZEN,DOZER,DOZES,DRABS,DRACK,DRACO,DRAFF,DRAFT,DRAGS,DRAIL,'),abap.operators.concat(new abap.types.Character(114).set('DRAIN,DRAKE,DRAMA,DRAMS,DRANK,DRANT,DRAPE,DRAPS,DRATS,DRAVE,DRAWL,DRAWN,DRAWS,DRAYS,DREAD,DREAM,DREAR,DRECK,DREED,'),abap.operators.concat(new abap.types.Character(114).set('DREER,DREES,DREGS,DREKS,DRENT,DRERE,DRESS,DREST,DREYS,DRIBS,DRICE,DRIED,DRIER,DRIES,DRIFT,DRILL,DRILY,DRINK,DRIPS,'),abap.operators.concat(new abap.types.Character(114).set('DRIPT,DRIVE,DROID,DROIL,DROIT,DROKE,DROLE,DROLL,DROME,DRONE,DRONY,DROOB,DROOG,DROOK,DROOL,DROOP,DROPS,DROPT,DROSS,'),abap.operators.concat(new abap.types.Character(114).set('DROUK,DROVE,DROWN,DROWS,DRUBS,DRUGS,DRUID,DRUMS,DRUNK,DRUPE,DRUSE,DRUSY,DRUXY,DRYAD,DRYAS,DRYER,DRYLY,DSOBO,DSOMO,'),abap.operators.concat(new abap.types.Character(114).set('DUADS,DUALS,DUANS,DUARS,DUBBO,DUCAL,DUCAT,DUCES,DUCHY,DUCKS,DUCKY,DUCTS,DUDDY,DUDED,DUDES,DUELS,DUETS,DUETT,DUFFS,'),abap.operators.concat(new abap.types.Character(114).set('DUFUS,DUING,DUITS,DUKAS,DUKED,DUKES,DUKKA,DULCE,DULES,DULIA,DULLS,DULLY,DULSE,DUMAS,DUMBO,DUMBS,DUMKA,DUMKY,DUMMY,'),abap.operators.concat(new abap.types.Character(114).set('DUMPS,DUMPY,DUNAM,DUNCE,DUNCH,DUNES,DUNGS,DUNGY,DUNKS,DUNNO,DUNNY,DUNSH,DUNTS,DUOMI,DUOMO,DUPED,DUPER,DUPES,DUPLE,'),abap.operators.concat(new abap.types.Character(114).set('DUPLY,DUPPY,DURAL,DURAS,DURED,DURES,DURGY,DURNS,DUROC,DUROS,DUROY,DURRA,DURRS,DURRY,DURST,DURUM,DURZI,DUSKS,DUSKY,'),abap.operators.concat(new abap.types.Character(114).set('DUSTS,DUSTY,DUTCH,DUVET,DUXES,DWAAL,DWALE,DWALM,DWAMS,DWANG,DWARF,DWAUM,DWEEB,DWELL,DWELT,DWILE,DWINE,DYADS,DYERS,'),abap.operators.concat(new abap.types.Character(114).set('DYING,DYKED,DYKES,DYKON,DYNEL,DYNES,DZHOS,EAGER,EAGLE,EAGRE,EALED,EALES,EANED,EARDS,EARED,EARLS,EARLY,EARNS,EARNT,'),abap.operators.concat(new abap.types.Character(114).set('EARST,EARTH,EASED,EASEL,EASER,EASES,EASLE,EASTS,EATEN,EATER,EATHE,EAVED,EAVES,EBBED,EBBET,EBONS,EBONY,EBOOK,ECADS,'),abap.operators.concat(new abap.types.Character(114).set('ECHED,ECHES,ECHOS,ECLAT,ECRUS,EDEMA,EDGED,EDGER,EDGES,EDICT,EDIFY,EDILE,EDITS,EDUCE,EDUCT,EEJIT,EENSY,EERIE,EEVEN,'),abap.operators.concat(new abap.types.Character(114).set('EEVNS,EFFED,EGADS,EGERS,EGEST,EGGAR,EGGED,EGGER,EGMAS,EGRET,EHING,EIDER,EIDOS,EIGHT,EIGNE,EIKED,EIKON,EILDS,EISEL,'),abap.operators.concat(new abap.types.Character(114).set('EJECT,EJIDO,EKING,EKKAS,ELAIN,ELAND,ELANS,ELATE,ELBOW,ELCHI,ELDER,ELDIN,ELECT,ELEGY,ELEMI,ELFED,ELFIN,ELIAD,ELIDE,'),abap.operators.concat(new abap.types.Character(114).set('ELINT,ELITE,ELMEN,ELOGE,ELOGY,ELOIN,ELOPE,ELOPS,ELPEE,ELSIN,ELUDE,ELUTE,ELVAN,ELVEN,ELVER,ELVES,EMACS,EMAIL,EMBAR,'),abap.operators.concat(new abap.types.Character(114).set('EMBAY,EMBED,EMBER,EMBOG,EMBOW,EMBOX,EMBUS,EMCEE,EMEER,EMEND,EMERG,EMERY,EMEUS,EMICS,EMIRS,EMITS,EMMAS,EMMER,EMMET,'),abap.operators.concat(new abap.types.Character(114).set('EMMEW,EMMYS,EMOJI,EMONG,EMOTE,EMOVE,EMPTS,EMPTY,EMULE,EMURE,EMYDE,EMYDS,ENACT,ENARM,ENATE,ENDED,ENDER,ENDEW,ENDOW,'),abap.operators.concat(new abap.types.Character(114).set('ENDUE,ENEMA,ENEMY,ENEWS,ENFIX,ENIAC,ENJOY,ENLIT,ENMEW,ENNOG,ENNUI,ENOKI,ENOLS,ENORM,ENOWS,ENROL,ENSEW,ENSKY,ENSUE,'),abap.operators.concat(new abap.types.Character(114).set('ENTER,ENTIA,ENTRY,ENURE,ENURN,ENVOI,ENVOY,ENZYM,EORLS,EOSIN,EPACT,EPEES,EPHAH,EPHAS,EPHOD,EPHOR,EPICS,EPOCH,EPODE,'),abap.operators.concat(new abap.types.Character(114).set('EPOPT,EPOXY,EPRIS,EQUAL,EQUES,EQUID,EQUIP,ERASE,ERBIA,ERECT,EREVS,ERGON,ERGOS,ERGOT,ERHUS,ERICA,ERICK,ERICS,ERING,'),abap.operators.concat(new abap.types.Character(114).set('ERNED,ERNES,ERODE,EROSE,ERRED,ERROR,ERSES,ERUCT,ERUGO,ERUPT,ERUVS,ERVEN,ERVIL,ESCAR,ESCOT,ESILE,ESKAR,ESKER,ESNES,'),abap.operators.concat(new abap.types.Character(114).set('ESSAY,ESSES,ESTER,ESTOC,ESTOP,ESTRO,ETAGE,ETAPE,ETATS,ETENS,ETHAL,ETHER,ETHIC,ETHNE,ETHOS,ETHYL,ETICS,ETNAS,ETTIN,'),abap.operators.concat(new abap.types.Character(114).set('ETTLE,ETUDE,ETUIS,ETWEE,ETYMA,EUGHS,EUKED,EUPAD,EUROS,EUSOL,EVADE,EVENS,EVENT,EVERT,EVERY,EVETS,EVHOE,EVICT,EVILS,'),abap.operators.concat(new abap.types.Character(114).set('EVITE,EVOHE,EVOKE,EWERS,EWEST,EWHOW,EWKED,EXACT,EXALT,EXAMS,EXCEL,EXEAT,EXECS,EXEEM,EXEME,EXERT,EXFIL,EXIES,EXILE,'),abap.operators.concat(new abap.types.Character(114).set('EXINE,EXING,EXIST,EXITS,EXODE,EXOME,EXONS,EXPAT,EXPEL,EXPOS,EXTOL,EXTRA,EXUDE,EXULS,EXULT,EXURB,EYASS,EYERS,EYING,'),abap.operators.concat(new abap.types.Character(114).set('EYOTS,EYRAS,EYRES,EYRIE,EYRIR,EZINE,FABBY,FABLE,FACED,FACER,FACES,FACET,FACIA,FACTA,FACTS,FADDY,FADED,FADER,FADES,'),abap.operators.concat(new abap.types.Character(114).set('FADGE,FADOS,FAENA,FAERY,FAFFS,FAFFY,FAGIN,FAGOT,FAIKS,FAILS,FAINE,FAINS,FAINT,FAIRS,FAIRY,FAITH,FAKED,FAKER,FAKES,'),abap.operators.concat(new abap.types.Character(114).set('FAKEY,FAKIE,FAKIR,FALAJ,FALLS,FALSE,FAMED,FAMES,FANAL,FANCY,FANDS,FANES,FANGA,FANGO,FANGS,FANKS,FANNY,FANON,FANOS,'),abap.operators.concat(new abap.types.Character(114).set('FANUM,FAQIR,FARAD,FARCE,FARCI,FARCY,FARDS,FARED,FARER,FARES,FARLE,FARLS,FARMS,FAROS,FARRO,FARSE,FARTS,FASCI,FASTI,'),abap.operators.concat(new abap.types.Character(114).set('FASTS,FATAL,FATED,FATES,FATLY,FATSO,FATTY,FATWA,FAUGH,FAULD,FAULT,FAUNA,FAUNS,FAURD,FAUTS,FAUVE,FAVAS,FAVEL,FAVER,'),abap.operators.concat(new abap.types.Character(114).set('FAVES,FAVOR,FAVUS,FAWNS,FAWNY,FAXED,FAXES,FAYED,FAYER,FAYNE,FAYRE,FAZED,FAZES,FEALS,FEARE,FEARS,FEART,FEASE,FEAST,'),abap.operators.concat(new abap.types.Character(114).set('FEATS,FEAZE,FECAL,FECES,FECHT,FECIT,FECKS,FEDEX,FEEBS,FEEDS,FEELS,FEENS,FEERS,FEESE,FEEZE,FEHME,FEIGN,FEINT,FEIST,'),abap.operators.concat(new abap.types.Character(114).set('FELCH,FELID,FELLA,FELLS,FELLY,FELON,FELTS,FELTY,FEMAL,FEMES,FEMME,FEMMY,FEMUR,FENCE,FENDS,FENDY,FENIS,FENKS,FENNY,'),abap.operators.concat(new abap.types.Character(114).set('FENTS,FEODS,FEOFF,FERAL,FERER,FERES,FERIA,FERLY,FERMI,FERMS,FERNS,FERNY,FERRY,FESSE,FESTA,FESTS,FESTY,FETAL,FETAS,'),abap.operators.concat(new abap.types.Character(114).set('FETCH,FETED,FETES,FETID,FETOR,FETTA,FETTS,FETUS,FETWA,FEUAR,FEUDS,FEUED,FEVER,FEWER,FEYED,FEYER,FEYLY,FEZES,FEZZY,'),abap.operators.concat(new abap.types.Character(114).set('FIARS,FIATS,FIBER,FIBRE,FIBRO,FICES,FICHE,FICHU,FICIN,FICOS,FICUS,FIDES,FIDGE,FIDOS,FIEFS,FIELD,FIEND,FIENT,FIERE,'),abap.operators.concat(new abap.types.Character(114).set('FIERS,FIERY,FIEST,FIFED,FIFER,FIFES,FIFIS,FIFTH,FIFTY,FIGGY,FIGHT,FIGOS,FIKED,FIKES,FILAR,FILCH,FILED,FILER,FILES,'),abap.operators.concat(new abap.types.Character(114).set('FILET,FILII,FILKS,FILLE,FILLO,FILLS,FILLY,FILMI,FILMS,FILMY,FILOS,FILTH,FILUM,FINAL,FINCA,FINCH,FINDS,FINED,FINER,'),abap.operators.concat(new abap.types.Character(114).set('FINES,FINIS,FINKS,FINNY,FINOS,FIORD,FIQHS,FIQUE,FIRED,FIRER,FIRES,FIRIE,FIRKS,FIRMS,FIRNS,FIRRY,FIRST,FIRTH,FISCS,'),abap.operators.concat(new abap.types.Character(114).set('FISHY,FISKS,FISTS,FISTY,FITCH,FITLY,FITNA,FITTE,FITTS,FIVER,FIVES,FIXED,FIXER,FIXES,FIXIT,FIZZY,FJELD,FJORD,FLABS,'),abap.operators.concat(new abap.types.Character(114).set('FLACK,FLAFF,FLAGS,FLAIL,FLAIR,FLAKE,FLAKS,FLAKY,FLAME,FLAMM,FLAMS,FLAMY,FLANE,FLANK,FLANS,FLAPS,FLARE,FLARY,FLASH,'),abap.operators.concat(new abap.types.Character(114).set('FLASK,FLATS,FLAVA,FLAWN,FLAWS,FLAWY,FLAXY,FLAYS,FLEAM,FLEAS,FLECK,FLEEK,FLEER,FLEES,FLEET,FLEGS,FLEME,FLESH,FLEUR,'),abap.operators.concat(new abap.types.Character(114).set('FLEWS,FLEXI,FLEXO,FLEYS,FLICK,FLICS,FLIED,FLIER,FLIES,FLIMP,FLIMS,FLING,FLINT,FLIPS,FLIRS,FLIRT,FLISK,FLITE,FLITS,'),abap.operators.concat(new abap.types.Character(114).set('FLITT,FLOAT,FLOBS,FLOCK,FLOCS,FLOES,FLOGS,FLONG,FLOOD,FLOOR,FLOPS,FLORA,FLORS,FLORY,FLOSH,FLOSS,FLOTA,FLOTE,FLOUR,'),abap.operators.concat(new abap.types.Character(114).set('FLOUT,FLOWN,FLOWS,FLUBS,FLUED,FLUES,FLUEY,FLUFF,FLUID,FLUKE,FLUKY,FLUME,FLUMP,FLUNG,FLUNK,FLUOR,FLURR,FLUSH,FLUTE,'),abap.operators.concat(new abap.types.Character(114).set('FLUTY,FLUYT,FLYBY,FLYER,FLYPE,FLYTE,FOALS,FOAMS,FOAMY,FOCAL,FOCUS,FOEHN,FOGEY,FOGGY,FOGIE,FOGLE,FOGOU,FOHNS,FOIDS,'),abap.operators.concat(new abap.types.Character(114).set('FOILS,FOINS,FOIST,FOLDS,FOLEY,FOLIA,FOLIC,FOLIE,FOLIO,FOLKS,FOLKY,FOLLY,FOMES,FONDA,FONDS,FONDU,FONES,FONLY,FONTS,'),abap.operators.concat(new abap.types.Character(114).set('FOODS,FOODY,FOOLS,FOOTS,FOOTY,FORAM,FORAY,FORBS,FORBY,FORCE,FORDO,FORDS,FOREL,FORES,FOREX,FORGE,FORGO,FORKS,FORKY,'),abap.operators.concat(new abap.types.Character(114).set('FORME,FORMS,FORTE,FORTH,FORTS,FORTY,FORUM,FORZA,FORZE,FOSSA,FOSSE,FOUAT,FOUDS,FOUER,FOUET,FOULE,FOULS,FOUND,FOUNT,'),abap.operators.concat(new abap.types.Character(114).set('FOURS,FOUTH,FOVEA,FOWLS,FOWTH,FOXED,FOXES,FOXIE,FOYER,FOYLE,FOYNE,FRABS,FRACK,FRACT,FRAGS,FRAIL,FRAIM,FRAME,FRANC,'),abap.operators.concat(new abap.types.Character(114).set('FRANK,FRAPE,FRAPS,FRASS,FRATE,FRATI,FRATS,FRAUD,FRAUS,FRAYS,FREAK,FREED,FREER,FREES,FREET,FREIT,FREMD,FRENA,FREON,'),abap.operators.concat(new abap.types.Character(114).set('FRERE,FRESH,FRETS,FRIAR,FRIBS,FRIED,FRIER,FRIES,FRIGS,FRILL,FRISE,FRISK,FRIST,FRITH,FRITS,FRITT,FRITZ,FRIZE,FRIZZ,'),abap.operators.concat(new abap.types.Character(114).set('FROCK,FROES,FROGS,FROND,FRONS,FRONT,FRORE,FRORN,FRORY,FROSH,FROST,FROTH,FROWN,FROWS,FROWY,FROZE,FRUGS,FRUIT,FRUMP,'),abap.operators.concat(new abap.types.Character(114).set('FRUSH,FRUST,FRYER,FUBAR,FUBBY,FUBSY,FUCKS,FUCUS,FUDDY,FUDGE,FUDGY,FUELS,FUERO,FUFFS,FUFFY,FUGAL,FUGGY,FUGIE,FUGIO,'),abap.operators.concat(new abap.types.Character(114).set('FUGLE,FUGLY,FUGUE,FUGUS,FUJIS,FULLS,FULLY,FUMED,FUMER,FUMES,FUMET,FUNDI,FUNDS,FUNDY,FUNGI,FUNGO,FUNGS,FUNKS,FUNKY,'),abap.operators.concat(new abap.types.Character(114).set('FUNNY,FURAL,FURAN,FURCA,FURLS,FUROL,FUROR,FURRS,FURRY,FURTH,FURZE,FURZY,FUSED,FUSEE,FUSEL,FUSES,FUSIL,FUSKS,FUSSY,'),abap.operators.concat(new abap.types.Character(114).set('FUSTS,FUSTY,FUTON,FUZED,FUZEE,FUZES,FUZIL,FUZZY,FYCES,FYKED,FYKES,FYLES,FYRDS,FYTTE,GABBA,GABBY,GABLE,GADDI,GADES,'),abap.operators.concat(new abap.types.Character(114).set('GADGE,GADID,GADIS,GADJE,GADJO,GADSO,GAFFE,GAFFS,GAGED,GAGER,GAGES,GAIDS,GAILY,GAINS,GAIRS,GAITA,GAITS,GAITT,GAJOS,'),abap.operators.concat(new abap.types.Character(114).set('GALAH,GALAS,GALAX,GALEA,GALED,GALES,GALLS,GALLY,GALOP,GALUT,GALVO,GAMAS,GAMAY,GAMBA,GAMBE,GAMBO,GAMBS,GAMED,GAMER,'),abap.operators.concat(new abap.types.Character(114).set('GAMES,GAMEY,GAMIC,GAMIN,GAMMA,GAMME,GAMMY,GAMPS,GAMUT,GANCH,GANDY,GANEF,GANEV,GANGS,GANJA,GANOF,GANTS,GAOLS,GAPED,'),abap.operators.concat(new abap.types.Character(114).set('GAPER,GAPES,GAPOS,GAPPY,GARBE,GARBO,GARBS,GARDA,GARES,GARIS,GARMS,GARNI,GARRE,GARTH,GARUM,GASES,GASPS,GASPY,GASSY,'),abap.operators.concat(new abap.types.Character(114).set('GASTS,GATCH,GATED,GATER,GATES,GATHS,GATOR,GAUCH,GAUCY,GAUDS,GAUDY,GAUGE,GAUJE,GAULT,GAUMS,GAUMY,GAUNT,GAUPS,GAURS,'),abap.operators.concat(new abap.types.Character(114).set('GAUSS,GAUZE,GAUZY,GAVEL,GAVOT,GAWCY,GAWDS,GAWKS,GAWKY,GAWPS,GAWSY,GAYAL,GAYER,GAYLY,GAZAL,GAZAR,GAZED,GAZER,GAZES,'),abap.operators.concat(new abap.types.Character(114).set('GAZON,GAZOO,GEALS,GEANS,GEARE,GEARS,GEATS,GEBUR,GECKO,GECKS,GEEKS,GEEKY,GEEPS,GEESE,GEEST,GEIST,GEITS,GELDS,GELEE,'),abap.operators.concat(new abap.types.Character(114).set('GELID,GELLY,GELTS,GEMEL,GEMMA,GEMMY,GEMOT,GENAL,GENAS,GENES,GENET,GENIC,GENIE,GENII,GENIP,GENNY,GENOA,GENOM,GENRE,'),abap.operators.concat(new abap.types.Character(114).set('GENRO,GENTS,GENTY,GENUA,GENUS,GEODE,GEOID,GERAH,GERBE,GERES,GERLE,GERMS,GERMY,GERNE,GESSE,GESSO,GESTE,GESTS,GETAS,'),abap.operators.concat(new abap.types.Character(114).set('GETUP,GEUMS,GEYAN,GEYER,GHAST,GHATS,GHAUT,GHAZI,GHEES,GHEST,GHOST,GHOUL,GHYLL,GIANT,GIBED,GIBEL,GIBER,GIBES,GIBLI,'),abap.operators.concat(new abap.types.Character(114).set('GIBUS,GIDDY,GIFTS,GIGAS,GIGHE,GIGOT,GIGUE,GILAS,GILDS,GILET,GILLS,GILLY,GILPY,GILTS,GIMEL,GIMME,GIMPS,GIMPY,GINCH,'),abap.operators.concat(new abap.types.Character(114).set('GINGE,GINGS,GINKS,GINNY,GIPON,GIPPY,GIPSY,GIRDS,GIRLS,GIRLY,GIRNS,GIRON,GIROS,GIRRS,GIRSH,GIRTH,GIRTS,GISMO,GISMS,'),abap.operators.concat(new abap.types.Character(114).set('GISTS,GITCH,GITES,GIUST,GIVED,GIVEN,GIVER,GIVES,GIZMO,GLACE,GLADE,GLADS,GLADY,GLAIK,GLAIR,GLAMS,GLAND,GLANS,GLARE,'),abap.operators.concat(new abap.types.Character(114).set('GLARY,GLASS,GLAUM,GLAUR,GLAZE,GLAZY,GLEAM,GLEAN,GLEBA,GLEBE,GLEBY,GLEDE,GLEDS,GLEED,GLEEK,GLEES,GLEET,GLEIS,GLENS,'),abap.operators.concat(new abap.types.Character(114).set('GLENT,GLEYS,GLIAL,GLIAS,GLIBS,GLIDE,GLIFF,GLIFT,GLIKE,GLIME,GLIMS,GLINT,GLISK,GLITS,GLITZ,GLOAM,GLOAT,GLOBE,GLOBI,'),abap.operators.concat(new abap.types.Character(114).set('GLOBS,GLOBY,GLODE,GLOGG,GLOMS,GLOOM,GLOOP,GLOPS,GLORY,GLOSS,GLOST,GLOUT,GLOVE,GLOWS,GLOZE,GLUED,GLUER,GLUES,GLUEY,'),abap.operators.concat(new abap.types.Character(114).set('GLUGS,GLUME,GLUMS,GLUON,GLUTE,GLUTS,GLYPH,GNARL,GNARR,GNARS,GNASH,GNATS,GNAWN,GNAWS,GNOME,GNOWS,GOADS,GOAFS,GOALS,'),abap.operators.concat(new abap.types.Character(114).set('GOARY,GOATS,GOATY,GOBAN,GOBAR,GOBBI,GOBBO,GOBBY,GOBIS,GOBOS,GODET,GODLY,GODSO,GOELS,GOERS,GOEST,GOETH,GOETY,GOFER,'),abap.operators.concat(new abap.types.Character(114).set('GOFFS,GOGGA,GOGOS,GOIER,GOING,GOJIS,GOLDS,GOLDY,GOLEM,GOLES,GOLFS,GOLLY,GOLPE,GOLPS,GOMBO,GOMER,GOMPA,GONAD,GONCH,'),abap.operators.concat(new abap.types.Character(114).set('GONEF,GONER,GONGS,GONIA,GONIF,GONKS,GONNA,GONOF,GONYS,GONZO,GOOBY,GOODS,GOODY,GOOEY,GOOFS,GOOFY,GOOGS,GOOKS,GOOKY,'),abap.operators.concat(new abap.types.Character(114).set('GOOLD,GOOLS,GOOLY,GOONS,GOONY,GOOPS,GOOPY,GOORS,GOORY,GOOSE,GOOSY,GOPAK,GOPIK,GORAL,GORAS,GORED,GORES,GORGE,GORIS,'),abap.operators.concat(new abap.types.Character(114).set('GORMS,GORMY,GORPS,GORSE,GORSY,GOSHT,GOSSE,GOTCH,GOTHS,GOTHY,GOTTA,GOUCH,GOUGE,GOUKS,GOURA,GOURD,GOUTS,GOUTY,GOWAN,'),abap.operators.concat(new abap.types.Character(114).set('GOWDS,GOWFS,GOWKS,GOWLS,GOWNS,GOXES,GOYLE,GRAAL,GRABS,GRACE,GRADE,GRADS,GRAFF,GRAFT,GRAIL,GRAIN,GRAIP,GRAMA,GRAME,'),abap.operators.concat(new abap.types.Character(114).set('GRAMP,GRAMS,GRANA,GRAND,GRANS,GRANT,GRAPE,GRAPH,GRAPY,GRASP,GRASS,GRATE,GRAVE,GRAVS,GRAVY,GRAYS,GRAZE,GREAT,GREBE,'),abap.operators.concat(new abap.types.Character(114).set('GREBO,GRECE,GREED,GREEK,GREEN,GREES,GREET,GREGE,GREGO,GREIN,GRENS,GRESE,GREVE,GREWS,GREYS,GRICE,GRIDE,GRIDS,GRIEF,'),abap.operators.concat(new abap.types.Character(114).set('GRIFF,GRIFT,GRIGS,GRIKE,GRILL,GRIME,GRIMY,GRIND,GRINS,GRIOT,GRIPE,GRIPS,GRIPT,GRIPY,GRISE,GRIST,GRISY,GRITH,GRITS,'),abap.operators.concat(new abap.types.Character(114).set('GRIZE,GROAN,GROAT,GRODY,GROGS,GROIN,GROKS,GROMA,GRONE,GROOF,GROOM,GROPE,GROSS,GROSZ,GROTS,GROUF,GROUP,GROUT,GROVE,'),abap.operators.concat(new abap.types.Character(114).set('GROVY,GROWL,GROWN,GROWS,GRRLS,GRRRL,GRUBS,GRUED,GRUEL,GRUES,GRUFE,GRUFF,GRUME,GRUMP,GRUND,GRUNT,GRYCE,GRYDE,GRYKE,'),abap.operators.concat(new abap.types.Character(114).set('GRYPE,GRYPT,GUACO,GUANA,GUANO,GUANS,GUARD,GUARS,GUAVA,GUCKS,GUCKY,GUDES,GUESS,GUEST,GUFFS,GUGAS,GUIDE,GUIDS,GUILD,'),abap.operators.concat(new abap.types.Character(114).set('GUILE,GUILT,GUIMP,GUIRO,GUISE,GULAG,GULAR,GULAS,GULCH,GULES,GULET,GULFS,GULFY,GULLS,GULLY,GULPH,GULPS,GULPY,GUMBO,'),abap.operators.concat(new abap.types.Character(114).set('GUMMA,GUMMI,GUMMY,GUMPS,GUNDY,GUNGE,GUNGY,GUNKS,GUNKY,GUNNY,GUPPY,GUQIN,GURDY,GURGE,GURLS,GURLY,GURNS,GURRY,GURSH,'),abap.operators.concat(new abap.types.Character(114).set('GURUS,GUSHY,GUSLA,GUSLE,GUSLI,GUSSY,GUSTO,GUSTS,GUSTY,GUTSY,GUTTA,GUTTY,GUYED,GUYLE,GUYOT,GUYSE,GWINE,GYALS,GYANS,'),abap.operators.concat(new abap.types.Character(114).set('GYBED,GYBES,GYELD,GYMPS,GYNAE,GYNIE,GYNNY,GYNOS,GYOZA,GYPOS,GYPPY,GYPSY,GYRAL,GYRED,GYRES,GYRON,GYROS,GYRUS,GYTES,'),abap.operators.concat(new abap.types.Character(114).set('GYVED,GYVES,HAAFS,HAARS,HABIT,HABLE,HABUS,HACEK,HACKS,HADAL,HADED,HADES,HADJI,HADST,HAEMS,HAETS,HAFFS,HAFIZ,HAFTS,'),abap.operators.concat(new abap.types.Character(114).set('HAGGS,HAHAS,HAICK,HAIKA,HAIKS,HAIKU,HAILS,HAILY,HAINS,HAINT,HAIRS,HAIRY,HAITH,HAJES,HAJIS,HAJJI,HAKAM,HAKAS,HAKEA,'),abap.operators.concat(new abap.types.Character(114).set('HAKES,HAKIM,HAKUS,HALAL,HALED,HALER,HALES,HALFA,HALFS,HALID,HALLO,HALLS,HALMA,HALMS,HALON,HALOS,HALSE,HALTS,HALVA,'),abap.operators.concat(new abap.types.Character(114).set('HALVE,HALWA,HAMAL,HAMBA,HAMED,HAMES,HAMMY,HAMZA,HANAP,HANCE,HANCH,HANDS,HANDY,HANGI,HANGS,HANKS,HANKY,HANSA,HANSE,'),abap.operators.concat(new abap.types.Character(114).set('HANTS,HAOMA,HAPAX,HAPLY,HAPPI,HAPPY,HAPUS,HARAM,HARDS,HARDY,HARED,HAREM,HARES,HARIM,HARKS,HARLS,HARMS,HARNS,HAROS,'),abap.operators.concat(new abap.types.Character(114).set('HARPS,HARPY,HARRY,HARSH,HARTS,HASHY,HASKS,HASPS,HASTA,HASTE,HASTY,HATCH,HATED,HATER,HATES,HATHA,HAUDS,HAUFS,HAUGH,'),abap.operators.concat(new abap.types.Character(114).set('HAULD,HAULM,HAULS,HAULT,HAUNS,HAUNT,HAUSE,HAUTE,HAVEN,HAVER,HAVES,HAVOC,HAWED,HAWKS,HAWMS,HAWSE,HAYED,HAYER,HAYEY,'),abap.operators.concat(new abap.types.Character(114).set('HAYLE,HAZAN,HAZED,HAZEL,HAZER,HAZES,HEADS,HEADY,HEALD,HEALS,HEAME,HEAPS,HEAPY,HEARD,HEARE,HEARS,HEART,HEAST,HEATH,'),abap.operators.concat(new abap.types.Character(114).set('HEATS,HEAVE,HEAVY,HEBEN,HEBES,HECHT,HECKS,HEDER,HEDGE,HEDGY,HEEDS,HEEDY,HEELS,HEEZE,HEFTE,HEFTS,HEFTY,HEIDS,HEIGH,'),abap.operators.concat(new abap.types.Character(114).set('HEILS,HEIRS,HEIST,HEJAB,HEJRA,HELED,HELES,HELIO,HELIX,HELLO,HELLS,HELMS,HELOS,HELOT,HELPS,HELVE,HEMAL,HEMES,HEMIC,'),abap.operators.concat(new abap.types.Character(114).set('HEMIN,HEMPS,HEMPY,HENCE,HENCH,HENDS,HENGE,HENNA,HENNY,HENRY,HENTS,HEPAR,HERBS,HERBY,HERDS,HERES,HERLS,HERMA,HERMS,'),abap.operators.concat(new abap.types.Character(114).set('HERNS,HERON,HEROS,HERRY,HERSE,HERTZ,HERYE,HESPS,HESTS,HETES,HETHS,HEUCH,HEUGH,HEVEA,HEWED,HEWER,HEWGH,HEXAD,HEXED,'),abap.operators.concat(new abap.types.Character(114).set('HEXER,HEXES,HEXYL,HEYED,HIANT,HICKS,HIDED,HIDER,HIDES,HIEMS,HIGHS,HIGHT,HIJAB,HIJRA,HIKED,HIKER,HIKES,HIKOI,HILAR,'),abap.operators.concat(new abap.types.Character(114).set('HILCH,HILLO,HILLS,HILLY,HILTS,HILUM,HILUS,HIMBO,HINAU,HINDS,HINGE,HINGS,HINKY,HINNY,HINTS,HIOIS,HIPLY,HIPPO,HIPPY,'),abap.operators.concat(new abap.types.Character(114).set('HIRED,HIREE,HIRER,HIRES,HISSY,HISTS,HITCH,HITHE,HIVED,HIVER,HIVES,HIZEN,HOAED,HOAGY,HOARD,HOARS,HOARY,HOAST,HOBBY,'),abap.operators.concat(new abap.types.Character(114).set('HOBOS,HOCKS,HOCUS,HODAD,HODJA,HOERS,HOGAN,HOGEN,HOGGS,HOGHS,HOHED,HOICK,HOIED,HOIKS,HOING,HOISE,HOIST,HOKAS,HOKED,'),abap.operators.concat(new abap.types.Character(114).set('HOKES,HOKEY,HOKIS,HOKKU,HOKUM,HOLDS,HOLED,HOLES,HOLEY,HOLKS,HOLLA,HOLLO,HOLLY,HOLME,HOLMS,HOLON,HOLOS,HOLTS,HOMAS,'),abap.operators.concat(new abap.types.Character(114).set('HOMED,HOMER,HOMES,HOMEY,HOMIE,HOMME,HOMOS,HONAN,HONDA,HONDS,HONED,HONER,HONES,HONEY,HONGI,HONGS,HONKS,HONOR,HOOCH,'),abap.operators.concat(new abap.types.Character(114).set('HOODS,HOODY,HOOEY,HOOFS,HOOKA,HOOKS,HOOKY,HOOLY,HOONS,HOOPS,HOORD,HOORS,HOOSH,HOOTS,HOOTY,HOOVE,HOPAK,HOPED,HOPER,'),abap.operators.concat(new abap.types.Character(114).set('HOPES,HOPPY,HORAH,HORAL,HORAS,HORDE,HORKS,HORME,HORNS,HORNY,HORSE,HORST,HORSY,HOSED,HOSEL,HOSEN,HOSER,HOSES,HOSEY,'),abap.operators.concat(new abap.types.Character(114).set('HOSTA,HOSTS,HOTCH,HOTEL,HOTEN,HOTLY,HOTTY,HOUFF,HOUFS,HOUGH,HOUND,HOURI,HOURS,HOUSE,HOUTS,HOVEA,HOVED,HOVEL,HOVEN,'),abap.operators.concat(new abap.types.Character(114).set('HOVER,HOVES,HOWBE,HOWDY,HOWES,HOWFF,HOWFS,HOWKS,HOWLS,HOWRE,HOWSO,HOXED,HOXES,HOYAS,HOYED,HOYLE,HUBBY,HUCKS,HUDNA,'),abap.operators.concat(new abap.types.Character(114).set('HUDUD,HUERS,HUFFS,HUFFY,HUGER,HUGGY,HUHUS,HUIAS,HULAS,HULES,HULKS,HULKY,HULLO,HULLS,HULLY,HUMAN,HUMAS,HUMFS,HUMIC,'),abap.operators.concat(new abap.types.Character(114).set('HUMID,HUMOR,HUMPH,HUMPS,HUMPY,HUMUS,HUNCH,HUNKS,HUNKY,HUNTS,HURDS,HURLS,HURLY,HURRA,HURRY,HURST,HURTS,HUSHY,HUSKS,'),abap.operators.concat(new abap.types.Character(114).set('HUSKY,HUSOS,HUSSY,HUTCH,HUTIA,HUZZA,HUZZY,HWYLS,HYDRA,HYDRO,HYENA,HYENS,HYGGE,HYING,HYKES,HYLAS,HYLEG,HYLES,HYLIC,'),abap.operators.concat(new abap.types.Character(114).set('HYMEN,HYMNS,HYNDE,HYOID,HYPED,HYPER,HYPES,HYPHA,HYPHY,HYPOS,HYRAX,HYSON,HYTHE,IAMBI,IAMBS,IBRIK,ICERS,ICHED,ICHES,'),abap.operators.concat(new abap.types.Character(114).set('ICHOR,ICIER,ICILY,ICING,ICKER,ICKLE,ICONS,ICTAL,ICTIC,ICTUS,IDANT,IDEAL,IDEAS,IDEES,IDENT,IDIOM,IDIOT,IDLED,IDLER,'),abap.operators.concat(new abap.types.Character(114).set('IDLES,IDOLA,IDOLS,IDYLL,IDYLS,IFTAR,IGAPO,IGGED,IGLOO,IGLUS,IHRAM,IKANS,IKATS,IKONS,ILEAC,ILEAL,ILEUM,ILEUS,ILIAC,'),abap.operators.concat(new abap.types.Character(114).set('ILIAD,ILIAL,ILIUM,ILLER,ILLTH,IMAGE,IMAGO,IMAMS,IMARI,IMAUM,IMBAR,IMBED,IMBUE,IMIDE,IMIDO,IMIDS,IMINE,IMINO,IMMEW,'),abap.operators.concat(new abap.types.Character(114).set('IMMIT,IMMIX,IMPED,IMPEL,IMPIS,IMPLY,IMPOT,IMPRO,IMSHI,IMSHY,INANE,INAPT,INARM,INBOX,INBYE,INCEL,INCLE,INCOG,INCUR,'),abap.operators.concat(new abap.types.Character(114).set('INCUS,INCUT,INDEW,INDEX,INDIA,INDIE,INDOL,INDOW,INDRI,INDUE,INEPT,INERM,INERT,INFER,INFIX,INFOS,INFRA,INGAN,INGLE,'),abap.operators.concat(new abap.types.Character(114).set('INGOT,INION,INKED,INKER,INKLE,INLAY,INLET,INNED,INNER,INNIT,INORB,INPUT,INRUN,INSET,INSPO,INTEL,INTER,INTIL,INTIS,'),abap.operators.concat(new abap.types.Character(114).set('INTRA,INTRO,INULA,INURE,INURN,INUST,INVAR,INWIT,IODIC,IODID,IODIN,IONIC,IOTAS,IPPON,IRADE,IRATE,IRIDS,IRING,IRKED,'),abap.operators.concat(new abap.types.Character(114).set('IROKO,IRONE,IRONS,IRONY,ISBAS,ISHES,ISLED,ISLES,ISLET,ISNAE,ISSEI,ISSUE,ISTLE,ITCHY,ITEMS,ITHER,IVIED,IVIES,IVORY,'),abap.operators.concat(new abap.types.Character(114).set('IXIAS,IXNAY,IXORA,IXTLE,IZARD,IZARS,IZZAT,JAAPS,JABOT,JACAL,JACKS,JACKY,JADED,JADES,JAFAS,JAFFA,JAGAS,JAGER,JAGGS,'),abap.operators.concat(new abap.types.Character(114).set('JAGGY,JAGIR,JAGRA,JAILS,JAKER,JAKES,JAKEY,JALAP,JALOP,JAMBE,JAMBO,JAMBS,JAMBU,JAMES,JAMMY,JAMON,JANES,JANNS,JANNY,'),abap.operators.concat(new abap.types.Character(114).set('JANTY,JAPAN,JAPED,JAPER,JAPES,JARKS,JARLS,JARPS,JARTA,JARUL,JASEY,JASPE,JASPS,JATOS,JAUKS,JAUNT,JAUPS,JAVAS,JAVEL,'),abap.operators.concat(new abap.types.Character(114).set('JAWAN,JAWED,JAXIE,JAZZY,JEANS,JEATS,JEBEL,JEDIS,JEELS,JEELY,JEEPS,JEERS,JEEZE,JEFES,JEFFS,JEHAD,JEHUS,JELAB,JELLO,'),abap.operators.concat(new abap.types.Character(114).set('JELLS,JELLY,JEMBE,JEMMY,JENNY,JEONS,JERID,JERKS,JERKY,JERRY,JESSE,JESTS,JESUS,JETES,JETON,JETTY,JEUNE,JEWEL,JEWIE,'),abap.operators.concat(new abap.types.Character(114).set('JHALA,JIAOS,JIBBA,JIBBS,JIBED,JIBER,JIBES,JIFFS,JIFFY,JIGGY,JIGOT,JIHAD,JILLS,JILTS,JIMMY,JIMPY,JINGO,JINKS,JINNE,'),abap.operators.concat(new abap.types.Character(114).set('JINNI,JINNS,JIRDS,JIRGA,JIRRE,JISMS,JIVED,JIVER,JIVES,JIVEY,JNANA,JOBED,JOBES,JOCKO,JOCKS,JOCKY,JOCOS,JODEL,JOEYS,'),abap.operators.concat(new abap.types.Character(114).set('JOHNS,JOINS,JOINT,JOIST,JOKED,JOKER,JOKES,JOKEY,JOKOL,JOLED,JOLES,JOLLS,JOLLY,JOLTS,JOLTY,JOMON,JOMOS,JONES,JONGS,'),abap.operators.concat(new abap.types.Character(114).set('JONTY,JOOKS,JORAM,JORUM,JOTAS,JOTTY,JOTUN,JOUAL,JOUGS,JOUKS,JOULE,JOURS,JOUST,JOWAR,JOWED,JOWLS,JOWLY,JOYED,JUBAS,'),abap.operators.concat(new abap.types.Character(114).set('JUBES,JUCOS,JUDAS,JUDGE,JUDGY,JUDOS,JUGAL,JUGUM,JUICE,JUICY,JUJUS,JUKED,JUKES,JUKUS,JULEP,JUMAR,JUMBO,JUMBY,JUMPS,'),abap.operators.concat(new abap.types.Character(114).set('JUMPY,JUNCO,JUNKS,JUNKY,JUNTA,JUNTO,JUPES,JUPON,JURAL,JURAT,JUREL,JURES,JUROR,JUSTS,JUTES,JUTTY,JUVES,JUVIE,KAAMA,'),abap.operators.concat(new abap.types.Character(114).set('KABAB,KABAR,KABOB,KACHA,KACKS,KADAI,KADES,KADIS,KAGOS,KAGUS,KAHAL,KAIAK,KAIDS,KAIES,KAIFS,KAIKA,KAIKS,KAILS,KAIMS,'),abap.operators.concat(new abap.types.Character(114).set('KAING,KAINS,KAKAS,KAKIS,KALAM,KALES,KALIF,KALIS,KALPA,KAMAS,KAMES,KAMIK,KAMIS,KAMME,KANAE,KANAS,KANDY,KANEH,KANES,'),abap.operators.concat(new abap.types.Character(114).set('KANGA,KANGS,KANJI,KANTS,KANZU,KAONS,KAPAS,KAPHS,KAPOK,KAPOW,KAPPA,KAPUS,KAPUT,KARAS,KARAT,KARKS,KARMA,KARNS,KAROO,'),abap.operators.concat(new abap.types.Character(114).set('KAROS,KARRI,KARST,KARSY,KARTS,KARZY,KASHA,KASME,KATAL,KATAS,KATIS,KATTI,KAUGH,KAURI,KAURU,KAURY,KAVAL,KAVAS,KAWAS,'),abap.operators.concat(new abap.types.Character(114).set('KAWAU,KAWED,KAYAK,KAYLE,KAYOS,KAZIS,KAZOO,KBARS,KEBAB,KEBAR,KEBOB,KECKS,KEDGE,KEDGY,KEECH,KEEFS,KEEKS,KEELS,KEEMA,'),abap.operators.concat(new abap.types.Character(114).set('KEENO,KEENS,KEEPS,KEETS,KEEVE,KEFIR,KEHUA,KEIRS,KELEP,KELIM,KELLS,KELLY,KELPS,KELPY,KELTS,KELTY,KEMBO,KEMBS,KEMPS,'),abap.operators.concat(new abap.types.Character(114).set('KEMPT,KEMPY,KENAF,KENCH,KENDO,KENOS,KENTE,KENTS,KEPIS,KERBS,KEREL,KERFS,KERKY,KERMA,KERNE,KERNS,KEROS,KERRY,KERVE,'),abap.operators.concat(new abap.types.Character(114).set('KESAR,KESTS,KETAS,KETCH,KETES,KETOL,KEVEL,KEVIL,KEXES,KEYED,KEYER,KHADI,KHAFS,KHAKI,KHANS,KHAPH,KHATS,KHAYA,KHAZI,'),abap.operators.concat(new abap.types.Character(114).set('KHEDA,KHETH,KHETS,KHOJA,KHORS,KHOUM,KHUDS,KIAAT,KIACK,KIANG,KIBBE,KIBBI,KIBEI,KIBES,KIBLA,KICKS,KICKY,KIDDO,KIDDY,'),abap.operators.concat(new abap.types.Character(114).set('KIDEL,KIDGE,KIEFS,KIERS,KIEVE,KIEVS,KIGHT,KIKOI,KILEY,KILIM,KILLS,KILNS,KILOS,KILPS,KILTS,KILTY,KIMBO,KINAS,KINDA,'),abap.operators.concat(new abap.types.Character(114).set('KINDS,KINDY,KINES,KINGS,KININ,KINKS,KINKY,KINOS,KIORE,KIOSK,KIPES,KIPPA,KIPPS,KIRBY,KIRKS,KIRNS,KIRRI,KISAN,KISSY,'),abap.operators.concat(new abap.types.Character(114).set('KISTS,KITED,KITER,KITES,KITHE,KITHS,KITTY,KITUL,KIVAS,KIWIS,KLANG,KLAPS,KLETT,KLICK,KLIEG,KLIKS,KLONG,KLOOF,KLUGE,'),abap.operators.concat(new abap.types.Character(114).set('KLUTZ,KNACK,KNAGS,KNAPS,KNARL,KNARS,KNAUR,KNAVE,KNAWE,KNEAD,KNEED,KNEEL,KNEES,KNELL,KNELT,KNIFE,KNISH,KNITS,KNIVE,'),abap.operators.concat(new abap.types.Character(114).set('KNOBS,KNOCK,KNOLL,KNOPS,KNOSP,KNOTS,KNOUT,KNOWE,KNOWN,KNOWS,KNUBS,KNURL,KNURR,KNURS,KNUTS,KOALA,KOANS,KOAPS,KOBAN,'),abap.operators.concat(new abap.types.Character(114).set('KOBOS,KOELS,KOFFS,KOFTA,KOGAL,KOHAS,KOHEN,KOHLS,KOINE,KOJIS,KOKAM,KOKAS,KOKER,KOKRA,KOKUM,KOLAS,KOLOS,KOMBU,KONBU,'),abap.operators.concat(new abap.types.Character(114).set('KONDO,KONKS,KOOKS,KOOKY,KOORI,KOPEK,KOPHS,KOPJE,KOPPA,KORAI,KORAS,KORAT,KORES,KORMA,KOROS,KORUN,KORUS,KOSES,KOTCH,'),abap.operators.concat(new abap.types.Character(114).set('KOTOS,KOTOW,KOURA,KRAAL,KRABS,KRAFT,KRAIS,KRAIT,KRANG,KRANS,KRANZ,KRAUT,KRAYS,KREEP,KRENG,KREWE,KRILL,KRONA,KRONE,'),abap.operators.concat(new abap.types.Character(114).set('KROON,KRUBI,KRUNK,KSARS,KUBIE,KUDOS,KUDUS,KUDZU,KUFIS,KUGEL,KUIAS,KUKRI,KUKUS,KULAK,KULAN,KULAS,KULFI,KUMIS,KUMYS,'),abap.operators.concat(new abap.types.Character(114).set('KURIS,KURRE,KURTA,KURUS,KUSSO,KUTAS,KUTCH,KUTIS,KUTUS,KUZUS,KVASS,KVELL,KWELA,KYACK,KYAKS,KYANG,KYARS,KYATS,KYBOS,'),abap.operators.concat(new abap.types.Character(114).set('KYDST,KYLES,KYLIE,KYLIN,KYLIX,KYLOE,KYNDE,KYNDS,KYPES,KYRIE,KYTES,KYTHE,LAARI,LABDA,LABEL,LABIA,LABIS,LABOR,LABRA,'),abap.operators.concat(new abap.types.Character(114).set('LACED,LACER,LACES,LACET,LACEY,LACKS,LADDY,LADED,LADEN,LADER,LADES,LADLE,LAERS,LAEVO,LAGAN,LAGER,LAHAL,LAHAR,LAICH,'),abap.operators.concat(new abap.types.Character(114).set('LAICS,LAIDS,LAIGH,LAIKA,LAIKS,LAIRD,LAIRS,LAIRY,LAITH,LAITY,LAKED,LAKER,LAKES,LAKHS,LAKIN,LAKSA,LALDY,LALLS,LAMAS,'),abap.operators.concat(new abap.types.Character(114).set('LAMBS,LAMBY,LAMED,LAMER,LAMES,LAMIA,LAMMY,LAMPS,LANAI,LANAS,LANCE,LANCH,LANDE,LANDS,LANES,LANKS,LANKY,LANTS,LAPEL,'),abap.operators.concat(new abap.types.Character(114).set('LAPIN,LAPIS,LAPJE,LAPSE,LARCH,LARDS,LARDY,LAREE,LARES,LARGE,LARGO,LARIS,LARKS,LARKY,LARNS,LARNT,LARUM,LARVA,LASED,'),abap.operators.concat(new abap.types.Character(114).set('LASER,LASES,LASSI,LASSO,LASSU,LASSY,LASTS,LATAH,LATCH,LATED,LATEN,LATER,LATEX,LATHE,LATHI,LATHS,LATHY,LATKE,LATTE,'),abap.operators.concat(new abap.types.Character(114).set('LATUS,LAUAN,LAUCH,LAUDS,LAUFS,LAUGH,LAUND,LAURA,LAVAL,LAVAS,LAVED,LAVER,LAVES,LAVRA,LAVVY,LAWED,LAWER,LAWIN,LAWKS,'),abap.operators.concat(new abap.types.Character(114).set('LAWNS,LAWNY,LAXED,LAXER,LAXES,LAXLY,LAYED,LAYER,LAYIN,LAYUP,LAZAR,LAZED,LAZES,LAZOS,LAZZI,LAZZO,LEACH,LEADS,LEADY,'),abap.operators.concat(new abap.types.Character(114).set('LEAFS,LEAFY,LEAKS,LEAKY,LEAMS,LEANS,LEANT,LEANY,LEAPS,LEAPT,LEARE,LEARN,LEARS,LEARY,LEASE,LEASH,LEAST,LEATS,LEAVE,'),abap.operators.concat(new abap.types.Character(114).set('LEAVY,LEAZE,LEBEN,LECCY,LEDES,LEDGE,LEDGY,LEDUM,LEEAR,LEECH,LEEKS,LEEPS,LEERS,LEERY,LEESE,LEETS,LEEZE,LEFTE,LEFTS,'),abap.operators.concat(new abap.types.Character(114).set('LEFTY,LEGAL,LEGER,LEGES,LEGGE,LEGGO,LEGGY,LEGIT,LEHRS,LEHUA,LEIRS,LEISH,LEMAN,LEMED,LEMEL,LEMES,LEMMA,LEMME,LEMON,'),abap.operators.concat(new abap.types.Character(114).set('LEMUR,LENDS,LENES,LENGS,LENIS,LENOS,LENSE,LENTI,LENTO,LEONE,LEPER,LEPID,LEPRA,LEPTA,LERED,LERES,LERPS,LESTS,LETCH,'),abap.operators.concat(new abap.types.Character(114).set('LETHE,LETUP,LEUCH,LEUCO,LEUDS,LEUGH,LEVAS,LEVEE,LEVEL,LEVER,LEVES,LEVIN,LEVIS,LEWIS,LEXES,LEXIS,LIANA,LIANE,LIANG,'),abap.operators.concat(new abap.types.Character(114).set('LIARD,LIARS,LIART,LIBEL,LIBER,LIBRA,LIBRI,LICHI,LICHT,LICIT,LICKS,LIDAR,LIDOS,LIEFS,LIEGE,LIENS,LIERS,LIEUS,LIEVE,'),abap.operators.concat(new abap.types.Character(114).set('LIFER,LIFES,LIFTS,LIGAN,LIGER,LIGGE,LIGHT,LIGNE,LIKED,LIKEN,LIKER,LIKES,LIKIN,LILAC,LILLS,LILOS,LILTS,LIMAN,LIMAS,'),abap.operators.concat(new abap.types.Character(114).set('LIMAX,LIMBA,LIMBI,LIMBO,LIMBS,LIMBY,LIMED,LIMEN,LIMES,LIMEY,LIMIT,LIMMA,LIMNS,LIMOS,LIMPA,LIMPS,LINAC,LINCH,LINDS,'),abap.operators.concat(new abap.types.Character(114).set('LINDY,LINED,LINEN,LINER,LINES,LINEY,LINGA,LINGO,LINGS,LINGY,LININ,LINKS,LINKY,LINNS,LINNY,LINOS,LINTS,LINTY,LINUM,'),abap.operators.concat(new abap.types.Character(114).set('LINUX,LIONS,LIPAS,LIPES,LIPID,LIPIN,LIPOS,LIPPY,LIRAS,LIRKS,LIROT,LISKS,LISLE,LISPS,LISTS,LITAI,LITAS,LITED,LITER,'),abap.operators.concat(new abap.types.Character(114).set('LITES,LITHE,LITHO,LITHS,LITRE,LIVED,LIVEN,LIVER,LIVES,LIVID,LIVOR,LIVRE,LLAMA,LLANO,LOACH,LOADS,LOAFS,LOAMS,LOAMY,'),abap.operators.concat(new abap.types.Character(114).set('LOANS,LOAST,LOATH,LOAVE,LOBAR,LOBBY,LOBED,LOBES,LOBOS,LOBUS,LOCAL,LOCHE,LOCHS,LOCIE,LOCIS,LOCKS,LOCOS,LOCUM,LOCUS,'),abap.operators.concat(new abap.types.Character(114).set('LODEN,LODES,LODGE,LOESS,LOFTS,LOFTY,LOGAN,LOGES,LOGGY,LOGIA,LOGIC,LOGIE,LOGIN,LOGOI,LOGON,LOGOS,LOHAN,LOIDS,LOINS,'),abap.operators.concat(new abap.types.Character(114).set('LOIPE,LOIRS,LOKES,LOLLS,LOLLY,LOLOG,LOMAS,LOMED,LOMES,LONER,LONGA,LONGE,LONGS,LOOBY,LOOED,LOOEY,LOOFA,LOOFS,LOOIE,'),abap.operators.concat(new abap.types.Character(114).set('LOOKS,LOOKY,LOOMS,LOONS,LOONY,LOOPS,LOOPY,LOORD,LOOSE,LOOTS,LOPED,LOPER,LOPES,LOPPY,LORAL,LORAN,LORDS,LORDY,LOREL,'),abap.operators.concat(new abap.types.Character(114).set('LORES,LORIC,LORIS,LORRY,LOSED,LOSEL,LOSEN,LOSER,LOSES,LOSSY,LOTAH,LOTAS,LOTES,LOTIC,LOTOS,LOTSA,LOTTA,LOTTE,LOTTO,'),abap.operators.concat(new abap.types.Character(114).set('LOTUS,LOUED,LOUGH,LOUIE,LOUIS,LOUMA,LOUND,LOUNS,LOUPE,LOUPS,LOURE,LOURS,LOURY,LOUSE,LOUSY,LOUTS,LOVAT,LOVED,LOVER,'),abap.operators.concat(new abap.types.Character(114).set('LOVES,LOVEY,LOVIE,LOWAN,LOWED,LOWER,LOWES,LOWLY,LOWND,LOWNE,LOWNS,LOWPS,LOWRY,LOWSE,LOWTS,LOXED,LOXES,LOYAL,LOZEN,'),abap.operators.concat(new abap.types.Character(114).set('LUACH,LUAUS,LUBED,LUBES,LUCES,LUCID,LUCKS,LUCKY,LUCRE,LUDES,LUDIC,LUDOS,LUFFA,LUFFS,LUGED,LUGER,LUGES,LULLS,LULUS,'),abap.operators.concat(new abap.types.Character(114).set('LUMAS,LUMBI,LUMEN,LUMME,LUMMY,LUMPS,LUMPY,LUNAR,LUNAS,LUNCH,LUNES,LUNET,LUNGE,LUNGI,LUNGS,LUNKS,LUNTS,LUPIN,LUPUS,'),abap.operators.concat(new abap.types.Character(114).set('LURCH,LURED,LURER,LURES,LUREX,LURGI,LURGY,LURID,LURKS,LURRY,LURVE,LUSER,LUSHY,LUSKS,LUSTS,LUSTY,LUSUS,LUTEA,LUTED,'),abap.operators.concat(new abap.types.Character(114).set('LUTER,LUTES,LUVVY,LUXED,LUXER,LUXES,LWEIS,LYAMS,LYARD,LYART,LYASE,LYCEA,LYCEE,LYCRA,LYING,LYMES,LYMPH,LYNCH,LYNES,'),abap.operators.concat(new abap.types.Character(114).set('LYRES,LYRIC,LYSED,LYSES,LYSIN,LYSIS,LYSOL,LYSSA,LYTED,LYTES,LYTHE,LYTIC,LYTTA,MAAED,MAARE,MAARS,MABES,MACAS,MACAW,'),abap.operators.concat(new abap.types.Character(114).set('MACED,MACER,MACES,MACHE,MACHI,MACHO,MACHS,MACKS,MACLE,MACON,MACRO,MADAM,MADGE,MADID,MADLY,MADRE,MAERL,MAFIA,MAFIC,'),abap.operators.concat(new abap.types.Character(114).set('MAGES,MAGGS,MAGIC,MAGMA,MAGOT,MAGUS,MAHOE,MAHUA,MAHWA,MAIDS,MAIKO,MAIKS,MAILE,MAILL,MAILS,MAIMS,MAINS,MAIRE,MAIRS,'),abap.operators.concat(new abap.types.Character(114).set('MAISE,MAIST,MAIZE,MAJOR,MAKAR,MAKER,MAKES,MAKIS,MAKOS,MALAM,MALAR,MALAS,MALAX,MALES,MALIC,MALIK,MALIS,MALLS,MALMS,'),abap.operators.concat(new abap.types.Character(114).set('MALMY,MALTS,MALTY,MALUS,MALVA,MALWA,MAMAS,MAMBA,MAMBO,MAMEE,MAMEY,MAMIE,MAMMA,MAMMY,MANAS,MANAT,MANDI,MANEB,MANED,'),abap.operators.concat(new abap.types.Character(114).set('MANEH,MANES,MANET,MANGA,MANGE,MANGO,MANGS,MANGY,MANIA,MANIC,MANIS,MANKY,MANLY,MANNA,MANOR,MANOS,MANSE,MANTA,MANTO,'),abap.operators.concat(new abap.types.Character(114).set('MANTY,MANUL,MANUS,MAPAU,MAPLE,MAQUI,MARAE,MARAH,MARAS,MARCH,MARCS,MARDY,MARES,MARGE,MARGS,MARIA,MARID,MARKA,MARKS,'),abap.operators.concat(new abap.types.Character(114).set('MARLE,MARLS,MARLY,MARMS,MARON,MAROR,MARRA,MARRI,MARRY,MARSE,MARSH,MARTS,MARVY,MASAS,MASED,MASER,MASES,MASHY,MASKS,'),abap.operators.concat(new abap.types.Character(114).set('MASON,MASSA,MASSE,MASSY,MASTS,MASTY,MASUS,MATAI,MATCH,MATED,MATER,MATES,MATEY,MATHS,MATIN,MATLO,MATTE,MATTS,MATZA,'),abap.operators.concat(new abap.types.Character(114).set('MATZO,MAUBY,MAUDS,MAULS,MAUND,MAURI,MAUSY,MAUTS,MAUVE,MAUZY,MAVEN,MAVIE,MAVIN,MAVIS,MAWED,MAWKS,MAWKY,MAWNS,MAWRS,'),abap.operators.concat(new abap.types.Character(114).set('MAXED,MAXES,MAXIM,MAXIS,MAYAN,MAYAS,MAYBE,MAYED,MAYOR,MAYOS,MAYST,MAZED,MAZER,MAZES,MAZEY,MAZUT,MBIRA,MEADS,MEALS,'),abap.operators.concat(new abap.types.Character(114).set('MEALY,MEANE,MEANS,MEANT,MEANY,MEARE,MEASE,MEATH,MEATS,MEATY,MEBOS,MECCA,MECHS,MECKS,MEDAL,MEDIA,MEDIC,MEDII,MEDLE,'),abap.operators.concat(new abap.types.Character(114).set('MEEDS,MEERS,MEETS,MEFFS,MEINS,MEINT,MEINY,MEITH,MEKKA,MELAS,MELBA,MELDS,MELEE,MELIC,MELIK,MELLS,MELON,MELTS,MELTY,'),abap.operators.concat(new abap.types.Character(114).set('MEMES,MEMOS,MENAD,MENDS,MENED,MENES,MENGE,MENGS,MENSA,MENSE,MENSH,MENTA,MENTO,MENUS,MEOUS,MEOWS,MERCH,MERCS,MERCY,'),abap.operators.concat(new abap.types.Character(114).set('MERDE,MERED,MEREL,MERER,MERES,MERGE,MERIL,MERIS,MERIT,MERKS,MERLE,MERLS,MERRY,MERSE,MESAL,MESAS,MESEL,MESES,MESHY,'),abap.operators.concat(new abap.types.Character(114).set('MESIC,MESNE,MESON,MESSY,MESTO,METAL,METED,METER,METES,METHO,METHS,METIC,METIF,METIS,METOL,METRE,METRO,MEUSE,MEVED,'),abap.operators.concat(new abap.types.Character(114).set('MEVES,MEWED,MEWLS,MEYNT,MEZES,MEZZE,MEZZO,MHORR,MIAOU,MIAOW,MIASM,MIAUL,MICAS,MICHE,MICHT,MICKY,MICOS,MICRA,MICRO,'),abap.operators.concat(new abap.types.Character(114).set('MIDDY,MIDGE,MIDGY,MIDIS,MIDST,MIENS,MIEVE,MIFFS,MIFFY,MIFTY,MIGGS,MIGHT,MIHAS,MIHIS,MIKED,MIKES,MIKRA,MIKVA,MILCH,'),abap.operators.concat(new abap.types.Character(114).set('MILDS,MILER,MILES,MILFS,MILIA,MILKO,MILKS,MILKY,MILLE,MILLS,MILOR,MILOS,MILPA,MILTS,MILTY,MILTZ,MIMED,MIMEO,MIMER,'),abap.operators.concat(new abap.types.Character(114).set('MIMES,MIMIC,MIMSY,MINAE,MINAR,MINAS,MINCE,MINCY,MINDS,MINED,MINER,MINES,MINGE,MINGS,MINGY,MINIM,MINIS,MINKE,MINKS,'),abap.operators.concat(new abap.types.Character(114).set('MINNY,MINOR,MINOS,MINTS,MINTY,MINUS,MIRED,MIRES,MIREX,MIRID,MIRIN,MIRKS,MIRKY,MIRLY,MIROS,MIRTH,MIRVS,MIRZA,MISCH,'),abap.operators.concat(new abap.types.Character(114).set('MISDO,MISER,MISES,MISGO,MISOS,MISSA,MISSY,MISTS,MISTY,MITCH,MITER,MITES,MITIS,MITRE,MITTS,MIXED,MIXEN,MIXER,MIXES,'),abap.operators.concat(new abap.types.Character(114).set('MIXTE,MIXUP,MIZEN,MIZZY,MNEME,MOANS,MOATS,MOBBY,MOBES,MOBEY,MOBIE,MOBLE,MOCHA,MOCHI,MOCHS,MOCHY,MOCKS,MODAL,MODEL,'),abap.operators.concat(new abap.types.Character(114).set('MODEM,MODER,MODES,MODGE,MODII,MODUS,MOERS,MOFOS,MOGGY,MOGUL,MOHEL,MOHOS,MOHRS,MOHUA,MOHUR,MOILE,MOILS,MOIRA,MOIRE,'),abap.operators.concat(new abap.types.Character(114).set('MOIST,MOITS,MOJOS,MOKES,MOKIS,MOKOS,MOLAL,MOLAR,MOLAS,MOLDS,MOLDY,MOLED,MOLES,MOLLA,MOLLS,MOLLY,MOLTO,MOLTS,MOLYS,'),abap.operators.concat(new abap.types.Character(114).set('MOMES,MOMMA,MOMMY,MOMUS,MONAD,MONAL,MONAS,MONDE,MONDO,MONER,MONEY,MONGO,MONGS,MONIC,MONIE,MONKS,MONOS,MONTE,MONTH,'),abap.operators.concat(new abap.types.Character(114).set('MONTY,MOOBS,MOOCH,MOODS,MOODY,MOOED,MOOKS,MOOLA,MOOLI,MOOLS,MOOLY,MOONG,MOONS,MOONY,MOOPS,MOORS,MOORY,MOOSE,MOOTS,'),abap.operators.concat(new abap.types.Character(114).set('MOOVE,MOPED,MOPER,MOPES,MOPEY,MOPPY,MOPSY,MOPUS,MORAE,MORAL,MORAS,MORAT,MORAY,MOREL,MORES,MORIA,MORNE,MORNS,MORON,'),abap.operators.concat(new abap.types.Character(114).set('MORPH,MORRA,MORRO,MORSE,MORTS,MOSED,MOSES,MOSEY,MOSKS,MOSSO,MOSSY,MOSTE,MOSTS,MOTED,MOTEL,MOTEN,MOTES,MOTET,MOTEY,'),abap.operators.concat(new abap.types.Character(114).set('MOTHS,MOTHY,MOTIF,MOTIS,MOTOR,MOTTE,MOTTO,MOTTS,MOTTY,MOTUS,MOTZA,MOUCH,MOUES,MOULD,MOULS,MOULT,MOUND,MOUNT,MOUPS,'),abap.operators.concat(new abap.types.Character(114).set('MOURN,MOUSE,MOUST,MOUSY,MOUTH,MOVED,MOVER,MOVES,MOVIE,MOWAS,MOWED,MOWER,MOWRA,MOXAS,MOXIE,MOYAS,MOYLE,MOYLS,MOZED,'),abap.operators.concat(new abap.types.Character(114).set('MOZES,MOZOS,MPRET,MUCHO,MUCIC,MUCID,MUCIN,MUCKS,MUCKY,MUCOR,MUCRO,MUCUS,MUDDY,MUDGE,MUDIR,MUDRA,MUFFS,MUFTI,MUGGA,'),abap.operators.concat(new abap.types.Character(114).set('MUGGS,MUGGY,MUHLY,MUIDS,MUILS,MUIRS,MUIST,MUJIK,MULCH,MULCT,MULED,MULES,MULEY,MULGA,MULIE,MULLA,MULLS,MULSE,MULSH,'),abap.operators.concat(new abap.types.Character(114).set('MUMMS,MUMMY,MUMPS,MUMSY,MUMUS,MUNCH,MUNGA,MUNGE,MUNGO,MUNGS,MUNIS,MUONS,MURAL,MURAS,MURED,MURES,MUREX,MURID,MURKS,'),abap.operators.concat(new abap.types.Character(114).set('MURKY,MURLS,MURLY,MURRA,MURRE,MURRI,MURRS,MURRY,MURTI,MURVA,MUSAR,MUSCA,MUSED,MUSER,MUSES,MUSET,MUSHA,MUSHY,MUSIC,'),abap.operators.concat(new abap.types.Character(114).set('MUSIT,MUSKS,MUSKY,MUSOS,MUSSE,MUSSY,MUSTH,MUSTS,MUSTY,MUTCH,MUTED,MUTER,MUTES,MUTHA,MUTIS,MUTON,MUTTS,MUXED,MUXES,'),abap.operators.concat(new abap.types.Character(114).set('MUZAK,MUZZY,MVULE,MYALL,MYLAR,MYNAH,MYNAS,MYOID,MYOMA,MYOPE,MYOPS,MYOPY,MYRRH,MYSID,MYTHI,MYTHS,MYTHY,MYXOS,MZEES,'),abap.operators.concat(new abap.types.Character(114).set('NAAMS,NAANS,NABES,NABIS,NABKS,NABLA,NABOB,NACHE,NACHO,NACRE,NADAS,NADIR,NAEVE,NAEVI,NAFFS,NAGAS,NAGGY,NAGOR,NAHAL,'),abap.operators.concat(new abap.types.Character(114).set('NAIAD,NAIFS,NAIKS,NAILS,NAIRA,NAIRU,NAIVE,NAKED,NAKER,NAKFA,NALAS,NALED,NALLA,NAMED,NAMER,NAMES,NAMMA,NAMUS,NANAS,'),abap.operators.concat(new abap.types.Character(114).set('NANDU,NANNA,NANNY,NANOS,NANUA,NAPAS,NAPED,NAPES,NAPOO,NAPPA,NAPPE,NAPPY,NARAS,NARCO,NARCS,NARDS,NARES,NARIC,NARIS,'),abap.operators.concat(new abap.types.Character(114).set('NARKS,NARKY,NARRE,NASAL,NASHI,NASTY,NATAL,NATCH,NATES,NATIS,NATTY,NAUCH,NAUNT,NAVAL,NAVAR,NAVEL,NAVES,NAVEW,NAVVY,'),abap.operators.concat(new abap.types.Character(114).set('NAWAB,NAZES,NAZIR,NAZIS,NDUJA,NEAFE,NEALS,NEAPS,NEARS,NEATH,NEATS,NEBEK,NEBEL,NECKS,NEDDY,NEEDS,NEEDY,NEELD,NEELE,'),abap.operators.concat(new abap.types.Character(114).set('NEEMB,NEEMS,NEEPS,NEESE,NEEZE,NEGUS,NEIFS,NEIGH,NEIST,NEIVE,NELIS,NELLY,NEMAS,NEMNS,NEMPT,NENES,NEONS,NEPER,NEPIT,'),abap.operators.concat(new abap.types.Character(114).set('NERAL,NERDS,NERDY,NERKA,NERKS,NEROL,NERTS,NERTZ,NERVE,NERVY,NESTS,NETES,NETOP,NETTS,NETTY,NEUKS,NEUME,NEUMS,NEVEL,'),abap.operators.concat(new abap.types.Character(114).set('NEVER,NEVES,NEVUS,NEWBS,NEWED,NEWEL,NEWER,NEWIE,NEWLY,NEWSY,NEWTS,NEXTS,NEXUS,NGAIO,NGANA,NGATI,NGOMA,NGWEE,NICAD,'),abap.operators.concat(new abap.types.Character(114).set('NICER,NICHE,NICHT,NICKS,NICOL,NIDAL,NIDED,NIDES,NIDOR,NIDUS,NIECE,NIEFS,NIEVE,NIFES,NIFFS,NIFFY,NIFTY,NIGHS,NIGHT,'),abap.operators.concat(new abap.types.Character(114).set('NIHIL,NIKAB,NIKAH,NIKAU,NILLS,NIMBI,NIMBS,NIMPS,NINER,NINES,NINJA,NINNY,NINON,NINTH,NIPAS,NIPPY,NIQAB,NIRLS,NIRLY,'),abap.operators.concat(new abap.types.Character(114).set('NISEI,NISSE,NISUS,NITER,NITES,NITID,NITON,NITRE,NITRO,NITRY,NITTY,NIVAL,NIXED,NIXER,NIXES,NIXIE,NIZAM,NKOSI,NOAHS,'),abap.operators.concat(new abap.types.Character(114).set('NOBBY,NOBLE,NOBLY,NOCKS,NODAL,NODDY,NODES,NODUS,NOELS,NOGGS,NOHOW,NOILS,NOILY,NOINT,NOIRS,NOISE,NOISY,NOLES,NOLLS,'),abap.operators.concat(new abap.types.Character(114).set('NOLOS,NOMAD,NOMAS,NOMEN,NOMES,NOMIC,NOMOI,NOMOS,NONAS,NONCE,NONES,NONET,NONGS,NONIS,NONNY,NONYL,NOOBS,NOOIT,NOOKS,'),abap.operators.concat(new abap.types.Character(114).set('NOOKY,NOONS,NOOPS,NOOSE,NOPAL,NORIA,NORIS,NORKS,NORMA,NORMS,NORTH,NOSED,NOSER,NOSES,NOSEY,NOTAL,NOTCH,NOTED,NOTER,'),abap.operators.concat(new abap.types.Character(114).set('NOTES,NOTUM,NOULD,NOULE,NOULS,NOUNS,NOUNY,NOUPS,NOVAE,NOVAS,NOVEL,NOVUM,NOWAY,NOWED,NOWLS,NOWTS,NOWTY,NOXAL,NOXES,'),abap.operators.concat(new abap.types.Character(114).set('NOYAU,NOYED,NOYES,NUBBY,NUBIA,NUCHA,NUDDY,NUDER,NUDES,NUDGE,NUDIE,NUDZH,NUFFS,NUGAE,NUKED,NUKES,NULLA,NULLS,NUMBS,'),abap.operators.concat(new abap.types.Character(114).set('NUMEN,NUMMY,NUNNY,NURDS,NURDY,NURLS,NURRS,NURSE,NUTSO,NUTSY,NUTTY,NYAFF,NYALA,NYING,NYLON,NYMPH,NYSSA,OAKED,OAKEN,'),abap.operators.concat(new abap.types.Character(114).set('OAKER,OAKUM,OARED,OASES,OASIS,OASTS,OATEN,OATER,OATHS,OAVES,OBANG,OBEAH,OBELI,OBESE,OBEYS,OBIAS,OBIED,OBIIT,OBITS,'),abap.operators.concat(new abap.types.Character(114).set('OBJET,OBOES,OBOLE,OBOLI,OBOLS,OCCAM,OCCUR,OCEAN,OCHER,OCHES,OCHRE,OCHRY,OCKER,OCREA,OCTAD,OCTAL,OCTAN,OCTAS,OCTET,'),abap.operators.concat(new abap.types.Character(114).set('OCTYL,OCULI,ODAHS,ODALS,ODDER,ODDLY,ODEON,ODEUM,ODISM,ODIST,ODIUM,ODORS,ODOUR,ODYLE,ODYLS,OFFAL,OFFED,OFFER,OFFIE,'),abap.operators.concat(new abap.types.Character(114).set('OFLAG,OFTEN,OFTER,OGAMS,OGEED,OGEES,OGGIN,OGHAM,OGIVE,OGLED,OGLER,OGLES,OGMIC,OGRES,OHIAS,OHING,OHMIC,OHONE,OIDIA,'),abap.operators.concat(new abap.types.Character(114).set('OILED,OILER,OINKS,OINTS,OJIME,OKAPI,OKAYS,OKEHS,OKRAS,OKTAS,OLDEN,OLDER,OLDIE,OLEIC,OLEIN,OLENT,OLEOS,OLEUM,OLIOS,'),abap.operators.concat(new abap.types.Character(114).set('OLIVE,OLLAS,OLLAV,OLLER,OLLIE,OLOGY,OLPAE,OLPES,OMASA,OMBER,OMBRE,OMBUS,OMEGA,OMENS,OMERS,OMITS,OMLAH,OMOVS,OMRAH,'),abap.operators.concat(new abap.types.Character(114).set('ONCER,ONCES,ONCET,ONCUS,ONELY,ONERS,ONERY,ONION,ONIUM,ONKUS,ONLAY,ONNED,ONSET,ONTIC,OOBIT,OOHED,OOMPH,OONTS,OOPED,'),abap.operators.concat(new abap.types.Character(114).set('OORIE,OOSES,OOTID,OOZED,OOZES,OPAHS,OPALS,OPENS,OPEPE,OPERA,OPINE,OPING,OPIUM,OPPOS,OPSIN,OPTED,OPTER,OPTIC,ORACH,'),abap.operators.concat(new abap.types.Character(114).set('ORACY,ORALS,ORANG,ORANT,ORATE,ORBED,ORBIT,ORCAS,ORCIN,ORDER,ORDOS,OREAD,ORFES,ORGAN,ORGIA,ORGIC,ORGUE,ORIBI,ORIEL,'),abap.operators.concat(new abap.types.Character(114).set('ORIXA,ORLES,ORLON,ORLOP,ORMER,ORNIS,ORPIN,ORRIS,ORTHO,ORVAL,ORZOS,OSCAR,OSHAC,OSIER,OSMIC,OSMOL,OSSIA,OSTIA,OTAKU,'),abap.operators.concat(new abap.types.Character(114).set('OTARY,OTHER,OTTAR,OTTER,OTTOS,OUBIT,OUCHT,OUENS,OUGHT,OUIJA,OULKS,OUMAS,OUNCE,OUNDY,OUPAS,OUPED,OUPHE,OUPHS,OURIE,'),abap.operators.concat(new abap.types.Character(114).set('OUSEL,OUSTS,OUTBY,OUTDO,OUTED,OUTER,OUTGO,OUTRE,OUTRO,OUTTA,OUZEL,OUZOS,OVALS,OVARY,OVATE,OVELS,OVENS,OVERS,OVERT,'),abap.operators.concat(new abap.types.Character(114).set('OVINE,OVIST,OVOID,OVOLI,OVOLO,OVULE,OWCHE,OWIES,OWING,OWLED,OWLER,OWLET,OWNED,OWNER,OWRES,OWRIE,OWSEN,OXBOW,OXERS,'),abap.operators.concat(new abap.types.Character(114).set('OXEYE,OXIDE,OXIDS,OXIES,OXIME,OXIMS,OXLIP,OXTER,OYERS,OZEKI,OZONE,OZZIE,PAALS,PAANS,PACAS,PACED,PACER,PACES,PACEY,'),abap.operators.concat(new abap.types.Character(114).set('PACHA,PACKS,PACOS,PACTA,PACTS,PADDY,PADIS,PADLE,PADMA,PADRE,PADRI,PAEAN,PAEDO,PAEON,PAGAN,PAGED,PAGER,PAGES,PAGLE,'),abap.operators.concat(new abap.types.Character(114).set('PAGOD,PAGRI,PAIKS,PAILS,PAINS,PAINT,PAIRE,PAIRS,PAISA,PAISE,PAKKA,PALAS,PALAY,PALEA,PALED,PALER,PALES,PALET,PALIS,'),abap.operators.concat(new abap.types.Character(114).set('PALKI,PALLA,PALLS,PALLY,PALMS,PALMY,PALPI,PALPS,PALSA,PALSY,PAMPA,PANAX,PANCE,PANDA,PANDS,PANDY,PANED,PANEL,PANES,'),abap.operators.concat(new abap.types.Character(114).set('PANGA,PANGS,PANIC,PANIM,PANKO,PANNE,PANNI,PANSY,PANTO,PANTS,PANTY,PAOLI,PAOLO,PAPAL,PAPAS,PAPAW,PAPER,PAPES,PAPPI,'),abap.operators.concat(new abap.types.Character(114).set('PAPPY,PARAE,PARAS,PARCH,PARDI,PARDS,PARDY,PARED,PAREN,PAREO,PARER,PARES,PAREU,PAREV,PARGE,PARGO,PARIS,PARKA,PARKI,'),abap.operators.concat(new abap.types.Character(114).set('PARKS,PARKY,PARLE,PARLY,PARMA,PAROL,PARPS,PARRA,PARRS,PARRY,PARSE,PARTI,PARTS,PARTY,PARVE,PARVO,PASEO,PASES,PASHA,'),abap.operators.concat(new abap.types.Character(114).set('PASHM,PASKA,PASPY,PASSE,PASTA,PASTE,PASTS,PASTY,PATCH,PATED,PATEN,PATER,PATES,PATHS,PATIN,PATIO,PATKA,PATLY,PATSY,'),abap.operators.concat(new abap.types.Character(114).set('PATTE,PATTY,PATUS,PAUAS,PAULS,PAUSE,PAVAN,PAVED,PAVEN,PAVER,PAVES,PAVID,PAVIN,PAVIS,PAWAS,PAWAW,PAWED,PAWER,PAWKS,'),abap.operators.concat(new abap.types.Character(114).set('PAWKY,PAWLS,PAWNS,PAXES,PAYED,PAYEE,PAYER,PAYOR,PAYSD,PEACE,PEACH,PEAGE,PEAGS,PEAKS,PEAKY,PEALS,PEANS,PEARE,PEARL,'),abap.operators.concat(new abap.types.Character(114).set('PEARS,PEART,PEASE,PEATS,PEATY,PEAVY,PEAZE,PEBAS,PECAN,PECHS,PECKE,PECKS,PECKY,PEDAL,PEDES,PEDIS,PEDRO,PEECE,PEEKS,'),abap.operators.concat(new abap.types.Character(114).set('PEELS,PEENS,PEEOY,PEEPE,PEEPS,PEERS,PEERY,PEEVE,PEGGY,PEGHS,PEINS,PEISE,PEIZE,PEKAN,PEKES,PEKIN,PEKOE,PELAS,PELAU,'),abap.operators.concat(new abap.types.Character(114).set('PELES,PELFS,PELLS,PELMA,PELON,PELTA,PELTS,PENAL,PENCE,PENDS,PENDU,PENED,PENES,PENGO,PENIE,PENIS,PENKS,PENNA,PENNE,'),abap.operators.concat(new abap.types.Character(114).set('PENNI,PENNY,PENTS,PEONS,PEONY,PEPLA,PEPOS,PEPPY,PEPSI,PERAI,PERCE,PERCH,PERCS,PERDU,PERDY,PEREA,PERES,PERIL,PERIS,'),abap.operators.concat(new abap.types.Character(114).set('PERKS,PERKY,PERMS,PERNS,PEROG,PERPS,PERRY,PERSE,PERST,PERTS,PERVE,PERVO,PERVS,PERVY,PESKY,PESOS,PESTO,PESTS,PESTY,'),abap.operators.concat(new abap.types.Character(114).set('PETAL,PETAR,PETER,PETIT,PETRE,PETRI,PETTI,PETTO,PETTY,PEWEE,PEWIT,PEYSE,PHAGE,PHANG,PHARE,PHARM,PHASE,PHEER,PHENE,'),abap.operators.concat(new abap.types.Character(114).set('PHEON,PHESE,PHIAL,PHISH,PHIZZ,PHLOX,PHOCA,PHONE,PHONO,PHONS,PHONY,PHOTO,PHOTS,PHPHT,PHUTS,PHYLA,PHYLE,PIANI,PIANO,'),abap.operators.concat(new abap.types.Character(114).set('PIANS,PIBAL,PICAL,PICAS,PICCY,PICKS,PICKY,PICOT,PICRA,PICUL,PIECE,PIEND,PIERS,PIERT,PIETA,PIETS,PIETY,PIEZO,PIGGY,'),abap.operators.concat(new abap.types.Character(114).set('PIGHT,PIGMY,PIING,PIKAS,PIKAU,PIKED,PIKER,PIKES,PIKIS,PIKUL,PILAE,PILAF,PILAO,PILAR,PILAU,PILAW,PILCH,PILEA,PILED,'),abap.operators.concat(new abap.types.Character(114).set('PILEI,PILER,PILES,PILIS,PILLS,PILOT,PILOW,PILUM,PILUS,PIMAS,PIMPS,PINAS,PINCH,PINED,PINES,PINEY,PINGO,PINGS,PINKO,'),abap.operators.concat(new abap.types.Character(114).set('PINKS,PINKY,PINNA,PINNY,PINON,PINOT,PINTA,PINTO,PINTS,PINUP,PIONS,PIONY,PIOUS,PIOYE,PIOYS,PIPAL,PIPAS,PIPED,PIPER,'),abap.operators.concat(new abap.types.Character(114).set('PIPES,PIPET,PIPIS,PIPIT,PIPPY,PIPUL,PIQUE,PIRAI,PIRLS,PIRNS,PIROG,PISCO,PISES,PISKY,PISOS,PISSY,PISTE,PITAS,PITCH,'),abap.operators.concat(new abap.types.Character(114).set('PITHS,PITHY,PITON,PITOT,PITTA,PIUMS,PIVOT,PIXEL,PIXES,PIXIE,PIZED,PIZES,PIZZA,PLAAS,PLACE,PLACK,PLAGE,PLAID,PLAIN,'),abap.operators.concat(new abap.types.Character(114).set('PLAIT,PLANE,PLANK,PLANS,PLANT,PLAPS,PLASH,PLASM,PLAST,PLATE,PLATS,PLATT,PLATY,PLAYA,PLAYS,PLAZA,PLEAD,PLEAS,PLEAT,'),abap.operators.concat(new abap.types.Character(114).set('PLEBE,PLEBS,PLENA,PLEON,PLESH,PLEWS,PLICA,PLIED,PLIER,PLIES,PLIMS,PLING,PLINK,PLOAT,PLODS,PLONG,PLONK,PLOOK,PLOPS,'),abap.operators.concat(new abap.types.Character(114).set('PLOTS,PLOTZ,PLOUK,PLOWS,PLOYE,PLOYS,PLUCK,PLUES,PLUFF,PLUGS,PLUMB,PLUME,PLUMP,PLUMS,PLUMY,PLUNK,PLUOT,PLUSH,PLUTO,'),abap.operators.concat(new abap.types.Character(114).set('PLYER,POACH,POAKA,POAKE,POBOY,POCKS,POCKY,PODAL,PODDY,PODEX,PODGE,PODGY,PODIA,POEMS,POEPS,POESY,POETS,POGEY,POGGE,'),abap.operators.concat(new abap.types.Character(114).set('POGOS,POHED,POILU,POIND,POINT,POISE,POKAL,POKED,POKER,POKES,POKEY,POKIE,POLAR,POLED,POLER,POLES,POLEY,POLIO,POLIS,'),abap.operators.concat(new abap.types.Character(114).set('POLJE,POLKA,POLKS,POLLS,POLLY,POLOS,POLTS,POLYP,POLYS,POMBE,POMES,POMMY,POMOS,POMPS,PONCE,PONCY,PONDS,PONES,PONEY,'),abap.operators.concat(new abap.types.Character(114).set('PONGA,PONGO,PONGS,PONGY,PONKS,PONTS,PONTY,PONZU,POOCH,POODS,POOED,POOHS,POOJA,POOKA,POOKS,POOLS,POONS,POOPS,POOPY,'),abap.operators.concat(new abap.types.Character(114).set('POORI,POORT,POOTS,POPES,POPPA,POPPY,POPSY,PORAE,PORAL,PORCH,PORED,PORER,PORES,PORGE,PORGY,PORIN,PORKS,PORKY,PORNO,'),abap.operators.concat(new abap.types.Character(114).set('PORNS,PORNY,PORTA,PORTS,PORTY,POSED,POSER,POSES,POSEY,POSHO,POSIT,POSSE,POSTS,POTAE,POTCH,POTED,POTES,POTIN,POTOO,'),abap.operators.concat(new abap.types.Character(114).set('POTSY,POTTO,POTTS,POTTY,POUCH,POUFF,POUFS,POUKE,POUKS,POULE,POULP,POULT,POUND,POUPE,POUPT,POURS,POUTS,POUTY,POWAN,'),abap.operators.concat(new abap.types.Character(114).set('POWER,POWIN,POWND,POWNS,POWNY,POWRE,POXED,POXES,POYNT,POYOU,POYSE,POZZY,PRAAM,PRADS,PRAHU,PRAMS,PRANA,PRANG,PRANK,'),abap.operators.concat(new abap.types.Character(114).set('PRAOS,PRASE,PRATE,PRATS,PRATT,PRATY,PRAUS,PRAWN,PRAYS,PREDY,PREED,PREEN,PREES,PREIF,PREMS,PREMY,PRENT,PREON,PREOP,'),abap.operators.concat(new abap.types.Character(114).set('PREPS,PRESA,PRESE,PRESS,PREST,PREVE,PREXY,PREYS,PRIAL,PRICE,PRICK,PRICY,PRIDE,PRIED,PRIEF,PRIER,PRIES,PRIGS,PRILL,'),abap.operators.concat(new abap.types.Character(114).set('PRIMA,PRIME,PRIMI,PRIMO,PRIMP,PRIMS,PRIMY,PRINK,PRINT,PRION,PRIOR,PRISE,PRISM,PRISS,PRIVY,PRIZE,PROAS,PROBE,PROBS,'),abap.operators.concat(new abap.types.Character(114).set('PRODS,PROEM,PROFS,PROGS,PROIN,PROKE,PROLE,PROLL,PROMO,PROMS,PRONE,PRONG,PRONK,PROOF,PROPS,PRORE,PROSE,PROSO,PROSS,'),abap.operators.concat(new abap.types.Character(114).set('PROST,PROSY,PROTO,PROUD,PROUL,PROVE,PROWL,PROWS,PROXY,PROYN,PRUDE,PRUNE,PRUNT,PRUTA,PRYER,PRYSE,PSALM,PSEUD,PSHAW,'),abap.operators.concat(new abap.types.Character(114).set('PSION,PSOAE,PSOAI,PSOAS,PSORA,PSYCH,PSYOP,PUBCO,PUBES,PUBIC,PUBIS,PUCAN,PUCER,PUCES,PUCKA,PUCKS,PUDDY,PUDGE,PUDGY,'),abap.operators.concat(new abap.types.Character(114).set('PUDIC,PUDOR,PUDSY,PUDUS,PUERS,PUFFA,PUFFS,PUFFY,PUGGY,PUGIL,PUHAS,PUJAH,PUJAS,PUKAS,PUKED,PUKER,PUKES,PUKEY,PUKKA,'),abap.operators.concat(new abap.types.Character(114).set('PUKUS,PULAO,PULAS,PULED,PULER,PULES,PULIK,PULIS,PULKA,PULKS,PULLI,PULLS,PULLY,PULMO,PULPS,PULPY,PULSE,PULUS,PUMAS,'),abap.operators.concat(new abap.types.Character(114).set('PUMIE,PUMPS,PUNAS,PUNCE,PUNCH,PUNGA,PUNGS,PUNJI,PUNKA,PUNKS,PUNKY,PUNNY,PUNTO,PUNTS,PUNTY,PUPAE,PUPAL,PUPAS,PUPIL,'),abap.operators.concat(new abap.types.Character(114).set('PUPPY,PUPUS,PURDA,PURED,PUREE,PURER,PURES,PURGE,PURIN,PURIS,PURLS,PURPY,PURRS,PURSE,PURSY,PURTY,PUSES,PUSHY,PUSLE,'),abap.operators.concat(new abap.types.Character(114).set('PUSSY,PUTID,PUTON,PUTTI,PUTTO,PUTTS,PUTTY,PUZEL,PWNED,PYATS,PYETS,PYGAL,PYGMY,PYINS,PYLON,PYNED,PYNES,PYOID,PYOTS,'),abap.operators.concat(new abap.types.Character(114).set('PYRAL,PYRAN,PYRES,PYREX,PYRIC,PYROS,PYXED,PYXES,PYXIE,PYXIS,PZAZZ,QADIS,QAIDS,QAJAQ,QANAT,QAPIK,QIBLA,QOPHS,QORMA,'),abap.operators.concat(new abap.types.Character(114).set('QUACK,QUADS,QUAFF,QUAGS,QUAIL,QUAIR,QUAIS,QUAKE,QUAKY,QUALE,QUALM,QUANT,QUARE,QUARK,QUART,QUASH,QUASI,QUASS,QUATE,'),abap.operators.concat(new abap.types.Character(114).set('QUATS,QUAYD,QUAYS,QUBIT,QUEAN,QUEEN,QUEER,QUELL,QUEME,QUENA,QUERN,QUERY,QUEST,QUEUE,QUEYN,QUEYS,QUICH,QUICK,QUIDS,'),abap.operators.concat(new abap.types.Character(114).set('QUIET,QUIFF,QUILL,QUILT,QUIMS,QUINA,QUINE,QUINO,QUINS,QUINT,QUIPO,QUIPS,QUIPU,QUIRE,QUIRK,QUIRT,QUIST,QUITE,QUITS,'),abap.operators.concat(new abap.types.Character(114).set('QUOAD,QUODS,QUOIF,QUOIN,QUOIT,QUOLL,QUONK,QUOPS,QUOTA,QUOTE,QUOTH,QURSH,QUYTE,RABAT,RABBI,RABIC,RABID,RABIS,RACED,'),abap.operators.concat(new abap.types.Character(114).set('RACER,RACES,RACHE,RACKS,RACON,RADAR,RADGE,RADII,RADIO,RADIX,RADON,RAFFS,RAFTS,RAGAS,RAGDE,RAGED,RAGEE,RAGER,RAGES,'),abap.operators.concat(new abap.types.Character(114).set('RAGGA,RAGGS,RAGGY,RAGIS,RAGUS,RAHED,RAHUI,RAIAS,RAIDS,RAIKS,RAILE,RAILS,RAINE,RAINS,RAINY,RAIRD,RAISE,RAITA,RAITS,'),abap.operators.concat(new abap.types.Character(114).set('RAJAH,RAJAS,RAJES,RAKED,RAKEE,RAKER,RAKES,RAKIA,RAKIS,RAKUS,RALES,RALLY,RALPH,RAMAL,RAMEE,RAMEN,RAMET,RAMIE,RAMIN,'),abap.operators.concat(new abap.types.Character(114).set('RAMIS,RAMMY,RAMPS,RAMUS,RANAS,RANCE,RANCH,RANDS,RANDY,RANEE,RANGA,RANGE,RANGI,RANGS,RANGY,RANID,RANIS,RANKE,RANKS,'),abap.operators.concat(new abap.types.Character(114).set('RANTS,RAPED,RAPER,RAPES,RAPHE,RAPID,RAPPE,RARED,RAREE,RARER,RARES,RARKS,RASED,RASER,RASES,RASPS,RASPY,RASSE,RASTA,'),abap.operators.concat(new abap.types.Character(114).set('RATAL,RATAN,RATAS,RATCH,RATED,RATEL,RATER,RATES,RATHA,RATHE,RATHS,RATIO,RATOO,RATOS,RATTY,RATUS,RAUNS,RAUPO,RAVED,'),abap.operators.concat(new abap.types.Character(114).set('RAVEL,RAVEN,RAVER,RAVES,RAVEY,RAVIN,RAWER,RAWIN,RAWLY,RAWNS,RAXED,RAXES,RAYAH,RAYAS,RAYED,RAYLE,RAYNE,RAYON,RAZED,'),abap.operators.concat(new abap.types.Character(114).set('RAZEE,RAZER,RAZES,RAZOO,RAZOR,REACH,REACT,READD,READS,READY,REAIS,REAKS,REALM,REALO,REALS,REAME,REAMS,REAMY,REANS,'),abap.operators.concat(new abap.types.Character(114).set('REAPS,REARM,REARS,REAST,REATA,REATE,REAVE,REBAR,REBBE,REBEC,REBEL,REBID,REBIT,REBOP,REBUS,REBUT,REBUY,RECAL,RECAP,'),abap.operators.concat(new abap.types.Character(114).set('RECCE,RECCO,RECCY,RECIT,RECKS,RECON,RECTA,RECTI,RECTO,RECUR,RECUT,REDAN,REDDS,REDDY,REDED,REDES,REDIA,REDID,REDIP,'),abap.operators.concat(new abap.types.Character(114).set('REDLY,REDON,REDOS,REDOX,REDRY,REDUB,REDUX,REDYE,REECH,REEDE,REEDS,REEDY,REEFS,REEFY,REEKS,REEKY,REELS,REENS,REEST,'),abap.operators.concat(new abap.types.Character(114).set('REEVE,REFED,REFEL,REFER,REFIS,REFIT,REFIX,REFLY,REFRY,REGAL,REGAR,REGES,REGGO,REGIE,REGMA,REGNA,REGOS,REGUR,REHAB,'),abap.operators.concat(new abap.types.Character(114).set('REHEM,REIFS,REIFY,REIGN,REIKI,REIKS,REINK,REINS,REIRD,REIST,REIVE,REJIG,REJON,REKED,REKES,REKEY,RELAX,RELAY,RELET,'),abap.operators.concat(new abap.types.Character(114).set('RELIC,RELIE,RELIT,RELLO,REMAN,REMAP,REMEN,REMET,REMEX,REMIT,REMIX,RENAL,RENAY,RENDS,RENEW,RENEY,RENGA,RENIG,RENIN,'),abap.operators.concat(new abap.types.Character(114).set('RENNE,RENOS,RENTE,RENTS,REOIL,REORG,REPAY,REPEG,REPEL,REPIN,REPLA,REPLY,REPOS,REPOT,REPPS,REPRO,RERAN,RERIG,RERUN,'),abap.operators.concat(new abap.types.Character(114).set('RESAT,RESAW,RESAY,RESEE,RESES,RESET,RESEW,RESID,RESIN,RESIT,RESOD,RESOW,RESTO,RESTS,RESTY,RESUS,RETAG,RETAX,RETCH,'),abap.operators.concat(new abap.types.Character(114).set('RETEM,RETIA,RETIE,RETOX,RETRO,RETRY,REUSE,REVEL,REVET,REVIE,REVUE,REWAN,REWAX,REWED,REWET,REWIN,REWON,REWTH,REXES,'),abap.operators.concat(new abap.types.Character(114).set('REZES,RHEAS,RHEME,RHEUM,RHIES,RHIME,RHINE,RHINO,RHODY,RHOMB,RHONE,RHUMB,RHYME,RHYNE,RHYTA,RIADS,RIALS,RIANT,RIATA,'),abap.operators.concat(new abap.types.Character(114).set('RIBAS,RIBBY,RIBES,RICED,RICER,RICES,RICEY,RICHT,RICIN,RICKS,RIDER,RIDES,RIDGE,RIDGY,RIDIC,RIELS,RIEMS,RIEVE,RIFER,'),abap.operators.concat(new abap.types.Character(114).set('RIFFS,RIFLE,RIFTE,RIFTS,RIFTY,RIGGS,RIGHT,RIGID,RIGOL,RIGOR,RILED,RILES,RILEY,RILLE,RILLS,RIMAE,RIMED,RIMER,RIMES,'),abap.operators.concat(new abap.types.Character(114).set('RIMUS,RINDS,RINDY,RINES,RINGS,RINKS,RINSE,RIOJA,RIOTS,RIPED,RIPEN,RIPER,RIPES,RIPPS,RISEN,RISER,RISES,RISHI,RISKS,'),abap.operators.concat(new abap.types.Character(114).set('RISKY,RISPS,RISUS,RITES,RITTS,RITZY,RIVAL,RIVAS,RIVED,RIVEL,RIVEN,RIVER,RIVES,RIVET,RIYAL,RIZAS,ROACH,ROADS,ROAMS,'),abap.operators.concat(new abap.types.Character(114).set('ROANS,ROARS,ROARY,ROAST,ROATE,ROBED,ROBES,ROBIN,ROBLE,ROBOT,ROCKS,ROCKY,RODED,RODEO,RODES,ROGER,ROGUE,ROGUY,ROHES,'),abap.operators.concat(new abap.types.Character(114).set('ROIDS,ROILS,ROILY,ROINS,ROIST,ROJAK,ROJIS,ROKED,ROKER,ROKES,ROLAG,ROLES,ROLFS,ROLLS,ROMAL,ROMAN,ROMEO,ROMPS,RONDE,'),abap.operators.concat(new abap.types.Character(114).set('RONDO,RONEO,RONES,RONIN,RONNE,RONTE,RONTS,ROODS,ROOFS,ROOFY,ROOKS,ROOKY,ROOMS,ROOMY,ROONS,ROOPS,ROOPY,ROOSA,ROOSE,'),abap.operators.concat(new abap.types.Character(114).set('ROOST,ROOTS,ROOTY,ROPED,ROPER,ROPES,ROPEY,ROQUE,RORAL,RORES,RORIC,RORID,RORIE,RORTS,RORTY,ROSED,ROSES,ROSET,ROSHI,'),abap.operators.concat(new abap.types.Character(114).set('ROSIN,ROSIT,ROSTI,ROSTS,ROTAL,ROTAN,ROTAS,ROTCH,ROTED,ROTES,ROTIS,ROTLS,ROTON,ROTOR,ROTOS,ROTTE,ROUEN,ROUES,ROUGE,'),abap.operators.concat(new abap.types.Character(114).set('ROUGH,ROULE,ROULS,ROUMS,ROUND,ROUPS,ROUPY,ROUSE,ROUST,ROUTE,ROUTH,ROUTS,ROVED,ROVEN,ROVER,ROVES,ROWAN,ROWDY,ROWED,'),abap.operators.concat(new abap.types.Character(114).set('ROWEL,ROWEN,ROWER,ROWIE,ROWME,ROWND,ROWTH,ROWTS,ROYAL,ROYNE,ROYST,ROZET,ROZIT,RUANA,RUBAI,RUBBY,RUBEL,RUBES,RUBIN,'),abap.operators.concat(new abap.types.Character(114).set('RUBLE,RUBLI,RUBUS,RUCHE,RUCKS,RUDAS,RUDDS,RUDDY,RUDER,RUDES,RUDIE,RUDIS,RUEDA,RUERS,RUFFE,RUFFS,RUGAE,RUGAL,RUGBY,'),abap.operators.concat(new abap.types.Character(114).set('RUGGY,RUING,RUINS,RUKHS,RULED,RULER,RULES,RUMAL,RUMBA,RUMBO,RUMEN,RUMES,RUMLY,RUMMY,RUMOR,RUMPO,RUMPS,RUMPY,RUNCH,'),abap.operators.concat(new abap.types.Character(114).set('RUNDS,RUNED,RUNES,RUNGS,RUNIC,RUNNY,RUNTS,RUNTY,RUPEE,RUPIA,RURAL,RURPS,RURUS,RUSAS,RUSES,RUSHY,RUSKS,RUSMA,RUSSE,'),abap.operators.concat(new abap.types.Character(114).set('RUSTS,RUSTY,RUTHS,RUTIN,RUTTY,RYALS,RYBAT,RYKED,RYKES,RYMME,RYNDS,RYOTS,RYPER,SAAGS,SABAL,SABED,SABER,SABES,SABHA,'),abap.operators.concat(new abap.types.Character(114).set('SABIN,SABIR,SABLE,SABOT,SABRA,SABRE,SACKS,SACRA,SADDO,SADES,SADHE,SADHU,SADIS,SADLY,SADOS,SADZA,SAFED,SAFER,SAFES,'),abap.operators.concat(new abap.types.Character(114).set('SAGAS,SAGER,SAGES,SAGGY,SAGOS,SAGUM,SAHEB,SAHIB,SAICE,SAICK,SAICS,SAIDS,SAIGA,SAILS,SAIMS,SAINE,SAINS,SAINT,SAIRS,'),abap.operators.concat(new abap.types.Character(114).set('SAIST,SAITH,SAJOU,SAKER,SAKES,SAKIA,SAKIS,SAKTI,SALAD,SALAL,SALAT,SALEP,SALES,SALET,SALIC,SALIX,SALLE,SALLY,SALMI,'),abap.operators.concat(new abap.types.Character(114).set('SALOL,SALON,SALOP,SALPA,SALPS,SALSA,SALSE,SALTO,SALTS,SALTY,SALUE,SALUT,SALVE,SALVO,SAMAN,SAMAS,SAMBA,SAMBO,SAMEK,'),abap.operators.concat(new abap.types.Character(114).set('SAMEL,SAMEN,SAMES,SAMEY,SAMFU,SAMMY,SAMPI,SAMPS,SANDS,SANDY,SANED,SANER,SANES,SANGA,SANGH,SANGO,SANGS,SANKO,SANSA,'),abap.operators.concat(new abap.types.Character(114).set('SANTO,SANTS,SAOLA,SAPAN,SAPID,SAPOR,SAPPY,SARAN,SARDS,SARED,SAREE,SARGE,SARGO,SARIN,SARIS,SARKS,SARKY,SAROD,SAROS,'),abap.operators.concat(new abap.types.Character(114).set('SARUS,SASER,SASIN,SASSE,SASSY,SATAI,SATAY,SATED,SATEM,SATES,SATIN,SATIS,SATYR,SAUBA,SAUCE,SAUCH,SAUCY,SAUGH,SAULS,'),abap.operators.concat(new abap.types.Character(114).set('SAULT,SAUNA,SAUNT,SAURY,SAUTE,SAUTS,SAVED,SAVER,SAVES,SAVEY,SAVIN,SAVOR,SAVOY,SAVVY,SAWAH,SAWED,SAWER,SAXES,SAYED,'),abap.operators.concat(new abap.types.Character(114).set('SAYER,SAYID,SAYNE,SAYON,SAYST,SAZES,SCABS,SCADS,SCAFF,SCAGS,SCAIL,SCALA,SCALD,SCALE,SCALL,SCALP,SCALY,SCAMP,SCAMS,'),abap.operators.concat(new abap.types.Character(114).set('SCAND,SCANS,SCANT,SCAPA,SCAPE,SCAPI,SCARE,SCARF,SCARP,SCARS,SCART,SCARY,SCATH,SCATS,SCATT,SCAUD,SCAUP,SCAUR,SCAWS,'),abap.operators.concat(new abap.types.Character(114).set('SCEAT,SCENA,SCEND,SCENE,SCENT,SCHAV,SCHMO,SCHUL,SCHWA,SCION,SCLIM,SCODY,SCOFF,SCOGS,SCOLD,SCONE,SCOOG,SCOOP,SCOOT,'),abap.operators.concat(new abap.types.Character(114).set('SCOPA,SCOPE,SCOPS,SCORE,SCORN,SCOTS,SCOUG,SCOUP,SCOUR,SCOUT,SCOWL,SCOWP,SCOWS,SCRAB,SCRAE,SCRAG,SCRAM,SCRAN,SCRAP,'),abap.operators.concat(new abap.types.Character(114).set('SCRAT,SCRAW,SCRAY,SCREE,SCREW,SCRIM,SCRIP,SCROB,SCROD,SCROG,SCROW,SCRUB,SCRUM,SCUBA,SCUDI,SCUDO,SCUDS,SCUFF,SCUFT,'),abap.operators.concat(new abap.types.Character(114).set('SCUGS,SCULK,SCULL,SCULP,SCULS,SCUMS,SCUPS,SCURF,SCURS,SCUSE,SCUTA,SCUTE,SCUTS,SCUZZ,SCYES,SDAYN,SDEIN,SEALS,SEAME,'),abap.operators.concat(new abap.types.Character(114).set('SEAMS,SEAMY,SEANS,SEARE,SEARS,SEASE,SEATS,SEAZE,SEBUM,SECCO,SECHS,SECTS,SEDAN,SEDER,SEDES,SEDGE,SEDGY,SEDUM,SEEDS,'),abap.operators.concat(new abap.types.Character(114).set('SEEDY,SEEKS,SEELD,SEELS,SEELY,SEEMS,SEEPS,SEEPY,SEERS,SEFER,SEGAR,SEGNI,SEGNO,SEGOL,SEGOS,SEGUE,SEHRI,SEIFS,SEILS,'),abap.operators.concat(new abap.types.Character(114).set('SEINE,SEIRS,SEISE,SEISM,SEITY,SEIZA,SEIZE,SEKOS,SEKTS,SELAH,SELES,SELFS,SELLA,SELLE,SELLS,SELVA,SEMEE,SEMEN,SEMES,'),abap.operators.concat(new abap.types.Character(114).set('SEMIE,SEMIS,SENAS,SENDS,SENES,SENGI,SENNA,SENOR,SENSA,SENSE,SENSI,SENTE,SENTI,SENTS,SENVY,SENZA,SEPAD,SEPAL,SEPIA,'),abap.operators.concat(new abap.types.Character(114).set('SEPIC,SEPOY,SEPTA,SEPTS,SERAC,SERAI,SERAL,SERED,SERER,SERES,SERFS,SERGE,SERIC,SERIF,SERIN,SERKS,SERON,SEROW,SERRA,'),abap.operators.concat(new abap.types.Character(114).set('SERRE,SERRS,SERRY,SERUM,SERVE,SERVO,SESEY,SESSA,SETAE,SETAL,SETON,SETTS,SETUP,SEVEN,SEVER,SEWAN,SEWAR,SEWED,SEWEL,'),abap.operators.concat(new abap.types.Character(114).set('SEWEN,SEWER,SEWIN,SEXED,SEXER,SEXES,SEXTO,SEXTS,SEYEN,SHACK,SHADE,SHADS,SHADY,SHAFT,SHAGS,SHAHS,SHAKE,SHAKO,SHAKT,'),abap.operators.concat(new abap.types.Character(114).set('SHAKY,SHALE,SHALL,SHALM,SHALT,SHALY,SHAMA,SHAME,SHAMS,SHAND,SHANK,SHANS,SHAPE,SHAPS,SHARD,SHARE,SHARK,SHARN,SHARP,'),abap.operators.concat(new abap.types.Character(114).set('SHASH,SHAUL,SHAVE,SHAWL,SHAWM,SHAWN,SHAWS,SHAYA,SHAYS,SHCHI,SHEAF,SHEAL,SHEAR,SHEAS,SHEDS,SHEEL,SHEEN,SHEEP,SHEER,'),abap.operators.concat(new abap.types.Character(114).set('SHEET,SHEIK,SHELF,SHELL,SHEND,SHENT,SHEOL,SHERD,SHERE,SHERO,SHETS,SHEVA,SHEWN,SHEWS,SHIAI,SHIED,SHIEL,SHIER,SHIES,'),abap.operators.concat(new abap.types.Character(114).set('SHIFT,SHILL,SHILY,SHIMS,SHINE,SHINS,SHINY,SHIPS,SHIRE,SHIRK,SHIRR,SHIRS,SHIRT,SHISH,SHISO,SHIST,SHITE,SHITS,SHIUR,'),abap.operators.concat(new abap.types.Character(114).set('SHIVA,SHIVE,SHIVS,SHLEP,SHLUB,SHMEK,SHMOE,SHOAL,SHOAT,SHOCK,SHOED,SHOER,SHOES,SHOGI,SHOGS,SHOJI,SHOJO,SHOLA,SHONE,'),abap.operators.concat(new abap.types.Character(114).set('SHOOK,SHOOL,SHOON,SHOOS,SHOOT,SHOPE,SHOPS,SHORE,SHORL,SHORN,SHORT,SHOTE,SHOTS,SHOTT,SHOUT,SHOVE,SHOWD,SHOWN,SHOWS,'),abap.operators.concat(new abap.types.Character(114).set('SHOWY,SHOYU,SHRED,SHREW,SHRIS,SHROW,SHRUB,SHRUG,SHTIK,SHTUM,SHTUP,SHUCK,SHULE,SHULN,SHULS,SHUNS,SHUNT,SHURA,SHUSH,'),abap.operators.concat(new abap.types.Character(114).set('SHUTE,SHUTS,SHWAS,SHYER,SHYLY,SIALS,SIBBS,SIBYL,SICES,SICHT,SICKO,SICKS,SICKY,SIDAS,SIDED,SIDER,SIDES,SIDHA,SIDHE,'),abap.operators.concat(new abap.types.Character(114).set('SIDLE,SIEGE,SIELD,SIENS,SIENT,SIETH,SIEUR,SIEVE,SIFTS,SIGHS,SIGHT,SIGIL,SIGLA,SIGMA,SIGNA,SIGNS,SIJOS,SIKAS,SIKER,'),abap.operators.concat(new abap.types.Character(114).set('SIKES,SILDS,SILED,SILEN,SILER,SILES,SILEX,SILKS,SILKY,SILLS,SILLY,SILOS,SILTS,SILTY,SILVA,SIMAR,SIMAS,SIMBA,SIMIS,'),abap.operators.concat(new abap.types.Character(114).set('SIMPS,SIMUL,SINCE,SINDS,SINED,SINES,SINEW,SINGE,SINGS,SINHS,SINKS,SINKY,SINUS,SIPED,SIPES,SIPPY,SIRED,SIREE,SIREN,'),abap.operators.concat(new abap.types.Character(114).set('SIRES,SIRIH,SIRIS,SIROC,SIRRA,SIRUP,SISAL,SISES,SISSY,SISTA,SISTS,SITAR,SITED,SITES,SITHE,SITKA,SITUP,SITUS,SIVER,'),abap.operators.concat(new abap.types.Character(114).set('SIXER,SIXES,SIXMO,SIXTE,SIXTH,SIXTY,SIZAR,SIZED,SIZEL,SIZER,SIZES,SKAGS,SKAIL,SKALD,SKANK,SKART,SKATE,SKATS,SKATT,'),abap.operators.concat(new abap.types.Character(114).set('SKAWS,SKEAN,SKEAR,SKEDS,SKEED,SKEEF,SKEEN,SKEER,SKEES,SKEET,SKEGG,SKEGS,SKEIN,SKELF,SKELL,SKELM,SKELP,SKENE,SKENS,'),abap.operators.concat(new abap.types.Character(114).set('SKEOS,SKEPS,SKERS,SKETS,SKEWS,SKIDS,SKIED,SKIER,SKIES,SKIEY,SKIFF,SKILL,SKIMP,SKIMS,SKINK,SKINS,SKINT,SKIOS,SKIPS,'),abap.operators.concat(new abap.types.Character(114).set('SKIRL,SKIRR,SKIRT,SKITE,SKITS,SKIVE,SKIVY,SKLIM,SKOAL,SKODY,SKOFF,SKOGS,SKOLS,SKOOL,SKORT,SKOSH,SKRAN,SKRIK,SKUAS,'),abap.operators.concat(new abap.types.Character(114).set('SKUGS,SKULK,SKULL,SKUNK,SKYED,SKYER,SKYEY,SKYFS,SKYRE,SKYRS,SKYTE,SLABS,SLACK,SLADE,SLAES,SLAGS,SLAID,SLAIN,SLAKE,'),abap.operators.concat(new abap.types.Character(114).set('SLAMS,SLANE,SLANG,SLANK,SLANT,SLAPS,SLART,SLASH,SLATE,SLATS,SLATY,SLAVE,SLAWS,SLAYS,SLEBS,SLEDS,SLEEK,SLEEP,SLEER,'),abap.operators.concat(new abap.types.Character(114).set('SLEET,SLEPT,SLEWS,SLEYS,SLICE,SLICK,SLIDE,SLIER,SLILY,SLIME,SLIMS,SLIMY,SLING,SLINK,SLIPE,SLIPS,SLIPT,SLISH,SLITS,'),abap.operators.concat(new abap.types.Character(114).set('SLIVE,SLOAN,SLOBS,SLOES,SLOGS,SLOID,SLOJD,SLOMO,SLOOM,SLOOP,SLOOT,SLOPE,SLOPS,SLOPY,SLORM,SLOSH,SLOTH,SLOTS,SLOVE,'),abap.operators.concat(new abap.types.Character(114).set('SLOWS,SLOYD,SLUBB,SLUBS,SLUED,SLUES,SLUFF,SLUGS,SLUIT,SLUMP,SLUMS,SLUNG,SLUNK,SLURB,SLURP,SLURS,SLUSE,SLUSH,SLUTS,'),abap.operators.concat(new abap.types.Character(114).set('SLYER,SLYLY,SLYPE,SMAAK,SMACK,SMAIK,SMALL,SMALM,SMALT,SMARM,SMART,SMASH,SMAZE,SMEAR,SMEEK,SMEES,SMEIK,SMEKE,SMELL,'),abap.operators.concat(new abap.types.Character(114).set('SMELT,SMERK,SMEWS,SMILE,SMIRK,SMIRR,SMIRS,SMITE,SMITH,SMITS,SMOCK,SMOGS,SMOKE,SMOKO,SMOKY,SMOLT,SMOOR,SMOOT,SMORE,'),abap.operators.concat(new abap.types.Character(114).set('SMORG,SMOTE,SMOUT,SMOWT,SMUGS,SMURS,SMUSH,SMUTS,SNABS,SNACK,SNAFU,SNAGS,SNAIL,SNAKE,SNAKY,SNAPS,SNARE,SNARF,SNARK,'),abap.operators.concat(new abap.types.Character(114).set('SNARL,SNARS,SNARY,SNASH,SNATH,SNAWS,SNEAD,SNEAK,SNEAP,SNEBS,SNECK,SNEDS,SNEED,SNEER,SNEES,SNELL,SNIBS,SNICK,SNIDE,'),abap.operators.concat(new abap.types.Character(114).set('SNIES,SNIFF,SNIFT,SNIGS,SNIPE,SNIPS,SNIPY,SNIRT,SNITS,SNOBS,SNODS,SNOEK,SNOEP,SNOGS,SNOKE,SNOOD,SNOOK,SNOOL,SNOOP,'),abap.operators.concat(new abap.types.Character(114).set('SNOOT,SNORE,SNORT,SNOTS,SNOUT,SNOWK,SNOWS,SNOWY,SNUBS,SNUCK,SNUFF,SNUGS,SNUSH,SNYES,SOAKS,SOAPS,SOAPY,SOARE,SOARS,'),abap.operators.concat(new abap.types.Character(114).set('SOAVE,SOBAS,SOBER,SOCAS,SOCES,SOCKO,SOCKS,SOCLE,SODAS,SODDY,SODIC,SODOM,SOFAR,SOFAS,SOFTA,SOFTS,SOFTY,SOGER,SOGGY,'),abap.operators.concat(new abap.types.Character(114).set('SOHUR,SOILS,SOILY,SOJAS,SOJUS,SOKAH,SOKEN,SOKES,SOKOL,SOLAH,SOLAN,SOLAR,SOLAS,SOLDE,SOLDI,SOLDO,SOLDS,SOLED,SOLEI,'),abap.operators.concat(new abap.types.Character(114).set('SOLER,SOLES,SOLID,SOLON,SOLOS,SOLUM,SOLUS,SOLVE,SOMAN,SOMAS,SONAR,SONCE,SONDE,SONES,SONGS,SONIC,SONLY,SONNE,SONNY,'),abap.operators.concat(new abap.types.Character(114).set('SONSE,SONSY,SOOEY,SOOKS,SOOKY,SOOLE,SOOLS,SOOMS,SOOPS,SOOTE,SOOTH,SOOTS,SOOTY,SOPHS,SOPHY,SOPOR,SOPPY,SOPRA,SORAL,'),abap.operators.concat(new abap.types.Character(114).set('SORAS,SORBO,SORBS,SORDA,SORDO,SORDS,SORED,SOREE,SOREL,SORER,SORES,SOREX,SORGO,SORNS,SORRA,SORRY,SORTA,SORTS,SORUS,'),abap.operators.concat(new abap.types.Character(114).set('SOTHS,SOTOL,SOUCE,SOUCT,SOUGH,SOUKS,SOULS,SOUMS,SOUND,SOUPS,SOUPY,SOURS,SOUSE,SOUTH,SOUTS,SOWAR,SOWCE,SOWED,SOWER,'),abap.operators.concat(new abap.types.Character(114).set('SOWFF,SOWFS,SOWLE,SOWLS,SOWMS,SOWND,SOWNE,SOWPS,SOWSE,SOWTH,SOYAS,SOYLE,SOYUZ,SOZIN,SPACE,SPACY,SPADE,SPADO,SPAED,'),abap.operators.concat(new abap.types.Character(114).set('SPAER,SPAES,SPAGS,SPAHI,SPAIL,SPAIN,SPAIT,SPAKE,SPALD,SPALE,SPALL,SPALT,SPAMS,SPANE,SPANG,SPANK,SPANS,SPARD,SPARE,'),abap.operators.concat(new abap.types.Character(114).set('SPARK,SPARS,SPART,SPASM,SPATE,SPATS,SPAUL,SPAWL,SPAWN,SPAWS,SPAYD,SPAYS,SPAZA,SPEAK,SPEAL,SPEAN,SPEAR,SPEAT,SPECK,'),abap.operators.concat(new abap.types.Character(114).set('SPECS,SPECT,SPEED,SPEEL,SPEER,SPEIL,SPEIR,SPEKS,SPELD,SPELK,SPELL,SPELT,SPEND,SPENT,SPEOS,SPERM,SPETS,SPEUG,SPEWS,'),abap.operators.concat(new abap.types.Character(114).set('SPEWY,SPIAL,SPICA,SPICE,SPICK,SPICY,SPIDE,SPIED,SPIEL,SPIER,SPIES,SPIFF,SPIFS,SPIKE,SPIKY,SPILE,SPILL,SPILT,SPIMS,'),abap.operators.concat(new abap.types.Character(114).set('SPINA,SPINE,SPINK,SPINS,SPINY,SPIRE,SPIRT,SPIRY,SPITE,SPITS,SPITZ,SPIVS,SPLAT,SPLAY,SPLIT,SPLOG,SPODE,SPODS,SPOIL,'),abap.operators.concat(new abap.types.Character(114).set('SPOKE,SPOOF,SPOOK,SPOOL,SPOOM,SPOON,SPOOR,SPOOT,SPORE,SPORK,SPORT,SPOSH,SPOTS,SPOUT,SPRAD,SPRAG,SPRAT,SPRAY,SPRED,'),abap.operators.concat(new abap.types.Character(114).set('SPREE,SPREW,SPRIG,SPRIT,SPROD,SPROG,SPRUE,SPRUG,SPUDS,SPUED,SPUER,SPUES,SPUGS,SPULE,SPUME,SPUMY,SPUNK,SPURN,SPURS,'),abap.operators.concat(new abap.types.Character(114).set('SPURT,SPUTA,SPYAL,SPYRE,SQUAB,SQUAD,SQUAT,SQUEG,SQUIB,SQUID,SQUIT,SQUIZ,STABS,STACK,STADE,STAFF,STAGE,STAGS,STAGY,'),abap.operators.concat(new abap.types.Character(114).set('STAID,STAIG,STAIN,STAIR,STAKE,STALE,STALK,STALL,STAMP,STAND,STANE,STANG,STANK,STAPH,STAPS,STARE,STARK,STARN,STARR,'),abap.operators.concat(new abap.types.Character(114).set('STARS,START,STASH,STATE,STATS,STAUN,STAVE,STAWS,STAYS,STEAD,STEAK,STEAL,STEAM,STEAN,STEAR,STEDD,STEDE,STEDS,STEED,'),abap.operators.concat(new abap.types.Character(114).set('STEEK,STEEL,STEEM,STEEN,STEEP,STEER,STEIL,STEIN,STELA,STELE,STELL,STEME,STEMS,STEND,STENO,STENS,STENT,STEPS,STEPT,'),abap.operators.concat(new abap.types.Character(114).set('STERE,STERN,STETS,STEWS,STEWY,STEYS,STICH,STICK,STIED,STIES,STIFF,STILB,STILE,STILL,STILT,STIME,STIMS,STIMY,STING,'),abap.operators.concat(new abap.types.Character(114).set('STINK,STINT,STIPA,STIPE,STIRE,STIRK,STIRP,STIRS,STIVE,STIVY,STOAE,STOAI,STOAS,STOAT,STOBS,STOCK,STOEP,STOGY,STOIC,'),abap.operators.concat(new abap.types.Character(114).set('STOIT,STOKE,STOLE,STOLN,STOMA,STOMP,STOND,STONE,STONG,STONK,STONN,STONY,STOOD,STOOK,STOOL,STOOP,STOOR,STOPE,STOPS,'),abap.operators.concat(new abap.types.Character(114).set('STOPT,STORE,STORK,STORM,STORY,STOSS,STOTS,STOTT,STOUN,STOUP,STOUR,STOUT,STOVE,STOWN,STOWP,STOWS,STRAD,STRAE,STRAG,'),abap.operators.concat(new abap.types.Character(114).set('STRAK,STRAP,STRAW,STRAY,STREP,STREW,STRIA,STRIG,STRIM,STRIP,STROP,STROW,STROY,STRUM,STRUT,STUBS,STUCK,STUDE,STUDS,'),abap.operators.concat(new abap.types.Character(114).set('STUDY,STUFF,STULL,STULM,STUMM,STUMP,STUMS,STUNG,STUNK,STUNS,STUNT,STUPA,STUPE,STURE,STURT,STYED,STYES,STYLE,STYLI,'),abap.operators.concat(new abap.types.Character(114).set('STYLO,STYME,STYMY,STYRE,STYTE,SUAVE,SUBAH,SUBAS,SUBBY,SUBER,SUBHA,SUCCI,SUCKS,SUCKY,SUCRE,SUDDS,SUDOR,SUDSY,SUEDE,'),abap.operators.concat(new abap.types.Character(114).set('SUENT,SUERS,SUETE,SUETS,SUETY,SUGAN,SUGAR,SUGHS,SUGOS,SUHUR,SUIDS,SUING,SUINT,SUITE,SUITS,SUJEE,SUKHS,SUKUK,SULCI,'),abap.operators.concat(new abap.types.Character(114).set('SULFA,SULFO,SULKS,SULKY,SULLY,SULPH,SULUS,SUMAC,SUMIS,SUMMA,SUMOS,SUMPH,SUMPS,SUNIS,SUNKS,SUNNA,SUNNS,SUNNY,SUNUP,'),abap.operators.concat(new abap.types.Character(114).set('SUPER,SUPES,SUPRA,SURAH,SURAL,SURAS,SURAT,SURDS,SURED,SURER,SURES,SURFS,SURFY,SURGE,SURGY,SURLY,SURRA,SUSED,SUSES,'),abap.operators.concat(new abap.types.Character(114).set('SUSHI,SUSUS,SUTOR,SUTRA,SUTTA,SWABS,SWACK,SWADS,SWAGE,SWAGS,SWAIL,SWAIN,SWALE,SWALY,SWAMI,SWAMP,SWAMY,SWANG,SWANK,'),abap.operators.concat(new abap.types.Character(114).set('SWANS,SWAPS,SWAPT,SWARD,SWARE,SWARF,SWARM,SWART,SWASH,SWATH,SWATS,SWAYL,SWAYS,SWEAL,SWEAR,SWEAT,SWEDE,SWEED,SWEEL,'),abap.operators.concat(new abap.types.Character(114).set('SWEEP,SWEER,SWEES,SWEET,SWEIR,SWELL,SWELT,SWEPT,SWERF,SWEYS,SWIES,SWIFT,SWIGS,SWILE,SWILL,SWIMS,SWINE,SWING,SWINK,'),abap.operators.concat(new abap.types.Character(114).set('SWIPE,SWIRE,SWIRL,SWISH,SWISS,SWITH,SWITS,SWIVE,SWIZZ,SWOBS,SWOLE,SWOLN,SWOON,SWOOP,SWOPS,SWOPT,SWORD,SWORE,SWORN,'),abap.operators.concat(new abap.types.Character(114).set('SWOTS,SWOUN,SWUNG,SYBBE,SYBIL,SYBOE,SYBOW,SYCEE,SYCES,SYCON,SYENS,SYKER,SYKES,SYLIS,SYLPH,SYLVA,SYMAR,SYNCH,SYNCS,'),abap.operators.concat(new abap.types.Character(114).set('SYNDS,SYNED,SYNES,SYNOD,SYNTH,SYPED,SYPES,SYPHS,SYRAH,SYREN,SYRUP,SYSOP,SYTHE,SYVER,TAALS,TAATA,TABBY,TABER,TABES,'),abap.operators.concat(new abap.types.Character(114).set('TABID,TABIS,TABLA,TABLE,TABOO,TABOR,TABUN,TABUS,TACAN,TACES,TACET,TACHE,TACHO,TACHS,TACIT,TACKS,TACKY,TACOS,TACTS,'),abap.operators.concat(new abap.types.Character(114).set('TAELS,TAFFY,TAFIA,TAGGY,TAGMA,TAHAS,TAHRS,TAIGA,TAIKO,TAILS,TAINS,TAINT,TAIRA,TAISH,TAITS,TAJES,TAKAS,TAKEN,TAKER,'),abap.operators.concat(new abap.types.Character(114).set('TAKES,TAKHI,TAKIN,TAKIS,TAKKY,TALAK,TALAQ,TALAR,TALAS,TALCS,TALCY,TALEA,TALER,TALES,TALKS,TALKY,TALLS,TALLY,TALMA,'),abap.operators.concat(new abap.types.Character(114).set('TALON,TALPA,TALUK,TALUS,TAMAL,TAMED,TAMER,TAMES,TAMIN,TAMIS,TAMMY,TAMPS,TANAS,TANGA,TANGI,TANGO,TANGS,TANGY,TANHS,'),abap.operators.concat(new abap.types.Character(114).set('TANKA,TANKS,TANKY,TANNA,TANSY,TANTI,TANTO,TANTY,TAPAS,TAPED,TAPEN,TAPER,TAPES,TAPET,TAPIR,TAPIS,TAPPA,TAPUS,TARAS,'),abap.operators.concat(new abap.types.Character(114).set('TARDO,TARDY,TARED,TARES,TARGA,TARGE,TARNS,TAROC,TAROK,TAROS,TAROT,TARPS,TARRE,TARRY,TARSI,TARTS,TARTY,TASAR,TASED,'),abap.operators.concat(new abap.types.Character(114).set('TASER,TASES,TASKS,TASSA,TASSE,TASSO,TASTE,TASTY,TATAR,TATER,TATES,TATHS,TATIE,TATOU,TATTS,TATTY,TATUS,TAUBE,TAULD,'),abap.operators.concat(new abap.types.Character(114).set('TAUNT,TAUON,TAUPE,TAUTS,TAVAH,TAVAS,TAVER,TAWAI,TAWAS,TAWED,TAWER,TAWIE,TAWNY,TAWSE,TAWTS,TAXED,TAXER,TAXES,TAXIS,'),abap.operators.concat(new abap.types.Character(114).set('TAXOL,TAXON,TAXOR,TAXUS,TAYRA,TAZZA,TAZZE,TEACH,TEADE,TEADS,TEAED,TEAKS,TEALS,TEAMS,TEARS,TEARY,TEASE,TEATS,TEAZE,'),abap.operators.concat(new abap.types.Character(114).set('TECHS,TECHY,TECTA,TEDDY,TEELS,TEEMS,TEEND,TEENE,TEENS,TEENY,TEERS,TEETH,TEFFS,TEGGS,TEGUA,TEGUS,TEHRS,TEIID,TEILS,'),abap.operators.concat(new abap.types.Character(114).set('TEIND,TEINS,TELAE,TELCO,TELES,TELEX,TELIA,TELIC,TELLS,TELLY,TELOI,TELOS,TEMED,TEMES,TEMPI,TEMPO,TEMPS,TEMPT,TEMSE,'),abap.operators.concat(new abap.types.Character(114).set('TENCH,TENDS,TENDU,TENES,TENET,TENGE,TENIA,TENNE,TENNO,TENNY,TENON,TENOR,TENSE,TENTH,TENTS,TENTY,TENUE,TEPAL,TEPAS,'),abap.operators.concat(new abap.types.Character(114).set('TEPEE,TEPID,TEPOY,TERAI,TERAS,TERCE,TEREK,TERES,TERFE,TERFS,TERGA,TERMS,TERNE,TERNS,TERRA,TERRY,TERSE,TERTS,TESLA,'),abap.operators.concat(new abap.types.Character(114).set('TESTA,TESTE,TESTS,TESTY,TETES,TETHS,TETRA,TETRI,TEUCH,TEUGH,TEWED,TEWEL,TEWIT,TEXAS,TEXES,TEXTS,THACK,THAGI,THAIM,'),abap.operators.concat(new abap.types.Character(114).set('THALE,THALI,THANA,THANE,THANG,THANK,THANS,THANX,THARM,THARS,THAWS,THAWY,THEBE,THECA,THEED,THEEK,THEES,THEFT,THEGN,'),abap.operators.concat(new abap.types.Character(114).set('THEIC,THEIN,THEIR,THELF,THEMA,THEME,THENS,THEOW,THERE,THERM,THESE,THESP,THETA,THETE,THEWS,THEWY,THICK,THIEF,THIGH,'),abap.operators.concat(new abap.types.Character(114).set('THIGS,THILK,THILL,THINE,THING,THINK,THINS,THIOL,THIRD,THIRL,THOFT,THOLE,THOLI,THONG,THORN,THORO,THORP,THOSE,THOUS,'),abap.operators.concat(new abap.types.Character(114).set('THOWL,THRAE,THRAW,THREE,THREW,THRID,THRIP,THROB,THROE,THROW,THRUM,THUDS,THUGS,THUJA,THUMB,THUMP,THUNK,THURL,THUYA,'),abap.operators.concat(new abap.types.Character(114).set('THYME,THYMI,THYMY,TIANS,TIARA,TIARS,TIBIA,TICAL,TICCA,TICED,TICES,TICHY,TICKS,TICKY,TIDAL,TIDDY,TIDED,TIDES,TIERS,'),abap.operators.concat(new abap.types.Character(114).set('TIFFS,TIFOS,TIFTS,TIGER,TIGES,TIGHT,TIGON,TIKAS,TIKES,TIKIS,TIKKA,TILAK,TILDE,TILED,TILER,TILES,TILLS,TILLY,TILTH,'),abap.operators.concat(new abap.types.Character(114).set('TILTS,TIMBO,TIMED,TIMER,TIMES,TIMID,TIMON,TIMPS,TINAS,TINCT,TINDS,TINEA,TINED,TINES,TINGE,TINGS,TINKS,TINNY,TINTS,'),abap.operators.concat(new abap.types.Character(114).set('TINTY,TIPIS,TIPPY,TIPSY,TIRED,TIRES,TIRLS,TIROS,TIRRS,TITAN,TITCH,TITER,TITHE,TITIS,TITLE,TITRE,TITTY,TITUP,TIYIN,'),abap.operators.concat(new abap.types.Character(114).set('TIYNS,TIZES,TIZZY,TOADS,TOADY,TOAST,TOAZE,TOCKS,TOCKY,TOCOS,TODAY,TODDE,TODDY,TOEAS,TOFFS,TOFFY,TOFTS,TOFUS,TOGAE,'),abap.operators.concat(new abap.types.Character(114).set('TOGAS,TOGED,TOGES,TOGUE,TOHOS,TOILE,TOILS,TOING,TOISE,TOITS,TOKAY,TOKED,TOKEN,TOKER,TOKES,TOKOS,TOLAN,TOLAR,TOLAS,'),abap.operators.concat(new abap.types.Character(114).set('TOLED,TOLES,TOLLS,TOLLY,TOLTS,TOLUS,TOLYL,TOMAN,TOMBS,TOMES,TOMIA,TOMMY,TOMOS,TONAL,TONDI,TONDO,TONED,TONER,TONES,'),abap.operators.concat(new abap.types.Character(114).set('TONEY,TONGA,TONGS,TONIC,TONKA,TONKS,TONNE,TONUS,TOOLS,TOOMS,TOONS,TOOTH,TOOTS,TOPAZ,TOPED,TOPEE,TOPEK,TOPER,TOPES,'),abap.operators.concat(new abap.types.Character(114).set('TOPHE,TOPHI,TOPHS,TOPIC,TOPIS,TOPOI,TOPOS,TOPPY,TOQUE,TORAH,TORAN,TORAS,TORCH,TORCS,TORES,TORIC,TORII,TOROS,TOROT,'),abap.operators.concat(new abap.types.Character(114).set('TORRS,TORSE,TORSI,TORSK,TORSO,TORTA,TORTE,TORTS,TORUS,TOSAS,TOSED,TOSES,TOSHY,TOSSY,TOTAL,TOTED,TOTEM,TOTER,TOTES,'),abap.operators.concat(new abap.types.Character(114).set('TOTTY,TOUCH,TOUGH,TOUKS,TOUNS,TOURS,TOUSE,TOUSY,TOUTS,TOUZE,TOUZY,TOWED,TOWEL,TOWER,TOWIE,TOWNS,TOWNY,TOWSE,TOWSY,'),abap.operators.concat(new abap.types.Character(114).set('TOWTS,TOWZE,TOWZY,TOXIC,TOXIN,TOYED,TOYER,TOYON,TOYOS,TOZED,TOZES,TOZIE,TRABS,TRACE,TRACK,TRACT,TRADE,TRADS,TRAGI,'),abap.operators.concat(new abap.types.Character(114).set('TRAIK,TRAIL,TRAIN,TRAIT,TRAMP,TRAMS,TRANK,TRANQ,TRANS,TRANT,TRAPE,TRAPS,TRAPT,TRASH,TRASS,TRATS,TRATT,TRAVE,TRAWL,'),abap.operators.concat(new abap.types.Character(114).set('TRAYF,TRAYS,TREAD,TREAT,TRECK,TREED,TREEN,TREES,TREFA,TREIF,TREKS,TREMA,TREMS,TREND,TRESS,TREST,TRETS,TREWS,TREYF,'),abap.operators.concat(new abap.types.Character(114).set('TREYS,TRIAC,TRIAD,TRIAL,TRIBE,TRICE,TRICK,TRIDE,TRIED,TRIER,TRIES,TRIFF,TRIGO,TRIGS,TRIKE,TRILD,TRILL,TRIMS,TRINE,'),abap.operators.concat(new abap.types.Character(114).set('TRINS,TRIOL,TRIOR,TRIOS,TRIPE,TRIPS,TRIPY,TRIST,TRITE,TROAD,TROAK,TROAT,TROCK,TRODE,TRODS,TROGS,TROIS,TROKE,TROLL,'),abap.operators.concat(new abap.types.Character(114).set('TROMP,TRONA,TRONC,TRONE,TRONK,TRONS,TROOP,TROOZ,TROPE,TROTH,TROTS,TROUT,TROVE,TROWS,TROYS,TRUCE,TRUCK,TRUED,TRUER,'),abap.operators.concat(new abap.types.Character(114).set('TRUES,TRUGO,TRUGS,TRULL,TRULY,TRUMP,TRUNK,TRUSS,TRUST,TRUTH,TRYER,TRYKE,TRYMA,TRYPS,TRYST,TSADE,TSADI,TSARS,TSKED,'),abap.operators.concat(new abap.types.Character(114).set('TSUBA,TSUBO,TUANS,TUART,TUATH,TUBAE,TUBAL,TUBAR,TUBAS,TUBBY,TUBED,TUBER,TUBES,TUCKS,TUFAS,TUFFE,TUFFS,TUFTS,TUFTY,'),abap.operators.concat(new abap.types.Character(114).set('TUGRA,TUILE,TUINA,TUISM,TUKTU,TULES,TULIP,TULLE,TULPA,TULSI,TUMID,TUMMY,TUMOR,TUMPS,TUMPY,TUNAS,TUNDS,TUNED,TUNER,'),abap.operators.concat(new abap.types.Character(114).set('TUNES,TUNGS,TUNIC,TUNNY,TUPEK,TUPIK,TUPLE,TUQUE,TURBO,TURDS,TURFS,TURFY,TURKS,TURME,TURMS,TURNS,TURNT,TURPS,TURRS,'),abap.operators.concat(new abap.types.Character(114).set('TUSHY,TUSKS,TUSKY,TUTEE,TUTOR,TUTTI,TUTTY,TUTUS,TUXES,TUYER,TWAES,TWAIN,TWALS,TWANG,TWANK,TWATS,TWAYS,TWEAK,TWEED,'),abap.operators.concat(new abap.types.Character(114).set('TWEEL,TWEEN,TWEEP,TWEER,TWEET,TWERK,TWERP,TWICE,TWIER,TWIGS,TWILL,TWILT,TWINE,TWINK,TWINS,TWINY,TWIRE,TWIRL,TWIRP,'),abap.operators.concat(new abap.types.Character(114).set('TWIST,TWITE,TWITS,TWIXT,TWOER,TWYER,TYEES,TYERS,TYING,TYIYN,TYKES,TYLER,TYMPS,TYNDE,TYNED,TYNES,TYPAL,TYPED,TYPES,'),abap.operators.concat(new abap.types.Character(114).set('TYPEY,TYPIC,TYPOS,TYPPS,TYPTO,TYRAN,TYRED,TYRES,TYROS,TYTHE,TZARS,UDALS,UDDER,UDONS,UGALI,UGGED,UHLAN,UHURU,UKASE,'),abap.operators.concat(new abap.types.Character(114).set('ULAMA,ULANS,ULCER,ULEMA,ULMIN,ULNAD,ULNAE,ULNAR,ULNAS,ULPAN,ULTRA,ULVAS,ULYIE,ULZIE,UMAMI,UMBEL,UMBER,UMBLE,UMBOS,'),abap.operators.concat(new abap.types.Character(114).set('UMBRA,UMBRE,UMIAC,UMIAK,UMIAQ,UMMAH,UMMAS,UMMED,UMPED,UMPHS,UMPIE,UMPTY,UMRAH,UMRAS,UNAIS,UNAPT,UNARM,UNARY,UNAUS,'),abap.operators.concat(new abap.types.Character(114).set('UNBAG,UNBAN,UNBAR,UNBED,UNBID,UNBOX,UNCAP,UNCES,UNCIA,UNCLE,UNCOS,UNCOY,UNCUS,UNCUT,UNDAM,UNDEE,UNDER,UNDID,UNDOS,'),abap.operators.concat(new abap.types.Character(114).set('UNDUE,UNDUG,UNETH,UNFED,UNFIT,UNFIX,UNGAG,UNGET,UNGOD,UNGOT,UNGUM,UNHAT,UNHIP,UNICA,UNIFY,UNION,UNITE,UNITS,UNITY,'),abap.operators.concat(new abap.types.Character(114).set('UNJAM,UNKED,UNKET,UNKID,UNLAW,UNLAY,UNLED,UNLET,UNLID,UNLIT,UNMAN,UNMET,UNMEW,UNMIX,UNPAY,UNPEG,UNPEN,UNPIN,UNRED,'),abap.operators.concat(new abap.types.Character(114).set('UNRID,UNRIG,UNRIP,UNSAW,UNSAY,UNSEE,UNSET,UNSEW,UNSEX,UNSOD,UNTAX,UNTIE,UNTIL,UNTIN,UNWED,UNWET,UNWIT,UNWON,UNZIP,'),abap.operators.concat(new abap.types.Character(114).set('UPBOW,UPBYE,UPDOS,UPDRY,UPEND,UPJET,UPLAY,UPLED,UPLIT,UPPED,UPPER,UPRAN,UPRUN,UPSEE,UPSET,UPSEY,UPTAK,UPTER,UPTIE,'),abap.operators.concat(new abap.types.Character(114).set('URAEI,URALI,URAOS,URARE,URARI,URASE,URATE,URBAN,URBEX,URBIA,URDEE,UREAL,UREAS,UREDO,UREIC,URENA,URENT,URGED,URGER,'),abap.operators.concat(new abap.types.Character(114).set('URGES,URIAL,URINE,URITE,URMAN,URNAL,URNED,URPED,URSAE,URSID,URSON,URUBU,URVAS,USAGE,USERS,USHER,USING,USNEA,USQUE,'),abap.operators.concat(new abap.types.Character(114).set('USUAL,USURE,USURP,USURY,UTERI,UTILE,UTTER,UVEAL,UVEAS,UVULA,VACUA,VADED,VADES,VAGAL,VAGUE,VAGUS,VAILS,VAIRE,VAIRS,'),abap.operators.concat(new abap.types.Character(114).set('VAIRY,VAKAS,VAKIL,VALES,VALET,VALID,VALIS,VALOR,VALSE,VALUE,VALVE,VAMPS,VAMPY,VANDA,VANED,VANES,VANGS,VANTS,VAPED,'),abap.operators.concat(new abap.types.Character(114).set('VAPER,VAPES,VAPID,VAPOR,VARAN,VARAS,VARDY,VAREC,VARES,VARIA,VARIX,VARNA,VARUS,VARVE,VASAL,VASES,VASTS,VASTY,VATIC,'),abap.operators.concat(new abap.types.Character(114).set('VATUS,VAUCH,VAULT,VAUNT,VAUTE,VAUTS,VAWTE,VAXES,VEALE,VEALS,VEALY,VEENA,VEEPS,VEERS,VEERY,VEGAN,VEGAS,VEGES,VEGIE,'),abap.operators.concat(new abap.types.Character(114).set('VEGOS,VEHME,VEILS,VEILY,VEINS,VEINY,VELAR,VELDS,VELDT,VELES,VELLS,VELUM,VENAE,VENAL,VENDS,VENEY,VENGE,VENIN,VENOM,'),abap.operators.concat(new abap.types.Character(114).set('VENTS,VENUE,VENUS,VERBS,VERGE,VERRA,VERRY,VERSE,VERSO,VERST,VERTS,VERTU,VERVE,VESPA,VESTA,VESTS,VETCH,VEXED,VEXER,'),abap.operators.concat(new abap.types.Character(114).set('VEXES,VEXIL,VEZIR,VIALS,VIAND,VIBES,VIBEX,VIBEY,VICAR,VICED,VICES,VICHY,VIDEO,VIERS,VIEWS,VIEWY,VIFDA,VIFFS,VIGAS,'),abap.operators.concat(new abap.types.Character(114).set('VIGIA,VIGIL,VIGOR,VILDE,VILER,VILLA,VILLI,VILLS,VIMEN,VINAL,VINAS,VINCA,VINED,VINER,VINES,VINEW,VINIC,VINOS,VINTS,'),abap.operators.concat(new abap.types.Character(114).set('VINYL,VIOLA,VIOLD,VIOLS,VIPER,VIRAL,VIRED,VIREO,VIRES,VIRGA,VIRGE,VIRID,VIRLS,VIRTU,VIRUS,VISAS,VISED,VISES,VISIE,'),abap.operators.concat(new abap.types.Character(114).set('VISIT,VISNE,VISON,VISOR,VISTA,VISTO,VITAE,VITAL,VITAS,VITEX,VITRO,VITTA,VIVAS,VIVAT,VIVDA,VIVER,VIVES,VIVID,VIXEN,'),abap.operators.concat(new abap.types.Character(114).set('VIZIR,VIZOR,VLEIS,VLIES,VLOGS,VOARS,VOCAB,VOCAL,VOCES,VODDY,VODKA,VODOU,VODUN,VOEMA,VOGIE,VOGUE,VOICE,VOIDS,VOILA,'),abap.operators.concat(new abap.types.Character(114).set('VOILE,VOIPS,VOLAE,VOLAR,VOLED,VOLES,VOLET,VOLKS,VOLTA,VOLTE,VOLTI,VOLTS,VOLVA,VOLVE,VOMER,VOMIT,VOTED,VOTER,VOTES,'),abap.operators.concat(new abap.types.Character(114).set('VOUCH,VOUGE,VOULU,VOWED,VOWEL,VOWER,VOXEL,VOZHD,VRAIC,VRILS,VROOM,VROUS,VROUW,VROWS,VUGGS,VUGGY,VUGHS,VUGHY,VULGO,'),abap.operators.concat(new abap.types.Character(114).set('VULNS,VULVA,VUTTY,VYING,WAACS,WACKE,WACKO,WACKS,WACKY,WADDS,WADDY,WADED,WADER,WADES,WADGE,WADIS,WADTS,WAFER,WAFFS,'),abap.operators.concat(new abap.types.Character(114).set('WAFTS,WAGED,WAGER,WAGES,WAGGA,WAGON,WAGYU,WAHOO,WAIDE,WAIFS,WAIFT,WAILS,WAINS,WAIRS,WAIST,WAITE,WAITS,WAIVE,WAKAS,'),abap.operators.concat(new abap.types.Character(114).set('WAKED,WAKEN,WAKER,WAKES,WAKFS,WALDO,WALDS,WALED,WALER,WALES,WALIE,WALIS,WALKS,WALLA,WALLS,WALLY,WALTY,WALTZ,WAMED,'),abap.operators.concat(new abap.types.Character(114).set('WAMES,WAMUS,WANDS,WANED,WANES,WANEY,WANGS,WANKS,WANKY,WANLE,WANLY,WANNA,WANTS,WANTY,WANZE,WAQFS,WARBS,WARBY,WARDS,'),abap.operators.concat(new abap.types.Character(114).set('WARED,WARES,WAREZ,WARKS,WARMS,WARNS,WARPS,WARRE,WARST,WARTS,WARTY,WASES,WASHY,WASMS,WASPS,WASPY,WASTE,WASTS,WATAP,'),abap.operators.concat(new abap.types.Character(114).set('WATCH,WATER,WATTS,WAUFF,WAUGH,WAUKS,WAULK,WAULS,WAURS,WAVED,WAVER,WAVES,WAVEY,WAWAS,WAWES,WAWLS,WAXED,WAXEN,WAXER,'),abap.operators.concat(new abap.types.Character(114).set('WAXES,WAYED,WAZIR,WAZOO,WEALD,WEALS,WEAMB,WEANS,WEARS,WEARY,WEAVE,WEBBY,WEBER,WECHT,WEDEL,WEDGE,WEDGY,WEEDS,WEEDY,'),abap.operators.concat(new abap.types.Character(114).set('WEEKE,WEEKS,WEELS,WEEMS,WEENS,WEENY,WEEPS,WEEPY,WEEST,WEETE,WEETS,WEFTE,WEFTS,WEIDS,WEIGH,WEILS,WEIRD,WEIRS,WEISE,'),abap.operators.concat(new abap.types.Character(114).set('WEIZE,WEKAS,WELCH,WELDS,WELKE,WELKS,WELKT,WELLS,WELLY,WELSH,WELTS,WEMBS,WENCH,WENDS,WENGE,WENNY,WENTS,WEROS,WERSH,'),abap.operators.concat(new abap.types.Character(114).set('WESTS,WETAS,WETLY,WEXED,WEXES,WHACK,WHALE,WHAMO,WHAMS,WHANG,WHAPS,WHARE,WHARF,WHATA,WHATS,WHAUP,WHAUR,WHEAL,WHEAR,'),abap.operators.concat(new abap.types.Character(114).set('WHEAT,WHEEL,WHEEN,WHEEP,WHEFT,WHELK,WHELM,WHELP,WHENS,WHERE,WHETS,WHEWS,WHEYS,WHICH,WHIDS,WHIFF,WHIFT,WHIGS,WHILE,'),abap.operators.concat(new abap.types.Character(114).set('WHILK,WHIMS,WHINE,WHINS,WHINY,WHIOS,WHIPS,WHIPT,WHIRL,WHIRR,WHIRS,WHISH,WHISK,WHISS,WHIST,WHITE,WHITS,WHITY,WHIZZ,'),abap.operators.concat(new abap.types.Character(114).set('WHOLE,WHOMP,WHOOF,WHOOP,WHOOT,WHOPS,WHORE,WHORL,WHORT,WHOSE,WHOSO,WHOWS,WHUMP,WHUPS,WHYDA,WICCA,WICKS,WICKY,WIDDY,'),abap.operators.concat(new abap.types.Character(114).set('WIDEN,WIDER,WIDES,WIDOW,WIDTH,WIELD,WIELS,WIFED,WIFES,WIFEY,WIFIE,WIFTY,WIGAN,WIGGY,WIGHT,WIKIS,WILCO,WILDS,WILED,'),abap.operators.concat(new abap.types.Character(114).set('WILES,WILGA,WILIS,WILJA,WILLS,WILLY,WILTS,WIMPS,WIMPY,WINCE,WINCH,WINDS,WINDY,WINED,WINES,WINEY,WINGE,WINGS,WINGY,'),abap.operators.concat(new abap.types.Character(114).set('WINKS,WINNA,WINNS,WINOS,WINZE,WIPED,WIPER,WIPES,WIRED,WIRER,WIRES,WIRRA,WISED,WISER,WISES,WISHA,WISHT,WISPS,WISPY,'),abap.operators.concat(new abap.types.Character(114).set('WISTS,WITAN,WITCH,WITED,WITES,WITHE,WITHS,WITHY,WITTY,WIVED,WIVER,WIVES,WIZEN,WIZES,WOADS,WOALD,WOCKS,WODGE,WOFUL,'),abap.operators.concat(new abap.types.Character(114).set('WOJUS,WOKEN,WOKER,WOKKA,WOLDS,WOLFS,WOLLY,WOLVE,WOMAN,WOMBS,WOMBY,WOMEN,WOMYN,WONGA,WONGI,WONKS,WONKY,WONTS,WOODS,'),abap.operators.concat(new abap.types.Character(114).set('WOODY,WOOED,WOOER,WOOFS,WOOFY,WOOLD,WOOLS,WOOLY,WOONS,WOOPS,WOOPY,WOOSE,WOOSH,WOOTZ,WOOZY,WORDS,WORDY,WORKS,WORLD,'),abap.operators.concat(new abap.types.Character(114).set('WORMS,WORMY,WORRY,WORSE,WORST,WORTH,WORTS,WOULD,WOUND,WOVEN,WOWED,WOWEE,WOXEN,WRACK,WRANG,WRAPS,WRAPT,WRAST,WRATE,'),abap.operators.concat(new abap.types.Character(114).set('WRATH,WRAWL,WREAK,WRECK,WRENS,WREST,WRICK,WRIED,WRIER,WRIES,WRING,WRIST,WRITE,WRITS,WROKE,WRONG,WROOT,WROTE,WROTH,'),abap.operators.concat(new abap.types.Character(114).set('WRUNG,WRYER,WRYLY,WUDDY,WUDUS,WULLS,WURST,WUSES,WUSHU,WUSSY,WUXIA,WYLED,WYLES,WYNDS,WYNNS,WYTED,WYTES,XEBEC,XENIA,'),abap.operators.concat(new abap.types.Character(114).set('XENIC,XENON,XERIC,XEROX,XERUS,XOANA,XRAYS,XYLAN,XYLEM,XYLIC,XYLOL,XYLYL,XYSTI,XYSTS,YAARS,YABAS,YABBA,YABBY,YACCA,'),abap.operators.concat(new abap.types.Character(114).set('YACHT,YACKA,YACKS,YAFFS,YAGER,YAGES,YAGIS,YAHOO,YAIRD,YAKKA,YAKOW,YALES,YAMEN,YAMPY,YAMUN,YANGS,YANKS,YAPOK,YAPON,'),abap.operators.concat(new abap.types.Character(114).set('YAPPS,YAPPY,YARAK,YARCO,YARDS,YARER,YARFA,YARKS,YARNS,YARRS,YARTA,YARTO,YATES,YAUDS,YAULD,YAUPS,YAWED,YAWEY,YAWLS,'),abap.operators.concat(new abap.types.Character(114).set('YAWNS,YAWNY,YAWPS,YBORE,YCLAD,YCLED,YCOND,YDRAD,YDRED,YEADS,YEAHS,YEALM,YEANS,YEARD,YEARN,YEARS,YEAST,YECCH,YECHS,'),abap.operators.concat(new abap.types.Character(114).set('YECHY,YEDES,YEEDS,YEESH,YEGGS,YELKS,YELLS,YELMS,YELPS,YELTS,YENTA,YENTE,YERBA,YERDS,YERKS,YESES,YESKS,YESTS,YESTY,'),abap.operators.concat(new abap.types.Character(114).set('YETIS,YETTS,YEUKS,YEUKY,YEVEN,YEVES,YEWEN,YEXED,YEXES,YFERE,YIELD,YIKED,YIKES,YILLS,YINCE,YIPES,YIPPY,YIRDS,YIRKS,'),abap.operators.concat(new abap.types.Character(114).set('YIRRS,YIRTH,YITES,YITIE,YLEMS,YLIKE,YLKES,YMOLT,YMPES,YOBBO,YOBBY,YOCKS,YODEL,YODHS,YODLE,YOGAS,YOGEE,YOGHS,YOGIC,'),abap.operators.concat(new abap.types.Character(114).set('YOGIN,YOGIS,YOICK,YOJAN,YOKED,YOKEL,YOKER,YOKES,YOKUL,YOLKS,YOLKY,YOMIM,YOMPS,YONIC,YONIS,YONKS,YOOFS,YOOPS,YORES,'),abap.operators.concat(new abap.types.Character(114).set('YORKS,YORPS,YOUKS,YOUNG,YOURN,YOURS,YOURT,YOUSE,YOUTH,YOWED,YOWES,YOWIE,YOWLS,YOWZA,YRAPT,YRENT,YRIVD,YRNEH,YSAME,'),abap.operators.concat(new abap.types.Character(114).set('YTOST,YUANS,YUCAS,YUCCA,YUCCH,YUCKO,YUCKS,YUCKY,YUFTS,YUGAS,YUKED,YUKES,YUKKY,YUKOS,YULAN,YULES,YUMMO,YUMMY,YUMPS,'),abap.operators.concat(new abap.types.Character(114).set('YUPON,YUPPY,YURTA,YURTS,YUZUS,ZABRA,ZACKS,ZAIDA,ZAIDY,ZAIRE,ZAKAT,ZAMAN,ZAMIA,ZANJA,ZANTE,ZANZA,ZANZE,ZAPPY,ZARFS,'),abap.operators.concat(new abap.types.Character(114).set('ZARIS,ZATIS,ZAXES,ZAYIN,ZAZEN,ZEALS,ZEBEC,ZEBRA,ZEBUB,ZEBUS,ZEDAS,ZEINS,ZENDO,ZERDA,ZERKS,ZEROS,ZESTS,ZESTY,ZETAS,'),abap.operators.concat(new abap.types.Character(114).set('ZEXES,ZEZES,ZHOMO,ZIBET,ZIFFS,ZIGAN,ZILAS,ZILCH,ZILLA,ZILLS,ZIMBI,ZIMBS,ZINCO,ZINCS,ZINCY,ZINEB,ZINES,ZINGS,ZINGY,'),abap.operators.concat(new abap.types.Character(114).set('ZINKE,ZINKY,ZIPPO,ZIPPY,ZIRAM,ZITIS,ZIZEL,ZIZIT,ZLOTE,ZLOTY,ZOAEA,ZOBOS,ZOBUS,ZOCCO,ZOEAE,ZOEAL,ZOEAS,ZOISM,ZOIST,'),abap.operators.concat(new abap.types.Character(114).set('ZOMBI,ZONAE,ZONAL,ZONDA,ZONED,ZONER,ZONES,ZONKS,ZOOEA,ZOOEY,ZOOID,ZOOKS,ZOOMS,ZOONS,ZOOTY,ZOPPA,ZOPPO,ZORIL,ZORIS,'),new abap.types.Character(83).set('ZORRO,ZOUKS,ZOWEE,ZOWIE,ZULUS,ZUPAN,ZUPAS,ZUPPA,ZURFS,ZUZIM,ZYGAL,ZYGON,ZYMES,ZYMIC')))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));\r\n    abap.statements.split({source: lv_words, at: new abap.types.Character(1).set(','), table: this.word_tab});\r\n  }\r\n}\r\nabap.Classes['PROG-ZFOOBAR-LCL_WORDLE'] = lcl_wordle;\r\nlcl_wordle.letter1 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.letter2 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.letter3 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.letter4 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.letter5 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.black_letters = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.orange_letters = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.c_abc = new abap.types.Character(26, {});\r\nlcl_wordle.c_abc.set('ABCDEFGHIJKLMNOPQRSTUVWXYZ');\r\nlcl_wordle.char1 = new abap.types.Character(1, {\"qualifiedName\":\"lcl_wordle=>char1\"});\r\nlcl_wordle.char5 = new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"});\r\nlcl_wordle.char6 = new abap.types.Character(6, {\"qualifiedName\":\"lcl_wordle=>char6\"});\r\nlcl_wordle.char26 = new abap.types.Character(26, {\"qualifiedName\":\"lcl_wordle=>char26\"});\r\nlcl_wordle.string_table = new abap.types.Table(new abap.types.String({qualifiedName: \"STRING\"}), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>string_table\");\r\nlcl_wordle.submatch_result = new abap.types.Structure({\"offset\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-OFFSET\"}), \"length\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-LENGTH\"})}, \"lcl_wordle=>submatch_result\");\r\nlcl_wordle.submatch_tab = new abap.types.Table(new abap.types.Structure({\"offset\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-OFFSET\"}), \"length\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-LENGTH\"})}, \"lcl_wordle=>submatch_result\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>submatch_tab\");\r\nlcl_wordle.match_result = new abap.types.Structure({\"line\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>MATCH_RESULT-LINE\"}), \"offset\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>MATCH_RESULT-OFFSET\"}), \"length\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>MATCH_RESULT-LENGTH\"}), \"submatches\": new abap.types.Table(new abap.types.Structure({\"offset\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-OFFSET\"}), \"length\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-LENGTH\"})}, \"lcl_wordle=>submatch_result\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>submatch_tab\")}, \"lcl_wordle=>match_result\");\r\nlcl_wordle.match_result_tab = new abap.types.Table(new abap.types.Structure({\"line\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>MATCH_RESULT-LINE\"}), \"offset\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>MATCH_RESULT-OFFSET\"}), \"length\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>MATCH_RESULT-LENGTH\"}), \"submatches\": new abap.types.Table(new abap.types.Structure({\"offset\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-OFFSET\"}), \"length\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>SUBMATCH_RESULT-LENGTH\"})}, \"lcl_wordle=>submatch_result\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>submatch_tab\")}, \"lcl_wordle=>match_result\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>match_result_tab\");\r\nlcl_wordle.ty_word_score = new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"});\r\nlcl_wordle.ty_matched_word = new abap.types.Structure({\"word\": new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"}), \"vowel_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-VOWEL_COUNT\"}), \"consonant_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-CONSONANT_COUNT\"}), \"contains_all_orange_letters\": new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"}), \"word_score\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"})}, \"lcl_wordle=>ty_matched_word\");\r\nlcl_wordle.ty_matched_word_tab = new abap.types.Table(new abap.types.Structure({\"word\": new abap.types.Character(5, {\"qualifiedName\":\"lcl_wordle=>char5\"}), \"vowel_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-VOWEL_COUNT\"}), \"consonant_count\": new abap.types.Integer({qualifiedName: \"LCL_WORDLE=>TY_MATCHED_WORD-CONSONANT_COUNT\"}), \"contains_all_orange_letters\": new abap.types.Character(1, {\"qualifiedName\":\"ABAP_BOOL\",\"ddicName\":\"ABAP_BOOL\"}), \"word_score\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_WORD_SCORE\"})}, \"lcl_wordle=>ty_matched_word\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"type\":\"STANDARD\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>ty_matched_word_tab\");\r\nlcl_wordle.ty_relative_frequency = new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"});\r\nlcl_wordle.ty_letter_frequency = new abap.types.Structure({\"first_letter\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"}), \"other_letters\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"})}, \"lcl_wordle=>ty_letter_frequency\");\r\nlcl_wordle.ty_letter_frequency_tab = new abap.types.Table(new abap.types.Structure({\"first_letter\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"}), \"other_letters\": new abap.types.Float({qualifiedName: \"LCL_WORDLE=>TY_RELATIVE_FREQUENCY\"})}, \"lcl_wordle=>ty_letter_frequency\"), {\"withHeader\":false,\"primaryKey\":{\"name\":\"primary_key\",\"type\":\"STANDARD\",\"isUnique\":false,\"keyFields\":[]},\"secondary\":[]}, \"lcl_wordle=>ty_letter_frequency_tab\");\r\nlet wordle_assistant = new abap.types.ABAPObject({qualifiedName: \"LCL_WORDLE\"});\r\nwordle_assistant.set(await (new abap.Classes['PROG-ZFOOBAR-LCL_WORDLE']()).constructor_());\r\n\r\nawait wordle_assistant.get().main({\r\n    i_letter_1: new abap.types.Character( $$letter1_len$$ ).set('$$letter1$$'),\r\n    i_letter_2: new abap.types.Character( $$letter2_len$$ ).set('$$letter2$$'),\r\n    i_letter_3: new abap.types.Character( $$letter3_len$$ ).set('$$letter3$$'),\r\n    i_letter_4: new abap.types.Character( $$letter4_len$$ ).set('$$letter4$$'),\r\n    i_letter_5: new abap.types.Character( $$letter5_len$$ ).set('$$letter5$$'),\r\n    i_black_letters: new abap.types.Character( $$black_len$$ ).set('$$black$$'),\r\n    i_orange_letters: new abap.types.Character( $$orange_len$$ ).set('$$orange$$')\r\n});\r\n";

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

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./node_modules/@abaplint/runtime/build/src/index":77}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABAPRegExp = void 0;
class ABAPRegExp {
    // converts from ABAP specific regex to javascript regex
    static convert(input) {
        let ret = input;
        ret = ret.replace(/\[\[:punct:\]\]/g, "[@%\\.\\,\\-\\{\\}\\[\\]\\:\\!\\?\\(\\)\\;\\']");
        // https://github.com/micromatch/posix-character-classes#posix-character-classes
        ret = ret.replace(/\[\^\[:print:\]\]/g, "[\\x00-\\x1F\\x7F]");
        ret = ret.replace("[[:space:]]", "\\s");
        return ret;
    }
    static escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
}
exports.ABAPRegExp = ABAPRegExp;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearchTo = exports.binarySearchFrom = exports.binarySearchFromRow = void 0;
/* eslint-disable max-len */
const compare_1 = require("./compare");
const types_1 = require("./types");
function binarySearchFromRow(array, left, right, keyField, keyValue) {
    const isStructured = array[0] instanceof types_1.Structure;
    while (right - left > 1) {
        const middle = Math.floor(((right - left) / 2) + left);
        const a = array[middle];
        const row = isStructured ? Object.assign({ table_line: a }, a.get()) : { table_line: a };
        if ((0, compare_1.ge)(keyField(row), keyValue)) {
            right = middle;
        }
        else {
            left = middle;
        }
    }
    return right;
}
exports.binarySearchFromRow = binarySearchFromRow;
function binarySearchFrom(array, left, right, keyField, keyValue) {
    while (right - left > 1) {
        const middle = Math.floor(((right - left) / 2) + left);
        if ((0, compare_1.ge)(array[middle].get()[keyField], keyValue)) {
            right = middle;
        }
        else {
            left = middle;
        }
    }
    return right;
}
exports.binarySearchFrom = binarySearchFrom;
function binarySearchTo(array, left, right, keyField, keyValue) {
    while (right - left > 1) {
        const middle = Math.floor(((right - left) / 2) + left);
        if ((0, compare_1.le)(array[middle].get()[keyField], keyValue)) {
            left = middle;
        }
        else {
            right = middle;
        }
    }
    return right;
}
exports.binarySearchTo = binarySearchTo;

},{"./compare":60,"./types":151}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abs = void 0;
function abs(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.abs(num_in);
}
exports.abs = abs;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolc = void 0;
const types_1 = require("../types");
function boolc(input) {
    if (input === true) {
        return new types_1.String().set("X");
    }
    else if (input === false || input === undefined) {
        return new types_1.String().set(" ");
    }
    else if (input.val instanceof types_1.String && input.val.get().trim() === "") {
        return new types_1.String().set(" ");
    }
    else if (input.val instanceof types_1.Character && input.val.get().trim() === "") {
        return new types_1.String().set(" ");
    }
    else {
        return new types_1.String().set("X");
    }
}
exports.boolc = boolc;

},{"../types":151}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ceil = void 0;
function ceil(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.ceil(num_in);
}
exports.ceil = ceil;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat_lines_of = void 0;
const string_1 = require("../types/string");
function concat_lines_of(input) {
    let s = input.sep;
    if (s === undefined) {
        s = "";
    }
    else if (typeof s !== "string") {
        s = s.get();
    }
    return new string_1.String().set(input.table.array().map(e => e.get()).join(s));
}
exports.concat_lines_of = concat_lines_of;

},{"../types/string":155}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condense = void 0;
const types_1 = require("../types");
function condense(input) {
    let str = typeof input.val === "string" ? input.val : input.val.get().toString();
    let from = " ";
    if (input.from) {
        from = typeof input.from === "string" ? input.from : input.from.get().toString();
    }
    let to = " ";
    if (input.to) {
        to = typeof input.to === "string" ? input.to : input.to.get().toString();
    }
    /*
    let del = " ";
    if (input.del) {
      del = typeof input.del === "string" ? input.del : input.del.get().toString();
    }
    */
    str = str.replace(/ +$/, "");
    str = str.replace(/^ +/, "");
    for (const f of from.split("")) {
        str = str.replace(new RegExp(f.replace(".", "\\."), "g"), to);
    }
    return new types_1.String().set(str.replace(/ {2,}/g, " "));
}
exports.condense = condense;

},{"../types":151}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
const types_1 = require("../types");
function contains(input) {
    if (input.case !== undefined
        || input.off !== undefined
        || input.len !== undefined
        || input.occ !== undefined) {
        throw "runtime, contains() todo";
    }
    const ret = input.val.get().match(input.regex.get()) !== null ? "X" : " ";
    return new types_1.String().set(ret);
}
exports.contains = contains;

},{"../types":151}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cos = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function cos(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.cos(num_in);
}
exports.cos = cos;

},{"../types":151}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count = void 0;
const compare_1 = require("../compare");
const types_1 = require("../types");
function count(input) {
    let found = 0;
    let val = input.val.get();
    if (input.off) {
        const off = input.off.get();
        val = val.substring(off);
    }
    if (input.len) {
        const len = input.len.get();
        val = val.substring(0, len);
    }
    let reg = "";
    if (input.sub) {
        reg = input.sub.get();
        reg = reg.replace(/\*/g, "\\*");
    }
    else if (input.regex) {
        reg = input.regex.get();
    }
    let options = "g";
    if (input.case && (0, compare_1.initial)(input.case)) {
        options += "i";
    }
    if (val !== "") {
        const res = val.match(new RegExp(reg, options));
        if (res) {
            found = res.length;
        }
    }
    return new types_1.Integer().set(found);
}
exports.count = count;

},{"../compare":60,"../types":151}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.count_any_of = void 0;
const types_1 = require("../types");
function count_any_of(input) {
    let found = 0;
    const val = input.val.get();
    const sub = input.sub.get();
    if (sub !== "") {
        for (const char of sub.split("")) {
            const match = val.match(new RegExp(char, "g"));
            found += (match === null || match === void 0 ? void 0 : match.length) || 0;
        }
    }
    return new types_1.Integer().set(found);
}
exports.count_any_of = count_any_of;

},{"../types":151}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const types_1 = require("../types");
function escape(input) {
    let val = typeof input.val === "string" ? input.val : input.val.get();
    const format = typeof input.format === "number" ? input.format : input.format.get();
    switch (format) {
        case 4: // e_html_text
            val = val.replace(/&/g, "&amp;");
            val = val.replace(/</g, "&lt;");
            val = val.replace(/>/g, "&gt;");
            break;
        case 5: // e_html_attr
            val = val.replace(/&/g, "&amp;");
            val = val.replace(/</g, "&lt;");
            val = val.replace(/>/g, "&gt;");
            val = val.replace(/"/g, "&quot;");
            val = val.replace(/'/g, "&#39;");
            break;
        case 12: // e_url
            val = encodeURI(val);
            break;
        default:
        // todo, runtime error
    }
    return new types_1.String().set(val);
}
exports.escape = escape;

},{"../types":151}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const throw_error_1 = require("../throw_error");
const types_1 = require("../types");
function find(input) {
    var _a, _b, _c, _d, _e;
    let val = typeof input.val === "string" ? input.val : input.val.get();
    if (input.len !== undefined) {
        throw "transpiler find(), todo len";
    }
    if (input.regex) {
        if (input.off !== undefined) {
            throw "transpiler find(), todo off regex";
        }
        const caseInput = typeof input.case === "string" ? input.case : (_a = input.case) === null || _a === void 0 ? void 0 : _a.get();
        const regex = typeof input.regex === "string" ? input.regex : input.regex.get();
        const flags = caseInput !== "X" ? "i" : "";
        const reg = new RegExp(regex, flags);
        const ret = (_b = val.match(reg)) === null || _b === void 0 ? void 0 : _b.index;
        if (ret !== undefined) {
            return new types_1.Integer().set(ret);
        }
        else {
            return new types_1.Integer().set(-1);
        }
    }
    else {
        const sub = typeof input.sub === "string" ? input.sub : (_c = input.sub) === null || _c === void 0 ? void 0 : _c.get();
        let off = typeof input.off === "number" ? input.off : ((_d = input.off) === null || _d === void 0 ? void 0 : _d.get()) || 0;
        let occ = typeof input.occ === "number" ? input.occ : (_e = input.occ) === null || _e === void 0 ? void 0 : _e.get();
        if (occ === 0) {
            (0, throw_error_1.throwError)("CX_SY_STRG_PAR_VAL");
        }
        else if (occ === undefined) {
            occ = 1;
        }
        let negative = false;
        if (occ < 0) {
            negative = true;
            val = val.split("").reverse().join("");
            occ = Math.abs(occ);
        }
        let found = -1;
        for (let i = 0; i < occ; i++) {
            found = val.indexOf(sub || "", off);
            if (found >= 0) {
                off = found + 1;
            }
        }
        if (negative === true && found >= 0) {
            found = val.length - found - 1;
        }
        return new types_1.Integer().set(found);
    }
}
exports.find = find;

},{"../throw_error":141,"../types":151}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floor = void 0;
function floor(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.floor(num_in);
}
exports.floor = floor;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frac = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function frac(input) {
    let num_in = undefined;
    let ret = 0;
    let pre = "0.";
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.DecFloat34
        || input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    const numSplit = num_in.toString().split(".");
    if (numSplit.length === 2) {
        if (num_in < 0) {
            pre = "-0.";
        }
        ret = parseFloat(pre + numSplit[1]);
    }
    if (input.val instanceof types_1.DecFloat34) {
        return new types_1.DecFloat34().set(ret);
    }
    else if (input.val instanceof types_1.Float) {
        return new types_1.Float().set(ret);
    }
    else {
        return ret;
    }
}
exports.frac = frac;

},{"../types":151}],17:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.space = exports.abap_undefined = exports.abap_false = exports.abap_true = void 0;
const types_1 = require("../types");
__exportStar(require("./abs"), exports);
__exportStar(require("./boolc"), exports);
__exportStar(require("./ceil"), exports);
__exportStar(require("./concat_lines_of"), exports);
__exportStar(require("./condense"), exports);
__exportStar(require("./contains"), exports);
__exportStar(require("./cos"), exports);
__exportStar(require("./count_any_of"), exports);
__exportStar(require("./count"), exports);
__exportStar(require("./escape"), exports);
__exportStar(require("./find"), exports);
__exportStar(require("./floor"), exports);
__exportStar(require("./frac"), exports);
__exportStar(require("./insert"), exports);
__exportStar(require("./ipow"), exports);
__exportStar(require("./lines"), exports);
__exportStar(require("./match"), exports);
__exportStar(require("./matches"), exports);
__exportStar(require("./nmax"), exports);
__exportStar(require("./nmin"), exports);
__exportStar(require("./numofchar"), exports);
__exportStar(require("./repeat"), exports);
__exportStar(require("./replace"), exports);
__exportStar(require("./reverse"), exports);
__exportStar(require("./round"), exports);
__exportStar(require("./segment"), exports);
__exportStar(require("./shift_left"), exports);
__exportStar(require("./sign"), exports);
__exportStar(require("./sin"), exports);
__exportStar(require("./sqrt"), exports);
__exportStar(require("./strlen"), exports);
__exportStar(require("./substring_after"), exports);
__exportStar(require("./substring_before"), exports);
__exportStar(require("./substring"), exports);
__exportStar(require("./sy"), exports);
__exportStar(require("./tan"), exports);
__exportStar(require("./to_lower"), exports);
__exportStar(require("./to_mixed"), exports);
__exportStar(require("./to_upper"), exports);
__exportStar(require("./translate"), exports);
__exportStar(require("./trunc"), exports);
__exportStar(require("./xstrlen"), exports);
exports.abap_true = new types_1.Character(1, { qualifiedName: "ABAP_BOOL", ddicName: "ABAP_BOOL" }).set("X");
exports.abap_false = new types_1.Character(1, { qualifiedName: "ABAP_BOOL", ddicName: "ABAP_BOOL" }).set("");
exports.abap_undefined = new types_1.Character(1, { qualifiedName: "ABAP_BOOL", ddicName: "ABAP_BOOL" }).set("-");
exports.space = new types_1.Character(1, { qualifiedName: "ABAP_BOOL", ddicName: "ABAP_BOOL" }).set(" ");

},{"../types":151,"./abs":4,"./boolc":5,"./ceil":6,"./concat_lines_of":7,"./condense":8,"./contains":9,"./cos":10,"./count":11,"./count_any_of":12,"./escape":13,"./find":14,"./floor":15,"./frac":16,"./insert":18,"./ipow":19,"./lines":20,"./match":21,"./matches":22,"./nmax":23,"./nmin":24,"./numofchar":25,"./repeat":26,"./replace":27,"./reverse":28,"./round":29,"./segment":30,"./shift_left":31,"./sign":32,"./sin":33,"./sqrt":34,"./strlen":35,"./substring":36,"./substring_after":37,"./substring_before":38,"./sy":39,"./tan":40,"./to_lower":41,"./to_mixed":42,"./to_upper":43,"./translate":44,"./trunc":45,"./xstrlen":46}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert = void 0;
const types_1 = require("../types");
function insert(input) {
    let offset = 0;
    if (input.off) {
        offset = input.off.get();
    }
    const value = input.val.getOffset({ offset: 0, length: offset }).get() +
        input.sub.get() +
        input.val.getOffset({ offset: offset }).get();
    return new types_1.String().set(value);
}
exports.insert = insert;

},{"../types":151}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipow = void 0;
function ipow(input) {
    let base = undefined;
    if (typeof input.base === "number") {
        base = input.base;
    }
    else if (typeof input.base === "string") {
        base = parseFloat(input.base);
    }
    else {
        base = parseFloat(input.base.get().toString());
    }
    let exp = undefined;
    if (typeof input.exp === "number") {
        exp = input.exp;
    }
    else if (typeof input.exp === "string") {
        exp = parseFloat(input.exp);
    }
    else {
        exp = parseFloat(input.exp.get().toString());
    }
    return Math.pow(base, exp).toFixed(0);
}
exports.ipow = ipow;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lines = void 0;
const types_1 = require("../types");
function lines(input) {
    return new types_1.Integer().set(input.val.array().length);
}
exports.lines = lines;

},{"../types":151}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
const string_1 = require("../types/string");
function match(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else {
        reg = input.regex.get();
    }
    const r = new RegExp(reg);
    const res = val.match(r);
    let ret = "";
    if (res && res[0]) {
        ret = res[0];
    }
    return new string_1.String().set(ret);
}
exports.match = match;

},{"../types/string":155}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = void 0;
const types_1 = require("../types");
function matches(input) {
    if (input.pcre !== undefined) {
        throw "matches(), todo, pcre";
    }
    else if (input.regex === undefined) {
        throw "matches(), regex input expected";
    }
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else {
        reg = input.regex.get();
    }
    const r = new RegExp("^" + reg + "$");
    const res = val.match(r);
    if (res !== null) {
        return new types_1.Character().set("X");
    }
    else {
        return new types_1.Character().set(" ");
    }
}
exports.matches = matches;

},{"../types":151}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nmax = void 0;
const _parse_1 = require("../operators/_parse");
const types_1 = require("../types");
function nmax(input) {
    const values = [];
    values.push((0, _parse_1.parse)(input.val1));
    values.push((0, _parse_1.parse)(input.val2));
    if (input.val3) {
        values.push((0, _parse_1.parse)(input.val3));
    }
    if (input.val4) {
        values.push((0, _parse_1.parse)(input.val4));
    }
    if (input.val5) {
        values.push((0, _parse_1.parse)(input.val5));
    }
    if (input.val6) {
        values.push((0, _parse_1.parse)(input.val6));
    }
    if (input.val7) {
        values.push((0, _parse_1.parse)(input.val7));
    }
    if (input.val8) {
        values.push((0, _parse_1.parse)(input.val8));
    }
    if (input.val9) {
        values.push((0, _parse_1.parse)(input.val9));
    }
    values.sort((a, b) => (b - a));
    return new types_1.Float().set(values[0]);
}
exports.nmax = nmax;

},{"../operators/_parse":80,"../types":151}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nmin = void 0;
const _parse_1 = require("../operators/_parse");
const types_1 = require("../types");
function nmin(input) {
    const values = [];
    values.push((0, _parse_1.parse)(input.val1));
    values.push((0, _parse_1.parse)(input.val2));
    if (input.val3) {
        values.push((0, _parse_1.parse)(input.val3));
    }
    if (input.val4) {
        values.push((0, _parse_1.parse)(input.val4));
    }
    if (input.val5) {
        values.push((0, _parse_1.parse)(input.val5));
    }
    if (input.val6) {
        values.push((0, _parse_1.parse)(input.val6));
    }
    if (input.val7) {
        values.push((0, _parse_1.parse)(input.val7));
    }
    if (input.val8) {
        values.push((0, _parse_1.parse)(input.val8));
    }
    if (input.val9) {
        values.push((0, _parse_1.parse)(input.val9));
    }
    values.sort((a, b) => (a - b));
    return new types_1.Float().set(values[0]);
}
exports.nmin = nmin;

},{"../operators/_parse":80,"../types":151}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numofchar = void 0;
const types_1 = require("../types");
function numofchar(input) {
    let str = "";
    if (typeof input.val === "string") {
        str = input.val;
    }
    else {
        str = input.val.get();
    }
    return new types_1.Integer().set(str.length);
}
exports.numofchar = numofchar;

},{"../types":151}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repeat = void 0;
const string_1 = require("../types/string");
function repeat(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    return new string_1.String().set(val.repeat(input.occ.get()));
}
exports.repeat = repeat;

},{"../types/string":155}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
const string_1 = require("../types/string");
const abap_regex_1 = require("../abap_regex");
const types_1 = require("../types");
function replace(input) {
    let val = undefined;
    if (typeof input.val === "string") {
        val = input.val;
    }
    else {
        val = input.val.get();
    }
    let wi = undefined;
    if (typeof input.with === "string") {
        wi = input.with;
    }
    else if (input.with instanceof types_1.Character) {
        wi = input.with.getTrimEnd();
    }
    else if (input.with) {
        wi = input.with.get();
    }
    let sub = undefined;
    if (typeof input.sub === "string") {
        sub = input.sub;
    }
    else if (input.sub) {
        sub = input.sub.get();
    }
    if (sub !== undefined) {
        sub = sub.replace(/\\/g, "\\\\");
        sub = sub.replace(/\[/g, "\\[");
    }
    if (typeof input.regex === "string") {
        sub = new RegExp(abap_regex_1.ABAPRegExp.convert(input.regex), "g");
    }
    else if (input.regex) {
        sub = new RegExp(abap_regex_1.ABAPRegExp.convert(input.regex.get()), "g");
    }
    if (input.off && input.len && typeof input.val === "string") {
        const offset = input.off.get();
        const length = input.len.get();
        val = val.substring(0, offset) + wi + val.substring(offset + length);
    }
    else if (input.off && input.len && !(typeof input.val === "string")) {
        const offset = input.off.get();
        const length = input.len.get();
        val = input.val.getOffset({ offset: 0, length: offset }).get() +
            wi +
            input.val.getOffset({ offset: offset + length }).get();
    }
    else if (input.occ === undefined && sub && wi) {
        val = val.replace(sub, wi);
    }
    else if (input.occ && input.occ.get() === 0 && sub && wi !== undefined) {
        if (typeof sub === "string") {
            sub = new RegExp(sub, "g");
        }
        val = val.replace(sub, wi);
    }
    return new string_1.String().set(val);
}
exports.replace = replace;

},{"../abap_regex":2,"../types":151,"../types/string":155}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverse = void 0;
const types_1 = require("../types");
function reverse(input) {
    let val = "";
    if (typeof input.val === "string") {
        val = input.val;
    }
    else {
        val = input.val.get();
    }
    val = val.split("").reverse().join("");
    return new types_1.String().set(val);
}
exports.reverse = reverse;

},{"../types":151}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = void 0;
const _parse_1 = require("../operators/_parse");
const types_1 = require("../types");
function round(input) {
    let mode = input.mode;
    if (mode === undefined) {
        mode = 2;
    }
    else if (typeof mode !== "number") {
        mode = mode === null || mode === void 0 ? void 0 : mode.get();
    }
    const val = (0, _parse_1.parse)(input.val);
    const dec = (0, _parse_1.parse)(input.dec);
    if (dec !== 0) {
        throw "round(), todo, handle decimals";
    }
    const ret = new types_1.Float();
    switch (mode) {
        case 1:
            ret.set(Math.ceil(val));
            break;
        case 2:
            ret.set(Math.round(val));
            break;
        case 4:
            ret.set(-Math.round(-val));
            break;
        case 5:
            ret.set(Math.trunc(val));
            break;
        case 6:
            ret.set(Math.floor(val));
            break;
        default:
            throw "round(), unknown mode: " + mode;
    }
    return ret;
}
exports.round = round;

},{"../operators/_parse":80,"../types":151}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.segment = void 0;
const throw_error_1 = require("../throw_error");
const types_1 = require("../types");
function segment(input) {
    let val = input.val;
    if (typeof val !== "string") {
        val = val.get();
    }
    let sep = input.sep;
    if (typeof sep !== "string") {
        sep = sep.get();
    }
    let index = input.index;
    if (typeof index !== "number") {
        index = index.get();
    }
    if (index === 0 || sep.length === 0) {
        (0, throw_error_1.throwError)("CX_SY_STRG_PAR_VAL");
    }
    const array = val.split(sep);
    if (index < 0) {
        array.reverse();
        index = Math.abs(index);
    }
    if (index > array.length) {
        (0, throw_error_1.throwError)("CX_SY_STRG_PAR_VAL");
    }
    return new types_1.String().set(array[index - 1]);
}
exports.segment = segment;

},{"../throw_error":141,"../types":151}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shift_left = void 0;
const string_1 = require("../types/string");
const throw_error_1 = require("../throw_error");
function shift_left(input) {
    let val = typeof input.val === "string" ? input.val : input.val.get();
    if (input.sub) {
        const sub = typeof input.sub === "string" ? input.sub : input.sub.get();
        while (val.startsWith(sub)) {
            val = val.substr(sub.length);
        }
    }
    else if (input.places) {
        let places = typeof input.places === "string" ? input.places : input.places.get();
        if (typeof places === "string") {
            places = parseInt(places, 10);
        }
        if (places > val.length) {
            (0, throw_error_1.throwError)("CX_SY_RANGE_OUT_OF_BOUNDS");
        }
        val = val.substring(places);
    }
    else if (input.circular) {
        const leftShifts = input.circular.get() % val.length;
        val = val.slice(leftShifts) + val.slice(0, leftShifts);
    }
    return new string_1.String().set(val);
}
exports.shift_left = shift_left;

},{"../throw_error":141,"../types/string":155}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
function sign(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.sign(num_in);
}
exports.sign = sign;

},{}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sin = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function sin(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.sin(num_in);
}
exports.sin = sin;

},{"../types":151}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqrt = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function sqrt(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.sqrt(num_in);
}
exports.sqrt = sqrt;

},{"../types":151}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strlen = void 0;
const types_1 = require("../types");
function strlen(input) {
    let str = "";
    if (typeof input.val === "string") {
        str = input.val;
    }
    else {
        str = input.val.get();
    }
    return new types_1.Integer().set(str.length);
}
exports.strlen = strlen;

},{"../types":151}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring = void 0;
const string_1 = require("../types/string");
const throw_error_1 = require("../throw_error");
function substring(input) {
    var _a, _b;
    let off = (_a = input === null || input === void 0 ? void 0 : input.off) === null || _a === void 0 ? void 0 : _a.get();
    if (off === undefined) {
        off = 0;
    }
    if (off < 0) {
        (0, throw_error_1.throwError)("CX_SY_RANGE_OUT_OF_BOUNDS");
    }
    const len = (_b = input === null || input === void 0 ? void 0 : input.len) === null || _b === void 0 ? void 0 : _b.get();
    if (len && len < 0) {
        (0, throw_error_1.throwError)("CX_SY_RANGE_OUT_OF_BOUNDS");
    }
    let sub = "";
    if (typeof input.val === "string") {
        sub = input.val.substr(off, len);
    }
    else {
        sub = input.val.getOffset({ offset: off, length: len }).get();
    }
    return new string_1.String().set(sub);
}
exports.substring = substring;

},{"../throw_error":141,"../types/string":155}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring_after = void 0;
const string_1 = require("../types/string");
function substring_after(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else if (input === null || input === void 0 ? void 0 : input.regex) {
        reg = input.regex.get();
    }
    else if (typeof input.sub === "string") {
        reg = input.sub;
    }
    else if (input === null || input === void 0 ? void 0 : input.sub) {
        reg = input.sub.get();
    }
    const r = new RegExp(reg + "(.*)");
    const res = val.match(r);
    let ret = "";
    if (res && res[1]) {
        ret = res[1];
    }
    return new string_1.String().set(ret);
}
exports.substring_after = substring_after;

},{"../types/string":155}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.substring_before = void 0;
const string_1 = require("../types/string");
function substring_before(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    let reg = "";
    if (typeof input.regex === "string") {
        reg = input.regex;
    }
    else if (input === null || input === void 0 ? void 0 : input.regex) {
        reg = input.regex.get();
    }
    else if (typeof input.sub === "string") {
        reg = input.sub;
    }
    else if (input === null || input === void 0 ? void 0 : input.sub) {
        reg = input.sub.get();
    }
    const r = new RegExp("(.*?)" + reg);
    const res = val.match(r);
    let ret = "";
    if (res && res[1]) {
        ret = res[1];
    }
    return new string_1.String().set(ret);
}
exports.substring_before = substring_before;

},{"../types/string":155}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sy = void 0;
const types_1 = require("../types");
exports.sy = new types_1.Structure({
    abcde: new types_1.Character(26).set("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    datlo: new types_1.Date(),
    datum: new types_1.Date(),
    dbcnt: new types_1.Integer(),
    fdpos: new types_1.Integer(),
    host: new types_1.Character(32).set("localhost"),
    index: new types_1.Integer(),
    langu: new types_1.Character(1).set("E"),
    mandt: new types_1.Character(3).set("123"),
    msgid: new types_1.Character(20),
    msgno: new types_1.Numc({ length: 3 }),
    msgty: new types_1.Character(1),
    msgv1: new types_1.Character(50),
    msgv2: new types_1.Character(50),
    msgv3: new types_1.Character(50),
    msgv4: new types_1.Character(50),
    subrc: new types_1.Integer(),
    sysid: new types_1.Character(3).set("ABC"),
    tabix: new types_1.Integer(),
    tfill: new types_1.Integer(),
    timlo: new types_1.Time(),
    tzone: new types_1.Integer(),
    uname: new types_1.Character(12).set("USERNAME"),
    uzeit: new types_1.Time(),
});

},{"../types":151}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tan = void 0;
/* eslint-disable radix */
const types_1 = require("../types");
function tan(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else if (input.val instanceof types_1.Float) {
        num_in = input.val.getRaw();
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.tan(num_in);
}
exports.tan = tan;

},{"../types":151}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_lower = void 0;
const types_1 = require("../types");
function to_lower(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    return new types_1.String().set(val.toLowerCase());
}
exports.to_lower = to_lower;

},{"../types":151}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_mixed = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const throw_error_1 = require("../throw_error");
const types_1 = require("../types");
function to_mixed(input) {
    let sep = input.sep;
    if (sep === undefined) {
        sep = "_";
    }
    if (typeof sep !== "string") {
        sep = sep.get();
    }
    if (sep.length === 0) {
        (0, throw_error_1.throwError)("CX_SY_STRG_PAR_VAL");
    }
    const min = 1;
    if (min < 0) {
        (0, throw_error_1.throwError)("CX_SY_STRG_PAR_VAL");
    }
    let val = input.val;
    if (typeof val !== "string") {
        val = val.get();
    }
    val = val.substring(0, min) + val.substring(min).toLowerCase();
    if (input.case) {
        if (typeof input.case === "string") {
            if (input.case === input.case.toLowerCase()) {
                val = val.substring(0, 1).toLowerCase() + val.substring(1);
            }
        }
        else {
            if (input.case.get() === input.case.get().toLowerCase()) {
                val = val.substring(0, 1).toLowerCase() + val.substring(1);
            }
        }
    }
    const length = sep.length;
    const regex = new RegExp(sep + "\\w");
    while (val.match(regex)) {
        val = val.replace(regex, (x) => {
            return x.substring(length).toUpperCase();
        });
    }
    return new types_1.String().set(val);
}
exports.to_mixed = to_mixed;

},{"../throw_error":141,"../types":151}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to_upper = void 0;
const types_1 = require("../types");
function to_upper(input) {
    const val = typeof input.val === "string" ? input.val : input.val.get();
    return new types_1.String().set(val.toUpperCase());
}
exports.to_upper = to_upper;

},{"../types":151}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
const string_1 = require("../types/string");
function translate(input) {
    let val = typeof input.val === "string" ? input.val : input.val.get();
    const from = typeof input.from === "string" ? input.from : input.from.get();
    const to = typeof input.to === "string" ? input.to : input.to.get();
    const fromSplit = from.split("");
    const toSplit = to.split("");
    const chars = {};
    for (let i = 0; i < fromSplit.length; i++) {
        chars[fromSplit[i]] = toSplit[i] || "";
    }
    const reg = new RegExp("[" + from + "]", "g");
    val = val.replace(reg, m => chars[m] || "");
    return new string_1.String().set(val);
}
exports.translate = translate;

},{"../types/string":155}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trunc = void 0;
function trunc(input) {
    let num_in = undefined;
    if (typeof input.val === "number") {
        num_in = input.val;
    }
    else if (typeof input.val === "string") {
        num_in = parseFloat(input.val);
    }
    else {
        num_in = parseFloat(input.val.get().toString());
    }
    return Math.trunc(num_in);
}
exports.trunc = trunc;

},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xstrlen = void 0;
const types_1 = require("../types");
function xstrlen(input) {
    if (typeof input.val === "string") {
        return new types_1.Integer().set(input.val.length / 2);
    }
    else {
        return new types_1.Integer().set(input.val.get().length / 2);
    }
}
exports.xstrlen = xstrlen;

},{"../types":151}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassicError = void 0;
class ClassicError extends Error {
    constructor(input) {
        super();
        this.classic = input.classic;
    }
}
exports.ClassicError = ClassicError;

},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = void 0;
const types_1 = require("./types");
function clone(obj) {
    if (null == obj || "object" != typeof obj) {
        return obj;
    }
    if (obj instanceof types_1.ABAPObject) {
        const n = new types_1.ABAPObject();
        n.set(obj.get());
        // @ts-ignore
        return n;
    }
    else if (obj instanceof types_1.DataReference) {
        const n = new types_1.DataReference(obj.getType());
        n.assign(obj.getPointer());
        // @ts-ignore
        return n;
    }
    // @ts-ignore
    const copy = new obj.constructor();
    for (const attr in obj) {
        // @ts-ignore
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(attr)) {
            if (null == obj[attr] || "object" != typeof obj[attr]) {
                copy[attr] = obj[attr];
            }
            else {
                copy[attr] = clone(obj[attr]);
            }
        }
    }
    return copy;
}
exports.clone = clone;

},{"./types":151}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assigned = void 0;
function assigned(val) {
    return val.isAssigned();
}
exports.assigned = assigned;

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.between = void 0;
const ge_1 = require("./ge");
const le_1 = require("./le");
function between(left, and1, and2) {
    return (0, ge_1.ge)(left, and1) && (0, le_1.le)(left, and2);
}
exports.between = between;

},{"./ge":57,"./le":63}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ca = void 0;
function ca(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    if (l === "") {
        l = " ";
    }
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else {
        r = right.get().toString();
    }
    const characters = r.split("");
    let fdpos = 0;
    for (const c of l.split("")) {
        if (characters.includes(c) === true) {
            // @ts-ignore
            abap.builtin.sy.get().fdpos.set(fdpos);
            return true;
        }
        fdpos++;
    }
    // @ts-ignore
    abap.builtin.sy.get().fdpos.set(fdpos);
    return false;
}
exports.ca = ca;

},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = void 0;
const co_1 = require("./co");
function cn(left, right) {
    return (0, co_1.co)(left, right) === false;
}
exports.cn = cn;

},{"./co":53}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.co = void 0;
const types_1 = require("../types");
function co(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else if (right instanceof types_1.Structure) {
        r = Object.values(right.get()).map((a) => a.get()).join("");
    }
    else {
        r = right.get().toString();
    }
    const characters = r.split("");
    let fdpos = 0;
    for (const c of l.split("")) {
        if (characters.includes(c) === false) {
            // @ts-ignore
            abap.builtin.sy.get().fdpos.set(fdpos);
            return false;
        }
        fdpos++;
    }
    // @ts-ignore
    abap.builtin.sy.get().fdpos.set(fdpos);
    return true;
}
exports.co = co;

},{"../types":151}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cp = void 0;
const types_1 = require("../types");
function cp(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else if (left instanceof types_1.Structure) {
        l = left.getCharacter();
    }
    else if (left instanceof types_1.FieldSymbol) {
        if (left.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return cp(left.getPointer(), right);
    }
    else {
        l = left.get().toString();
    }
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else {
        r = right.get().toString();
    }
    r = r.replace(/\\/g, "\\\\");
    r = r.replace(/\[/g, "\\[");
    r = r.replace(/\]/g, "\\]");
    r = r.replace(/\}/g, "\\}");
    r = r.replace(/\{/g, "\\{");
    r = r.replace(/\?/g, "\\?");
    r = r.replace(/\(/g, "\\(");
    r = r.replace(/\)/g, "\\)");
    r = r.replace(/\./g, "\\.");
    r = r.replace(/\|/g, "\\|");
    r = r.replace(/\$/g, "\\$");
    r = r.replace(/\^/g, "\\^");
    r = r.replace(/#\*/g, "\\u{002A}");
    r = r.replace(/#\+/g, "\\u{002B}");
    r = r.replace(/\*/g, "[\\s\\S]*");
    r = r.replace(/\+/g, "[\\s\\S]");
    const reg = new RegExp("^" + r + "$", "iu");
    return l.match(reg) !== null;
}
exports.cp = cp;

},{"../types":151}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cs = void 0;
function cs(left, right) {
    let l = "";
    if (typeof left === "number" || typeof left === "string") {
        l = left.toString();
    }
    else {
        l = left.get().toString();
    }
    l = l.toUpperCase();
    let r = "";
    if (typeof right === "string") {
        r = right.toString();
    }
    else {
        r = right.get().toString();
    }
    r = r.toUpperCase();
    const index = l.indexOf(r);
    if (index < 0) {
        // @ts-ignore
        abap.builtin.sy.get().fdpos.set(l.length);
        return false;
    }
    else {
        // @ts-ignore
        abap.builtin.sy.get().fdpos.set(index);
        return true;
    }
}
exports.cs = cs;

},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = void 0;
const types_1 = require("../types");
function compareTables(left, right) {
    const leftArray = left.array();
    const rightArray = right.array();
    if (leftArray.length !== rightArray.length) {
        return false;
    }
    for (let i = 0; i < leftArray.length; i++) {
        const rowCompare = eq(leftArray[i], rightArray[i]);
        if (rowCompare === false) {
            return false;
        }
    }
    return true;
}
function eq(left, right) {
    /*
      console.dir(left);
      console.dir(right);
    */
    if (right instanceof types_1.FieldSymbol) {
        return eq(left, right.getPointer());
    }
    else if (left instanceof types_1.FieldSymbol) {
        return eq(left.getPointer(), right);
    }
    if (left instanceof types_1.Table || right instanceof types_1.Table) {
        if (left instanceof types_1.Table && right instanceof types_1.Table) {
            return compareTables(left, right);
        }
        else {
            // this happens in dynamic/ANY typed scenarios?
            return false;
        }
    }
    if (left instanceof types_1.Structure || right instanceof types_1.Structure) {
        if (!(right instanceof types_1.Structure)) {
            return eq(left.getCharacter(), right);
        }
        if (!(left instanceof types_1.Structure)) {
            return eq(left, right.getCharacter());
        }
        const l = left.get();
        const r = right.get();
        const leftKeys = Object.keys(l);
        const rightKeys = Object.keys(r);
        if (leftKeys.length !== rightKeys.length) {
            return false;
        }
        for (const k of leftKeys) {
            const e = eq(l[k], r[k]);
            if (e === false) {
                return false;
            }
        }
        return true;
    }
    let l = undefined;
    if (left instanceof types_1.Character) {
        l = left.getTrimEnd();
    }
    else if (typeof left === "object") {
        l = left.get();
    }
    else {
        l = left;
    }
    let r = undefined;
    if (right instanceof types_1.Character) {
        r = right.getTrimEnd();
    }
    else if (typeof right === "object") {
        r = right.get();
    }
    else {
        r = right;
    }
    if (right instanceof types_1.Hex && typeof l === "number") {
        r = parseInt(right.get(), 16);
    }
    else if (left instanceof types_1.Hex && typeof r === "number") {
        l = parseInt(left.get(), 16);
    }
    if (right instanceof types_1.Float && left instanceof types_1.Float) {
        r = right.getRaw();
        l = left.getRaw();
    }
    else if (right instanceof types_1.Float && typeof l === "number") {
        r = right.getRaw();
    }
    else if (left instanceof types_1.Float) {
        if (typeof r === "number") {
            l = left.getRaw();
        }
        else if (typeof r === "string") {
            l = left.getRaw();
            r = Number(r);
        }
    }
    if (right instanceof types_1.Numc && left instanceof types_1.Integer) {
        l = left.get();
        r = parseInt(right.get(), 10);
    }
    else if (right instanceof types_1.Integer && left instanceof types_1.Numc) {
        r = right.get();
        l = parseInt(left.get(), 10);
    }
    // assumption: typically no casts are required, so start checking if the types doesnt match
    if (typeof l !== typeof r) {
        if (typeof l === "string" && typeof r === "number") {
            r = r.toString();
        }
        else if (typeof l === "number" && typeof r === "string") {
            if (r === "") {
                r = 0;
            }
            else if (r.includes(".")) {
                r = parseFloat(r);
            }
            else {
                r = parseInt(r, 10);
            }
        }
    }
    /*
      console.dir(l);
      console.dir(r);
    */
    return l === r;
}
exports.eq = eq;

},{"../types":151}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ge = void 0;
const _1 = require(".");
function ge(left, right) {
    return (0, _1.gt)(left, right) || (0, _1.eq)(left, right);
}
exports.ge = ge;

},{".":60}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gt = void 0;
const types_1 = require("../types");
const integer_1 = require("../types/integer");
function gt(left, right) {
    if (left instanceof types_1.FieldSymbol) {
        if (left.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return gt(left.getPointer(), right);
    }
    else if (right instanceof types_1.FieldSymbol) {
        if (right.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return gt(left, right.getPointer());
    }
    if (left instanceof types_1.Table || right instanceof types_1.Table) {
        throw "runtime_todo, gt TABLE";
    }
    if (left instanceof types_1.Hex || right instanceof types_1.Hex) {
        return gt_with_hex(left, right);
    }
    let l = undefined;
    if (typeof left === "number" || typeof left === "string") {
        l = left;
    }
    else if (left instanceof types_1.Float || left instanceof types_1.DecFloat34) {
        l = left.getRaw();
    }
    else {
        l = left.get();
    }
    let r = undefined;
    if (typeof right === "number" || typeof right === "string") {
        r = right;
    }
    else if (right instanceof types_1.Float || right instanceof types_1.DecFloat34) {
        r = right.getRaw();
    }
    else {
        r = right.get();
    }
    if (typeof l === "string" && typeof r === "number") {
        if (l === "") {
            l = 0;
        }
        else {
            l = parseInt(l, 10);
        }
    }
    else if (typeof l === "number" && typeof r === "string") {
        if (r === "") {
            r = 0;
        }
        else {
            r = parseInt(r, 10);
        }
    }
    if (l === undefined) {
        return true; // todo, not sure this is correct
    }
    if (r === undefined) {
        return true; // todo, not sure this is correct
    }
    return l > r;
}
exports.gt = gt;
function gt_with_hex(left, right) {
    const left_hex = get_hex_from_parameter(left);
    const right_hex = get_hex_from_parameter(right);
    return left_hex > right_hex;
}
function get_hex_from_parameter(comparison_part) {
    let hex_from_parameter = "";
    switch (typeof comparison_part) {
        case "number":
            hex_from_parameter = comparison_part.toString(16);
            break;
        case "string":
            hex_from_parameter = comparison_part.split("")
                .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("");
            break;
        case "object":
            if (comparison_part instanceof types_1.Hex) {
                hex_from_parameter = comparison_part.get();
            }
            else if (comparison_part instanceof integer_1.Integer) {
                hex_from_parameter = comparison_part.get().toString(16).toUpperCase();
                if (hex_from_parameter.length % 2 === 1) {
                    hex_from_parameter = "0" + hex_from_parameter;
                }
            }
            else if (comparison_part instanceof types_1.XString) {
                hex_from_parameter = comparison_part.get();
            }
            else {
                throw "runtime_todo, gt hex1";
            }
            break;
        default:
            throw "runtime_todo, gt hex2";
    }
    return hex_from_parameter;
}

},{"../types":151,"../types/integer":152}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareIn = void 0;
const cp_1 = require("./cp");
const eq_1 = require("./eq");
function compareIn(left, right) {
    if (right.array().length === 0) {
        return true;
    }
    for (const row of right.array()) {
        if ((0, eq_1.eq)(row.get()["sign"], "I") && (0, eq_1.eq)(row.get()["option"], "EQ")) {
            if ((0, eq_1.eq)(row.get()["low"], left)) {
                return true;
            }
        }
        else if ((0, eq_1.eq)(row.get()["sign"], "I") && (0, eq_1.eq)(row.get()["option"], "CP")) {
            if ((0, cp_1.cp)(left, row.get()["low"])) {
                return true;
            }
        }
        else {
            console.dir(row);
            throw "compareIn todo";
        }
    }
    return false;
}
exports.compareIn = compareIn;

},{"./cp":54,"./eq":56}],60:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.in = void 0;
__exportStar(require("./assigned"), exports);
__exportStar(require("./between"), exports);
__exportStar(require("./ca"), exports);
__exportStar(require("./cn"), exports);
__exportStar(require("./co"), exports);
__exportStar(require("./cp"), exports);
__exportStar(require("./cs"), exports);
__exportStar(require("./eq"), exports);
__exportStar(require("./ge"), exports);
__exportStar(require("./gt"), exports);
__exportStar(require("./initial"), exports);
__exportStar(require("./instance_of"), exports);
__exportStar(require("./le"), exports);
__exportStar(require("./lt"), exports);
__exportStar(require("./m"), exports);
__exportStar(require("./na"), exports);
__exportStar(require("./ne"), exports);
__exportStar(require("./np"), exports);
__exportStar(require("./ns"), exports);
__exportStar(require("./o"), exports);
__exportStar(require("./z"), exports);
var in_1 = require("./in");
Object.defineProperty(exports, "in", { enumerable: true, get: function () { return in_1.compareIn; } });

},{"./assigned":49,"./between":50,"./ca":51,"./cn":52,"./co":53,"./cp":54,"./cs":55,"./eq":56,"./ge":57,"./gt":58,"./in":59,"./initial":61,"./instance_of":62,"./le":63,"./lt":64,"./m":65,"./na":66,"./ne":67,"./np":68,"./ns":69,"./o":70,"./z":71}],61:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial = void 0;
const types_1 = require("../types");
function initial(val) {
    // todo, refactor? add as method in each type instead?
    if (val instanceof types_1.Table) {
        return val.array().length === 0;
    }
    else if (val instanceof types_1.DataReference) {
        return val.getPointer() === undefined;
    }
    else if (val instanceof types_1.Date) {
        return val.get() === "00000000";
    }
    else if (val instanceof types_1.Numc) {
        return val.get().match(/^0+$/) !== null;
    }
    else if (val instanceof types_1.Hex) {
        return val.get().match(/^0+$/) !== null;
    }
    else if (val instanceof types_1.Time) {
        return val.get() === "000000";
    }
    else if (val instanceof types_1.Character) {
        return val.get().match(/^ *$/) !== null;
    }
    else if (val instanceof types_1.FieldSymbol && val.getPointer() === undefined) {
        throw "FS not assigned";
    }
    else if (val instanceof types_1.FieldSymbol) {
        const res = initial(val.getPointer());
        return res;
    }
    if (typeof val === "string") {
        return val === "";
    }
    else if (typeof val === "number") {
        return val === 0;
    }
    const value = val.get();
    if (typeof value === "string") {
        return value === "";
    }
    else if (typeof value === "number") {
        return value === 0;
    }
    else if (val instanceof types_1.ABAPObject) {
        return value === undefined;
    }
    else if (typeof value === "object") {
        for (const f of Object.keys(value)) {
            if (initial(value[f]) === false) {
                return false;
            }
        }
        return true;
    }
    else {
        throw new Error("runtime, initial, missing implementation");
    }
}
exports.initial = initial;

},{"../types":151}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance_of = void 0;
function instance_of(val, cname) {
    return val.get() instanceof cname;
}
exports.instance_of = instance_of;

},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.le = void 0;
const _1 = require(".");
function le(left, right) {
    return (0, _1.lt)(left, right) || (0, _1.eq)(left, right);
}
exports.le = le;

},{".":60}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lt = void 0;
const gt_1 = require("./gt");
function lt(left, right) {
    return (0, gt_1.gt)(right, left);
}
exports.lt = lt;

},{"./gt":58}],65:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = exports.hexToBinary = void 0;
function hexToBinary(input) {
    let ret = "";
    const hex = input.get();
    for (let index = 0; index < hex.length / 2; index++) {
        const byte = hex.substring(index * 2, index * 2 + 2);
        ret += parseInt(byte, 16).toString(2).padStart(8, "0");
    }
    return ret;
}
exports.hexToBinary = hexToBinary;
// bitwise compare
function m(operand1, operand2) {
    let operand1Bits = hexToBinary(operand1);
    const operand2Bits = hexToBinary(operand2);
    if (operand1Bits.length < operand2Bits.length) {
        operand1Bits = operand1Bits.padEnd(operand2Bits.length, "0");
    }
    let oneFound = false;
    let zeroFound = false;
    for (let index = 0; index < operand2Bits.length; index++) {
        const o1bit = operand1Bits.substring(index, index + 1);
        const o2bit = operand2Bits.substring(index, index + 1);
        if (o2bit === "1") {
            if (o1bit === "1") {
                oneFound = true;
            }
            else {
                zeroFound = true;
            }
        }
    }
    return oneFound && zeroFound;
}
exports.m = m;

},{}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.na = void 0;
const ca_1 = require("./ca");
function na(left, right) {
    return !(0, ca_1.ca)(left, right);
}
exports.na = na;

},{"./ca":51}],67:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ne = void 0;
const eq_1 = require("./eq");
function ne(left, right) {
    return !(0, eq_1.eq)(left, right);
}
exports.ne = ne;

},{"./eq":56}],68:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.np = void 0;
const cp_1 = require("./cp");
function np(left, right) {
    return !(0, cp_1.cp)(left, right);
}
exports.np = np;

},{"./cp":54}],69:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ns = void 0;
const cs_1 = require("./cs");
function ns(left, right) {
    return !(0, cs_1.cs)(left, right);
}
exports.ns = ns;

},{"./cs":55}],70:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.o = void 0;
const m_1 = require("./m");
// bitwise compare
function o(operand1, operand2) {
    let operand1Bits = (0, m_1.hexToBinary)(operand1);
    const operand2Bits = (0, m_1.hexToBinary)(operand2);
    if (operand1Bits.length < operand2Bits.length) {
        operand1Bits = operand1Bits.padEnd(operand2Bits.length, "0");
    }
    //  let oneFound = false;
    let zeroFound = false;
    for (let index = 0; index < operand2Bits.length; index++) {
        const o1bit = operand1Bits.substring(index, index + 1);
        const o2bit = operand2Bits.substring(index, index + 1);
        if (o2bit === "1") {
            if (o1bit === "1") {
                //        oneFound = true;
            }
            else {
                zeroFound = true;
            }
        }
    }
    return zeroFound === false;
}
exports.o = o;

},{"./m":65}],71:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
const m_1 = require("./m");
// bitwise compare
function z(operand1, operand2) {
    let operand1Bits = (0, m_1.hexToBinary)(operand1);
    const operand2Bits = (0, m_1.hexToBinary)(operand2);
    if (operand1Bits.length < operand2Bits.length) {
        operand1Bits = operand1Bits.padEnd(operand2Bits.length, "0");
    }
    let oneFound = false;
    //  let zeroFound = false;
    for (let index = 0; index < operand2Bits.length; index++) {
        const o1bit = operand1Bits.substring(index, index + 1);
        const o2bit = operand2Bits.substring(index, index + 1);
        if (o2bit === "1") {
            if (o1bit === "1") {
                oneFound = true;
            }
            else {
                //        zeroFound = true;
            }
        }
    }
    return oneFound === false;
}
exports.z = z;

},{"./m":65}],72:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = void 0;
class Console {
    constructor() {
        this.data = "";
    }
    clear() {
        this.data = "";
    }
    add(data) {
        this.data = this.data + data;
    }
    get() {
        return this.data;
    }
    getTrimmed() {
        return this.data.split("\n").map(a => a.trimEnd()).join("\n");
    }
}
exports.Console = Console;

},{}],73:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
class Context {
    constructor() {
        // DEFAULT and secondary database connections
        this.databaseConnections = {};
        this.RFCDestinations = {};
    }
    defaultDB() {
        if (this.databaseConnections["DEFAULT"] === undefined) {
            throw new Error("Runtime, database not initialized");
        }
        return this.databaseConnections["DEFAULT"];
    }
}
exports.Context = Context;

},{}],74:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],75:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandDynamic = void 0;
const types_1 = require("./types");
function expandDynamic(code, ev) {
    if (code === "") {
        return "1 = 1";
    }
    else {
        // todo more here, this is just one simple case,
        const match = code.match(/ <(\w+)>/);
        if (match && match[1]) {
            const name = "fs_" + match[1] + "_";
            const found = ev(name);
            if (found instanceof types_1.FieldSymbol) {
                code = code.replace(/ <(\w+)>/, "'" + found.get() + "'");
            }
        }
        return code;
    }
}
exports.expandDynamic = expandDynamic;

},{"./types":151}],76:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandIN = void 0;
// note: must always return an expression, never return empty string
function expandIN(fieldName, table) {
    var _a, _b, _c;
    let ret = "";
    if (table.array().length === 0) {
        ret = fieldName + " NOT IN ()";
    }
    else {
        ret = fieldName + " IN (";
        const values = [];
        for (const row of table.array()) {
            if (((_a = row.get().sign) === null || _a === void 0 ? void 0 : _a.get()) !== "I" || ((_b = row.get().option) === null || _b === void 0 ? void 0 : _b.get()) !== "EQ") {
                throw "Error: IN, only I EQ supported for now";
            }
            values.push("'" + ((_c = row.get().low) === null || _c === void 0 ? void 0 : _c.get().replace(/'/g, "''")) + "'");
        }
        ret += values.join(",") + ")";
    }
    return ret;
}
exports.expandIN = expandIN;

},{}],77:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABAP = exports.DB = exports.types = exports.RFC = exports.UnitTestResult = void 0;
const console_1 = require("./console");
const context_1 = require("./context");
const offset_length_1 = require("./offset_length");
const statements_1 = require("./statements");
const template_formatting_1 = require("./template_formatting");
const unit_test_1 = require("./unit_test");
Object.defineProperty(exports, "UnitTestResult", { enumerable: true, get: function () { return unit_test_1.UnitTestResult; } });
const builtin = require("./builtin");
const compare = require("./compare");
const DB = require("./db/db");
exports.DB = DB;
const operators = require("./operators");
const RFC = require("./rfc");
exports.RFC = RFC;
const types = require("./types");
exports.types = types;
const expand_in_1 = require("./expand_in");
const expand_dynamic_1 = require("./expand_dynamic");
const classic_error_1 = require("./classic_error");
class ABAP {
    constructor() {
        // global objects
        this.FunctionModules = {};
        this.Classes = {};
        this.Interfaces = {};
        this.DDIC = {};
        this.TypePools = {};
        this.SMIM = {};
        this.W3MI = {};
        this.types = types;
        this.builtin = builtin;
        this.operators = operators;
        this.compare = compare;
        this.OffsetLength = offset_length_1.OffsetLength;
        this.templateFormatting = template_formatting_1.templateFormatting;
        this.expandIN = expand_in_1.expandIN;
        this.expandDynamic = expand_dynamic_1.expandDynamic;
        this.ClassicError = classic_error_1.ClassicError;
        this.context = new context_1.Context();
        this.console = new console_1.Console();
        this.context.console = this.console;
        this.statements = new statements_1.Statements(this.context);
        // todo, this should not be a singleton, it should be part of this instance
        // todo, move to context
        builtin.sy.get().subrc.set(0);
        builtin.sy.get().tabix.set(0);
        builtin.sy.get().index.set(0);
        this.statements.getTime({ sy: builtin.sy });
    }
}
exports.ABAP = ABAP;

},{"./builtin":17,"./classic_error":47,"./compare":60,"./console":72,"./context":73,"./db/db":74,"./expand_dynamic":75,"./expand_in":76,"./offset_length":78,"./operators":89,"./rfc":94,"./statements":116,"./template_formatting":140,"./types":151,"./unit_test":161}],78:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffsetLength = void 0;
const types_1 = require("./types");
class OffsetLength {
    constructor(obj, options) {
        this.obj = obj;
        this.isHex = obj instanceof types_1.Hex || obj instanceof types_1.XString;
        if (options.offset) {
            if (typeof options.offset === "number") {
                this.offset = options.offset;
            }
            else {
                this.offset = options.offset.get();
            }
            if (this.isHex) {
                this.offset *= 2;
            }
        }
        if (options.length) {
            if (typeof options.length === "number") {
                this.length = options.length;
            }
            else {
                this.length = options.length.get();
            }
            if (this.isHex) {
                this.length *= 2;
            }
        }
    }
    get() {
        return this.obj.getOffset({ offset: this.offset, length: this.length }).get();
    }
    set(value) {
        let val = "";
        if (typeof value === "string") {
            val = value;
        }
        else if (typeof value === "number") {
            val = value + "";
        }
        else if (value instanceof types_1.Integer) {
            val = value.get() + "";
            if (this.isHex) {
                val = Number(val).toString(16);
            }
        }
        else {
            val = value.get() + "";
        }
        let old = this.obj instanceof types_1.Structure ? this.obj.getCharacter() : this.obj.get();
        if (this.obj instanceof types_1.Character) {
            old = old.padEnd(this.obj.getLength(), " ");
        }
        if (this.length) {
            val = val.substr(0, this.length);
            if (this.isHex || this.obj instanceof types_1.Time) {
                val = val.padStart(this.length, "0");
            }
        }
        if (this.length && this.offset) {
            old = old.substr(0, this.offset) + val + old.substr(this.offset + this.length);
        }
        else if (this.length) {
            old = val + old.substr(this.length);
        }
        else if (this.offset) {
            old = old.substr(0, this.offset) + val;
        }
        old = old.trimEnd();
        if (this.obj instanceof types_1.Character) {
            old = old.padEnd(this.obj.getLength(), " ");
        }
        this.obj.set(old);
    }
}
exports.OffsetLength = OffsetLength;

},{"./types":151}],79:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_bit_operation_chunks = void 0;
function get_bit_operation_chunks(left, right) {
    const ret = [];
    let leftFull = left.get();
    const leftLen = leftFull.length;
    leftFull = leftFull.padEnd(Math.ceil(leftLen / 2) * 2, "0");
    let rightFull = right.get();
    const rightLen = rightFull.length;
    rightFull = rightFull.padEnd(Math.ceil(rightLen / 2) * 2, "0");
    const maxLen = leftFull.length > rightFull.length ? leftFull.length : rightFull.length;
    // Using 3-byte chunkgs (6 hex positions) to avoid JavaScript negative values for extreme cases
    const chunks = maxLen / 6;
    for (let pass = chunks; pass > 0; pass--) {
        const chunkStart = maxLen - pass * 6;
        const chunkEnd = maxLen - (pass - 1) * 6;
        let leftSlice = leftFull.slice(chunkStart, chunkEnd);
        let rightSlice = rightFull.slice(chunkStart, chunkEnd);
        const chunkLen = leftSlice.length > rightSlice.length ? leftSlice.length : rightSlice.length;
        leftSlice = leftSlice.padEnd(chunkLen, "0");
        rightSlice = rightSlice.padEnd(chunkLen, "0");
        const leftChunk = parseInt(leftSlice, 16);
        const rightChunk = parseInt(rightSlice, 16);
        ret.push({ leftChunk: leftChunk, rightChunk: rightChunk, chunkLen: chunkLen });
    }
    return ret;
}
exports.get_bit_operation_chunks = get_bit_operation_chunks;

},{}],80:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const types_1 = require("../types");
const xstring_1 = require("../types/xstring");
function parse(val) {
    if (typeof val === "number") {
        return val;
    }
    else if (typeof val === "string") {
        if (val.includes(".")) {
            return parseFloat(val);
        }
        else {
            return parseInt(val, 10);
        }
    }
    else if (val instanceof types_1.Float) {
        return val.getRaw();
    }
    else if (val instanceof xstring_1.XString || val instanceof types_1.Hex) {
        if (val.get() === "") {
            return 0;
        }
        let num = parseInt(val.get(), 16);
        // handle two complement,
        if (val instanceof types_1.Hex && val.getLength() >= 4) {
            const maxVal = Math.pow(2, val.get().length / 2 * 8);
            if (num > maxVal / 2 - 1) {
                num = num - maxVal;
            }
        }
        return num;
    }
    else if (val instanceof types_1.Time || val instanceof types_1.Date) {
        return val.getNumeric();
    }
    else if (val instanceof types_1.DecFloat34) {
        return val.getRaw();
    }
    else {
        return parse(val.get());
    }
}
exports.parse = parse;

},{"../types":151,"../types/xstring":160}],81:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const types_1 = require("../types");
const string_1 = require("../types/string");
const _parse_1 = require("./_parse");
function add(left, right) {
    if (left instanceof types_1.FieldSymbol) {
        if (left.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return add(left.getPointer(), right);
    }
    if (right instanceof types_1.FieldSymbol) {
        if (right.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return add(left, right.getPointer());
    }
    if (left instanceof types_1.Integer && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() + right.get());
    }
    else if (typeof left === "number" && typeof right === "number"
        && Number.isInteger(left) && Number.isInteger(right)) {
        return new types_1.Integer().set(left + right);
    }
    else if (typeof left === "number" && Number.isInteger(left) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left + right.get());
    }
    else if (typeof right === "number" && Number.isInteger(right) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() + right);
    }
    else if ((left instanceof string_1.String || left instanceof types_1.Character) && Number.isInteger(Number(left.get())) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(Number.parseInt(left.get(), 10) + right.get());
    }
    else if ((right instanceof string_1.String || right instanceof types_1.Character) && Number.isInteger(Number(right)) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() + Number.parseInt(right.get(), 10));
    }
    const ret = new types_1.Float().set((0, _parse_1.parse)(left) + (0, _parse_1.parse)(right));
    return ret;
}
exports.add = add;

},{"../types":151,"../types/string":155,"./_parse":80}],82:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitand = void 0;
/*eslint no-bitwise: ["error", { "allow": ["&"] }] */
const types_1 = require("../types");
const _bit_operations_1 = require("./_bit_operations");
function bitand(left, right) {
    let and = "";
    const chunks = (0, _bit_operations_1.get_bit_operation_chunks)(left, right);
    // eslint-disable-next-line no-cond-assign
    for (let i = 0, chunk; chunk = chunks[i]; i++) {
        and = and + (chunk.leftChunk & chunk.rightChunk).toString(16).toUpperCase().padStart(chunk.chunkLen, "0");
    }
    const ret = new types_1.XString();
    ret.set(and);
    return ret;
}
exports.bitand = bitand;

},{"../types":151,"./_bit_operations":79}],83:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitnot = void 0;
/*eslint no-bitwise: ["error", { "allow": ["~"] }] */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT
const types_1 = require("../types");
function bitnot(right) {
    const right16 = parseInt(right.get(), 16);
    const not = ~right16;
    const ret = new types_1.Hex({ length: right.get().length / 2 });
    ret.set(not);
    return ret;
}
exports.bitnot = bitnot;

},{"../types":151}],84:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitor = void 0;
/*eslint no-bitwise: ["error", { "allow": ["|"] }] */
const types_1 = require("../types");
const _bit_operations_1 = require("./_bit_operations");
function bitor(left, right) {
    let or = "";
    const chunks = (0, _bit_operations_1.get_bit_operation_chunks)(left, right);
    // eslint-disable-next-line no-cond-assign
    for (let i = 0, chunk; chunk = chunks[i]; i++) {
        or = or + (chunk.leftChunk | chunk.rightChunk).toString(16).toUpperCase().padStart(chunk.chunkLen, "0");
    }
    const ret = new types_1.XString();
    ret.set(or);
    return ret;
}
exports.bitor = bitor;

},{"../types":151,"./_bit_operations":79}],85:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bitxor = void 0;
/*eslint no-bitwise: ["error", { "allow": ["^"] }] */
const types_1 = require("../types");
const _bit_operations_1 = require("./_bit_operations");
function bitxor(left, right) {
    let xor = "";
    const chunks = (0, _bit_operations_1.get_bit_operation_chunks)(left, right);
    // eslint-disable-next-line no-cond-assign
    for (let i = 0, chunk; chunk = chunks[i]; i++) {
        xor = xor + (chunk.leftChunk ^ chunk.rightChunk).toString(16).toUpperCase().padStart(chunk.chunkLen, "0");
    }
    const ret = new types_1.XString();
    ret.set(xor);
    return ret;
}
exports.bitxor = bitxor;

},{"../types":151,"./_bit_operations":79}],86:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
const types_1 = require("../types");
function concat(left, right) {
    if (Array.isArray(left)) {
        // used in ampersand concatenation
        let res = concat(left[0], left[1]);
        for (let i = 2; i < left.length; i++) {
            res = concat(res, left[i]);
        }
        return res;
    }
    let val = "";
    if (typeof left === "string" || typeof left === "number") {
        val += left;
    }
    else if (left instanceof types_1.Character) {
        val += left.getTrimEnd();
    }
    else {
        val += left.get();
    }
    if (typeof right === "string" || typeof right === "number") {
        val += right;
    }
    else if (right instanceof types_1.Character) {
        val += right.getTrimEnd();
    }
    else {
        val += right.get();
    }
    return new types_1.String().set(val);
}
exports.concat = concat;

},{"../types":151}],87:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.div = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
function div(left, right) {
    const l = (0, _parse_1.parse)(left);
    const r = (0, _parse_1.parse)(right);
    const ret = new types_1.Integer().set(Math.floor(l / r));
    return ret;
}
exports.div = div;

},{"../types":151,"./_parse":80}],88:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divide = void 0;
const throw_error_1 = require("../throw_error");
const types_1 = require("../types");
const _parse_1 = require("./_parse");
// todo, this will only work when the target value is an integer?
function divide(left, right) {
    const r = (0, _parse_1.parse)(right);
    if (r === 0) {
        (0, throw_error_1.throwError)("CX_SY_ZERODIVIDE");
    }
    const val = (0, _parse_1.parse)(left) / r;
    return new types_1.Float().set(val);
}
exports.divide = divide;

},{"../throw_error":141,"../types":151,"./_parse":80}],89:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./add"), exports);
__exportStar(require("./div"), exports);
__exportStar(require("./divide"), exports);
__exportStar(require("./minus"), exports);
__exportStar(require("./mod"), exports);
__exportStar(require("./multiply"), exports);
__exportStar(require("./power"), exports);
__exportStar(require("./bit-and"), exports);
__exportStar(require("./bit-not"), exports);
__exportStar(require("./bit-or"), exports);
__exportStar(require("./bit-xor"), exports);
__exportStar(require("./concat"), exports);

},{"./add":81,"./bit-and":82,"./bit-not":83,"./bit-or":84,"./bit-xor":85,"./concat":86,"./div":87,"./divide":88,"./minus":90,"./mod":91,"./multiply":92,"./power":93}],90:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minus = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
const string_1 = require("../types/string");
function minus(left, right) {
    if (left instanceof types_1.FieldSymbol) {
        if (left.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return minus(left.getPointer(), right);
    }
    if (right instanceof types_1.FieldSymbol) {
        if (right.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        return minus(left, right.getPointer());
    }
    if (left instanceof types_1.Integer && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() - right.get());
    }
    else if (typeof left === "number" && typeof right === "number"
        && Number.isInteger(left) && Number.isInteger(right)) {
        return new types_1.Integer().set(left - right);
    }
    else if (typeof left === "number" && Number.isInteger(left) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left - right.get());
    }
    else if (typeof right === "number" && Number.isInteger(right) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() - right);
    }
    else if ((left instanceof string_1.String || left instanceof types_1.Character) && Number.isInteger(Number(left.get())) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(Number.parseInt(left.get(), 10) - right.get());
    }
    else if ((right instanceof string_1.String || right instanceof types_1.Character) && Number.isInteger(Number(right)) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() - Number.parseInt(right.get(), 10));
    }
    return new types_1.Float().set((0, _parse_1.parse)(left) - (0, _parse_1.parse)(right));
}
exports.minus = minus;

},{"../types":151,"../types/string":155,"./_parse":80}],91:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
function mod(left, right) {
    const l = (0, _parse_1.parse)(left);
    const r = (0, _parse_1.parse)(right);
    const ret = new types_1.Integer().set(((l % r) + r) % r);
    return ret;
}
exports.mod = mod;

},{"../types":151,"./_parse":80}],92:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiply = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
const string_1 = require("../types/string");
function multiply(left, right) {
    if (left instanceof types_1.Integer && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() * right.get());
    }
    else if (typeof left === "number" && typeof right === "number"
        && Number.isInteger(left) && Number.isInteger(right)) {
        return new types_1.Integer().set(left * right);
    }
    else if (typeof left === "number" && Number.isInteger(left) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(left * right.get());
    }
    else if (typeof right === "number" && Number.isInteger(right) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() * right);
    }
    else if ((left instanceof string_1.String || left instanceof types_1.Character) && Number.isInteger(Number(left.get())) && right instanceof types_1.Integer) {
        return new types_1.Integer().set(Number.parseInt(left.get(), 10) * right.get());
    }
    else if ((right instanceof string_1.String || right instanceof types_1.Character) && Number.isInteger(Number(right)) && left instanceof types_1.Integer) {
        return new types_1.Integer().set(left.get() * Number.parseInt(right.get(), 10));
    }
    return new types_1.Float().set((0, _parse_1.parse)(left) * (0, _parse_1.parse)(right));
}
exports.multiply = multiply;

},{"../types":151,"../types/string":155,"./_parse":80}],93:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.power = void 0;
const types_1 = require("../types");
const _parse_1 = require("./_parse");
function power(left, right) {
    return new types_1.Float().set(Math.pow((0, _parse_1.parse)(left), (0, _parse_1.parse)(right)));
}
exports.power = power;

},{"../types":151,"./_parse":80}],94:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],95:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.append = void 0;
const types_1 = require("../types");
function append(input) {
    if (input.target instanceof types_1.FieldSymbol) {
        input.target = input.target.getPointer();
        if (input.target === undefined) {
            throw "Field symbol not assigned";
        }
    }
    if (input.source instanceof types_1.FieldSymbol) {
        input.source = input.source.getPointer();
    }
    if (input.target === undefined) {
        // short APPEND, use header field
        if (!(input.source instanceof types_1.Table)) {
            throw "APPEND, header, table";
        }
        input.source.append(input.source.getHeader());
        // @ts-ignore
        abap.builtin.sy.get().tabix.set(input.source.array().length);
        return;
    }
    else if (input.lines === true && input.source instanceof types_1.Table) {
        let from = 1;
        if (input.from) {
            from = parseInt(input.from.get() + "", 10);
        }
        let to = input.source.array().length;
        if (input.to) {
            to = parseInt(input.to.get() + "", 10);
        }
        let index = 1;
        for (const a of input.source.array()) {
            if (index < from || index > to) {
                index++;
                continue;
            }
            input.target.append(a);
            index++;
        }
    }
    else {
        const val = input.target.append(input.source);
        if (input.assigning) {
            if (val instanceof types_1.FieldSymbol) {
                input.assigning.assign(val.getPointer());
            }
            else {
                input.assigning.assign(val);
            }
        }
        else if (input.referenceInto) {
            if (val instanceof types_1.FieldSymbol) {
                input.referenceInto.assign(val.getPointer());
            }
            else {
                input.referenceInto.assign(val);
            }
        }
    }
    // @ts-ignore
    abap.builtin.sy.get().tabix.set(input.target.array().length);
}
exports.append = append;

},{"../types":151}],96:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
function assert(input) {
    if (input === false) {
        throw new Error("ASSERT failed");
    }
}
exports.assert = assert;

},{}],97:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = void 0;
const types_1 = require("../types");
function assign(input) {
    var _a;
    //  console.dir(input);
    if (input.dynamicName) {
        if (input.dynamicSource instanceof types_1.FieldSymbol) {
            input.dynamicSource = input.dynamicSource.getPointer();
        }
        if (input.dynamicName.includes("->")) {
            if (input.dynamicSource instanceof types_1.ABAPObject) {
                const split = input.dynamicName.split("->");
                // @ts-ignore
                input.dynamicSource = input.dynamicSource.get()[split[1].toLowerCase()];
            }
            else if (input.dynamicSource instanceof types_1.DataReference) {
                const [_before, after] = input.dynamicName.split("->");
                // @ts-ignore
                input.dynamicSource = input.dynamicSource.get()[after.toLowerCase()];
            }
            else {
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(4);
                return;
            }
        }
        else if (input.dynamicName.includes("=>")) {
            const split = input.dynamicName.split("=>");
            // @ts-ignore
            const clas = abap.Classes[split[0].toUpperCase()];
            if (clas === undefined) {
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(4);
                return;
            }
            if (clas[split[1].toLowerCase()] !== undefined) {
                input.target.assign(clas[split[1].toLowerCase()]);
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(0);
                return;
            }
            else if (clas[split[0].toLowerCase() + "$" + split[1].toLowerCase()] !== undefined) {
                input.target.assign(clas[split[0].toLowerCase() + "$" + split[1].toLowerCase()]);
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(0);
                return;
            }
        }
        if (input.dynamicSource) {
            input.target.assign(input.dynamicSource);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
        }
        else {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
        }
    }
    else if (input.component) {
        if (input.source instanceof types_1.FieldSymbol || input.source instanceof types_1.DataReference) {
            input.source = input.source.getPointer();
            assign(input);
            return;
        }
        else if (!(input.source instanceof types_1.Structure)
            && !(input.source instanceof types_1.Table)) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return;
        }
        let component = input.component;
        if (typeof component !== "string") {
            component = component.get();
        }
        if (input.source instanceof types_1.Table) {
            if (((_a = input.source.getOptions()) === null || _a === void 0 ? void 0 : _a.withHeader) === true) {
                input.source = input.source.getHeader();
            }
            else {
                // result is the table itself, no change of input.source
            }
        }
        let result = undefined;
        if (typeof component === "number") {
            if (component === 0) {
                result = input.source;
            }
            else if (input.source instanceof types_1.Structure) {
                const structure_as_object = input.source.get();
                const keys = Object.keys(structure_as_object);
                const component_name = keys[component - 1];
                result = structure_as_object[component_name];
            }
        }
        else if (!(input.source instanceof types_1.Table)) {
            result = input.source.get()[component.toLowerCase()];
        }
        if (result === undefined) {
            // not a field in the structure
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
        }
        else {
            input.target.assign(result);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
        }
    }
    else {
        //    console.dir(input);
        if (input.source instanceof types_1.FieldSymbol) {
            const pnt = input.source.getPointer();
            if (pnt === undefined) {
                throw new Error("GETWA_NOT_ASSIGNED");
            }
            input.target.assign(pnt);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
        }
        else if (input.source === undefined) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
        }
        else {
            if (input.casting) {
                input.target.setCasting();
            }
            input.target.assign(input.source);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
        }
    }
}
exports.assign = assign;

},{"../types":151}],98:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallFunction = void 0;
class CallFunction {
    constructor(context) {
        this.context = context;
    }
    // note: this is only called if DESTINIATION is supplied
    async callFunction(options) {
        if (options.destination.trim() === "") {
            const param = {
                exporting: options.exporting,
                importing: options.importing,
                tables: options.tables,
                changing: options.changing,
                exceptions: options.exceptions,
            };
            // @ts-ignore
            await abap.FunctionModules[options.name](param);
            return;
        }
        const dest = this.context.RFCDestinations[options.destination];
        if (dest === undefined) {
            throw new Error(`RFC destination ${options.destination} does not exist`);
        }
        await dest.call(options.name, {
            exporting: options.exporting,
            importing: options.importing,
            tables: options.tables,
            changing: options.changing,
            exceptions: options.exceptions,
        });
    }
}
exports.CallFunction = CallFunction;

},{}],99:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cast = void 0;
const compare_1 = require("../compare");
const throw_error_1 = require("../throw_error");
const types_1 = require("../types");
// todo, field symbols as input?
// todo, local classes?
// check with javascript instanceof?
// handling interfaces?
async function cast(target, source) {
    var _a;
    if ((0, compare_1.initial)(source)) {
        target.clear();
        return;
    }
    // eslint-disable-next-line prefer-const
    let checkIntf = true;
    if (target instanceof types_1.FieldSymbol && target.getPointer() === undefined) {
        throw new Error("GETWA_NOT_ASSIGNED");
    }
    let targetName = undefined;
    if (target.getQualifiedName) {
        targetName = (_a = target.getQualifiedName()) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    }
    // @ts-ignore
    let targetClass = abap.Classes[targetName];
    if (targetClass === undefined) {
        // todo, for unit testing,
        // @ts-ignore
        targetClass = abap.Classes["PROG-ZFOOBAR-" + targetName];
    }
    if ((targetClass === null || targetClass === void 0 ? void 0 : targetClass.INTERNAL_TYPE) === "CLAS") {
        // using "instanceof" is probably wrong in some cases,
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
        if (source.get() instanceof targetClass === false) {
            (0, throw_error_1.throwError)("CX_SY_MOVE_CAST_ERROR");
        }
    }
    else if (checkIntf === true && (targetClass === null || targetClass === void 0 ? void 0 : targetClass.INTERNAL_TYPE) === "INTF") {
        const list = source.get().constructor.IMPLEMENTED_INTERFACES;
        const isImplemented = list.some(i => i === targetName);
        if (isImplemented === false) {
            (0, throw_error_1.throwError)("CX_SY_MOVE_CAST_ERROR");
        }
    }
    target.set(source);
}
exports.cast = cast;

},{"../compare":60,"../throw_error":141,"../types":151}],100:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = void 0;
function clear(value) {
    value.clear();
}
exports.clear = clear;

},{}],101:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collect = void 0;
const compare_1 = require("../compare");
const insert_internal_1 = require("./insert_internal");
const read_table_1 = require("./read_table");
function collect(source, target) {
    const read = (0, read_table_1.readTable)(target, { withKey: (i) => { return (0, compare_1.eq)(i.table_line, source); } });
    if (read.subrc === 4) {
        (0, insert_internal_1.insertInternal)({ table: target, data: source });
    }
}
exports.collect = collect;

},{"../compare":60,"./insert_internal":118,"./read_table":127}],102:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commit = void 0;
function commit() {
    // todo
}
exports.commit = commit;

},{}],103:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatenate = void 0;
const types_1 = require("../types");
function concatenate(input) {
    const list = [];
    if (input.lines === true) {
        const tab = input.source[0];
        if (tab instanceof types_1.Table) {
            for (const l of tab.array()) {
                list.push(l.get());
            }
        }
    }
    else {
        for (const source of input.source) {
            let val = "";
            if (source instanceof types_1.Table) {
                throw new Error("concatenate, error input is table");
            }
            else if (typeof source === "string" || typeof source === "number") {
                val = source.toString();
            }
            else if (source instanceof types_1.Character) {
                val = source.get().toString();
                if (input.respectingBlanks !== true) {
                    val = val.replace(/ +$/, "");
                }
            }
            else {
                val = source.get().toString();
            }
            list.push(val);
        }
    }
    let sep = "";
    if (input.separatedBy) {
        if (typeof input.separatedBy === "string" || typeof input.separatedBy === "number") {
            sep = input.separatedBy.toString();
        }
        else {
            sep = input.separatedBy.get().toString();
        }
    }
    input.target.set(list.join(sep));
}
exports.concatenate = concatenate;

},{"../types":151}],104:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.condense = void 0;
function condense(input, options) {
    let trimmed = input.get().replace(/ +$/, "");
    trimmed = trimmed.replace(/^ +/, "");
    if (options.nogaps) {
        trimmed = trimmed.replace(/ */g, "");
    }
    else {
        trimmed = trimmed.replace(/ {2,}/g, " ");
    }
    input.set(trimmed);
}
exports.condense = condense;

},{}],105:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const temporal_polyfill_1 = require("temporal-polyfill");
function convert(source, target) {
    var _a, _b, _c;
    let date = "";
    if (source.date) {
        if (typeof source.date === "string") {
            date = source.date;
        }
        else {
            date = source.date.get();
        }
    }
    let time = "";
    if (source.time) {
        if (typeof source.time === "string") {
            time = source.time;
        }
        else {
            time = source.time.get();
        }
    }
    let stamp = "";
    if (source.stamp) {
        if (typeof source.stamp === "string") {
            stamp = source.stamp;
        }
        else {
            stamp = source.stamp.get() + "";
        }
    }
    let zone = "";
    if (source.zone) {
        if (typeof source.zone === "string") {
            zone = source.zone;
        }
        else {
            zone = source.zone.get() + "";
        }
    }
    if (zone === "") {
        zone = "UTC";
    }
    ////////////////////////
    let zoned = undefined;
    if (date !== "" && time !== "") {
        if (date === "00000000" && time === "000000") {
            (_a = target.stamp) === null || _a === void 0 ? void 0 : _a.clear();
            return;
        }
        const pt = temporal_polyfill_1.Temporal.PlainTime.from(time.substring(0, 2) + ":" + time.substring(2, 4) + ":" + time.substring(4, 6));
        zoned = temporal_polyfill_1.Temporal.PlainDate.from(date).toZonedDateTime({ timeZone: zone, plainTime: pt });
        zoned = zoned.withTimeZone("UTC");
    }
    else {
        if (stamp === "0") {
            (_b = target.date) === null || _b === void 0 ? void 0 : _b.clear();
            (_c = target.time) === null || _c === void 0 ? void 0 : _c.clear();
            return;
        }
        const pt = temporal_polyfill_1.Temporal.PlainTime.from(stamp.substring(8, 10) + ":" + stamp.substring(10, 12) + ":" + stamp.substring(12, 14));
        zoned = temporal_polyfill_1.Temporal.PlainDate.from(stamp.substring(0, 8)).toZonedDateTime({ timeZone: "UTC", plainTime: pt });
    }
    const d = zoned.toPlainDate().toString().replace(/-/g, "");
    const t = zoned.toPlainTime().toString().replace(/:/g, "");
    if (target.stamp) {
        target.stamp.set(d + t);
    }
    if (target.date) {
        target.date.set(d);
    }
    if (target.time) {
        target.time.set(t);
    }
}
exports.convert = convert;

},{"temporal-polyfill":167}],106:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createData = void 0;
const clone_1 = require("../clone");
const throw_error_1 = require("../throw_error");
const types_1 = require("../types");
function createData(target, options) {
    //  console.dir(options);
    if ((options === null || options === void 0 ? void 0 : options.name) && (options === null || options === void 0 ? void 0 : options.table)) {
        // @ts-ignore
        if (abap.DDIC[options.name] === undefined) {
            (0, throw_error_1.throwError)("CX_SY_CREATE_DATA_ERROR");
        }
        // @ts-ignore
        target.assign(new abap.types.Table(abap.DDIC[options.name].type));
    }
    else if (options === null || options === void 0 ? void 0 : options.name) {
        // @ts-ignore
        if (abap.DDIC[options.name]) {
            // @ts-ignore
            target.assign((0, clone_1.clone)(abap.DDIC[options.name].type));
        }
        else if (options.name.includes("=>")) {
            const [className, typeName] = options.name.toUpperCase().split("=>");
            // @ts-ignore
            if (abap.Classes[className] === undefined) {
                (0, throw_error_1.throwError)("CX_SY_CREATE_DATA_ERROR");
            }
            // @ts-ignore
            if (abap.Classes[className][typeName.toLowerCase()] === undefined) {
                (0, throw_error_1.throwError)("CX_SY_CREATE_DATA_ERROR");
            }
            // @ts-ignore
            target.assign((0, clone_1.clone)(abap.Classes[className][typeName.toLowerCase()]));
        }
        else if (options.name.startsWith("\\TYPE=%")) {
            // currently, only the runtime knows the references to the anonymous types
            // @ts-ignore
            const clas = abap.Classes["KERNEL_CREATE_DATA_HANDLE"];
            if (clas === undefined) {
                throw new Error("CreateData, kernel class missing");
            }
            clas.anonymous({ name: options.name, dref: target });
        }
        else {
            (0, throw_error_1.throwError)("CX_SY_CREATE_DATA_ERROR");
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.typeName) {
        switch (options.typeName) {
            case "C":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    target.assign(new types_1.Character(length));
                }
                break;
            case "N":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    target.assign(new types_1.Numc({ length: length }));
                }
                break;
            case "X":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    target.assign(new types_1.Hex({ length: length }));
                }
                break;
            case "P":
                {
                    let length = 1;
                    if (options.length) {
                        length = options.length.get();
                    }
                    let decimals = 0;
                    if (options.decimals) {
                        decimals = options.decimals.get();
                    }
                    target.assign(new types_1.Packed({ length: length, decimals: decimals }));
                }
                break;
            case "F":
                target.assign(new types_1.Float());
                break;
            case "D":
                target.assign(new types_1.Date());
                break;
            case "T":
                target.assign(new types_1.Time());
                break;
            case "I":
                target.assign(new types_1.Integer());
                break;
            case "STRING":
                target.assign(new types_1.String());
                break;
            case "XSTRING":
                target.assign(new types_1.XString());
                break;
            default:
                if (options.typeName.includes("=>")) {
                    const [className, typeName] = options.typeName.toUpperCase().split("=>");
                    // @ts-ignore
                    if (abap.Classes[className] === undefined) {
                        (0, throw_error_1.throwError)("CX_SY_CREATE_DATA_ERROR");
                    }
                    // @ts-ignore
                    if (abap.Classes[className][typeName.toLowerCase()] === undefined) {
                        (0, throw_error_1.throwError)("CX_SY_CREATE_DATA_ERROR");
                    }
                    // @ts-ignore
                    target.assign((0, clone_1.clone)(abap.Classes[className][typeName.toLowerCase()]));
                }
                else {
                    throw "CREATE DATA, unknown type " + options.typeName;
                }
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.type) {
        target.assign((0, clone_1.clone)(options.type));
    }
    else if (options === null || options === void 0 ? void 0 : options.likeLineOf) {
        if (options.likeLineOf instanceof types_1.FieldSymbol) {
            options.likeLineOf = options.likeLineOf.getPointer();
        }
        target.assign((0, clone_1.clone)(options.likeLineOf.getRowType()));
    }
    else if (options === null || options === void 0 ? void 0 : options.like) {
        if (options.like instanceof types_1.FieldSymbol) {
            options.like = options.like.getPointer();
        }
        target.assign((0, clone_1.clone)(options.like));
    }
    else {
        target.assign((0, clone_1.clone)(target.getType()));
    }
}
exports.createData = createData;

},{"../clone":48,"../throw_error":141,"../types":151}],107:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDatabase = void 0;
const types_1 = require("../types");
class DeleteDatabase {
    constructor(context) {
        this.context = context;
    }
    async deleteDatabase(table, options) {
        if (options.table instanceof types_1.FieldSymbol) {
            options.table = options.table.getPointer();
        }
        if (options.from instanceof types_1.FieldSymbol) {
            options.from = options.from.getPointer();
        }
        if (typeof table !== "string") {
            table = table.get();
        }
        if (options.table) {
            for (const row of options.table.array()) {
                this.deleteDatabase(table, { from: row });
            }
        }
        else if (options.from) {
            let where = [];
            const structure = options.from.get();
            for (const k of Object.keys(structure)) {
                // todo, integers should not be surrounded by '"'?
                const str = k + ' = "' + structure[k].get() + '"';
                where.push(str);
            }
            where = where.join(" AND ");
            const { subrc, dbcnt } = await this.context.defaultDB().delete({ table, where });
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(subrc);
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(dbcnt);
        }
        else if (options.where) {
            const { subrc, dbcnt } = await this.context.defaultDB().delete({ table, where: options.where });
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(subrc);
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(dbcnt);
        }
        else {
            throw "deleteDatabase todo";
        }
    }
}
exports.DeleteDatabase = DeleteDatabase;

},{"../types":151}],108:[function(require,module,exports){
"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInternal = void 0;
const types_1 = require("../types");
const compare_1 = require("../compare");
const loop_1 = require("./loop");
async function deleteInternal(target, options) {
    var e_1, _a;
    let prev = undefined;
    let index = 0;
    if (target instanceof types_1.FieldSymbol) {
        target = target.getPointer();
        if (target === undefined) {
            throw "FS not assigned";
        }
    }
    if ((options === null || options === void 0 ? void 0 : options.index)
        && (options === null || options === void 0 ? void 0 : options.where) === undefined
        && (options === null || options === void 0 ? void 0 : options.adjacent) === undefined
        && (options === null || options === void 0 ? void 0 : options.fromValue) === undefined
        && (options === null || options === void 0 ? void 0 : options.from) === undefined
        && (options === null || options === void 0 ? void 0 : options.to) === undefined) {
        if (target.array()[options.index.get() - 1] === undefined) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return;
        }
        else {
            target.deleteIndex(options.index.get() - 1);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
            return;
        }
    }
    if (options === null || options === void 0 ? void 0 : options.to) {
        if ((options === null || options === void 0 ? void 0 : options.from) !== undefined || (options === null || options === void 0 ? void 0 : options.where) !== undefined) {
            throw "DeleteInternalTodo";
        }
        for (let i = 0; i < options.to.get(); i++) {
            target.deleteIndex(0);
        }
        return;
    }
    try {
        for (var _b = __asyncValues((0, loop_1.loop)(target)), _c; _c = await _b.next(), !_c.done;) {
            const i = _c.value;
            // @ts-ignore
            index = abap.builtin.sy.get().tabix.get() - 1;
            if (options === null || options === void 0 ? void 0 : options.where) {
                const row = i instanceof types_1.Structure ? i.get() : { table_line: i };
                if (options.where(row) === true) {
                    target.deleteIndex(index);
                }
            }
            else if ((options === null || options === void 0 ? void 0 : options.adjacent) === true && prev !== undefined) {
                if (options === null || options === void 0 ? void 0 : options.comparing) {
                    let match = false;
                    for (const compareField of options.comparing) {
                        match = (0, compare_1.eq)(prev.get()[compareField], i.get()[compareField]);
                        if (!match) {
                            break;
                        }
                    }
                    if (match) {
                        target.deleteIndex(index);
                    }
                }
                else if ((0, compare_1.eq)(prev, i) === true) {
                    target.deleteIndex(index);
                }
            }
            else if ((options === null || options === void 0 ? void 0 : options.index) && options.index.get() === index) {
                target.deleteIndex(options.index.get() - 1);
            }
            else if ((options === null || options === void 0 ? void 0 : options.fromValue) && (0, compare_1.eq)(options.fromValue, i)) {
                target.deleteIndex(index);
            }
            else if ((options === null || options === void 0 ? void 0 : options.from) && options.from.get() <= index + 1) {
                target.deleteIndex(index);
            }
            prev = i;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.deleteInternal = deleteInternal;

},{"../compare":60,"../types":151,"./loop":119}],109:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describe = void 0;
const types_1 = require("../types");
function describe(input) {
    var _a;
    //  console.dir(input);
    if (input.type) {
        if (input.field instanceof types_1.FieldSymbol) {
            describe({ field: input.field.getPointer(), type: input.type, length: input.length, mode: input.mode });
            return;
        }
        if (input.field instanceof types_1.Table) {
            input.type.set("h");
        }
        else if (input.field instanceof types_1.Character || typeof input.field === "string") {
            input.type.set("C");
        }
        else if (input.field instanceof types_1.Integer) {
            input.type.set("I");
        }
        else if (input.field instanceof types_1.Date) {
            input.type.set("D");
        }
        else if (input.field instanceof types_1.Time) {
            input.type.set("T");
        }
        else if (input.field instanceof types_1.Float) {
            input.type.set("F");
        }
        else if (input.field instanceof types_1.Numc) {
            input.type.set("N");
        }
        else if (input.field instanceof types_1.Hex) {
            input.type.set("X");
        }
        else if (input.field instanceof types_1.Packed) {
            input.type.set("P");
        }
        else if (input.field instanceof types_1.String) {
            input.type.set("g");
        }
        else if (input.field instanceof types_1.XString) {
            input.type.set("y");
        }
        else if (input.field instanceof types_1.DecFloat34) {
            input.type.set("e");
        }
        else if (input.field instanceof types_1.Structure) {
            input.type.set("u");
        }
        else if (input.field instanceof types_1.ABAPObject) {
            input.type.set("r");
        }
        else if (input.field instanceof types_1.DataReference) {
            input.type.set("l");
        }
        else {
            throw new Error("DESCRIBE, todo, transpiler, " + input.field.constructor.name);
        }
    }
    if (input.field instanceof types_1.FieldSymbol) {
        input.field = input.field.getPointer();
    }
    if (input.length) {
        if (input.field instanceof types_1.Character
            || input.field instanceof types_1.Packed
            || input.field instanceof types_1.Hex) {
            input.length.set(input.field.getLength());
        }
        else {
            throw "DESCRIBE length, unsupported or todo";
        }
    }
    if (input.decimals) {
        if (input.field instanceof types_1.Packed) {
            input.decimals.set(input.field.getDecimals());
        }
        else {
            throw "DESCRIBE decimals, unsupported or todo";
        }
    }
    if (input.table) {
        // @ts-ignore
        abap.builtin.sy.get().tfill.set(input.table.array().length);
        (_a = input.lines) === null || _a === void 0 ? void 0 : _a.set(input.table.array().length);
    }
}
exports.describe = describe;

},{"../types":151}],110:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const abap_regex_1 = require("../abap_regex");
const types_1 = require("../types");
function find(input, options) {
    var _a, _b, _c, _d, _e, _f, _g;
    let sectionOffset = (_a = options.sectionOffset) === null || _a === void 0 ? void 0 : _a.get();
    if (sectionOffset && options.byteMode) {
        sectionOffset = sectionOffset * 2;
    }
    let s = "";
    if (options.find) {
        s = options.find;
        if (typeof s !== "string") {
            s = s.get();
        }
        if (s === "") {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(0);
            return;
        }
        s = s.replace(/\[/g, "\\[");
        s = s.replace(/\]/g, "\\]");
        s = s.replace(/\?/g, "\\?");
        s = s.replace(/\(/g, "\\(");
        s = s.replace(/\)/g, "\\)");
        s = s.replace(/\./g, "\\.");
        s = s.replace(/\|/g, "\\|");
        s = s.replace(/\*/g, "\\*");
        s = s.replace(/\+/g, "\\+");
        s = new RegExp(s, "g");
    }
    else if (options.regex) {
        if (options.regex === "") {
            throw "FIND, runtime, no input, regex empty";
        }
        let r = options.regex;
        if (typeof r !== "string") {
            r = r.get();
        }
        if (typeof r === "string") {
            r = abap_regex_1.ABAPRegExp.convert(r);
        }
        else if (r.constructor.name === "cl_abap_regex") {
            const obj = r;
            // @ts-ignore
            r = obj.mv_pattern.get();
            // @ts-ignore
            if (obj.mv_ignore_case.get() === "X") {
                options.ignoringCase = true;
            }
        }
        else {
            throw "find(), unexpected input";
        }
        s = new RegExp(r, "gm" + (options.ignoringCase === true ? "i" : ""));
    }
    else {
        throw "FIND, runtime, no input";
    }
    const matches = [];
    if (input instanceof types_1.Table) {
        let line = 1;
        for (const blah of input.array()) {
            let temp;
            // eslint-disable-next-line no-cond-assign
            while (temp = s.exec(blah.get())) {
                matches.push(Object.assign(Object.assign({}, temp), { line }));
                if (options.first === true) {
                    break;
                }
            }
            line++;
        }
    }
    else {
        let blah = input.get();
        if (sectionOffset) {
            blah = blah.substr(sectionOffset);
        }
        let temp;
        // eslint-disable-next-line no-cond-assign
        while (temp = s.exec(blah)) {
            matches.push(temp);
            if (options.first === true) {
                break;
            }
        }
    }
    if (options.submatches) {
        for (let index = 0; index < options.submatches.length; index++) {
            if (matches[0] && matches[0][index + 1]) {
                options.submatches[index].set(matches[0][index + 1]);
            }
            else if (matches.length > 0) {
                options.submatches[index].clear();
            }
        }
    }
    if (options.results) {
        // assumption, results is a table with the correct type
        options.results.clear();
        for (const m of matches) {
            const match = new types_1.Structure({
                line: new types_1.Integer(),
                offset: new types_1.Integer(),
                length: new types_1.Integer(),
                submatches: new types_1.Table(new types_1.Structure({ offset: new types_1.Integer(), length: new types_1.Integer() })),
            });
            match.get().line.set(m.line || 0);
            match.get().offset.set(m.index);
            match.get().length.set(m[0].length);
            const submatch = new types_1.Structure({ offset: new types_1.Integer(), length: new types_1.Integer() });
            for (let i = 1; i < m.length; i++) {
                if (m[i] === undefined) {
                    submatch.get().offset.set(-1);
                    submatch.get().length.set(0);
                }
                else {
                    submatch.get().offset.set(m.index + m[0].indexOf(m[i]));
                    submatch.get().length.set(m[i].length);
                }
                match.get().submatches.append(submatch);
            }
            if (options.results instanceof types_1.Table) {
                options.results.append(match);
            }
            else {
                options.results.set(match);
            }
            if (options.first === undefined || options.first === true) {
                break;
            }
        }
    }
    if (matches.length === 0) {
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(4);
    }
    else {
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(0);
    }
    if (((_b = matches[0]) === null || _b === void 0 ? void 0 : _b.index) !== undefined) {
        let val = matches[0].index;
        if (sectionOffset) {
            val += sectionOffset;
        }
        if (options.byteMode) {
            val = val / 2;
        }
        (_c = options.offset) === null || _c === void 0 ? void 0 : _c.set(val);
    }
    if (options === null || options === void 0 ? void 0 : options.count) {
        (_d = options.count) === null || _d === void 0 ? void 0 : _d.set(matches.length);
    }
    else {
        (_e = options.count) === null || _e === void 0 ? void 0 : _e.clear();
    }
    if ((options === null || options === void 0 ? void 0 : options.length) && matches && matches[0]) {
        (_f = options.length) === null || _f === void 0 ? void 0 : _f.set(matches[0][0].length);
    }
    else {
        (_g = options.length) === null || _g === void 0 ? void 0 : _g.clear();
    }
}
exports.find = find;

},{"../abap_regex":2,"../types":151}],111:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBit = void 0;
function getBit(number, hex, output) {
    const charIndex = Math.floor((number.get() - 1) / 8);
    const bitIndex = (number.get() - 1) % 8;
    const h = hex.get().substr(charIndex * 2, 2);
    const parsed = parseInt(h, 16).toString(2);
    const bits = parsed.padStart(8, "0");
    output.set(bits.substr(bitIndex, 1));
}
exports.getBit = getBit;

},{}],112:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocale = void 0;
function getLocale(target) {
    // todo
    target.set("E");
}
exports.getLocale = getLocale;

},{}],113:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameter = void 0;
function getParameter(_source, _target) {
    // todo, additional logic? call ABAP kernel class?
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(4);
}
exports.getParameter = getParameter;

},{}],114:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunTime = void 0;
let prev = undefined;
function getRunTime(value) {
    if (prev === undefined) {
        value.set(0);
        prev = new Date().getTime();
    }
    else {
        const now = new Date().getTime();
        value.set(now - prev);
        prev = now;
    }
}
exports.getRunTime = getRunTime;

},{}],115:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
function getTime(options) {
    const d = new Date();
    const date = d.getUTCFullYear() +
        (d.getUTCMonth() + 1 + "").padStart(2, "0") +
        (d.getUTCDate() + "").padStart(2, "0");
    const time = (d.getUTCHours() + "").padStart(2, "0") +
        (d.getUTCMinutes() + "").padStart(2, "0") +
        (d.getUTCSeconds() + "").padStart(2, "0");
    if (options === undefined) {
        options = {};
    }
    if ((options === null || options === void 0 ? void 0 : options.sy) === undefined) {
        // @ts-ignore
        options.sy = abap.builtin.sy;
    }
    options.sy.get().datlo.set(date);
    options.sy.get().datum.set(date);
    options.sy.get().timlo.set(time);
    options.sy.get().uzeit.set(time);
    if (options === null || options === void 0 ? void 0 : options.field) {
        options.field.set(time);
    }
    if (options === null || options === void 0 ? void 0 : options.stamp) {
        options.stamp.set(date + time);
    }
}
exports.getTime = getTime;

},{}],116:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statements = void 0;
const append_1 = require("./append");
const assert_1 = require("./assert");
const assign_1 = require("./assign");
const clear_1 = require("./clear");
const commit_1 = require("./commit");
const concatenate_1 = require("./concatenate");
const condense_1 = require("./condense");
const convert_1 = require("./convert");
const create_data_1 = require("./create_data");
const delete_internal_1 = require("./delete_internal");
const describe_1 = require("./describe");
const find_1 = require("./find");
const collect_1 = require("./collect");
const overlay_1 = require("./overlay");
const cast_1 = require("./cast");
const get_bit_1 = require("./get_bit");
const read_report_1 = require("./read_report");
const raise_event_1 = require("./raise_event");
const get_locale_1 = require("./get_locale");
const get_parameter_1 = require("./get_parameter");
const set_locale_1 = require("./set_locale");
const get_run_time_1 = require("./get_run_time");
const get_time_1 = require("./get_time");
const insert_database_1 = require("./insert_database");
const insert_internal_1 = require("./insert_internal");
const delete_database_1 = require("./delete_database");
const loop_1 = require("./loop");
const message_1 = require("./message");
const modify_database_1 = require("./modify_database");
const modify_internal_1 = require("./modify_internal");
const move_corresponding_1 = require("./move_corresponding");
const read_table_1 = require("./read_table");
const replace_1 = require("./replace");
const rollback_1 = require("./rollback");
const select_1 = require("./select");
const set_bit_1 = require("./set_bit");
const shift_1 = require("./shift");
const sort_1 = require("./sort");
const set_handler_1 = require("./set_handler");
const split_1 = require("./split");
const translate_1 = require("./translate");
const update_database_1 = require("./update_database");
const write_1 = require("./write");
const call_function_1 = require("./call_function");
// this is a class, as statements like SELECT needs access to the database object instance
// and WRITE will access the Console
class Statements {
    constructor(context) {
        this.append = append_1.append;
        this.assert = assert_1.assert;
        this.assign = assign_1.assign;
        this.cast = cast_1.cast;
        this.clear = clear_1.clear;
        this.collect = collect_1.collect;
        this.commit = commit_1.commit;
        this.concatenate = concatenate_1.concatenate;
        this.condense = condense_1.condense;
        this.convert = convert_1.convert;
        this.createData = create_data_1.createData;
        this.deleteInternal = delete_internal_1.deleteInternal;
        this.describe = describe_1.describe;
        this.find = find_1.find;
        this.getBit = get_bit_1.getBit;
        this.readReport = read_report_1.readReport;
        this.getLocale = get_locale_1.getLocale;
        this.getParameter = get_parameter_1.getParameter;
        this.getRunTime = get_run_time_1.getRunTime;
        this.getTime = get_time_1.getTime;
        this.insertInternal = insert_internal_1.insertInternal;
        this.loop = loop_1.loop;
        this.modifyInternal = modify_internal_1.modifyInternal;
        this.moveCorresponding = move_corresponding_1.moveCorresponding;
        this.overlay = overlay_1.overlay;
        this.raiseEvent = raise_event_1.raiseEvent;
        this.readTable = read_table_1.readTable;
        this.replace = replace_1.replace;
        this.rollback = rollback_1.rollback;
        this.setBit = set_bit_1.setBit;
        this.setHandler = set_handler_1.setHandler;
        this.setLocale = set_locale_1.setLocale;
        this.shift = shift_1.shift;
        this.sort = sort_1.sort;
        this.split = split_1.split;
        this.translate = translate_1.translate;
        this.context = context;
    }
    async deleteDatabase(table, options) {
        return new delete_database_1.DeleteDatabase(this.context).deleteDatabase(table, options);
    }
    async insertDatabase(table, options) {
        return new insert_database_1.InsertDatabase(this.context).insertDatabase(table, options);
    }
    async message(options) {
        return new message_1.MessageStatement(this.context).message(options);
    }
    async modifyDatabase(table, options) {
        return new modify_database_1.ModifyDatabase(this.context).modifyDatabase(table, options);
    }
    async select(target, select, runtimeOptions) {
        return new select_1.SelectDatabase(this.context).select(target, select, runtimeOptions);
    }
    async updateDatabase(table, options) {
        return new update_database_1.UpdateDatabase(this.context).updateDatabase(table, options);
    }
    async callFunction(options) {
        return new call_function_1.CallFunction(this.context).callFunction(options);
    }
    write(source, options) {
        return new write_1.WriteStatement(this.context).write(source, options);
    }
}
exports.Statements = Statements;

},{"./append":95,"./assert":96,"./assign":97,"./call_function":98,"./cast":99,"./clear":100,"./collect":101,"./commit":102,"./concatenate":103,"./condense":104,"./convert":105,"./create_data":106,"./delete_database":107,"./delete_internal":108,"./describe":109,"./find":110,"./get_bit":111,"./get_locale":112,"./get_parameter":113,"./get_run_time":114,"./get_time":115,"./insert_database":117,"./insert_internal":118,"./loop":119,"./message":120,"./modify_database":121,"./modify_internal":122,"./move_corresponding":123,"./overlay":124,"./raise_event":125,"./read_report":126,"./read_table":127,"./replace":128,"./rollback":129,"./select":130,"./set_bit":131,"./set_handler":132,"./set_locale":133,"./shift":134,"./sort":135,"./split":136,"./translate":137,"./update_database":138,"./write":139}],117:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertDatabase = exports.toValue = void 0;
function toValue(value) {
    if (typeof value === "string") {
        return '"' + value.replace(/"/g, "\"\"") + '"';
    }
    else {
        return value;
    }
}
exports.toValue = toValue;
class InsertDatabase {
    constructor(context) {
        this.context = context;
    }
    async insertDatabase(table, options) {
        const columns = [];
        const values = [];
        if (options.values === undefined && options.table === undefined) {
            throw "insertDatabase, wrong input";
        }
        if (options.table !== undefined) {
            let subrc = 0;
            let dbcnt = 0;
            for (const row of options.table.array()) {
                await this.insertDatabase(table, { values: row });
                // @ts-ignore
                subrc = Math.max(subrc, abap.builtin.sy.get().subrc.get());
                // @ts-ignore
                dbcnt += abap.builtin.sy.get().dbcnt.get();
            }
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(subrc);
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(dbcnt);
            return;
        }
        const structure = options.values.get();
        for (const k of Object.keys(structure)) {
            columns.push(k);
            const value = structure[k].get();
            values.push(toValue(value));
        }
        if (typeof table !== "string") {
            table = table.get();
        }
        const { subrc, dbcnt } = await this.context.defaultDB().insert({ table, columns, values });
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(subrc);
        // @ts-ignore
        abap.builtin.sy.get().dbcnt.set(dbcnt);
        return subrc;
    }
}
exports.InsertDatabase = InsertDatabase;

},{}],118:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInternal = void 0;
const clone_1 = require("../clone");
const compare_1 = require("../compare");
const types_1 = require("../types");
const read_table_1 = require("./read_table");
const sort_1 = require("./sort");
function insertInternal(options) {
    var _a, _b, _c, _d, _e;
    if (options.table instanceof types_1.FieldSymbol) {
        if (options.table.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        options.table = options.table.getPointer();
    }
    else if (options.data instanceof types_1.FieldSymbol) {
        if (options.data.getPointer() === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        options.data = options.data.getPointer();
    }
    const tableOptions = options.table.getOptions();
    const isSorted = ((_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.primaryKey) === null || _a === void 0 ? void 0 : _a.type) === types_1.TableAccessType.sorted || ((_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.primaryKey) === null || _b === void 0 ? void 0 : _b.type) === types_1.TableAccessType.hashed;
    if (isSorted) {
        const insert = options.data instanceof types_1.Structure ? options.data.get() : { table_line: options.data };
        const compare = (row) => {
            var _a;
            for (const key of ((_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.primaryKey) === null || _a === void 0 ? void 0 : _a.keyFields) || []) {
                if (key.includes("-")) {
                    const [first, second] = key.split("-");
                    if ((0, compare_1.ne)(row[first.toLowerCase()].get()[second.toLowerCase()], insert[first.toLowerCase()].get()[second.toLowerCase()])) {
                        return false;
                    }
                }
                else {
                    if ((0, compare_1.ne)(row[key.toLowerCase()], insert[key.toLowerCase()])) {
                        return false;
                    }
                }
            }
            return true;
        };
        if (((_c = tableOptions.primaryKey) === null || _c === void 0 ? void 0 : _c.isUnique) === true) {
            (0, read_table_1.readTable)(options.table, { withKey: compare });
            // @ts-ignore
            if (abap.builtin.sy.get().subrc.get() === 0) {
                // @ts-ignore
                abap.builtin.sy.get().subrc.set(4);
                return;
            }
        }
    }
    let data = options.data;
    if (typeof data === "string") {
        const tmp = (0, clone_1.clone)(options.table.getRowType());
        tmp.set(data);
        data = tmp;
    }
    if (data && options.index) {
        const index = options.index.get() - 1;
        const val = options.table.insertIndex(data, index);
        if (options.assigning) {
            options.assigning.assign(val);
        }
    }
    else if (options.lines && options.data instanceof types_1.Table) {
        for (const i of options.data.array()) {
            options.table.append(i);
        }
    }
    else if (options.initial === true) {
        let index = options.table.array().length;
        if (options.index) {
            index = options.index.get() - 1;
        }
        const val = options.table.insertIndex(options.table.getRowType(), index);
        if (options.assigning) {
            options.assigning.assign(val);
        }
        if (options.referenceInto) {
            options.referenceInto.assign(val);
        }
    }
    else if (data) {
        // todo, for now it just appends, this is not correct, but currently the table type is not known
        const val = options.table.insertIndex(data, options.table.array().length);
        if (options.assigning) {
            options.assigning.assign(val);
        }
        if (options.referenceInto) {
            options.referenceInto.assign(val);
        }
    }
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(0);
    if (isSorted) {
        // slow, but works for now
        let by = (_e = (_d = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.primaryKey) === null || _d === void 0 ? void 0 : _d.keyFields) === null || _e === void 0 ? void 0 : _e.map(f => {
            return { component: f.toLowerCase() };
        });
        if ((by === null || by === void 0 ? void 0 : by.length) === 1 && by[0].component === "table_line") {
            by = [];
        }
        if (by && by.length > 0) {
            (0, sort_1.sort)(options.table, { by: by });
        }
        else {
            (0, sort_1.sort)(options.table);
        }
    }
}
exports.insertInternal = insertInternal;

},{"../clone":48,"../compare":60,"../types":151,"./read_table":127,"./sort":135}],119:[function(require,module,exports){
"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loop = void 0;
const binary_search_1 = require("../binary_search");
const types_1 = require("../types");
function determineFromTo(array, topEquals, key) {
    if (topEquals === undefined) {
        // if there is no WHERE supplied, its using the sorting of the secondary key
        return { from: 1, to: array.length };
    }
    let from = 0;
    let to = array.length;
    // todo: multi field
    const keyField = key.keyFields[0].toLowerCase();
    const keyValue = topEquals[keyField];
    if (keyField && keyValue) {
        from = (0, binary_search_1.binarySearchFrom)(array, from, to, keyField, keyValue);
        to = (0, binary_search_1.binarySearchTo)(array, from, to, keyField, keyValue);
        //    console.dir("from: " + from + ", to: " + to);
    }
    return {
        from: from,
        to: to,
    };
}
function loop(table, options) {
    return __asyncGenerator(this, arguments, function* loop_1() {
        if (table === undefined) {
            throw new Error("LOOP at undefined");
        }
        else if (table instanceof types_1.FieldSymbol) {
            const pnt = table.getPointer();
            if (pnt === undefined) {
                throw new Error("GETWA_NOT_ASSIGNED");
            }
            yield __await(yield* __asyncDelegator(__asyncValues(loop(pnt, options))));
            return yield __await(void 0);
        }
        const length = table.array().length;
        if (length === 0) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return yield __await(void 0);
        }
        let loopFrom = (options === null || options === void 0 ? void 0 : options.from) && (options === null || options === void 0 ? void 0 : options.from.get()) > 0 ? options.from.get() - 1 : 0;
        let loopTo = (options === null || options === void 0 ? void 0 : options.to) && options.to.get() < length ? options.to.get() : length;
        let array = [];
        if ((options === null || options === void 0 ? void 0 : options.usingKey) && options.usingKey !== undefined && options.usingKey !== "primary_key") {
            array = table.getSecondaryIndex(options.usingKey);
            const { from, to } = determineFromTo(array, options.topEquals, table.getKeyByName(options.usingKey));
            loopFrom = Math.max(loopFrom, from) - 1;
            loopTo = Math.min(loopTo, to);
        }
        else {
            array = table.array();
        }
        const loopIndex = table.startLoop(loopFrom);
        let entered = false;
        try {
            const isStructured = array[0] instanceof types_1.Structure;
            while (loopIndex.index < loopTo) {
                if (loopIndex.index > array.length) {
                    break;
                }
                const current = array[loopIndex.index];
                if (options === null || options === void 0 ? void 0 : options.where) {
                    const row = isStructured ? current.get() : { table_line: current };
                    if ((yield __await(options.where(row))) === false) {
                        loopIndex.index++;
                        continue;
                    }
                }
                // @ts-ignore
                abap.builtin.sy.get().tabix.set(loopIndex.index + 1);
                entered = true;
                yield yield __await(current);
                loopIndex.index++;
                if ((options === null || options === void 0 ? void 0 : options.to) === undefined && (options === null || options === void 0 ? void 0 : options.usingKey) === undefined) {
                    // extra rows might have been inserted inside the loop
                    loopTo = array.length;
                }
            }
        }
        finally {
            table.unregisterLoop(loopIndex);
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(entered ? 0 : 4);
        }
    });
}
exports.loop = loop;

},{"../binary_search":3,"../types":151}],120:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatement = void 0;
function replace(text, w) {
    for (let i = 0; i < 6; i++) {
        const search = "&" + (i + 1);
        let replace = "";
        if (w && w[i]) {
            const j = w[i];
            if (typeof j === "string") {
                replace = j;
            }
            else {
                replace = j.get();
            }
        }
        const field = "msgv" + (i + 1);
        if (i <= 3) {
            // @ts-ignore
            abap.builtin.sy.get()[field].set(replace);
        }
        text = text.replace(search, replace);
    }
    return text.trim();
}
async function findText(context, arbgb, msgnr, msgty) {
    let text = undefined;
    if (arbgb && msgnr) {
        try {
            // todo, sql injection?
            const select = `SELECT * FROM t100 WHERE sprsl='E' AND arbgb='${arbgb}' AND msgnr='${msgnr}' LIMIT 1`;
            const { rows: result } = await context.defaultDB().select({ select });
            if (result[0]) {
                text = result[0]["text"];
            }
        }
        catch (_a) {
            // use fallback text
        }
    }
    if (text === undefined) {
        // fallback
        text = msgty + ":" + (arbgb === null || arbgb === void 0 ? void 0 : arbgb.trim()) + ":" + msgnr + " &1 &2 &3 &4";
    }
    return text;
}
class MessageStatement {
    constructor(context) {
        this.context = context;
    }
    async message(options) {
        let arbgb = options.id;
        if (arbgb !== undefined && typeof arbgb !== "string") {
            arbgb = arbgb.get();
        }
        arbgb = arbgb === null || arbgb === void 0 ? void 0 : arbgb.toUpperCase();
        let msgty = options.type;
        if (msgty !== undefined && typeof msgty !== "string") {
            msgty = msgty.get();
        }
        msgty = msgty === null || msgty === void 0 ? void 0 : msgty.toUpperCase();
        // @ts-ignore
        abap.builtin.sy.get().msgid.set(arbgb);
        let msgnr = options.number;
        if (msgnr !== undefined && typeof msgnr !== "string") {
            msgnr = msgnr.get();
        }
        // @ts-ignore
        abap.builtin.sy.get().msgno.set(msgnr);
        // @ts-ignore
        abap.builtin.sy.get().msgty.set(msgty);
        let replaced = "";
        if (options.exception) {
            replaced = await options.exception.get().if_message$get_text();
        }
        else {
            const text = await findText(this.context, arbgb, msgnr, msgty);
            replaced = replace(text, options.with);
        }
        if (options.into) {
            options.into.set(replaced);
        }
        else {
            // hmm, add option on how/if to write messages to console? or it should be the abap.console() ?
            console.log(replaced);
        }
    }
}
exports.MessageStatement = MessageStatement;

},{}],121:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyDatabase = void 0;
const types_1 = require("../types");
const insert_database_1 = require("./insert_database");
const update_database_1 = require("./update_database");
class ModifyDatabase {
    constructor(context) {
        this.context = context;
    }
    async modifyDatabase(table, options) {
        if (options.table instanceof types_1.FieldSymbol) {
            options.table = options.table.getPointer();
        }
        if (options.values instanceof types_1.FieldSymbol) {
            options.values = options.values.getPointer();
        }
        const insert = new insert_database_1.InsertDatabase(this.context);
        const update = new update_database_1.UpdateDatabase(this.context);
        if (options.table) {
            for (const row of options.table.array()) {
                const subrc = await insert.insertDatabase(table, { values: row });
                if (subrc !== 0) {
                    await update.updateDatabase(table, { from: row });
                }
            }
        }
        else if (options.values) {
            const subrc = await insert.insertDatabase(table, { values: options.values });
            if (subrc !== 0) {
                await update.updateDatabase(table, { from: options.values });
            }
        }
        else {
            throw "modifyDatabase todo";
        }
    }
}
exports.ModifyDatabase = ModifyDatabase;

},{"../types":151,"./insert_database":117,"./update_database":138}],122:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyInternal = void 0;
const types_1 = require("../types");
const delete_internal_1 = require("./delete_internal");
const insert_internal_1 = require("./insert_internal");
const read_table_1 = require("./read_table");
function modifyInternal(table, options) {
    let found = false;
    if (options.index) {
        const index = options.index.get() - 1;
        found = table.array()[index] !== undefined;
        if (found) {
            table.deleteIndex(index);
            table.insertIndex(options.from, index);
        }
    }
    else if (options.from) {
        const readResult = (0, read_table_1.readTable)(table, { from: options.from });
        if (readResult.subrc === 0) {
            (0, delete_internal_1.deleteInternal)(table, { index: new types_1.Integer().set(readResult.foundIndex) });
        }
        (0, insert_internal_1.insertInternal)({ table, data: options.from });
    }
    const subrc = found ? 0 : 4;
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(subrc);
}
exports.modifyInternal = modifyInternal;

},{"../types":151,"./delete_internal":108,"./insert_internal":118,"./read_table":127}],123:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveCorresponding = void 0;
function moveCorresponding(source, target) {
    var _a;
    for (const n in source.get()) {
        (_a = target.get()[n]) === null || _a === void 0 ? void 0 : _a.set(source.get()[n]);
    }
}
exports.moveCorresponding = moveCorresponding;

},{}],124:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overlay = void 0;
const offset_length_1 = require("../offset_length");
const types_1 = require("../types");
function overlay(value, withh, _only) {
    const set = value instanceof types_1.Structure ? value.getCharacter() : value.get();
    const w = withh.get();
    const len = set.length;
    for (let i = 0; i < len; i++) {
        if (set.substring(i, i + 1) === " ") {
            new offset_length_1.OffsetLength(value, { offset: i, length: 1 }).set(w.substring(i, i + 1));
        }
    }
}
exports.overlay = overlay;

},{"../offset_length":78,"../types":151}],125:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.raiseEvent = void 0;
function raiseEvent() {
    // todo
    return;
}
exports.raiseEvent = raiseEvent;

},{}],126:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readReport = void 0;
const types_1 = require("../types");
function readReport(name, options) {
    if (options.into) {
        options.into.clear();
        options.into.append(new types_1.String().set("ReadReportTodo-" + name));
    }
    // TODO
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(0);
}
exports.readReport = readReport;

},{"../types":151}],127:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTable = void 0;
const binary_search_1 = require("../binary_search");
const compare_1 = require("../compare");
const types_1 = require("../types");
function searchWithKey(arr, withKey, startIndex = 0) {
    const isStructured = arr[0] instanceof types_1.Structure;
    for (let index = startIndex; index < arr.length; index++) {
        const a = arr[index];
        const row = isStructured ? Object.assign({ table_line: a }, a.get()) : { table_line: a };
        if (withKey(row) === true) {
            return {
                found: a,
                foundIndex: index + 1,
            };
        }
    }
    return {
        found: undefined,
        foundIndex: 0,
    };
}
/////////////////
function readTable(table, options) {
    var _a, _b;
    let found = undefined;
    let foundIndex = 0;
    const arr = table.array();
    if (options === null || options === void 0 ? void 0 : options.index) {
        let index = options.index;
        if (typeof index !== "number") {
            if (index instanceof types_1.FieldSymbol) {
                if (index.getPointer() === undefined) {
                    throw new Error("GETWA_NOT_ASSIGNED");
                }
                index = index.getPointer();
            }
            if (index instanceof types_1.Float || index instanceof types_1.DecFloat34) {
                index = index.getRaw();
            }
            else {
                index = index.get();
            }
        }
        found = arr[index - 1];
        if (found) {
            foundIndex = index;
        }
    }
    else if ((options === null || options === void 0 ? void 0 : options.binarySearch) === true
        && options.withKeyValue
        && options.withKey) {
        // note: it currently only uses the first key field for binary search, todo
        const first = options.withKeyValue[0];
        const startIndex = (0, binary_search_1.binarySearchFromRow)(arr, 0, arr.length, first.key, first.value) - 1;
        const searchResult = searchWithKey(arr, options.withKey, startIndex);
        found = searchResult.found;
        foundIndex = searchResult.foundIndex;
    }
    else if (options === null || options === void 0 ? void 0 : options.withKey) {
        const searchResult = searchWithKey(arr, options.withKey);
        found = searchResult.found;
        foundIndex = searchResult.foundIndex;
    }
    else if (options === null || options === void 0 ? void 0 : options.from) {
        if (options.from instanceof types_1.FieldSymbol) {
            options.from = options.from.getPointer();
        }
        if (table instanceof types_1.FieldSymbol) {
            table = table.getPointer();
        }
        if (table instanceof types_1.Table && options.from instanceof types_1.Structure) {
            const keys = (_b = (_a = table.getOptions()) === null || _a === void 0 ? void 0 : _a.primaryKey) === null || _b === void 0 ? void 0 : _b.keyFields;
            const isStructured = arr[0] instanceof types_1.Structure;
            if (keys !== undefined && isStructured === true) {
                //        console.dir(keys);
                //        console.dir(options.from.get()[keys[0].toLowerCase()]);
                for (const a of arr) {
                    foundIndex++;
                    let matches = true;
                    for (const k of keys) {
                        if ((0, compare_1.eq)(a.get()[k.toLowerCase()], options.from.get()[k.toLowerCase()]) === false) {
                            matches = false;
                            break;
                        }
                    }
                    if (matches === true) {
                        found = a;
                        break;
                    }
                }
            }
        }
        if (found === undefined) {
            foundIndex = 0;
        }
    }
    else {
        throw new Error("runtime, readTable, unexpected input");
    }
    let subrc = found ? 0 : 4;
    if (((options === null || options === void 0 ? void 0 : options.from) || (options === null || options === void 0 ? void 0 : options.binarySearch) === true || (options === null || options === void 0 ? void 0 : options.keyName) !== undefined)
        && subrc === 4) {
        subrc = 8;
    }
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(subrc);
    // @ts-ignore
    abap.builtin.sy.get().tabix.set(foundIndex);
    if (options.into && found) {
        if (options.into instanceof types_1.DataReference && found instanceof types_1.DataReference) {
            options.into.assign(found.getPointer());
        }
        else if (options.into instanceof types_1.DataReference) {
            options.into.assign(found);
        }
        else {
            options.into.set(found);
        }
    }
    else if (options.referenceInto && found) {
        options.referenceInto.assign(found);
    }
    else if (options.assigning && found) {
        options.assigning.assign(found);
    }
    return { subrc, foundIndex };
}
exports.readTable = readTable;

},{"../binary_search":3,"../compare":60,"../types":151}],128:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
const abap_regex_1 = require("../abap_regex");
const offset_length_1 = require("../offset_length");
const types_1 = require("../types");
function replace(input) {
    let temp = input.target.get();
    const ignoreCase = input.ignoringCase === true ? "i" : "";
    const allOccurrences = input.all === true ? "g" : "";
    let search = undefined;
    let found = false;
    if (input.of) {
        let inp = input.of.get();
        if (inp.length === 0 && input.all === true) {
            throw "REPLACE, zero length input";
        }
        found = temp.indexOf(inp) >= 0;
        inp = abap_regex_1.ABAPRegExp.escapeRegExp(inp);
        search = new RegExp(inp, ignoreCase + allOccurrences);
    }
    else if (input.regex) {
        const regex = abap_regex_1.ABAPRegExp.convert(input.regex.get());
        if (regex.length === 0 && input.all === true) {
            throw "REPLACE, zero length input";
        }
        found = temp.match(regex) !== null;
        search = new RegExp(regex, ignoreCase + allOccurrences);
    }
    else if (input.sectionLength && input.sectionOffset) {
        new offset_length_1.OffsetLength(input.target, { length: input.sectionLength, offset: input.sectionOffset }).set(input.with);
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(0);
        return;
    }
    else {
        throw "REPLACE, unexpected input";
    }
    let replace = "";
    if (typeof input.with === "string") {
        replace = input.with;
    }
    else {
        if (input.with instanceof types_1.Character) {
            replace = input.with.getTrimEnd();
        }
        else {
            replace = input.with.get();
        }
        replace = replace.replace(/\\\$/g, "$");
        replace = replace.replace(/\\\{/g, "{");
        replace = replace.replace(/\\\}/g, "}");
    }
    temp = temp.replace(search, replace);
    const subrc = found ? 0 : 4;
    // @ts-ignore
    abap.builtin.sy.get().subrc.set(subrc);
    input.target.set(temp);
}
exports.replace = replace;

},{"../abap_regex":2,"../offset_length":78,"../types":151}],129:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollback = void 0;
function rollback() {
    // todo
}
exports.rollback = rollback;

},{}],130:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDatabase = void 0;
const clone_1 = require("../clone");
const types_1 = require("../types");
class SelectDatabase {
    constructor(context) {
        this.context = context;
    }
    async select(target, input, runtimeOptions) {
        var _a;
        const { rows: rows } = await this.context.defaultDB().select(input);
        if (target instanceof types_1.FieldSymbol) {
            if (target.isAssigned() === false) {
                throw "select, fs not assigned";
            }
            // @ts-ignore
            target = target.getPointer();
        }
        if ((runtimeOptions === null || runtimeOptions === void 0 ? void 0 : runtimeOptions.appending) !== true) {
            target === null || target === void 0 ? void 0 : target.clear();
        }
        if (rows.length === 0) {
            // @ts-ignore
            abap.builtin.sy.get().subrc.set(4);
            return;
        }
        if (target instanceof types_1.Structure) {
            const result = {};
            for (const column in rows[0]) {
                result[column] = (0, clone_1.clone)(target.get()[column]).set(rows[0][column]);
            }
            // @ts-ignore
            abap.statements.moveCorresponding(new types_1.Structure(result), target);
        }
        else if (target instanceof types_1.Table) {
            for (const row of rows) {
                const targetRow = (0, clone_1.clone)(target.getRowType());
                if (targetRow instanceof types_1.Structure) {
                    for (let columnName in row) {
                        columnName = columnName.toLowerCase();
                        // @ts-ignore
                        (_a = targetRow.get()[columnName]) === null || _a === void 0 ? void 0 : _a.set(row[columnName]);
                    }
                }
                else {
                    const columnName = Object.keys(row)[0];
                    targetRow.set(row[columnName]);
                }
                // @ts-ignore
                abap.statements.insertInternal({ table: target, data: targetRow });
            }
        }
        else if (target !== undefined) {
            // its a simple type
            target.set(rows[0][Object.keys(rows[0])[0]]);
        }
        if (target === undefined && rows.length === 1) {
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(Object.values(rows[0])[0]);
        }
        else {
            // @ts-ignore
            abap.builtin.sy.get().dbcnt.set(rows.length);
        }
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(0);
    }
}
exports.SelectDatabase = SelectDatabase;

},{"../clone":48,"../types":151}],131:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBit = void 0;
function setBit(number, hex, val) {
    let hexFull = hex.get();
    if (hexFull === "") {
        hexFull = "00";
    }
    const fullByteLength = Math.ceil(hexFull.length / 2);
    hexFull = hexFull.padEnd(fullByteLength * 2, "0");
    const byteNum = Math.ceil(number.get() / 8);
    if (byteNum > fullByteLength) {
        return;
    }
    let pre = "";
    let byte = "";
    let post = "";
    if (hexFull.length > 2) {
        if (byteNum > 1) {
            pre = hexFull.substr(0, (byteNum - 1) * 2);
        }
        byte = hexFull.substr((byteNum - 1) * 2, 2);
        if (fullByteLength > byteNum) {
            post = hexFull.substr(byteNum * 2, (fullByteLength - byteNum) * 2);
        }
    }
    else {
        byte = hexFull;
    }
    let bits = parseInt(byte, 16);
    const bitMask = 1 << 8 - (number.get() - (byteNum - 1) * 8);
    if ((val === null || val === void 0 ? void 0 : val.get()) === 0 || (val === null || val === void 0 ? void 0 : val.get()) === "0") {
        bits = bits &= ~bitMask;
    }
    else {
        bits = bits |= bitMask;
    }
    const reconstructed = pre + bits.toString(16).toUpperCase().padStart(2, "0") + post;
    hex.set(reconstructed);
}
exports.setBit = setBit;

},{}],132:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHandler = void 0;
function setHandler(_methods, _f, _activation) {
    // todo
    return;
}
exports.setHandler = setHandler;

},{}],133:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLocale = void 0;
function setLocale(_source) {
    // todo
}
exports.setLocale = setLocale;

},{}],134:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shift = void 0;
const compare_1 = require("../compare");
function shift(target, options) {
    if ((options === null || options === void 0 ? void 0 : options.mode) === "BYTE") {
        shift_byte_mode(target, options);
    }
    else {
        shift_character_mode(target, options);
    }
}
exports.shift = shift;
function shift_character_mode(target, options) {
    let value = target.get();
    if (options === null || options === void 0 ? void 0 : options.deletingLeading) {
        let leading = options.deletingLeading;
        if (typeof leading !== "string") {
            leading = leading.get();
        }
        const split = leading.split("");
        while (split.some(s => value.substr(0, 1) === s)) {
            value = value.substr(1);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.deletingTrailing) {
        let trailing = options.deletingTrailing;
        if (typeof trailing !== "string") {
            trailing = trailing.get();
        }
        if ((0, compare_1.co)(value, " ") === false) {
            while (value.endsWith(trailing)) {
                value = " ".repeat(trailing.length) + value.substring(0, value.length - trailing.length);
            }
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.places) {
        const p = options.places.get();
        if (options.circular) {
            value = value.substr(p) + value.substr(0, p);
        }
        else {
            value = value.substr(p);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.to) {
        let to = "";
        if (typeof options.to === "string") {
            to = options.to;
        }
        else {
            to = options.to.get();
        }
        const index = value.search(to);
        if (index > 0) {
            value = value.substr(index);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.circular) {
        value = value.substr(1) + value.substr(0, 1);
    }
    else {
        value = value.substr(1);
    }
    target.set(value);
}
function shift_byte_mode(target, options) {
    let value = target.get();
    if (options === null || options === void 0 ? void 0 : options.deletingLeading) {
        let leading = options.deletingLeading;
        if (typeof leading !== "string") {
            leading = leading.get();
        }
        const split = leading.split("");
        while (split.some(s => value.substr(0, 2) === s)) {
            value = value.substr(2);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.places) {
        const p = options.places.get() * 2;
        if (options.circular) {
            value = value.substr(p) + value.substr(0, p);
        }
        else {
            value = value.substr(p);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.to) {
        let to = "";
        if (typeof options.to === "string") {
            to = options.to;
        }
        else {
            to = options.to.get();
        }
        const index = value.search(to);
        if (index > 0) {
            value = value.substr(index);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.circular) {
        value = value.substr(2) + value.substr(0, 2);
    }
    else {
        value = value.substr(2);
    }
    target.set(value);
}

},{"../compare":60}],135:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
const types_1 = require("../types");
const compare_1 = require("../compare");
function compare(a, b, input) {
    const componentName = input.component;
    const descending = input.descending;
    let vala = a.get()[componentName];
    let valb = b.get()[componentName];
    if (componentName.toLowerCase() === "table_line") {
        vala = a.get();
        valb = b.get();
    }
    if ((0, compare_1.eq)(vala, valb)) {
        return 0;
    }
    else if (descending && (0, compare_1.gt)(vala, valb)) {
        return -1;
    }
    else if (!descending && (0, compare_1.lt)(vala, valb)) {
        return -1;
    }
    else {
        return 1;
    }
}
function sort(input, options) {
    //  console.dir(options);
    if (input instanceof types_1.FieldSymbol) {
        const pnt = input.getPointer();
        if (pnt === undefined) {
            throw new Error("GETWA_NOT_ASSIGNED");
        }
        sort(pnt, options);
        return;
    }
    if (options === null || options === void 0 ? void 0 : options.by) {
        if (options.by.length === 0) {
            throw "SortByLengthZero";
        }
        input.sort((a, b) => {
            for (const c of options.by || []) {
                const res = compare(a, b, c);
                if (res !== 0) {
                    return res;
                }
            }
            return 0;
        });
    }
    else {
        const descending = (options === null || options === void 0 ? void 0 : options.descending) === true;
        input.sort((a, b) => {
            if ((0, compare_1.eq)(a, b)) {
                return 0;
            }
            else if (descending && (0, compare_1.gt)(a, b)) {
                return -1;
            }
            else if (!descending && (0, compare_1.lt)(a, b)) {
                return -1;
            }
            else {
                return 1;
            }
        });
    }
}
exports.sort = sort;

},{"../compare":60,"../types":151}],136:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const types_1 = require("../types");
function split(param) {
    const source = typeof param.source === "string" ? param.source : param.source.get();
    const at = typeof param.at === "string" ? param.at : param.at.get();
    const split = source.includes(at) ? source.split(at) : [];
    if (param.table) {
        if (source.endsWith(at)) {
            split.pop();
        }
        param.table.clear();
        for (const s of split) {
            param.table.append(new types_1.String().set(s));
        }
        if (source !== "" && split.length === 0) {
            param.table.append(new types_1.String().set(source));
        }
    }
    if (param.targets) {
        if (split.length === 0) {
            split.push(source);
        }
        for (const t of param.targets) {
            t.clear();
            if (split.length > 0) {
                t.set(split.shift().replace(/ +$/, ""));
            }
        }
        if (split.length > 0) {
            const concat = split.join(at);
            const last = param.targets[param.targets.length - 1];
            last.set(last.get() + at + concat);
        }
    }
}
exports.split = split;

},{"../types":151}],137:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translate = void 0;
function translate(input, i) {
    let c = i;
    if (typeof c !== "string") {
        c = c.get();
    }
    if (c === "LOWER") {
        input.set(input.get().toLowerCase());
    }
    else if (c === "UPPER") {
        input.set(input.get().toUpperCase());
    }
    else {
        const chunks = c.match(/.{1,2}/g);
        for (const chunk of chunks || []) {
            let search = chunk.substr(0, 1);
            const replace = chunk.substr(1, 1);
            // regexp escaping
            if (search === "+"
                || search === "*"
                || search === "?"
                || search === "."
                || search === "^"
                || search === "$"
                || search === "|"
                || search === "["
                || search === "]"
                || search === "\\"
                || search === "("
                || search === ")") {
                search = "\\" + search;
            }
            input.set(input.get().replace(new RegExp(search, "g"), replace));
        }
    }
}
exports.translate = translate;

},{}],138:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDatabase = void 0;
const types_1 = require("../types");
const insert_database_1 = require("./insert_database");
class UpdateDatabase {
    constructor(context) {
        this.context = context;
    }
    async updateDatabase(table, options) {
        if (options.table instanceof types_1.FieldSymbol) {
            options.table = options.table.getPointer();
        }
        if (options.from instanceof types_1.FieldSymbol) {
            options.from = options.from.getPointer();
        }
        if (typeof table !== "string") {
            table = table.get();
        }
        // @ts-ignore
        const keys = abap.DDIC[table.toUpperCase()].keyFields;
        const where = [];
        const set = [];
        if (options.from) {
            const structure = options.from.get();
            for (const k of Object.keys(structure)) {
                const str = k + " = " + (0, insert_database_1.toValue)(structure[k].get());
                if (keys.includes(k.toUpperCase())) {
                    where.push(str);
                }
                else {
                    set.push(str);
                }
            }
        }
        else if (options.set) {
            if (options.where) {
                where.push(options.where);
            }
            set.push(...options.set);
        }
        else {
            throw "updateDatabase, todo";
        }
        const { subrc, dbcnt } = await this.context.defaultDB().update({ table, where: where.join(" AND "), set });
        // @ts-ignore
        abap.builtin.sy.get().subrc.set(subrc);
        // @ts-ignore
        abap.builtin.sy.get().dbcnt.set(dbcnt);
        return subrc;
    }
}
exports.UpdateDatabase = UpdateDatabase;

},{"../types":151,"./insert_database":117}],139:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStatement = void 0;
const types_1 = require("../types");
class WriteStatement {
    constructor(context) {
        this.context = context;
    }
    write(source, options) {
        var _a;
        if ((options === null || options === void 0 ? void 0 : options.skipLine) === true) {
            this.context.console.add("\n");
        }
        else {
            if ((options === null || options === void 0 ? void 0 : options.newLine) === true && this.context.console.get().length > 0) {
                this.context.console.add("\n");
            }
            let result = "";
            if (typeof source === "string" || typeof source === "number") {
                result = source.toString();
            }
            else if (source instanceof types_1.Structure) {
                const obj = source.getCharacter();
                this.write(obj, Object.assign({}, options));
            }
            else if (source instanceof types_1.Float) {
                if (((_a = options === null || options === void 0 ? void 0 : options.exponent) === null || _a === void 0 ? void 0 : _a.get()) === 0) {
                    const tens = source.getRaw().toFixed(0).length - 1;
                    if (options.noSign === true && source.getRaw() < 0) {
                        result = source.getRaw().toFixed(17 - tens).replace(".", ",");
                        result = result.replace("-", "");
                    }
                    else {
                        result = source.getRaw().toFixed(16 - tens).replace(".", ",");
                    }
                }
                else {
                    result = source.get().toString();
                }
            }
            else if (source instanceof types_1.Packed) {
                result = source.get().toFixed(source.getDecimals());
            }
            else {
                result = source.get().toString();
            }
            if (options === null || options === void 0 ? void 0 : options.target) {
                options.target.set(result);
            }
            else {
                this.context.console.add(result);
            }
        }
    }
}
exports.WriteStatement = WriteStatement;

},{"../types":151}],140:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateFormatting = void 0;
const types_1 = require("./types");
function templateFormatting(source, options) {
    let text = "";
    if (source instanceof types_1.FieldSymbol && source.getPointer() === undefined) {
        throw new Error("GETWA_NOT_ASSIGNED");
    }
    else if (source instanceof types_1.Table) {
        throw new Error("STRG_ILLEGAL_DATA_TYPE");
    }
    else if (source instanceof types_1.Character) {
        text = source.getTrimEnd();
    }
    else {
        text = source.get() + "";
    }
    if ((options === null || options === void 0 ? void 0 : options.currency) !== undefined) {
        throw "template formatting with currency not supported";
    }
    if ((options === null || options === void 0 ? void 0 : options.timestamp) === "iso") {
        text = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2) + "T" + text.substr(8, 2) + ":" + text.substr(10, 2) + ":" + text.substr(12, 2);
        if (text === "0--T::") {
            text = "0000-00-00T00:00:00";
        }
    }
    if ((options === null || options === void 0 ? void 0 : options.date) === "iso") {
        text = text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(6, 2);
    }
    if ((options === null || options === void 0 ? void 0 : options.time) === "iso") {
        text = text.substr(0, 2) + ":" + text.substr(2, 2) + ":" + text.substr(4, 2);
    }
    if ((options === null || options === void 0 ? void 0 : options.width) && options.pad) {
        if (options.align === "right") {
            text = text.trimEnd().padStart(options.width, options.pad);
        }
        else {
            text = text.trimEnd().padEnd(options.width, options.pad);
        }
    }
    else if (options === null || options === void 0 ? void 0 : options.width) {
        text = text.trimEnd().padEnd(options.width, " ");
    }
    else if ((options === null || options === void 0 ? void 0 : options.decimals) && source instanceof types_1.Integer) {
        text = source.get().toFixed(options.decimals);
    }
    else if ((options === null || options === void 0 ? void 0 : options.decimals) && source instanceof types_1.Packed) {
        text = source.get().toFixed(options.decimals);
    }
    else if ((options === null || options === void 0 ? void 0 : options.decimals) && source instanceof types_1.Float) {
        text = source.getRaw().toFixed(options.decimals);
    }
    else if (source instanceof types_1.DecFloat34) {
        const raw = source.getRaw();
        if (Number.isInteger(raw)) {
            text = raw.toFixed(0);
        }
        else {
            text = raw + "";
        }
    }
    else if (source instanceof types_1.Float) {
        const raw = source.getRaw();
        if (Number.isInteger(raw)) {
            text = raw.toFixed(0);
        }
        else {
            text = raw.toFixed(16);
        }
    }
    return text;
}
exports.templateFormatting = templateFormatting;

},{"./types":151}],141:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
function throwError(name) {
    // @ts-ignore
    if (abap.Classes[name] !== undefined) {
        // @ts-ignore
        throw new abap.Classes[name]();
    }
    else {
        throw `Global class ${name} not found`;
    }
}
exports.throwError = throwError;

},{}],142:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFromDate = exports.getDateFromNumber = void 0;
function getDateFromNumber(value) {
    const msInOneDay = 24 * 60 * 60 * 1000;
    const date = new Date(-62135596800000 + value * msInOneDay);
    let removeJulianLeaps = 2;
    if (value <= 577736) {
        let beforeGregorian = date.getFullYear() <= 1582 ? date.getFullYear() : 1582;
        if (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDay() < 29)) {
            beforeGregorian -= 1;
        }
        removeJulianLeaps = Math.floor(beforeGregorian / 100) - Math.floor(beforeGregorian / 400);
    }
    date.setTime(date.getTime() - removeJulianLeaps * msInOneDay);
    let ret = date.getFullYear().toString().padStart(4, "0");
    ret += (date.getMonth() + 1).toString().padStart(2, "0");
    ret += date.getDate().toString().padStart(2, "0");
    return ret;
}
exports.getDateFromNumber = getDateFromNumber;
function getNumberFromDate(value) {
    const msInOneDay = 24 * 60 * 60 * 1000;
    const date = new Date(-62135596800000);
    date.setUTCFullYear(parseInt(value.substr(0, 4), 10));
    date.setUTCMonth(parseInt(value.substr(4, 2), 10) - 1);
    date.setUTCDate(parseInt(value.substr(6, 2), 10));
    let days = Math.floor((date.getTime() + 62135596800000) / msInOneDay);
    let addJulianLeaps = 2;
    if (days <= 577736) {
        let beforeGregorian = date.getFullYear() <= 1582 ? date.getFullYear() : 1582;
        if (date.getMonth() < 1 || (date.getMonth() === 1 && date.getDay() < 29)) {
            beforeGregorian -= 1;
        }
        addJulianLeaps = Math.floor(beforeGregorian / 100) - Math.floor(beforeGregorian / 400);
    }
    days = days + addJulianLeaps;
    return days;
}
exports.getNumberFromDate = getNumberFromDate;

},{}],143:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABAPObject = void 0;
const field_symbol_1 = require("./field_symbol");
class ABAPObject {
    constructor(input) {
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
        this.clear();
    }
    get() {
        return this.value;
    }
    clear() {
        this.value = undefined;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (value instanceof ABAPObject) {
            this.value = value.get();
        }
        else if (value instanceof field_symbol_1.FieldSymbol) {
            this.value = value.getPointer().get();
        }
        else {
            this.value = value;
        }
        return this;
    }
}
exports.ABAPObject = ABAPObject;

},{"./field_symbol":148}],144:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const _parse_1 = require("../operators/_parse");
const throw_error_1 = require("../throw_error");
const field_symbol_1 = require("./field_symbol");
const structure_1 = require("./structure");
// eslint-disable-next-line prefer-const
let featureFixLength = true;
class Character {
    constructor(length, extra) {
        this.length = length || 1;
        if (typeof this.length === "object") {
            throw "Character, invalid length, object: " + JSON.stringify(this.length);
        }
        else if (this.length <= 0) {
            throw "Character, invalid length, less than zero";
        }
        this.extra = extra;
        this.clear();
    }
    set(value) {
        if (typeof value === "string" || typeof value === "number") {
            this.value = value;
        }
        else if (value instanceof field_symbol_1.FieldSymbol) {
            if (value.getPointer() === undefined) {
                throw new Error("GETWA_NOT_ASSIGNED");
            }
            this.set(value.getPointer());
            return this;
        }
        else if (value instanceof structure_1.Structure) {
            this.set(value.getCharacter());
            return this;
        }
        else {
            this.value = value.get() + "";
        }
        if (this.value.length > this.length) {
            this.value = this.value.substr(0, this.length);
        }
        else if (featureFixLength && this.value.length < this.length) {
            this.value.padEnd(this.length, " ");
        }
        return this;
    }
    getQualifiedName() {
        var _a;
        return (_a = this.extra) === null || _a === void 0 ? void 0 : _a.qualifiedName;
    }
    getConversionExit() {
        var _a;
        return (_a = this.extra) === null || _a === void 0 ? void 0 : _a.conversionExit;
    }
    getDDICName() {
        var _a;
        return (_a = this.extra) === null || _a === void 0 ? void 0 : _a.ddicName;
    }
    getLength() {
        return this.length;
    }
    clear() {
        if (featureFixLength) {
            this.value = " ".repeat(this.length);
        }
        else {
            this.value = "";
        }
    }
    get() {
        return this.value;
    }
    getTrimEnd() {
        return this.value.replace(/ *$/, "");
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        if ((input.offset && input.offset >= this.length)
            || (input.offset && input.offset < 0)
            || (input.length && input.length < 0)) {
            (0, throw_error_1.throwError)("CX_SY_RANGE_OUT_OF_BOUNDS");
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new Character(ret.length);
        r.set(ret);
        return r;
    }
}
exports.Character = Character;

},{"../operators/_parse":80,"../throw_error":141,"./field_symbol":148,"./structure":156}],145:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataReference = void 0;
const string_1 = require("./string");
const _parse_1 = require("../operators/_parse");
const field_symbol_1 = require("./field_symbol");
class DataReference {
    constructor(type) {
        this.pointer = undefined;
        this.type = type;
    }
    getType() {
        return this.type;
    }
    assign(pointer) {
        this.pointer = pointer;
    }
    unassign() {
        this.pointer = undefined;
    }
    getPointer() {
        return this.pointer;
    }
    dereference() {
        return this.pointer;
    }
    ///////////////
    clear() {
        this.unassign();
        //    return this.pointer?.clear();
    }
    get() {
        var _a;
        if (this.pointer === this) {
            throw "Cyclic data reference";
        }
        // @ts-ignore
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.get();
    }
    array() {
        var _a;
        // @ts-ignore
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.array();
    }
    set(value) {
        var _a;
        if (value instanceof DataReference) {
            this.pointer = value.getPointer();
            return this;
        }
        else if (value instanceof field_symbol_1.FieldSymbol) {
            if (value.getPointer() === undefined) {
                throw new Error("GETWA_NOT_ASSIGNED");
            }
            else if (value.getPointer() instanceof DataReference) {
                this.pointer = value.getPointer();
                return this;
            }
            else {
                throw new Error("OBJECTS_MOVE_NOT_SUPPORTED");
            }
        }
        else {
            return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.set(value);
        }
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        // Assuming we're interested in Strings here, for now...
        let ret = this.get();
        if (input === null || input === void 0 ? void 0 : input.offset) {
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.DataReference = DataReference;

},{"../operators/_parse":80,"./field_symbol":148,"./string":155}],146:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Date = void 0;
const string_1 = require("./string");
const _date_helper_1 = require("./_date_helper");
const float_1 = require("./float");
const _parse_1 = require("../operators/_parse");
class Date {
    constructor(input) {
        this.clear();
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            if (value <= 0 || value > 3652060) {
                this.value = "00000000";
            }
            else {
                this.value = (0, _date_helper_1.getDateFromNumber)(value);
            }
        }
        else if (value instanceof float_1.Float) {
            this.set(Math.round(value.getRaw()));
        }
        else if (typeof value === "string") {
            this.value = value;
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = "00000000";
    }
    get() {
        return this.value;
    }
    getNumeric() {
        return (0, _date_helper_1.getNumberFromDate)(this.value);
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.Date = Date;

},{"../operators/_parse":80,"./_date_helper":142,"./float":149,"./string":155}],147:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecFloat34 = void 0;
const _1 = require(".");
const hex_1 = require("./hex");
const xstring_1 = require("./xstring");
class DecFloat34 {
    constructor() {
        this.value = 0;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string" && value.trim().length === 0) {
            this.value = 0;
        }
        else if (typeof value === "string") {
            this.value = parseFloat(value);
        }
        else if (value instanceof _1.Float) {
            this.value = value.getRaw();
        }
        else if (value instanceof hex_1.Hex || value instanceof xstring_1.XString) {
            // todo, how/if should this work?
            this.set(parseInt(value.get(), 16));
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = 0;
    }
    getRaw() {
        return this.value;
    }
    get() {
        let text = new Number(this.value).toString();
        text = text.replace(".", ",");
        return text;
    }
}
exports.DecFloat34 = DecFloat34;

},{".":151,"./hex":150,"./xstring":160}],148:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSymbol = void 0;
const table_1 = require("./table");
const string_1 = require("./string");
const hex_1 = require("./hex");
const _parse_1 = require("../operators/_parse");
const float_1 = require("./float");
const data_reference_1 = require("./data_reference");
class FieldSymbol {
    constructor(type) {
        this.pointer = undefined;
        this.casting = false;
        this.type = type;
    }
    getQualifiedName() {
        // @ts-ignore
        return this.type.getQualifiedName();
    }
    assign(pointer) {
        this.pointer = pointer;
    }
    setCasting() {
        this.casting = true;
    }
    unassign() {
        this.pointer = undefined;
    }
    isAssigned() {
        return this.pointer !== undefined;
    }
    getPointer() {
        if (this.casting) {
            // todo, this wont work for everything, eg changing CASTING'ed values
            return this.get();
        }
        return this.pointer;
    }
    dereference() {
        if (this.pointer instanceof data_reference_1.DataReference) {
            return this.pointer.getPointer();
        }
        else {
            return this.pointer;
        }
    }
    ///////////////
    clear() {
        var _a;
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.clear();
    }
    get() {
        var _a, _b, _c;
        if (this.casting) {
            if (this.type instanceof hex_1.Hex) {
                const pt = this.pointer;
                if (pt instanceof float_1.Float) {
                    const buf = Buffer.allocUnsafe(8);
                    buf.writeDoubleLE(pt.getRaw());
                    return buf.toString("hex").toUpperCase();
                }
                else {
                    // @ts-ignore
                    const ret = new string_1.String().set(Buffer.from((_a = this.pointer) === null || _a === void 0 ? void 0 : _a.get(), "utf16le").toString("hex"));
                    return ret.get();
                }
            }
            else {
                // @ts-ignore
                const ret = new string_1.String().set(Buffer.from((_b = this.pointer) === null || _b === void 0 ? void 0 : _b.get(), "hex").toString("utf16le"));
                return ret.get();
            }
        }
        else {
            // @ts-ignore
            return (_c = this.pointer) === null || _c === void 0 ? void 0 : _c.get();
        }
    }
    appendInitial() {
        if (this.pointer instanceof table_1.Table) {
            return this.pointer.appendInitial();
        }
        return undefined;
    }
    array() {
        var _a;
        // @ts-ignore
        return (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.array();
    }
    set(value) {
        var _a;
        (_a = this.pointer) === null || _a === void 0 ? void 0 : _a.set(value);
        return this;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        // Assuming we're interested in Strings here, for now...
        let ret = this.get();
        if (input === null || input === void 0 ? void 0 : input.offset) {
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.FieldSymbol = FieldSymbol;

}).call(this)}).call(this,require("buffer").Buffer)
},{"../operators/_parse":80,"./data_reference":145,"./float":149,"./hex":150,"./string":155,"./table":157,"buffer":163}],149:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float = void 0;
const hex_1 = require("./hex");
const xstring_1 = require("./xstring");
/*
function getNumberParts(x: number) {
  if(isNaN(x)) {
    throw "Float NaN";
  }
  const sig = x > 0 ? 1 : -1;
  if (!isFinite(x)) {
    throw "Float not finite";
  }
  x = Math.abs(x);
  const exp = Math.floor(Math.log(x) * Math.LOG2E) - 52;
  const man = x / Math.pow(2, exp);
  return {mantissa: sig * man, exponent: exp};
}
*/
class Float {
    constructor(input) {
        this.value = 0;
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string" && value.trim().length === 0) {
            this.value = 0;
        }
        else if (typeof value === "string") {
            this.value = parseFloat(value);
        }
        else if (value instanceof Float) {
            this.value = value.getRaw();
        }
        else if (value instanceof hex_1.Hex || value instanceof xstring_1.XString) {
            // todo, how/if should this work?
            this.set(parseInt(value.get(), 16));
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = 0;
    }
    getRaw() {
        return this.value;
    }
    get() {
        let text = new Number(this.value).toExponential(16);
        text = text.replace(".", ",");
        if (text.includes("e+")) {
            const split = text.split("e+");
            const mantissa = split[0];
            const exponent = split[1].padStart(2, "0");
            return mantissa + "E+" + exponent;
        }
        else {
            const split = text.split("e-");
            const mantissa = split[0];
            const exponent = split[1].padStart(2, "0");
            return mantissa + "E-" + exponent;
        }
    }
}
exports.Float = Float;

},{"./hex":150,"./xstring":160}],150:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hex = void 0;
const _parse_1 = require("../operators/_parse");
const float_1 = require("./float");
const xstring_1 = require("./xstring");
class Hex {
    constructor(input) {
        this.length = (input === null || input === void 0 ? void 0 : input.length) ? input === null || input === void 0 ? void 0 : input.length : 1;
        this.value = "0".repeat(this.length * 2);
    }
    set(value) {
        if (typeof value === "string") {
            this.value = value;
        }
        else if (typeof value === "number") {
            if (value < 0) {
                const maxVal = Math.pow(2, this.length * 8);
                this.value = Math.round(value + maxVal).toString(16);
            }
            else {
                this.value = Math.round(value).toString(16);
            }
            this.value = this.value.padStart(this.length * 2, "0");
        }
        else {
            let v = value.get();
            if (value instanceof float_1.Float) {
                v = value.getRaw();
                this.set(v);
            }
            else if (typeof v === "number") {
                this.set(v);
            }
            else {
                this.value = v;
                if (this.value.match(/^(?![A-F0-9])/)) {
                    this.value = "";
                }
            }
        }
        if (this.value.length > this.length * 2) {
            this.value = this.value.substr(0, this.length * 2);
        }
        if (this.value.length < this.length * 2) {
            this.value = this.value.padEnd(this.length * 2, "0");
        }
        this.value = this.value.toUpperCase();
    }
    getLength() {
        return this.length;
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset * 2);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length * 2);
        }
        const r = new xstring_1.XString();
        r.set(ret);
        return r;
    }
}
exports.Hex = Hex;

},{"../operators/_parse":80,"./float":149,"./xstring":160}],151:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./abap_object"), exports);
__exportStar(require("./character"), exports);
__exportStar(require("./data_reference"), exports);
__exportStar(require("./date"), exports);
__exportStar(require("./decfloat34"), exports);
__exportStar(require("./field_symbol"), exports);
__exportStar(require("./float"), exports);
__exportStar(require("./hex"), exports);
__exportStar(require("./integer"), exports);
__exportStar(require("./numc"), exports);
__exportStar(require("./packed"), exports);
__exportStar(require("./string"), exports);
__exportStar(require("./structure"), exports);
__exportStar(require("./table"), exports);
__exportStar(require("./time"), exports);
__exportStar(require("./utc_long"), exports);
__exportStar(require("./xstring"), exports);

},{"./abap_object":143,"./character":144,"./data_reference":145,"./date":146,"./decfloat34":147,"./field_symbol":148,"./float":149,"./hex":150,"./integer":152,"./numc":153,"./packed":154,"./string":155,"./structure":156,"./table":157,"./time":158,"./utc_long":159,"./xstring":160}],152:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Integer = void 0;
const throw_error_1 = require("../throw_error");
const float_1 = require("./float");
const hex_1 = require("./hex");
const xstring_1 = require("./xstring");
const digits = new RegExp(/^\s*-?\+?\d+\.?\d*$/i);
class Integer {
    constructor(input) {
        this.value = 0;
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = Math.round(value);
        }
        else if (typeof value === "string") {
            if (value.trim().length === 0) {
                value = "0";
            }
            else if (digits.test(value) === false) {
                (0, throw_error_1.throwError)("CX_SY_CONVERSION_NO_NUMBER");
            }
            this.value = parseInt(value, 10);
        }
        else if (value instanceof float_1.Float) {
            this.set(Math.round(value.getRaw()));
        }
        else if (value instanceof hex_1.Hex || value instanceof xstring_1.XString) {
            let num = parseInt(value.get(), 16);
            // handle two complement,
            if (value instanceof hex_1.Hex && value.getLength() >= 4) {
                const maxVal = Math.pow(2, value.get().length / 2 * 8);
                if (num > maxVal / 2 - 1) {
                    num = num - maxVal;
                }
            }
            this.set(num);
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = 0;
    }
    get() {
        return this.value;
    }
}
exports.Integer = Integer;

},{"../throw_error":141,"./float":149,"./hex":150,"./xstring":160}],153:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Numc = void 0;
class Numc {
    constructor(input) {
        this.length = (input === null || input === void 0 ? void 0 : input.length) ? input === null || input === void 0 ? void 0 : input.length : 1;
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
        this.clear();
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value.toString();
        }
        else if (typeof value === "string") {
            this.value = parseInt(value, 10) + "";
        }
        else {
            this.set(value.get());
            return;
        }
        if (this.value.length > this.length) {
            this.value = this.value.substr(this.value.length - this.length, this.length);
        }
        else {
            const pad = this.length - this.value.length;
            if (pad > 0) {
                this.value = "0".repeat(pad) + this.value;
            }
        }
        return this;
    }
    getLength() {
        return this.length;
    }
    clear() {
        this.value = "0".repeat(this.length);
    }
    get() {
        return this.value;
    }
    getOffset(_input) {
        throw "todo, runtime, numc getOffset()";
    }
}
exports.Numc = Numc;

},{}],154:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packed = void 0;
const float_1 = require("./float");
class Packed {
    constructor(input) {
        this.value = 0;
        this.length = 666;
        if (input === null || input === void 0 ? void 0 : input.length) {
            this.length = input.length;
        }
        this.decimals = 0;
        if (input === null || input === void 0 ? void 0 : input.decimals) {
            this.decimals = input.decimals;
        }
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    round(value, places) {
        // @ts-ignore
        return +(Math.round(value + "e+" + places) + "e-" + places);
    }
    set(value) {
        if (typeof value === "number") {
            this.value = value;
        }
        else if (typeof value === "string") {
            this.value = this.round(parseFloat(value), this.decimals);
        }
        else if (value instanceof float_1.Float) {
            this.value = this.round(value.getRaw(), this.decimals);
        }
        else {
            this.set(value.get());
        }
    }
    getLength() {
        return this.length;
    }
    getDecimals() {
        return this.decimals;
    }
    clear() {
        this.value = 0;
    }
    get() {
        return this.value;
    }
}
exports.Packed = Packed;

},{"./float":149}],155:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.String = void 0;
const _parse_1 = require("../operators/_parse");
const throw_error_1 = require("../throw_error");
const character_1 = require("./character");
const integer_1 = require("./integer");
const structure_1 = require("./structure");
class String {
    constructor(input) {
        this.value = "";
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "string") {
            this.value = value;
        }
        else if (typeof value === "number") {
            this.value = value.toString();
        }
        else if (value instanceof character_1.Character) {
            // replace trailing blanks if the source is a Character string
            this.value = value.getTrimEnd();
        }
        else if (value instanceof structure_1.Structure) {
            this.value = value.getCharacter();
        }
        else if (value instanceof integer_1.Integer) {
            const lv_sign = (parseInt(value.get(), 10) >= 0) ? " " : "-";
            this.value = value.get() + lv_sign;
        }
        else {
            this.value = value.get() + "";
        }
        return this;
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        if ((input.offset && input.offset > this.value.length)
            || (input.offset && input.offset < 0)
            || (input.length && input.length < 0)) {
            (0, throw_error_1.throwError)("CX_SY_RANGE_OUT_OF_BOUNDS");
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new String();
        r.set(ret);
        return r;
    }
}
exports.String = String;

},{"../operators/_parse":80,"../throw_error":141,"./character":144,"./integer":152,"./structure":156}],156:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Structure = void 0;
const clone_1 = require("../clone");
const field_symbol_1 = require("./field_symbol");
const table_1 = require("./table");
const _parse_1 = require("../operators/_parse");
const character_1 = require("./character");
const throw_error_1 = require("../throw_error");
class Structure {
    constructor(fields, qualifiedName) {
        this.value = fields;
        this.qualifiedName = qualifiedName === null || qualifiedName === void 0 ? void 0 : qualifiedName.toUpperCase();
    }
    clear() {
        for (const f in this.value) {
            // @ts-ignore
            this.value[f].clear();
        }
        return this;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(input) {
        if (input === undefined) {
            return;
        }
        if (input instanceof field_symbol_1.FieldSymbol) {
            this.set(input.getPointer());
        }
        else if (input instanceof table_1.Table) {
            throw "Structure, input is a table";
        }
        else if (input instanceof Structure) {
            const obj = input.get();
            const keys1 = Object.keys(obj);
            const keys2 = Object.keys(this.value);
            /*
            console.dir(keys1);
            console.dir(keys2);
      */
            for (let i = 0; i < keys1.length; i++) {
                const key1 = keys1[i];
                const key2 = keys2[i];
                this.value[key2].set((0, clone_1.clone)(obj[key1]));
            }
            /*
                  for (const f in obj) {
                    // @ts-ignore
                    this.value[f].set(clone(obj[f]));
                  }
                  */
        }
        else {
            this.setCharacter(input);
        }
        return this;
    }
    setCharacter(input) {
        this.clear();
        let val = input;
        if (typeof val !== "string") {
            val = val.get() + "";
        }
        for (const key of Object.keys(this.value)) {
            const targetLength = this.value[key].getLength();
            this.value[key].set(val.substr(0, targetLength));
            val = val.substr(targetLength);
        }
    }
    get() {
        return this.value;
    }
    getCharacter() {
        let val = "";
        for (const v in this.value) {
            val += this.value[v].get();
        }
        return val;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        const val = this.getCharacter();
        if ((input.offset && input.offset >= val.length)
            || (input.offset && input.offset < 0)
            || (input.length && input.length < 0)) {
            (0, throw_error_1.throwError)("CX_SY_RANGE_OUT_OF_BOUNDS");
        }
        let ret = val;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new character_1.Character(ret.length);
        r.set(ret);
        return r;
    }
}
exports.Structure = Structure;

},{"../clone":48,"../operators/_parse":80,"../throw_error":141,"./character":144,"./field_symbol":148,"./table":157}],157:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.LoopIndex = exports.TableAccessType = void 0;
const integer_1 = require("./integer");
const string_1 = require("./string");
const clone_1 = require("../clone");
const structure_1 = require("./structure");
const field_symbol_1 = require("./field_symbol");
const data_reference_1 = require("./data_reference");
const insert_internal_1 = require("../statements/insert_internal");
const sort_1 = require("../statements/sort");
var TableAccessType;
(function (TableAccessType) {
    TableAccessType["standard"] = "STANDARD";
    TableAccessType["sorted"] = "SORTED";
    TableAccessType["hashed"] = "HASHED";
    TableAccessType["index"] = "INDEX";
    TableAccessType["any"] = "ANY";
})(TableAccessType = exports.TableAccessType || (exports.TableAccessType = {}));
class LoopIndex {
    constructor(start) {
        this.index = start;
    }
}
exports.LoopIndex = LoopIndex;
class Table {
    constructor(rowType, options, qualifiedName) {
        this.value = [];
        this.secondaryIndexes = {};
        this.loops = new Set();
        this.rowType = rowType;
        this.options = options;
        this.isStructured = rowType instanceof structure_1.Structure;
        if ((options === null || options === void 0 ? void 0 : options.withHeader) === true) {
            this.header = (0, clone_1.clone)(this.rowType);
        }
        if (this.options === undefined) {
            this.options = {
                primaryKey: {
                    name: "primary_key",
                    type: TableAccessType.standard,
                    keyFields: [],
                    isUnique: false,
                },
                withHeader: false,
            };
        }
        this.qualifiedName = qualifiedName === null || qualifiedName === void 0 ? void 0 : qualifiedName.toUpperCase();
    }
    getKeyByName(name) {
        var _a, _b;
        return (_b = (_a = this.getOptions()) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.find(s => s.name.toUpperCase() === name.toUpperCase());
    }
    getSecondaryIndex(name) {
        if (this.secondaryIndexes[name.toUpperCase()]) {
            return this.secondaryIndexes[name.toUpperCase()];
        }
        const secondary = this.getKeyByName(name);
        if (secondary === undefined) {
            throw `Table, secondary key "${name}" not found`;
        }
        const copy = (0, clone_1.clone)(this.value);
        (0, sort_1.sort)(copy, { by: secondary.keyFields.map(k => { return { component: k.toLowerCase() }; }) });
        this.secondaryIndexes[name.toUpperCase()] = copy;
        return copy;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    getOptions() {
        return this.options;
    }
    startLoop(start = 0) {
        const l = new LoopIndex(start);
        this.loops.add(l);
        return l;
    }
    unregisterLoop(loop) {
        this.loops.delete(loop);
    }
    getRowType() {
        return this.rowType;
    }
    // Modifications to the array must be done inside this class, in order to keep track of LOOP indexes
    array() {
        return this.value;
    }
    clear() {
        this.value = [];
        this.secondaryIndexes = {};
    }
    set(tab) {
        var _a, _b;
        this.secondaryIndexes = {};
        if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.withHeader) === true) {
            (_b = this.header) === null || _b === void 0 ? void 0 : _b.set(tab);
        }
        else {
            if (!(tab instanceof Table) && !(tab instanceof field_symbol_1.FieldSymbol)) {
                throw "Table, set error";
            }
            this.clear();
            if (tab instanceof field_symbol_1.FieldSymbol) {
                tab = tab.getPointer();
            }
            // this clones the values, and add sorting if required
            (0, insert_internal_1.insertInternal)({ table: this, data: tab, lines: true });
        }
    }
    getHeader() {
        if (this.header === undefined) {
            throw "table, getHeader";
        }
        return this.header;
    }
    insertIndex(item, index) {
        this.secondaryIndexes = {};
        if (item instanceof field_symbol_1.FieldSymbol) {
            const p = item.getPointer();
            if (p === undefined) {
                throw new Error("insertIndex, fs not assigned");
            }
            this.insertIndex(p, index);
            return p;
        }
        const val = this.getValue(item);
        if (index === 0) {
            this.value.unshift(val);
        }
        else {
            this.value.splice(index, 0, val);
        }
        for (const l of this.loops.values()) {
            if (l.index <= index) {
                l.index++;
            }
        }
        return val;
    }
    deleteIndex(index) {
        this.secondaryIndexes = {};
        if (index > this.value.length) {
            return;
        }
        if (index === this.value.length - 1) {
            this.value.pop(); // pop'ing is faster than splice
        }
        else if (index === 0) {
            this.value.shift();
        }
        else {
            this.value.splice(index, 1);
        }
        for (const l of this.loops.values()) {
            if (l.index >= index) {
                l.index--;
            }
        }
    }
    append(item) {
        this.secondaryIndexes = {};
        if (item instanceof field_symbol_1.FieldSymbol) {
            const p = item.getPointer();
            if (p === undefined) {
                throw new Error("APPEND, fs not assigned");
            }
            this.append(p);
            return p;
        }
        else if (item instanceof data_reference_1.DataReference) {
            const ref = new data_reference_1.DataReference(item.getType());
            ref.assign(item.getPointer());
            this.value.push(ref);
            return ref;
        }
        else {
            const val = this.getValue(item);
            this.value.push(val);
            return val;
        }
    }
    appendInitial() {
        this.secondaryIndexes = {};
        // note that this will clone the object
        this.append(this.rowType);
        // @ts-ignore
        abap.builtin.sy.get().tabix.set(this.value.length);
        return this.value[this.value.length - 1];
    }
    sort(compareFn) {
        this.value.sort(compareFn);
    }
    ///////////////////////////
    getValue(item) {
        // make sure to do conversion if needed
        if (typeof item === "number") {
            const tmp = (0, clone_1.clone)(this.getRowType());
            tmp.set(new integer_1.Integer().set(item));
            return tmp;
        }
        else if (typeof item === "string") {
            const tmp = (0, clone_1.clone)(this.getRowType());
            tmp.set(new string_1.String().set(item));
            return tmp;
            // @ts-ignore
            // eslint-disable-next-line max-len
        }
        else if (this.isStructured === true && item.getQualifiedName && this.rowType.getQualifiedName && item.getQualifiedName() !== "" && item.getQualifiedName() === this.rowType.getQualifiedName()) {
            // types match, so no need to do conversions, just clone the item
            const val = (0, clone_1.clone)(item);
            return val;
        }
        else {
            const tmp = (0, clone_1.clone)(this.getRowType());
            tmp.set(item);
            return tmp;
        }
    }
}
exports.Table = Table;

},{"../clone":48,"../statements/insert_internal":118,"../statements/sort":135,"./data_reference":145,"./field_symbol":148,"./integer":152,"./string":155,"./structure":156}],158:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const string_1 = require("./string");
const _1 = require(".");
const _parse_1 = require("../operators/_parse");
class Time {
    constructor(input) {
        this.clear();
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "number") {
            const date = new Date();
            date.setTime(value * 1000);
            this.value = date.getUTCHours().toString().padStart(2, "0") +
                date.getUTCMinutes().toString().padStart(2, "0") +
                date.getUTCSeconds().toString().padStart(2, "0");
        }
        else if (typeof value === "string") {
            this.value = value;
        }
        else if (value instanceof _1.Float) {
            this.set(Math.round(value.getRaw()));
        }
        else {
            this.set(value.get());
        }
        return this;
    }
    clear() {
        this.value = "000000";
    }
    get() {
        return this.value;
    }
    getNumeric() {
        const hours = parseInt(this.value.substr(0, 2), 10);
        const minutes = parseInt(this.value.substr(2, 2), 10);
        const seconds = parseInt(this.value.substr(4, 2), 10);
        return hours * 3600 + minutes * 60 + seconds;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length);
        }
        const r = new string_1.String();
        r.set(ret);
        return r;
    }
}
exports.Time = Time;

},{".":151,"../operators/_parse":80,"./string":155}],159:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTCLong = void 0;
class UTCLong {
    constructor(input) {
        this.clear();
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    getOffset(_input) {
        throw new Error("Method not implemented, getOffset(), utcLong");
    }
    set(_value) {
        // todo
        return this;
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
}
exports.UTCLong = UTCLong;

},{}],160:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XString = void 0;
const _parse_1 = require("../operators/_parse");
const float_1 = require("./float");
class XString {
    constructor(input) {
        this.value = "";
        this.qualifiedName = input === null || input === void 0 ? void 0 : input.qualifiedName;
    }
    getQualifiedName() {
        return this.qualifiedName;
    }
    set(value) {
        if (typeof value === "string") {
            this.value = value;
            const finalLength = Math.ceil(this.value.length / 2) * 2;
            this.value = this.value.padEnd(finalLength, "0");
        }
        else if (typeof value === "number") {
            this.value = Math.round(value).toString(16);
            if (this.value.length % 2 === 1) {
                this.value = "0" + this.value;
            }
        }
        else {
            let v = value.get();
            if (value instanceof float_1.Float) {
                v = value.getRaw();
                this.set(v);
            }
            else if (typeof v === "number") {
                this.value = v.toString(16);
                const finalLength = Math.ceil(this.value.length / 2) * 2;
                this.value = this.value.padStart(finalLength, "0");
            }
            else {
                this.set(v);
            }
        }
    }
    clear() {
        this.value = "";
    }
    get() {
        return this.value;
    }
    getOffset(input) {
        if (input === null || input === void 0 ? void 0 : input.offset) {
            input.offset = (0, _parse_1.parse)(input.offset);
        }
        if (input === null || input === void 0 ? void 0 : input.length) {
            input.length = (0, _parse_1.parse)(input.length);
        }
        let ret = this.value;
        if (input === null || input === void 0 ? void 0 : input.offset) {
            // @ts-ignore
            ret = ret.substr(input.offset * 2);
        }
        if ((input === null || input === void 0 ? void 0 : input.length) !== undefined) {
            // @ts-ignore
            ret = ret.substr(0, input.length * 2);
        }
        const r = new XString();
        r.set(ret);
        return r;
    }
}
exports.XString = XString;

},{"../operators/_parse":80,"./float":149}],161:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitTestResult = void 0;
/* eslint-disable max-len */
class UnitTestMethodResult {
    constructor(name) {
        this.name = name;
        this.result = undefined;
        this.result = undefined;
    }
    pass() {
        this.result = "Pass";
    }
    fail() {
        this.result = "Fail";
    }
    skip() {
        this.result = "Skip";
    }
}
class UnitTestClassResult {
    constructor(name) {
        this.name = name;
        this.methods = [];
    }
    addMethod(name) {
        const ret = new UnitTestMethodResult(name);
        this.methods.push(ret);
        return ret;
    }
}
class UnitTestObjectResult {
    constructor(name) {
        this.name = name;
        this.classes = [];
    }
    addTestClass(name) {
        const ret = new UnitTestClassResult(name);
        this.classes.push(ret);
        return ret;
    }
}
class UnitTestResult {
    constructor() {
        this.objects = [];
    }
    addObject(name) {
        const ret = new UnitTestObjectResult(name);
        this.objects.push(ret);
        return ret;
    }
    xUnitXML() {
        // https://xunit.net/docs/format-xml-v2
        // <assemblies> = project
        // <assembly> = global object/global class
        // <collection> = local class
        // <test> = method
        let ret = `<?xml version="1.0" encoding="utf-8"?>\n<assemblies>\n`;
        for (const obj of this.objects) {
            ret += `  <assembly name="${obj.name}" test-framework="abap-framework" environment="abap-environment">\n`;
            for (const clas of obj.classes) {
                ret += `    <collection name="${clas.name}">\n`;
                for (const meth of clas.methods) {
                    ret += `      ` +
                        `<test name="${obj.name}.${clas.name}.${meth.name}" type="${obj.name}.${clas.name}" method="${obj.name}.${clas.name}.${meth.name}" time="0" result="${meth.result}"></test>\n`;
                }
                ret += `    </collection>\n`;
            }
            ret += `  </assembly>\n`;
        }
        ret += `</assemblies>`;
        return ret;
    }
}
exports.UnitTestResult = UnitTestResult;

},{}],162:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],163:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":162,"buffer":163,"ieee754":164}],164:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],165:[function(require,module,exports){
const n=36e11,t=864e11,e=[1,1e3,1e6,1e9,6e10,n,t],o=[9,6,3];function r(n){return n<=6}function i(n){return n>=6}const s=a("overflow",{constrain:0,reject:1},0);function a(n,t,e){const o=function(n,t,e){return(o,r)=>{if(void 0===o){const t=null!=r?r:e;if(void 0===t)throw new RangeError(`Must specify a ${n}`);return t}if(void 0===t[o])throw new RangeError(`Invalid ${n}: ${o}`);return t[o]}}(n,t,e);return(t,e)=>{const r=d(t);return o(r[n],e)}}function c(n,t,e,o){if(void 0===n)return t;if(!Number.isFinite(n))throw new RangeError("Number must be finite");n=Math.trunc(n);const r=Math.min(Math.max(n,t),e);if(r!==n&&1===o)throw new RangeError("Invalid overflowed value "+n);return r}function u(n,t){const e={};for(const o in t)void 0!==n[o]&&(e[o]=t[o](n[o]));return e}function d(n,t){if(void 0===n&&!t)return{};if(!h(n))throw TypeError("options must be an object or undefined");return n}const l=/object|function/;function h(n){return null!==n&&l.test(typeof n)}const f=a("roundingMode",{halfExpand:Math.round,ceil:Math.ceil,trunc:Math.trunc,floor:Math.floor});function m(){const n=new WeakMap;return[n.get.bind(n),n.set.bind(n)]}function g(n,t){Object.defineProperties(n.prototype,y(t,(n=>({get:n}))))}function y(n,t){const e={};for(const o in n)e[o]=t(n[o],o);return e}function w(n,t,e){const o={};for(const r of t)o[r]=e(n[r]);return o}function p(n,t){const e={};return n.forEach(((n,o)=>{e[n]=t(n,o)})),e}const v=["nanosecond","microsecond","millisecond","second","minute","hour"],M=[...v,"day","week","month","year"],b=M.map((n=>n+"s")),S=p(M,((n,t)=>t)),I=p(b,((n,t)=>t));function F(n,t,e,o){var r;let i;if(void 0===n){if(void 0===t)throw new RangeError("Unit is required");i=t}else if(i=null!=(r=S[n])?r:I[n],void 0===i||i<e||i>o)throw new RangeError("Invalid unit "+n);return i}function T(n,t,o,r,i,s){var a;const c=d(n),u=null!=(a=c.roundingIncrement)?a:1,l=F(c.smallestUnit,o,r,i),h=f(c,s?Math.round:Math.trunc);let m=c.largestUnit;"auto"===m&&(m=void 0);const g=F(m,t=Math.max(t,l),r,i);if(l>g)throw new RangeError("Bad smallestUnit/largestUnit");if(l<6){const n=e[l+1],t=e[l]*u;if(n===t)throw new RangeError("Must not equal larger unit");if(n%t)throw new RangeError("Must divide into larger unit")}return{smallestUnit:l,largestUnit:g,roundingFunc:h,roundingIncrement:u}}function O(n,o,r,i){var s;const a=d("string"==typeof n?{smallestUnit:n}:n,!0),c=null!=(s=a.roundingIncrement)?s:1,u=F(a.smallestUnit,void 0,o,r),l=f(a,Math.round),h=e[u]*c;if(6===u){if(1!==c)throw new RangeError("When smallestUnit is days, roundingIncrement must be 1")}else{const n=i?t:e[u+1];if(!i&&n===h)throw new RangeError("Must not equal larger unit");if(n%h)throw new RangeError("Must divide into larger unit")}return{smallestUnit:u,roundingFunc:l,incNano:h}}const D=Symbol();function N(n,t,...e){return t instanceof n?t:n.from(t,...e)}class Y{toJSON(){return this.toString()}}class E extends Y{valueOf(){throw new Error("Cannot convert object using valueOf")}}const[Z,C]=m();class U extends E{constructor(n){super(),C(this,Object.freeze(n))}getISOFields(){return Z(this)}}function P(n,t){return n<t?-1:n>t?1:0}function R(n){return P(n,0)}function k(n,t,e){return e(n/t)*t}function x(n){return k(n,6e10,j)}function j(n){return Math.round(Math.abs(n))*R(n)}function q(n,t,e){const o=n.div(t).mult(t),r=n.sub(o).toNumber();return o.add(e(r/t)*t)}function H(n,t){return(n%t+t)%t}function L(n,t){return $(e=String(n),t,"0")+e;var e}function B(n,t,e){return n+$(n,t,e)}function $(n,t,e){return new Array(Math.max(0,t-n.length+1)).join(e)}function A(n){return n<0?"-":"+"}const z=Math.pow(10,8);class W{constructor(n,t){this.high=n,this.low=t}sign(){return R(this.high)||R(this.low)}neg(){return new W(-this.high||0,-this.low||0)}abs(){return this.sign()<0?this.neg():this}add(n){const[t,e]=J(n);return Q(this.high+t,this.low+e)}sub(n){const[t,e]=J(n);return Q(this.high-t,this.low-e)}mult(n){return Q(this.high*n,this.low*n)}div(n){const t=this.high/n;let e=String(t);-1!==e.indexOf("e-")&&(e=t.toFixed(20));const o=e.indexOf(".");let r=0;if(-1!==o){let n=e.substr(o+1);n=B(n,8,"0"),n=n.substr(0,8),r=parseInt(n)*(R(t)||1)}return Q(Math.trunc(t)||0,Math.trunc(this.low/n)+r)}toNumber(){return this.high*z+this.low}toBigInt(){return BigInt(this.high)*BigInt(z)+BigInt(this.low)}}function K(n,t){let e,o;if(n instanceof W)e=n.high,o=n.low;else if("number"==typeof n){if(t)throw new TypeError("Must supply bigint, not number");e=Math.trunc(n/z),o=n%z||0}else if("bigint"==typeof n){const t=BigInt(z);e=Number(n/t),o=Number(n%t||0)}else{if("string"!=typeof n)throw new Error("Invalid type of BigNano");{if((n=n.trim()).match(/\D/))throw new SyntaxError(`Cannot parse ${n} to a BigInt`);const t=n.length-8;e=Number(n.substr(t)),o=Number(n.substr(0,t))}}return new W(e,o)}function G(n,t){return P(n.high,t.high)||P(n.low,t.low)}function J(n){return"number"==typeof n?[0,n]:[n.high,n.low]}function Q(n,t){let e=t%z||0,o=n+Math.trunc(t/z);const r=R(o),i=R(e);return i&&r&&i!==r&&(o+=i,e-=z*i),new W(o,e)}const V=b.concat("sign");function X(n){return w(n,V,(n=>-n||0))}function _(n,t){var e,o,r,i,s,a,c,u,d,l;return nn({years:null!=(e=t.years)?e:n.years,months:null!=(o=t.months)?o:n.months,weeks:null!=(r=t.weeks)?r:n.weeks,days:null!=(i=t.days)?i:n.days,hours:null!=(s=t.hours)?s:n.hours,minutes:null!=(a=t.minutes)?a:n.minutes,seconds:null!=(c=t.seconds)?c:n.seconds,milliseconds:null!=(u=t.milliseconds)?u:n.milliseconds,microseconds:null!=(d=t.microseconds)?d:n.microseconds,nanoseconds:null!=(l=t.nanoseconds)?l:n.nanoseconds})}function nn(n){return{...n,sign:tn(n)}}function tn(n){let t=0;for(const e of b){if(n[e]){t=R(n[e]);break}}return t}function en(n){let t=9;for(;t>0&&!n[b[t]];)t--;return t}const on={isoHour:0,isoMinute:0,isoSecond:0,isoMillisecond:0,isoMicrosecond:0,isoNanosecond:0},rn={hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0};function sn(n){return{isoHour:n.hour||0,isoMinute:n.minute||0,isoSecond:n.second||0,isoMillisecond:n.millisecond||0,isoMicrosecond:n.microsecond||0,isoNanosecond:n.nanosecond||0}}function an(n){return K(t).mult(n.days).add(cn(n))}function cn(t){return K(t.nanoseconds).add(K(t.microseconds).mult(1e3)).add(K(t.milliseconds).mult(1e6)).add(K(t.seconds).mult(1e9)).add(K(t.minutes).mult(6e10)).add(K(t.hours).mult(n))}function un(t){return t.isoHour*n+6e10*t.isoMinute+1e9*t.isoSecond+1e6*t.isoMillisecond+1e3*t.isoMicrosecond+t.isoNanosecond}function dn(e,o){let r,i=0,s=0,a=0,c=0,u=0,d=0;switch(o){case 6:r=e.div(t),i=r.toNumber(),e=e.sub(r.mult(t));case 5:r=e.div(n),s=r.toNumber(),e=e.sub(r.mult(n));case 4:r=e.div(6e10),a=r.toNumber(),e=e.sub(r.mult(6e10));case 3:r=e.div(1e9),c=r.toNumber(),e=e.sub(r.mult(1e9));case 2:r=e.div(1e6),u=r.toNumber(),e=e.sub(r.mult(1e6));case 1:r=e.div(1e3),d=r.toNumber(),e=e.sub(r.mult(1e3))}return nn({years:0,months:0,weeks:0,days:i,hours:s,minutes:a,seconds:c,milliseconds:u,microseconds:d,nanoseconds:e.toNumber()})}function ln(e){const o=Math.floor(e/t);e-=o*t;const r=Math.floor(e/n);e-=r*n;const i=Math.floor(e/6e10);e-=6e10*i;const s=Math.floor(e/1e9);e-=1e9*s;const a=Math.floor(e/1e6);e-=1e6*a;const c=Math.floor(e/1e3);return[{isoHour:r,isoMinute:i,isoSecond:s,isoMillisecond:a,isoMicrosecond:c,isoNanosecond:e-=1e3*c},o]}const hn={gregory:{bce:-1,ce:0},ethioaa:{era0:0},ethiopic:{era0:0,era1:5500},coptic:{era0:-1,era1:0},roc:{beforeroc:-1,minguo:0},buddhist:{be:0},islamic:{ah:0},indian:{saka:0},persian:{ap:0},japanese:{bce:-1,ce:0,meiji:1867,taisho:1911,showa:1925,heisei:1988,reiwa:2018}};class fn{constructor(n){this.id=n}monthCode(n,t){return"M"+L(n,2)}convertMonthCode(n,t){const e=/L$/.test(n),o=parseInt(n.substr(1));if(e)throw new RangeError("Calendar system doesnt support leap months");return[o,!1]}}function mn(n,t,e,o){var r;let i=null==(r=hn[gn(n)])?void 0:r[e];if(void 0===i){if(!o)throw new Error("Unkown era "+e);i=0}return(i+t)*(R(i)||1)}function gn(n){return n.split("-")[0]}class yn extends fn{computeFields(n){const t=Fn(n);return{era:void 0,eraYear:void 0,year:t.isoYear,month:t.isoMonth,day:t.isoDay}}epochMilliseconds(n,t,e){return Sn(n,t,e)}daysInMonth(n,t){return 2===t?this.inLeapYear(n)?29:28:4===t||6===t||9===t||11===t?30:31}monthsInYear(){return 12}inLeapYear(n){return n%4==0&&(n%100!=0||n%400==0)}guessYearForMonthDay(){return pn}normalizeISOYearForMonthDay(){return pn}}const wn=new yn("iso8601"),pn=1972,vn=Symbol();function Mn(n){return bn(n.isoYear,n.isoMonth,n.isoDay,n.isoHour,n.isoMinute,n.isoSecond,n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond)}function bn(n,t,e,o,r,i,s,a,c){return K(Sn(n,t,e,o,r,i,s)).mult(1e6).add(1e3*(null!=a?a:0)+(null!=c?c:0))}function Sn(n,t,e,o,r,i,s){const a=R(n);let c,u,d=0;const l=n>=0&&n<1e3,h=l?n+1200:n;for(;d<31;d++){c=e-a*d;const n=Date.UTC(h,t-1,c,null!=o?o:0,null!=r?r:0,null!=i?i:0,null!=s?s:0);if(!En(n)){u=n+a*d*864e5;break}}return(void 0===u||c<1||c>wn.daysInMonth(n,t))&&Zn(),l&&(u=new Date(u).setUTCFullYear(n)),u}function In(n){let t=n.div(1e6),e=n.sub(t.mult(1e6)).toNumber();e<0&&(e+=1e6,t=t.sub(1));const o=Math.floor(e/1e3);return e-=1e3*o,{...Fn(t.toNumber()),isoMicrosecond:o,isoNanosecond:e}}function Fn(n){const[t,e]=Yn(n);return{isoYear:t.getUTCFullYear(),isoMonth:t.getUTCMonth()+1,isoDay:t.getUTCDate()+e,isoHour:t.getUTCHours(),isoMinute:t.getUTCMinutes(),isoSecond:t.getUTCSeconds(),isoMillisecond:t.getUTCMilliseconds()}}function Tn(n){var t;return null!=(t=n[vn])?t:Mn(n.getISOFields())}function On(n){return Math.floor(Sn(n,1,1)/1e3)}function Dn(n){return Yn(n.div(1e6).toNumber())[0].getUTCFullYear()}function Nn(n,t,e){const[o,r]=Yn(Sn(n,t,e));return H(o.getUTCDay()+r,7)||7}function Yn(n){const t=R(n);let e,o=0;for(;o<31;o++){const r=new Date(n-t*o*864e5);if(!En(r)){e=r;break}}return void 0===e&&Zn(),[e,t*o]}function En(n){return isNaN(n.valueOf())}function Zn(){throw new RangeError("Date outside of supported range")}function Cn(n,t){return Math.round((t-n)/864e5)}function Un(n,t){return n+864e5*t}function Pn(n,t){return!Rn(n,t)&&n.calendar.toString()===t.calendar.toString()}function Rn(n,t){return G(Mn(n.getISOFields()),Mn(t.getISOFields()))}function kn(n,t){return P(un(n.getISOFields()),un(t.getISOFields()))}function xn(n,t){return P(n.year,t.year)||P(n.month,t.month)||P(n.day,t.day)}function jn(n,t){return G(n[vn],t[vn])}function qn(n,t,e,o,r){return[n=Number(n),t=c(t,1,o.monthsInYear(n),r),e=c(e,1,o.daysInMonth(n,t),r)]}function Hn(n,t){const[e,o,r]=qn(n.isoYear,n.isoMonth,n.isoDay,wn,t);return{isoYear:e,isoMonth:o,isoDay:r}}function Ln(n,t){return{...Hn(n,t),...Bn(n,t)}}function Bn({isoHour:n,isoMinute:t,isoSecond:e,isoMillisecond:o,isoMicrosecond:r,isoNanosecond:i},s){return{isoHour:n=c(n,0,23,s),isoMinute:t=c(t,0,59,s),isoSecond:e=c(e,0,59,s),isoMillisecond:o=c(o,0,999,s),isoMicrosecond:r=c(r,0,999,s),isoNanosecond:i=c(i,0,999,s)}}const $n={era:String,eraYear:Number,year:Number,month:Number,monthCode:String},An={...$n,day:Number},zn={hour:Number,minute:Number,second:Number,millisecond:Number,microsecond:Number,nanosecond:Number},Wn={era:String,eraYear:Number,year:Number,month:Number,monthCode:String,day:Number},Kn=p(b,(()=>Number));class Gn extends yn{computeFields(n){const t=super.computeFields(n),{year:e}=t;return{...t,era:e<1?"bce":"ce",eraYear:e<1?-(e-1):e}}}const Jn=a("calendarName",{auto:0,never:1,always:2},0),Qn=a("disambiguation",{compatible:0,earlier:1,later:2,reject:3},0);function Vn(n,t=4){const r=d(n),i=r.smallestUnit,s=r.fractionalSecondDigits;let a,u=0,l=1;return void 0!==i?(u=F(i,void 0,0,t),l=e[u],a=o[u]||0):void 0!==s&&"auto"!==s&&(a=c(s,0,9,1),l=Math.pow(10,9-a)),{smallestUnit:u,fractionalSecondDigits:a,roundingFunc:f(n,Math.trunc),incNano:l}}const Xn=a("timeZoneName",{auto:0,never:1},0);function _n(n,t){return nt(n)+"T"+et(n,t)}function nt(n){return tt(n)+"-"+L(n.isoDay,2)}function tt(n){const{isoYear:t}=n;return(t<1e3||t>9999?A(t)+L(Math.abs(t),6):L(t,4))+"-"+L(n.isoMonth,2)}function et(n,t){const e=[L(n.isoHour,2)];return t.smallestUnit<=4&&(e.push(L(n.isoMinute,2)),t.smallestUnit<=3&&e.push(L(n.isoSecond,2)+st(n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond,t.fractionalSecondDigits)[0])),e.join(":")}function ot(n){const[t,e]=ln(Math.abs(n)),o=st(t.isoMillisecond,t.isoMicrosecond,t.isoNanosecond,void 0)[0];return A(n)+L(t.isoHour+24*e,2)+":"+L(t.isoMinute,2)+(t.isoSecond||o?":"+L(t.isoSecond,2)+o:"")}function rt(n,t){return n&&(2===t||1!==t&&"iso8601"!==n)?`[u-ca=${n}]`:""}function it(n){return n.map((([n,t,e])=>{if(e||n){return Math.abs(n).toLocaleString("fullwide",{useGrouping:!1})+t}return""})).join("")}function st(n,t,o,r,i,s){let a=K(n).mult(1e6).add(K(t).mult(1e3)).add(o);i&&(a=q(a,void 0===r?e[s]:Math.pow(10,9-r),i));const c=a.abs(),u=c.div(1e9);let d=L(c.sub(u.mult(1e9)).toNumber(),9);return d=void 0===r?d.replace(/0+$/,""):d.substr(0,r),[d?"."+d:"",u.toNumber()*(a.sign()||1)]}function at(n){g(n,{epochNanoseconds(){return this[vn].toBigInt()},epochMicroseconds(){return this[vn].div(1e3).toBigInt()},epochMilliseconds(){return this[vn].div(1e6).toNumber()},epochSeconds(){return this[vn].div(1e9).toNumber()}})}const ct={calendar:"calendar"};for(const n of M)ct[n]="iso"+((ut=n).charAt(0).toUpperCase()+ut.slice(1));var ut;function dt(n,t=[]){g(n,p(t.concat("calendar"),(n=>function(){return this.getISOFields()[ct[n]]})))}const lt=["era","eraYear","year","month","monthCode","daysInMonth","daysInYear","monthsInYear","inLeapYear"],ht=[...lt,"day","dayOfWeek","dayOfYear","weekOfYear","daysInWeek"];function ft(n,t){g(n,p(t,(n=>function(){const t=this.calendar[n](this);return Object.defineProperty(this,n,{value:t}),t})))}function mt(n,t){(n.prototype||n)[Symbol.toStringTag]="Temporal."+t}const gt=a("offset",{prefer:0,use:1,ignore:2,reject:3});function yt(n,e,o=0){const r=n.getPossibleInstantsFor(e);if(1===r.length)return r[0];if(3===o)throw new RangeError("Ambiguous offset");if(r.length)return r[2===o?1:0];{const r=function(n,e){const o=Tn(e),r=n.getOffsetNanosecondsFor(new Yr(o.sub(t)));return n.getOffsetNanosecondsFor(new Yr(o.add(t)))-r}(n,e),i=n.getPossibleInstantsFor(e.add({nanoseconds:r*(1===o?-1:1)}));return i[1===o?0:i.length-1]}}function wt({year:n,month:t,day:e},o,r,i){n+=o;const s=c(t,1,r.monthsInYear(n),i);let a=t===s?e:1;return a=c(a,1,r.daysInMonth(n,s),i),{year:n,month:s,day:a}}function pt({year:n,month:t,day:e},o,r,i){if(o){if(t+=o,o<0)for(;t<1;)t+=r.monthsInYear(--n);else{let e;for(;t>(e=r.monthsInYear(n));)t-=e,n++}e=c(e,1,r.daysInMonth(n,t),i)}return{year:n,month:t,day:e}}function vt({isoYear:n,isoMonth:t,isoDay:e},o){if(o){let r=Sn(n,t,e);r=Un(r,o),({isoYear:n,isoMonth:t,isoDay:e}=Fn(r))}return{isoYear:n,isoMonth:t,isoDay:e}}function Mt(n,t){if(en(t)>=6)throw new RangeError("Duration cant have units >= days");return n.add(cn(t))}function bt(n,t,e=3,o){const{offsetNanoseconds:r,timeZone:i,Z:s}=n;if(void 0!==r&&2!==e){if(1===e||s)return Mn(n).sub(r);{const o=St(n,r,i,t);if(void 0!==o)return o;if(3===e)throw new RangeError("Mismatching offset/timezone")}}return yt(i,Ho(n),Qn(o))[vn]}function St(n,t,e,o){const r=e.getPossibleInstantsFor(Ho(n)),i=Mn(n),s=o?x(t):t;for(const n of r){const t=n[vn],e=i.sub(t).toNumber();if((o?x(e):e)===s)return t}}function It(n){const{timeZone:t}=n,e={...n,...on,calendar:new mr("iso8601")},o={...vt(e,1),...on,calendar:new mr("iso8601")},r=yt(t,Ho(e))[vn];return yt(t,Ho(o))[vn].sub(r).toNumber()}const Ft="(\\d{2})(:?(\\d{2})(:?(\\d{2})([.,](\\d{1,9}))?)?)?",Tt="([+-])"+Ft,Ot="(Z|"+Tt+")?(\\[([^=\\]]+)\\])?(\\[u-ca=([^\\]]+)\\])?",Dt=Pt("([+-]\\d{6}|\\d{4})-?(\\d{2})"+Ot),Nt=Pt("(--)?(\\d{2})-?(\\d{2})"+Ot),Yt=Pt("([+-]\\d{6}|\\d{4})-?(\\d{2})-?(\\d{2})([T ](\\d{2})(:?(\\d{2})(:?(\\d{2})([.,](\\d{1,9}))?)?)?)?"+Ot),Et=Pt("T?"+Ft+Ot),Zt=Pt(Tt),Ct=/^([-+])?P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T((\d+)([.,](\d{1,9}))?H)?((\d+)([.,](\d{1,9}))?M)?((\d+)([.,](\d{1,9}))?S)?)?$/i,Ut=/\u2212/g;function Pt(n){return new RegExp(`^${n}$`,"i")}function Rt(n){return n.replace(Ut,"-")}function kt(n){const t=Lt(n);if(!t)throw _t("dateTime",n);return t}function xt(n){const t=Bt(n);if(!t)throw _t("dateTime",n);return t}function jt(n){const t=zt(n);if(void 0===t)throw _t("timeZone",n);return t}function qt(n){let t=function(n){const t=Et.exec(Rt(n));if(t)return Kt(t.slice(1))}(n);if(void 0!==t){if("T"!==n.charAt(0)){const e=$t(n)||At(n);e&&function(n){try{return Hn(n,1),!0}catch(n){return!1}}(e)&&(t=void 0)}}else t=Bt(n,!0);if(void 0===t)throw _t("time",n);return t}const Ht=/^Z$/i;function Lt(n){const t=Yt.exec(Rt(n));if(t)return function(n){const t=n[11];let e,o=!1;t&&(o=Ht.test(t),e=o?0:Gt(n.slice(12)));return{...Wt(n),timeZone:n[21],offsetNanoseconds:e,Z:o}}(t.slice(1))}function Bt(n,t,e){const o=Yt.exec(Rt(n));if(o&&(e||!Ht.test(o[12]))&&(!t||o[4]))return Wt(o.slice(1))}function $t(n){const t=Dt.exec(Rt(n));if(t)return{calendar:(e=t.slice(1))[14],isoYear:Vt(e[0]),isoMonth:Vt(e[1]),isoDay:1};var e}function At(n){const t=Nt.exec(Rt(n));if(t)return{calendar:(e=t.slice(1))[15],isoYear:pn,isoMonth:Vt(e[1]),isoDay:Vt(e[2])};var e}function zt(n){const t=Zt.exec(Rt(n));if(t)return Gt(t.slice(1))}function Wt(n){return{calendar:n[23],isoYear:Vt(n[0]),isoMonth:Vt(n[1]),isoDay:Vt(n[2]),...Kt(n.slice(4))}}function Kt(n){const t=Qt(n[4]);return{...ln(Jt(n[6]||""))[0],isoHour:Qt(n[0]),isoMinute:Qt(n[2]),isoSecond:60===t?59:t}}function Gt(t){return("+"===t[0]?1:-1)*function(t){return Qt(t[0])*n+6e10*Qt(t[2])+1e9*Qt(t[4])+Jt(t[6]||"")}(t.slice(1))}function Jt(n){return parseInt(B(n,9,"0"))}function Qt(n){return parseInt(n||"0")}function Vt(n){return parseInt(n||"1")}function Xt(n){return void 0===n?void 0:parseInt(n)}function _t(n,t){throw new RangeError(`Cannot parse ${n} '${t}'`)}function ne(n){return{...n,calendar:void 0===n.calendar?gr():new mr(n.calendar)}}function te(n){return{...ne(n),timeZone:new we(n.timeZone)}}class ee{constructor(n){this.id=n}}class oe extends ee{constructor(n,t){super(n),this.offsetNano=t}getPossibleOffsets(){return[this.offsetNano]}getOffset(){return this.offsetNano}getTransition(){}}function re(n,t){const e={},o=n.formatToParts(t);for(const n of o)e[n.type]=n.value;return e}const ie={bc:"bce",ad:"ce"};function se(n){return n=n.toLowerCase().normalize("NFD").replace(/[^a-z0-9]/g,""),ie[n]||n}const ae=Intl.DateTimeFormat;function ce(n){return[].concat(n||[])}const ue={"Pacific/Apia":{2011:[[de(13017528e5),-36e12,-396e11],[de(13168728e5),-396e11,-36e12],[de(13252392e5),-36e12,504e11]]}};function de(n){return K(n).mult(1e6)}const le=(new Date).getUTCFullYear()+10,he=[182,91,273];class fe extends ee{constructor(n){const t=new ae("en-GB",{era:"short",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",timeZone:n});super(t.resolvedOptions().timeZone),this.format=t,this.yearEndOffsets={},this.transitionsInYear=ue[n]||{}}getPossibleOffsets(n){let t;const e=[this.getTransition(n,-1),this.getTransition(n.sub(1),1)].filter(Boolean);for(const o of e){const[e,r,i]=o,s=n.sub(r),a=n.sub(i);if(G(e,s)>0&&G(e,a)>0)return[r];if(!(G(e,s)<=0&&G(e,a)<=0))return r<i?[]:[r,i];t=i}return void 0!==t?[t]:[1e9*this.getYearEndOffsetSec(Dn(n))]}getOffset(n){return 1e9*this.getOffsetForEpochSecs(n.div(1e9).toNumber())}getOffsetForEpochSecs(n){const t=re(this.format,1e3*n);let e=parseInt(t.year);"bce"===se(t.era)&&(e=-(e-1));const o=Sn(e,parseInt(t.month),parseInt(t.day),parseInt(t.hour),parseInt(t.minute),parseInt(t.second));return Math.floor(o/1e3)-n}getTransition(n,t){let e=Dn(n);if(e>le){const o=this.getTransitionFrom(e,e+t,t,n);if(o||t>0)return o;e=le}return this.getTransitionFrom(Math.max(e,1847),t<0?1846:le,t,n)}getTransitionFrom(n,t,e,o){for(;n!==t;n+=e){let t=this.getTransitionsInYear(n);e<0&&(t=t.slice().reverse());for(const n of t)if(G(n[0],o)===e)return n}}getYearEndOffsetSec(n){const{yearEndOffsets:t}=this;return t[n]||(t[n]=this.getOffsetForEpochSecs(On(n+1)-1))}getTransitionsInYear(n){const{transitionsInYear:t}=this;return t[n]||(t[n]=this.computeTransitionsInYear(n))}computeTransitionsInYear(n){const t=this.getYearEndOffsetSec(n-1),e=this.getYearEndOffsetSec(n),o=On(n)-1,r=On(n+1)-1;if(t!==e)return[this.searchTransition(o,r,t,e)];const i=this.searchIsland(t,o);return void 0!==i?[this.searchTransition(o,i[0],t,i[1]),this.searchTransition(i[0],r,i[1],e)]:[]}searchTransition(n,t,e,o){for(;t-n>1;){const o=Math.floor(n+(t-n)/2);this.getOffsetForEpochSecs(o)===e?n=o:t=o}return[K(t).mult(1e9),1e9*e,1e9*o]}searchIsland(n,t){for(const e of he){const o=t+86400*e,r=this.getOffsetForEpochSecs(o);if(r!==n)return[o,r]}}}const me={UTC:new oe("UTC",0)};const[ge,ye]=m();class we extends Y{constructor(n){if(!n)throw new RangeError("Invalid timezone ID");super(),ye(this,function(n){const e=(n=String(n)).toLocaleUpperCase();if(me[e])return me[e];const o=zt(n);if(void 0!==o){if(Math.abs(o)>t)throw new RangeError("Offset out of bounds");return new oe(ot(o),o)}return me[e]=new fe(n)}(n))}static from(n){if(h(n))return function(n){const t=n.timeZone;if(void 0===t)return n;if(h(t)&&void 0===t.timeZone)return t;return new we(t)}(n);const t=Lt(String(n));if(t){if(t.timeZone){const n=te(t);return function(n){const{offsetNanoseconds:t,timeZone:e,Z:o}=n;if(void 0!==t&&!o&&void 0===St(n,t,e,!0))throw new RangeError("Mismatching offset/timezone")}(n),n.timeZone}if(t.Z)return new we("UTC");if(void 0!==t.offsetNanoseconds)return new we(ot(t.offsetNanoseconds))}return new we(String(n))}get id(){return this.toString()}getOffsetStringFor(n){return ot(this.getOffsetNanosecondsFor(n))}getOffsetNanosecondsFor(n){const t=N(Yr,n);return ge(this).getOffset(t[vn])}getPlainDateTimeFor(n,t=gr()){const e=N(Yr,n);return Ho({...In(e[vn].add(this.getOffsetNanosecondsFor(e))),calendar:N(mr,t)})}getInstantFor(n,t){return yt(this,N(qo,n),Qn(t))}getPossibleInstantsFor(n){const t=Mn(N(qo,n).getISOFields());return ge(this).getPossibleOffsets(t).map((n=>new Yr(t.sub(n))))}getPreviousTransition(n){const t=N(Yr,n),e=ge(this).getTransition(t[vn],-1);return e?new Yr(e[0]):null}getNextTransition(n){const t=N(Yr,n),e=ge(this).getTransition(t[vn],1);return e?new Yr(e[0]):null}toString(){return ge(this).id}}function pe(n){if(void 0===n.timeZone)throw new TypeError("Must specify timeZone");return N(we,n.timeZone)}mt(we,"TimeZone");const ve=Le((function(n,t,e){const o=Ce(n,t,e);if(o)return{...o,timeZone:pe(n),offsetNanoseconds:void 0!==n.offset?jt(String(n.offset)):void 0}})),Me=Le(Ce),be=Le(Ue),Se=Le((function(n,t){const e=pr(n),o=je(n,$n,e);if(Be(o))return e.yearMonthFromFields(o,t)})),Ie=Le((function(n,t){const e=pr(n),o=je(n,Wn,e);if(Be(o))return void 0===n.year&&void 0===n.calendar&&(o.year=pn),e.monthDayFromFields(o,t)})),Fe=Le(Pe),Te=Le((function(n,t,e,o){const r=Re(n,t,e,o),i=void 0!==t.offset;if(r||i)return{...r||n.getISOFields(),timeZone:n.timeZone,offsetNanoseconds:i?jt(String(t.offset)):n.offsetNanoseconds}}),!0),Oe=Le(Re,!0),De=Le(ke,!0),Ne=Le((function(n,t,e){const o=n.calendar;if(Be(je(t,$n,o))){const r=He(n,t,$n,o);return o.yearMonthFromFields(r,e)}}),!0),Ye=Le((function(n,t,e){const o=n.calendar;if(Be(je(t,Wn,o))){const r=He(n,t,Wn,o);return o.monthDayFromFields(r,e)}}),!0),Ee=Le(xe,!0),Ze=Le((function(n){const t=u(n,Kn);if(Be(t))return t}));function Ce(n,t,e){const o=Ue(n,e),r=Pe(n,t);if(o)return{...o.getISOFields(),...r||on}}function Ue(n,t){const e=pr(n),o=je(n,An,e);if(Be(o))return e.dateFromFields(o,t)}function Pe(n,t){const e=u(n,zn);if(Be(e))return Bn(sn(e),t)}function Re(n,t,e,o){const r=ke(n,t,o),i=xe(n,t,e);if(r||i)return{...n.getISOFields(),...r?r.getISOFields():{},...i}}function ke(n,t,e){const o=n.calendar,r=je(t,An,o);if(Be(r)){const t=He(n,r,An,o);return o.dateFromFields(t,e)}}function xe(n,t,e){const o=u(t,zn);if(Be(o)){return Bn(sn((r=n,i=o,y(zn,((n,t)=>{var e;return null!=(e=i[t])?e:r[t]})))),e)}var r,i}function je(n,t,e){let o=Object.keys(t);return o=e.fields?Array.prototype.slice.call(e.fields(o)):Object.keys(qe(e,o)),qe(n,o)}function qe(n,t){const e={};for(const o of t)void 0!==n[o]&&(e[o]=n[o]);return e}function He(n,t,e,o){const r=je(n,e,o);return o.mergeFields?o.mergeFields(r,t):yr(r,t)}function Le(n,t){return(...e)=>{if(t){const n=e[1];if(!h(n))throw new TypeError("must be object-like");if(void 0!==n.calendar)throw new TypeError("calendar not allowed");if(void 0!==n.timeZone)throw new TypeError("timeZone not allowed")}const o=n(...e);if(!o)throw new TypeError("No valid fields");return o}}function Be(n){return Object.keys(n).length>0}const $e=K(t).mult(1e8),Ae=$e.mult(-1),ze=$e.add(86399999999999),We=Ae.sub(86399999999999);function Ke(n,t){const e=Mn(n);Ge(e),cr(e,t)}function Ge(n){-1!==G(n,We)&&1!==G(n,ze)||Zn()}function Je(n,t){const e=Xe(un(n),t),[o,r]=ln(e);return{...vt(n,r),...o}}function Qe(n,t){const e=Xe(un(n),t),[o]=ln(e);return o}function Ve(n,t){const[e,o]=function(n){const t=In(n);return[bn(t.isoYear,t.isoMonth,t.isoDay),un(t)]}(n),r=Xe(o,t);return e.add(r)}function Xe(n,t){return k(n,t.incNano,t.roundingFunc)}function _e(n,t,e){return(o,r)=>{const i=io(n,r)?{}:{...n,...t};return{buildKey:ro(o,r,!1),buildFormat:function(n,t){return new ae(o,{calendar:n,timeZone:t||void 0,...i,...r,...e})},buildEpochMilli:no}}}function no(n){return n.epochMilliseconds}function to(n,t,e){return(o,r)=>{const i=io(n,r)?{}:n;return{buildKey:ro(o,r,e),buildFormat:function(n,e){return new ae(o,{calendar:n,...i,...r,...t,timeZone:e,timeZoneName:void 0})},buildEpochMilli:void 0!==r.timeZone?eo.bind(null,new we(r.timeZone)):oo}}}function eo(n,t){const e=Ho({...on,...t.getISOFields()});return n.getInstantFor(e).epochMilliseconds}function oo(n){return Sn((t=n.getISOFields()).isoYear,t.isoMonth,t.isoDay,t.isoHour,t.isoMinute,t.isoSecond,t.isoMillisecond);var t}function ro(n,t,e){var o;const r=null!=(o=t.calendar)?o:function(n){for(const t of n){const n=t.match(/-u-ca-(.*)$/);if(n)return n[1]}return}(n),i=t.timeZone;return function(n,t){var o,s,a,c;const u=null==(o=n.calendar)?void 0:o.id,d=null==(s=n.timeZone)?void 0:s.id;if(t){if((null==(a=t.calendar)?void 0:a.id)!==u)throw new RangeError("Mismatching calendar");if((null==(c=t.timeZone)?void 0:c.id)!==d)throw new RangeError("Mismatching timeZone")}if((e||"iso8601"!==u)&&void 0!==u&&void 0!==r&&r!==u)throw new RangeError("Non-iso calendar mismatch");if(void 0!==d&&void 0!==i&&i!==d)throw new RangeError("Given timeZone must agree");return[r||u||"iso8601",i||d||"UTC"]}}function io(n,t){for(const e in n)if(void 0!==t[e])return!0;return!1}function so(n,t){n.prototype.toLocaleString=function(n,e){const o=t(ce(n),e||{});return o.buildFormat(...o.buildKey(this)).format(o.buildEpochMilli(this))},n.prototype[D]=t}function ao(n){return null==n?void 0:n[D]}function co(n){const t=function(n){const t=Ct.exec(Rt(n));if(t){let n,e,o,r;[n,r]=uo(t[8],t[10],5,void 0),[e,r]=uo(t[12],t[14],4,r),[o,r]=uo(t[16],t[18],3,r);const i=function(n){const t={};for(const e in n)void 0!==n[e]&&(t[e]=n[e]);return t}({years:Xt(t[2]),months:Xt(t[3]),weeks:Xt(t[4]),days:Xt(t[5]),hours:n,minutes:e,seconds:o});if(!Object.keys(i).length)throw new RangeError("Duration string must have at least one field");const s=dn(K(r||0),2);i.milliseconds=s.milliseconds,i.microseconds=s.microseconds,i.nanoseconds=s.nanoseconds;let a=nn(i);return"-"===t[1]&&(a=X(a)),a}}(n);if(void 0===t)throw _t("duration",n);return t}function uo(n,t,o,r){if(void 0!==n){if(void 0!==r)throw new RangeError("Partial units must be last unit");return[parseInt(n),void 0!==t?Jt(t)*(e[o]/1e9):void 0]}if(void 0!==r){const n=Math.trunc(r/e[o]);return[n,r-n*e[o]]}return[void 0,void 0]}const lo=a("offset",{auto:0,never:1},0);class ho extends U{constructor(n=0,t=0,e=0,o=0,r=0,i=0){super({...Bn({isoHour:n,isoMinute:t,isoSecond:e,isoMillisecond:o,isoMicrosecond:r,isoNanosecond:i},1),calendar:gr()})}static from(n,t){const e=s(t);return fo(n instanceof ho?n.getISOFields():"object"==typeof n?Fe(n,e):qt(String(n)))}static compare(n,t){return kn(N(ho,n),N(ho,t))}with(n,t){return fo(Ee(this,n,s(t)))}add(n){return go(this,N(ko,n))}subtract(n){return go(this,X(N(ko,n)))}until(n,t){return yo(this,N(ho,n),t)}since(n,t){return yo(N(ho,n),this,t)}round(n){const t=O(n,0,5);return fo(Qe(this.getISOFields(),t))}equals(n){return!kn(this,N(ho,n))}toString(n){const t=Vn(n);return et(Qe(this.getISOFields(),t),t)}toZonedDateTime(n){const t=N(Sr,n.plainDate),e=N(we,n.timeZone);return Fo({...t.getISOFields(),...this.getISOFields(),timeZone:e})}toPlainDateTime(n){return N(Sr,n).toPlainDateTime(this)}}function fo(n){return new ho(n.isoHour,n.isoMinute,n.isoSecond,n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond)}function mo(n){return N(ho,null!=n?n:{hour:0})}function go(n,t){return fo(function(n,t){const e=un(n)+cn(t).toNumber(),[o]=ln(e);return o}(n.getISOFields(),t))}function yo(n,t,o){const r=T(o,5,0,0,5);return xo(function(n,t,o){return dn(K(k(un(t)-un(n),e[o.smallestUnit]*o.roundingIncrement,o.roundingFunc)),o.largestUnit)}(n.getISOFields(),t.getISOFields(),r))}mt(ho,"PlainTime"),dt(ho,v),so(ho,(function(n,t){return{buildKey:()=>["",""],buildFormat:()=>new ae(n,{hour:"numeric",minute:"2-digit",second:"2-digit",...t,timeZone:"UTC",timeZoneName:void 0,year:void 0,month:void 0,day:void 0,weekday:void 0}),buildEpochMilli:n=>Math.trunc(un(n.getISOFields())/1e6)}}));const wo={day:1};class po extends U{constructor(n,t,e=gr(),o=1){const r=Hn({isoYear:n,isoMonth:t,isoDay:o},1),i=N(mr,e);var s,a;s=r,a=i.toString(),cr(Mn(s),a),super({...r,calendar:i})}static from(n,t){if(s(t),n instanceof po)return vo(n.getISOFields());if("object"==typeof n)return Se(n,t);const e=function(n){const t=$t(n)||Bt(n);if(!t)throw _t("yearMonth",n);return t}(String(n));return void 0===e.calendar&&(e.isoDay=1),vo(ne(e))}static compare(n,t){return Rn(N(po,n),N(po,t))}with(n,t){return Ne(this,n,t)}add(n,t){return Mo(this,N(ko,n),t)}subtract(n,t){return Mo(this,X(N(ko,n)),t)}until(n,t){return bo(this,N(po,n),!1,t)}since(n,t){return bo(this,N(po,n),!0,t)}equals(n){return!Rn(this,N(po,n))}toString(n){const t=this.getISOFields(),e=t.calendar.toString(),o=Jn(n);return("iso8601"===e?tt(t):nt(t))+rt(e,o)}toPlainDate(n){return this.calendar.dateFromFields({year:this.year,month:this.month,day:n.day})}}function vo(n){return new po(n.isoYear,n.isoMonth,n.calendar,n.isoDay)}function Mo(n,t,e){return n.toPlainDate({day:t.sign<0?n.daysInMonth:1}).add(t,e).toPlainYearMonth()}function bo(n,t,e,o){return xo(Or(n.toPlainDate(wo),t.toPlainDate(wo),vr(n,t),e,T(o,9,8,8,9)))}mt(po,"PlainYearMonth"),dt(po),ft(po,lt),so(po,to({year:"numeric",month:"numeric"},{weekday:void 0,day:void 0,hour:void 0,minute:void 0,second:void 0},!0));const So=Symbol();class Io extends U{constructor(n,t,e=gr()){const o=N(we,t),r=N(mr,e),i=K(n),[s,a]=To(i,o);Ke(s,r.toString()),super({...s,calendar:r,timeZone:o,offset:ot(a)}),this[vn]=i,this[So]=a}static from(n,t){const e=gt(t,3),o=s(t);if(n instanceof Io)return new Io(n.epochNanoseconds,n.timeZone,n.calendar);const r="object"==typeof n;return Fo(r?ve(n,o,t):te(kt(String(n))),!r,e,t)}static compare(n,t){return jn(N(Io,n),N(Io,t))}get timeZone(){return this.getISOFields().timeZone}get offsetNanoseconds(){return this[So]}get offset(){return this.getISOFields().offset}with(n,t){Qn(t);const e=s(t),o=gt(t,0);return Fo(Te(this,n,e,t),!1,o,t)}withPlainDate(n){const t=N(Sr,n),e=t.toPlainDateTime(this),{timeZone:o}=this,r=yt(o,e);return new Io(r.epochNanoseconds,o,Mr(this,t))}withPlainTime(n){return Fo({...this.getISOFields(),...void 0===n?on:N(ho,n).getISOFields()})}withCalendar(n){return new Io(this.epochNanoseconds,this.timeZone,n)}withTimeZone(n){return new Io(this.epochNanoseconds,n,this.calendar)}add(n,t){return Oo(this,N(ko,n),t)}subtract(n,t){return Oo(this,X(N(ko,n)),t)}until(n,t){return No(this,N(Io,n),!1,t)}since(n,t){return No(this,N(Io,n),!0,t)}round(n){return Do(this,O(n,0,6))}equals(n){return t=this,e=N(Io,n),Pn(t,e)&&t.timeZone.toString()===e.timeZone.toString();var t,e}startOfDay(){return Fo({...this.getISOFields(),...on,offsetNanoseconds:this.offsetNanoseconds},!1,0)}get hoursInDay(){return It(this.getISOFields())/n}toString(n){const t=Vn(n),e=lo(n),o=Xn(n),r=Jn(n),i=Do(this,t);return _n(i.getISOFields(),t)+(0===e?ot(x(i.offsetNanoseconds)):"")+(s=this.timeZone.toString(),1!==o?`[${s}]`:"")+rt(this.calendar.toString(),r);var s}toPlainYearMonth(){return vo(this.getISOFields())}toPlainMonthDay(){return this.calendar.monthDayFromFields(this)}toPlainDateTime(){return Ho(this.getISOFields())}toPlainDate(){return Ir(this.getISOFields())}toPlainTime(){return fo(this.getISOFields())}toInstant(){return new Yr(this.epochNanoseconds)}}function Fo(n,t,e,o){const r=bt(n,t,e,o);return new Io(r,n.timeZone,n.calendar)}function To(n,t){const e=new Yr(n),o=t.getOffsetNanosecondsFor(e);return[In(n.add(o)),o]}function Oo(n,t,e){const o=n.getISOFields(),r=function(n,t,e){const{calendar:o,timeZone:r}=n,i=o.dateAdd(Ir(n),_(t,rn),e);return yt(r,Ho({...n,...i.getISOFields()}))[vn].add(cn(t))}(o,t,e);return new Io(r,o.timeZone,o.calendar)}function Do(n,t){const e=n.getISOFields(),o=function(n,t,e){const{calendar:o,timeZone:r}=n;let i,s,a=un(n);return 6===e.smallestUnit?(i=on,s=e.roundingFunc(a/It(n))):(a=Xe(a,e),[i,s]=ln(a)),bt({...vt(n,s),...i,offsetNanoseconds:t,calendar:o,timeZone:r},!1,0)}(e,n.offsetNanoseconds,t);return new Io(o,e.timeZone,e.calendar)}function No(n,t,e,o){const r=T(o,5,0,0,9),{largestUnit:i}=r;if(i>=6&&n.timeZone.id!==t.timeZone.id)throw new Error("Must be same timeZone");return xo(Tr(n,t,vr(n,t),e,r))}function Yo(n){if(void 0===n)return;if(h(n))return n instanceof Io||n instanceof qo?n:N(void 0!==n.timeZone?Io:qo,n);if("symbol"==typeof n)throw new TypeError("Incorrect relativeTo type");const t=Lt(String(n));if(t)return void 0!==t.timeZone?Fo(te(t),!0):Ho(ne(t));throw new RangeError("Invalid value of relativeTo")}function Eo(n,t,e,o){return(e instanceof Sr?function(n,t,e,o){const r=e.add(n);return[o.dateUntil(e,r,{largestUnit:M[t]}),r]}(n,Math.max(6,t),e,o):Zo(n,t,e,o))[0]}function Zo(n,t,e,o,r){const i=!0!==r&&t>7&&n.weeks;i&&(n=_(n,{weeks:0}));let s=e.add(n),a=Dr(e,s,o,t);return i&&(a=_(a,{weeks:i}),s=s.add({weeks:i})),[a,s]}function Co(n,t,e,o){const r=b[t],{sign:i}=n;if(!i)return n;const s={};for(let e=9;e>=t;e--){const t=b[e];s[t]=n[t]}const a={[r]:i},c=e.add(s),u=c.add(a),d=Tn(c),l=Tn(u),h=Tn(o).sub(d).toNumber()/l.sub(d).toNumber()*i;return s[r]+=h,s}function Uo(n,t,o,r,s,a){const{largestUnit:c,smallestUnit:u,roundingIncrement:d,roundingFunc:l}=a;if(!i(c)){return dn(q(Tn(o).sub(Tn(t)).mult(s?-1:1),e[u]*d,l),c)}let h=Co(n,u,t,o);const f=b[u];function m(){const n=h[f];h[f]=k(n,d,l)}return l===Math.round&&m(),s&&(h=X(h)),l!==Math.round&&m(),u>0&&(h=s?X(Eo(X(h),c,t,r)):Eo(h,c,t,r)),h}mt(Io,"ZonedDateTime"),dt(Io,v),ft(Io,ht),at(Io),so(Io,_e({year:"numeric",month:"numeric",day:"numeric",weekday:void 0,hour:"numeric",minute:"2-digit",second:"2-digit"},{timeZoneName:"short"},{}));const[Po,Ro]=m();class ko extends E{constructor(n=0,t=0,e=0,o=0,r=0,i=0,s=0,a=0,c=0,u=0){super();const d=Ze({years:n,months:t,weeks:e,days:o,hours:r,minutes:i,seconds:s,milliseconds:a,microseconds:c,nanoseconds:u});Ro(this,function(n){const t=nn(n),{sign:e}=t;for(const n of b){const o=t[n],r=R(t[n]);if(r&&r!==e)throw new RangeError("All fields must be same sign");if(!Number.isInteger(o))throw new RangeError("Duration fields must be integers")}return t}(d))}static from(n){return xo("object"==typeof n?Ze(n):co(n))}static compare(n,t,e){return function(n,t,e){if(void 0===e&&en(n)<=6&&en(t)<=6)return G(an(n),an(t));if(!e)throw new RangeError("Need relativeTo");const o=e.add(n),r=e.add(t);return void 0!==e[vn]?jn(o,r):Rn(o,r)}(N(ko,n),N(ko,t),Yo(d(e).relativeTo))}get years(){return Po(this).years}get months(){return Po(this).months}get weeks(){return Po(this).weeks}get days(){return Po(this).days}get hours(){return Po(this).hours}get minutes(){return Po(this).minutes}get seconds(){return Po(this).seconds}get milliseconds(){return Po(this).milliseconds}get microseconds(){return Po(this).microseconds}get nanoseconds(){return Po(this).nanoseconds}get sign(){return Po(this).sign}get blank(){return!this.sign}with(n){return xo({...Po(this),...Ze(n)})}negated(){return xo(X(Po(this)))}abs(){return xo(w(Po(this),V,(n=>Math.abs(n))))}add(n,t){return jo(this,N(ko,n),t)}subtract(n,t){return jo(this,X(N(ko,n)),t)}round(n){const t="string"==typeof n?{smallestUnit:n}:n;if(!h(t))throw new TypeError("Must specify options");if(void 0===t.largestUnit&&void 0===t.smallestUnit)throw new RangeError("Must specify either largestUnit or smallestUnit");const o=T(t,en(this),0,0,9,!0),i=Yo(t.relativeTo);return xo(function(n,t,o,i){const{largestUnit:s,smallestUnit:a,roundingIncrement:c,roundingFunc:u}=t;if(void 0===o&&en(n)<=6&&r(s)&&r(a))return dn(q(an(n),e[a]*c,u),s);if(!o)throw new RangeError("Need relativeTo");const[d,l]=Zo(n,s,o,i);return Uo(d,o,l,i,!1,t)}(this,o,i,i?i.calendar:void 0))}total(n){const t=function(n){let t,e;return"string"==typeof n?e=n:(e=d(n).unit,t=n.relativeTo),{unit:F(e,void 0,0,9),relativeTo:t}}(n),o=Yo(t.relativeTo);return function(n,t,o,i){if(void 0===o&&en(n)<=6&&r(t))return an(n).toNumber()/e[t];if(!o)throw new RangeError("Need relativeTo");const[s,a]=Zo(n,t,o,i,!0);return Co(s,t,o,a)[b[t]]}(this,t.unit,o,o?o.calendar:void 0)}toString(n){const t=Vn(n,3);return function(n,t){const{smallestUnit:e,fractionalSecondDigits:o,roundingFunc:r}=t,{sign:i}=n,s=n.hours,a=n.minutes;let c=n.seconds,u="";if(e<=3){const t=st(n.milliseconds,n.microseconds,n.nanoseconds,o,r,e);u=t[0],c+=t[1]}const d=void 0!==o||u||!i;return(i<0?"-":"")+"P"+it([[n.years,"Y"],[n.months,"M"],[n.weeks,"W"],[n.days,"D"]])+(s||a||c||d?"T"+it([[s,"H"],[a,"M"],[e<=3?c:0,u+"S",d]]):"")}(Po(this),t)}toLocaleString(n,t){return this.toString()}}function xo(n){return new ko(n.years,n.months,n.weeks,n.days,n.hours,n.minutes,n.seconds,n.milliseconds,n.microseconds,n.nanoseconds)}function jo(n,t,e){const o=Yo(d(e).relativeTo);return xo(function(n,t,e,o){const r=Math.max(en(n),en(t));if(void 0===e&&r<=6)return dn(an(n).add(an(t)),r);if(!e)throw new RangeError("Need relativeTo");const i=e.add(n).add(t);return Dr(e,i,o,r)}(n,t,o,o?o.calendar:void 0))}mt(ko,"Duration");class qo extends U{constructor(n,t,e,o=0,r=0,i=0,s=0,a=0,c=0,u=gr()){const d=Ln({isoYear:n,isoMonth:t,isoDay:e,isoHour:o,isoMinute:r,isoSecond:i,isoMillisecond:s,isoMicrosecond:a,isoNanosecond:c},1),l=N(mr,u);Ke(d,l.toString()),super({...d,calendar:l})}static from(n,t){const e=s(t);return Ho(n instanceof qo?n.getISOFields():"object"==typeof n?Me(n,e,t):ne(xt(String(n))))}static compare(n,t){return Rn(N(qo,n),N(qo,t))}with(n,t){const e=s(t);return Ho(Oe(this,n,e,t))}withPlainDate(n){const t=N(Sr,n);return Ho({...this.getISOFields(),...t.getISOFields(),calendar:Mr(this,t)})}withPlainTime(n){return Ho({...this.getISOFields(),...mo(n).getISOFields()})}withCalendar(n){return Ho({...this.getISOFields(),calendar:N(mr,n)})}add(n,t){return Lo(this,N(ko,n),t)}subtract(n,t){return Lo(this,X(N(ko,n)),t)}until(n,t){return Bo(this,N(qo,n),!1,t)}since(n,t){return Bo(this,N(qo,n),!0,t)}round(n){const t=O(n,0,6);return Ho({...Je(this.getISOFields(),t),calendar:this.calendar})}equals(n){return Pn(this,N(qo,n))}toString(n){const t=Vn(n),e=Jn(n);return _n(Je(this.getISOFields(),t),t)+rt(this.calendar.toString(),e)}toZonedDateTime(n,t){const e=N(we,n),o=yt(e,this,Qn(t));return new Io(o.epochNanoseconds,e,this.calendar)}toPlainYearMonth(){return vo(this.getISOFields())}toPlainMonthDay(){return this.calendar.monthDayFromFields(this)}toPlainDate(){return Ir(this.getISOFields())}toPlainTime(){return fo(this.getISOFields())}}function Ho(n){return new qo(n.isoYear,n.isoMonth,n.isoDay,n.isoHour,n.isoMinute,n.isoSecond,n.isoMillisecond,n.isoMicrosecond,n.isoNanosecond,n.calendar)}function Lo(n,t,e){const o=function(n,t,e){const{calendar:o}=n;return In(Mn(o.dateAdd(Ir(n),_(t,rn),e).getISOFields()).add(un(n)).add(cn(t)))}(n.getISOFields(),t,e);return Ho({...o,calendar:n.calendar})}function Bo(n,t,e,o){const r=T(o,6,0,0,9);return xo(Tr(n,t,vr(n,t),e,r))}mt(qo,"PlainDateTime"),dt(qo,v),ft(qo,ht),so(qo,to({year:"numeric",month:"numeric",day:"numeric",weekday:void 0,hour:"numeric",minute:"2-digit",second:"2-digit"},{}));class $o extends U{constructor(n,t,e=gr(),o=pn){super({...Hn({isoYear:o,isoMonth:n,isoDay:t},1),calendar:N(mr,e)})}static from(n,t){if(s(t),n instanceof $o)return Ao(n.getISOFields());if("object"==typeof n)return Ie(n,t);const e=function(n){const t=At(n)||Bt(n);if(!t)throw _t("monthDay",n);return t}(String(n));return void 0===e.calendar&&(e.isoYear=pn),Ao(ne(e))}with(n,t){return Ye(this,n,t)}equals(n){return!Rn(this,N($o,n))}toString(n){const t=this.getISOFields(),e=t.calendar.toString(),o=Jn(n);return("iso8601"===e?function(n){return L(n.isoMonth,2)+"-"+L(n.isoDay,2)}(t):nt(t))+rt(e,o)}toPlainDate(n){return this.calendar.dateFromFields({year:n.year,monthCode:this.monthCode,day:this.day},{overflow:"reject"})}}function Ao(n){return new $o(n.isoMonth,n.isoDay,n.calendar,n.isoYear)}function zo(n){return n instanceof Sr||n instanceof qo||n instanceof Io||n instanceof po||n instanceof $o}function Wo(n,t,e){let o;if(n instanceof Sr)o=n;else if(zo(n)){if(e&&n instanceof $o)throw new TypeError("PlainMonthDay not allowed");o=Ir(n.getISOFields())}else o=Sr.from(n);return br(o.calendar,t),o}function Ko(n,t,e){if(zo(n))return n.getISOFields();let{era:o,eraYear:r,year:i,month:a,monthCode:c,day:u}=n;const d=void 0!==r&&void 0!==o?mn(t.id,r,o):void 0;if(void 0===i){if(void 0===d)throw new TypeError("Must specify either a year or an era & eraYear");i=d}else if(void 0!==d&&d!==i)throw new RangeError("year and era/eraYear must match");if(void 0===u)throw new TypeError("Must specify day");const l=s(e);if(void 0!==c){const[n,e]=t.convertMonthCode(c,i);if(void 0!==a&&a!==n)throw new RangeError("Month doesnt match with monthCode");if(a=n,e){if(1===l)throw new RangeError("Month code out of range");u=t.daysInMonth(i,a)}}else if(void 0===a)throw new TypeError("Must specify either a month or monthCode");return[i,a,u]=qn(i,a,u,t,l),Fn(t.epochMilliseconds(i,a,u))}function Go(n,t){if(zo(n)){if(t&&n instanceof $o)throw new TypeError("PlainMonthDay not allowed");return n.getISOFields()}return Sr.from(n).getISOFields()}function Jo(n,t){return Cn(n.epochMilliseconds(t,1,1),n.epochMilliseconds(t+1,1,1))}function Qo(n,t,e,o){return Cn(n.epochMilliseconds(t,1,1),n.epochMilliseconds(t,e,o))+1}mt($o,"PlainMonthDay"),dt($o),ft($o,["monthCode","day"]),so($o,to({month:"numeric",day:"numeric"},{weekday:void 0,year:void 0,hour:void 0,minute:void 0,second:void 0},!0));const Vo={hebrew:6,chinese:0,dangi:0};class Xo extends fn{constructor(n){const t=_o(n);if(e=n,o=t.resolvedOptions().calendar,gn(e)!==gn(o))throw new RangeError("Invalid calendar: "+n);var e,o;super(n),this.format=t,this.yearCorrection=this.computeFieldsDumb(0).year-1970,this.monthCacheByYear={}}epochMilliseconds(n,t,e){return Un(this.queryMonthCache(n)[0][t-1],e-1)}daysInMonth(n,t){const e=this.queryMonthCache(n)[0],o=e[t-1];t>=e.length&&(n++,t=0);return Cn(o,this.queryMonthCache(n)[0][t])}monthsInYear(n){return this.queryMonthCache(n)[0].length}monthCode(n,t){const e=this.queryLeapMonthByYear(t);return!e||n<e?super.monthCode(n,t):super.monthCode(n-1,t)+(n===e?"L":"")}convertMonthCode(n,t){const e=this.queryLeapMonthByYear(t);let o=/L$/.test(n),r=parseInt(n.substr(1)),i=!1;if(o){const n=Vo[this.id];if(void 0===n)throw new RangeError("Calendar system doesnt support leap months");if(n){if(r!==n-1)throw new RangeError("Invalid leap-month month code")}else if(r<=1||r>=12)throw new RangeError("Invalid leap-month month code")}return!o||e&&r===e-1||(i=!0,o=!1),(o||e&&r>=e)&&r++,[r,i]}inLeapYear(n){const t=Jo(this,n);return t>Jo(this,n-1)&&t>Jo(this,n+1)}guessYearForMonthDay(n,t){let e=1970+this.yearCorrection;const o=e+100;for(;e<o;e++){const[o,r]=this.convertMonthCode(n,e);if(!r&&o<=this.monthsInYear(e)&&t<=this.daysInMonth(e,o))return e}throw new Error("Could not guess year")}normalizeISOYearForMonthDay(n){return n}computeFields(n){const t=this.computeFieldsDumb(n),e=this.queryMonthCache(t.year)[2];return{...t,month:e[t.month]}}computeFieldsDumb(n){const t=re(this.format,n);let e,o,r=parseInt(t.relatedYear||t.year);var i;return t.era&&(i=this.id,void 0!==hn[gn(i)])&&(e=se(t.era),o=r,r=mn(this.id,o,e,!0)),{era:e,eraYear:o,year:r,month:t.month,day:parseInt(t.day)}}queryLeapMonthByYear(n){const t=this.queryMonthCache(n),e=this.queryMonthCache(n-1),o=this.queryMonthCache(n+1);if(t[0].length>e[0].length&&t[0].length>o[0].length){const n=t[1],o=e[1];for(let t=0;t<o.length;t++)if(o[t]!==n[t])return t+1}}queryMonthCache(n){const{monthCacheByYear:t}=this;return t[n]||(t[n]=this.buildMonthCache(n))}buildMonthCache(n){const t=[],e=[],o={};let r=Sn(this.guessISOYear(n),1,1);for(r=Un(r,400);;){const o=this.computeFieldsDumb(r);if(o.year<n)break;r=Un(r,1-o.day),o.year===n&&(t.unshift(r),e.unshift(o.month)),r=Un(r,-1)}for(let n=0;n<e.length;n++)o[e[n]]=n+1;return[t,e,o]}guessISOYear(n){return n-this.yearCorrection}}function _o(n){return new ae("en-US",{calendar:n,era:"short",year:"numeric",month:"short",day:"numeric",timeZone:"UTC"})}const nr=Sn(1868,9,8);const tr={gregory:Gn,japanese:class extends Gn{constructor(){super(...arguments),this.format=_o("japanese")}computeFields(n){const t=super.computeFields(n);if(n>=nr){const e=re(this.format,n);t.era=se(e.era),t.eraYear=parseInt(e.relatedYear||e.year)}return t}},islamic:class extends Xo{guessISOYear(n){return Math.ceil(32*n/33+622)}}},er={iso8601:wn};function or(n){const t=(n=String(n)).toLocaleLowerCase();return er[t]||(er[t]=new(tr[gn(t)]||Xo)(n))}const rr=Sn(1582,10,15),ir=Sn(622,7,18),sr={buddhist:rr,japanese:rr,roc:rr,islamic:ir,"islamic-rgsa":ir,indian:0},ar={};function cr(n,t){return ur(n.div(1e6).toNumber(),t)}function ur(n,t){if(function(n,t){return function(n){let t=ar[n];if(void 0===t){const e=sr[n];if(void 0===e)t=!1;else{let o=or(n);o instanceof Xo||(o=new Xo(n));const r=e-864e5,i=o.computeFields(r);t=r!==o.epochMilliseconds(i.year,i.month,i.day)}ar[n]=t}return t}(t)&&n<sr[t]}(n,t))throw new RangeError("Invalid timestamp for calendar")}function dr(n,t,e){const o=7+t-e;return-H(Nn(n,1,o)-t,7)+o-1}function lr(n,t,e){const o=dr(n,t,e),r=dr(n+1,t,e);return(Jo(wn,n)-o+r)/7}const[hr,fr]=m();class mr extends Y{constructor(n){super(),"islamicc"===n&&(n="islamic-civil"),fr(this,or(n))}static from(n){if(h(n))return function(n){const t=n.calendar;if(void 0===t)return n;if(h(t)&&void 0===t.calendar)return t;return new mr(t)}(n);const t=Bt(String(n),!1,!0);return new mr(t?t.calendar||"iso8601":String(n))}get id(){return this.toString()}era(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).era}eraYear(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).eraYear}year(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).year}month(n){const t=Go(n,!0);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).month}monthCode(n){const t=Wo(n,this);return hr(this).monthCode(t.month,t.year)}day(n){const t=Go(n);return wr(hr(this),t.isoYear,t.isoMonth,t.isoDay).day}dayOfWeek(n){const t=Go(n,!0);return Nn(t.isoYear,t.isoMonth,t.isoDay)}dayOfYear(n){const t=Wo(n,this,!0);return Qo(hr(this),t.year,t.month,t.day)}weekOfYear(n){const t=Go(n,!0);return function(n,t,e,o,r){const i=dr(n,o,r),s=Math.floor((Qo(wn,n,t,e)-i-1)/7)+1;if(s<1)return s+lr(n-1,o,r);const a=lr(n,o,r);return s>a?s-a:s}(t.isoYear,t.isoMonth,t.isoDay,1,4)}daysInWeek(n){return Go(n,!0),7}daysInMonth(n){const t=Wo(n,this,!0);return hr(this).daysInMonth(t.year,t.month)}daysInYear(n){const t=Wo(n,this,!0);return Jo(hr(this),t.year)}monthsInYear(n){const t=Wo(n,this,!0);return hr(this).monthsInYear(t.year)}inLeapYear(n){return hr(this).inLeapYear(this.year(n))}dateFromFields(n,t){const e=Ko(u(n,An),hr(this),t);return new Sr(e.isoYear,e.isoMonth,e.isoDay,this)}yearMonthFromFields(n,t){const e=Ko({...u(n,$n),day:1},hr(this),t);return new po(e.isoYear,e.isoMonth,this,e.isoDay)}monthDayFromFields(n,t){const e=hr(this);let{era:o,eraYear:r,year:i,month:s,monthCode:a,day:c}=u(n,Wn);if(void 0===c)throw new TypeError("required property 'day' missing or undefined");if(void 0!==a?i=pn:void 0!==o&&void 0!==r&&(i=mn(e.id,r,o)),void 0===i){if(void 0===a)throw new TypeError("either year or monthCode required with month");i=e.guessYearForMonthDay(a,c)}const d=Ko({year:i,month:s,monthCode:a,day:c},e,t);return new $o(d.isoMonth,d.isoDay,this,e.normalizeISOYearForMonthDay(d.isoYear))}dateAdd(n,e,o){const r=hr(this),i=function(n,e,o,r){n=pt(n=wt(n,e.years,o,r),e.months,o,r);let i=o.epochMilliseconds(n.year,n.month,n.day);const s=Math.trunc(cn(e).div(t).toNumber());return i=Un(i,7*e.weeks+e.days+s),Fn(i)}(N(Sr,n,o),N(ko,e),r,s(o));return new Sr(i.isoYear,i.isoMonth,i.isoDay,this)}dateUntil(n,t,e){const o=hr(this),r=N(Sr,n),i=N(Sr,t),s=d(e).largestUnit,a="auto"===s?6:F(s,6,6,9);return br(this,vr(r,i)),xo(function(n,t,e,o){let r=0,i=0,s=0,a=0;switch(o){case 9:r=function(n,t,e){const[,o,r]=qn(t.year,n.month,n.day,e,0),i=xn(t,n),s=P(t.month,o)||P(t.day,r);return t.year-n.year-(s&&i&&s!==i?i:0)}(n,t,e),n=wt(n,r,e,0);case 8:i=function(n,t,e){let o=0;const r=xn(t,n);if(r){let{year:i}=n;for(;i!==t.year;)o+=e.monthsInYear(i)*r,i+=r;const[,s,a]=qn(t.year,n.month,n.day,e,0);o+=t.month-s;const c=P(t.day,a);c&&r&&c!==r&&(o-=r)}return o}(n,t,e),n=pt(n,i,e,0)}a=Cn(e.epochMilliseconds(n.year,n.month,n.day),e.epochMilliseconds(t.year,t.month,t.day)),7===o&&(s=Math.trunc(a/7),a%=7);return nn({years:r,months:i,weeks:s,days:a,hours:0,minutes:0,seconds:0,milliseconds:0,microseconds:0,nanoseconds:0})}(r,i,o,a))}fields(n){return n.slice()}mergeFields(n,t){return yr(n,t)}toString(){return hr(this).id}}function gr(){return new mr("iso8601")}function yr(n,t){var e;const o={...n,...t};if(void 0!==n.year){delete o.era,delete o.eraYear,delete o.year;let e=!1;void 0===t.era&&void 0===t.eraYear||(o.era=t.era,o.eraYear=t.eraYear,e=!0),void 0!==t.year&&(o.year=t.year,e=!0),e||(o.year=n.year)}if(void 0!==n.monthCode){delete o.monthCode,delete o.month;let e=!1;void 0!==t.month&&(o.month=t.month,e=!0),void 0!==t.monthCode&&(o.monthCode=t.monthCode,e=!0),e||(o.monthCode=n.monthCode)}return void 0!==n.day&&(o.day=null!=(e=t.day)?e:n.day),o}function wr(n,t,e,o){const r=Sn(t,e,o);return ur(r,n.id),n.computeFields(r)}function pr(n){return void 0===n.calendar?gr():N(mr,n.calendar)}function vr(n,t){const{calendar:e}=n;return br(e,t.calendar),e}function Mr(n,t){const e=n.calendar,o=t.calendar;if("iso8601"===e.id)return o;if("iso8601"===o.id)return e;if(e.id!==o.id)throw new RangeError("Non-ISO calendars incompatible");return e}function br(n,t){if(n.toString()!==t.toString())throw new RangeError("Calendars must match")}mt(mr,"Calendar");class Sr extends U{constructor(n,t,e,o=gr()){const r=Hn({isoYear:n,isoMonth:t,isoDay:e},1),i=N(mr,o);!function(n,t){const e=Mn(n);Ge(e.add(e.sign()<0?86399999999999:0)),cr(e,t)}(r,i.toString()),super({...r,calendar:i})}static from(n,t){return s(t),n instanceof Sr?Ir(n.getISOFields()):"object"==typeof n?be(n,t):Ir(ne(xt(String(n))))}static compare(n,t){return Rn(N(Sr,n),N(Sr,t))}with(n,t){return De(this,n,t)}withCalendar(n){const t=this.getISOFields();return new Sr(t.isoYear,t.isoMonth,t.isoDay,n)}add(n,t){return this.calendar.dateAdd(this,n,t)}subtract(n,t){return this.calendar.dateAdd(this,N(ko,n).negated(),t)}until(n,t){return Fr(this,N(Sr,n),!1,t)}since(n,t){return Fr(this,N(Sr,n),!0,t)}equals(n){return!Rn(this,N(Sr,n))}toString(n){const t=Jn(n),e=this.getISOFields();return nt(e)+rt(e.calendar.toString(),t)}toZonedDateTime(n){const t=function(n){let t,e;if("string"==typeof n)e=n;else{if("object"!=typeof n)throw new TypeError("Invalid options/timeZone argument");if(void 0!==n.id?e=n:(e=n.timeZone,t=n.plainTime),void 0===e)throw new TypeError("Invalid timeZone argument")}return{plainTime:t,timeZone:e}}(n),e=N(we,t.timeZone),o=void 0===t.plainTime?void 0:N(ho,t.plainTime);return Fo({...this.getISOFields(),...o?o.getISOFields():on,timeZone:e})}toPlainDateTime(n){return Ho({...this.getISOFields(),...mo(n).getISOFields()})}toPlainYearMonth(){return vo(this.getISOFields())}toPlainMonthDay(){return this.calendar.monthDayFromFields(this)}}function Ir(n){return new Sr(n.isoYear,n.isoMonth,n.isoDay,n.calendar)}function Fr(n,t,e,o){return xo(Or(n,t,vr(n,t),e,T(o,6,6,6,9)))}function Tr(n,t,e,o,r){return Uo(Dr(n,t,e,r.largestUnit),n,t,e,o,r)}function Or(n,t,e,o,r){return Uo(e.dateUntil(n,t,{largestUnit:M[r.largestUnit]}),n,t,e,o,r)}function Dr(n,t,e,o){if(!i(o))return Nr(n,t,o);const r=Ir({...n.getISOFields(),calendar:e});let s,a,c,u,d,l=Ir({...t.getISOFields(),calendar:e});do{a=e.dateUntil(r,l,{largestUnit:M[o]}),s=n.add(a),c=Nr(s,t,5),u=a.sign,d=c.sign}while(u&&d&&u!==d&&(l=l.add({days:d})));return f=c,{sign:(h=a).sign||f.sign,years:h.years+f.years,months:h.months+f.months,weeks:h.weeks+f.weeks,days:h.days+f.days,hours:h.hours+f.hours,minutes:h.minutes+f.minutes,seconds:h.seconds+f.seconds,milliseconds:h.milliseconds+f.milliseconds,microseconds:h.microseconds+f.microseconds,nanoseconds:h.nanoseconds+f.nanoseconds};var h,f}function Nr(n,t,e){return dn(Tn(t).sub(Tn(n)),e)}mt(Sr,"PlainDate"),dt(Sr),ft(Sr,ht),so(Sr,to({year:"numeric",month:"numeric",day:"numeric",weekday:void 0},{hour:void 0,minute:void 0,second:void 0}));class Yr extends E{constructor(n){super();const t=K(n,!0);!function(n){-1!==G(n,Ae)&&1!==G(n,$e)||Zn()}(t),this[vn]=t}static from(n){if(n instanceof Yr)return new Yr(n.epochNanoseconds);const t=kt(String(n)),e=t.offsetNanoseconds;if(void 0===e)throw new RangeError("Must specify an offset");return new Yr(Mn(Ln(t,1)).sub(e))}static fromEpochSeconds(n){return new Yr(K(n).mult(1e9))}static fromEpochMilliseconds(n){return new Yr(K(n).mult(1e6))}static fromEpochMicroseconds(n){return new Yr(n*BigInt(1e3))}static fromEpochNanoseconds(n){return new Yr(n)}static compare(n,t){return jn(N(Yr,n),N(Yr,t))}add(n){return new Yr(Mt(this[vn],N(ko,n)))}subtract(n){return new Yr(Mt(this[vn],X(N(ko,n))))}until(n,t){return Er(this,N(Yr,n),t)}since(n,t){return Er(N(Yr,n),this,t)}round(n){const t=O(n,0,5,!0);return new Yr(Ve(this[vn],t))}equals(n){return!jn(this,N(Yr,n))}toString(n){const t=d(n).timeZone;return this.toZonedDateTimeISO(null!=t?t:"UTC").toString({...n,offset:void 0===t?"never":"auto",timeZoneName:"never"})+(void 0===t?"Z":"")}toZonedDateTimeISO(n){return new Io(this.epochNanoseconds,n)}toZonedDateTime(n){if(!h(n))throw new TypeError("Must specify options");if(void 0===n.calendar)throw new TypeError("Must specify a calendar");if(void 0===n.timeZone)throw new TypeError("Must specify a timeZone");return new Io(this.epochNanoseconds,n.timeZone,n.calendar)}}function Er(n,t,o){const r=T(o,3,0,0,5);return xo(function(n,t,o){return dn(q(t.sub(n),e[o.smallestUnit]*o.roundingIncrement,o.roundingFunc),o.largestUnit)}(n[vn],t[vn],r))}mt(Yr,"Instant"),at(Yr),so(Yr,_e({year:"numeric",month:"numeric",day:"numeric",weekday:void 0,hour:"numeric",minute:"2-digit",second:"2-digit"},{timeZoneName:void 0},{}));const Zr=Symbol(),Cr=Symbol(),Ur=Symbol();class Pr extends Intl.DateTimeFormat{constructor(n,t){const e=ce(n),o=function(n){const t={};for(const e in n){let o=n[e];h(o)&&(o=o.toString()),t[e]=o}return t}(t||{});super(e,o),this[Zr]=e,this[Cr]=o,this[Ur]=new Map}format(n){const t=kr(this,n);return t[0]===this?super.format(t[1]):t[0].format(t[1])}formatToParts(n){return super.formatToParts.call(...kr(this,n))}formatRange(n,t){return super.formatRange.call(...xr(this,n,t))}formatRangeToParts(n,t){return super.formatRangeToParts.call(...xr(this,n,t))}}const Rr=Pr;function kr(n,t){const e=ao(t);if(e){const o=jr(n,e);return[o.buildFormat(t),o.buildEpochMilli(t)]}return[n,t]}function xr(n,t,e){const o=ao(t);if(o!==ao(e))throw new TypeError("Mismatch of types");if(o){const r=jr(n,o);return[r.buildFormat(t,e),new Date(r.buildEpochMilli(t)),new Date(r.buildEpochMilli(e))]}return[n,t,e]}function jr(n,t){const e=n[Ur];let o=e.get(t);return o||(o=function(n){const t={};return{buildFormat:function(e,o){const r=n.buildKey(e,o),i=r.join("|");return t[i]||(t[i]=n.buildFormat(...r))},buildEpochMilli:n.buildEpochMilli}}(t(n[Zr],n[Cr])),e.set(t,o)),o}const qr={zonedDateTimeISO:function(n){return Fo(Lr("iso8601",n))},zonedDateTime:function(n,t){return Fo(Lr(n,t))},plainDateTimeISO:function(n){return Ho(Lr("iso8601",n))},plainDateTime:function(n,t){return Ho(Lr(n,t))},plainDateISO:function(n){return Ir(Lr("iso8601",n))},plainDate:function(n,t){return Ir(Lr(n,t))},plainTimeISO:function(n){return fo(Lr("iso8601",n))},instant:function(){return new Yr(Br())},timeZone:Hr};mt(qr,"Now");function Hr(){return new we((new ae).resolvedOptions().timeZone)}function Lr(n,t=Hr()){const e=N(we,t);return{...To(Br(),e)[0],timeZone:e,calendar:N(mr,n)}}function Br(){return K(Date.now()).mult(1e6)}const $r={PlainYearMonth:po,PlainMonthDay:$o,PlainDate:Sr,PlainTime:ho,PlainDateTime:qo,ZonedDateTime:Io,Instant:Yr,Calendar:mr,TimeZone:we,Duration:ko,Now:qr,[Symbol.toStringTag]:"Temporal"};exports.DateTimeFormat=Rr,exports.Temporal=$r,exports.getGlobalThis=function(){return"undefined"!=typeof globalThis?globalThis:window},exports.toTemporalInstant=function(){return Yr.fromEpochMilliseconds(this.valueOf())};


},{}],166:[function(require,module,exports){
Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./common-c41a489f.cjs");const t=e.Temporal,o={...e.getGlobalThis().Intl,DateTimeFormat:e.DateTimeFormat},r=e.toTemporalInstant;exports.Intl=o,exports.Temporal=t,exports.toTemporalInstant=r;


},{"./common-c41a489f.cjs":165}],167:[function(require,module,exports){
Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./impl.cjs");require("./common-c41a489f.cjs"),exports.Intl=e.Intl,exports.Temporal=e.Temporal,exports.toTemporalInstant=e.toTemporalInstant;


},{"./common-c41a489f.cjs":165,"./impl.cjs":166}]},{},[1]);
