function petReg(){
    	// Validation
  $("#petregister-form").validate({
  	rules: {
      reg_username: "required",
  	  reg_location: {
  			required: true,
  		},
   		reg_times: {
  			required: true,
  			minlength: 5,
  		},
  		reg_bio: {
  	    required: true,
  		},
  		reg_ptype: "required",
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });
  r = document.getElementById("showerrorreg");
    console.log("works");
    $.ajax({
            url: "petRegister",                  
              type: "get",             
              data:  $('#register-form').serialize(), 
            success: function(response) {
              var res = response; 
                console.log(res);
                if(res == "")
                {
                    location.href = "http://meowmates.sites.tjhsst.edu/login";
                }
                else
                {
                    r.innerHTML = res; 
                }
                    },
            error: function (stat, err) {
                console.log("something went wrong");
                    }       
                });
}
