define(['jquery'], function($){

  function GlobalOverrides(){
    this.init();
  }

  GlobalOverrides.prototype.init = function(){
    $.ajaxSetup({
      global: true
    });

    $(document).ajaxError(function(event, jqxhr, settings, thrownError){
      //hide the indicator if an error occurs
      hideNewIndicator();
      theApp.alert('An error occured making your request. Please try again.');
    });
  };

  return new GlobalOverrides();
});
