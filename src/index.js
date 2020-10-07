const kuromoji = require('kuromoji');
const builder = kuromoji.builder({
  dicPath: './dict',
  // dicPath: 'node_modules/kuromoji/dict',
});
/**
 * @typedef {import('kuromoji').IpadicFeatures} IpadicFeatures
 */

const $ = require('jquery');
// 入力テキスト読込する.
// const fs = require('fs');
// const inputText = fs.readFileSync('./input.txt').toString();

/**
 * Promise化する.
 * @param {string} inputText
 * @return {Promise<Array<IpadicFeatures>>}
 */
const asyncBuilder = (inputText) => {
  return new Promise((resolve, reject) => {
    builder.build((err, tokenizer) => {
      if (err) reject(err);

      // 解析する.
      const tokens = tokenizer.tokenize(inputText);
      resolve(tokens);
    });
  });
};

const analyze = async (inputText) => {
  // 解析する.
  const tokens = await asyncBuilder(inputText);

  const tokenArray = tokens.map((token) => {
    return token.pos === '動詞' ? '（ ）' : token.surface_form;
  });
  //   console.dir(tokenArr);

  const result = tokenArray.join('');
  return result;
};

$('#btn-run').on('click', () => {
  const $input = $('#text-input');
  const $output = $('#text-output');

  const inputText = $input.val() || '';
  console.log('---------- Original ----------\n', inputText);

  analyze(inputText).then((result) => {
    console.log('---------- Fill-In-The-Blank_Question ----------\n', result);
    $output.val(result);
  });
});
