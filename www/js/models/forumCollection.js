define(['Backbone'], function(Backbone){
  var forumCollection = Backbone.Collection.extend({
    baseUrl: 'http://bgg-middleware.herokuapp.com/forumlist?id=',
    url: function(){
      return this.baseUrl + this.gameId;
    }
  });

  return forumCollection;
});
