define(['Backbone', 'Marionette', 'hbs!templates/forum', 'threadCollection', 'thread-list'],
  function(Backbone, Marionette, forumTemplate, ThreadCollection, ThreadListView){

    var ForumView = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      ui: {
        forumTitle: 'li'
      },
      events : {
        'click @ui.forumTitle' : 'showForum'
      },
      render: function(){
        var self = this;
        $(this.el).html(forumTemplate(this.model.toJSON()));
        $(this.el).on('click', function(){
          self.showForum();
        });
        return this;
      },
      showForum: function(){
        var self = this;
        //page load has to be here or it won't render correctly
        theApp.views[0].loadPage("forum.html");

        // see if we've already fetch the deets on this Bee before we refetch it and waste time
        showNewIndicator();
        self.threadCollection = new ThreadCollection();
        self.threadCollection.forumId = self.model.get('id');
        self.threadCollection.fetch({
          success: function(){
            //create html for details view
            self.threadListView = new ThreadListView({ collection: self.threadCollection });
            self.threadListView.render();
            $('.thread-list').html(self.threadListView.el);
            hideNewIndicator();
          }
        });
      }
    });

    var ForumListView = Backbone.Marionette.CollectionView.extend({
      itemView: ForumView,
      tagName: 'ul'
    });

    return ForumListView;
});
