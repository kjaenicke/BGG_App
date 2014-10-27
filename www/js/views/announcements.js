define(['Backbone', 'Marionette', 'js/models/announcementsCollection', 'hbs!templates/announcement'],
  function(Backbone, Marionette, AnnouncementsCollections, template){

    var AnnouncementItem = Backbone.Marionette.ItemView.extend({
      tagName: 'li',
      render: function(){
        var self = this;

        $(this.el).html(template(this.model.toJSON()));

        return this;
      }
    });

    var AnnouncementsView = Backbone.Marionette.CollectionView.extend({
        itemView: AnnouncementItem,
        tagName: 'ul',
        onRender: function(){
        }
    });

    return AnnouncementsView;
});
