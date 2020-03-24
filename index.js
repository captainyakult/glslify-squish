
const minify = require('./glsl-minify-stream');

const tokenizer = require('glsl-tokenizer/stream');
const parser = require('glsl-parser/stream');
const deparser = require('glsl-deparser');
const { Readable, Writable } = require('stream');


const transform = (filename, src, opts, done) => {

  let data = '';

  const getData = () => {
    return new Writable({
      objectMode: true,
      write: (strData, _, done) => {
        // console.log('<-', strData)
        data += strData;
        done()
      }
    })
  }

  const stream = Readable.from(src)

  stream
  .pipe(tokenizer())
  .on('error', error => console.error(`Tokenizer: ${error}`))
  .pipe(parser())
  .on('error', error => console.error(`Parser: ${error}`))
  .pipe(minify())
  .on('error', error => console.error(`Minify: ${error}`))
  .pipe(deparser(false))
  .on('error', error => console.error(`Deparser: ${error}`))
  .pipe(getData())

  // stream.on('data', (data) => { console.log('<-', data) })

  stream.on('end', () => {
    // console.log("before", src);
    console.log("after", data);
    if (typeof done === 'function') {
      done(null, data);
    }
  });

  return src
};

module.exports = transform;
module.exports.sync = transform;