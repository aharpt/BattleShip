$("button").click(function() {
  $("button").attr("disabled", "true");
  $(this).removeAttr("disabled");
});
