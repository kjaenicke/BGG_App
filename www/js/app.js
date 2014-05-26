define(['Backbone',
        'Marionette',
        'js/views/main-layout',
        'js/views/search-layout',
        'js/views/recentSearches',
        'js/models/recentSearches',
        'js/models/bookmarksCollection',
        'js/views/bookmarks'],
  function(Backbone, Marionette, MainLayout, SearchLayout, RecentSearchView, RecentSearchesModel, BookmarksCollection, BookmarksView){

  var app = {
    Start: function(){
      // Initialize app and store it to theApp variable for futher access to its methods
      //the app was FAT
      var theApp = new Framework7({});

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
      });

    $$(document).on('pageAfterAnimation', '.page[data-page="recent-searches"]', function (e) {
        var recentList = $('.search-box');

        var recentSearchesModel = new RecentSearchesModel();
        recentSearchesModel.fetch({
          success: function(data){
            var recentSearchView = new RecentSearchView({ collection:  new Backbone.Collection(data) });
            recentSearchView.render();
            $('.search-box').html(recentSearchView.el);
          }
        });
      });

      $$(document).on('pageAfterAnimation', '.page[data-page="bookmarks"]', function (e) {
        var recentList = $('.search-box');

        var bookmarksCollection = new BookmarksCollection();
        bookmarksCollection.fetch({
          success: function(data){
            var bookmarksView = new BookmarksView({ collection:  new Backbone.Collection(data) });
            bookmarksView.render();
            $('.search-box').html(bookmarksView.el);
          }
        });
      });

      //create main layout
      var layout = new MainLayout();
      layout.render();
      //$('.page-content').append(layout.el);

      //create search layout
      var searchLayout = new SearchLayout();
      searchLayout.render();
      $('.page-content .search_container').append(layout.el);


      showNewIndicator = function () {
          $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal" style="padding: 15px;"><i class="fa fa-refresh fa-spin fa-inverse fa-3x"></i></div>');
      };

      hideNewIndicator = function () {
          $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
      };
    }
  };

  return app;
});
