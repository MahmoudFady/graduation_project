"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var comments_list_commponent_1 = require("./create-post/post-single/comments-list/comments-list.commponent");
var post_single_component_1 = require("./create-post/post-single/post-single.component");
var auth_interceptor_service_1 = require("./auth/auth-interceptor.service");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./navbar/navbar.component");
var search_component_1 = require("./search/search.component");
var signin_component_1 = require("./auth/signin/signin.component");
var profile_component_1 = require("./profile/profile.component");
var signup_component_1 = require("./auth/signup/signup.component");
var home_component_1 = require("./home/home.component");
var create_post_component_1 = require("./create-post/create-post.component");
var posts_list_component_1 = require("./create-post/posts-list/posts-list.component");
var forms_1 = require("@angular/forms");
var post_service_1 = require("./create-post/post.service");
var auth_service_1 = require("./auth/auth.service");
var http_1 = require("@angular/common/http");
var auth_guard_1 = require("./auth/auth.guard");
var edit_profile_component_1 = require("./edit-profile/edit-profile.component");
var error_page_component_1 = require("./error-page/error-page.component");
var loading_component_1 = require("./loading/loading.component");
var alert_danger_component_1 = require("./alert-danger/alert-danger.component");
var alert_success_component_1 = require("./alert-success/alert-success.component");
var profile_data_component_1 = require("./profile/profile-data/profile-data.component");
var view_profile_component_1 = require("./view-profile/view-profile.component");
var jobs_component_1 = require("./jobs/jobs.component");
var testimonial_service_1 = require("./home/testimonial/testimonial.service");
var banner_component_1 = require("./home/banner/banner.component");
var blogs_component_1 = require("./home/blogs/blogs.component");
var features_component_1 = require("./home/features/features.component");
var services_component_1 = require("./home/services/services.component");
var subscribe_component_1 = require("./home/subscribe/subscribe.component");
var testimonial_component_1 = require("./home/testimonial/testimonial.component");
var add_testimonial_component_1 = require("./home/testimonial/add-testimonial/add-testimonial.component");
var testimonial_list_component_1 = require("./home/testimonial/testimonial-list/testimonial-list.component");
var create_comment_component_1 = require("./create-post/post-single/create-comment/create-comment.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                search_component_1.SearchComponent,
                signin_component_1.SigninComponent,
                profile_component_1.ProfileComponent,
                signup_component_1.SignupComponent,
                home_component_1.HomeComponent,
                create_post_component_1.CreatePostComponent,
                posts_list_component_1.PostsListComponent,
                edit_profile_component_1.EditProfileComponent,
                error_page_component_1.ErrorPageComponent,
                profile_data_component_1.ProfileDataComponent,
                view_profile_component_1.ViewProfileComponent,
                jobs_component_1.JobsComponent,
                loading_component_1.LoadingComponent,
                alert_danger_component_1.AlertDangerComponent,
                alert_success_component_1.AlertSuccessComponent,
                banner_component_1.BannerComponent,
                services_component_1.ServicesComponent,
                features_component_1.FeaturesComponent,
                subscribe_component_1.SubscribeComponent,
                blogs_component_1.BlogsComponent,
                testimonial_component_1.TestimonialComponent,
                add_testimonial_component_1.AddTestimonialComponent,
                testimonial_list_component_1.TestimonialListComponent,
                post_single_component_1.SinglePostComponent,
                create_comment_component_1.CreateCommentComponent,
                comments_list_commponent_1.CommentsListComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            providers: [
                post_service_1.PostService,
                auth_service_1.AuthService,
                auth_guard_1.AuthGuard,
                testimonial_service_1.TestimonialService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_service_1.AuthInterceptor,
                    multi: true
                },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
