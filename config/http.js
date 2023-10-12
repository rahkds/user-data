/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/
    // passportInit: require('passport').initialize(),
    // passportSession: require('passport').session(),
    //bodyParser : require('body-parser').urlencoded({ extended: true }),

    order: [
      'cookieParser',
      'expresssession',
      // 'passportInit',
      // 'passportSession',   
      'authenticateSession',   
      'bodyParser',
      'compress',
      'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
    ],
    expresssession: (function () {
      var session = require("express-session");
      return session({
        secret: "079b214c5e8c672f376ddc92fc6d8f64",
        resave: true,
        saveUninitialized: false,
      });
    })(),
    authenticateSession: function (req, res, next) {
      return next();
    },


    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    //  bodyParser: (function () {
    //   var opts = {limit:10000000, parameterLimit:100000};  
    //   var fn;
 
    //   // Default to built-in bodyParser:
    //   fn = require('skipper');
    //   return fn(opts);
    // })()

  },

};
