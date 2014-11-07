define(['Backbone',
        'Marionette',
        'js/global-override',
        'js/views/main-layout',
        'js/views/search-layout',
        'js/views/recentSearches',
        'js/views/announcements',
        'js/models/recentSearches',
        'js/models/bookmarksCollection',
        'js/models/announcementsCollection',
        'js/models/appCollection',
        'js/views/bookmarks',
        'js/views/apps',
        'js/AuthToken'],
  function(
    Backbone,
    Marionette,
    GlobalOverride,
    MainLayout,
    SearchLayout,
    RecentSearchView,
    AnnouncementsView,
    RecentSearchesModel,
    BookmarksCollection,
    AnnouncementsCollection,
    AppCollection,
    BookmarksView,
    AppView,
    auth){

  var app = {
    Start: function(){

      document.addEventListener('deviceready', this.onDeviceReady, false);

      // Add main view
      var mainView = theApp.addView('.view-main', {
        dynamicNavbar: true,
        domCache: true,
        fastClicksDistanceThreshold: 2
      });

      // F7 HANDLER
      $$(document).on('pageInit', function (e) {
        var page = e.detail.page;
      });

      // PREVENT MAIN PAGE SCROLL WHEN PANEL IS OPEN
      $('.panel').on('touchmove', function (f) {
        f.preventDefault();
      });
      $('.main-page').on('touchmove', function (f) {
        f.preventDefault();
      });

      //GAMES
      $$(document).on('pageBeforeRemove', '.page[data-page="game"]', function(e) {
        $('.toolbar').remove();
        theApp.cache = [];
      });
      $$(document).on('pageBeforeAnimation', '.page[data-page="game"]', function(e) {
        if ($('.toolbar').length){
          $('.toolbar').show();
        }
      });

      //ANNOUNCEMENTS
      $$(document).on('pageAfterAnimation', '.page[data-page="announcements"]', function (e) {
        var announcementsCollection = new AnnouncementsCollection();
        announcementsCollection.fetch({
          beforeSend: function(xhr){
            xhr.setRequestHeader('auth-token', auth.token);
          },
          success: function(data){
            var announcementsView = new AnnouncementsView({
              collection: new Backbone.Collection(_.filter(data.models, function(annc){
                return annc.get('hidden') !== true;
              }))
            });
            announcementsView.render();
            $('#announcements').html(announcementsView.el);
          }
        });
      });

      //RECENT SEARCHES
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

      //BOOKMARKS
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

      //APPS LIST
      $$(document).on('pageAfterAnimation', '.page[data-page="apps"]', function (e) {
        var appCollection = new AppCollection();
        appCollection.fetch({
          success: function(data){
            var appView = new AppView({ collection: new Backbone.Collection(data.models) });
            appView.render();
            $('#gameApps').html(appView.el);
          }
        });
      });

      //CREATE MAIN LAYOUT
      var layout = new MainLayout();
      layout.render();
      $('.page-home').html(layout.el);

      //CREATE SEARCH LAYOUT
      var searchLayout = new SearchLayout();
      searchLayout.render();
      $('.page-content .search_container').append(layout.el);

      showNewIndicator = function () {
          $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><i class="bgg-icon bgg-loading bgg-icon-spin bgg-icon-inverse bgg-icon-3x"></i></div>');
      };

      hideNewIndicator = function () {
          $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
      };
    },
    onDeviceReady: function() {
      console.info('BGG Device Ready');
    }
  };

  return app;
});
