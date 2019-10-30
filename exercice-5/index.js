'use strict';

/**
 * Form Generator
 * @constructor
 */
var FormGenerator = function FormGenerator(id) {
  this.id = id;
}

/**
 * render
 */
FormGenerator.prototype.render = function() {
    this.renderForm();
}

/**
 * FormGenerator
 */
FormGenerator.prototype.renderForm = function() {
    var globalObject = this;
    var body = document.querySelector('body');
    var form = document.createElement('form');
    form.setAttribute("id", this.id);
    form.setAttribute("action", "test/html");
    body.appendChild(form);
    this.form = document.querySelector("form#" + this.id);
    var pattern = new RegExp("([a-z]{6,20})", "g");
    var msg = "a à z uniquement, 6 à 20 caractères";
    this.addInput("LastName", pattern, "text", msg);
    this.addInput("FirstName", pattern, "text", msg);
    pattern = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', "g");
    msg = "veuillez entrer un email valide";
    this.addInput("Email", pattern, "email", msg);
    pattern = new RegExp("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})", "g");
    msg = "au moins 1 majuscule, 1 minuscule et 1 caractère spécial, 8 à 20 caractères";
    this.addInput("password", pattern, "password", msg);
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    this.form.appendChild(submit);
}

/**
 * verif form
 */
FormGenerator.prototype.verifForm = function(elm, regexp){
    // Dispatch/Trigger/Fire the event
    this.form.querySelectorAll('input').forEach(item => {
        item.dispatchEvent(new Event("change"));
    });
}

/**
 * verif pattern
 */
FormGenerator.prototype.verifPattern = function(elm, regexp){
    if(elm.value.match(regexp) === null){
        elm.style.color = "red";
    }
    else elm.style.color = 'black';
}

/**
 * add input
 */
FormGenerator.prototype.addInput = function (name, regexp, type, msg){
    var globalObject = this;
    var input = document.createElement('input');
    input.setAttribute("name", name);
    input.setAttribute("type", type);
    input.setAttribute("pattern", regexp.source);
    input.setAttribute("title", msg);
    input.addEventListener("change", function(){
            globalObject.verifPattern(this, regexp);
    });
    var label = document.createElement('label');
    label.appendChild(document.createTextNode(name));
    var div = document.createElement('div');
    div.setAttribute("class", "input-ctn");
    div.appendChild(label);
    div.appendChild(input);
    this.form.appendChild(div);
}

/**
 * check phone number
 */
FormGenerator.prototype.checkPhoneNumber = function(phone){
    var pattern = new RegExp("^0(1|6|7)\\d{8}$", "g");
    return (phone.match(pattern) != null);
}

var test = new FormGenerator("test");
test.render();
alert("0638546975 : " + test.checkPhoneNumber("0638546975"));