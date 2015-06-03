// `removeTrailingSlash` Mainly used with category names
// `/` will break the angular routes in the URL Fixing
// Ex: Food/Beverage/Tobacco => Food-Beverage-Tobacco

.filter('removeTrailingSlash', function() {
  return function(text) {
    return text.replace(/\//g, '-');
  };
})