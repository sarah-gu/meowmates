function accept(){
    img = document.getElementById("animalimg");
    namer = document.getElementById("animalname");
    type = document.getElementById("animaltype");
    bio = document.getElementById("bio");
    hobby = document.getElementById("hobby");
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
                    img.src = res['imagelink']; 
                    namer.innerHTML = "<h1>" + res['name'] + "</h1>";
                    type.innerHTML = res['petType'];
                    hobby.innerHTML  = res['hobbies']; 
                    bio.innerHTML = res['bio']; 
                }
            },
            error: function (stat, err) {
                console.log("something went wrong");
                    }       
                });
}