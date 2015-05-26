The App is entirely build with AngularJS as a Single Page App and fetching the data through a REST API. You will notice that we are using a basic Node.js with Express configuration, this is just for deploying the App easily with the server as I needed this to deploy it to Heroku.

#### Installation

Make sure you have Node.js installed then the following commands to

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

This will start the development mode and initialize a localhost server to preview and watch file changes as you code, but make sure you run `gulp build` first.

```
gulp serve
```


#### Angular Stuff

`removeTrailingSlash` filter is used with category name, because some times we get a category name like `Food/Beverage/Tobacco` and you can see the `/` in the name, this will make a conflict with Angular routes. So `removeTrailingSlash` is used to remove the `/` and add it in the controller to send it as a parameter.








