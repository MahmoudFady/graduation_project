"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostService = void 0;
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var PostService = /** @class */ (function () {
    function PostService(http) {
        this.http = http;
        this.userPosts = [];
        this.updatedUserPosts = new rxjs_1.Subject();
        this.url = 'http://localhost:3000/api/post/';
    }
    // get user userPosts
    PostService.prototype.reverUserPosts = function (userPosts) {
        this.userPosts = userPosts.reverse();
        this.updatedUserPosts.next(this.userPosts);
    };
    // ADDING POSTS FUCTION          ################
    PostService.prototype.addPost = function (job, creatorPhone, creatorBigCity, creatorCity, postText, postImages, createByWorker) {
        var formData = new FormData();
        var date = new Date().toLocaleDateString();
        formData.append('job', job);
        formData.append('creatorPhone', creatorPhone);
        formData.append('creatorBigCity', creatorBigCity);
        formData.append('creatorCity', creatorCity);
        if (postImages) {
            for (var img in postImages) {
                formData.append('postImages', postImages[img]);
            }
        }
        formData.append('postText', postText);
        formData.append('createByWorker', createByWorker);
        formData.append('postDate', date);
        return this.http.post(this.url + 'addPost', formData);
    };
    //delete post by post id
    PostService.prototype.deletePost = function (postId) {
        console.log('delete post');
        var userPosts = this.userPosts.filter(function (post) {
            return post._id !== postId;
        });
        this.userPosts = userPosts;
        this.updatedUserPosts.next(this.userPosts);
        this.http["delete"](this.url + 'deletePost/' + postId)
            .subscribe(function (resualt) {
            console.log(resualt.message);
        });
    };
    // get all posts at db
    PostService.prototype.getAllPosts = function () {
        var _this = this;
        this.http.get(this.url).subscribe(function (resualt) {
            _this.userPosts = resualt.posts.reverse();
            _this.updatedUserPosts.next(_this.userPosts);
        }, function (err) {
            _this.userPosts = null;
            _this.updatedUserPosts.next(_this.userPosts);
        });
    };
    PostService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
