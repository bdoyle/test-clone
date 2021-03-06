/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var http = require('http');
var url  = require('url');
var _ = require('lodash');

// Return list of books
exports.index = function(req, res) {

  var params = url.parse(req.url, true).query;

  var base_url = 'http://api.nytimes.com/svc/books/v2/lists/' 
  var auth = '?api-key=2929e63191572000a0ca99908abab2d3:1:71850106'
  
  var api_url = base_url + '/' + params.date + '/' + params.category + auth;

  // Hit NYT API
  http.get(api_url,  function(response){

    // Collect results
    var body = ''

    // Accumulate data response from
    // third party API
    response.on('data', function (chunk) {
        body += chunk;
     });

    response.on('end', function () {

        console.log('\nGET /api/nyt/');

        // if(err) { return handleError(res, err); }

        return res.json(200, JSON.parse(body));
    });

  });
};

// Return list of categories
exports.categories = function(req, res) {

  var api_url = 'http://api.nytimes.com/svc/books/v2/lists/names?api-key=2929e63191572000a0ca99908abab2d3:1:71850106';

  // Hit NYT API
  http.get(api_url,  function(response){

    // Collect results
    var body = ''

    // Accumulate data response from
    // third party API
    response.on('data', function (chunk) {
        body += chunk;
     });

    response.on('end', function () {
        console.log('\nGET /api/nyt/categories');

        return res.json(200, JSON.parse(body));
    });

  });
};



function handleError(res, err) {
  return res.send(500, err);
}