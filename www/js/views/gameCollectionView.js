define(['Backbone', 'Marionette', 'js/views/game'],
  function(Backbone, Marionette, GameView){

    var GameCollectionView = Backbone.Marionette.CollectionView.extend({
        itemView: GameView,
        tagName: 'ul'
     });

    return GameCollectionView;
});
