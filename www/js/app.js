define(['Backbone', 'Marionette', 'js/views/main-layout'],
  function(Backbone, Marionette, MainLayout){

  var app = {
    Start: function(){
      // Initialize app and store it to theApp variable for futher access to its methods
      //the app was FAT
      var theApp = new Framework7();

      //make that gayness global
      window.theApp = theApp;
      window.$$ = Framework7.$;

      // We need to use custom DOM library, let's save it to $$ variable:
      var $$ = Framework7.$;

      // Add view
      var mainView = theApp.addView('.view-main', {
        // Because we want to use dynamic navbar, we need to enable it for this view:
        dynamicNavbar: true
      });

      // Now we need to run the code that will be executed only for About page.
      // For this case we need to add event listener for "pageInit" event

      // Option 1. Using one 'pageInit' event handler for all pages (recommended way):
      $$(document).on('pageInit', function (e) {
        // Get page data from event data
        var page = e.detail.page;

        if (page.name === 'about') {
          // Following code will be executed for page with data-page attribute equal to "about"
          theApp.alert('Here comes About page');
        }
      });

      // Option 2. Using live 'pageInit' event handlers for each page
      $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
        // Following code will be executed for page with data-page attribute equal to "about"
        theApp.alert('Here comes About page');
      });

      var layout = new MainLayout();
      layout.render();

      $('.page-content').append(layout.el);
    }
  };

  return app;
});
