DROP TABLE FIREFOG.GAME_NUMBER_CONFIG;

CREATE TABLE FIREFOG.GAME_NUMBER_CONFIG
(
  ID           NUMBER,
  LOTTERYID    NUMBER,
  NUM_TYPE     NVARCHAR2(20),
  GAME_NUMBER  VARCHAR2(2000 BYTE),
  START_TIME   TIMESTAMP(3),
  END_TIME     TIMESTAMP(3),
  SPECIAL_FLAG VARCHAR2(1)
);

COMMENT ON COLUMN FIREFOG.GAME_NUMBER_CONFIG.LOTTERYID IS '彩種ID';
COMMENT ON COLUMN FIREFOG.GAME_NUMBER_CONFIG.NUM_TYPE IS '生肖';
COMMENT ON COLUMN FIREFOG.GAME_NUMBER_CONFIG.GAME_NUMBER IS '生肖號球';
COMMENT ON COLUMN FIREFOG.GAME_NUMBER_CONFIG.START_TIME IS '開始時間';
COMMENT ON COLUMN FIREFOG.GAME_NUMBER_CONFIG.END_TIME IS '結束時間';
COMMENT ON COLUMN FIREFOG.GAME_NUMBER_CONFIG.SPECIAL_FLAG IS '本命年';



