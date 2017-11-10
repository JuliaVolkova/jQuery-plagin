(function ($) {

    $.fn.myPlugin = function (option) {
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

        var listElement = $('li');

        function getForecastForProperCity() {
            $.each(this.find('li'), function () {
                var listItem = $(this);
                $.each(settings, function () {
                    if (listItem.text().indexOf(this.name) !== -1) {
                        $.ajax({
                            method: 'get',
                            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + this.name + ',' + this.code + '&APPID=68e023fec6a329065a271ef2867ec8a3',
                            success: function (results) {
                                var temperature = parseInt(results.main.temp - 273.15) + '&#176;C';
                                listItem.append('Wow! Here is ' + temperature + ' by the way!');
                            }
                        });
                    }
                })
            })
        }

        listElement.css('background-color', 'white')
            .mouseenter(function () {
                $(this).css("background-color", 'lightseagreen');
            })
            .mouseleave(function () {
                $(this).css('background-color', 'white')
            });

        listElement.click(function () {
            $(this).fadeOut('slow', function () {
                $(this).insertBefore($('ul').find('li:first-child'))
            })
                .fadeIn('slow');
        });

        return this.each(getForecastForProperCity.bind(this));
    };

})(jQuery);

$('ul').myPlugin();
