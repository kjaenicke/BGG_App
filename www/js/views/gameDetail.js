define(['Backbone', 'Marionette', 'js/views/game', 'hbs!templates/game-details', 'js/models/photoCollection'],
  function(Backbone, Marionette, GameView, template, PhotoCollection){

    var GameDetailView = Backbone.Marionette.ItemView.extend({
      initialize: function(options){
        this.model = this.options.model;
        _.bindAll(this, 'fetchImages', 'toggleBookmark');
        this.model.setBookMarkStatus();

        if(this.model.get('isBookmarked')){
          $('.bookmark').removeClass('fa-bookmark-o');
          $('.bookmark').addClass('fa-bookmark');
        }
      },
      render: function(){
        var self = this;
        window.modelOutput = this.model;
        this.el = template(this.model.toJSON());
        this.fetchImages();

        $('.bookmark').on('click', function(){
          self.toggleBookmark();
        });

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

          self.photoBrowserStandalone = null;
          self.photoBrowserStandalone = theApp.photoBrowser({
              photos: photoBrowserPhotos
          });

          $('.photoGallery').on('click', function(){
            self.photoBrowserStandalone.open();
          });

          $('.photoGallery').removeClass('muted');
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

          var alreadyBookmarked = _.findWhere(bookmarks, { id: this.model.get('id') });

          if(alreadyBookmarked !== undefined){
            bookmarks = _.without(bookmarks, alreadyBookmarked);
          }

          window.localStorage.bookmarks = JSON.stringify(bookmarks);
          return;
        }
      }
    });

    return GameDetailView;
});
