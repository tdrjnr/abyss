/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","config"],function(a,b){"use strict";var c=a.module("grafana.controllers");c.controller("LoginCtrl",["$scope","backendSrv","contextSrv","$location",function(a,c,d,e){a.formModel={user:"",email:"",password:""},d.sidemenu=!1,a.googleAuthEnabled=b.googleAuthEnabled,a.githubAuthEnabled=b.githubAuthEnabled,a.disableUserSignUp=b.disableUserSignUp,a.loginMode=!0,a.submitBtnText="Log in",a.init=function(){a.$watch("loginMode",a.loginModeChanged);var b=e.search();b.failedMsg&&(a.appEvent("alert-warning",["Login Failed",b.failedMsg]),delete b.failedMsg,e.search(b))},a.buildInfo={version:b.buildInfo.version,commit:b.buildInfo.commit,buildstamp:new Date(1e3*b.buildInfo.buildstamp)},a.submit=function(){a.loginMode?a.login():a.signUp()},a.loginModeChanged=function(b){a.submitBtnText=b?"Log in":"Sign up"},a.signUp=function(){a.loginForm.$valid&&c.post("/api/user/signup",a.formModel).then(function(c){"SignUpCreated"===c.status?e.path("/signup").search({email:a.formModel.email}):window.location.href=b.appSubUrl+"/"})},a.login=function(){delete a.loginError,a.loginForm.$valid&&c.post("/login",a.formModel).then(function(a){window.location.href=a.redirectUrl?a.redirectUrl:b.appSubUrl+"/"})},a.init()}])});