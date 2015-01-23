define(['Backbone', 'Marionette', 'hbs!templates/thread-detail'],
  function(Backbone, Marionette, template){

    var ThreadDetailView = Backbone.Marionette.ItemView.extend({
      className: 'list-block accordion-list',
      render: function(){
          var self = this;
          this.$el.html(template(this.model.toJSON()));

          this.$el.find('a[href!="#"]').on('click', function(e){
            e.preventDefault();
            var href = $(this).attr("href");
            theApp.confirm('Are you sure you want to open this link?', function(){
              window.open(href, '_system');
            }, null);
          });

          return this;
      }
    });

    return ThreadDetailView;
});
