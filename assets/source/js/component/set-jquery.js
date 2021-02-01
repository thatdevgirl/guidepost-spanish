/**
 * Set jQuery
 *
 * Use this if you want to use jQuery from the NPM package. Note: This repo
 * does not include jQuery in package.json out of the box because, frankly,
 * I so rarely use it for a static site.
 */

import $ from 'jquery';

const SetJquery = ( () => {

  window.jQuery = $;
  window.$ = $;

} )();

export default SetJquery;
