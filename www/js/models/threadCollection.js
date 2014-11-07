define(['Backbone'], function(Backbone){
  var forumCollection = Backbone.Collection.extend({
    baseUrl: 'http://bgg-middleware.azurewebsites.net/threads?id=',
    url: function(){
      return this.baseUrl + this.forumId;
    }
  });

  return forumCollection;
});
