HEROKU BACK END API platform
http://reduxblog.herokuapp.com/

it does not saves user info so we need to identify in each request with a key posts that bleong to a particular user.
use the same key

key=javierH123

post id:   "id": 86612

get all psots for javier
http://reduxblog.herokuapp.com/api/posts?key=javierH123

get ONE post for javier
http://reduxblog.herokuapp.com/api/posts/86612?key=javierH123

APIS can have protection of how many requests per sec, to avoid loops generating many requests at once, by mistake.