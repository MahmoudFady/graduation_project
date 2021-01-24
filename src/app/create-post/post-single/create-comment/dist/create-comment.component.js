"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCommentComponent = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var CreateCommentComponent = /** @class */ (function () {
    function CreateCommentComponent(postService, authService) {
        this.postService = postService;
        this.authService = authService;
        this.commentImages = [];
        this.postId = null;
        this.postComments = [];
    }
    CreateCommentComponent.prototype.ngOnInit = function () {
        this.isAuthenticated = this.authService.getToken() ? true : false;
        console.log(this.isAuthenticated);
        this.commentForm = new forms_1.FormGroup({
            commentText: new forms_1.FormControl(null, [forms_1.Validators.required]),
            commentImages: new forms_1.FormControl(null)
        });
    };
    // ON ATTACH SOME IMAGES TO COMMENT REQUIEST
    CreateCommentComponent.prototype.onImagePicker = function (event) {
        var _this = this;
        // CATCH IMAGES TO VIEW IT TO USER
        this.commentImages = [];
        // GET IMAGES AS DATA < BITS OR BYTE>
        var files = event.target.files;
        // UPDATE COMMENTIMAGES OF THE FORM
        this.commentForm.patchValue({
            commentImages: files
        });
        this.commentForm.get('commentImages').updateValueAndValidity();
        var _loop_1 = function (index) {
            var fileReader = new FileReader();
            fileReader.onload = function () {
                // PUSH URLS INTO COMMENTIMAGES
                _this.commentImages.push(fileReader.result);
            };
            // THEN READ DATA AS URL SOURCE
            fileReader.readAsDataURL(files[index]);
        };
        // LOOP IN FILES TO GET IMAGE URL DATA
        for (var index in files) {
            _loop_1(index);
        }
    };
    // ON ADD COMMENT
    CreateCommentComponent.prototype.onAddComent = function () {
        // FORM IS VALID
        if (this.commentForm.valid) {
            var _a = this.commentForm.value, commentText = _a.commentText, commentImages = _a.commentImages;
            this.postService.addComment(this.postComments, this.postId, commentText, commentImages);
            this.commentImages = null;
        }
    };
    __decorate([
        core_1.Input()
    ], CreateCommentComponent.prototype, "postId");
    __decorate([
        core_1.Input()
    ], CreateCommentComponent.prototype, "postComments");
    CreateCommentComponent = __decorate([
        core_1.Component({
            selector: 'app-create-comment',
            templateUrl: './create-comment.component.html',
            styleUrls: ['../post-single.component.css', './create-comment.component.css']
        })
    ], CreateCommentComponent);
    return CreateCommentComponent;
}());
exports.CreateCommentComponent = CreateCommentComponent;
