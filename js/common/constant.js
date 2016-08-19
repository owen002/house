/**
 * 常量
 */
var Constants = window.Constants || {};
Constants.TIMEOUT = 2000;
// var baseUrl="http://www.xiangshan.rh-ronghe.com/rental_interface/";
// var baseUrl = "http://10040.snail.com/rental_interface/";
   var baseUrl="http://agent.snail.com/rental_interface/";

Constants.login = baseUrl + "front/login";
Constants.getCode = baseUrl + "front/get_checkcode";
Constants.regAccount = baseUrl + "front/save_member";
Constants.rentlisttop = baseUrl + "front/json_top_rental_housing";
Constants.rentlist = baseUrl + "front/json_rental_housing";
Constants.rentdetail = baseUrl + "front/view_rental_housing";
//售房
Constants.salelist = baseUrl + "front/json_sale_housing";
Constants.saledetail = baseUrl + "front/view_sale_housing";
//众筹
Constants.crowdfundlist = baseUrl + "front/json_crowdfunding_housing";
Constants.crowdfunddetail = baseUrl + "front/view_crowdfunding_housing";
Constants.citylist = baseUrl + "front/json_city";
Constants.cityArea = baseUrl + "front/json_district";
//包租头条
Constants.bztt=baseUrl+"front/json_information";
//我的众筹
Constants.myenrollList=baseUrl+'json_member_enroll';
//我的发布
Constants.myfabuZf=baseUrl+'save_member_rental';
Constants.myfabuMf=baseUrl+'save_member_buy';
