define(['Backbone', 'Marionette', 'js/views/game', 'hbs!templates/recent-search', 'hbs!templates/no-recent-search'],
  function(Backbone, Marionette, GameView, template, noRecentSearchesTemplate){

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
        this.$el.html(template(this.model.toJSON()));
        return this;
      }
    });

    var NoRecentSearchesView = Backbone.Marionette.ItemView.extend({
      render: function(){
        this.$el.html(noRecentSearchesTemplate({ NO_RESULTS: 'No search results found.' }));
        return this;
      }
    });

    var RecentSearchesView = Backbone.Marionette.CollectionView.extend({
        itemView: RecentSearchItem,
        emptyView: NoRecentSearchesView,
        tagName: 'ul'
    });

    return RecentSearchesView;
});
