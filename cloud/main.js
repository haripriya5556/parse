Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('hiii', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define("pay", function(request, response) {
  var params1 = request.params.param1;
  var stripe = require('stripe')('sk_test_7fRg3d7Jbl2UJuUaKBpPY339');
  stripe.customers.create({
    email: 'haripriya257.v@gmail.com'
  }).then(function(customer) {
    return stripe.charges.create({
      amount: 400,
      currency: 'USD',
      card: params1,
      description: 'yourDescription',
    });
  }).then(function(pay) {
  // New charge created on a new customer
  }).catch(function(err) {
  // Deal with an error
  response.success('Payment success');
  });
  });
