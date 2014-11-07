define(['Backbone'], function(Backbone){
  var Top100GamesCollection = Backbone.Collection.extend({
      baseUrl: 'http://bgg-middleware.azurewebsites.net/top100',
      url: function(){
        return this.baseUrl;
      }
  });

  return Top100GamesCollection;

});
