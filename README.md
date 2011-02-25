About
===

tracking.js is a Javascript module for implementing tracking into your web pages. It currently supports Google analytics, with page view, event and transaction tracking. But it could easily extend other metrics providers, as the main functions are abstracted.

It binds click events to "a" and "button" elements by default, and also tracks page load times as a custom event.


Getting started
---

Include the tracking.js file in the head, so it loads first. Call the start method on tracking to get things going.

    <script src="tracking.js"></script>
    <script>
      tracking.start();
    </script>

Then at the bottom of your page, call the end method. Here I've used the document ready function in jQuery, which means it will only get called when the page is fully loaded.

      $(function(){
        tracking.end();
      });

Optionally, you can change your Google analytics ID by setting the googleID object before the start method. The alternative is to just have it set in the tracking.js file.

      tracking.googleID = 'UX-XXXXXX-X';
      tracking.start();

You can also track error pages by setting the error object to true. This is useful for tracking all kinds of errors, and will show up in your Google analytics report as a pageview for "/error".

      tracking.error = true;
      tracking.googleID = 'UX-XXXXXX-X';
      tracking.start();


Page views
---

A useful method if you're loading a new page via ajax:

    tracking.pageview('page.html');

Calling this method without an argument will use the current page path.


Events
---

To track any additional events, you can call the event method, which accepts 4 options in an object:

    tracking.event({
      category: 'Type of event', 
      action:   'What it's doing', 
      label:    'What it's called'
      value:    5 // e.g. if the event is related to a count
    });

The value option isn't used that often. 


Transactions
---

You can track a transaction on a page, like an order confirmation page in an ecommerce store. In this example I've stored the items in it's own object, as in most cases, this would be generated dynamically.

    var items = [
      {
        orderID:    99, 
        skuID:      '1', 
        name:       'T-Shirt', 
        variant:    'Green', 
        unitPrice:  19.99, 
        quantity:   2
      },
      {
        orderID:    99, 
        skuID:      '2', 
        name:       'Hat', 
        variant:    'Black', 
        unitPrice:  9.99, 
        quantity:   1
      }
    ];
    
    tracking.transaction({
      items:    items, 
      orderID:  99, 
      name:     'Mitchell\'s Store', 
      total:    999.99, 
      tax:      9.99, 
      shipping: 1.99, 
      city:     'Sheffield', 
      state:    'Yorkshire', 
      country:  'United Kingdom'
    });

"SkuID" must be unique to each item. And each item relates to an order via the orderID.

References
---

[Google Analytics](http://www.google.com/analytics/)
[Google Analytics API](http://code.google.com/intl/en/apis/analytics/docs/tracking/home.html)
[Chrome extension for debugging Google Analytics](https://chrome.google.com/webstore/detail/jnkmfdileelhofjcijamephohjechhna)
