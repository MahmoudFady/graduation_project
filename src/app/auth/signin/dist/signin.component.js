"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SigninComponent = void 0;
var core_1 = require("@angular/core");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(autService) {
        this.autService = autService;
        this.errorMsg = null;
        this.signinData = {
            userEmail: '',
            userPassword: ''
        };
    }
    SigninComponent.prototype.ngOnInit = function () { };
    SigninComponent.prototype.onSignin = function (signinForm) {
        var _this = this;
        this.loading = true;
        this.signinData = signinForm.value;
        var _a = signinForm.value, userEmail = _a.userEmail, userPassword = _a.userPassword;
        this.autService.signin(userEmail, userPassword);
        this.autService.errMsg.subscribe(function (resualt) {
            setTimeout(function () {
                _this.errorMsg = resualt;
                _this.loading = false;
            }, 1200);
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.css']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
