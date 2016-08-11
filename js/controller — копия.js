var fgBikeApp = angular.module("fgBikeApp", ['LocalStorageModule']);
fgBikeApp.controller("fgBikeController", function($scope,$element,localStorageService) {

	if(localStorageService.isSupported) {
	
	function set_ls (key, val) {return localStorageService.set(key, val);};
	var key_goods_list = "goods_list";
	var key_wishlist = "wishlist";
	var ls_goods;
	var ls_wishlist;
	$scope.load_goods = function(){
		ls_goods = localStorageService.get(key_goods_list);
		if(!ls_goods){
			ls_goods = [
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
			ls_goods = angular.toJson(ls_goods);
			set_ls(key_goods_list,ls_goods);
		} else {
			ls_goods = localStorageService.get(key_goods_list);
		}
		$scope.goods_arr=angular.fromJson(ls_goods);
	};
	
	$scope.set_ls_wishlist = function(a,b){
		//a.currentTarget
		


		
		
		ls_wishlist = angular.fromJson(localStorageService.get(key_wishlist));
		$scope.goods_arr = angular.fromJson(localStorageService.get(key_goods_list));
		
		if(!ls_wishlist){ls_wishlist=[];}

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
			
			
		
		
		//ls.push({'name':$scope.name,'familiya':$scope.familiya,'age':$scope.age});
		  	
		//set_ls(a,b);
	}

		 function getItem(key) {
		   return localStorageService.get(key);
		  };
		 function removeItem(key) {
		   return localStorageService.remove(key);
		  };
	};

});

fgBikeApp.directive("fgGoods", function(){
	return {
		restrict: 'A',
		templateUrl: 'template_goods.html'
	}
});

fgBikeApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('fgBikeApp');
});

fgBikeApp.service("test_service", function($interval,$filter){
	
})