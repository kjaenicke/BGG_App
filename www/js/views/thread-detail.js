define(['Backbone', 'Marionette', 'hbs!templates/thread-detail'],
  function(Backbone, Marionette, template){

    var ThreadDetailView = Backbone.Marionette.ItemView.extend({
      className: 'list-block accordion-list',
      render: function(){
          var self = this;
          this.$el.html(template(this.model.toJSON()));
          return this;
      }
    });

    return ThreadDetailView;
});
