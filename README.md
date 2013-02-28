#Vanilla Validation

Really simple javascript form validation. Scalable and decoupled from UI.

##How to Use

Include vanilla-validation.js in your webpage. It will automatically detect if you are using a form and perform validation you specify in the HTML. Such as:

```html
<form>
  <input name="first_name" type="text" data-validate="not-empty"/>
  <button type="submit">Submit</button>
</form>
```

If you want to know the result of the validation, write this in javascript:

```javascript
$("form").on("after-validate",function(e, error){
  if (error){
    alert(error.message);
    //You also get error.element, which is the form element that threw the error.
    //In the example above, if you leave first_name empty, you will get an error message that says "Cannot be empty."
    return false;
  }
});  
```

##Overriding and Adding Rules
It's extremely simple to override and add rules. For example, if you wanted to add a simple email check:

```javascript
$.vanillaValidation.pushRule("email-required",function(value){
  if (value.indexOf("@") > 0){    //Fails if @ sign is first or not present.
    return "Email invalid.";
  }
});
```

And then to add it to your form:

```html
<form>
  <input name="first_name" type="text" data-validate="not-empty"/>
  <input name="email" type="text" data-validate="not-empty,email-required"/>
  <button type="submit">Submit</button>
</form>
```

##Notes
I made this as a utility for a personal project I'm making - still rough and I'd like some help making it a bit more robust and clean.

##To Be Added
* Call the validation manually.
* Option to display all the errors in the form.