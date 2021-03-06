define(['Backbone', 'Marionette', 'js/models/appCollection', 'hbs!templates/app', 'js/AuthToken'],
  function(Backbone, Marionette, AppModel, template, auth){

    var AppItem = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      render: function(){
        var self = this;
        this.$el.html(template(this.model.toJSON()));
        $(this.el).on('click', function(){
          self.showApp();
        });
        return this;
      },
      showApp: function(){
        var self = this;
        theApp.confirm('Are you sure you want to open this link?', function(){
          window.open(self.model.get('itunes'), '_system');
        }, null);
      }
    });

    var AppView = Backbone.Marionette.CollectionView.extend({
        itemView: AppItem,
        tagName: 'ul'
    });

    return AppView;
});
