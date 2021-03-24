"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var user_guard_1 = require("./auth/user.guard");
var post_single_component_1 = require("./create-post/post-single/post-single.component");
var jobs_component_1 = require("./jobs/jobs.component");
var view_profile_component_1 = require("./profile/view-profile/view-profile.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./auth/auth.guard");
var signin_component_1 = require("./auth/signin/signin.component");
var signup_component_1 = require("./auth/signup/signup.component");
var create_post_component_1 = require("./create-post/create-post.component");
var edit_profile_component_1 = require("./profile/edit-profile/edit-profile.component");
var error_page_component_1 = require("./error-page/error-page.component");
var home_component_1 = require("./home/home.component");
var profile_component_1 = require("./profile/profile.component");
var search_component_1 = require("./search/search.component");
var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    {
        path: 'jobs',
        component: jobs_component_1.JobsComponent
    },
    { path: 'search', component: search_component_1.SearchComponent },
    { path: 'signin', component: signin_component_1.SigninComponent, canActivate: [user_guard_1.AuthUser] },
    { path: 'signup', component: signup_component_1.SignupComponent, canActivate: [user_guard_1.AuthUser] },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    {
        path: 'view-profile/:id',
        component: view_profile_component_1.ViewProfileComponent
    },
    {
        path: 'edit-profile',
        component: edit_profile_component_1.EditProfileComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    { path: 'create-post', component: create_post_component_1.CreatePostComponent },
    { path: 'post/:postId', component: post_single_component_1.SinglePostComponent },
    { path: 'error-page', component: error_page_component_1.ErrorPageComponent },
    { path: '**', redirectTo: 'error-page' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
