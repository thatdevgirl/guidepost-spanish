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

      // Show the word in the correct language.g
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
      if ( e.which == 32 ) { toggle( currentWord ); }       // Space bar.
      if ( e.which == 13 ) { currentWord = getNextWord(); } // Return key.
    } );


    /**
     * Single click event: Language toggles between Spanish and English.
     */
    $( document ).click( () => { toggle( currentWord ); } );


    /**
     * Swipe event : A new word is randomly chosen.
     */
    var hammertime = new Hammer( document );
    hammertime.get( 'pan' ).set({ direction: Hammer.DIRECTION_ALL, threshold: 100 });
    hammertime.on( 'panleft panright panup pandown', () => { currentWord = getNextWord(); } );


    // Run this puppy!
    let currentWord = getNextWord();

  } );

})();

export default Words;
