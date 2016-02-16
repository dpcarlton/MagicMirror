var weather = {
        params: config.weather.params || null,
        iconTable: {
                'clear-day':'wi-day-sunny',
                'partly-cloudy-day':'wi-day-cloudy',
                'cloudy':'wi-cloudy',
                'wind':'wi-cloudy-windy',
                'rain':'wi-showers',
                'rain':'wi-rain',
                'rain':'wi-thunderstorm',
                'snow':'wi-snow',
                'fog':'wi-fog',
                'clear-night':'wi-night-clear',
                'partly-cloudy-night':'wi-night-cloudy',
                'partly-cloudy-night':'wi-night-cloudy',
                'partly-cloudy-night':'wi-night-cloudy',
                'rain':'wi-night-showers',
                'rain':'wi-night-rain',
                'rain':'wi-night-thunderstorm',
                'snow':'wi-night-snow',
                'wind':'wi-night-alt-cloudy-windy'
        },
        temperatureLocation: '.temp',
        windSunLocation: '.windsun',
        forecastLocation: '.forecast',
        urlBase: 'https://api.forecast.io/forecast/',
        urlEnd:  '?exclude=minutely,flags,hourly,alerts',
        updateInterval: config.weather.interval || 305000,
        fadeInterval: config.weather.fadeInterval || 5000,
        intervalId: null,
        orientation: config.weather.orientation || 'vertical',
}

/**
 * Rounds a float to one decimal place
 * @param  {float} temperature The temperature to be rounded
 * @return {float}             The new floating point value
 */
weather.roundValue = function (temperature) {
        return parseFloat(temperature).toFixed(1);
}

/**
 * Converts the wind speed (km/h) into the values given by the Beaufort Wind Scale
 * @see http://www.spc.noaa.gov/faq/tornado/beaufort.html
 * @param  {int} kmh The wind speed in Kilometers Per Hour
 * @return {int}     The wind speed converted into its corresponding Beaufort number
 */

weather.ms2Beaufort = function(ms) {
        // if set to us or auto, uses mph to knots. If set to si uses kph.

        var knots

        if (weather.params.units == 'si') {
                 knots = ms * 60 * 60 / 1000;
        } else {
                 knots = parseFloat(ms *0.868976).toFixed(0);

        }


        var speeds = [0,1, 4, 7, 11, 17, 22, 28, 34, 41, 48, 56, 61];

        for (var beaufort in speeds) {
                var speed = speeds[beaufort];
                if (speed > knots) {
                        return beaufort;
                }
        }
        return 12;
}

/**
 * Retrieves the current temperature and weather patter from api.forecast.io
 */

weather.updateCurrentWeather = function () {
        $.ajax({
                type: 'GET',
                dataType: 'json',

                /**
                  * add unix format timestamp to the end of the URL. forecast.io is setting the http expire header, which means the data is never
                  * refreshed in in the browser. It ignore this string, but it appears to the browser it is a new un-expired request each time.
                  */

                url: weather.urlBase + weather.params.apiID + '/' + weather.params.loc + weather.urlEnd + '&' + weather.params.units + '&' + weather.params.lang + '&' + moment().format('x'),
                success: function (data) {

                        var _temperature = this.roundValue(data.currently.temperature),
                                _temperatureMin = this.roundValue(data.daily.data[0].temperatureMin),
                                _temperatureMax = this.roundValue(data.daily.data[0].temperatureMax),
                                _wind = this.roundValue(data.currently.windSpeed),
                                _iconClass = this.iconTable[data.currently.icon];


                        var _icon = '<span class="icon ' + _iconClass + ' dimmed wi"></span>';

                        var _newTempHtml = _icon + '' + _temperature + '&deg;';

                        $(this.temperatureLocation).updateWithText(_newTempHtml, this.fadeInterval);

                        var _now = moment().format('HH:mm'),
                                _sunrise = moment(data.daily.data[0].sunriseTime*1000).format('HH:mm'),
                                _sunset = moment(data.daily.data[0].sunsetTime*1000).format('HH:mm');


                        var _newWindHtml = '<span class="wind"><span class="wi wi-strong-wind xdimmed"></span> ' + this.ms2Beaufort(_wind) + '</span>',

                                _newSunHtml = '<span class="sun"><span class="wi wi-sunrise xdimmed"></span> ' + _sunrise + '</span>';

                        if (_sunrise < _now && _sunset > _now) {

                                _newSunHtml = '<span class="sun"><span class="wi wi-sunset xdimmed"></span> ' + _sunset + '</span>';
                        }

                        $(this.windSunLocation).updateWithText(_newWindHtml + ' ' + _newSunHtml,this.fadeInterval);

                }.bind(this),
                error: function () {

                }
        });

}

/**
 * Updates the 5 Day Forecast from the api.forecast.io
 */
weather.updateWeatherForecast = function () {
        $.ajax({

                /**
                  * add unix format timestamp to the end of the URL. forecast.io is setting the http expire header, which means the data is never
                  * refreshed in in the browser. It ignore this string, but it appears to the browser it is a new un-expired request each time.
                  */

                type: 'GET',
                url: weather.urlBase + weather.params.apiID + '/' + weather.params.loc + weather.urlEnd + '&' + weather.params.units + '&' + weather.params.lang + '&' + moment().format('x'),
                dataType: 'json',
                success: function (data) {

                        var _opacity = 1,
                                _forecastHtml = '<tr>',
                                _forecastHtml2 = '<tr>',
                                _forecastHtml3 = '<tr>',
                                _forecastHtml4 = '<tr>';

                        _forecastHtml = '<table class="forecast-table"><tr>';

                        // [0] is current day weather, so loop from 1 to 6 for the next 5 days.

                        for (var i = 1, count = 6; i < count; i++) {

                                var _forecast = data.daily.data[i];

                                if (this.orientation == 'vertical') {
                                        _forecastHtml2 = '';
                                        _forecastHtml3 = '';
                                        _forecastHtml4 = '';
                                }

                                _forecastHtml += '<td style="opacity:' + _opacity + '" class="day">' + moment(_forecast.time, 'X').format('ddd') + '</td>';
                                _forecastHtml2 += '<td style="opacity:' + _opacity + '" class="icon-small ' + this.iconTable[data.daily.data[i].icon] + '"></td>';
                                _forecastHtml3 += '<td style="opacity:' + _opacity + '" class="temp-max">' + this.roundValue(data.daily.data[i].temperatureMin) + '</td>';
                                _forecastHtml4 += '<td style="opacity:' + _opacity + '" class="temp-min">' + this.roundValue(data.daily.data[i].temperatureMax) + '</td>';

                                _opacity -= 0.155;

                                if (this.orientation == 'vertical') {
                                        _forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 + '</tr>';
                                }
                        }
                        _forecastHtml  += '</tr>',
                        _forecastHtml2 += '</tr>',
                        _forecastHtml3 += '</tr>',
                        _forecastHtml4 += '</tr>';

                        if (this.orientation == 'vertical') {
                                _forecastHtml += '</table>';
                        } else {
                                _forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 +'</table>';
                        }

                        $(this.forecastLocation).updateWithText(_forecastHtml, this.fadeInterval);

                }.bind(this),
                error: function () {

                }
        });

}

weather.init = function () {


        this.intervalId = setInterval(function () {
                this.updateCurrentWeather();
                this.updateWeatherForecast();
        }.bind(this), this.updateInterval);

        this.updateCurrentWeather();

        this.updateWeatherForecast();
}
