define(['Backbone', 'Marionette', 'js/views/game', 'hbs!templates/bookmark'],
  function(Backbone, Marionette, GameView, template){

    var BookmarkItem = Backbone.Marionette.ItemView.extend({
      render: function(){
        $(this.el).html(template(this.model.toJSON()));
        return this;
      }
    });

    var RecentSearchesView = Backbone.Marionette.CollectionView.extend({
        itemView: BookmarkItem,
        tagName: 'ul'
    });

    return RecentSearchesView;
});
