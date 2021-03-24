"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ViewProfileComponent = void 0;
var core_1 = require("@angular/core");
var ViewProfileComponent = /** @class */ (function () {
    function ViewProfileComponent(route, authService, testimonialService) {
        this.route = route;
        this.authService = authService;
        this.testimonialService = testimonialService;
        this.userId = '';
        this.userData = {
            profileImage: '',
            _id: '',
            userName: '',
            userEmail: '',
            userPhone: '',
            userBigCity: '',
            userCity: '',
            job: ''
        };
    }
    ViewProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userId = params['id'];
        });
        this.authService
            .getUserById(this.userId)
            .subscribe(function (getUserResualt) {
            _this.userData = getUserResualt.user;
            _this.userPosts = getUserResualt.userPosts;
        });
        this.testimonialService.getReview(this.userId);
        this.testimonialService.getUpdatedTestimonials().subscribe(function (testis) {
            _this.userReviews = testis;
        });
        console.log(this.userReviews);
    };
    ViewProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-view-profile',
            templateUrl: './view-profile.component.html',
            styleUrls: ['./view-profile.component.css']
        })
    ], ViewProfileComponent);
    return ViewProfileComponent;
}());
exports.ViewProfileComponent = ViewProfileComponent;
