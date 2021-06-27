/**
 * Words
 *
 * Controller for the vocabulary word switching functionality.
 */

const Words = ( () => {

  // Make a call to get our list of vocabulary words from the local JSON file.
  $.getJSON( '/data/words.json', ( allWords ) => {

    /**
     * Generate a list of only the most recent words.
     */
    var recentWords = allWords.filter( word => word.most_recent == 1 );


    /**
     * Initialize the list of words to all the words.
     */
    var data = allWords;


    /**
     * Set the default starting language. This is changeable.
     */
    var defaultLang = 'es';


    /**
     * getNextWord()
     *
     * Randomly get the next vocabulary word.
     */
    const getNextWord = ( currentWord, data ) => {
      // Generate a random number between 1 and the total number of words.
      let rand = Math.random() * data.length;

      // We need to make sure that the next word is not the same as the current
      // word, because that is lame. So, if the current word is the random
      // number rounded down, then round the random number up. Otherwise, round
      // the random number down.
      const word = ( Math.floor(rand) == currentWord ) ? Math.ceil(rand) : Math.floor(rand);

      toggle( word, false, data );
      return word;
    }


    /**
     * toggle()
     *
     * Toggle (show/hide) the passed-in word in the appropriate language.
     */
    const toggle = ( word, swap=true, data ) => {
      // Default the language to Spanish.
      let lang = defaultLang;

      // Do we want to swap the language?
      if ( swap ) {
        // Get the current language of the main vocabulary area.
        lang = $( '#vocabulary-word' ).attr( 'lang' );

        // Swap the language, because this function is also  called when we
        // are swapping between languages.
        lang = ( !lang || lang == 'en' ) ? 'es' : 'en';
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
      if ( e.which == 32 ) { toggle( currentWord, true, data ); }              // Space bar.
      if ( e.which == 13 ) { currentWord = getNextWord( currentWord, data ); } // Return key.
    } );


    /**
     * Single click event: Language toggles between Spanish and English.
     */
    $( 'main' ).click( () => { toggle( currentWord, true, data ); } );


    /**
     * Button click events: Toggle the set of words to be used.
     */
    $( 'button#all-words' ).click( () => {
      // Change the display of the word set buttons.
      $( '#all-words' ).addClass('selected');
      $( '#recent-words' ).removeClass('selected');

      // Update the set of words to use to all words and then swap the words
      // to make the functionality here consistent with the switch to recent
      // words only. The word swap is not required here because recent words
      // will always be part of all words, but having the same behavior is nice.
      data = allWords;
      currentWord = getNextWord( currentWord, data );
    } );

    $( 'button#recent-words' ).click( () => {
      // Change the display of the word set buttons.
      $( '#all-words' ).removeClass('selected');
      $( '#recent-words' ).addClass('selected');

      // Update the set of words to use to only recent words and then swap
      // words to make sure the current word is in this set of recent words.
      // An error occurs if this swap happens and the current word is not in the
      // set of recent words.
      data = recentWords;
      currentWord = getNextWord( currentWord, data );
    } );


    /**
     * Button click events: Toggle the defaults tart language.
     */
    $( 'button#default-es' ).click( () => {
      $( '#default-es' ).addClass('selected');
      $( '#default-en' ).removeClass('selected');
      defaultLang = 'es';
      toggle( currentWord, false, data );
    } );

    $( 'button#default-en' ).click( () => {
      $( '#default-es' ).removeClass('selected');
      $( '#default-en' ).addClass('selected');
      defaultLang = 'en';
      toggle( currentWord, false, data );
    } );


    /**
     * Swipe event : A new word is randomly chosen.
     */
    $( window ).on( 'swipe', () => { currentWord = getNextWord( currentWord, data ); } );


    // Run this puppy!
    let currentWord = getNextWord( 0, data );

  } );

})();

export default Words;
