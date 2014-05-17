define(['Backbone', 'Marionette', 'js/views/main-layout'],
  function(Backbone, Marionette, MainLayout){

  var app = {
    Start: function(){
      var layout = new MainLayout();
      layout.render();

      $('body').append(layout.el);
    }
  };

  return app;
});
