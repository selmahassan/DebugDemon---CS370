API Functions

API calls are instigated from handleSubmit functions in page.tsx pages. 
When a user clicks on a submit function, handleSubmit handles the corresponding backend actions to get, post, put, and delete entries from the database.

fetch('../api/user/[id]', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

- '../api/user/[id]' : path to route.ts file containing appropriate api function
- method: 'PUT' : specifying what api function to call (get, post, put, or delete)
- headers: { 'Content-Type': 'application/json' } : server header content
- body: JSON.stringify(user) : user is User type object containing relevant user inputted information. It is parsed into a JSON and passed to the api function.



Synopsis

src/app/api/
comments/
route.ts - houses the get, post, and delete functions for a listing’s comment section. Calls to these functions will require a listing_id.

	
listing/
route.ts - houses the get and post functions for product listings. Calls to these functions do not require a listing_id.
[id]/route.ts - houses the get, put, and delete functions for product listings. The url must have the listing_id after api/listing/[id]. These api calls will look up the product listing using the listing_id in the database, and will fetch, update, or delete it.
	

user/
route.ts - houses the post function for adding a new user into the database. Calls to these functions will also create a hashedPassword for added user security.
[id]/route.ts - houses the get, put, and delete functions for users. The url must have the user_id after api/user/[id]. These api calls will look up the user using the user_id in the database, and will fetch, update, or delete it.
	



Description 

These API functions are called by handleSubmit functions from the frontend. HandleSubmit passes along which api function should be called on and a JSON of the relevant user inputs. 
API call will send a sql query to the Vercel database, storing the response in const messages, and returning messages to the server via NextResponse.json({ messages }, { status: 200 })
	
GET - without a valid id, like in listing’s get function, all product listings in the product_listings table are returned. If there is a valid id, such as user_id or listing_id, the get function will fetch all entries with correlating ids.

- await sql ‘SELECT * FROM product_listing WHERE Listing_id = ${listing_id};’
- await sql`SELECT * FROM product_listing;`;
- await sql ‘SELECT * FROM user_table WHERE userid = ${url_id};’
- await sql`SELECT * FROM comments_table WHERE Listing_id = ${listing_id} ORDER BY created_at ASC;`
	

POST - awaits input from the user filling out some form from the frontend such as /signup page and /newlisting page. Takes these user inputted fields and sends a query to the Vercel database to add a new entry with the inputted information into the appropriate table. Vercel automatically gives each new entry a unique ID when being first posted.
	
- await sql`INSERT INTO comments_table (Comment_text, Listing_id, User_id)  VALUES (${comment}, ${listingID}, ${userID});`
ListingID is fetched from url
await sql`INSERT INTO product_listing (Userid, Product_name, Descr, Category_id, Price, Modified_at, Pickup, Condition, Created_at) VALUES (${user_id}, ${title}, ${description}, ${category}, ${price}, NOW(), ${pickup}, ${condition}, NOW());
user _id is fetched from cookie
- await sql` INSERT INTO user_table (first_name, last_name, email, pass) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword})
hashedPassword is generated using bcrypt. See appropriate docs.


PUT - updates existing entries in the database using user inputs from the frontend such as editProfile or editListing page. Takes these user inputted fields and sends a query to the Vercel database to update entries with the new inputted information into the appropriate table. The listingID and userID needed to access these functions come from cookies.
- await sql`UPDATE product_listing 
                SET product_name = ${product_name}, 
                descr = ${hard_description}, 
                category_id = ${category_id}, 
                price = ${hard_price},
                modified_at = ${Number(Date.now)}
            WHERE listing_id = ${listing_id} 
            RETURNING *;`
- await sql`UPDATE user_table 
                SET pass = ${password}, 
                first_name = ${first}, 
                last_name = ${last}, 
                WHERE userid = ${url_id} 
                RETURNING *;`


DELETE - looks up the product listing, user, or comment using its unique ID and deletes it from the appropriate database table.
- await sql`DELETE FROM user_table WHERE userid = ${url_id} RETURNING *;’
- await sql`DELETE FROM comments_table WHERE Listing_id = ${listingId} AND User_id = ${user_Id} AND Created_at = ${timestamp} RETURNING *;`
- await sql`DELETE FROM product_listing WHERE listing_id = ${listing_id} RETURNING *;`

