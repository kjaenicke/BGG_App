define(['Backbone',
        'Marionette',
        'hbs!templates/game-simple',
        'js/models/game',
        'js/views/gameDetail',
        'js/AuthToken'],
  function(Backbone, Marionette, template, GameModel, DetailedGameView, auth){

  var GameView = Backbone.Marionette.ItemView.extend({
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

    return GameView;
});
