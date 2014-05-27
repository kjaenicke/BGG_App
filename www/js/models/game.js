define(['Backbone'],
  function(Backbone){
    //MODEL FOR INDIVIDUAL GAME
    GameModel = Backbone.Model.extend({
      baseUrl: 'http://powerful-cove-3241.herokuapp.com/game',
      fetch: function(options){
        if(this.get('id')){
          if(this.get('details')){
            this.url = this.baseUrl + '/details/?id=' + this.id;
          }
          else{
            this.url = this.baseUrl + '?id=' + this.id;
          }
          Backbone.Model.prototype.fetch.call(this, options);
        }
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

    return GameModel;
});
