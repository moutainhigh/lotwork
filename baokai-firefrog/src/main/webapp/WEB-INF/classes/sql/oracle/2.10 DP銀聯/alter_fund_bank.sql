alter table fund_bank add   move_quick_type number;
alter table fund_bank add   move_quick_deposit number;
alter table fund_bank add   move_deposit number;
COMMENT ON COLUMN FIREFOG.fund_bank.move_quick_type IS '���ʺݧֱ��R���� 0:�_ 1:�O';
COMMENT ON COLUMN FIREFOG.fund_bank.move_quick_deposit IS '���ʺݧֱ��R�� 0:�_ 1:�O';
COMMENT ON COLUMN FIREFOG.fund_bank.move_deposit IS '���ʺݶ}���R�� 0:�_ 1:�O';
