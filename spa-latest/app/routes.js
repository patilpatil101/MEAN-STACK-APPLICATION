//==============================================================================================================================================================================----------------------->
  var bmc            = require('./models/schema');
  var host 			 = "localhost:3000";
//==============================================================================================================================================================================----------------------->
module.exports = function (app,nodemailer) {

//*********************************** POST request to inserting data into the database ********************************************************* 

  app.post('/insert', function (req, res) {
	   	
   bmc.find({"AgencyEmail":req.body.AGENCYEMAIL},{"AgencyEmail":1,_id:0},function(err, responsedata){
	  if (err)
	  res.send(err);
	 if(responsedata == 0)
	  {
		  var datastorage = 
					   { 
							AgencyName       : req.body.AGENCYNAME,
							AgencyEmail      : req.body.AGENCYEMAIL,
							AgencyPassword   : req.body.AGENCYPASSWORD,
							AgencyRoute      : req.body.AGENCYROUTE,
							AgencyWebUrl     : req.body.AGENCYWEBURL,
							AgencyMobile     : req.body.AGENCYMOBILE,
							AgencyPhone      : req.body.AGENCYPHONE,
							Active           : req.body.ACTIVE					
					    };
	
		bmc.create(datastorage, function (err, insertresponse)
		 {
			    
					if (err)
					res.send(err);
					if(insertresponse == 0)
				    {
						res.json({ success: false });
					}
				    else
					{
					    res.json({ success : true});
					}
					
     	});
	  }
	  else{
			res.json({ success : false});
	      }
	  
  });
	

    });	
//****************************** Email Validation **********************************************************	
 app.get('/emailValidation', function (req, res) {
		
	bmc.find({"AgencyEmail":req.query.email},{"AgencyEmail":1,_id:0},function (err, responsedata) {
      if (err)
         res.send(err);
		 if(responsedata == 0)
		 {
			res.json({ success: true });
		 }
		 else
		{
		    res.json({ success : false});
		}		 
    });
		 
}); 
//*************************** Get request to getting the JSON response when we hit /retrieve *****************************************************

   app.get('/retrieve', function (req, res) {
		
	bmc.find(function (err, responsedata) {
      if (err)
         res.send(err);
		 res.json(responsedata);	 
    });
		 
}); 

//********************* CheckUser checking whether the username and password is valid or not ***************************************************************************

app.get('/checkuser', function (req, res) {
	
     
//**** req.query.uname/pass *** it is used for getting the value from textfield whatever the value user entered **************************************************
		 
 bmc.find({"AgencyEmail":req.query.uname},{"AgencyPassword":1, _id:0},function (err, responsedata) {
      if (err)
	  res.send(err);
	if(responsedata == 0)
	{
		console.log('Data Not Found');
		res.json({ success: false });
	}
	else{
		
	if(req.query.pass == responsedata[0].AgencyPassword)
	{
		console.log("PASSWORD MATCH");
		
	  ///*********   
		bmc.find({"AgencyEmail":req.query.uname},{"Active":1, _id:0},function (err, responsedata) {
		if (err)
		res.send(err);
			if(responsedata[0].Active == true)
			{
				res.json({ success: true  });
				sess=req.session;	
				console.log('session is :: ',sess);
				sess.username=req.query.uname;
				console.log('sess.username is ::',sess.username);
			}
			if(responsedata[0].Active == false)
			{
				res.json({errors: 'Do not consider'});
			}
				
		});
      //*************		
	}
	else{
		res.json({error: 'Do not consider'});
	}
		}		
    });	
	
}); 
//*********************************************************************************************************************
app.get('/logout',function(req,res){
	console.log('Inside Logout Route');
	req.session.destroy(function(err,logoutres){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});
});
//*********************************************************************************************************************
// sending mail function
app.post('/sendemail', function(req, res){


   // Sending Emails with SMTP, Configuring SMTP settings
  
   var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
	auth: {
       user: "cdacb.mlab@gmail.com",
       pass: "mlab123*"
		}
   });
		var token = req.query.agencyemail;
        var mailOptions = {
            from: "MARSLAB ✔ <cdacb.mlab@gmail.com>", // sender address
            to  : req.query.agencyemail, // list of receivers
		 subject: "Welcome to MARSLAB",
		   html : "<div><p>Welcome to <strong>MARSLAB</strong>!</p><p>Thanks for registering with MARSLAB."
                +"To confirm your email address and to complete the registration process,<strong> "
                +"Click <a href='http://"+host+"/activate?token="+token+"'>here</a></strong>.</p>"
                +"<p>This is an automatically generated mail. Please do not respond to this.</p>"
                +"<p>Thanks,"
                +"<br>MARSLAB TEAM"
                +"<br>CDAC</p>"
                +"</div></body></html>"
			
      
		  }
		  
        smtpTransport.sendMail(mailOptions, function(error, responsedata){
        if(error){
             res.send("Email could not sent due to error: "+error);
        }else{
             res.send("Email has been sent successfully");
        } 
	    // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
		
    });
			
});
 
//*********************************************************************************************************************
app.get('/activate',function(req,res){

	bmc.find({"AgencyEmail":req.query.token},{"AgencyEmail":1, _id:0},function (err, responsedata) {
      if (err)
	  res.send(err);
	if(responsedata == 0)
	{
		console.log('Email ID Not Found');
		res.json({ success: false });
	}
	
	else{
		
	if(req.query.token == responsedata[0].AgencyEmail)
	{
		console.log("Your account is activated now.");
		bmc.update({"Active":false},{$set:{"Active":true}},function(err,updateres){
			if (err)
	        res.send(err);
		});
		 
		    res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<body style="background-color: black;">');
            res.write('<br><h1 style="color:white; text-align: center;">Thank you. Your account has been successfully activated.</h1>');
            res.write('</body>')
			res.end();
	
	
	} 
		}
   });
});
//*********************************************************************************************************************
app.post('/forgotpassword',function(req,res){
	bmc.find({"AgencyEmail":req.query.email},{"AgencyPassword":1,_id:0},function (err, responsedata) {
      if (err)
         res.send(err);
	
		 if(responsedata == 0)
		 {
			res.json({ success: false });
		 }
		 else
		{
		    res.json({ success : true});
		}		 
    });
});
//*********************************************************************************************************************
app.post('/changepassword',function(req,res){
	
	
	bmc.find({"AgencyEmail":req.query.email},{"AgencyPassword":1,_id:0},function (err, responsedata) {
      if (err)
         res.send(err);
	 
	
		 bmc.update({"AgencyPassword":responsedata[0].AgencyPassword},{$set:{"AgencyPassword":req.query.confirmpassword}},function(err,updateres){
			if (err)
	        res.send(err);
			
			if(updateres == 0)
			{
				res.json({ success: false });
			}
			else
			{
				res.json({ success : true});
			}	
		});
		
		 	 
    });
});

//*********************************************************************************************************************
	};
//=================================================================================================================================================================================-------------------->