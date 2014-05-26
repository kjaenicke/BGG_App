define(['Backbone', 'Marionette', 'js/views/game', 'hbs!templates/game-details'],
  function(Backbone, Marionette, GameView, template){

    var GameDetailView = Backbone.Marionette.ItemView.extend({
      ui: {
        bookmark:  '.bookmark'
      },
      events: {
        'click @ui.bookmark'  : 'toggleBookmark'
      },
      initialize: function(options){
        this.model = this.options.model;
      },
      render: function(){
        var self = this;
        this.el = template(this.model.toJSON());
        return this;
      },
      toggleBookmark: function(){
        var bookmarks;

        if($('.bookmark').hasClass('fa-star-o')){
          $('.bookmark').removeClass('fa-star-o');
          $('.bookmark').addClass('fa-star');

          bookmarks = window.localStorage.bookmarks ? JSON.parse(window.localStorage.bookmarks) : [];
          bookmarks.push({ id: this.model.get('id'), title: this.model.get('title') });

          window.localStorage.bookmarks = JSON.stringify(bookmarks);
          return;
        }
        else{
          $('.bookmark').removeClass('fa-star');
          $('.bookmark').addClass('fa-star-o');

          bookmarks = window.localStorage.bookmarks ? JSON.parse(window.localStorage.bookmarks) : [];
          var index = bookmarks.indexOf(this.model);

          if(index != -1){
            bookmarks.splice(index, 1);
          }
          window.localStorage.bookmarks = JSON.stringify(bookmarks);
          return;
        }
      }
    });

    return GameDetailView;
});
