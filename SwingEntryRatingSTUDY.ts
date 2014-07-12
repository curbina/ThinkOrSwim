# SWINGENTRYRATING
# WGRIFFITH2 (C) 2014

DECLARE LOWER;

INPUT KPERIOD = 14;
INPUT DPERIOD = 3;
INPUT MACD_FAST = 5;
INPUT MACD_SLOW = 35;
INPUT MACD_LEN = 5;
INPUT EMA6 = 12;

# STOCHASTICSLOW
DEF FASTLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD);
DEF SLOWLINE = STOCHASTICSLOW("D PERIOD" = DPERIOD, "K PERIOD" = KPERIOD).SLOWD;

# MACD
DEF MACD = MACDHISTOGRAM("FAST LENGTH" = MACD_FAST, "SLOW LENGTH" = MACD_SLOW, "MACD LENGTH" = MACD_LEN);

# TEST
DEF GREENPRICE = FASTLINE >= SLOWLINE AND MACD >=0.00;
DEF REDPRICE = FASTLINE < SLOWLINE AND MACD < 0.00;

DEF GMMA6 = CLOSE >= EXPAVERAGE(CLOSE,EMA6);

DEF LONG =
GMMA6 AND !GMMA6[1]
AND GREENPRICE AND FASTLINE <= 80;

DEF SHORT =
!GMMA6 AND GMMA6[1]
AND REDPRICE AND FASTLINE >= 20;

PLOT RATING =

IF
LONG
THEN FASTLINE-FASTLINE[1]

ELSE IF
SHORT
THEN FASTLINE-FASTLINE[1]

ELSE 0;