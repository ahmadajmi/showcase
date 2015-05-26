.filter('removeTrailingSlash', function() {
  return function(text) {
    return text.replace(/\//g, '-');
  };
})