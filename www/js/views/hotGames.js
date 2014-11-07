define(['Backbone',
        'Marionette',
        'js/views/game',
        'hbs!templates/hotGame',
        'hbs!templates/no-bookmarks',
        'js/models/game',
        'js/views/gameDetail',
        'js/AuthToken'],
function(Backbone,
         Marionette,
         GameView,
         template,
         noBookmarksTemplate,
         GameModel,
         DetailedGameView,
         auth){

    var HotGamesView = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      ui: {
        gameTitle: 'li'
      },
      events: {
        'click @ui.gameTitle' : 'showDetails'
      },
      render: function(){
        var self = this;

        $(this.el).html(template({ model: this.model.toJSON(), index: ++this.options.indexInCollection }));
        $(this.el).on('click', function(){
          self.showDetails();
        });
        return this;
      },
      showDetails: function(){
        var self = this;
        //page load has to be here or it won't render correctly
        theApp.views[0].loadPage("html/game.html");

        showNewIndicator();
        self.gameModel = new GameModel({ id: self.model.get('id'), details: true });
        self.gameModel.fetch({
          beforeSend: function(xhr){
            xhr.setRequestHeader('auth-token', auth.token);
          },
          success: function(){
            //create html for details view
            self.detailedGameView = new DetailedGameView({ model: self.gameModel });
            self.detailedGameView.render();

            $('.game-page').html(self.detailedGameView.el);
            hideNewIndicator();
          }
        });
      }
    });

    var NoGamesView = Backbone.Marionette.ItemView.extend({
      render: function(){
        this.$el.html(noBookmarksTemplate({ NO_RESULTS: 'Games not found.' }));
        return this;
      }
    });

    var BookmarkView = Backbone.Marionette.CollectionView.extend({
        itemView: HotGamesView,
        emptyView: NoGamesView,
        tagName: 'ul',
        itemViewOptions: function(model){
         return { indexInCollection : this.collection.indexOf(model) };
        }
    });

    return BookmarkView;
});
