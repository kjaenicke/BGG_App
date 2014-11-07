define(['Backbone'], function(Backbone){
  var AnnouncementsCollection = Backbone.Collection.extend({
      baseUrl: 'http://bgg-middleware-stage.azurewebsites.net/announcements',
      url: function(){
        return this.baseUrl;
      },
      comparator: function(announcement){
        return - new Date(announcement.get('date'));
      }
  });

  return AnnouncementsCollection;

});
