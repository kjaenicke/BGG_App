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
        search: '.search'
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
      },
      doSearch: function(){
        theApp.showIndicator();

        var self = this;
        var s = $('#search_text').val();
        if(s.length > 0){
          var gameCollection = new GameCollection([], { searchTerms: s });
          gameCollection.fetch({
            success: function(){
              gameCollectionView = new GameCollectionView({ collection: gameCollection });
              gameCollectionView.render();
              $('.search-results').html(gameCollectionView.el);

              theApp.hideIndicator();
            }
          });
        }
      }
    });

    return SearchLayout;
});
