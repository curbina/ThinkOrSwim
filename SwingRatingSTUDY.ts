# SWINGRATING
# WGRIFFITH2 (C) 2013

# STOCHASTICSLOW
DEF KPERIOD = 14;
DEF DPERIOD = 3;
DEF FASTLINE = ROUND(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD));
DEF SLOWLINE = ROUND(SIMPLEMOVINGAVG(SIMPLEMOVINGAVG(100 * ((CLOSE - LOWEST(LOW, KPERIOD)) / (HIGHEST(HIGH, KPERIOD) - LOWEST(LOW, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
DEF MACD = MACDHISTOGRAM("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

# SMA9
DEF SMA = SIMPLEMOVINGAVG();

# VOLUME
DEF VOL = VOLUMEAVG() > VOLUMEAVG(LENGTH = 60).VOLAVG;

DEF GREENPRICE = 
MACD >= 0 AND
FASTLINE >= SLOWLINE;

DEF REDPRICE =
MACD < 0 AND
FASTLINE < SLOWLINE;

PLOT RATING =
# CONFIRMED MOVE GREEN
IF GREENPRICE
AND LOWEST(FASTLINE, 5) < 20
AND CLOSE > SMA
AND VOL
THEN 1
# TRENDING GREEN
ELSE IF GREENPRICE
AND CLOSE > SMA
THEN .9
# UNCONFIRMED MOVE GREEN
ELSE IF GREENPRICE
THEN .8
# CONFIRMED MOVE BLUE
ELSE IF !GREENPRICE
AND !REDPRICE
AND LOWEST(FASTLINE, 5) < 20
AND CLOSE > SMA
AND VOL
THEN .7
# TRENDING BLUE
ELSE IF !GREENPRICE
AND !REDPRICE
AND CLOSE > SMA
THEN .6
# UNCONFIRMED MOVE BLUE
ELSE IF !GREENPRICE
AND !REDPRICE
THEN .5
# UNCONFIRMED RED
ELSE IF !GREENPRICE
AND CLOSE > CLOSE[1]
AND LOWEST(FASTLINE, 5) < 20
THEN .1
ELSE IF REDPRICE
AND HIGHEST(FASTLINE, 5) > 80
AND CLOSE < SMA
AND VOL
THEN -1
ELSE 0;

RATING.SETDEFAULTCOLOR(CREATECOLOR(0, 255, 0));
RATING.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_UP);