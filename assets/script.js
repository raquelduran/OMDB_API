 jQuery(document).ready(function($) {
 
    $(".scroll a, .navbar-brand, .gototop").click(function(event){   
    event.preventDefault();
    $('html,body').animate({scrollTop:$(this.hash).offset().top}, 600,'swing');
    $(".scroll li").removeClass('active');
    $(this).parents('li').toggleClass('active');
    });
    });






var wow = new WOW(
  {
    boxClass:     'wowload',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true        // act on asynchronously loaded content (default is true)
  }
);
wow.init();




$('.carousel').swipe( {
     swipeLeft: function() {
         $(this).carousel('next');
     },
     swipeRight: function() {
         $(this).carousel('prev');
     },
     allowPageScroll: 'vertical'
 });


$(document).ready(function(){
    var page = 0;
    var lastPage = 0;
    $("#works").append("<div class='not_results'><br><br><br><br><br><br><br><br><br><p></p></div>")
     $(".spinner").hide();


    $("input").on('keyup', function (e) {
        if (e.keyCode == 13) {
            $("#works").html("");
            page = 1;
            $(".spinner").show();
            llamada();
        } 
    });

    function llamada(){
        var titulobuscado = $("input").val();
            $.getJSON("https://www.omdbapi.com/?s="+titulobuscado+"&page="+page, function(data){
               $.ajaxSetup({ cache: false });
               if (data.Search){
                  $.each(data.Search, function(i, field){
                    if (field.Poster == "N/A"){field.Poster="images/not_available.png";}
                    $("#works").append("<figure class='effect-oscar  wowload fadeInUp'><img src="+field.Poster+"    width='200%' height='500px'/><figcaption><h2>"+field.Title+"</h2><p>"+field.Year+"<br><a href="+  field.Poster+"title='1' data-gallery>Watch now</a></p></figcaption></figure>")
                    });
                } else{
                  $("#works").html("");
                  $("#works").append("<div class='not_results'><br><br><br><br><br><br><br><br><br><p>Sorry, no movies were found. Try searching for something else. </p></div>")
                }
                if (data.totalResults) {
                      lastPage = data.totalResults / 10;
                }
                $(".spinner").hide();
           });

    }
    $(window).scroll(function() {
      if(page > 0 && page <= lastPage){
        if($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
          $(".spinner").show();
          page++;
          llamada();
       }
      }
  });

});
;

