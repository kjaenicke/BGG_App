define(['Backbone'],
  function(Backbone){

    //COLLECTION OF USER'S BOOKMARKS
    var BookmarksCollection = Backbone.Collection.extend({
      fetch: function(options){
        var recentItems = window.localStorage.bookmarks ? JSON.parse(window.localStorage.bookmarks) : [];
        this.reset(recentItems);
        options.success(this.models);
      }
    });

    return BookmarksCollection;
});
