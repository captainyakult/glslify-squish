

module.exports = transform;
module.exports.sync = transform;

function transform(filename, src, opts, done) {

  console.log('\nWe are inside the GLSL pipe!');
  console.log('filename', filename);
  console.log('src', src);
  console.log('opts', opts);
  console.log('done', done);

  // src = src.replace(regexLong, function(whole, r, g, b, a) {
  //   return makeVec(r, g, b, a)
  // });

  if (typeof done === 'function') done(null, src);
  return src
}