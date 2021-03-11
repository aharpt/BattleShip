
if(localStorage.getItem("isDark")==1)
{
  console.log("isDark")
  $( "body" ).addClass( "dark" );
  $( "#mya1" ).addClass( "dark" );
  $( "#mya2" ).addClass( "dark" );
  $( "#mya3" ).addClass( "dark" );
  $( "#mya4" ).addClass( "dark" );
  $( ".change" ).text( "ON" );
}
else{
  console.log("not Dark")
  $( "body" ).removeClass( "dark" );
  $( "#mya1" ).removeClass( "dark" );
  $( "#mya2" ).removeClass( "dark" );
  $( "#mya3" ).removeClass( "dark" );
  $( "#mya4" ).removeClass( "dark" );
  $( ".change" ).text( "OFF" );
}

$( ".change" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
        $( "body" ).removeClass( "dark" );
        $( "#mya1" ).removeClass( "dark" );
        $( "#mya2" ).removeClass( "dark" );
        $( "#mya3" ).removeClass( "dark" );
        $( "#mya4" ).removeClass( "dark" );
        $( ".change" ).text( "OFF" );
        localStorage.setItem("isDark", 0);

        console.log(localStorage.getItem("isDark"))
    } else {
        $( "body" ).addClass( "dark" );
        $( "#mya1" ).addClass( "dark" );
        $( "#mya2" ).addClass( "dark" );
        $( "#mya3" ).addClass( "dark" );
        $( "#mya4" ).addClass( "dark" );
        $( ".change" ).text( "ON" );
        localStorage.setItem("isDark",1);

        console.log(localStorage.getItem("isDark"))
    }
});
