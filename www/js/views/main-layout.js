define(['Backbone',
        'Marionette',
        'hbs!templates/main-layout',
        'js/models/top100GamesCollection',
        'js/models/hotGamesCollection',
        'js/models/featuredGameModel',
        'js/views/top100Games',
        'js/views/hotGames',
        'js/views/gameDetail'],
  function(Backbone,
           Marionette,
           Template,
           TopGamesCollection,
           HotGamesCollection,
           FeaturedGameModel,
           TopGamesView,
           HotGamesView,
           DetailedGameView){

    var MainLayout = Backbone.Marionette.Layout.extend({
      template: Template(),
      ui: {
        top100Icon        : '.top100-icon',
        hotBoardGamesIcon : '.hotboardgames-icon',
        featuredGameIcon  : '.featuredgame-icon',
        devFeedback       : '.devFeedback'
      },
      events: {
        'click @ui.top100Icon'        : 'showTop100Games',
        'click @ui.hotBoardGamesIcon' : 'showHotBoardGames',
        'click @ui.featuredGameIcon'  : 'showFeaturedGame',
        'click @ui.devFeedback'       : 'showDevFeedback'
      },
      onRender: function(){
        $.ajax({
          dataType: "json",
          global: false,
          url: 'http://bgg-middleware.azurewebsites.net/featured/image',
          success: function(data){
            $('#featuredImage').append('<img src="' + data.thumbURL + '" class="featureImage" />').removeClass('bgg-star-fill');
          }
        });
      },
      showTop100Games: function(){
        var self = this;
        theApp.views[0].loadPage("html/top-100.html");

        showNewIndicator();
        self.topGamesCollection = new TopGamesCollection();
        self.topGamesCollection.fetch({
            success: function(){
              self.topGamesView = new TopGamesView({ collection: self.topGamesCollection });
              self.topGamesView.render();
              $('.page-top100 .list-block').html(self.topGamesView.el);
              hideNewIndicator();
          }
        });
      },
      showHotBoardGames: function(){
        var self = this;
        theApp.views[0].loadPage("html/hot-games.html");

        showNewIndicator();
        self.hotGamesCollection = new HotGamesCollection();
        self.hotGamesCollection.fetch({
            success: function(){
              self.hotGamesView = new HotGamesView({ collection: self.hotGamesCollection });
              self.hotGamesView.render();
              $('.page-hot-games .list-block').html(self.hotGamesView.el);
              hideNewIndicator();
          }
        });
      },
      showFeaturedGame: function(){
        var self = this;
        //page load has to be here or it won't render correctly
        theApp.views[0].loadPage("html/game.html");

        showNewIndicator();
        self.gameModel = new FeaturedGameModel();
          self.gameModel.fetch({ success: function(){
            //create html for details view
            self.detailedGameView = new DetailedGameView({ model: self.gameModel });
            self.detailedGameView.render();

            $('.game-page').html(self.detailedGameView.el);
            hideNewIndicator();
          }
        });
      },
      showDevFeedback: function(){
        window.open('mailto:shawn.p.hoffman@gmail.com?subject=iBGG%20Feedback', '_system');
      }
    });

    return MainLayout;
});
