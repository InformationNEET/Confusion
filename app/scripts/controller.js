'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menufactory', function($scope, menufactory){

     
         $scope.dishes= [];   
        $scope.tab = 1;
        $scope.filtText= '';
           
        $scope.message= "Loading...";
            
         menufactory.getDishes()
        .then(
            function(response){
                $scope.dishes=response.data;
                $scope.showMenu = true;
            },
         function(response){
             $scope.message= "Error:" + response.status + " " + response.statusText;
         }
         );
            
        $scope.select = function(setTab){
            
            this.tab = setTab;
            
            if(setTab === 2)
                this.filtText = "appetizer";
            else if(setTab === 3)
                this.filtText = "mains";
            else if(setTab === 4)
                this.filtText = "dessert";
            else
                this.filtText = " ";
            
            };
        
          $scope.isSelected = function (checkTab) {
                return (this.tab === checkTab);
            };
          
        
    }])

    .controller('IndexController',['$scope','menufactory','corporateFactory',function($scope,menufactory,corporateFactory){
        
         $scope.dish = {};
        $scope.promotion = {};
        $scope.chef = {};
        $scope.message= "Loading...";
        
       menufactory.getDish(0)
        .then(
        function(response){
            $scope.dish = response.data;
            $scope.showDish = true;
            
        },
       function(response){
           $scope.message = "Error: " + response.status + " " +response.statusText;
       }
       );
        
        
        menufactory.getPromotion(0)
        .then(
        function(response){
            $scope.promotion = response.data;
            $scope.showPromotion = true;
            
        },
        function(response){
           $scope.message = "Error: " + response.status + " " +response.statusText;
       });
        
       corporateFactory.getLeader(1)
       .then(
       function(response){
           $scope.chef = response.data;
           $scope.showChef= true;
       },
       function(response){
           $scope.message = "Error: " + response.status + " " +response.statusText;
       });
    }])

.controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
    $scope.leaders = corporateFactory.getLeaders();
    
    
}])





    .controller('ContactController',['$scope',function($scope){
    
    $scope.feedback = {mychannel:"", firstName:"",lastName:"",agree:false,email:""};
    
    var channels = [{value:"tel" , label:"Tel"} , {value:"Email" , label:"Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection=false;
    
    }])

    .controller('FeedbackController',['$scope',function($scope){
    
    $scope.sendFeedback = function(){
        console.log($scope);
        if($scope.sendFeedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel){
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
        }
        else {
            $scope.invalidChannelSelection=false;
            
        }
    };

}])
    
/*
  .controller('DishDetailController' , ['$scope','menuFactory',function($scope,menuFactory){
        
        $scope.dish = menuFactory.getDish(3);
    }]);
    
  */
    
    //Copied from Git
    
  .controller('DishDetailController', ['$scope', '$stateParams', 'menufactory', function($scope, $stateParams, menufactory) {

        $scope.dish = {};
        $scope.message= "Loading..."
      
            menufactory.getDish(parseInt($stateParams.id,10))
            .then(
            function(response){
            $scope.dish = response.data;
            },function(response){
           $scope.message = "Error: " + response.status + " " +response.statusText;
       });                     
                    
                    }])

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            
            $scope.submitComment = function () {
                console.log($scope.comment);

                //Step 2: This is how you record the date
                $scope.comment.date = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.comment);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment = {author: "", rating: 5, comment: "", date: new Date().toISOString()};
                console.log($scope.comment);
            };
        }])
;
   