

## Security considerations

### JWT token authentication

- We store a hashed password in our database, in case there's any leak of data because of data breach. 
- The password hash is generated by adding a 10 bit salt, which allows for us to generate 10 hashes/sec on a 2.4ghz core processor.
- A json web token is used to authenticate a user's identity which is stored on client's local storage.
- Fine for simple authentication applications.
- Web storage based auth using localstorage/webstorage are vulnerable to wide open range of XSS (cross site scripting) attacks
- A much better robust implementation would be to use cookies for the additional security they provide, and the simplicity of 	     	 protecting against CSRF attacks. Or use Oauth.


## Design Decisions

### Maintainability

- We use graphql to handle our request between our client and our API
	- The API because of it's strict typing and explicit schema definations, it is becomes easier to write 
	  queries that perform robustly and provide proper error handling
	- The API because of it's explicit nature, makes sure the integrity of data in the database is maintained
	- As all queries, mutations and subscribtions are available in one place, it is easier to make the changes 
	   in the API and allow it to grow in the desired direction.
	- Graphql also provides automatic doumentation generation tools, which make it easier to maintain the codebase growth


### Job market

- The tech stack that we employ, has a strong market of providing skilled developers who can maintain and develop the code base
- Lots of developers can learn using MERN/MEAN/GRAND stack quickly because of surplus documentation and tutorials available
- Many are open source based frameworks, which have strong community support

### Security and Upgrades

- React, Mongodb, Express and Node are heavily used by the community and have a strong community support, and it seems less
likely there will be any other major alternative emerging out, atleast for a few years.

regularly 
  get a security based patched and upgrades.