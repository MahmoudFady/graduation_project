"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostSingleModule = void 0;
var post_single_component_1 = require("./post-single.component");
var comment_module_1 = require("./comment.module");
var post_list_module_1 = require("../posts-list/post-list.module");
var core_1 = require("@angular/core");
var view_single_post_component_1 = require("./view-single-post/view-single-post.component");
var PostSingleModule = /** @class */ (function () {
    function PostSingleModule() {
    }
    PostSingleModule = __decorate([
        core_1.NgModule({
            declarations: [post_single_component_1.SinglePostComponent, view_single_post_component_1.ViewSinglePostComponent],
            imports: [comment_module_1.CommentModule, post_list_module_1.PostListModule, comment_module_1.CommentModule],
            exports: [post_single_component_1.SinglePostComponent, view_single_post_component_1.ViewSinglePostComponent]
        })
    ], PostSingleModule);
    return PostSingleModule;
}());
exports.PostSingleModule = PostSingleModule;
