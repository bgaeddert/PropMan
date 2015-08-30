angular.module('propman').filter('num', function() {
    return function(input, property) {

        var result = [];

        // if the items are loaded
        items = input;
        if (items && items.length > 0)
        {
            $.each(items, function (index, item)
            {
                item[property] = parseInt(item[property]);

                result.push(item);
            });

            return result;
        }
    };
});

angular.module('propman').filter('int', function() {
    return function(input) {

        //return typeof input;
        return parseInt(input);
    };
});

angular.module('propman').filter('timestampToString', function($sce){

    return function(input){
        return moment.utc(input, 'X').startOf('day').format('MMM DD, YYYY')
    };
});

angular.module('propman').filter('daterange', function ()
{
    return function(input, params)
    {
        var result = [];

        //date filters
        var start_date = Date.parse(params.start_date);
        var end_date = Date.parse(params.end_date);

        //var start_date = (start_date && !isNaN(Date.parse(start_date))) ? Date.parse(start_date) : 0;
        //var end_date = (end_date && !isNaN(Date.parse(end_date))) ? Date.parse(end_date) : new Date().getTime();

        // if the items are loaded
        items = input;
        if (items && items.length > 0)
        {
            $.each(items, function (index, item)
            {
                var itemDate = moment.utc(item.paid_at, 'X').format('MMM DD, YYYY')
                var itemDate = Date.parse(itemDate);

                if (itemDate >= start_date && itemDate <= end_date)
                {
                    result.push(item);
                }
            });

            return result;
        }
    };
});