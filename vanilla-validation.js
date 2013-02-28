/* Vanilla validation */
(function($){
	$.vanillaValidation = new function(){
		var rules = {};
		rules["not-empty"] = function(value){
			if (value.replace(/ /g,"").length == 0)	return "Cannot be empty.";
		};
		this.pushRule = function(name, fxn){
			rules[name] = fxn;
		};
		this.findRule = function(name){
			return rules[name];
		};
	};
	
  var formElems = $("form");
  if (formElems.length == 0)  return false;
	
	var validationTypes = {};
  formElems.submit(function(){
    var form = $(this);
    var validationElems = form.children("*[data-validate]");
    if (validationElems.length == 0){
      form.trigger("after-validate");
      return true;
    }
    //Now we do the validation.
    for (var i = 0; i < validationElems.length; i++){
      var elem = validationElems.eq(i);
      var validations = elem.attr("data-validate").split(",");
      for (var j = 0; j <  validations.length; j++){
				var validationFxn = $.vanillaValidation.findRule( validations[j] );
				if (validationFxn){
					var errorMessage = validationFxn(elem.val());
					if (errorMessage){
	          form.trigger("after-validate", {message: errorMessage, element:elem});
	          return false;						
					}
				}
      }
    }
    //Otherwise, we have passed
    form.trigger("after-validate");        
  });
})(jQuery);