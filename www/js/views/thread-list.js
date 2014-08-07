define(['Backbone', 'Marionette', 'hbs!templates/thread'],
  function(Backbone, Marionette, template){

    var ThreadView = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      render: function(){
        var self = this;
        $(this.el).html(template(this.model.toJSON()));
        return this;
      }
    });

    var ThreadListView = Backbone.Marionette.CollectionView.extend({
      itemView: ThreadView,
      tagName: 'ul'
    });

    return ThreadListView;
});
