--------------------------------------------------------
--  已建立檔案 - 星期二-十二月-22-2015   
--------------------------------------------------------
ALTER TABLE "FIREFOG"."FUND_WITHDRAW_APPEAL"
DROP TABLE "FIREFOG"."FUND_WITHDRAW_APPEAL" cascade constraints;
--------------------------------------------------------
--  DDL for Table FUND_WITHDRAW_APPEAL
--------------------------------------------------------

  CREATE TABLE "FIREFOG"."FUND_WITHDRAW_APPEAL" 
   (	"ID" NUMBER, 
	"USER_ID" NUMBER, 
	"APPEAL_SN" VARCHAR2(30 BYTE), 
	"WITHDRAW_AMT" NUMBER, 
	"WITHDRAW_TIME" TIMESTAMP (6), 
	"VIP_LVL" NUMBER, 
	"USER_NAME" VARCHAR2(24 BYTE), 
	"APPEAL_STATUS" NUMBER, 
	"APPEAL_ACCT" VARCHAR2(50 BYTE), 
	"APPEAL_TIME" TIMESTAMP (6), 
	"BANK_ID" VARCHAR2(10 BYTE), 
	"BANK_NAME" VARCHAR2(60 BYTE), 
	"CARD_NUMBER" VARCHAR2(40 BYTE), 
	"APPEAL_MEMO" VARCHAR2(2000 BYTE), 
	"ARGUE_TIME" TIMESTAMP (6), 
	"ARGUE_ACCT" VARCHAR2(50 BYTE), 
	"WITHDRAW_SN" VARCHAR2(30 BYTE), 
	"IS_APPEAL" NUMBER, 
	"APPEAL_TIPS" VARCHAR2(2000 BYTE)
   );

   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."ID" IS '流水號';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."USER_ID" IS '用戶ID';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."APPEAL_SN" IS '申訴單號';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."WITHDRAW_AMT" IS '提款金額';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."WITHDRAW_TIME" IS '提款時間';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."VIP_LVL" IS '是否VIP  0：不是vip  1：vip   未來有等級區分';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."USER_NAME" IS '提現用戶名';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."APPEAL_STATUS" IS '0:未處理 1:處理中  2：申訴成功 3:申訴失敗';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."APPEAL_ACCT" IS '審核人';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."APPEAL_TIME" IS '審核時間';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."BANK_ID" IS '提現銀行ID';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."BANK_NAME" IS '提現銀行名稱';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."CARD_NUMBER" IS '卡片號碼';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."APPEAL_MEMO" IS '備註';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."ARGUE_TIME" IS '申訴時間';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."ARGUE_ACCT" IS '申訴人';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."WITHDRAW_SN" IS '提現單號';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."IS_APPEAL" IS '是否開啟申訴  0:關閉   1:開啟';
   COMMENT ON COLUMN "FIREFOG"."FUND_WITHDRAW_APPEAL"."APPEAL_TIPS" IS '申訴提示';


--------------------------------------------------------
--  Constraints for Table FUND_WITHDRAW_APPEAL
--------------------------------------------------------

ALTER TABLE "FIREFOG"."FUND_WITHDRAW_APPEAL" ADD PRIMARY KEY ("ID")
CREATE SEQUENCE SEQ_FUND_WITHDRAW_APPEAL_ID;
