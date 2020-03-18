
import tokenizer from 'glsl-tokenizer/stream'
import parser from 'glsl-parser';
import minify from 'glsl-min-stream';
import deparser from 'glsl-deparser';
import stringToStream from 'string-to-stream';


const transform = (filename, src, opts, done) => {

  console.log('\nWe are inside the GLSL pipe!');
  console.log('filename', filename);
  console.log('src', src);
  console.log('opts', opts);
  console.log('done', done);

  const tokens = stringToStream(src)
    .pipe(tokenizer())
    .on('error', error => console.error(`Tokenizer: ${error}`));

  console.log(tokens);

  // .pipe(parser())
  //   .on('error', error => console.error(`Parser: ${error}`))
  //   .pipe(minify())
  //   .on('error', error => console.error(`Minify: ${error}`))
  //   .pipe(deparser(false))
  //   .on('error', error => console.error(`Deparser: ${error}`))

  // src = src.replace(regexLong, function(whole, r, g, b, a) {
  //   return makeVec(r, g, b, a)
  // });

  if (typeof done === 'function') done(null, src);
  return src
};

module.exports = transform;
module.exports.sync = transform;