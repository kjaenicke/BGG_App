define(['Backbone', 'Marionette', 'hbs!templates/thread', 'js/models/threadDetail', 'js/views/thread-detail'],
  function(Backbone, Marionette, template, ThreadDetailModel, ThreadDetailListView){

    var ThreadView = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      ui: {
        threadItem: '.item-content'
      },
      events : {
        'click @ui.threadItem' : 'showThreadDetails'
      },
      render: function(){
          var self = this;
          $(this.el).html(template(this.model.toJSON()));
          return this;
      },
      showThreadDetails: function(){
        var self = this;
        theApp.views[0].loadPage("thread-detail.html");

        showNewIndicator();
        self.threadDetail = new ThreadDetailModel();
        self.threadDetail.threadId = self.model.get('id');
        self.threadDetail.fetch({
          success: function(){
            //create html for details view
            self.threadDetailListView = new ThreadDetailListView({ model: self.threadDetail });
            self.threadDetailListView.render();
            $('.thread-detail-list').html(self.threadDetailListView.el);
            $('.thread-details-title').html(self.threadDetail.get('subject')[0]);
            hideNewIndicator();
          }
        });
      }
    });

    var ThreadListView = Backbone.Marionette.CollectionView.extend({
      itemView: ThreadView,
      tagName: 'ul'
    });

    return ThreadListView;
});
