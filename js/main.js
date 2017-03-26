var BASE_YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';
var VIDEO_BASE_URL = 'https://www.youtube.com/watch?v=';
var CHANNEL_BASE_URL = 'https://www.youtube.com/channel/';

function getDataFromApi(searchTerm, callback) {
  var query = {
    part: 'snippet',
    q: searchTerm,
    maxResults: 10,
    key: 'AIzaSyAWOSqYnDt9z-ELIlIDXHkpQk3rxnNkapI'
  }
  $.getJSON(BASE_YOUTUBE_URL, query, callback);
}

function displayOMDBSearchData(data) {
  var videoLink;
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
      if (item.id.hasOwnProperty('videoId')) {
        resultElement += '<a href="' + VIDEO_BASE_URL + item.id.videoId + '" target="_blank"><img class="js-result-thumbnail" src="' + item.snippet.thumbnails.default.url + '" alt="video-thumbnail" width=100px" height="100px"></a>' + 
        '<p class="js-result-item js-title">' + item.snippet.channelTitle + '</p>' + 
        '<p class="js-result-item">' + item.snippet.description + '</p>' + 
        '<div class="clearfix"></div>';
      } else {
        resultElement += '<a href="' + CHANNEL_BASE_URL + item.id.channelId + '" target="_blank"><img class="js-result-thumbnail" src="' + item.snippet.thumbnails.default.url + '" alt="video-thumbnail" width=100px" height="100px"></a>' + 
      '<p class="js-result-item js-title">' + item.snippet.channelTitle + '</p>' + 
      '<p class="js-result-item">' + item.snippet.description + '</p>' + 
      '<div class="clearfix"></div>';
      }
      
    });
  }
  else {
    resultElement += '<p class="js-result-item">No results</p>';
  }

  $('.js-search-results').html(resultElement);

  //console.log(data);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayOMDBSearchData);
  });
}

$(function() {
  watchSubmit();
});