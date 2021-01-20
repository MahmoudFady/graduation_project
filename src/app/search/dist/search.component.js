"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchComponent = void 0;
var core_1 = require("@angular/core");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(autService, postService) {
        this.autService = autService;
        this.postService = postService;
        this.selectedPosts = [];
        this.userData = {
            job: '',
            userBigCity: '',
            userCity: ''
        };
    }
    SearchComponent.prototype.ngOnInit = function () {
        if (this.autService.getToken) {
            var _a = this.autService.getLocalStorageData(), job = _a.job, userBigCity = _a.userBigCity, userCity = _a.userCity;
            this.userData = {
                job: job,
                userBigCity: userBigCity,
                userCity: userCity
            };
        }
    };
    SearchComponent.prototype.onSubmit = function (f) {
        console.log(f.value);
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.css']
        })
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
