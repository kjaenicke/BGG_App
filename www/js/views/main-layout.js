define(['Backbone', 'Marionette', 'hbs!templates/main-layout', 'gameCollectionView', 'gameCollection'],
  function(Backbone, Marionette, Template, GameCollectionView, GameCollection){

    var MainLayout = Backbone.Marionette.Layout.extend({
      template: Template()
    });

    return MainLayout;
});
