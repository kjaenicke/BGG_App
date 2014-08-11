define('templates/helpers/formatDate', ['hbs/handlebars'], function ( Handlebars ) {
  function formatDate(date) {
    if(date) return new Date(date).toDateString();
  }
  Handlebars.registerHelper( 'formatDate', formatDate );
  return formatDate;
});
