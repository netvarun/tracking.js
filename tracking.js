tracking = function(){
  
  var google = function(){
      
    var timer = 0;
    
    return {
      
      start: function(){
        _gaq = [];
        _gaq.push(['_setAccount', tracking.googleID]);
        timer = (new Date()).getTime();
        this.pageview();
      },
      
      pageview: function(path){
        path ? path : path = document.location.pathname;
        tracking.error ? path = '/_error' + "?page=" + path + document.location.search + "&from=" + document.referrer : '';
        tracking.error = false;
        _gaq.push(['_trackPageview', path]);
      },
      
      event: function(options){
        var event = ['_trackEvent', 
          options.category, 
          options.action
        ];
        options.label ? event.push(options.label) : '';
        options.value ? event.push(options.value) : '';
        _gaq.push(event);
      },
      
      transaction: function(options){
        var transaction = ['_addTrans', 
          options.orderID, 
          options.name, 
          options.total, 
          options.tax, 
          options.shipping, 
          options.city, 
          options.state, 
          options.country
        ];
        _gaq.push(transaction);
        for (var i = 0; i < options.items.length; i++){
          _gaq.push(['_addItem',
            items[i].orderID, 
            items[i].skuID, 
            items[i].name, 
            items[i].variant, 
            items[i].unitPrice, 
            items[i].quantity 
          ]);
        }
        _gaq.push(['_trackTrans']);
      },
      
      end: function(){
        timer = (new Date()).getTime() - timer;
        this.event({
          category: 'Timer', 
          action:   '_pageload', 
          value:    timer
        });
        var script = document.createElement('script');
        script.async = true;
        script.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        document.body.appendChild(script);
      }
      
    }
    
  }();
  
  return {
    
    error: false,
    googleID: 'UA-XXXXX-X',
    
    start: function(){
      google.start();
    },
    
    pageview: function(path){
      google.pageview(path);
    },
    
    event: function(options){
      google.event(options);
    },
    
    transaction: function(options){
      google.transaction(options);
    },
    
    end: function(){
      this.bindEvents();
      google.end();
    },
    
    bindEvents: function(){
      $('a').each(function(){
        var $self = $(this);
        $self.bind('click.tracking', function(){
          tracking.event({
            category: 'Link', 
            action:   $self.attr('href'), 
            label:    $self.text()
          });
        });
      });
      $('button').each(function(){
        var $self = $(this);
        $self.bind('click.tracking', function(){
          tracking.event({
            category: 'Form', 
            action:   $self.parents('form').href('action'), 
            label:    $self.text()
          });
        });
      });
    }
    
  }
  
}();