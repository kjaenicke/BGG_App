define(['Backbone'],
  function(Backbone){

    //COLLECTION OF MOST ACTIVE GAMES
    var MostActiveCollection = Backbone.Collection.extend({
      baseUrl: 'http://bgg-middleware.azurewebsites.net/mostActive?type=',
      initialize: function(models, options){
        //grab parameters for game collection
        if(options.type){
          this.type = options.type;
        }
        if(options.limit){
          this.limit = options.limit;
        }
      },
      fetch: function(options){
        if(this.type){
          this.url = this.baseUrl + '"' + this.type + '"';
        }
        if(this.limit){
          this.url += '&limit=' + this.limit;
        }

        Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    return MostActiveCollection;
});
