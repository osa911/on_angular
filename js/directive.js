// ================================================== Директивы  начало ==================== 
//Директива по выводу главной
fgBikeApp.directive("fgHome", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/home.html'
	}
});

//Директива по выводу листа ожидания
fgBikeApp.directive("fgWishlist", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/wishlist.html'
	}
});

//Директива по выводу контактов
fgBikeApp.directive("fgContacts", function(){
	return {
		restrict: 'A',
		templateUrl: 'template/Contacts.html'
	}
});

//Директива по выводу контактной формы
fgBikeApp.directive("fgContactForm", function(){
	return {
		restrict: 'A',
		templateUrl: 'template/contact_forma.html'
	}
});

//Директива конструктора велосипедов
fgBikeApp.directive("fgСonstructor", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/constructor.html'
	}
});

//Директива Футера
fgBikeApp.directive("fgFooter", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/footer.html'
	}
});

//Директива Хедера
fgBikeApp.directive("fgHeader", function(){
	return {
		restrict: 'A',
		templateUrl: 'template/header.html'
	}
});

//Директива по выводу всех товаров
fgBikeApp.directive("fgItems", function(){
	return {
		restrict: 'A',
		templateUrl: 'template/items.html'
	}
});

//Директива по выводу корзины
fgBikeApp.directive("fgCart", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/Cart.html'
	}
});

//Директива по выводу корзины справа экрана
fgBikeApp.directive("fgCartInfo", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/Cart_info.html'
	}
});

//Директива по выводу оформления заказа
fgBikeApp.directive("fgСheckout", function(){
	return {
		restrict: 'E',
		templateUrl: 'template/checkout.html'
	}
});


// ================================================== Директивы  конец ====================
