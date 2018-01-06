import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

/* IN OUR TESTS */
let routes = [
    {
        method: 'GET',
        url: 'quotes/',
        response: [
            {id: 14, body: "You know what the chain of command is? It's the chain I go get and beat you with until you understand who's in ruttin charge here."},
            {id: 22, body: 'Also? I can kill you with my brain.'}
        ]
    },
    {
        method: 'POST',
        url: 'quotes/',
        response: {id: 23, body: 'Terse? I can be terse. Once, in flight school, I was laconic.'}
    },
    {
        method: 'GET',
        url: 'quotes/18/',
        response: {id: 18, body: 'Curse your sudden but inevitable betrayal!'}
    },
    {
        method: 'GET',
        url: 'login/',
        response: {token: 'this token'}
    },
    {
        method: 'POST',
        url: 'login/',
        response: {token: 'this token'}
    },
];

Vue.http.interceptors.unshift((request, next) => {
    let route = routes.find((item) => {
        return (request.method === item.method && request.url === item.url);
    });
    if (!route) {
        console.log(route);
        // we're just going to return a 404 here, since we don't want our test suite making a real HTTP request
        next(request.respondWith({status: 404, statusText: 'Oh no! Not found!'}));
    } else {
        next(
            request.respondWith(
                route.response,
                {status: 200}
            )
        );
    }
});


window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

    window.$ = window.jQuery = require('jquery');

    require('foundation-sites');


/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
