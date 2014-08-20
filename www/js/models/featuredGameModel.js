define(['Backbone'],
  function(Backbone){
    //MODEL FOR INDIVIDUAL GAME
    var FeatureGameModel = Backbone.Model.extend({
      baseUrl: 'http://localhost:1337/featured',
      url: function(){
        return this.baseUrl;
      },
      setBookMarkStatus: function(){
        bookmarks = window.localStorage.bookmarks ? JSON.parse(window.localStorage.bookmarks) : [];
        var alreadyBookmarked = _.findWhere(bookmarks, { id: this.get('id') });

        if(alreadyBookmarked !== undefined){
          this.set({ isBookmarked: true });
          return;
        }

        else{
          this.set({ isBookmarked: false });
          return;
        }
      }
    });

    return FeatureGameModel;
});
