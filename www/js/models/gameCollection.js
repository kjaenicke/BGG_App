define(['Backbone', 'js/models/game'],
  function(Backbone, GameModel){

    //COLLECTION OF GAMES
    var GameCollection = Backbone.Collection.extend({
      // model: GameModel,
      baseUrl: 'http://powerful-cove-3241.herokuapp.com/search?searchTerms=',
      initialize: function(models, options){
        this.searchTerms = options.searchTerms;
      },
      fetch: function(options){
        if(this.searchTerms){
          this.url = this.baseUrl + '"' + this.searchTerms + '"';
          Backbone.Collection.prototype.fetch.call(this, options);
        }
      }
    });

    return GameCollection;
});
