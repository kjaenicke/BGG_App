define(['Backbone', 'js/models/game'],
  function(Backbone, GameModel){

    //COLLECTION OF PHOTOS
    var PhotoCollection = Backbone.Collection.extend({
      baseUrl: 'http://powerful-cove-3241.herokuapp.com/gameImages?id=',
      initialize: function(options){
        if(options.id){
          this.id = options.id;
        }
      },
      fetch: function(options){
        if(this.id){
          this.url = this.baseUrl + this.id;
        }

        Backbone.Collection.prototype.fetch.call(this, options);
      }
    });

    return PhotoCollection;
});
