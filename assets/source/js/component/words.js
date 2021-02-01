/**
 * Words
 *
 * Controller for the vocabulary word switching functionality.
 */

const Words = ( () => {

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

      toggle( word );
      return word;
    }


    /**
     * toggle()
     *
     * Toggle (show/hide) the passed-in word in the appropriate language.
     */
    const toggle = ( word ) => {
      // Get the current language of the main vocabulary area.
      let lang = $( '#vocabulary-word' ).attr( 'lang' );

      // Swap the language, because this function is called when we are swapping
      // between EN and ES. If no language is set, we will auto-set it to ES.
      if ( !lang || lang == 'en' ) {
        lang = 'es';
      } else {
        lang = 'en';
      }

      // Show the word.
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
     * Click event.
     *
     * When the user clicks, the language toggles between Spanish and English.
     */
    $( document ).click( (e) => {
      toggle( currentWord );
    } );


    // Run this puppy!
    let currentWord = getNextWord();

  } );

})();

export default Words;
