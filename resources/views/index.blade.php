<!-- resources/views/index.php -->

<!doctype html>
<html ng-app="propman">
<head>
    <title>PropMan</title>
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/assets/bower_components/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="/assets/bower_components/toastr/toastr.min.css">
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
                <a ui-sref="properties"><i class="fa fa-building"></i> Properties</a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="units"><i class="fa fa-home"></i> Units</a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="tenants"><i class="fa fa-users"></i> Tenants</a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="transactions"><i class="fa fa-money"></i> Transactions</a>
            </li>

            <li ui-sref-active="active">
                <a ui-sref="reports "><i class="fa fa-list-alt"></i> Reports</a>
            </li>

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
<script type="text/javascript" src="/assets/bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/assets/bower_components/angular/angular.js"></script>
<script type="text/javascript" src="/assets/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<script type="text/javascript" src="/assets/bower_components/angular-resource/angular-resource.js"></script>
<script type="text/javascript" src="/assets/bower_components/moment/moment.js"></script>
<script type="text/javascript" src="/assets/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/assets/bower_components/toastr/toastr.min.js"></script>


<!-- Application Scripts -->
<script type="text/javascript" src="/app.js"></script>
<script type="text/javascript" src="/components/handlers.js"></script>

<script type="text/javascript" src="/components/controllers/owners/ownerIndexController.js"></script>
<script type="text/javascript" src="/components/controllers/owners/ownerCreateEditController.js"></script>
<script type="text/javascript" src="/components/controllers/owners/ownerViewController.js"></script>
<script type="text/javascript" src="/components/services/ownerFactory.js"></script>

<script type="text/javascript" src="/components/controllers/properties/propertyIndexController.js"></script>
<script type="text/javascript" src="/components/controllers/properties/propertyCreateEditController.js"></script>
<script type="text/javascript" src="/components/controllers/properties/propertyViewController.js"></script>
<script type="text/javascript" src="/components/services/propertyFactory.js"></script>

<script type="text/javascript" src="/components/controllers/units/unitIndexController.js"></script>
<script type="text/javascript" src="/components/controllers/units/unitCreateEditController.js"></script>
<script type="text/javascript" src="/components/controllers/units/unitViewController.js"></script>
<script type="text/javascript" src="/components/services/unitFactory.js"></script>

<script type="text/javascript" src="/components/services/handlerFactory.js"></script>


<script type="text/javascript" src="/components/controllers/userController.js"></script>
<script type="text/javascript" src="/components/services/userFactory.js"></script>


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