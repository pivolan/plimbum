/*
/**
* CHRONOFORMS version 3.0 
* Copyright (c) 2008 Chrono_Man, ChronoEngine.com. All rights reserved.
* Author: Chrono_Man (ChronoEngine.com)
You are not allowed to copy or use or rebrand or sell any code at this page under your own name or any other identity!
Unlike the Chronoforms extension license, This file is NOT released under the GNU/GPL license and it can be distributed with the Chronoforms package distributed by ChronoEngine.com ONLY according to a written permission from "this" file's owner, if you want to include this file in any packages then you MUST get a written permission from the owner, contact webmaster@chronoengine.com for more details!
* See readme.html.
* Visit http://www.ChronoEngine.com for regular update and information.
**/
function elementExtend()
{
    Element.extend({
    	getInputByName : function(name) {
    		el = this.getFormElements().filterByAttribute('name', '=', name)
    		return (el)?(el.length)?el[0]:el:false;
    	},
		getInputsByName : function(nome) {
			el = this.getFormElements().filterByAttribute('name','=',nome)
			return (el)?el:false;
		},
		getProperty: function(property){
          var index = Element.Properties[property];
          if (index) return this[index];
          var flag = Element.PropertiesIFlag[property] || 0;

          // Commented old line
    //      if (!window.ie || flag) return this.getAttribute(property, flag);

          // Two new lines: put MSIE version number in var msie and check if this is 8 or higher
          var msie = navigator.userAgent.toLowerCase().match(/msie\s+(\d)/);
          if (!window.ie || flag || msie && msie[1]>=8) return this.getAttribute(property, flag);

          var node = this.attributes[property];
          return (node) ? node.nodeValue : null;
       }
    });
}
function setValidation(chronoformname, valonBlur, valonSubmit, valwait_time) 
{
	Validate.One_Required = function(elm, paramsObj){
		var paramsObj = paramsObj || {};
		var message = paramsObj.failureMessage || "Must Choose one";
		var ready = false;
		var elm = paramsObj.elm;
		var p = elm.parentNode;
		var myoptions = $(chronoformname).getInputsByName(elm.getProperty('name'));
		for(i=0; i<myoptions.length; i++){
			if(myoptions[i].checked == true) {
			  ready = true;
			}
		}
		if(!ready){
			Validate.fail(message);
		}
		return true;
	}
	
	$ES('input', $(chronoformname)).each(function(field){
		var message_required = 'This field is required';
		var message_validate_number = 'Please enter a valid number in this field.';
		var message_validate_digits = 'Please use numbers only in this field. please avoid spaces or other characters such as dots or commas.';
		var message_validate_alpha = 'Please use letters only (a-z) in this field.';
		var message_validate_alphanum = 'Please use letters only (a-z) or numbers (0-9) in this field.';
		var message_validate_date = 'Please enter a valid date in this format yyyy/mm/dd'; 
		var message_validate_email = 'Please enter a valid email address. For example fred@'+'domain.com';
		var message_validate_url = 'Please enter a valid URL.';
		var message_validate_date_au = 'Please use this date format: dd/mm/yyyy. For example 17/03/2006 for the 17th of March, 2006.';
		var message_validate_currency_dollar = 'Please enter a valid $ amount. For example $100.00';
		var message_validate_match = 'Please make sure that the two fields match';
		var message_validate_one_required = 'Please select one of the options.';
		var message_validate_selection = 'Please make a selection.';
		//defaults
		var name = '';
		var tmessage = '';
		var type = field.getProperty('type');
		//var name = "cfvalidate_"+field.getProperty('name').replace('[]', '');
		if ( ['text', 'password', 'file'].contains(type) ) {
			var name = "cfvalidate_"+field.getProperty('name').replace('[]', '');
			name = new LiveValidation(field, { 
				validMessage: ' ',
				onlyOnBlur: valonBlur,
				onlyOnSubmit:valonSubmit,
				wait:valwait_time//,
				//onInvalid:function(){ /*this.insertMessage(*/this.createMultiSpan();/*); this.addFieldClass();*/ }
			});
			if(field.getProperty('title')){
				tmessage = field.getProperty('title');
			}
			
			if(field.hasClass('required')){
				if( tmessage ) { var message_required = tmessage; }
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
				name.add( Validate.Presence, { 
					failureMessage: message_required 
				});
			}
		}
		if ( ['text', 'password'].contains(type) ) {	
			if(field.hasClass('validate-number')){
				if( tmessage) { var message_validate_number = tmessage; }
				name.add( Validate.Numericality, { 
					notANumberMessage: message_validate_number 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-digits')){
				if( tmessage) { var message_validate_digits = tmessage; }
				name.add( Validate.Numericality, { 
					notAnIntegerMessage: message_validate_digits 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-alpha')){
				if( tmessage) { var message_validate_alpha = tmessage; }
				name.add( Validate.Format, { 
					pattern: /^[a-zA-Z ]+$/, 
					failureMessage: message_validate_alpha 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-alphanum')){
				if( tmessage) { var message_validate_alphanum = tmessage; }
				name.add( Validate.Format, { 
					pattern: /^[0-9a-zA-Z ]+$/, 
					failureMessage: message_validate_alphanum 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-date')){
				if( tmessage) { var message_validate_date = tmessage; }
				name.add( Validate.Format, { 
					pattern: /^(19|20)[0-9][0-9][- \/.](0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])$/, 
					failureMessage: message_validate_date 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-email')){
				if( tmessage) { var message_validate_email = tmessage; }
				name.add( Validate.Email, { 
					failureMessage: message_validate_email 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-url')){
				if( tmessage) { var message_validate_url = tmessage; }
				name.add( Validate.Format, {
					pattern: /^[(http|https|ftp):\/\/]*(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i,
					failureMessage: message_validate_url 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-date-au')){
				if( tmessage) { var message_validate_date_au = tmessage; }
				name.add( Validate.Format, {
					pattern: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)[0-9][0-9]$/,
					failureMessage: message_validate_date_au 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			if(field.hasClass('validate-currency-dollar')){
				if( tmessage) { var message_validate_currency_dollar = tmessage; }
				name.add( Validate.Format, {
					pattern: /^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/,
					failureMessage: message_validate_currency_dollar 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
			/*if(field.hasClass('validate-match')){
				if( tmessage) { var message_validate_match = tmessage; }
				name.add( Validate.Confirmation, {
					match: field.getProperty('match'),
					failureMessage: message_validate_match 
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}*/
		}
		
		if ( ['checkbox', 'radio'].contains(type) ) {
			var name = "cfvalidate_"+field.getProperty('name').replace('[]', '');
			name = new LiveValidation(field, { 
				validMessage: ' ',
				onlyOnBlur: valonBlur,
				onlyOnSubmit:valonSubmit,
				wait:valwait_time,
				insertAfterWhatNode : field.parentNode
			});
			if(field.getProperty('title')){
				tmessage = field.getProperty('title');
			}
			
			if(field.hasClass('required')){
				if( tmessage ) { var message_required = tmessage; }
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
				name.add( Validate.Presence, { 
					failureMessage: message_required 
				});
			}
			if(field.hasClass('validate-one-required')){
				if( tmessage) { var message_validate_one_required = tmessage; }
				name.add( Validate.One_Required, { 
					elm : field, 
					failureMessage: message_validate_one_required
				});
				fieldsarray[fieldsarray_count] = name;
				fieldsarray_count = fieldsarray_count + 1;
			}
		}
	});
	$ES('select', $(chronoformname)).each(function(field){
		var name = '';
		var tmessage = '';
		var name = "cfvalidate_"+field.getProperty('name').replace('[]', '');
		name = new LiveValidation(field, { 
			validMessage: ' ',
			onlyOnBlur: valonBlur,
			onlyOnSubmit:valonSubmit,
			wait:valwait_time 
		});
		if(field.getProperty('title')){
			tmessage = field.getProperty('title');
		}
		if(field.hasClass('validate-selection')){
			if( tmessage ) { var message_validate_selection = tmessage; }
			if( field.size > 1 ) { field.options[0].selected = true; }
			name.add( Validate.Presence, { 
				failureMessage: message_validate_selection
			});
			fieldsarray[fieldsarray_count] = name;
			fieldsarray_count = fieldsarray_count + 1;
		}
	});
			
	$ES('textarea', $(chronoformname)).each(function(field){
		var name = '';
		var tmessage = '';
		var name = "cfvalidate_"+field.getProperty('name').replace('[]', '');
		name = new LiveValidation(field, { 
			validMessage: ' ',
			onlyOnBlur: valonBlur,
			onlyOnSubmit:valonSubmit,
			wait:valwait_time 
		});
		if(field.getProperty('title')){
			tmessage = field.getProperty('title');
		}
		if(field.hasClass('required')){
			if( tmessage ) { var message_required = tmessage; }
			//if( field.size > 1 ) { field.options[0].selected = true; }
			name.add( Validate.Presence, { 
				failureMessage: message_required
			});
			fieldsarray[fieldsarray_count] = name;
			fieldsarray_count = fieldsarray_count + 1;
		}
	});
}