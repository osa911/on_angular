var fgBikeApp = angular.module("fgBikeApp", ['ngStorage','ui.router']);
// ================================================== Роутинг  начало ==================== 
fgBikeApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/');

    $stateProvider
		.state('home', {
	      url: '/',
	      templateUrl: 'page/home.html'
	    })
	    .state('cart', {
	      url: '/cart',
	      templateUrl: 'page/cart.html'
	    })
	    .state('wishlist', {
	      url: '/wishlist',
	      templateUrl: 'page/wishlist.html'
	    })
	    .state('checkout', {
	      url: '/checkout',
	      templateUrl: 'page/checkout.html'
	    });


	});

// ================================================== Контроллер  начало ==================== 
fgBikeApp.controller("fgBikeController", function($scope,$localStorage,$http,cart_service,send_email_service,get_items_from_server) {
	
//дергаем с "сервака" каталог товаров. Пока что только как масив.
	
	get_items_from_server.get().
		then(function(value) {
			$scope.items_arr = value;
			//$scope.itemCartQty=1;
		//Создаю переменные или присваиваю их с локалсторендж			
			$scope.wishlist = $localStorage.wishlist || [];
			$scope.cart = $localStorage.cart || [];
		//записую в локалсторедж данные
		    $scope.$watch('wishlist', function() { $localStorage.wishlist = $scope.wishlist; }, true);
		    $scope.$watch('cart', function() { $localStorage.cart = $scope.cart; }, true);
		    
		//дергаю данные из локал сторедж   
		    $scope.$watch(function() {
		        return angular.toJson($localStorage);
		    }, function() {
		        $scope.wishlist = $localStorage.wishlist;
		        $scope.cart = $localStorage.cart;
		    });

		//кнопка добавить товар в корзину
		    $scope.add_to_cart = function(b){
		    	//console.log(b)
				var like_item = $scope.items_arr;
		    	if ($scope.cart.length>0) {
		    		var status_item_in_cart = 0;
		    		for (var i = $scope.cart.length - 1; i >= 0; i--) {
		    			if ($scope.cart[i].item_id == like_item[b.id-1].id) {
		    				//console.log("такой товар уже в корзине");
		    				status_item_in_cart = 1;
		    			}
		    		}
					if (status_item_in_cart == 0) {
						angular.toJson($scope.cart.push({"item_id":like_item[b.id-1].id, "item_price":like_item[b.id-1].price}));
						//console.log("товар добавлен в корзину");
		    		}
		    	} else {
					angular.toJson($scope.cart.push({"item_id":like_item[b.id-1].id, "item_price":like_item[b.id-1].price}));
					//console.log("товар добавлен в корзину");
				}
		    	
		    	$scope.cart_info = cart_service.get_items($scope.cart);
		    }
		//выводим суму добавленных товаров в корзину на хедер
			$scope.cart_info = cart_service.get_items($scope.cart);

		//Читаем масив с товарами
			$scope.readItemArr=function(item){
				var ans;
				for (var i = $scope.items_arr.length - 1; i >= 0; i--) {
					if($scope.items_arr[i].id == item){
						ans= $scope.items_arr[i];
					} 
				}
				return ans;
			}

		//Читаем корзину на наличие товара в ней.
			$scope.readCartStatus=function(item){
				var status;
				for (var i = $scope.cart.length - 1; i >= 0; i--) {
					if ($scope.cart[i].item_id == item) {
						status=1;
					} 
				}
				return status;
			}
		//Удаляем с корзины товар
			$scope.delFromCart = function (item) {
				for (var i = $scope.cart.length - 1; i >= 0; i--) {
					if ($scope.cart[i].item_id == item) {
						$scope.cart.splice(i,1); // удаляем товар
						$scope.cart_info = cart_service.get_items($scope.cart);
					} 
				}
			}
		//Скрипт нажатия на звезду добавить в лист ожидания начало
			$scope.set_ls_wishlist = function(b){
				//console.log(b);
				if ($scope.wishlist.length>0) {
					var statusItemInWishlist;
					for (var i = $scope.wishlist.length - 1; i >= 0; i--) {
						if ($scope.wishlist[i] === b.id){
							$scope.wishlist.splice(i,1); // удаляем товар
							statusItemInWishlist=1;
							break;
						} else {
							statusItemInWishlist=0;
						}
					}
					if (statusItemInWishlist==0) {
						$scope.wishlist.push(b.id); //добавляем товар в лист ожидания
					}
				} else {
					$scope.wishlist.push(b.id);
				}
			};

			$scope.readWishList=function(item){
				var status;
				for (var i = $scope.wishlist.length - 1; i >= 0; i--) {
					if ($scope.wishlist[i] == item) {
						status=1;
					} 
				}
				return status;
			}
		//Скрипт нажатия на звезду добавить в лист ожидания конец

		//Отправка письма из контактной формы начало	
			$scope.send_succes=false;
			$scope.send_failed=false;
			$scope.send_message = function(a,b,c){
				send_email_service.send(a,b,c);
				$scope.send_succes=true;
			};
		//Отправка письма из контактной формы конец	
		//Масив всех типов доставок в магазине:	
			$scope.delivery_type=[
				{"id":1,"name":"Самовывоз"},
				{"id":2,"name":"Новая Почта"}
			];

		}); //конец запроса



});

// ================================================== Контроллер  конец ==================== 
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
// ************************************************** Сервисы  начало ********************
//Сервис по загрузке товаров с сервера
fgBikeApp.service("get_items_from_server", function($http,$q){
	
	this.get = function () {
		var def = $q.defer();
		$http.get(location.pathname+"/back_end/items.json").then(function (response) {
		    def.resolve(response.data);
		      
		  });

		return def.promise;
		
	}
});

//Сервис по отслеживанию добавленных товаров в корзину
fgBikeApp.service("cart_service", function(){
	this.get_items = function (cart_item) {
		var cart_summa=0;
		if (cart_item.length>0) {
			for (var i = cart_item.length - 1; i >= 0; i--) {
				cart_summa += cart_item[i].item_price;
			}
		}
		return {"summa": cart_summa, "kol":cart_item.length }
	}
});
//Сервис по отправке e-mail
fgBikeApp.service("send_email_service", function(){
	this.send = function (n,e,m) {
		return console.log("Отправитель: "+n+"<br>Email:"+e+"<br>Сообщение:"+m)
	}
});





// ************************************************** Сервисы  Конец ********************
//--------------------------------------------------------------------------------------------------------------------


