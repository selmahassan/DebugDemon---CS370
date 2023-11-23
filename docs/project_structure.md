# SwooperMarket Project Structure

The SwooperMarket project uses Next.js, an open-source React framework used for building web applications. Specifically, the project uses the Next.js [App Router](https://nextjs.org/docs/app), which is an upgrade from the previous Pages Router.

App Router is unique in how it has its routing built into its file and folder structure. See this Next.js [Project Structure](https://nextjs.org/docs/getting-started/project-structure) page on an overview of the structure.

## Top-Level Folders and Files

`/public` - Contains static assets. `public/images/dooley.jpg` is the default profile image for users. This image is also used as the website's favicon (located at `src/app/favicon.ico`)

`/src` - The application source folder that contains all pages, components, types, and apis.

`/next.config.js` - Configuration file for Next.js

`/package.json` - Project dependencies and scripts

`/next-env.d.ts` - TypeScript declaration file for Next.js

`/tsconfig.json file` - Configuration file for TypeScript

## src/app

This directory contains all the pages of the website. These pages comply with the Next.js project structure, where each folder defines a new route. Each folder represents a route segment that maps to a URL segment (see [this page](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) on Next.js routes). `layout.tsx` files define the UI for pages in the same directory and child directories, while `page.tsx` files are the UI that is unique to a route. Folders named in parentheses (e.g., (dashboard) and (login) allow for different root layouts without affecting the route segments. Components can either be loaded on server or client side. By default, components are loaded server side unless there is a `'use client'` modifier at the top of the file.

### /(dashboard)

Folders and pages here compose the dashboard of the website, which contains the home page, new listing page, profile page, edit listing and profile pages, and single item page.

`/layout.tsx` - Defines the root layout for dashboard pages. This layout includes the navigation bar (`/src/components/NavBar/NavBar.tsx`).

`/page.tsx` - Defines the home page. This page fetches all listings from the postgres database and sends them to be displayed by the Listings component (`src/components/HomePage/Listings.tsx`)

`/newlisting/page.tsx` - Defines the new listing page for users to create a new listing. After filling out the form and pressing the button to list an item, a POST request will be sent to the postgres database to post the new listing. If successful, the user is rerouted to their profile page.

`/profile/[slug]/page.tsx` - Defines the profile page. The [slug] in the url is a dynamic route and specifies the userid for this profile page. This page fetches a user's info and their listings from the postgres database. The user's info is sent to the ProfileHeader component (`/src/components/ProfilePage/ProfileHeader.tsx`) and the user's listings are sent to the ProfileListing component (`src/components/ProfilePage/ProfileListings.tsx`).

`/singleitem/[slug]/page.tsx` - Defines a single listing. The [slug] in the url is a dynamic route and specifies the listing_id for this listing. This page fetches the specified listing's info, the info of the user that listed the item, and that item's comments from the postgres database. The listing's photos are sent to the ItemPhotos component (`src/components/SingleItem/ItemPhotos.tsx`), the listing and user info are sent to the ItemDescriptors component (`src/components/SingleItem/ItemDescriptors.tsx`), and the comments are sent to the CommentSection component (`src/components/SingleItem/CommentSection.tsx`).

`/editListing/[slug]/page.tsx` - Defines the page to edit a single listing. The [slug] in the url is a dynamic route and specifies the listing_id for this listing. This page fetches the specific listing's info and passes this info to the EditListingForm component (`src/components/EditListing/EditListingForm.tsx`).

`/editProfile/[slug]/page.tsx` - Defines the page to edit a user's profile. The [slug] in the url is a dynamic route and specifies the userid for this profile. This page fetches the specific user info and passes this info to the EditProfileForm component (`src/components/EditProfile/EditProfileForm.tsx`).

### /(login)

Folders and pages here compose the login workflow of the website, which contains the login, forgot password, rest password, and signup pages.

`/layout.tsx` - Defines the root layout for login pages.

`/login/page.tsx` - Defines the login page, which is a client side page. After filling out the username and password fields and clicking Sign In, a POST request will be sent to the postgres database to check if the given user is valid. If the user is valid, then they will be routed to the home page. This page also has buttons that route to the signup and forgot password pages. If a user's info is not saved in their cookies and local storage, then they will be automatically redirected to this page.

`/signup/page.tsx` - Defines the signup page, which is a client side page. After filling out the fields and clicking Sign Up, a POST request is sent to the postgres database to add a new user.

`/forgot-password/page.tsx` - Defines the forgot password page, which is a client side page. After filling out the email field and clicking Reset My Password, a POST request will be sent to the postgres database, and an email will be sent to the user to reset their password.

`/reset-password/page.tsx` - Defines the reset password page, which is a client side page. After filling out the fields for a new password and clicking Reset My Password, a PUT request will be sent to the postgres database to add a new request.

### api

`/comments/route.ts` - Houses the POST functions for a listing’s comment section. Calls to these functions require a `listing_id`.

`/comments/[id]route.ts` - Houses the GET and DELETE functions for a listing’s comment section. Calls to these functions require a `listing_id`.

`/forgotpassword/route.ts`- Houses the POST and PUT functions for when a user forgets their password. The POST generates a unique password reset token and sends an email to reset the password. The PUT updates the password in the database for that user.

`/images/route.ts` - Houses the POST and DELETE functions for files in our Vercel Blob store. The POST requires a filename while the DELET requires the URL generated during the POST for that blob.

`/listing/route.ts` - Houses the GET and POST functions for product listings. Calls to these functions do not require a `listing_id`.

`/listing/[id]/route.ts` - Houses the GET, PUT, and DELETE functions for product listings. The url must contain the `listing_id` after `api/listing/`. These api calls will look up the product listing using the `listing_id` in the database, and will fetch, update, or delete it.

`/logout/route.ts` - Houses the POST functions for logging a user out. This function removes the user information from the cookies and local storage.

`/user/route.ts` - Houses the POST function for adding a new user into the database. Calls to these functions will also create a `hashedPassword` for added user security.

`/user/[id]/route.ts` - Houses the GET, PUT, and DELETE functions for users. The url must have the `user_id` after `api/user/`. These api calls will look up the user using the `user_id` in the database, and will fetch, update, or delete it.

`/userlistings/[id]/route.ts` - Houses the GET functions for a specific user's listings. The url must have the `user_id` after `/userlistings[id]/route.ts`. The GET api call will look up the listings with the specified `user_id` in the database.

`/userlogin/route.ts` - Houses the POST and GET functions to check that a specific user exists in our database when logging in.

`/verify/route.ts` - Houses the GET function to verify a user's email after signing up. After a user verifies their email, their verified status is turned to `true` in the database.

## src/components

This directory contains React components used throughout the various pages.

`/DeleteModal.tsx` - Defines the Delete modal shown if attempting to delete a listing or a profile.

`/Header.tsx` - Defines the UI of the Header component for the Single Item page.

`/SearchBar.tsx` - Defines the UI of the searchbar in the home page.

`/StickyAlert.tsx` - Defines the UI of success and error alerts in the website.

`/EditListing/EditListingForm.tsx` - Defines the edit listing form for users to edit an existing listing. After filling out the form and pressing the button to update the listing, a PUT request will be sent to the postgres database to update the existing listing. If successful, the user is rerouted to the existing listing. The UI of this form mirrors that of the New Listing page, with a few additional fields in the form.

`/EditProfile/EditProfileForm.tsx` - Defines the edit profile form for users to edit an existing profile. After filling out the form and pressing the button to update the profile, a PUT request will be sent to the postgres database to update the existing profile. If successful, the user is rerouted to the existing profile.

`/HomePage/ListingCard.tsx` - Defines the UI of a single listing card in the home page of the website.

`/HomePage/Listings.tsx` - Defines the searchbar and filter on the home page of the website, as well as calls the ListingCard component to list out all relevant listings.

`/NavBar/NavBar.tsx` - Defines the UI of the Navigation Bar that is called in the layout.tsx of the dashboard.

`/ProfilePage/ProfileHeader.tsx` - Defines the header of the profile page, which includes the profile picture, name, edit profile button (if applicable), email, phone number, and user bio (if applicable).

`/ProfilePage/ProfileListings.tsx` - Calls the ListingCard component to list out all listings for a user. The Available and Sold listings are separated.

`/SingleItem/CommentSection.tsx` - Defines the UI of the comment section in a single listing page, calling the AddComment and UserComment components.

`/SingleItem/ItemDescriptors,tsx` - Defines the UI of the descriptions in a single listing page, calling the ItemHeader, ItemBody, and ItemInterest components.

`/SingleItem/ItemPhotos.tsx` - Defines the UI of the photo in a single listing page.

`/SingleItem/Comments/AddComment.tsx` - Defines the UI of the input section to add a new comment.

`/SingleItem/Comments/UserComment.tsx` - Defines the UI of how comments are displayed.

`/SingleItem/Descriptors/ItemBody.tsx` - Defines the UI of the description, price, condition, and preferred pickup location for a single listing.

`/SingleItem/Descriptors/ItemHeader.tsx` - Defines the UI of the title, status, seller, email, and phone number for a single listing.

`/SingleItem/Descriptors/ItemInterest.tsx` - Defines the UI for the edit, delete, and share buttons on a single listing. If the user presses the delete button, then a DELETE request is sent to the postgres database for that listing.

`/ThemeRegistry/` - Defines the default themes used in the dashboard and login layouts.

## src/enums and src/types

These files define the types for each object.

`enums/category.ts` - Exports the types of categories for a listing and maps it out with the category_ids in the postgres database.

`types/comment.ts` - Exports the types for the values in a Comment object.

`types/commentProps.ts` - Exports the types for the values in a CommentProps object for the props passed to the AddComment and UserComment components.

`types/deleteModalProps.ts` - Exports the types for the values in a DeleteModalProps object for the props passed to the DeleteModal component.

`types/itemDescriptor.ts` - Exports the types for the values in a Descriptor object for a listing.

`types/itemType.ts` - Exports the types for the values in a ItemType object for a single listing.

`types/listing.ts` - Exports the types for the values in a Listing object for a single listing.

`types/stickyAlert.ts` - Exports the types for the values in a StickyAlert object for alerts.

`types/user.ts` - Exports the types for the values in User and Signup_User objects.

`types/userType.ts` - Exports the types for the values in a User object.
