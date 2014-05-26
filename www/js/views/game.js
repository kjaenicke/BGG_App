define(['Backbone',
        'Marionette',
        'hbs!templates/game-simple',
        'js/models/game',
        'js/views/gameDetail'],
  function(Backbone, Marionette, template, GameModel, DetailedGameView){

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
        // $(this.el).addClass('liSearchTerm');
        var self = this;
        $(this.el).on('click', function(){
          self.showDetails();
        })
        return this;
      },
      showDetails: function(){
        var self = this;
        //page load has to be here or it won't render correctly
        theApp.views[0].loadPage("game.html");

        // see if we've already fetch the deets on this Bee before we refetch it and waste time
        if(!self.gameModel){
          showNewIndicator();
          self.gameModel = new GameModel({ id: self.model.get('id'), details: true });
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
        }
    });

    return GameView;
});
