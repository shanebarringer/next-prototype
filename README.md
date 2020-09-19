# Next.js Assessment


Currently, we are facing a few issues in our client-rendered applications that may be resolved through server-side rendering. So, over the past few days, I've experimented with Next.js to see if it's a viable option for our team. My aim was to determine the level of effort involved with moving to Next/SSR and evaluate the viability.


## Pros & Cons 

The official Next tutorial is an excellent introduction. In addition to my own notes, I've included images, highlights, and code snippets that seemed useful. All of this can be found below. 

Before jumping into the notes, I want to highlight some key takeaways. 

The conventions around Next are pretty straight-forward and it's very easy to get up and running. However, like most frameworks, once you travel off the beaten path, things can become difficult. 

### Setup & Config

Setting up Redux & Sagas proved to be very difficult. Primarily due to recommended libraries being deprecated or out of sync with the official Next.js recommendations. 
This issue led to having to rely primarily on examples in the source code, with a largely trial & error approach to setup & configuration. 

Thankfully, once the initial setup and confusion was out of the way, our existing patterns were fairly easy to implement. 

While this is a concern, having a reliable set of team-oriented documentation and best-practices should mitigate many of the issues I encountered. 

### Initial Takeaway

It seemed like daily my opinion changed on whether or not Next.js is the right fit. And if I'm being completely honest, I'm still not sure.

There are many benefits to having a reliable production focused framework powering our application. However, the learning curve was a little steeper than I anticipated. 

Will this address our current and future needs? I believe so.  
However, if we move forward, I would advise doing so with patience and caution. 


Now, on to the fun stuff 🎉

---


## Create Next App
Next has a very nice Create-React-App (CRA) like CLI that scaffolds an app. In many ways, this tool is more robust than CRA. 

In addition you can use any of the [examples](https://github.com/vercel/next.js/tree/canary/examples) to spin up a fully functioning example app. 

```shell
$ yarn create next-app --example with-redux
```

---

## Routing & Pages

Routing with Next couldn't be easier as the routing is primarily **file based**, meaning: 

> Pages are associated with a route based on their file name. For example, in development:
>	- `pages/index.js` is associated with the `/` route.
>	- `pages/posts/first-post.js` is associated with the `/posts/first-post` route.



This method has a few quirks, but once you become accustomed, it's pretty easy to find an approach that works. 


### Nested & Dynamic Routes

> Next.js allows you to statically generate pages with paths that depend on external data. This enables dynamic URLs in Next.js

Nested routes work as you would expect. However the naming convention is slightly different. In the example application you'll see the following file structure: 

![public/pages-directory.png]


You'll notice an unusual _bracket_ syntax under `blogs` and `users`: `/blogs/[title].js` & `/users/[id]/todos.js`

This syntax allows for dynamic values to be utilized for various components. The brackets represent the value (ex: user ID, blog title, etc.)

_note: the bracket syntax can be used for files or directories_


![public/dynamic-route-steps-1.png]

#### Steps: 
_note: `getStaticPaths` & `getStaticProps` will be covered later in this document._

>- Create a file in `pages/post` directory named `[id].js`[]
  *Pages that begin with [ and end with ] are dynamic routes in Next.js.*
>- `export` an `async` function named `getStaticPaths` from this page. 
  *In this function... return a list of possible values for id.**
>- Finally...implement `getStaticProps` again - this time, to fetch necessary data for the blog post with a given id


--- 

## Walkthrough

While Next.js has quite a few awesome features like internal API routes and direct interactions with a DB, our scope will be limited working with data fetched from a seperate API. 

Ultimately, this prototype seeks to mimic our current application structure and configuration. 

It's worth noting that usage with redux-saga is still a work in progress. The existing libraries have been deprecated, so much of this prototype's structure relies on information derived from studying the source code found in the Vercel/Next.js examples directory. 


### Initial Setup

Our setup requires configuration of the store which can be found in `store/index.js`


*the highlights*
```javascript
import { applyMiddleware, createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
// additional imports


const bindMiddleware = (middleware) => {
  // redux devtool config
  return applyMiddleware(...middleware);
};

// create a makeStore function, and pass in middleware
export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });

```


1. `bindMiddleware`- sets up store to work with sagas and any other middleware
2. `makeStore` - creates an instance of the store
	1. setup saga middleware
	2. create instance of store
	3. `store.sagaTask` - create a mechanism for running our sagas when the appropriate actions are dispatched (we'll see this in use later on)
3. `createWrapper` uses the [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) library to create a Higher Order Component (HOC) for use throughout our application. 

### Hydration

You'll notice in each reducer we first check to determine if the `HYDRATE` action has been dispatched. 

The [NRW Docs](https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration) talk about this in more depth. 

However, for our purposes, the major point is this action is dispatched/invoked whenever a ser navigates to a page calling for props at build time or directly from the server. 

This can cause reconciliation issues when navigating to nested components as your state could accidentally be erased. To avoid this, we'll do the following: 


```javascript
const initialState = {
  data: [],
  error: null,
  isFetching: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      if (state.data.length) {
        nextState.data = state.data;
        return nextState;
      }
    
	// normal actions...
	
    default:
      return state;
  }
};
```

*When the `HYRDATE` action is dispatched*
1. create a `nextState` object
2. use previous state and pass in any data from the action's payload
3. _if_ the state already had data
	1. Apply existing state to new state (as it will otherwise likely be erased)
	2. return the new state object

_note: there are probably more elegant ways to accomplish this_

---



