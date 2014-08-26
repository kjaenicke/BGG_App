define(['Backbone', 'Marionette', 'js/models/recentSearches', 'js/views/game', 'hbs!templates/recent-search', 'hbs!templates/no-recent-search'],
  function(Backbone, Marionette, RecentSearchesModel, GameView, template, noRecentSearchesTemplate){

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
        tagName: 'ul',
        onRender: function(){
          var self = this;
          $('#clear-recent-searches').on('click', function(){
            window.localStorage.removeItem('recentSearches');
            self.recentSearchesModel = new RecentSearchesModel();
            self.recentSearchesModel.fetch({
              success: function(data){
                  self.collection = new Backbone.Collection(data);
                  self.render();
              }
            });
          });
        }
    });

    return RecentSearchesView;
});
