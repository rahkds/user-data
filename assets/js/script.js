(function(){

    $(document).ready(function(){
        new MyAdmin();

    });




    function MyAdmin(){
        //this.createVariable();
        this.createEvents();
        //this.checkAndLoadProfileImage();
    }

    MyAdmin.prototype.createEvents = function(){
        var Obj = this;

        $("#ShowMobile").bind('click',function(e){
            e.preventDefault();
            Obj.ShowMobileNumber(this);
        });

        $("#ShowEmail").bind('click',function(e){
            e.preventDefault();
            Obj.ShowEmail(this);
        });

        $(".EditfNameWindow").bind('click',function(e){
            e.preventDefault();
            Obj.updateFirstName(this);
        });

        $(".EditlNameWindow").bind('click',function(e){
          e.preventDefault();
          Obj.updateLastName(this);
        });

        $(".updateScreenNameWindow").bind('click',function(e){
          e.preventDefault();
           Obj.updateScreenName(this);
         });

         $(".updateMobileWindow").bind('click',function(e){
          e.preventDefault();
           Obj.updateMobileNumber(this);
         });

         $(".updateEmailWindow").bind('click',function(e){
          e.preventDefault();
           Obj.updateEmailID(this);
         });

         $('#sendMobileotp').bind('click',function(e){
          if(e.preventDefault) e.preventDefault();
            $(this).attr('disabled',true);
            Obj.sendMobileotp(this);
          });

        $('#submitMobileopt').bind('click',function(e){
          if(e.preventDefault) e.preventDefault();
            $(this).attr('disabled',true);
            Obj.verifyMobileOtp(this);
          });

        $('#sendMailVerifyOtp').bind('click',function(e){
          if(e.preventDefault) e.preventDefault();
            $(this).attr('disabled',true);
            Obj.sendMailVerifyOtp(this);
        });

        $('#submitEmailVerifyOtp').bind('click',function(e){
          if(e.preventDefault) e.preventDefault();
           $(this).attr('disabled',true);
           Obj.submitEmailVerifyOtp(this);
        });

        $('.kycwindow,.chequewindow,.panwindow,.addresswindow').bind('click',function(e){
          if(e.preventDefault) e.preventDefault();
          Obj.collectingValues(this);
        });

        $(".CheckSameAccountHolder").bind('click',function(e){
          e.preventDefault();
          Obj.CheckSameAccountHolder(this);
        });

        $(".CheckSameKYCID").bind('click',function(e){
          e.preventDefault();
          Obj.CheckSameKYCID(this);
        });

        $('.RejApproved').bind('click',function(e){
          if(e.preventDefault) e.preventDefault();
          Obj.rejectingApprovedValues(this);
        });

      $(".allDocWindow").bind('click',function(e){
        e.preventDefault();
        Obj.allDocReview(this);
      });


    }

    MyAdmin.prototype.ShowMobileNumber=function(data){
        var Obj=this;
        var OCID=$(data).attr('data-userid');
        var Mobile=$(data).attr('data-Mobile');
        var html='';
        html += '<p id="errorMessageDisplay" style="color:red"></p>';
        html += Obj.generateTabularText("OCID", OCID);
        html += Obj.generateTabularText("Mobile", '<input type="text" value='+Mobile+'>');
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Show Mobile");
        // $.post('/admin/AgentViewLog',{'UserId':UserID,'View_Type':'Mobile','View_Value':Mobile},function(data){
        //   console.log(data);
  
        // });
      }    

      MyAdmin.prototype.ShowEmail=function(data){
        var Obj=this;
       var OCID=$(data).attr('data-userid');
       var EmailId=$(data).attr('data-EmailId');
        var html='';
        html += '<p id="errorMessageDisplay" style="color:red"></p>';
        html += Obj.generateTabularText("OCID", OCID);
        html += Obj.generateTabularText("EmailId", '<input type="text" value='+EmailId+'>');
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Show Email");
        // $.post('/admin/AgentViewLog',{'UserId':UserID,'View_Type':'Email','View_Value':EmailId},function(data){
        //   console.log(data);
        // });
      }      

      MyAdmin.prototype.updateFirstName = function(button){
        var Obj = this;
        var ocid = $(button).attr('ocid');
        var gocid = $(button).attr('gocid');
        var firstName = $(button).attr('fname');
        var html ='<p class="errMsg" style="color:red"></p><br><label id="label1">Change First Name: </label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="newFirstName" id="input-newFirstName" style="width: 85%;padding: 5px 10px;" required><br><br><br>' +
          '<button class="submit-firstName" type="button">Submit</button>';
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Update First Name.");
        //$('#myModal').modal('show');
        $('.submit-firstName').bind('click', function (e) {
          e.preventDefault();
          var url="/user/profileFieldUpdate";
          var newFirstName = $.trim($('#input-newFirstName').val());
          if(newFirstName!=''){
            $.post(url,{newValue:newFirstName,oldValue:firstName, ocid:ocid, gocid:gocid, type : 'FirstName'},function(data){
              if(data == "1"){
                  $('.errMsg').css('color','green').html('First Name has been Changed Successfully.');
                  $('#myModal .modal-body').html('First Name has been Changed Successfully.');
                  $('#input-newFirstName,.submit-firstName,#label1').remove();
                  document.location.reload();
              }else{
                $('.errMsg').css('color','red').html('first Name has Not Changed Successfully');
                $('#myModal .modal-body').html('first Name has Not Changed Successfully');
                $('#input-newFirstName,.submit-firstName,#label1').remove();
              }
            }).fail(function(response) {
              let msg = response && response.responseText || 'first Name has Not Changed Successfully';
              $('.errMsg').css('color','red').html(msg);
              $('#myModal .modal-body').html(msg);
              $('#input-newFirstName,.submit-firstName,#label1').remove();
            });
          }else{
            $('.errMsg').css('color','red').html('Please enter First Name');
          }
        })
      }

      MyAdmin.prototype.updateLastName = function(button){
        var Obj = this;
        var ocid = $(button).attr('ocid');
        var gocid = $(button).attr('gocid');
        var lastName = $(button).attr('lname');
        var html ='<p id="errMsg1" style="color:red"></p><br><label id="label1">Change Last Name: </label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="newLastName" id="input-newLastName" style="width: 85%;padding: 5px 10px;"><br><br><br>' +
          '<button id="submit-lastName" type="button">Submit</button>';
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Update Last Name.");
        //$('#myModal').modal('show');
        $('#submit-lastName').bind('click', function (e) {
          e.preventDefault();
          var url="/user/profileFieldUpdate";
          var newLastName = $.trim($('#input-newLastName').val());
          console.log('newLastName',newLastName);
          if(newLastName!=''){
            $.post(url,{newValue:newLastName,oldValue:lastName, ocid:ocid,gocid:gocid, type : 'LastName'},function(data){
              if(data == "1"){
                  $('#errMsg1').css('color','green').html('Last Name has been Changed Successfully.');
                  $('#myModal .modal-body').html('Last Name has been Changed Successfully.');
                  $('#input-newLastName,#submit-lastName,#label1').remove();
                  document.location.reload();
              }else{
                $('#errMsg1').css('color','red').html('Last Name has Not Changed Successfully');
                $('#myModal .modal-body').html('Last Name has Not Changed Successfully');
                $('#input-newLastName,#submit-lastName,#label1').remove();
              }
            }).fail(function(response) {
              let msg = response && response.responseText || 'Last Name has Not Changed Successfully';
              $('.errMsg1').css('color','red').html(msg);
              $('#myModal .modal-body').html(msg);
              $('#input-newLastName,#submit-lastName,#label1').remove();
            });
          }else{
            $('#errMsg1').css('color','red').html('Please enter Last Name');

  
          }
        })
      }

      MyAdmin.prototype.updateScreenName = function(button){
        var Obj = this;
        var ocid = $(button).attr('ocid');
        var gocid = $(button).attr('gocid');
        var screenName = $(button).attr('name');
        var html ='<p id="ScreenNameErrMsg" style="color:red"></p><br><label id="label1">Change Screen Name: </label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="newScreenName" id="input-newScreenName" style="width: 85%;padding: 5px 10px;"><br><br><br>' +
          '<button id="submit-screenName" type="button">Submit</button>';
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Update Screen Name.");
       // $('#myModal').modal('show');
        $('#submit-screenName').bind('click', function (e) {
          e.preventDefault();
          var url="/user/profileFieldUpdate";
          var newScreenName = $.trim($('#input-newScreenName').val());
          if(newScreenName!=''){
            $.post(url,{newValue:newScreenName,oldValue:screenName,ocid:ocid, gocid:gocid, type : 'ScreenName'},function(data){
              if(data == "1"){
                  $('#ScreenNameErrMsg').css('color','green').html('Screen Name has been Changed Successfully.');
                  $('#myModal .modal-body').html('Screen Name has been Changed Successfully.');
                  $('#input-newScreenName,#submit-screenName,#label1').remove();
                  document.location.reload();
              }else{
                $('#ScreenNameErrMsg').css('color','red').html('Screen Name has Not Changed Successfully');
                $('#myModal .modal-body').html('Screen Name has Not Changed Successfully');
                $('#input-newScreenName,#submit-screenName,#label1').remove();
              }
            }).fail(function(response) {
              let msg = response && response.responseText || 'Screen Name has Not Changed Successfully';
              $('#ScreenNameErrMsg').css('color','red').html(msg);
              $('#myModal .modal-body').html(msg);
              $('#input-newScreenName,#submit-screenName,#label1').remove();
            });
          }else{
            $('#ScreenNameErrMsg').css('color','red').html('Please enter Screen Name');
          }
        })
      }

      MyAdmin.prototype.updateMobileNumber = function(button){
        //var link = $(button).attr('href');
        var ocid = $(button).attr('ocid');
        var gocid = $(button).attr('gocid');
        var mobileNo = $(button).attr('mobileNo');
        var html ='<p id="errMsg" style="color:red"></p><br><label id="label1">Change Mobile Number: </label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="number" name="newMobileNumber" id="input-newMobileNumber" style="width: 85%;padding: 5px 10px;"><br><br><br>' +
          '<button id="submit-Mobile" type="button">Submit</button>';
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Update Mobile Number.");
        $('#submit-Mobile').bind('click', function (e) {
          var url="/user/mobileUpdate";
          e.preventDefault();
          var newMobileNumber = $.trim($('#input-newMobileNumber').val());
          if (/^\d{10}$/.test(newMobileNumber)) {
          } else {
            alert("Not a valid Mobile Number")
            return false;
          }
          if(newMobileNumber!=''){
            $.post(url,{newMobileNumber:newMobileNumber,mobileNo:mobileNo,gocid:gocid, ocid :ocid },function(data){
              console.log('data',data)
              if(data == "1"){
                $('#errMsg').css('color','green').html('Mobile has been Changed Successfully.');
                 $('#myModal .modal-body').html('Mobile has been Changed Successfully.');
                $('#input-newMobileNumber,#submit-Mobile,#label1').remove();
                document.location.reload();
              }else if(data=="2"){
                $('#errMsg').css('color','red').html('Mobile Number Already Exist');
                 $('#myModal .modal-body').html('Mobile Number Already Exist');
                $('#input-newMobileNumber,#submit-Mobile,#label1').remove();
              }else{
                $('#errMsg').css('color','red').html('Mobile has Not Changed Successfully');
                 $('#myModal .modal-body').html('Mobile has Not Changed Successfully');
                $('#input-newMobileNumber,#submit-Mobile,#label1').remove();
              }
            }).fail(function(response) {
              let msg = response && response.responseText || 'Mobile has Not Changed Successfully';
              $('#errMsg').css('color','red').html(msg);
              $('#myModal .modal-body').html(msg);
              $('#input-newMobileNumber,#submit-Mobile,#label1').remove();
            });
          }else{
            //$('#errMsg').html('Please enter Mobile Number');
            $('#myModal .modal-body').html('Please enter Mobile Number');
            $('#myModal .modal-body').append(html);
          }
        })
      }

      MyAdmin.prototype.updateEmailID = function(button){
        var Obj = this;
        var ocid = $(button).attr('ocid');
        var gocid = $(button).attr('gocid');
        var EmailID = $(button).attr('EmailID');
        var html ='<p id="errMsg" style="color:red"></p><br><label id="label1">Change Email ID: </label>&nbsp;&nbsp;&nbsp;&nbsp;<input type="email" name="newEmailID" id="input-newEmailID" style="width: 85%;padding: 5px 10px;"><br><br><br>' +
          '<button id="submit-Email" type="button">Submit</button>';
        $('#myModal .modal-body').html(html);
        $('#myModal .modal-title').html("Update Email ID.");
        //$('#myModal').modal('show');
        $('#submit-Email').bind('click', function (e) {
          e.preventDefault();
          var url="/user/emailIdUpdate";
          var newEmailID = $.trim($('#input-newEmailID').val());
          var atpos = newEmailID.indexOf("@");
          var dotpos = newEmailID.lastIndexOf(".");
          var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(newEmailID) == false) 
          {
              alert('Not a valid e-mail address');
              return false;
          }



          if(newEmailID!=''){
            $.post(url,{newEmailID:newEmailID,EmailID:EmailID,gocid:gocid,ocid:ocid},function(data){
              if(data == "1"){
                  $('#errMsg').css('color','green').html('EmailID has been Changed Successfully.');
                  $('#myModal .modal-body').html('EmailID has been Changed Successfully.');
                  $('#input-newEmailID,#submit-Email,#label1').remove();
                document.location.reload();
              }else if(data=="2"){
                   $('#errMsg').css('color','red').html('EmailID Already Exist');
                     $('#myModal .modal-body').html('EmailID Already Exist');
                    $('#input-newEmailID,#submit-Email,#label1').remove();
                }else{
                $('#errMsg').css('color','red').html('EmailID has Not Changed Successfully');
                $('#myModal .modal-body').html('EmailID has Not Changed Successfully');
                $('#input-newEmailID,#submit-Email,#label1').remove();
              }
            }).fail(function(response) {
              let msg = response && response.responseText || 'EmailID has Not Changed Successfully';
              $('#errMsg').css('color','red').html(msg);
              $('#myModal .modal-body').html(msg);
              $('#input-newEmailID,#submit-Email,#label1').remove();
            });
          }else{
            //$('#errMsg').css('color','red').html('Please enter EmailID');
            $('#myModal .modal-body').html('Please enter EmailID');
            $('#myModal .modal-body').append(html);

          }
        })
      }

      MyAdmin.prototype.sendMobileotp =function(button){
        var ocid=$(button).attr('data-userid');
        var gocid = $(button).attr('gocid');
        var Mobile=$(button).attr('data-Mobile');
        if(Mobile!=''){
          $.post('/user/sendMobileVerifyOtp',{'ocid':ocid,'gocid':gocid,'Mobile':Mobile},function(data){
            if(data == "1"){
              $('#errMsg').css('color','red').html('OTP for Mobile Verification has been sent Successfully.');
            }else if(data=="3"){
              $('#errMsg').css('color','red').html('Mobile Number Already Exist.');
            }else{
              $('#errMsg').css('color','red').html('OTP did not Sent.');
            }
          }).fail(function(response) {
            let msg = response && response.responseText || 'OTP did not Sent.';
            $('#errMsg').css('color','red').html(msg);
          });
        }
      }     
      
      MyAdmin.prototype.verifyMobileOtp =function(button){
        var ocid=$(button).attr('data-userid');
        var gocid=$(button).attr('gocid');
        var verifyOtpNum=$("#verifyMobileOtpNum").val();
        var Mobile=$(button).attr('data-Mobile');
        if(verifyOtpNum!='' && ocid!='' && Mobile!=''){
          $.post('/user/MobileVerifyOtp',{'ocid':ocid,'gocid':gocid,'verifyOtpNum':verifyOtpNum,'Mobile':Mobile},function(data){
            if(data == "1"){
              $('#errMsg').css('color','red').html('Verification Successful.');
              document.location.reload();
            }else{
              $('#errMsg').css('color','red').html('Incorrect OTP. Re-Enter Correct Details.');
            }
          }).fail(function(response) {
            let msg = response && response.responseText || 'Verification UnSuccessful.';
            $('#errMsg').css('color','red').html(msg);
          });
        }
      }

      MyAdmin.prototype.sendMailVerifyOtp =function(button){
        var ocid=$(button).attr('data-userid');
        var gocid=$(button).attr('gocid');
        var emailId=$(button).attr('data-emailId');
        var screenName=$(button).attr('data-name');
        if(emailId!=''){
          $.post('/user/sendEmailVerifyOtp',{'ocid':ocid,'gocid' : gocid,'emailId':emailId,'screenName':screenName},function(data){
            if(data == "1"){
              $('#errMsg').css('color','red').html('OTP for Email Verification has been sent Successfully.');
            }else{
              $('#errMsg').css('color','red').html('OTP did not Sent.');
            }
          }).fail(function(response) {
            let msg = response && response.responseText || 'OTP did not Sent.';
            $('#errMsg').css('color','red').html(msg);
          });
        }
      }

      MyAdmin.prototype.submitEmailVerifyOtp =function(button){
        var ocid=$(button).attr('data-userid');
        var gocid=$(button).attr('gocid');
        var verifyOtpNum=$("#verifyOtpNum").val();
        if(verifyOtpNum!='' && ocid!=''){
          $.post('/user/EmailVerifyOtp',{'ocid':ocid,'gocid':gocid, 'verifyOtpNum':verifyOtpNum},function(data){
            if(data == "1"){
              $('#errMsg').css('color','red').html('Verification Successful.');
              document.location.reload();
            }else{
              $('#errMsg').css('color','red').html('Incorrect OTP. Re-Enter Correct Details.');
            }
          }).fail(function(response) {
            let msg = response && response.responseText || 'Verification UnSuccessful.';
            $('#errMsg').css('color','red').html(msg);
          });
        }
      }

      MyAdmin.prototype.collectingValues = function(button){
        var Obj = this;
        var docType = $(button).attr('data-doctype');
        var verifyData= $(button).attr('data-verify');
        var imgsrc= $(button).attr('data-msg');
        var ocid= $(button).attr('data-ocid');
        var gocid= $(button).attr('data-gocid');
        var ImageText= $(button).attr('data-ImageText');
        var imgsrc1='/admin/getImage';
    
        var Address1=$(button).attr('data-Address1');
        var Address2=$(button).attr('data-Address2');
        var City=$(button).attr('data-City');
        var State=$(button).attr('data-State');
        var PanNo=$(button).attr('data-PanNo');
        var AccHolderName=$(button).attr('data-AccHolderName');
        var AccountNumber=$(button).attr('data-AccountNumber');
        var BankName=$(button).attr('data-BankName');
        var IFSCCode=$(button).attr('data-IFSCCode');
        var KYCIDName=$(button).attr('data-KYCIDName');
        var KYCIDNumber=$(button).attr('data-KYCIDNumber');
        var CreationTime=$(button).attr('data-CreationTime');
        var ApproverID=$(button).attr('data-ApproverID');
        var ApproverDate=$(button).attr('data-ApproverDate');
        var Url=$(button).attr('data-Url');
        var blocked_states = $(button).attr('data-blocked-states');
        
    
    
        var newText='';
        $('#myModal .modal-title').html('Loading');
        $('#myModal .modal-body').html('<h3 style="text-align: center;">Please wait.</h3>');
        $.post(imgsrc1,{
          'ocid':ocid,
          'image':imgsrc
        }, function (data) {
          if (data) {
            //imgsrc='/admin/getImage?userid='+UserID+'&image='+imgsrc;
            $('#myModal .modal-dialog').css('width','40%');
            var imageHeader='<div  class="row" style="width:100%;"><button id="zoomInImg" class="btn btn-info">ZoomIn</button><button id="zoomOutImg" class="btn btn-info">ZoomOut</button><button id="imgRotate" class="btn btn-info">Rotate</button></div>';
            if (verifyData == 2) {
              $('#myModal .modal-body').html('<img width="100%" src="' + data + '"/><br><br><label">Rejected..</label>');
              //$('#myModal .modal-title').html(docType+" Details Verification Window");
              var docText=Obj.getDocumentsData(docType,Address1,Address2,City,State,PanNo,AccHolderName,AccountNumber,BankName,IFSCCode,KYCIDName,KYCIDNumber,CreationTime,ApproverID,ApproverDate);
              var docImageHeader=docText+imageHeader;
              $('#myModal .modal-title').html(docType+" Details Verification Window"+docImageHeader);
    
            } else if (verifyData == 1) {
              $('#myModal .modal-body').html('<div id="container"><img width="100%" src="' + data + '" id="userDocImage"/></div><br><label">Approved..</label>');
              //$('#myModal .modal-title').html(docType+" Details Verification Window");
              var docText=Obj.getDocumentsData(docType,Address1,Address2,City,State,PanNo,AccHolderName,AccountNumber,BankName,IFSCCode,KYCIDName,KYCIDNumber,CreationTime,ApproverID,ApproverDate);
              var docImageHeader=docText+imageHeader;
              $('#myModal .modal-title').html(docType+" Details Verification Window"+docImageHeader);
    
            } else {
                var messageSelectText=Obj.getRejectionComments('validate'+docType,blocked_states);
                var docText=Obj.getDocumentsData(docType,Address1,Address2,City,State,PanNo,AccHolderName,AccountNumber,BankName,IFSCCode,KYCIDName,KYCIDNumber,CreationTime,ApproverID,ApproverDate);
                var docImageHeader=docText+imageHeader;
                $('#myModal .modal-title').html(docType+" Details Verification Window"+docImageHeader);
                var html='<h1 style="display: none" id="cMsg"></h1><div id="container"><img width="100%" src="' + data + '" id="userDocImage"/></div><div id="errorres" style="display:none"></div><br>';
                if($('#otplogin').val()!='true'){
                html += '<button id="verification" class="btn btn-info btn-lg" data-href="/document/validate'+docType+'?flag=1&ocid=' + ocid +'&gocid='+gocid+ '">VERIFY</button>' +
                (docType=='KYC' && KYCIDName=='Aadhaar Card' && KYCIDNumber.length>12?'<input type="Number" maxlength="12" id="CheckAadharNumber" placeholder="Please Enter Aadhar Number" style="width: 50%;padding: 5px 10px;" required />&nbsp;&nbsp;<button id="AadharVerify" class="btn btn-info btn-lg">Click Aadhar Verify</button>':'')+
                '<button id="rejection" class="btn btn-info btn-lg" data-href="/document/validate'+docType+'?flag=2&ocid=' + ocid +'&gocid='+gocid+ '">REJECT</button>'+messageSelectText+
                 (docType=='PAN'?'<button id="panVerify" class="btn btn-info btn-lg">Pan Verify</button>':'')+
                 (docType=='Cheque'?'<button id="accountVerify" class="btn btn-info btn-lg" >Account Verify</button>':'')+
    
                '<br><br><div id="panContent" style="display:none"></div><div id="bankContent" style="display:none"></div><input type="text" required="" maxlength="512" id="rejectionMessage" placeholder="Enter Rejection Comments" style="display:none;width: 80%;padding: 5px 10px;"><br><br><h3 id="rejectionCommentMsg" style="color: red;display: none">Please Fill Rejection Comments.</h3>' +
                '<button id="submitbtn" class="btn btn-info btn-lg" style="display: none">Submit</button>' +
                '<button id="okaybtn" class="btn btn-info btn-lg" style="display: none">OK</button>' +
                '<button id="cancel" class="btn btn-info btn-lg" style="display: none">CANCEL</button><br></br>';
                }
                $('#myModal .modal-body').html(html);
                if(docType=='KYC' && KYCIDName=='Aadhaar Card' && KYCIDNumber.length>12){
                  $('#verification').hide();
                }
    
              $('#myModal').modal('show');
              $('#selectMessage').bind('change',function(){
                var selectVal = this.value;
                if(selectVal == "" || selectVal.toLowerCase() == "custom"){
                  selectVal = "";
                }
                $('#rejectionMessage').val(selectVal);
              });
              
              $('#verification,#rejection,#okaybtn,#cancel,#panVerify,#accountVerify,#AadharVerify,#submitbtn').bind('click', function () {
                switch (this.id) {
                  case "verification":
                  console.log('verification');
                    $('#verification,#rejection,#okaybtn,#cancel,#cMsg').toggle();
                    // if(docType=='KYC' && KYCIDName=='Aadhaar Card'  && KYCIDNumber.length>12){
                    //   $('#rejection').hide();
                    // }
                    $('#panVerify,#panContent,#accountVerify,#bankContent,#AadharVerify,#CheckAadharNumber').hide();               
                    $('#cMsg').html("Do You want to approve");
                    $('#okaybtn').attr('data-href', $(this).attr('data-href'));
                    break;
                  case "rejection":
                    $('#verification,#rejection,#okaybtn,#cancel,#rejectionMessage,#selectMessage,#cMsg').toggle();
                    $('#panVerify,#panContent,#accountVerify,#bankContent,#AadharVerify,#CheckAadharNumber,#errorres').hide();   
                    if(docType=='KYC' && KYCIDName=='Aadhaar Card'  && KYCIDNumber.length>12){
                      $('#verification').hide();
                    }            
                    $('#cMsg').html("Do You want to reject");
                    $('#okaybtn').attr('data-href', $(this).attr('data-href'));
                    break;
                  case "AadharVerify":
                    //$('#submitbtn,#cancel,#CheckAadharNumber,#cMsg').toggle();
                    //$('#panVerify,#panContent,#accountVerify,#bankContent,#verification,#rejection,#rejectionMessage,#selectMessage,#AadharVerify').hide();               
                    var CheckAadharNumber=$("#CheckAadharNumber").val();
                    if (CheckAadharNumber == '') {
                      $('#errorres').show();
                      $('#errorres').css({"color":"red",'font-size':'medium'}).html("Error: Please Enter Aadhar Number.");
                    }else{
                      adhar = CheckAadharNumber;
                      var adharcard = /^\d{12}$/;
                      if (adhar != '') {
                        if (!adhar.match(adharcard)) {
                          $('#errorres').show();
                          $('#errorres').css({"color":"red",'font-size':'medium'}).html("Error: Invalid Aadhar Number Length : "+CheckAadharNumber);
                            return false;
                         }
                       }
                    console.log('CheckAadharNumber',CheckAadharNumber);
                    $.post('/admin/AadharVerify',{'AadharNumber':CheckAadharNumber,'ocid':ocid},function(data){
                      console.log('data',data);
                      if(data==1){
                        
                        $('#verification,#rejection,#okaybtn,#rejectionMessage,#selectMessage,#cMsg').toggle();
                        $('#CheckAadharNumber,#AadharVerify,#cancel,#okaybtn,#submitbtn,#rejectionMessage,#selectMessage').hide();
                        $("#rejection").show();
                        $("#errorres").show();
                        $('#errorres').css({"color":"green",'font-size':'medium'}).html("Aadhaar Card Verify Successfully ::"+CheckAadharNumber);
                      }else{
                        $("#CheckAadharNumber").show();
                        $("#AadharVerify").show();
                        $("#rejection").show();
                        $('#errorres').toggle();
                        $('#okaybtn,#submitbtn,#verification,#cancel,#rejectionMessage,#selectMessage').hide();
                        $("#errorres").show();
                        $('#errorres').css({"color":"red",'font-size':'medium'}).html("Error: While Verifying Aadhaar Card Number ::"+CheckAadharNumber);
                      }
                    });
                  }  
                    //$('#cMsg').html("Do You want to Verify");
                    //$('#okaybtn').attr('data-href', $(this).attr('data-href'));
                    break;
                  
                  case "okaybtn":
                    $(this).attr('id','okaybtn_clicked');
                    $(this).html('Please Wait..');  
                    $('#panVerify,#panContent,#accountVerify,#AadharVerify').hide();
                    $("#cancel").attr('disabled',true);               
                    if ($('#rejectionMessage').css('display') != 'none') {
                      if ($('#rejectionMessage').val() == '') {
                        $('#rejectionCommentMsg').show();
                      } else {
                        window.location = $(this).attr('data-href') + '&rejectionComments=' + $('#rejectionMessage').val();
                      }
                    } else {
                      window.location = $(this).attr('data-href');
                    }
                    break;
                  case "cancel":
                    $('#verification,#rejection,#cancel,#cMsg,#panVerify,#accountVerify,#AadharVerify,#CheckAadharNumber').toggle();
                    $('#rejectionMessage,#rejectionCommentMsg,#selectMessage,#panContent,#bankContent,#submitbtn,#okaybtn').hide();
                    if(docType=='KYC' && KYCIDName=='Aadhaar Card'  && KYCIDNumber.length>12){
                      $('#verification').hide();
                    }
                    break;
    
                  case "panVerify":
                    //$("#panContent").show(function(){$(this).html("Loading..");});
                    $("#panContent").show();
                    $("#panContent").html("Loading..");
                    
                      $.post('/document/CheckPanBankStatus',{'PAN':PanNo, 'Url':Url, 'ocid':ocid},function(data){
                        if(data){
                          try{
                            data = JSON.parse(data);
                          }catch(e){}
                          var newText = '';
                            newText = Obj.generateTabularText("Pan Number",PanNo);
                            if(Url=='pan-lite'){
                              for(var key in data){
                                if(key!='data'){
                                  newText += Obj.generateTabularText(key,data[key]);
                                }else{
                                    newText += Obj.generateTabularText('pan_number',data[key]['pan_number'] || '');
                                    newText += Obj.generateTabularText('Pan Status',data[key]['pan_status'] || '');
                                    newText += Obj.generateTabularText('Name',data[key]['name'] || '');
                                    newText += Obj.generateTabularText('PAN Type',data[key]['pan_type'] || '');
                                }
                              }
                            }else{
                              for(var key in data){
                                if(key!='data'){
                                  newText += Obj.generateTabularText(key,data[key]);
                                }else{
                                    newText += Obj.generateTabularText('pan_number',data[key][0]['pan_number'] || '');
                                    newText += Obj.generateTabularText('Pan Status',data[key][0]['pan_status'] || '');
                                    newText += Obj.generateTabularText('First Name',data[key][0]['first_name'] || '');
                                    newText += Obj.generateTabularText('Middle Name',data[key][0]['middle_name'] || '');
                                    newText += Obj.generateTabularText('Last Name',data[key][0]['last_name'] || '');
                                }
                              }
                            }
                            $("#panContent").html(newText);
                        }
                      });
                    break;
                    case "accountVerify":
                    $("#bankContent").show();
                    $("#bankContent").html("Loading..");
                      $.post('/document/CheckPanBankStatus',{'AccountNumber':AccountNumber,'IFSCCode':IFSCCode,'Url':'VERIFY-BANK','ocid':ocid},function(data){
                        if(data){
                          try{
                            data = JSON.parse(data);
                          }catch(e){}
                          var newText = '';
                            newText = Obj.generateTabularText("Account Number",AccountNumber);
                            for(var key in data){
                              if(key!='data'){
                                newText += Obj.generateTabularText(key,data[key]);
                              }else{
                                for(var key2 in data[key]){
                                  newText += Obj.generateTabularText(key2,data[key][key2] || '');
                                }
                              }
                            }
                          //Obj.showPopupMessage("Pan APi Response: "+html+AccountNumber, newText);
                          $("#bankContent").html(newText);
                        }
                      });
                    break;
                }
              });
            }
    
    
            var angle = 0,img = document.getElementById('userDocImage'), rect = img.getBoundingClientRect();
            $('#imgRotate').bind('click',function(){
              angle = (angle + 90) % 360;
    
              $('#myModal .modal-body #container').attr('class',"rotate" + angle).css('min-height',rect.width+'px').css('min-width',rect.height+'px');
            });
    
            // $('#zoomImg').bind('click',function(e){
            //   e.preventDefault();
            //   e.stopPropagation();
            //   $('#myModal').toggleClass('zoom');
            // });
    
            
    
            $('#zoomInImg').bind('click',function(e){
              var myImg = document.getElementById("userDocImage");
              var currWidth = myImg.clientWidth;
              if(currWidth == 1000000){
                  alert("Maximum zoom-in level of 1 Million reached.");
              } else{
                  myImg.style.width = (currWidth + 400) + "px";
              } 
          });
    
          $('#zoomOutImg').bind('click',function(e){
            var myImg = document.getElementById("userDocImage");
            var currWidth = myImg.clientWidth;
            if(currWidth == 500000){
                alert("Maximum zoom-out level reached.");
            } else{
                myImg.style.width = (currWidth - 400) + "px";
            }
          });
    
    
          }
        });
     }

     MyAdmin.prototype.CheckSameAccountHolder=function(button){
      var Obj = this;
      var AccountNumber = $(button).attr('data-AccountNumber');
      $('#myModal .modal-title').html('Loading');
      $('#myModal .modal-body').html('<h3 style="text-align: center;">Please wait.</h3>');      
      if(AccountNumber!='' && AccountNumber != '0'){
        $.post('/document/sameAccountHolder',{'AccountNumber':AccountNumber},function(data){
          if(data){
            var newText = '';
            var newText = "<h3>Same Account Holder Users</h3>";
            var uId = null,AccNo='';
            var objectRes=data;
            AccNo = objectRes[0].AccNo;
            newText += 'Account Number: '+AccNo+'<br>';
            newText += Obj.generateTabularText("OCID","GOCID");
            for(var i in objectRes) {
              uId = objectRes[i].OCID;
              gocid = objectRes[i].GOCID;
              newText += Obj.generateTabularText('<a  href="/user/viewDetails?gocid='+gocid+'">'+uId+'</a>','<a  href="/user/viewDetails?gocid='+gocid+'">'+gocid+'</a>');
            }
    
            if(newText) {
              Obj.showPopupMessage(newText, '');
            }else{
              Obj.showPopupMessage("Error:",+data);
            }
          }else if(data==0){
            Obj.showPopupMessage("Still Under Process",data.message);
          }
        }).fail(function(response) {
          let msg = response && response.responseText || 'Error';
          Obj.showPopupMessage("Error:", msg);
        });
      } else {
        $('#myModal .modal-title').html('');
        $('#myModal .modal-body').html('No Data Found.');  
      }
     }
     
     MyAdmin.prototype.CheckSameKYCID=function(button){
      var Obj = this;
      var KYCIDNumber = $(button).attr('data-KYCIDNumber');
      $('#myModal .modal-title').html('Loading');
      $('#myModal .modal-body').html('<h3 style="text-align: center;">Please wait.</h3>');
      if(KYCIDNumber!=''){
        $.post('/document/sameKycIdNumberHolder',{'KYCIDNumber':KYCIDNumber},function(data){
          if(data){
            var newText = '';
            var newText = "<h3>Same KYCNumber Users</h3>";
            var uId = null,KYCIDNumber='';
            var objectRes=data;
            KYCIDNumber = objectRes[0].KYCIDNumber;
            newText += 'KYCID Number: '+KYCIDNumber+'<br>';
            newText += Obj.generateTabularText("OCID","GOCID");
            for(var i in objectRes) {
              uId = objectRes[i].OCID;
              gocid = objectRes[i].GOCID;
              newText += Obj.generateTabularText('<a  href="/user/viewDetails?gocid='+gocid+'">'+uId+'</a>','<a  href="/user/viewDetails?gocid='+gocid+'">'+gocid+'</a>');
            }
    
            if(newText) {
              Obj.showPopupMessage(newText, '');
            }else{
              Obj.showPopupMessage("Error:",+data);
            }
          }else if(data==0){
            Obj.showPopupMessage("Still Under Process",data.message);
          }
        }).fail(function(response) {
          let msg = response && response.responseText || 'Error';
          Obj.showPopupMessage("Error: ", msg);
        });
      } else {
        $('#myModal .modal-title').html('');
        $('#myModal .modal-body').html('No Data Found.');         
      }
     }

      MyAdmin.prototype.generateTabularText = function(key,value,w1='30%',w2='70%'){
        return "<div style='border-bottom: 1px solid #ccc;'><span style='width:"+w1+";display: inline-block;vertical-align: middle;word-wrap: break-word'>" + key + "</span><span style='width:"+w2+";display: inline-block;word-wrap: break-word;vertical-align: middle;'>" +value + "</span></div>";
      }

      MyAdmin.prototype.showPopupMessage = function(title,msg){
        $('#myModal .modal-body').html(msg);
        $('#myModal .modal-title').html(title);
        $('#myModal').modal('show');
      }

      MyAdmin.prototype.getDocumentsData=function(docType,Address1,Address2,City,State,PanNo,Name,AccountNumber,BankName,IFSCCode,KYCIDName,KYCIDNumber,CreationTime,ApproverID,ApproverDate){
        var table = '<table class="table" width="100%">';
        var thead = '', tbody = '<tr>';
    
        if(docType=='Address'){
          thead += "<th style='padding:8px;width:17%;font-size: medium;font-style: italic;color: brown;'>Address 1</th>";
          thead += "<th style='padding:8px;width:17%;font-size: medium;font-style: italic;color: brown;'>Address 2</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>City</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>State</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>KYCIDNumber</th>";
          
    
          tbody += "<th style='padding:8px;'>"+Address1+"</th>";
          tbody += "<th style='padding:8px;'>"+Address2+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+City+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+State+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+KYCIDNumber+"</th>";
         
    
          if(thead!=''){
            thead = "<tr>"+thead+"</tr>";
          }
          table+=thead+tbody+"</tr>";
    
        }else if(docType=='PAN'){
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Pan No</th>";
          //thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Creation Time</th>";
          //thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Pan Approver ID</th>";
          //thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Pan Approver Date</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+PanNo+"</th>";
          //tbody += "<th style='padding:8px;font-size: small;'>"+CreationTime+"</th>";
          //tbody += "<th style='padding:8px;font-size: small;'>"+ApproverID+"</th>";
          //tbody += "<th style='padding:8px;font-size: small;'>"+ApproverDate+"</th>";
    
          if(thead!=''){
            thead = "<tr>"+thead+"</tr>";
          }
          table+=thead+tbody+"</tr>";
    
        }else if(docType=='Cheque'){
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Name</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Account Number</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Bank Name</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>IFSC Code</th>";
          //thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Creation Time</th>";
          //thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Approver ID</th>";
          //thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>Approved Date</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+Name+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+AccountNumber+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+BankName+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+IFSCCode+"</th>";
          //tbody += "<th style='padding:8px;font-size: small;'>"+CreationTime+"</th>";
          //tbody += "<th style='padding:8px;font-size: small;'>"+ApproverID+"</th>";
          //tbody += "<th style='padding:8px;font-size: small;'>"+ApproverDate+"</th>";
    
          if(thead!=''){
            thead = "<tr>"+thead+"</tr>";
          }
          table+=thead+tbody+"</tr>";
    
        }else if(docType=='KYC'){
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>KYC ID Name</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>KYC ID Number</th>";
          thead += "<th style='padding:8px;width:17%;font-size: medium;font-style: italic;color: brown;'>Address 1</th>";
          thead += "<th style='padding:8px;width:17%;font-size: medium;font-style: italic;color: brown;'>Address 2</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>City</th>";
          thead += "<th style='padding:8px;font-size: medium;font-style: italic;color: brown;'>State</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+KYCIDName+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+KYCIDNumber+"</th>";
          tbody += "<th style='padding:8px;width:17%;font-size: small;'>"+Address1+"</th>";
          tbody += "<th style='padding:8px;width:17%;font-size: small;'>"+Address2+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+City+"</th>";
          tbody += "<th style='padding:8px;font-size: small;'>"+State+"</th>";
         
          if(thead!=''){
            thead = "<tr>"+thead+"</tr>";
          }
          table+=thead+tbody+"</tr>";
    
        }
    
        ;
    
        response='<div  class="row" style="width:100%;overflow:auto;padding-top:20px;">'+table+'</div>';
    
        return response;
      }

      MyAdmin.prototype.getRejectionComments=function(type,GameBlockedState){
        var Obj=this;
        console.log('type',type);
        if(type=='validateCheque'){
              this.rejectionMessageList = [
             'Custom',
             'Document uploaded is unclear',
             //'Account Blocked - Verification cannot be proceed',
             //'Document Does not Belong to Account Holder',
             //'Upload PAN and KYC before uploading bank details',
             //'Document does not have a Photo Identification',
             'Please upload cheque/passbook/Bank details with visible/printed Account holder name, account number and IFSC code',
             'Please upload clear and complete picture of your document',
             'Please upload coloured version of the document attached',
             'Bank Account Number not readable in document attached',
             'Bank Account Number does not match provided Document',
             'Bank Ifsc code not visible/readable in document attached',
             'Bank Ifsc code does not match provided Document',
             'Bank Account Holder Name does not Match PlayRummy Account Holder Name',
             'Kindly upload passbook since your cheque does not mention Account holder Name',
             'Bank Account Holder Name does not Match the PlayRummy User Name'
           ];
           if(GameBlockedState) this.rejectionMessageList.push(GameBlockedState + ' users not allowed');
        }else if(type=='validatePAN'){
             this.rejectionMessageList = [
             'Custom',
             //'Document uploaded is unclear',
             //'Account Blocked - Verification cannot be proceed',
             //'Document Does not Belong to Account Holder',
             //'Upload PAN and KYC before uploading bank details',
             'Pan Card is Fake',
             'Document does not have a Photo Identification',
             'Please upload coloured version of the document attached',
             'Pan Number Does not Match Provided Document',
             'Pan uploaded is unclear',
             'Pan Holder Name Does not Match PlayRummy Account Holder Name',
             'Please upload front side of your original Pancard for Pan Number verification',
             'Please upload clear and complete picture of your document',
             'Pan number is not readable',
             'Pan Holder Name Does not Match the PlayRummy User Name'
           ];
           if(GameBlockedState) this.rejectionMessageList.push(GameBlockedState + ' users not allowed');
        }else if(type=='validateAddress'){
             this.rejectionMessageList = [
             'Custom',
             'Document uploaded is unclear',
             //'Account Blocked - Verification cannot be proceed',
             //'Document Does not Belong to Account Holder',
             //'Document does not have a Photo Identification',
             'Please upload coloured version of the document attached',
             'Address Proof does not match provided Document',
             'Please upload back side of your original aadhaar card, voter ID or Passport',
             'Address uploaded is not readable in the document attached',
             'Please upload clear and complete picture of your document'
           ];
           if(GameBlockedState) this.rejectionMessageList.push(GameBlockedState + ' users not allowed');
        }else if(type=='validateKYC'){
           this.rejectionMessageList = [
           'Custom',
           'Document uploaded is unclear',
           //'Account Blocked - Verification cannot be proceed',
           //'Document Does not Belong to Account Holder',
           //'Uploaded PAN and KYC required before uploading bank details',
           'KYC - Please Upload Front of Aadhar, Passport, Voter ID or Driving licence',
           'Document does not have a Photo Identification',
           'Please upload coloured version of the document attached',
           'KYC number does not match provided Document',
           'KYC - Please Upload Front of Aadhar, Passport, Voter ID',
           'KYC Name does not match provided Document',
           //'KYC uploaded is not readable for successful Verification',
          'Please upload clear and complete picture of your document',
          'KYC ID Name Does not Match the PlayRummy User Name'
   
         ];
         if(GameBlockedState) this.rejectionMessageList.push(GameBlockedState + ' users not allowed');
        }else if(type=='validatewithdrawal'){
         //validatewithdrawal
         this.rejectionMessageList = [
           'Custom',
           'Bank Returned',
           'Deposit Fraud',
           'Document Fraud',
           'Document Incorrect',
           'Pool Fraud',
           'Point Fraud',
           'Refer Fraud',
          'Multiple Account Fraud',
          'Account Under Suspension',
          'Users Request',
          'Rejected for Other reasons',
          'State Block Related',
          'Testing/Internal',
          'System Error'
         ];
   
        }
       var messageSelectText = '<select id="selectMessage" style="display:none;height: 35px;width: 80%;">';
                   for(var i in Obj.rejectionMessageList){
                     messageSelectText += '<option value="'+Obj.rejectionMessageList[i]+'">'+Obj.rejectionMessageList[i]+'</option>';
                   }
                   messageSelectText += '</select>';
   
             return messageSelectText;
   
     }

     MyAdmin.prototype.rejectingApprovedValues = function(button){
      var Obj = this;
      var docType = $(button).attr('data-doctype');
      var rejectedData= $(button).attr('data-msg');
      var ocid= $(button).attr('data-ocid');
      var gocid = $(button).attr('data-gocid');
      var blocked_states = $(button).attr('data-blocked-states');
     //  var src1='/admin/setPending';
      $('#myModal .modal-title').html('Loading');
      $('#myModal .modal-body').html('<h3 style="text-align: center;">Please wait.</h3>');
      var messageSelectText = Obj.getRejectionComments('validate'+docType,blocked_states);
     //  $.post(src1,{
     //    'userid':UserID,
     //    'docType':docType
     //  }, function (data) {
        if (ocid) {
            $('#myModal .modal-body').html('<h1 style="display: none" id="cMsg"></h1>' +
            '<tr><td>&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;</td><td><button id="rejection" class="btn btn-info btn-lg" data-href="/document/validate'+docType+'?flag=2&ocid=' + ocid + '&gocid='+gocid+'">REJECT</button></td>'+
            '<td>&nbsp;&nbsp;&nbsp;</td><td><button id="cancelButtonId" class="btn btn-info btn-lg" style="display: show">CANCEL</button></td></tr><tr>'+messageSelectText+
            '</tr><br><br><tr><input type="text" required="" maxlength="512" id="rejectionMessage" placeholder="Enter Rejection Comments" style="display:none;height:35px;width:80%;margin-left:35px;"></tr>' +
            '<br><tr><h5 id="rejectionCommentMsg" style="color: red;display: none">Please Fill Rejection Comments.</h5></tr><br>'+
            '<tr><td><button id="okaybtn" class="btn btn-info btn-lg" style="display: none">OK</button></td>'+
            '<td>&nbsp;&nbsp;&nbsp;</td><td><button id="cancelereject" class="btn btn-info btn-lg" style="display: none">CANCEL</button></td></tr>');
             $('#myModal .modal-title').html("Reject Window");
             $('#selectMessage').bind('change',function(){
               var selectVal = this.value;
               if(selectVal == "" || selectVal.toLowerCase() == "custom"){
                 selectVal = "";
               }
               $('#rejectionMessage').val(selectVal);
             });
               $('#verification,#rejection,#okaybtn,#cancelButtonId,#cancelereject').bind('click',function(){
               switch(this.id){
                case "cancelereject":
                  $('#verification,#rejection,#okaybtn,#cancel,#cMsg').toggle();
                  $('#cMsg').html("Do You want to Reject");
                  $('#okaybtn').attr('data-href',$(this).attr('data-href'));
                  $('#myModal').modal('hide');
                  break;
                  case "cancelButtonId":
                  $('#myModal').modal('hide');
                  break;
                case "rejection":
                  $('#rejection,#okaybtn,#cancelButtonId,#rejectionMessage,#cMsg,#cancelereject,#selectMessage').toggle();
                  $('#cMsg').html("Do You want to reject");
                  $('#okaybtn').attr('data-href',$(this).attr('data-href'));
                  break;
                case "okaybtn":
                     $(this).attr('id','okaybtn_clicked');
                     $(this).html('Please Wait..');
                  var link = $(this).attr('data-href');
                  if($('#rejectionMessage').css('display')!='none'){
                    if($('#rejectionMessage').val()==''){
                      $('#rejectionCommentMsg').show();
                    }else{
                      window.location = $(this).attr('data-href') + '&rejectionComments=' + $('#rejectionMessage').val();
                    }
               }else{
                 window.location = $(this).attr('data-href');
               }
                break;
          }
       });
    }
//});
}



      $('#showUserProfileInfo').bind('click',function(e){
        e.preventDefault();
        var ocid = $(this).attr('data-userid');
        var gocid = $(this).attr('data-gocid');
        
          var html = '<div align="center">Loading...</div>';
          $('#myModal .modal-title').html("Edit User Details");
          $('#myModal .modal-body').html(html);
          $('#myModal .modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
          $.get('/document/editUserProfile', { ocid, gocid }, resHtml => {
            $('#myModal .modal-body').html(resHtml);
            $('#myModal .modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
          }).fail(xhr => {
            $('#myModal .modal-body').html('<div align="center">ERROR...</div>');
            $('#myModal .modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
            if (xhr.status == 503) {
              window.location.href = '/';
            }
          })
      });

      $('.kycRej,.PANRej,.AddRej,.BankRej').bind('click',function(e) {
        e.preventDefault();
        var list = $(this).attr('data-doclist');
        var value = $(this).attr('data-doctype');
        var ocid = $(this).attr('data-ocid');
        var ImageText = $(this).attr('data-ImageText');
        var RejectID = $(this).attr('data-ApproverID');
        var RejectedBy = $(this).attr('data-RejectedBy');
        var requestDate = $(this).attr('data-CreationTime');
        var imgsrc = value.split('|')[0];
        var comments = value.split('|')[1];
        var docType = $(this).attr('data-doc');
        var approverName = $(this).attr('data-approverList');
        var table;
        //var imgsrc1 = '/admin/getImage';
        var imgsrc1 = '/document/getImageList';
        if(ImageText == null||ImageText == "null"){
          ImageText = '';
        }
        $('#myModal .modal-title').html('Loading');
        $('#myModal .modal-body').html('<h3 style="text-align: center;">Please wait.</h3>');
        $('#myModal .modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
        list = list.split('||');
        for(var i in list){
          list[i]=list[i].split('|');
        }
        var listImage = [];
      for(var i in list){
        listImage.push(list[i][0]);
      }
      
      $.post(imgsrc1, {
        'ocid': ocid,
        'image': listImage
      }, function (data) {
          if (data) {
            for(var i in data)
          {
            var comments = list[i][1];
            var docId=list[i][4];
      var rejectedDate=list[i][5];
            var RejectedBy=list[i][2];
            if(docType=="Address"){
              var fields = list[i][3].split("::")
              if(fields.length == 8 )
            {
              var approvedBy = fields[6];
              var approvedDate = fields[7];
            }else if(fields.length == 7 ){
              var approvedBy = fields[5];
              var approvedDate = fields[6];
            }else{
              var approvedBy = '-';
              var approvedDate = '-';
            }
            } else if(docType=="PAN"){
              var fields = list[i][3].split("::")
              if(fields.length == 3 )
            {
              var approvedBy = fields[1];
              var approvedDate = fields[2];
            }else{
              var approvedBy = '-';
              var approvedDate = '-';
            }          
            }else if(docType=="Bank"){
              var fields = list[i][3].split("::")
              if(fields.length == 6 )
            {
              var approvedBy = fields[4];
              var approvedDate = fields[5];
            }else{
              var approvedBy = '-';
              var approvedDate = '-';
            } 
          }else if(docType=="KYC"){
              var fields = list[i][3].split("::")
              if(fields.length == 4 )
            {
              var approvedBy = fields[2];
              var approvedDate = fields[3];
            }else{
              var approvedBy = '-';
              var approvedDate = '-';
            }  
          }
          
          var approver = '-';
          if(approvedBy!='-'){
            if(approverName != null)
            {
              var nameList = approverName.split('||')
              for(var j in nameList)
              {
                var adminId = nameList[j].split('|')[0];
                var name = nameList[j].split('|')[1];
                if(adminId == approvedBy)
                {
                  var approver = name || '-';
                  break;
                }
              }
    
            }else{
              var approver = '-';
            }
          }else{
            var approver = '-';
          }
            
            
            if(i==0)
            { 
              table = '<div  class="row"><table class="table">';
            }else{
              table += '<div  class="row"><table class="table">';
            }
            tbody = '<tr>';
            tbody += "<th style='font-size: medium;font-style: bold;padding-top: 30px;'>Comments:</th>";
            tbody += "<td style='font-size: medium;text-align:left;padding-top: 30px;'>"+comments+"</td></tr>";
            tbody += "<tr><th style='font-size: medium;font-style: bold;'>Rejected By: </th>";
            tbody += "<td style='font-size: medium;text-align:left;'>"+RejectedBy+"</td></tr>";
      tbody += "<tr><th style='font-size: medium;font-style: bold;'>Rejected Date: </th>";
            tbody += "<td style='font-size: medium;text-align:left;'>"+rejectedDate+"</td></tr>";
            tbody += "<tr><th style='font-size: medium;font-style: bold;'>Approved By: </th>";
            tbody += "<td style='font-size: medium;text-align:left;'>"+approver+"</td></tr>";
      tbody += "<tr><th style='font-size: medium;font-style: bold;'>Approved Date: </th>";
            tbody += "<td style='font-size: medium;text-align:left;'>"+approvedDate+"</td></tr>";
            tbody += "<tr><th style='font-size: medium;font-style: bold;'>Document: </th>";
            tbody += "<td style='font-size: medium;text-align:left;'></td></tr>";
            table+=tbody+"</tr></table></div><img width='100%' src='" + data[i] + "'/>";
          }
    
    
           
            $('#myModal .modal-body').html(table)
           // $('#myModal .modal-body').append('<img width="100%" src="' + data + '"/>');
            $('#myModal .modal-title').html("Rejected Document");
          }
        });
      });

      $('.kycReset,.panReset,.addReset,.bankReset').bind('click',function(e) {
        e.preventDefault();
        var list = $(this).attr('data-doclist');
        var ocid = $(this).attr('data-ocid');
        var gocid = $(this).attr('data-gocid');
        var docType = $(this).attr('data-docType');
        var approverName = $(this).attr('data-approverList');
        var bankID = $(this).attr('bankID');
        list = list.split('||');
        for(var i in list){
          list[i]=list[i].split('|');
        }
        var imgsrc = '/document/getImageList';
        var table;
        var tbody;
        $('#myModal .modal-title').html('Loading');
        $('#myModal .modal-body').html('<h3 style="text-align: center;">Please wait.</h3>');
        $('#myModal .modal-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
        var listImage = [];
        for(var i in list){
          listImage.push(list[i][0]);
        }
        $.post(imgsrc, {
          'ocid': ocid,
          'image': listImage
        }, function (data) {
          if (data) {
            for(var i in data)
            {
              var comments = list[i][1];
              var docId=list[i][4];
        var rejectedDate=list[i][5];
              var RejectedBy=list[i][2];
              if(docType=="Address"){
                var fields = list[i][3].split("::")
                if(fields.length == 8 )
              {
                var approvedBy = fields[6];
                var approvedDate = fields[7];
              }else if(fields.length == 7 ){
                var approvedBy = fields[5];
                var approvedDate = fields[6];
              }else{
                var approvedBy = '-';
                var approvedDate = '-';
              }
              } else if(docType=="PAN"){
                var fields = list[i][3].split("::")
                if(fields.length == 3 )
              {
                var approvedBy = fields[1];
                var approvedDate = fields[2];
              }else{
                var approvedBy = '-';
                var approvedDate = '-';
              }          
              }else if(docType=="Bank"){
                var fields = list[i][3].split("::")
                if(fields.length == 6 )
              {
                var approvedBy = fields[4];
                var approvedDate = fields[5];
              }else{
                var approvedBy = '-';
                var approvedDate = '-';
              } 
            }else if(docType=="KYC"){
                var fields = list[i][3].split("::")
                if(fields.length == 4 )
              {
                var approvedBy = fields[2];
                var approvedDate = fields[3];
              }else{
                var approvedBy = '-';
                var approvedDate = '-';
              }  
            }
            
            var approver = '-';
            if(approvedBy!='-'){
              if(approverName != null)
              {
                var nameList = approverName.split('||')
                for(var j in nameList)
                {
                  var adminId = nameList[j].split('|')[0];
                  var name = nameList[j].split('|')[1];
                  if(adminId == approvedBy)
                  {
                    var approver = name || '-';
                    break;
                  }
                }
      
              }else{
                var approver = '-';
              }
            }else{
              var approver = '-';
            }
              if(i==0)
              { 
                table = '<div  class="row"><table class="table">';
              }else{
                table += '<div  class="row"><table class="table">';
              }
      
              tbody = '<tr>';
              tbody += "<th style='font-size: medium;font-style: bold;padding-top: 30px;'>Comments:</th>";
              tbody += "<td style='font-size: medium;text-align:left;padding-top: 30px;'>"+comments+"</td></tr>";
              tbody += "<tr><th style='font-size: medium;font-style: bold;'>Rejected By: </th>";
              tbody += "<td style='font-size: medium;text-align:left;'>"+RejectedBy+"</td></tr>";
        tbody += "<tr><th style='font-size: medium;font-style: bold;'>Rejected Date: </th>";
              tbody += "<td style='font-size: medium;text-align:left;'>"+rejectedDate+"</td></tr>";
              tbody += "<tr><th style='font-size: medium;font-style: bold;'>Approved By: </th>";
              tbody += "<td style='font-size: medium;text-align:left;'>"+approver+"</td></tr>";
        tbody += "<tr><th style='font-size: medium;font-style: bold;'>Approved Date: </th>";
              tbody += "<td style='font-size: medium;text-align:left;'>"+approvedDate+"</td></tr>";
              tbody += "<tr><th style='font-size: medium;font-style: bold;'>Reset: </th>";
              tbody += "<td><input type='radio' id='rejectedDocReset' name='rejectedDocReset' value="+docId+"></td></tr>";
              tbody += "<tr><th style='font-size: medium;font-style: bold;'>Document: </th>";
              tbody += "<td style='font-size: medium;text-align:left;'></td></tr>";
              table+=tbody+"</tr></table></div><img width='100%' src='" + data[i] + "'/>";
            }
            $('#myModal .modal-body').html(table);
            $('#myModal .modal-title').html("Rejected Document <h4 id='msg'></h4>");
            $('#myModal .modal-footer').html('<button id="resetbtn" class="btn btn-info btn-lg">Reset</button><button type="button" class="btn btn-info btn-lg" data-dismiss="modal">Close</button>');
            $('#resetbtn').bind('click',function(){
              if(document.querySelector('input[name = rejectedDocReset]:checked'))
              {
                var docPath;
                var message;
                for(var i in list)
                {
                  if(list[i][4] === document.querySelector('input[name = rejectedDocReset]:checked').value)
                  {
                    docPath = list[i][0];
                    message = (list[i][3]).toString();
                    break;
                  }
                }
                $.post('/document/resetDoc', {'ocid': ocid,'docType': docType,'docPath':docPath,'message': message, location: ('data-doclist'), 'bankID':bankID }, function(data){
                  if(data)
                  {
                    $('#msg').css({'color':'green'}).html('DOCUMENT RESET SUCCESSFULLY ');
                    window.location = '/document/docInfo?gocid='+gocid;
                  }else{
                    $('#msg').css({'color':'red'}).html('ERROR :: DOCUMENT RESET NOT DONE');
                  }
                }).fail(function(response) {
                  let msg = response && response.responseText || 'Error';
                  $('#msg').css({'color':'red'}).html(msg);
                });
              }else{
                $('#msg').css({'color':'red'}).html('CHOOSE ONE DOCUMENT TO RESET');
              }
            })
          }  
        });
      });

      MyAdmin.prototype.allDocReview=function(list){
        var addrdocloc = $(list).attr('data-addrdocloc');
        var pandocloc = $(list).attr('data-pandocloc');
        var blankcheque = JSON.parse($(list).attr('data-blankchequeloc'));
        var kyciddocloc = $(list).attr('data-kyciddocloc');
        $('#myModal .modal-title').html("Documents List");

        var img='';
        if(addrdocloc && addrdocloc!='null'){
           img +="Address Documents<img width='100%' title='Address Documents' src='" + addrdocloc + "'/><br><br>";
        }
        if(pandocloc && pandocloc!='null'){
           img +="Pan Documents<img width='100%' title='Pan Documents' src='" + pandocloc + "'/><br><br>";
        }
        if(blankcheque && blankcheque!='null'){
          img +='Bank Documents<br><br>';
          for(let i=0; i< blankcheque.length;i++){
            if(blankcheque[i].BlankChequeLoc !=  null){
              img +='Bank Name : ' + blankcheque[i].BankName + '<br> <img width="100%" title="Bank Documents" src="' + blankcheque[i].BlankChequeLoc+ '"/><br><br>';
            }
          }
        }
        if(kyciddocloc && kyciddocloc!='null'){
           img +='Kyc Documents<img width="100%" title="Kyc Documents" src="' + kyciddocloc + '"/><br><br>';
        }
        $('#myModal .modal-body').html('<div>'+img+'</div>');
      }

      var tableOrderColumn = 0;  // global settings
      var tableOrderColumnDirection = "asc"; // global settings
      if($('#mytable')){
        var attr1 = $('#mytable').attr("data-column");
          if(typeof attr1 !== typeof undefined && attr1 !== false){
            tableOrderColumn = attr1;
          }
          var attr2 = $('#mytable').attr("data-columnorder");
          if(typeof attr2 !== typeof undefined && attr2 !== false){
            tableOrderColumnDirection = attr2;
          }
      }

       $('#mytable').dataTable().fnDestroy();
    // Setup - add a text input to each footer cell
      $('#mytable tfoot th').each( function () {
        var title = $(this).text();
        var input = $(this).data('input');
        if(input!='no'){
            $(this).html( '<input class="form-control input-md" type="text" id="tablesearch" placeholder="Find '+title+'" />' );
        }
      } );

      // DataTable
      
      if($('#mytable').hasClass('increaseDataTable')){
      		var table = $('#mytable').DataTable({
        drawCallback: function(settings) {
          var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
          pagination.toggle(this.api().page.info().pages > 1);
        },
        "iDisplayLength": 100,
        "order": [[ tableOrderColumn,tableOrderColumnDirection ]],
        "lengthMenu": [[25, 50, 100, 200,400,500,600,800,1000,2000,5000,8000,10000], [25, 50, 100,200,400,500,600,800,1000,2000,5000,8000,10000]]
      });
	}else{	
      var table = $('#mytable').DataTable({
        drawCallback: function(settings) {
          var pagination = $(this).closest('.dataTables_wrapper').find('.dataTables_paginate');
          pagination.toggle(this.api().page.info().pages > 1);
        },
        "iDisplayLength": 100,
        "order": [[ tableOrderColumn,tableOrderColumnDirection ]],
        "lengthMenu": [[25, 50, 100, 200,400,500,600,800,1000], [25, 50, 100,200,400,500,600,800,1000]]
      });
	}

      // Apply the search
      table.columns().every( function () {
        var that = this;

        $( 'input', this.footer() ).on( 'keyup change', function () {
          if ( that.search() !== this.value ) {
            that
              .search( this.value )
              .draw();
          }
        } );
      } );      
      // change Game Status 
      $('.changeGameStatus').bind('click', e => {
        e.preventDefault();
        var game_status = e.target.getAttribute('data-game-status');
        let title = `<h4 class="text-primary">${game_status ? "Deactivate Game" : 'Activate Game'}</h4>`
        let msg = ``
        if (game_status == 1)
          msg = `Are you sure you want to deactivate your game ?  This will logout all user of game.`
        else
          msg = `Are you sure you want to activate this game ? `

        let footer = ` <button class = "btn btn-primary" id="changeGameStatusYesBtn" type="button">Yes</button>`
        $('#myModal .modal-title').html(title);
        $('#myModal .modal-body').html(msg);
        $('#myModal .modal-footer').html(footer);
        $('#myModal').modal('show');

        $('#changeGameStatusYesBtn').bind('click', function () {

          $('#myModal').modal('hide');

          var game_id = e.target.getAttribute('data-gameId');
          var game_status = e.target.getAttribute('data-game-status');
          
          $.post(`/game/changeGameStatus?game_id=${game_id}&game_status=${game_status}`, _ => {
            location.reload();
          }).fail(xhr => {
            e.target.disabled = false;
            if (xhr.status == 403) {
              window.location.href = '/';
            }
          });
        })
      });
  


      function showResponse(msg = '') {
        $("#errormsgid").html(msg);
        $("#errormsgid").show();
        setTimeout(_ => {
          $("#errormsgid").hide();
        }, 3000);   
      }

      // acl Role Status change 
      $('.changeRoleStatus').bind('click', e => {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        let status = e.target.getAttribute('data-status');
        e.target.disabled = true;
        $.post('/acl/changeRoleStatus?id=' + id +'&status=' +status, (msg) => {
          showResponse(msg || "Successfull.");
          $(e.target).val(status == 1 ? 'Activate' : 'Deactivate');     
          $(e.target).attr('data-status', status == 1 ? 0 : 1);     
          e.target.disabled = false;
        }).fail(xhr => {
          let msg = xhr && xhr.responseText || 'Error.';
          e.target.disabled = false;
          showResponse(msg) 
        });
      });

      
      // acl Permissions status change  
      $('.changePermissionStatus').bind('click', e => {
        e.preventDefault();
        let id = e.target.getAttribute('data-id');
        
        e.target.disabled = true;
        $.post('/acl/changePermissionStatus?id=' + id, (msg) => {
          showResponse(msg || "Successfull.");
          $(e.target).val(status == 1 ? 'Activate' : 'Deactivate');     
         
          e.target.disabled = false;
        }).fail(xhr => {
          let msg = xhr && xhr.responseText || 'Error.';
          e.target.disabled = false;
          showResponse(msg) 
        });
      });

      $(".view-more-assigned-roles").bind('click', e => {
        e.preventDefault();
        $('#myModal .modal-title').html("Admin Assigned Roles");
        let adminName = e.target.getAttribute('data-admin-name');
        let assignedRoles = e.target.getAttribute('data-assigned-roles');
        let html = `
        <div align="">
          <label> Admin Name:</label> <span> &nbsp; &nbsp; ${adminName}</span>  <br/><br/>
          <label> Assigned Roles:</label> <span>  &nbsp; &nbsp; ${assignedRoles}</span>
        <div>        
        `;
        $('#myModal .modal-body').html(html);
      });
        
      $(".view-more-assigned-games").bind('click', e => {
        e.preventDefault();
        $('#myModal .modal-title').html("Admin Assigned Roles");
        let adminName = e.target.getAttribute('data-admin-name');
        let assignedGames = e.target.getAttribute('data-assigned-games');
        let html = `
        <div align="">
            <label> Admin Name:</label> <span> &nbsp; &nbsp; ${adminName}</span>  <br/><br/>
            <label>Assigned Games:</label> <span>  &nbsp; &nbsp; ${assignedGames}</span>
        <div>        
        `;
        $('#myModal .modal-body').html(html);
      });


})(window.jQuery);

