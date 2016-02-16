MagicMirror
===========
This is a fork from https://github.com/MichMich/MagicMirror. I was having issues with OpenWeather data that was very inacurate for my location. I changed the original code so that it now uses forecast.io.

You will still need to request an API Key from Forecast.io, https://developer.forecast.io/. Also, you cannot exceed 1000 requests a day, or they will charge you. The timer in this fork is set to 15m.

##Major changes are:

###[config.js](js/config.js)

- Modify to change weather parameters for api.forecast.io
- Added new compliments and changed news to cnn.

###[weather.js](js/weather/weather.js)

- Modified to use forecast.io

## Other Modifications Needed
To get the weather to display on the localhost using Chromium, you need to edit the startup file to include the --disable-web-security cli switch.

@/usr/lib/chromium-browser/chromium-browser --kiosk --incognito --disable-web-security  http://localhost/MagicMirror/index.php

This file can be located in either:
~/.config/lxsession/LXDE-pi/autostart
or
/etc/xdg/lxsession/LXDE-pi/autostart
