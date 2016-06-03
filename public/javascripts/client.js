angular.module('booksApp', ['ui.router']);

angular.module('booksApp')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise("/home");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('books', {
      url: "/books",
      templateUrl: "views/books.html",
      controller: "booksCtrl",
      controllerAs: "ctrl"
    })
    .state('books-show', {
      url: "/books/:bookId",
      templateUrl: "views/books-show.html",
      controller: "booksShowCtrl",
      controllerAs: "ctrl"
    });
});

angular.module('booksApp')
.controller('booksCtrl', function($http, $state) {
  console.log('booksCtrl is alive!');

  var ctrl = this;
  ctrl.books = [];

  ctrl.getBooks = function() {
    $http.get('/api/books').then(function(response) {
      ctrl.books = response.data;
      console.log('ctrl.books:', ctrl.books);
    });
  };

  ctrl.goShowPage = function(book) {
    $state.go('books-show', { bookId : book._id } );
  };

  ctrl.getBooks();
});

angular.module('booksApp')
.controller('booksShowCtrl', function($http, $stateParams) {
  console.log('booksShowCtrl is alive!');

  var ctrl = this;
  ctrl.book = {};

  $http.get('/api/books/' + $stateParams.bookId).then(function(response) {
    ctrl.book = response.data;
  });
});
