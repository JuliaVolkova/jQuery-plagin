(function( $ ){

    $.fn.myPlugin = function(option) {
        var settings = {
            'Paris': {name: 'Paris', code: 'fr'},
            'Amsterdam': {name: 'Amsterdam', code: 'nl'},
            'Auckland': {name: 'Auckland', code: 'nz'},
            'Dublin': {name: 'Dublin', code: 'ie'},
            'Irkutsk': {name: 'Irkutsk', code: 'ru'},
            'London': {name: 'London', code: 'gb'},
            'NewYork': {name: 'New-York', code: 'gb'},
            'Reykjavik': {name: 'Reykjavik', code: 'is'},
            'Rio': {name: 'Rio de Janeiro', code: 'br'},
            'Saint-Petersburg': {name: 'Saint-Petersburg', code: 'ru'},
            'Tokyo': {name: 'Tokyo', code: 'jp'}
        };

        if (option) {
            $.extend(settings, option);
        }

        var getForecastForProperCity = function() {
            $.each(settings, function () {
                if ($('li').text().indexOf(settings) !== -1) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + this.name + this.code + '&APPID=68e023fec6a329065a271ef2867ec8a3');
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            var data = JSON.parse(xhr.responseText);
                            var temperature = parseInt(data.main.temp - 273.15) + '&#176;C';
                            $('li').append('Wow! Here is ' + temperature + 'by the way!');
                            xhr.send();
                        }

                    }
                }
            })
        };

        return this.find('li').each($(this), getForecastForProperCity);
    };

})(jQuery);
