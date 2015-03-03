 /*!
  * 'Tango' v0.0.1 - Lightweight Crossbrowser Validation Framework
  * By Akash Mitra
  * Date: 27-02-2015
  *
  * How to Use: Give the validations types in the data-validate attribute
  * and for error output make a give the element id as "id of the input field-error"
  *
  * For Example:
  * <input type="text" id="firstname" data-validate='["required","email"]'>
  * <span id="firstname-error"></span>
  *
  *
  */


 $(function() {

     var errorMsg = "";

    // console.log('Tango Loaded');

     $("input").focusout(function(event) {
         /* Act on the event */
         var id = $(event.target).attr("id");
         var valueOfElement = $("#" + id).val();
         var validatewhat = $("#" + id).data('validate');
        // console.log("Target Div id :: " + id);
         errorMsg = "";
         var x = null;

         try {
             for (x in validatewhat) {
                // console.log('Validate What ::' + validatewhat[x]);

                 switch (validatewhat[x].toLowerCase()) {
                     case 'required':
                         validateRequired(valueOfElement);
                         break;
                     case 'alphabetic':
                         validateAlphabet(valueOfElement);
                         break;
                     case 'numeric':
                         validateNumeric(valueOfElement);
                         break;
                     case 'alphanumeric':
                         validateAlphanumeric(valueOfElement);
                         break;
                     case 'email':
                         validateEmail(valueOfElement);
                         break;
                     case 'date':
                         validateDate_ddmmyyyy(valueOfElement);
                         break;
                     case 'date(ddmmyyyy)':
                         validateDate_ddmmyyyy(valueOfElement);
                         break;
                     case 'date(mmddyyyy)':
                         validateDate_mmddyyyy(valueOfElement);
                         break;
                     default:
                         validationError(valueOfElement);
                         break;
                 }
             }
         } catch (err) {
            console.error(err);
         }

         $('#' + id + "-error").css({
             "color": "red",
             "font-size": "small",
             "font-style": "italic"
         });
         $('#' + id + "-error").html(errorMsg);


     });

     /* Validation Modules - required, alphabetic, 
      *  numeric, alphanumeric, email, dates
      */

     var validateRequired = function(value) {
        // console.log('Calling function for Requried validation');
        // console.log("Target Div value :: " + value);

         if (value == null || value == "") {
             errorMsg = errorMsg + "Please fill in the Information <br>";
             return false;
         }
     }

     var validateAlphabet = function(value) {
        // console.log('Calling function for Alphabet validation');
        // console.log("Target Div value :: " + value);

         var letters = /^[A-Za-z]+$/;

         if (letters.test(value)) {
             return true;
         } else {
             errorMsg = errorMsg + "Please enter Alphabetic Values <br>";
             return false;
         }

     }

     var validateNumeric = function(value) {
        // console.log('Calling function for Numeric validation');
        // console.log("Target Div value :: " + value);

         var letters = /^[0-9]+$/;

         if (letters.test(value)) {
             return true;
         } else {
             errorMsg = errorMsg + "Please enter Numeric Values <br>";
             return false;
         }

     }

     var validateAlphanumeric = function(value) {
        // console.log('Calling function for Alphanumeric validation');
        // console.log("Target Div value :: " + value);

         var letters = /^[0-9a-zA-Z]+$/;

         if (letters.test(value)) {
             return true;
         } else {
             errorMsg = errorMsg + "Please enter AlphaNumeric Values <br>";
             return false;
         }
     }

     var validateEmail = function(value) {
        // console.log('Calling function for Email validation');
        // console.log("Target Div value :: " + value);

         var letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

         if (letters.test(value)) {
             return true;
         } else {
             errorMsg = errorMsg + "Please enter a Valid Email ID <br>";
             return false;
         }
     }


     var validateDate_ddmmyyyy = function(value) {
        // console.log('Calling function for Date validation');
        // console.log("Target Div value :: " + value);

         var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
         // Match the date format through regular expression  
         if (dateformat.test(value)) {

             //Test which seperator is used '/' or '-'  
             var opera1 = value.split('/');
             var opera2 = value.split('-');
             lopera1 = opera1.length;
             lopera2 = opera2.length;
             // Extract the string into month, date and year  
             if (lopera1 > 1) {
                 var pdate = value.split('/');
             } else if (lopera2 > 1) {
                 var pdate = value.split('-');
             }
             var dd = parseInt(pdate[0]);
             var mm = parseInt(pdate[1]);
             var yy = parseInt(pdate[2]);
             // Create list of days of a month [assume there is no leap year by default]  
             var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
             if (mm == 1 || mm > 2) {
                 if (dd > ListofDays[mm - 1]) {
                     errorMsg = errorMsg + "Please enter a valid Date <br>";
                     return false;
                 }
             }
             if (mm == 2) {
                 var lyear = false;
                 if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                     lyear = true;
                 }
                 if ((lyear == false) && (dd >= 29)) {
                     errorMsg = errorMsg + "Please enter a valid Date <br>";
                     return false;
                 }
                 if ((lyear == true) && (dd > 29)) {
                     errorMsg = errorMsg + "Please enter a valid Date <br>";
                     return false;
                 }
             }
         } else {
             errorMsg = errorMsg + "Please enter a valid Date <br>";
             return false;
         }


     }



     var validateDate_mmddyyyy = function(value) {
        // console.log('Calling function for Date validation');
        // console.log("Target Div value :: " + value);

         var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
         // Match the date format through regular expression  
         if (dateformat.test(value)) {

             //Test which seperator is used '/' or '-'  
             var opera1 = value.split('/');
             var opera2 = value.split('-');
             lopera1 = opera1.length;
             lopera2 = opera2.length;
             // Extract the string into month, date and year  
             if (lopera1 > 1) {
                 var pdate = value.split('/');
             } else if (lopera2 > 1) {
                 var pdate = value.split('-');
             }
             var mm = parseInt(pdate[0]);
             var dd = parseInt(pdate[1]);
             var yy = parseInt(pdate[2]);
             // Create list of days of a month [assume there is no leap year by default]  
             var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
             if (mm == 1 || mm > 2) {
                 if (dd > ListofDays[mm - 1]) {
                     errorMsg = errorMsg + "Please enter a valid Date <br>";
                     return false;
                 }
             }
             if (mm == 2) {
                 var lyear = false;
                 if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                     lyear = true;
                 }
                 if ((lyear == false) && (dd >= 29)) {
                     errorMsg = errorMsg + "Please enter a valid Date <br>";
                     return false;
                 }
                 if ((lyear == true) && (dd > 29)) {
                     errorMsg = errorMsg + "Please enter a valid Date <br>";
                     return false;
                 }
             }
         } else {
             errorMsg = errorMsg + "Please enter a valid Date <br>";
             return false;
         }


     }

     var validationError = function() {
         console.error('No proper validation parameter selected');
         return undefined;
     }

 });
