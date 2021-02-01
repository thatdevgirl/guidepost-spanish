/**
 * Words
 *
 * Controller for the vocabulary word switching functionality.
 */

const Words = ( () => {

  // Author:  Jacek Becela
  // Source:  http://gist.github.com/399624
  // License: MIT
  // From: https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event
  jQuery.fn.single_double_click = function(single_click_callback, double_click_callback, timeout) {
    return this.each(function(){
      var clicks = 0, self = this;
      jQuery(this).click(function(event){
        clicks++;
        if (clicks == 1) {
          setTimeout(function(){
            if(clicks == 1) {
              single_click_callback.call(self, event);
            } else {
              double_click_callback.call(self, event);
            }
            clicks = 0;
          }, timeout || 300);
        }
      });
    });
  }


  // Make a call to get our list of vocabulary words from the local JSON file.
  $.getJSON( '/data/words.json', ( data ) => {

    /**
     * getNextWord()
     *
     * Randomly get the next vocabulary word.
     */
    const getNextWord = ( currentWord=0 ) => {
      // Generate a random number between 1 and the total number of words.
      let rand = Math.random() * data.length;

      // We need to make sure that the next word is not the same as the current
      // word, because that is lame. So, if the current word is the random
      // number rounded down, then round the random number up. Otherwise, round
      // the random number down.
      const word = ( Math.floor(rand) == currentWord ) ? Math.ceil(rand) : Math.floor(rand);

      toggle( word, false );
      return word;
    }


    /**
     * toggle()
     *
     * Toggle (show/hide) the passed-in word in the appropriate language.
     */
    const toggle = ( word, swap=true ) => {
      // Default the language to Spanish.
      let lang = 'es';

      // Do we want to swap the language?
      if ( swap ) {
        // Get the current language of the main vocabulary area.
        lang = $( '#vocabulary-word' ).attr( 'lang' );

        // Swap the language, because this function is called when we are swapping
        // between EN and ES. If no language is set, we will auto-set it to ES.
        if ( !lang || lang == 'en' ) {
          lang = 'es';
        } else {
          lang = 'en';
        }
      }

      // Show the word in the correct language.
      $( '#vocabulary-word' ).html( data[word][lang] ).attr( 'lang', lang );
    }


    /**
     * Keypress events.
     *
     * When the user presses the space bar, the language toggles between
     * Spanish and English.
     *
     * When the user presses the return key, a new word is randomly chosen.
     */
    $( document ).keypress( (e) => {
      // Space bar: Toggle the word language.
      if ( e.which == 32 ) {
        toggle( currentWord );
      }

      // Return: Switch to a new word.
      if ( e.which == 13 ) {
        currentWord = getNextWord();
      }
    } );


    /**
     * Click events.
     */
    $( document ).single_double_click( () => {
      // Single click: Language toggles between Spanish and English.
      toggle( currentWord );
    }, () => {
      // Double click: A new word is randomly chosen.
      currentWord = getNextWord();
    } );


    // Run this puppy!
    let currentWord = getNextWord();

  } );

})();

export default Words;
