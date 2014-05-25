define(['Backbone', 'Marionette', 'hbs!templates/search-layout', 'js/views/gameCollectionView', 'js/models/gameCollection'],
  function(Backbone, Marionette, Template, GameCollectionView, GameCollection){

    var SearchLayout = Backbone.Marionette.Layout.extend({
      template: Template(),
      ui: {
        searchText: '#search_text'
      },
      events: {
         "keyup @ui.searchText" : "keyPressEventHandler"
      },
      regions: {
        search: '#search_text'
      },
      keyPressEventHandler: function(event){
        if(event.keyCode == 13){
          this.doSearch();
        }
      },
      onRender: function(){
        var self = this;
        $(document).on('keyup', '#search_text', function(event){
          if(event.keyCode == 13){
            self.doSearch();
          }
        });

        $(window).on('storage', function(e){
          self.getTitleFromLocalStorage();
        });
      },
      getTitleFromLocalStorage: function(){
        if(window.localStorage.searchTitle){
          //get recent search item from localStorage
          var game = JSON.parse(window.localStorage.searchTitle);
          // remove it
          window.localStorage.removeItem('searchTitle');
          this.doSearch(game.title);
        }
      },
      doSearch: function(title){
        showNewIndicator();

        var self = this;
        var s = (title && title.length > 0) ? title : $('#search_text').val();
        if(s.length > 0){
          //save search terms
          var recentSearches = window.localStorage.recentSearches ? JSON.parse(window.localStorage.recentSearches) : [];
          if($.inArray(s, recentSearches) == -1){
            recentSearches = [s].concat(recentSearches);
            //limit the history to the last 25
            window.localStorage.recentSearches = JSON.stringify(recentSearches.slice(0, 25));
          }

          var gameCollection = new GameCollection([], { searchTerms: s });
          gameCollection.fetch({
            success: function(){
              //this is used when the game is loaded from the recent searches view
              $('#search_text').val(s);

              gameCollectionView = new GameCollectionView({ collection: gameCollection });
              gameCollectionView.render();
              $('.search-results-title').html('Results for &quot;' + s + '&quot;');
              $('.search-results').html(gameCollectionView.el);

              hideNewIndicator();
            }
          });
        }
      }
    });

    return SearchLayout;
});
