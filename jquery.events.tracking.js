$(function(){
  
  $('a').each(function(){
    var $self = $(this);
    $self.bind('click.tracking', function(){
      tracking.event({
        category  : 'Link', 
        action    : $self.attr('href'), 
        label     : $self.text()
      });
    });
  });
  
  $('button').each(function(){
    var $self = $(this);
    $self.bind('click.tracking', function(){
      tracking.event({
        category  : 'Form', 
        action    : $self.parents('form').href('action'), 
        label     : $self.text()
      });
    });
  });

});