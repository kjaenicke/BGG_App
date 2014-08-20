define(['Backbone'], function(Backbone){
  var HotGamesCollection = Backbone.Collection.extend({
      baseUrl: 'http://bgg-middleware.azurewebsites.net/mostActive',
      url: function(){
        return this.baseUrl;
      }
  });

  return HotGamesCollection;

});
