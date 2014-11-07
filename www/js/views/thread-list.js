define(['Backbone',
        'Marionette',
        'hbs!templates/thread-list',
        'hbs!templates/thread',
        'hbs!templates/thread-detail',
        'js/models/threadDetail',
        'js/views/thread-detail',
        'js/AuthToken'],
function(Backbone,
         Marionette,
         threadListTemplate,
         threadTemplate,
         threadDetailTemplate,
         ThreadDetailModel,
         ThreadDetailListView,
         auth){

          var ThreadView = Backbone.Marionette.ItemView.extend({
            tagName: 'li',
            className: 'item-content-thread',
            ui: {
              threadItem: '.item-content'
            },
            events : {
              'click @ui.threadItem' : 'showThreadDetails'
            },
            render: function(){
                var self = this;
                $(this.el).html(threadTemplate(this.model.toJSON()));
                $(this.el).attr('data-id', this.model.get('id'));
                return this;
            },
            showThreadDetails: function(){
              this.$el.trigger('showThreadDetails', [this.model]);
            }
          });

          var EmptyThreadListView = Backbone.Marionette.ItemView.extend({
            template: _.template('<div style="text-align: center;">No threads found</div>')
          });

          var ThreadListView = Backbone.Marionette.CompositeView.extend({
            itemView: ThreadView,
            itemViewContainer: '.thread-list-container',
            emptyView: EmptyThreadListView,
            template: threadListTemplate,
            events: {
              'showThreadDetails': 'showThreadDetails'
            },
            className: 'list-block media-list',
            showThreadDetails: function(event, thread){
              var self = this;
              window.localStorage.backToThread = 'true';

              $('#forum-back-link').on('click', function(evt){
                if(window.localStorage.backToThread === 'true'){
                  evt.preventDefault();
                  self.render();
                  $('.thread-list').show();
                  $('.thread-item-detail').hide();
                  window.localStorage.backToThread = 'false';
                  return false;
                }
              });

              showNewIndicator();
              self.threadDetail = new ThreadDetailModel();
              self.threadDetail.threadId = thread.get('id');
              self.threadDetail.fetch({
                beforeSend: function(xhr){
                  xhr.setRequestHeader('auth-token', auth.token);
                },
                success: function(){
                  //create html for details view
                  self.threadDetailListView = new ThreadDetailListView({ model: self.threadDetail });
                  self.threadDetailListView.render();
                  $('.thread-list').hide();
                  $('.thread-item-detail').html(self.threadDetailListView.el);
                  $('.thread-item-detail').show();
                  hideNewIndicator();
                  // $('.accordion-item').first().addClass('accordion-item-expanded');
                }
              });

            }
          });

          return ThreadListView;
});
