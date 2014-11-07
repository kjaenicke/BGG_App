define(['Backbone'], function(){
  var threadDetailCollection = Backbone.Model.extend({
    baseUrl: 'http://bgg-middleware-stage.azurewebsites.net/thread?id=',
    url: function(){
      return this.baseUrl + this.threadId;
    }
  });

  return threadDetailCollection;
});
