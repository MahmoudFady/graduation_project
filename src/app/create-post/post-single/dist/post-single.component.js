"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SinglePostComponent = void 0;
var core_1 = require("@angular/core");
var SinglePostComponent = /** @class */ (function () {
    function SinglePostComponent(route, postService) {
        this.route = route;
        this.postService = postService;
        // DEFINE POST
        this.post = {
            _id: '',
            creator: {
                _id: '',
                userName: '',
                profileImage: ''
            },
            creatorBigCity: '',
            creatorCity: '',
            creatorPhone: '',
            job: '',
            postText: '',
            postDate: '',
            postImages: [],
            comments: [],
            createByWorker: null
        };
        // DEFINE COMMENTS OF POST THEN PASS IT TO COMMENTS LIST COMPONENT
        this.postComments = [
            {
                _id: '',
                commentDate: '',
                commentImages: [],
                commentText: '',
                creator: {
                    _id: '',
                    userName: '',
                    profileImage: ''
                }
            },
        ];
        // DEFINE IMAGES IF USER WANT TO ATTACH SOME IAMGES INTO HIS COMMENT
        this.commentImages = null;
    }
    SinglePostComponent.prototype.ngOnInit = function () {
        var _this = this;
        var postId = null;
        this.route.params.subscribe(function (params) {
            // GET POST ID FORM URL : HTTP://LOCALHOST:4200/POST/:POSTID
            postId = params['postId'];
        });
        // THEN GET THAT POST BY ID
        this.postService.getPostById(postId).subscribe(function (resualt) {
            /**
             * EXTRACT CLASS PROPERTYIES FORM THE RESUALT
             * POST
             * POSTCOMMENTS
             */
            _this.post = resualt.post;
            console.log(_this.post);
            _this.postComments = resualt.post.comments;
            // ASSIGN COMMENTS TO OBSERVALBE < COMMENTS WHICH DECLARED IN POST SERVICE >
            _this.postService.comments.next(_this.postComments);
        });
        // LISTIEN TO COMMENTS IF ANY USER ADD COMMENT
        this.postService.getUpdatedComments().subscribe(function (resualt) {
            _this.postComments = resualt;
        });
        setInterval(function () {
            _this.postService.getPostById(postId).subscribe(function (resualt) {
                _this.postComments = resualt.post.comments;
            });
        }, 1000);
    };
    SinglePostComponent = __decorate([
        core_1.Component({
            selector: 'app-post-single',
            templateUrl: './post-single.component.html',
            styleUrls: ['./post-single.component.css']
        })
    ], SinglePostComponent);
    return SinglePostComponent;
}());
exports.SinglePostComponent = SinglePostComponent;
