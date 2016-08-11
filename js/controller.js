var fgBikeApp = angular.module("fgBikeApp", ['ngStorage']);
fgBikeApp.controller("fgBikeController", function($scope,$localStorage) {
	var god_arr =	[
		{id:1, name: "FG Model №1",price: 230, wishlist_icon:"uk-icon-star-o", img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:2, name: "FG Model №2",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:3, name: "FG Model №3",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:4, name: "FG Model №4",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:5, name: "FG Model №5",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:6, name: "FG Model №6",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:7, name: "FG Model №7",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:8, name: "FG Model №8",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:9, name: "FG Model №9",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:10, name: "FG Model №10",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:11, name: "FG Model №11",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"},
		{id:12, name: "FG Model №12",price: 230, wishlist_icon:"uk-icon-star-o",img_url: "http://placehold.it/720x540&text=demo",img_url_hover: "http://placehold.it/720x540&text=demo"}
	];
			
	$scope.goods_arr = $localStorage.goods_arr || god_arr;
	$scope.wishlist = $localStorage.wishlist || [];
    $scope.$watch('goods_arr', function() {
        $localStorage.goods_arr = $scope.goods_arr;
    }, true);
    $scope.$watch('wishlist', function() {
        $localStorage.wishlist = $scope.wishlist;
    }, true);
    
    $scope.$watch(function() {
        return angular.toJson($localStorage);
    }, function() {
        $scope.goods_arr = $localStorage.goods_arr;
        $scope.wishlist = $localStorage.wishlist;
       
    });

	

	$scope.set_ls_wishlist = function(a,b){
		
		var like_item = angular.fromJson($scope.goods_arr);
		if (like_item[b.id-1].wishlist_icon=="uk-icon-star"){
			angular.toJson($scope.goods_arr[b.id-1].wishlist_icon="uk-icon-star-o");
			for (var i = $scope.wishlist.length - 1; i >= 0; i--) {
				if ($scope.wishlist[i] == like_item[b.id-1].id){
					$scope.wishlist.splice(i,1);
				}
			}
			angular.toJson($scope.wishlist);
			
		} else {
			angular.toJson($scope.goods_arr[b.id-1].wishlist_icon="uk-icon-star");
			angular.toJson($scope.wishlist.push(like_item[b.id-1].id));
		}

		$scope.goods_arr = angular.fromJson($scope.goods_arr);

		/*if(!ls_wishlist){ls_wishlist=[];}

			if(ls_wishlist.length>0){
					for (var i = ls_wishlist.length - 1; i >= 0; i--) {
					if (ls_wishlist[i].id_good===b.id) {
						var k = ls_wishlist[i];
						ls_wishlist.splice(i,1);
						console.log(ls_wishlist);
						console.log(i);
						
						$scope.goods_arr[b.id-1].wishlist_icon="uk-icon-star-o";
						//return;
					} else {
						ls_wishlist.push({"id_good":b.id});
						$scope.goods_arr[b.id-1].wishlist_icon="uk-icon-star";
						
					}
				}
				ls_goods = angular.toJson($scope.goods_arr);
				ls_wishlist = angular.toJson(ls_wishlist);
				set_ls(key_wishlist,ls_wishlist);
				set_ls(key_goods_list,ls_goods);
			} else {
				ls_wishlist=[];
				ls_wishlist.push({"id_good":b.id});
				$scope.goods_arr[b.id-1].wishlist_icon="uk-icon-star";
				ls_wishlist = angular.toJson(ls_wishlist);
				ls_goods = angular.toJson($scope.goods_arr);
				set_ls(key_wishlist,ls_wishlist);
				set_ls(key_goods_list,ls_goods);
			}
			
			
		*/
		
		//ls.push({'name':$scope.name,'familiya':$scope.familiya,'age':$scope.age});
		  	
		//set_ls(a,b);
	
	};

});

fgBikeApp.directive("fgGoods", function(){
	return {
		restrict: 'A',
		templateUrl: 'template_goods.html'
	}
});
/*
fgBikeApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('fgBikeApp');
});*/
/*
fgBikeApp.service("test_service", function($interval,$filter){
	
})*/