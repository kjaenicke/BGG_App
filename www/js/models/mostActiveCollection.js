define(['Backbone'],
  function(Backbone){

    //COLLECTION OF MOST ACTIVE GAMES
    var MostActiveCollection = Backbone.Collection.extend({
      baseUrl: 'http://powerful-cove-3241.herokuapp.com/mostActive?type=',
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
        if(this.get('type')){
          this.url = this.baseUrl + '"' + this.get('type') + '"';
        }
        if(this.get('limit')){
          this.url += '&limit=' + this.get('limit');
        }

        Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    return MostActiveCollection;
});
