truncate table GAME_DRAW_RESULT;
truncate table GAME_ISSUE;
truncate table GAME_ISSUE_LOG;
truncate table GAME_ORDER;
truncate table GAME_ORDER_WIN;
truncate table GAME_PACKAGE;
truncate table GAME_PACKAGE_ITEM;
truncate table GAME_PLAN;
truncate table GAME_PLAN_DETAIL;
truncate table GAME_RET_POINT;
truncate table GAME_RISK_FUND;
truncate table GAME_SLIP;
truncate table GAME_TRANSACTION_FUND;
truncate table game_draw_result;
truncate table user_url;
delete from user_customer where id!=31;
commit;