(function ($) {

    $.fn.myPlugin = function (options) {
        var cities = {
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

        var direction = {
            up: function(element) { return element.insertBefore($('ul').find('li:first-child')) },
            down: function(element) { return element.insertAfter($('ul').find('li:last-child')) }
        };

        var move = direction.up;

        if (options) {
            $.extend(cities, options.auxiliaryCities);
            move = direction[options.direction] || move;
        }

        var listElement = $('li');

        function getForecastForProperCity() {
            $.each(this.find('li'), function () {
                var listItem = $(this);
                $.each(cities, function () {
                    if (listItem.text().indexOf(this.name) !== -1) {
                        $.ajax({
                            method: 'get',
                            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + this.name + ',' + this.code + '&APPID=1ce776c63fa744abd79089ebdecbf860',
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
                move($(this));
            })
                .fadeIn('slow');
        });

        return this.each(getForecastForProperCity.bind(this));
    };

})(jQuery);

$('ul').myPlugin({
    auxiliaryCities: {},
    direction: 'right'
});
