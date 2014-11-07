define(['Backbone'], function(Backbone){
  var forumCollection = Backbone.Collection.extend({
    baseUrl: 'http://bgg-middleware-stage.azurewebsites.net/threads?id=',
    url: function(){
      return this.baseUrl + this.forumId;
    }
  });

  return forumCollection;
});
