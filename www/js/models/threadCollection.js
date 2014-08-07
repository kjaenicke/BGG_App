define(['Backbone'], function(Backbone){
  var forumCollection = Backbone.Collection.extend({
    baseUrl: 'http://bgg-middleware.herokuapp.com/threads?id=',
    url: function(){
      return this.baseUrl + this.forumId;
    }
  });

  return forumCollection;
});
