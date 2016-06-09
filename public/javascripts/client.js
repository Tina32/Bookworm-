angular.module('booksApp', ['ui.router', 'ngPdfObject']);

angular.module('booksApp')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/home");
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "views/home.html"
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "views/signup.html",
                controller: "signupCtrl",
                controllerAs: "ctrl"
            })

            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "loginCtrl",
                controllerAs: "ctrl"
            })
            .state('books', {
                url: "/books",
                templateUrl: "views/books.html",
                controller: "booksCtrl",
                controllerAs: "ctrl"
            })
            .state('newbook', {
                url: "/books/new",
                templateUrl: "views/newbook.html",
                controller: "newbookCtrl",
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

        ctrl.displayname = "shawn";

        ctrl.getBooks = function() {
            $http.get('/api/books').then(function(response) {
                ctrl.books = response.data;
                console.log('ctrl.books:', ctrl.books);
            });
        };

        ctrl.goShowPage = function(book) {
            $state.go('books-show', { bookId: book._id });
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

    //new book controller
angular.module('booksApp')
    .controller('newbookCtrl', function($http, $stateParams, $state) {
        console.log('creating a new book');

        var ctrl = this;
        ctrl.book = {};

        // ctrl.displayname ="Shawn's new book"

        ctrl.book = {
            title: ctrl.book.title,
            year: ctrl.book.year,
            pdf: ctrl.book.pdf,
            img: ctrl.book.img
        };

        ctrl.submit = function() {
            console.log('you pressed submit.');
            var data = ctrl.book;
            $http.post('/api/books', data).then(function(response) {
                console.log('newbook response:', response);
                $state.go('books');
            }, function(err) {
              console.log('ERROR:', err);
              alert('ERROR: ' + err.status + ' : ' + err.data.message);
            });
        };
    });

angular.module("booksApp")
    .controller("signupCtrl", function($http, $state) {
        console.log('signupCtrl is alive!');
        var ctrl = this;

        ctrl.data = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        ctrl.submit = function() {
            console.log('you pressed submit.');
            console.log('data:', ctrl.data);
            $http.post('/signup', ctrl.data).then(function(response) {
                console.log('signup response:', response);
                $state.go('books');
            });
        };
    });

angular.module("booksApp")
    .controller("loginCtrl", function($http, $state) {
        console.log('loginCtrl is alive!');
        var ctrl = this;

        ctrl.data = {
            email: '',
            password: ''
        };

        ctrl.submit = function() {
            console.log('you pressed submit.');
            console.log('data:', ctrl.data);
            $http.post('/login', ctrl.data).then(function(response) {
                console.log('login response:', response);
                $state.go('books');
            });
        };
    });

angular.module("booksApp")
    .controller("navbarCtrl", function($http, $state) {
        console.log('navbarCtrl is alive!');
        var ctrl = this;

        ctrl.logout = function() {
            console.log('you clicked logout');
            $http.get('/logout').then(function(response) {
                console.log('You have logged out.');
                $state.go('home');
            });
        };
    });


