<!-- resources/views/index.php -->

<!doctype html>
<html ng-app="propman">
<head>
    <title>PropMan</title>
    <link rel="stylesheet" href="{{URL::to('/')}}/assets/bower_components/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="{{URL::to('/')}}/assets/bower_components/toastr/toastr.min.css">
    <link rel='stylesheet' href='{{URL::to('/')}}/assets/bower_components/angular-loading-bar/build/loading-bar.min.css' type='text/css' media='all' />
    <link rel="stylesheet" href="{{URL::to('/')}}/css/app.css">
    <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>
</head>
<body ng-cloak>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">PropMan</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            {{--<ul class="nav navbar-nav">
                <li><a href="/">Home</a></li>
            </ul>--}}

            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span
                                class="glyphicon glyphicon-user"></span> {{ $user->name }} <span
                                class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <!-------------------------------------------------------
                            Setting the target to self allows the following
                            link to bypass the ui-router and call the laravel
                            router directly to redirect to the log out page
                        -------------------------------------------------------->
                        <li><a href="/auth/logout" target="_self">Logout</a></li>

                        <!-- Setting Link -->
                        <li><a ui-sref="settings">Settings</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>


<div id="wrapper">
    <aside id="sideBar">
        <ul class="main-nav">

            <li ui-sref-active="active">
                <a ui-sref="owners"><i class="fa fa-briefcase"></i> Owners</a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="properties"><i class="fa fa-building"></i> Properties <i class="fa fa-money"></i></a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="units"><i class="fa fa-home"></i> Units</a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="tenants"><i class="fa fa-users"></i> Tenants <i class="fa fa-money"></i></a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="transactions"><i class="fa fa-money"></i> Transactions</a>
            </li>

            {{--<li ui-sref-active="active">
                <a ui-sref="owners.report"><i class="fa fa-list-alt"></i> Reports</a>
            </li>--}}

        </ul>
    </aside>


    <div class="container-fluid">
        <!-- Main Section -->
        <section class="main-section">
            <div ui-view></div>
        </section>
    </div>
</div>

</body>

<!-- Application Dependencies -->
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/angular/angular.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/angular-animate/angular-animate.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/angular-resource/angular-resource.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script type='text/javascript' src='{{URL::to('/')}}/assets/bower_components/angular-loading-bar/build/loading-bar.min.js'></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/moment/moment.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/assets/bower_components/toastr/toastr.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>

<!-- Application Scripts -->
<script type="text/javascript" src="{{URL::to('/')}}/app.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/handlers.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/filters.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/owners/ownerIndexController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/owners/ownerCreateEditController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/owners/ownerViewController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/owners/ownerReportController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/ownerFactory.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/properties/propertyIndexController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/properties/propertyCreateEditController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/properties/propertyViewController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/propertyFactory.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/units/unitIndexController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/units/unitCreateEditController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/units/unitViewController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/unitFactory.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/tenants/tenantIndexController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/tenants/tenantCreateEditController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/tenants/tenantViewController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/tenantFactory.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/transactions/transactionIndexController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/transactions/transactionCreateEditController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/transactions/transactionViewController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/transactionFactory.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/orgs/orgEditController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/orgFactory.js"></script>

<script type="text/javascript" src="{{URL::to('/')}}/components/services/handlerFactory.js"></script>


<script type="text/javascript" src="{{URL::to('/')}}/components/controllers/userController.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/components/services/userFactory.js"></script>


<script>
    angular.element(document).ready(function(){
        var appElement = document.querySelector('[ng-app=propman]');
        var appScope = angular.element(appElement).scope();
        appScope.user = {!!$user!!};
        equalize_heights('#first-row .well');
    });

    function equalize_heights(elem){
        // Get an array of all element heights
        var elementHeights = $(elem).map(function(){
            return $(this).height();
        }).get();

        // Math.max takes a variable number of arguments
        // `apply` is equivalent to passing each height as an argument
        var maxHeight = Math.max.apply(null, elementHeights);

        // Set each height to the max height
        $(elem).height(maxHeight);
        return $(elem);
    }

</script>
</html>