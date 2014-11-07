define(['Backbone', 'Marionette', 'js/models/bookmarksCollection', 'js/views/game', 'hbs!templates/bookmark', 'hbs!templates/no-bookmarks', 'js/models/game', 'js/views/gameDetail', 'js/AuthToken'],
  function(Backbone, Marionette, BookmarksModel, GameView, template, noBookmarksTemplate, GameModel, DetailedGameView, auth){

    var BookmarkItem = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      ui: {
        gameTitle: 'li'
      },
      events: {
        'click @ui.gameTitle' : 'showDetails'
      },
      render: function(){
        var self = this;

        $(this.el).html(template(this.model.toJSON()));
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

    var NoBookmarksView = Backbone.Marionette.ItemView.extend({
      render: function(){
        this.$el.html(noBookmarksTemplate({ NO_RESULTS: 'No bookmarks found.' }));
        return this;
      }
    });

    var BookmarkView = Backbone.Marionette.CollectionView.extend({
        itemView: BookmarkItem,
        emptyView: NoBookmarksView,
        tagName: 'ul',
        onRender: function(){
          var self = this;
          $('#clear-bookmarks').on('click', function(){
            theApp.confirm('Are you sure you want to clear your bookmarks?', function(){
              window.localStorage.removeItem('bookmarks');
              self.bookmarksModel = new BookmarksModel();
              self.bookmarksModel.fetch({
                success: function(data){
                    self.collection = new Backbone.Collection(data);
                    self.render();
                }
              });
            }, null);
          });
        }
    });

    return BookmarkView;
});
