$(function()
{
    var $title;
    var $output;
    var page=1;

    $('#btn').on('click',function()
    {
        $title=$('#title').val();
        $('#title').val('');
        $output=$('#movie');
        $output.empty();
        Display(page);
    });

    function Display(page)
    {
        $output.empty();
        $.ajax
        ({
            type:'GET',
            url:'http://www.omdbapi.com/?s='+$title+'&page='+page,
            success: function(data)
            {    
                if(data.Error)
                {
                    $output.append("<div>No movies not found</div>");
                }
                var detail=data.Search;
                // var size=detail.length;
               
                detail.sort(function(a, b) {
                               return parseFloat(b.Year) - parseFloat(a.Year);
                           });
                var images="../images/noimage.jpg";
                $.each(detail, function(i, movies)
                {
                   
                    if(movies.Poster!="N/A")
                    $output.append("<div class='col-sm-6 col-xs-12'><br>Title: "+movies.Title+" <br>Year: "+movies.Year+"<br><img src="+movies.Poster+" alt=''/><br></div>");
                    else
                    $output.append("<div class='col-sm-6 col-xs-12'><br>Title: "+movies.Title+" <br>Year: "+movies.Year+"<br><img src="+images+" alt=''/><br></div>");
                });
               $('#previous').on('click',function()
               {
                page--;
                Display(page);
               });
               $('#next').on('click',function()
               {
                  page++;
                Display(page);
               });
            }
        });
    }
});