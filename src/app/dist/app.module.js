"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var search_module_1 = require("./search/search.module");
var jobs_module_1 = require("./jobs/jobs.module");
var post_single_module_1 = require("./create-post/post-single/post-single.module");
var profile_module_1 = require("./profile/profile.module");
var home_module_1 = require("./home/home.module");
var auth_interceptor_service_1 = require("./auth/auth-interceptor.service");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var navbar_component_1 = require("./navbar/navbar.component");
var http_1 = require("@angular/common/http");
var error_page_component_1 = require("./error-page/error-page.component");
var create_post_module_1 = require("./create-post/create-post.module");
var sigin_module_1 = require("./auth/signin/sigin.module");
var signup_module_1 = require("./auth/signup/signup.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent, navbar_component_1.NavbarComponent, error_page_component_1.ErrorPageComponent],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                home_module_1.HomeModule,
                profile_module_1.ProfileModule,
                post_single_module_1.PostSingleModule,
                create_post_module_1.CreatePostModule,
                jobs_module_1.JobsModule,
                search_module_1.SearchModule,
                sigin_module_1.SigninModule,
                signup_module_1.SignupModule,
            ],
            providers: [
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
