const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/",function(req,res){ 
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const firstName=req.body.F;
    const lastName=req.body.L;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us2.api.mailchimp.com/3.0/lists/55ff968efd"
    const options={
        method: "POST",
        auth: "Piyush01:b2c775cf92bc5cc4feaf1d14f4b88c04-us2"
    }
   const request=https.request(url,options,function(response){
       if(response.statusCode===200){
           res.sendFile(__dirname+"/success.html");
       }
       else{
           res.sendFile(__dirname+"/failure.html");
       }
       response.on("data",function(data){
           console.log(JSON.parse(data));
       })
   })

   request.write(jsonData);
   request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running");
});

//b2c775cf92bc5cc4feaf1d14f4b88c04-us2

//55ff968efd