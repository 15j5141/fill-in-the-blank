const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: 'node_modules/kuromoji/dict',
});

// 入力テキスト読込する.
const fs = require('fs');
const inputText = fs.readFileSync('./input.txt').toString();

builder.build((err, tokenizer) => {
  if (err) {
    throw err;
  }

  const tokens = tokenizer.tokenize(inputText);
  const tokenArray = tokens.map((token) => {
    return token.pos === '動詞' ? '（ ）' : token.surface_form;
  });
  //   console.dir(tokenArr);
  console.log('---------- Original ----------\n', inputText);
  console.log(
    '---------- Fill-In-The-Blank_Question ----------\n',
    tokenArray.join('')
  );
});
