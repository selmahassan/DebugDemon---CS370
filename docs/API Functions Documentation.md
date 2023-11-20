# API Functions

API (Application Programming Interface) calls are requests made by one software application to another. The request allows the application to access data or functionality from the other application. For Swoopermarket, API calls are used between our React frontend and our Postgres database / Blob store.

## Synopsis

All API functions are found in the `src/app/api` directory.

`/comments/route.ts` - houses the GET, POST, and DELET functions for a listing’s comment section. Calls to these functions require a `listing_id`.

`/images/route.ts` - houses the POST and DELETE functions for files in our Vercel Blob store. The POST requires a filename while the DELET requires the URL generated during the POST for that blob.

`/listing/route.ts` - houses the GET and POST functions for product listings. Calls to these functions do not require a `listing_id`.

`/listing/[id]/route.ts` - houses the GET, PUT, and DELETE functions for product listings. The url must contain the `listing_id` after `api/listing/`. These api calls will look up the product listing using the `listing_id` in the database, and will fetch, update, or delete it.

`/user/route.ts` - houses the POST function for adding a new user into the database. Calls to these functions will also create a `hashedPassword` for added user security.

`/user/[id]/route.ts` - houses the GET, PUT, and DELETE functions for users. The url must have the `user_id` after `api/user/`. These api calls will look up the user using the `user_id` in the database, and will fetch, update, or delete it.

`/userlistings/[id]/route.ts` - houses the GET functions for a specific user's listings. The url must have the `user_id` after `/userlistings[id]/route.ts`. The GET api call will look up the listings with the specified `user_id` in the database.

`/userlogin/route.ts` - houses the POST and GET functions to check that a specific user exists in our database when logging in.

`/verify/route.ts` - houses the GET function to verify a user's email after signing up. After a user verifies their email, their verified status is turned to `true` in the database.

## Vercel Postgres API Calls

These API functions are called by the frontend, which passes along which api function should be called on and a JSON of the relevant user inputs. API calls will send a sql query to the Postgres database, storing the response in const messages, and returning messages to the server via `NextResponse.json({ messages }, { status: 200 })`.

### GET Calls

The GET API calls request data from the Postgres database (e.g., listings and user). The GET API calls either get all data from a table, or get a specific row from the table using a valid id. For example, without a valid `listing_id`, like in the `/listing` GET function, all product listings in the `product_listings` table are returned. If there is a valid id, such as a `user_id` or `listing_id`, the get function will fetch all entries with correlating ids.

Example SQL Queries for GET Functions:

- Get one listing: `await sql ‘SELECT * FROM product_listing WHERE Listing_id = ${listing_id};’`
- Get all listings: `await sql'SELECT * FROM product_listing;'`
- Get one user: `await sql ‘SELECT * FROM user_table WHERE userid = ${url_id};’`
- Get all comments for a single listing: `await sql'SELECT * FROM comments_table WHERE Listing_id = ${listing_id} ORDER BY created_at ASC;'`

### POST and PUT Calls

API POST (create) and PUT (update) calls are instigated from `handleSubmit` functions located in pages and components. When a user clicks on a submit function (e.g., creating or editing a new listing, signing up, logging in, etc.) handleSubmit handles the corresponding backend actions to post and put entries to the database.

Example PUT call to create a new listing:

```
const response = await fetch('/api/listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listing),
      });
```

- `../api/listing` : path to `route.ts` file containing appropriate api function
- method: 'POST' : specifying what api function to call (get, post, put, or delete)
- headers: { 'Content-Type': 'application/json' } : server header content
- body: JSON.stringify(listing) : listing is a Listing type object containing relevant listing information (e.g., title, description, category, condition, etc.). It is parsed into a JSON and passed to the api function.

**POST** - awaits input from the user filling out some form from the frontend such as the `/signup` page and the `/newlisting` page. Takes these user inputted fields and sends a query to the database to add a new entry with the inputted information into the appropriate table. Vercel automatically gives each new entry a unique ID when being first posted.

Example POST SQL queries:

- Posting New Comment: `await sql 'INSERT INTO comments_table (Comment_text, Listing_id, User_id)  VALUES (${comment}, ${listingID}, ${userID});'` (listing_id is fetched from the url)
- Posting New Listing: `await sql'INSERT INTO product_listing (Userid, Product_name, Descr, Category_id, Price, Modified_at, Pickup, Condition, Created_at) VALUES (${user_id}, ${title}, ${description}, ${category}, ${price}, NOW(), ${pickup}, ${condition}, NOW());'` (userid is fetched from cookie)
- Posting New User: `await sql 'INSERT INTO user_table (first_name, last_name, email, pass) VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword});'` (hashedPassword is generated using bcrypt. See appropriate docs.)

**PUT** - updates existing entries in the database using user inputs from the frontend such as the `editProfile` or the `editListing` page. Takes these user inputted fields and sends a query to the database to update entries with the new inputted information into the appropriate table. The `listingID` and `userID` needed to access these functions come the URL and from cookies, respectively.

Example PUT SQL Queries:

- Update listing: `await sql 'UPDATE product_listing SET product_name = ${product_name}, descr = ${hard_description}, category_id = ${category_id}, price = ${hard_price}, modified_at = ${Number(Date.now)} WHERE listing_id = ${listing_id} RETURNING *;'`
- Update profile: `await sql 'UPDATE user_table SET pass = ${password}, first_name = ${first}, last_name = ${last}, WHERE userid = ${url_id} RETURNING *;'`

### DELETE Calls

Looks up the product listing, user, or comment using their unique ID and deletes it from the appropriate database table.

Example DELETE SQL Queries:

- Delete profile: `await sql'DELETE FROM user_table WHERE userid = ${url_id} RETURNING \*;’``
- Delete comment: `await sql 'DELETE FROM comments_table WHERE Listing_id = ${listingId} AND User_id = ${user_Id} AND Created_at = ${timestamp} RETURNING *;'`
- Delete listing: `await sql 'DELETE FROM product_listing WHERE listing_id = ${listing_id} RETURNING *;'`

## Calling the [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) Store

Vercel blob allows us to upload and serve images through unique and unguessable URLs. It allows us to easily store blobs of our listing images.

We used server uploads to upload files into our Vercel blob storage. The file is first sent to our server and then to Vercel Blob. Server uploads are limited to the request body our server can handle, which in our case with a Vercel-hosted website is 4.5 MB.

We used [Vercel Blob SDK](https://vercel.com/docs/storage/vercel-blob/using-blob-sdk#using-the-sdk-methods) methods to call Vercel for uploading files.

Example Method Call to PUT file into Vercel Blob:
`src/app/(dashboard)/newlisting/page.tsx`

```
const response = await fetch(
        `/api/images?filename=${image.name}`,
    {
        method: 'POST',
        body: image,
    },
);

const newBlob = (await response.json()) as PutBlobResult;
return newBlob.url
```
