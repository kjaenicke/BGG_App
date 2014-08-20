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
      showFeaturedGame: function(){
        var self = this;
        //page load has to be here or it won't render correctly
        theApp.views[0].loadPage("game.html");

        // see if we've already fetch the deets on this Bee before we refetch it and waste time
        if(!self.gameModel){
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
        }
        else {
            //create html for details view
            theApp.views[0].loadPage("game.html");
            $('.game-page').html(self.detailedGameView.el);
          }
      },
      showDevFeedback: function(){
        window.open('mailto:shawn.p.hoffman@gmail.com?subject=BGG%20Dev%20Feedback', '_system');
      }
    });

    return MainLayout;
});
