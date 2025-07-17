javascript and the DOM
-------------------------------------------------------------
dir() // show all node structure
> node; / /shows element html
> querySelector // brings element node
> querySelectorAll // returns array of all the elements/
Enhancing the DOM
-----------------
create DOM elements
var myElement = document.createElement('img');
use .att when you set a standard att.
> myElement.src = 'images/artists/LaVonne_LaRue_tn.jpg';
> myElement.alt = 'photo of LaVonne LaRue';

use setAttribute to set non-standard att to the element
> myElement.setAttribute('data-task', 'speaker');

add to the dom
> var myNode = document.querySelectorAll('.artistlist ul li');
> myNode[6].appendChild(myElement);
appendChild lacks precision

you can use insertBefore/insertAfter for precise location inserts. not just as children.

> var pNode = document.createElement('p');
> var myText = document.createTextNode('LAL ALA DL ADKAKLDJALKDJAL JKDDKAJDLAK JDALK DA');
> pNode.appendChild(myText);
> var venue = document.querySelector('#thevenue');
> dir(venue); // to see which position to put it
> venue.insertBefore(pNode, venue.childNodes[5]);


Cloning nodes
----------------
> node.cloneNode();// passing true as param you copy all the inner nodes too.
> var newNode = myNode.cloneNode(true);
remove original node from DOM
removes the ori node from the parent with: 
> myNode.parentNode.removeChild(myNode)

Replace nodes
-----------------------------
since your are replacing the child you have to call it from the parent node.
Saves the step of deleting the original  node.
> toBeReplacedNode.parentNode.replaceChild(replacementNode, toBeReplacedNode);

events
------------------------------
myNode.addEventListener();
