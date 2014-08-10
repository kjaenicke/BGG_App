define('templates/helpers/ifRound', ['hbs/handlebars'], function ( Handlebars ) {
  function ifRound ( n, block ) {
    var accum = '';
    if ((this.rating*1) % 1 != 0) {
        accum = block.fn();
    }
    return accum;
  }
  Handlebars.registerHelper( 'ifRound', ifRound );
  return ifRound;
});
