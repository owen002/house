/**
 * 常量
 */
var Constants = window.Constants || {};
Constants.TIMEOUT = 5000;
//  var baseUrl="http://www.xiangshan.rh-ronghe.com/rental_interface/";
//        var baseUrl="http://www.baozumei.com/rental_interface/";
// var baseUrl = "http://10040.snail.com/rental_interface/";
var baseUrl = "http://agent.snail.com/rental_interface/";
// var baseUrl="http://www.xiangshan.rh-ronghe.com/rental_interface/";
// var baseUrl = "http://10040.snail.com/rental_interface/";
//   var baseUrl="http://agent.snail.com/rental_interface/";
//登录
Constants.login = baseUrl + "front/login";
Constants.loginbyphone = baseUrl + "front/login_by_phone";
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
Constants.citylist = baseUrl + "front/json_all_city";
Constants.cityArea = baseUrl + "front/json_district";
//新增众筹报名
Constants.savememberenroll=baseUrl+'save_member_enroll';
//包租头条
Constants.bztt = baseUrl + "front/json_information";
Constants.bzttnews = baseUrl + "front/view_information";
//我的众筹
Constants.myenrollList = baseUrl + 'front/json_member_enroll';
//我的发布
//Constants.myfabuZf=baseUrl+'save_member_rental';
//Constants.myfabuMf=baseUrl+'save_member_buy';
//我的需求[我的发布合并成我的需求]
Constants.myneed = baseUrl + 'save_member_demand';
//新房
Constants.newhouselist = baseUrl + 'front/json_new_housing';
Constants.newhousedetail = baseUrl + 'front/view_new_housing';
//上传图像
Constants.mysctx = baseUrl + 'upload_header_portrait';
//浏览记录
Constants.browseRecord = baseUrl + 'json_member_browse';
Constants.favRecord = baseUrl + 'json_member_favorites';
//加入收藏/取消收藏
Constants.memberFav = baseUrl + 'member_favorites';
//我的报名
Constants.memberSign = baseUrl + 'json_member_demand';
//我的众筹报名
Constants.mycrowdfunding=baseUrl+'json_member_enroll_crowdfunding';
//众筹报名
Constants.memberenroll=baseUrl+'front/json_member_enroll';
//附近租、新、二手、众筹
//附近租、二手、众筹、新房
Constants.fjzf=baseUrl+'front/json_nearby_rental_housing';
Constants.fjesf=baseUrl+'front/json_nearby_sale_housing';
Constants.fjzcouf=baseUrl+'front/json_nearby_crowdfunding_housing';
Constants.fjxf=baseUrl+'front/json_nearby_new_housing';
//点赞
Constants.dzan = baseUrl + 'member_support';

//会员修改
Constants.updateMember = baseUrl + 'update_member';
//城市分区及分区下的板块
Constants.dsList = baseUrl + 'front/json_district';
Constants.ptList = baseUrl + 'front/json_plat';

//消息列表
Constants.messagelistd = baseUrl + 'json_demand_message_receive';
Constants.messagelists = baseUrl + 'json_system_message_receive';
//累计统计信息
Constants.ljtjxx=baseUrl+'front/json_statistical_information';
//累计统计信息
Constants.ljtjxxnews=baseUrl+'front/view_statistical_information';

//定位城市代码和系统对接
Constants.cityTmy=baseUrl+'front/city_info';
Constants.arcode=baseUrl+'front/json_qr_code';

//优质房源
Constants.yzfylb=baseUrl+'front/json_top_housing';

//消息未读数
Constants.unreadMessage=baseUrl+'count_unread_message';

