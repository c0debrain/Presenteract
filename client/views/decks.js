Template.decks.helpers({
  decks: function() {
    return Decks.find({  });
  },
  createdNice: function() {
    return moment(this.created).fromNow();
  }
});
