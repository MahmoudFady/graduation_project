"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    function PostService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.userPosts = [];
        this._comments = [];
        this.comments = new rxjs_1.Subject();
        this.updatedUserPosts = new rxjs_1.Subject();
        // BASIC URL TO POST ROUTES AT SERVER
        this.url = 'http://localhost:3000/api/post/';
    }
    // REVERS USER POSTS FUCTION ###########
    PostService.prototype.reverUserPosts = function (userPosts) {
        this.userPosts = userPosts.reverse();
        this.updatedUserPosts.next(this.userPosts);
    };
    // ADDING POSTS FUCTION ################
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
    // DELETE POST BY ID ################
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
    // GET ALL USERS POSTS #################3
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
    // GET POST BY ID FUNCTION
    PostService.prototype.getPostById = function (postId) {
        return this.http.get(this.url + postId);
    };
    PostService.prototype.addComment = function (oldComments, postId, commentText, commentImages) {
        var _this = this;
        var formData = new FormData();
        formData.append('commentText', commentText);
        if (commentImages) {
            for (var index in commentImages) {
                formData.append('commentImages', commentImages[index]);
            }
        }
        this.http
            .post('http://localhost:3000/api/comment/addComment/' + postId, formData)
            .subscribe(function (resualt) {
            var _a = _this.authService.getLocalStorageData(), _id = _a._id, userName = _a.userName, profileImage = _a.profileImage;
            var newComment = __assign(__assign({}, resualt.newComment), { creator: { _id: _id, userName: userName, profileImage: profileImage } });
            oldComments.push(newComment);
            _this._comments = oldComments;
            _this.comments.next(_this._comments);
        });
    };
    //LISTEN TO COMMENTS OF ANY USER ADD NEW COMMENT
    PostService.prototype.getUpdatedComments = function () {
        return this.comments.asObservable();
    };
    PostService = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], PostService);
    return PostService;
}());
exports.PostService = PostService;
