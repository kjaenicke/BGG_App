define(['Backbone', 'Marionette', 'js/views/main-layout', 'js/views/search-layout'],
  function(Backbone, Marionette, MainLayout, SearchLayout){

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
      });

      // Option 2. Using live 'pageInit' event handlers for each page
      $$(document).on('pageAfterAnimation', '.page[data-page="recent-searches"]', function (e) {
        var recentList = $('.recent-searches .list-block ul');
        var itemsHTML = '';
        var recentItems = window.localStorage.recentSearches ? JSON.parse(window.localStorage.recentSearches) : [];
        var uniqueSearches = []
        $.each(recentItems, function(i, el){
            if($.inArray(el, uniqueSearches) === -1) uniqueSearches.push(el);
        });
        if (uniqueSearches.length > 0){
          for(var i = 0; i < uniqueSearches.length; i++){
            itemsHTML += '<li class=""><a href="#" class="item-link item-content">';
            itemsHTML +=  '<div class="item-media"><i class="fa fa-boardgame fa-fw fa-lg"></i></div>';
            itemsHTML +=  '<div class="item-inner">';
            itemsHTML +=  '<div class="item-title">' + uniqueSearches[i] + '</div>';
            itemsHTML +=  '</div></a></li>';
          }

          $(recentList).html(itemsHTML);
        }
        else{
          $(recentList).html('<li class="item-content"><div class="item-media"><i class="fa fa-star fa-spin fa-fw fa-lg"></i></div><div class="item-inner"><div class="item-title">No searches found.</div></div></li>');
        }
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
