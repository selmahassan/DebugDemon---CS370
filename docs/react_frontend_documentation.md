# React.js Frontend

The SwooperMarket project uses React.js in combination with Next.js, an open-source React framework used for building web applications. Specifically, the project uses the Next.js [App Router](https://nextjs.org/docs/app), which is an upgrade from the previous Pages Router.

App Router is unique in how it has its routing built into its file and folder structure. See this Next.js [Project Structure](https://nextjs.org/docs/getting-started/project-structure) page on an overview of the structure.

React.js is a JavaScript library for building user interfaces, primarily used for creating interactive and dynamic front-end applications. Some of its key features and benefits include (but are not limited to):
* **Component-Based Architecture**: React uses a component-based approach, breaking down the UI into reusable, self-contained components. This promotes modularity, reusability, and easier maintenance.
* **Virtual DOM**: React utilizes a virtual DOM, a lightweight copy of the actual DOM. When there are changes in the data, React updates the virtual DOM first and then efficiently updates the real DOM, reducing unnecessary re-rendering and improving performance.
* **JSX**: React uses JSX (JavaScript XML), a syntax extension that allows mixing HTML-like code directly within JavaScript. This enables a more intuitive way to write UI components.

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

## src/components

This directory contains React components used throughout the various pages.

`/DeleteModal.tsx` - Defines the Delete modal shown if attempting to delete a listing, comment, or a profile.

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
