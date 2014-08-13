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

      document.addEventListener('deviceready', this.onDeviceReady, false);

      // Add view
      var mainView = theApp.addView('.view-main', {
        // Because we want to use dynamic navbar, we need to enable it for this view:
        dynamicNavbar: true
      });

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

      $('#developerFeedback').on('click', function(e){
        window.open('mailto:info@example.com?subject=subject&cc=cc@example.com', '_system');
      });

      showNewIndicator = function () {
          $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal" style="padding: 15px;"><i class="fa fa-refresh fa-spin fa-inverse fa-3x"></i></div>');
      };

      hideNewIndicator = function () {
          $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
      };
    },
    onDeviceReady: function() {
      console.info('BGG Device Ready');
      // app.receivedEvent('deviceready');
    }
  };

  return app;
});
