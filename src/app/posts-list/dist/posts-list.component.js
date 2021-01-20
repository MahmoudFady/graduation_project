"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostsListComponent = void 0;
var core_1 = require("@angular/core");
var PostsListComponent = /** @class */ (function () {
    function PostsListComponent(postService, authService, router) {
        this.postService = postService;
        this.authService = authService;
        this.router = router;
        this.userId = null;
        this.deleltePost = false;
    }
    PostsListComponent.prototype.ngOnInit = function () {
        this.deleltePost = false;
        this.userId = this.authService.getLocalStorageData()._id;
    };
    PostsListComponent.prototype.onGetUser = function (id) {
        var activeUserId = this.authService.getLocalStorageData()._id;
        if (id === activeUserId) {
            this.router.navigate(['/profile']);
        }
        else {
            this.router.navigate(["/view-profile/" + id]);
        }
    };
    PostsListComponent.prototype.onDeletePost = function (id) {
        var _this = this;
        this.deleltePost = true;
        console.log(id);
        this.postService.deletePost(id);
        setTimeout(function () {
            _this.deleltePost = false;
        }, 1200);
    };
    __decorate([
        core_1.Input()
    ], PostsListComponent.prototype, "posts");
    PostsListComponent = __decorate([
        core_1.Component({
            selector: 'app-posts-list',
            templateUrl: './posts-list.component.html',
            styleUrls: ['./posts-list.component.css']
        })
    ], PostsListComponent);
    return PostsListComponent;
}());
exports.PostsListComponent = PostsListComponent;
