define(['Backbone',
        'Marionette',
        'js/views/game',
        'js/views/forum-list',
        'hbs!templates/game-details',
        'js/models/photoCollection',
        'js/models/forumCollection'],
function(Backbone,
        Marionette,
        GameView,
        ForumList,
        template,
        PhotoCollection,
        ForumCollection){

    var GameDetailView = Backbone.Marionette.ItemView.extend({
      initialize: function(options){
        this.model = this.options.model;
        _.bindAll(this, 'fetchImages', 'toggleBookmark', 'shareGame');
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
        this.fetchForums();

        $('.bookmark').on('click', function(){
          self.toggleBookmark();
        });

        $('.share-game').on('click', function(){
          self.shareGame();
        });

        $('div.game-page').on('click', '.tab-link', function(){
          $('.page-content').scrollTop(0);
        });

        return this;
      },
      fetchImages: function(){
        var self = this;

        self.photoCollection = new PhotoCollection({ id: self.model.get('id') });
        self.photoCollection.fetch({ success: function(){

          if(self.photoCollection.models.length > 0){
            var photoBrowserPhotos = [];

            for(var i = 0; i < self.photoCollection.models.length; i++){
              photoBrowserPhotos.push(self.photoCollection.models[i].get('url').replace('_t.jpg', '_md.jpg'));
            }

            self.photoBrowserStandalone = null;
            self.photoBrowserStandalone = theApp.photoBrowser({
                photos: photoBrowserPhotos
            });

            $('.photoGallery').on('click', function(){
              self.photoBrowserStandalone.open();
            });

            $('.photoGallery').removeClass('muted');
          }
          else {
            $('.photoGallery span').html('No Images Found');
            $('.photoGallery').removeClass('muted');
          }
        }});
      },
      fetchForums: function(){
        var self = this;
        setTimeout(function(){
          var forumCollection = new ForumCollection();
          forumCollection.gameId = self.model.get('id');
          forumCollection.fetch({
            success: function(){
              var forumListView = new ForumList({ collection: forumCollection});
              forumListView.render();
              $('.forum-list').html(forumListView.el);
            }
          });
        }, 500);
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
      },
      shareGame: function(){
        console.log('Share Game');

        var self = this;
        theApp.actions(
        [
          [
            {text:'Open in BGG.com', onClick:function(){
              var gameType = 'boardgame';
              if (!self.model.get('boardgamerank')){
                gameType = 'videogame';
              }
              window.open('http://boardgamegeek.com/'+gameType+'/'+self.model.get('id'), '_system');
            }},
          ],
          [{
              text: 'Cancel',
              bold: true
          }]
        ]);

        console.log('End Share Game');
      }
    });

    return GameDetailView;
});
