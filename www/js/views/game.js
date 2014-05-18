define(['Backbone', 'Marionette', 'hbs!templates/game-simple', 'hbs!templates/game-details', 'js/models/game'],
  function(Backbone, Marionette, template, detailsTemplate, GameModel){

  var GameView = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      ui: {
        gameTitle: '.game-title'
      },
      events: {
        'click @ui.gameTitle' : 'showDetails'
      },
      render: function(){
        $(this.el).html(template(this.model.toJSON()));
        return this;
      },
      showDetails: function(){
        var self = this;
        // see if we've already fetch the deets on this Bee before we refetch it and waste time
        if(!self.gameModel){
          self.gameModel = new GameModel({ id: self.model.get('id'), details: true });
            self.gameModel.fetch({ success: function(){
              //create html for details view
              var gameTemplate = detailsTemplate(self.gameModel.toJSON());

              //add to body each time because it gets destroyed when closed :/
              $('body').append(gameTemplate);
              var gamePopup = $('body').find('popup');

              if(gamePopup.length>0) {
                theApp.popup(gamePopup);
              }
            }
          });
        }
        else {
          //create html for details view
          var gameTemplate = detailsTemplate(self.gameModel.toJSON());

            //add to body each time because it gets destroyed when closed :/
            $('body').append(gameTemplate);
            var gamePopup = $('body').find('popup');

            if(gamePopup.length>0) {
              theApp.popup(gamePopup);
            }
          }
        }
    });

    return GameView;
});
