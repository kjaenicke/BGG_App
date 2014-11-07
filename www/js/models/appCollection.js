define(['Backbone'],
  function(Backbone){
    var AppCollection = Backbone.Collection.extend({
      baseUrl: 'http://bgg-middleware.azurewebsites.net/apps',
      url: function(){
        return this.baseUrl;
      }
    });
    return AppCollection;
});
