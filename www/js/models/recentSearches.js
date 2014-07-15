define(['Backbone'],
  function(Backbone){

    //COLLECTION OF MOST ACTIVE GAMES
    var RecentSearchesCollection = Backbone.Collection.extend({
      fetch: function(options){
        var recentItems = window.localStorage.recentSearches ? JSON.parse(window.localStorage.recentSearches) : new Backbone.Collection();
        recentItems = _.uniq(recentItems);
        var gameObjects = [];

         _.each(recentItems, function(item){
           gameObjects.push({ title: item, type: 'boardgame' });
         });

        this.reset(gameObjects);
        options.success(this.models || {});
      }
    });

    return RecentSearchesCollection;
});
