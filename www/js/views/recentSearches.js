define(['Backbone', 'Marionette', 'js/views/game', 'hbs!templates/recent-search'],
  function(Backbone, Marionette, GameView, template){

    var RecentSearchItem = Backbone.Marionette.ItemView.extend({
      ui: {
        gameRow: '.recent-search'
      },
      events: {
        'click @ui.gameRow': 'setLocalStorageGameValue'
      },
      setLocalStorageGameValue: function(){
        window.localStorage.setItem('searchTitle', JSON.stringify(this.model));
        $(window).trigger('storage');
      },
      render: function(){
        $(this.el).html(template(this.model.toJSON()));
        return this;
      }
    });

    var RecentSearchesView = Backbone.Marionette.CollectionView.extend({
        itemView: RecentSearchItem,
        tagName: 'ul'
    });

    return RecentSearchesView;
});
