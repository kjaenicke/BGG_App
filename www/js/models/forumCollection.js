define(['Backbone'], function(Backbone){
  var forumCollection = Backbone.Collection.extend({
    baseUrl: 'http://bgg-middleware.azurewebsites.net/forumlist?id=',
    url: function(){
      return this.baseUrl + this.gameId;
    }
  });

  return forumCollection;
});
