/**
 * Created by Owner on 24/03/2017.
 */
//Write a program to calculate the total price of your phone purchase.
// You will keep purchasing phones (hint: loop!) until you run out of
// money in your bank account. You'll also buy accessories for each
// phone as long as your purchase amount is below your mental spending threshold.
var totalPrice = 0;
var tax = 0;

var PHONE_PRICE = 300;
var TAX_RATE = 0.15;
var ACC_PRICE = 9.99;
var SPENDING_THRESHOLD = 350;

var bankAccountBalance = prompt("What's your bank account balance? ");

while (bankAccountBalance >= PHONE_PRICE) {
  break;// entra en loop infinito
  console.log(
    'I have money on the account. I will try to buy a phone and some accesories ... '
  );

  //buy the phone
  totalPrice = +PHONE_PRICE;
  console.log('Bought a phone for: $' + PHONE_PRICE);

  //buy accs
  while (totalPrice + ACC_PRICE < SPENDING_THRESHOLD) {
    console.log(
      'I can spend a bit more in this purchase. ' +
        'I am buying an accesory for: $' +
        ACC_PRICE
    );
    totalPrice += ACC_PRICE;
    break;
  }
  console.log('amount ot pay (ph + accs): $' + totalPrice);

  tax = getTax();
  console.log('tax is: $' + tax);
  totalPrice = totalPrice + tax;

  var formattedTotalPrice = getFormattedPrice(totalPrice);

  console.log('Total price ' + formattedTotalPrice);

  if (totalPrice <= bankAccountBalance) {
    console.log('Buying phone !!');
    bankAccountBalance -= totalPrice;
  } else {
    console.log("I can't afford it !!");
  }
  console.log('Your balance is ' + bankAccountBalance);
}
console.log('Cant buy any more phones, balance is ' + bankAccountBalance);

function getTax() {
  return totalPrice * TAX_RATE;
}
function getFormattedPrice(amount) {
  return '$' + amount;
}

//After you've calculated your purchase amount, add in the tax, then print out the
// calculated purchase amount, properly formatted.

//Finally, check the amount against your bank account balance to see if you can
// afford it or not.

//You should set up some constants for the "tax rate," "phone price,"
// "accessory price," and "spending threshold," as well as a variable for your
// "bank account balance.""

//You should define functions for calculating the tax and for formatting the price
// with a "$" and rounding to two decimal places.

// Bonus Challenge: Try to incorporate input into this program, perhaps with the
// prompt(..) covered in "Input" earlier. You may prompt the user for their bank
// account balance, for example. Have fun and be creative!
