define(['Backbone', 'Marionette', 'hbs!templates/game-simple'],
  function(Backbone, Marionette, template){

  var GameView = Backbone.Marionette.ItemView.extend({
      tagname: 'div',
      render: function(){
        $(this.el).html(template(this.model.toJSON()));
        return this;
      }
    });

    return GameView;
});
