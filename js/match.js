function accept(){
    $.ajax({
            url: "acceptMatch",                  
              type: "get",             
              data:  $('#blank-form').serialize(), 
            success: function(response) {
                var res = response; 
                console.log(res);
                if(res == "")
                {
                    location.href = "http://meowmates.sites.tjhsst.edu";
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