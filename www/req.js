require.config({
  baseUrl: './',
  paths: {
    Backbone    : 'bower_dist/backbone/backbone',
    Marionette  : 'bower_dist/marionette/backbone.marionette',
    jquery      : 'bower_dist/jquery/jquery.min',
    underscore  : 'bower_dist/underscore/underscore',
    handlebars  : 'bower_dist/handlebars',
    hbs         : 'bower_dist/require-handlebars-plugin/hbs',
    Framework7  : 'bower_dist/f7/framework7'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    Framework7: {
      exports: 'Framework7'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    Marionette: {
      deps: ['Backbone'],
      exports: 'Marionette'
    }
  }
});

require(['js/app', 'jquery', 'Framework7'], function(app, $, $$){

  if (!/(iPad|iPhone|iPod)/g.test( navigator.userAgent )){
      $('.modal.modal-no-buttons.modal-in').remove();
      $('.modal-overlay.modal-overlay-visible').remove();
  }
  setTimeout(function () {
    $('.modal.modal-no-buttons.modal-in').remove();
    $('.modal-overlay.modal-overlay-visible').remove();
  }, 1000);

  var theApp = new Framework7({
    modalTitle: "iBGG",
    onPageBeforeAnimation: function (app, page) {
      if (page.name !== 'game') {
        $('.toolbar').hide();
      }
      else {
        $('.toolbar').show();
      }
    }
  });

  //make that gayness global
  window.theApp = theApp;
  window.$$ = Framework7.$;
  // We need to use custom DOM library, let's save it to $$ variable:
  var $$ = Framework7.$;

  app.Start();

  document.onkeyup=function(e) {
    if(e.which == 13){
      $('#search_text').blur();
      return false;
    }
  };
});
