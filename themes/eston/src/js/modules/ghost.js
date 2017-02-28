// Ghost - Based on Post, includes a clean up method specific to Ghost.

// Require.
var Post = require( '../modules/post' );

// Object.
var Ghost = Object.create( Post, {

  create : {
    value : function ( $el ) {

      return Post.create.call( this, $el );

    }
  },

  clean : {
    value : function () {

      // Cache elements.
      var $excerpt = this.$el.find( '[data-js~="excerpt"]' );
      var $tags    = this.$el.find( '[data-js~="tags"]');
      var $embeds  = this.$el.find( 'iframe[src*="player.vimeo"], iframe[src*="youtube"], iframe[src*="kickstarter"][src*="video.html"]' );

      // Remove empty excerpt.
      if ( $excerpt.length ) {
        // Check if there is any text inside the excerpt.
        if ( !$excerpt.text().trim().length ) {
          $excerpt.remove();
        }
      }

      // Remove helper tags.
      if ( $tags.length ) {

        var tags = [];
        $.each( $tags.children(), function () {
          if ( this.children[ 0 ].innerHTML.indexOf( '_' ) ) {
            tags.push( this );
          }
        });
        tags.length ? $tags.html( tags ) : $tags.remove();

      }

      // Wrap embeds in <div data-js="embed"> if they don't have one
      if ( $embeds.length ) {
        $.each( $embeds, function () {

          var $embed = $(this);

          // Make sure element
          if ( $embed.parent().attr('data-js') !== 'embed' && $embed.is(':first-of-type') === false) {
            $(this).wrap('<div data-js="embed"></div>');
          };

        });

      }

    }
  }

});

// Exports.
module.exports = Ghost;
