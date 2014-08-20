define(['Backbone',
        'Marionette',
        'hbs!templates/main-layout',
        'js/models/top100GamesCollection',
        'js/models/hotGamesCollection',
        'js/views/top100Games',
        'js/views/hotGames'],
  function(Backbone, Marionette, Template, TopGamesCollection, HotGamesCollection, TopGamesView, HotGamesView){

    var MainLayout = Backbone.Marionette.Layout.extend({
      template: Template(),
      ui: {
        top100Icon        : '.top100-icon',
        hotBoardGamesIcon : '.hotboardgames-icon',
        featuredGameIcon  : '.featuredgame-icon'
      },
      events: {
        'click @ui.top100Icon'        : 'showTop100Games',
        'click @ui.hotBoardGamesIcon' : 'showHotBoardGames',
        'click @ui.featuredGameIcon'  : 'showFeaturedGame'
      },
      showTop100Games: function(){
        var self = this;
        theApp.views[0].loadPage("top-100.html");

        showNewIndicator();
        if(!self.topGamesCollection){
          self.topGamesCollection = new TopGamesCollection();
          self.topGamesCollection.fetch({
              success: function(){
                self.topGamesView = new TopGamesView({ collection: self.topGamesCollection });
                self.topGamesView.render();
                $('.page-top100 .list-block').html(self.topGamesView.el);
                hideNewIndicator();
            }
          });
        }
        else {
          theApp.views[0].loadPage("top-100.html");
          $('.page-top100 .list-block').html(self.topGamesView.el);
          hideNewIndicator();
        }
      },
      showHotBoardGames: function(){
        var self = this;
        theApp.views[0].loadPage("hot-games.html");

        showNewIndicator();
        if(!self.hotGamesCollection){
          self.hotGamesCollection = new HotGamesCollection();
          self.hotGamesCollection.fetch({
              success: function(){
                self.hotGamesView = new HotGamesView({ collection: self.hotGamesCollection });
                self.hotGamesView.render();
                $('.page-hot-games .list-block').html(self.hotGamesView.el);
                hideNewIndicator();
            }
          });
        }
        else {
          theApp.views[0].loadPage("hot-games.html");
          $('.page-hot-games .list-block').html(self.hotGamesView.el);
          hideNewIndicator();
        }
      },
      showFeaturedGame: function(){}
    });

    return MainLayout;
});
