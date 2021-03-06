'use strict'

angular.module('confusionApp',['ui.router'])
    .constant("baseURL","http://localhost:3000/")

    .config(function($stateProvider,$urlRouterProvider){
  
        $stateProvider
        
        .state('app',{
                url:'/',
                views:{
                        'header':{
                                templateUrl:'views/header.html',
                    },
                        'content':{
                                templateUrl:'views/home.html',
                                controller:'IndexController'
                    },
                        'footer':{
                                templateUrl:'views/footer.html',
                    }
                }
    })
        
      // route for the contactus page
        
    .state('app.contactus',{
        url:'contactus',
        views: {
            'content@':{
                    template: 'views/contactus.html',
                    controller:'ContactController'
            }
            
        }
    })
    
      // route for the aboutus page
    .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        template: 'views/aboutus.html',
                        controller:'AboutController'
                   }
                }
            })
    
         // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })
       // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
         $urlRouterProvider.otherwise('/');
});
       