define(['Backbone', 'Marionette', 'js/views/game', 'hbs!templates/game-details', 'js/models/photoCollection'],
  function(Backbone, Marionette, GameView, template, PhotoCollection){

    var GameDetailView = Backbone.Marionette.ItemView.extend({
      ui: {
        bookmark: '.bookmark'
      },
      events: {
        'click @ui.bookmark'      : 'toggleBookmark'
      },
      initialize: function(options){
        this.model = this.options.model;
        _.bindAll(this, 'fetchImages');
      },
      render: function(){
        var self = this;
        window.modelOutput = this.model;
        this.el = template(this.model.toJSON());
        this.fetchImages();
        return this;
      },
      fetchImages: function(){
        var self = this;

        self.photoCollection = new PhotoCollection({ id: self.model.get('id') });
        self.photoCollection.fetch({ success: function(){
          var photoBrowserPhotos = [];

          for(var i = 0; i < self.photoCollection.models.length; i++){
            photoBrowserPhotos.push(self.photoCollection.models[i].get('url').replace('_t.jpg', '.jpg'));
          }

          self.photoBrowserStandalone = theApp.photoBrowser({
              photos: photoBrowserPhotos
          });

          $(document).on('click', '.photoGallery', function(){
            self.photoBrowserStandalone.open();
          });

          setTimeout(function(){
              $('.photoGallery').show();
          }, 100);

        }});
      },
      toggleBookmark: function(){
        var bookmarks;

        if($('.bookmark').hasClass('fa-bookmark-o')){
          $('.bookmark').removeClass('fa-bookmark-o');
          $('.bookmark').addClass('fa-bookmark');

          bookmarks = window.localStorage.bookmarks ? JSON.parse(window.localStorage.bookmarks) : [];
          bookmarks.push({ id: this.model.get('id'), title: this.model.get('title') });

          window.localStorage.bookmarks = JSON.stringify(bookmarks);
          return;
        }
        else{
          $('.bookmark').removeClass('fa-bookmark');
          $('.bookmark').addClass('fa-bookmark-o');

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
