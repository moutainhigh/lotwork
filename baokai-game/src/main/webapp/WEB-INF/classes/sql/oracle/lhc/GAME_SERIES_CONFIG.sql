REM INSERTING into GAME_SERIES_CONFIG
SET DEFINE OFF;
Insert into GAME_SERIES_CONFIG (ID,LOTTERYID,BACKOUT_START_FEE,BACKOUT_RATIO,ISSUEWARN_NOT_OPENAWARD,ISSUEWARN_AHEAD_OPENAWARD,ISSUEWARN_DELAY_OPENAWARD,ISSUEWARN_BACKOUT_TIME,ISSUEWARN_EXCEPTION_TIME,CREATE_TIME,UPDATE_TIME,EMAIL,ISSUEWARN_USER_BACKOUT_TIME,HASVIDEO,VIDESTRUC) values (SEQ_GAME_SERIES_CONFIG_ID.Nextval,99701,30000,0,null,null,null,900,900,to_timestamp('2013-09-29 09:00:56','YYYY-MM-DD HH24:MI:SS'),to_timestamp('2016-04-27 16:19:22','YYYY-MM-DD HH24:MI:SS'),null,0,null,null);
