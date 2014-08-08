requirejs.config({
  waitSecond: 60,
  paths: {
    //VENDOR
    Backbone    : 'bower_dist/backbone/backbone',
    Marionette  : 'bower_dist/marionette/backbone.marionette',
    jquery      : 'bower_dist/jquery/jquery.min',
    underscore  : 'bower_dist/underscore/underscore',
    handlebars  : 'bower_dist/handlebars',
    hbs         : 'bower_dist/require-handlebars-plugin/hbs',
    Framework7  : 'bower_dist/f7/framework7.min',
    //MODELS
    'bookmarksCollection': 'js/models/bookmarksCollection',
    'forumCollection': 'js/models/forumCollection',
    'gameModel': 'js/models/game',
    'gameCollection' : 'js/models/gameCollection',
    'mostActiveCollection': 'js/models/photoCollection',
    'recentSearchesModel': 'js/models/recentSearches',
    'threadCollection': 'js/models/threadCollection',
    'photoCollection': 'js/models/photoCollection',
    //VIEWS
    'bookmarks': 'js/views/bookmarks',
    'forum-list': 'js/views/forum-list',
    'gameView': 'js/views/game',
    'gameCollectionView': 'js/views/gameCollectionView',
    'gameDetail': 'js/views/gameDetail',
    'main-layout': 'js/views/main-layout',
    'recentSearchesView': 'js/views/recentSearches',
    'search-layout': 'js/views/search-layout',
    'thread-list': 'js/views/thread-list'
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
    Backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    Marionette: {
      deps: ['Backbone'],
      exports: 'Marionette'
    }
  }
});
