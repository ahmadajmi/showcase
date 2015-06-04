The App is entirely build with AngularJS as a Single Page App and fetching the data through a REST API. You will notice that we are using a basic Node.js with Express configuration, this is just for deploying the App easily to the server such as Heroku.

[Demo App on Heroku]

#### Installation

Make sure you have [Node.js] and [bower] installed then the following commands to

Install Node.js packages

```
npm install
```

Install Bower packages

```
bower install
```

##### Build

This will build all the files to the `/public` directory

```
gulp build
```

##### Development mode

This will start the development mode and initialize a [localhost:3000] server to preview and watch file changes as you code, but make sure you run `gulp build` first.

```
gulp serve
```

#### GS1 REST API
Using Angular.js we communicate with GS1 REST API, you can visit [GS1 API] for documentation.

#### Translation

Label translations are done using [angular-translate] module, a simple key value object is defined in `app/js/app.js` to define translation labels. Whenever you need to add a new label, just add a simple object key, value pairs for example

``` javascript
'search_page_title': 'Search results for: '
```

With the corresponding Arabic label

``` javascript
'search_page_title': 'نتائج البحث عن: '
```

And you can use it in your partial as

``` html
{{ 'search_page_title' | translate }}
```

##### Switching between Language

You may ask, How the transition is done between a language to a another when I press the language button, That's a good question :)

The solution is simple.

First a `$rootScope` variable is defined to hold the main language

`app/js/app.js`

``` javascript
$rootScope.lang = 'en';
```

Then in `LanguageController` we do some stuff including changing the root language as

``` javascript
$rootScope.lang = langKey;
```

And a `$broadcast` to the `$rootScope` as

``` javascript
$rootScope.$broadcast('languageChange', {
  langKey: langKey
});
```

We listen to this this broadcast in different places including

* Change the `$rootScope.headers` value that will be sent as a request header.

``` javascript

// app/js/app.js

$rootScope.$on('languageChange', function(event, data) {
  $rootScope.headers['Accept-Language'] = data.langKey;
});
```

* Listen to this broadcast at any controller, for example the `ProductsController` at

``` javascript

// app/js/products/ProductsController.js

$rootScope.$on('languageChange', function() {
  getProducts();
});
```

This will execute the `getProducts()` function and then update the view

The `LanguageController` also changes two different `$rootScope` variables

``` javascript

// app/js/app.js

$rootScope.default_float = 'left';
$rootScope.opposite_float = 'right';
```

These two values are used in HTML partials as helper classes used to define the directions

``` haml
%div{class: "text-{{default_float}} {{default_float}}"}
```

This will be generated as

``` html

<!-- EN -->
<div class="text-left left"><div>

<!-- AR -->
<div class="text-right right"><div>

```

#### Angular Stuff

`removeTrailingSlash` filter is used with category name, because some times we get a category name like `Food/Beverage/Tobacco` and you can see the `/` in the name, this will make a conflict with Angular routes. So `removeTrailingSlash` is used to remove the `/` and add it in the controller to send it as a parameter.


#### Icons

Icons generated from [fontello] and could be used as:

``` haml
%i{class: "demo-icon icon-search"}
%i{class: "demo-icon icon-globe"}
%i{class: "demo-icon icon-location"}
%i{class: "demo-icon icon-mobile"}
%i{class: "demo-icon icon-mail"}
```

#### Technology Used

* [HAML]
* [SASS]
* [Gulp]
* [Bower]
* [Angular.js]

[Demo App on Heroku]: http://gs1-showcase.herokuapp.com/#/
[Node.js]: https://nodejs.org/
[bower]: http://bower.io/
[localhost:3000]: http://localhost:3000
[GS1 API]: http://docs.gs1egyptproducts.apiary.io/
[angular-translate]: https://angular-translate.github.io/
[HAML]: http://haml.info/
[SASS]: http://sass-lang.com/
[Gulp]: http://gulpjs.com/
[Bower]: http://bower.io/
[Angular.js]: https://angularjs.org/
[fontello]: http://fontello.com/