"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JobsComponent = void 0;
var core_1 = require("@angular/core");
var JobsComponent = /** @class */ (function () {
    function JobsComponent(postService) {
        this.postService = postService;
        this.postedJobs = [];
        this.errMsg = null;
        this.loading = false;
    }
    JobsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.postService.getAllPosts();
        this.postService.updatedUserPosts.subscribe(function (posts) {
            if (posts) {
                _this.posts = posts;
                _this.posts.forEach(function (post) {
                    if (!_this.postedJobs.includes(post.job)) {
                        _this.postedJobs.push(post.job);
                    }
                });
                setTimeout(function () {
                    _this.loading = false;
                    _this.errMsg = null;
                    _this.errMsg = null;
                }, 600);
            }
            else {
                _this.posts = null;
                _this.loading = false;
                _this.errMsg = 'لا يوجد اتصال بالانترنت';
            }
        });
    };
    JobsComponent = __decorate([
        core_1.Component({
            selector: 'app-jobs',
            templateUrl: './jobs.component.html',
            styleUrls: ['./jobs.component.css']
        })
    ], JobsComponent);
    return JobsComponent;
}());
exports.JobsComponent = JobsComponent;
