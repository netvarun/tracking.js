$(function(){

  $('footer').waypoint(
    function(event, direction){
      tracking.event({
        category  : 'Waypoint',
        action    : '_bottom'
      });
    }, {
      offset: 'bottom-in-view',
      triggerOnce: true }
  );

  $('body').waypoint(
    function(event, direction){
      tracking.event({
        category  : 'Waypoint',
        action    : '_fold'
      });
    }, {
      offset: '-50%',
      triggerOnce: true }
  );

  $('head').waypoint(
    function(event, direction){
      tracking.event({
        category  : 'Waypoint',
        action    : '_top'
      });
    }, {
      triggerOnce: true }
  );

});