define(['Backbone', 'js/models/game'],
  function(Backbone, GameModel){

    //COLLECTION OF GAMES
    var GameCollection = Backbone.Collection.extend({
      // model: GameModel,
      baseUrl: 'http://bgg-middleware.herokuapp.com/search?searchTerms=',
      initialize: function(models, options){
        //grab parameters for game collection
        if(options.searchTerms){
          this.searchTerms = options.searchTerms;
        }
        if(options.limit){
          this.limit = options.limit;
        }
        if(options.filter){
          this.filter = options.filter;
        }
      },
      fetch: function(options){
        if(this.searchTerms){
          this.url = this.baseUrl + '"' + this.searchTerms + '"';
        }
        if(this.get('limit')){
          this.url += '&limit=' + this.get('limit');
        }
        if(this.get('filter')){
          this.url += '&filter=' + '"' + this.get('filter') + '"';
        }

        Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    return GameCollection;
});
