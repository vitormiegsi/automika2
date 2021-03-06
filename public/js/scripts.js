(function ($) {
    "use strict";

    /* 
    ------------------------------------------------
    Sidebar open close animated humberger icon
    ------------------------------------------------*/

    $(".hamburger").on('click', function () {
        $(this).toggleClass("is-active");
    });


    /*  
    -------------------
    List item active
    -------------------*/
    $('.header li, .sidebar li').on('click', function () {
        $(".header li.active, .sidebar li.active").removeClass("active");
        $(this).addClass('active');
    });

    $(".header li").on("click", function (event) {
        event.stopPropagation();
    });

    $(document).on("click", function () {
        $(".header li").removeClass("active");

    });



    /*  
    -----------------
    Chat Sidebar
    ---------------------*/


    var open = false;

    var openSidebar = function () {
        $('.chat-sidebar').addClass('is-active');
        $('.chat-sidebar-icon').addClass('is-active');
        open = true;
    }
    var closeSidebar = function () {
        $('.chat-sidebar').removeClass('is-active');
        $('.chat-sidebar-icon').removeClass('is-active');
        open = false;
    }

    $('.chat-sidebar-icon').on('click', function (event) {
        event.stopPropagation();
        var toggle = open ? closeSidebar : openSidebar;
        toggle();
    });








    /*  Auto date in footer and refresh
    --------------------------------------*/


    $('.page-refresh').on("click", function () {
        location.reload();
    });


    /* TO DO LIST 
    --------------------*/
    $(".tdl-new").on('keypress', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            var v = $(this).val();
            var s = v.replace(/ +?/g, '');
            if (s == "") {
                return false;
            } else {
                $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + v + "</span><a href='#' class='ti-close'></a></label></li>");
                $(this).val("");
            }
        }
    });


    $(".tdl-content a").on("click", function () {
        var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function () {
            _li.remove();
        });
        return false;
    });

    // for dynamically created a tags
    $(".tdl-content").on('click', "a", function () {
        var _li = $(this).parent().parent("li");
        _li.addClass("remove").stop().delay(100).slideUp("fast", function () {
            _li.remove();
        });
        return false;
    });



    /*  Chat Sidebar User custom Search
    ---------------------------------------*/

    $('[data-search]').on('keyup', function () {
        var searchVal = $(this).val();
        var filterItems = $('[data-filter-item]');

        if (searchVal != '') {
            filterItems.addClass('hidden');
            $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
        } else {
            filterItems.removeClass('hidden');
        }
    });


    /*  Chackbox all
    ---------------------------------------*/

    $("#checkAll").change(function () {
        $("input:checkbox").prop('checked', $(this).prop("checked"));
    });


    /*  Vertical Carousel
    ---------------------------*/

    $('#verticalCarousel').carousel({
        interval: 2000
    })

    $(window).bind("resize", function () {
        console.log($(this).width())
        if ($(this).width() < 680) {
            $('.logo').addClass('hidden')
            $('.sidebar').removeClass('sidebar-shrink')
            $('.sidebar').removeClass('sidebar-shrink, sidebar-gestures')
        }
    }).trigger('resize');



    /*  Search
    ------------*/
    $('a[href="#search"]').on('click', function (event) {
        event.preventDefault();
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });

    $('#search, #search button.close').on('click keyup', function (event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
        }
    });





    /*  pace Loader
    -------------*/

    var prices = [0, 100000];
    var opened = 0;
    function filterPrice(preco) {
        var modelo = $("#modelo").val()
        var marca = $("#marca").val();

        /*
         $('.card').show();
           // get the value of the input, which we filter on
             $('.col-md-3').find(".card-text:not(:contains(" + modelo + "))").parent().parent().parent().slideUp();
             (($('.col-md-3').find(".card-text:contains(" + modelo + ")"))($('.col-md-3').find(".card-title:contains(" + marca + ")"))).parent().parent().parent().slideDown();
         
        */


        $grid.isotope({
            filter: function () {

            }
        })
      
        $grid.isotope({
            filter: function () {

                var string = preco.toString();
                var precos = string.split(",");
                prices = precos;
                var precoMaior2 = parseInt($(this).find('.price').text());

                var precoMenor2 = parseInt($(this).find('.price').text());
                var marca2 = $(this).find('.card-title').text();
                var modelo2 = $(this).find('.card-text').text();
                return (precoMenor2 >= precos[0] && precoMaior2 <= precos[1])&&(marca2.match(marca) && modelo2.match(modelo));

                
            }
        })


    }




    $('#collapseDiv').on('shown.bs.collapse', function () {
        if (opened == 0) {
            opened = 1;
             mySlider = new rSlider({

                target: '#slider2',

                values: {
                    min: 0,
                    max: 100000
                },

                step: 1000,
                range: true,
                scale: true,
                labels: false,
                
                onChange: (function (values) {
                    filterPrice(values)
                })
            });
        }
    })




    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',

        getSortData: {
            cv: '.cavalagem',
            preco: '.price parseInt',
            ano: '.year parseInt',
            km: '.km parseInt'

        }
    });


    $('#sortPrice').change(function () {

        var sortValue = $('#sortPrice option:selected').val();

        if (sortValue == "precoA") {

            $grid.isotope({
                sortBy: 'preco',
                sortAscending: true

            })

        } else if (sortValue == "precoD") {

            $grid.isotope({
                sortBy: 'preco',
                sortAscending: false
            });
        } else if (sortValue == "cvA") {

            $grid.isotope({
                sortBy: 'cv',
                sortAscending: false
            });
        } else if (sortValue == "cvD") {

            $grid.isotope({
                sortBy: 'cv',
                sortAscending: true
            });
        }


    });

    $('#sortKm').change(function () {

        var sortValue = $('#sortKm option:selected').val();

        if (sortValue == "kmA") {

            $grid.isotope({
                sortBy: 'km',
                sortAscending: true

            })

        } else {

            $grid.isotope({
                sortBy: 'km',
                sortAscending: false
            });
        }


    });


    $("#marca").change(function () {
        


        var marca = $("#marca").val()

        $('.card').show();

        var precos = prices;

        $grid.isotope({
            filter: function () {
                var precoMaior2 = parseInt($(this).find('.price').text());

                var precoMenor2 = parseInt($(this).find('.price').text());
        
                var marca2 = $(this).find('.card-title').text();
                return (precoMenor2 >= precos[0] && precoMaior2 <= precos[1])&&marca2.match(marca);
            }
        })


    });

    $("#modelo").keyup(function () {

        var modelo = $("#modelo").val()
        var marca = $("#marca").val();

        /*
         $('.card').show();
           // get the value of the input, which we filter on
             $('.col-md-3').find(".card-text:not(:contains(" + modelo + "))").parent().parent().parent().slideUp();
             (($('.col-md-3').find(".card-text:contains(" + modelo + ")"))($('.col-md-3').find(".card-title:contains(" + marca + ")"))).parent().parent().parent().slideDown();
         
        */
       var precos = prices;


        $grid.isotope({
            filter: function () {
                var precoMaior2 = parseInt($(this).find('.price').text());

                var precoMenor2 = parseInt($(this).find('.price').text());
        
                var marca2 = $(this).find('.card-title').text();
                var modelo2 = $(this).find('.card-text').text();
                return (precoMenor2 >= precos[0] && precoMaior2 <= precos[1])&&(marca2.match(marca) && modelo2.match(modelo));
            }
        })
    });


     

    

})(jQuery);