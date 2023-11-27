# React.js Frontend

The SwooperMarket project uses React.js in combination with Next.js, an open-source React framework used for building web applications. Specifically, the project uses the Next.js [App Router](https://nextjs.org/docs/app), which is an upgrade from the previous Pages Router.

App Router is unique in how it has its routing built into its file and folder structure. See this Next.js [Project Structure](https://nextjs.org/docs/getting-started/project-structure) page on an overview of the structure.

React.js is a JavaScript library for building user interfaces, primarily used for creating interactive and dynamic front-end applications. Some of its key features and benefits include (but are not limited to):
* **Component-Based Architecture**: React uses a component-based approach, breaking down the UI into reusable, self-contained components. This promotes modularity, reusability, and easier maintenance.
* **Virtual DOM**: React utilizes a virtual DOM, a lightweight copy of the actual DOM. When there are changes in the data, React updates the virtual DOM first and then efficiently updates the real DOM, reducing unnecessary re-rendering and improving performance.
* **JSX**: React uses JSX (JavaScript XML), a syntax extension that allows mixing HTML-like code directly within JavaScript. This enables a more intuitive way to write UI components.

Please refer to the [official React.js website](https://react.dev/) for more information about the advantages of using the language and how the library works.

## SwooperMarket Pages Overview

The `src/app` directory contains all the pages of the website. These pages comply with the Next.js project structure, where each folder defines a new route. Each folder represents a route segment that maps to a URL segment (see [this page](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) on Next.js routes). `layout.tsx` files define the UI for pages in the same directory and child directories, while `page.tsx` files are the UI that is unique to a route. Folders named in parentheses (e.g., (dashboard) and (login) allow for different root layouts without affecting the route segments. Components can either be loaded on server or client side. By default, components are loaded server side unless there is a `'use client'` modifier at the top of the file.

More information can be found for the pages under the `project_structure.md` documentation page.

## React.js Components Overview

The `src/components` directory contains React components used throughout the various pages. Components are used extensively due to their **modular and reusable nature**, simplifying the development of complex user interfaces. Components in React encapsulate specific parts of the UI, making code more maintainable, readable, and scalable. They promote a declarative and component-based approach, allowing developers to build UI elements independently and compose them together to create larger, more intricate interfaces. Additionally, React's virtual DOM efficiently updates only the necessary parts of the UI when the underlying data changes, optimizing performance and providing a seamless user experience. 

As mentioned, components can be loaded on the server or client side, depending on where they're rendered and executed. Components that are client-side have a `'use-client'` line at the top of the file to specify the type. Otherwise, the component is server-side.

* **Client-Side**:
  * Execution: Client-side components are executed in the browser. The entire component hierarchy is rendered on the client's device.
  * Benefits: Improved performance after the initial load due to quicker interactions and reduced server load.
  * Components that utilize useState must be client-side.
 
* **Server-Side**:
  * Execution: Server-side components are executed on the server before being sent to the client.
  * Benefits: Faster initial page load, better SEO as search engines can crawl content easily, and improved performance on devices with limited processing power.
 
## SwooperMarket Components

`/DeleteModal.tsx` - Defines the Delete modal shown if attempting to delete a listing, comment, or a profile.
```
const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

const handleDeleteModal = () => {
  setShowDeleteModal(!showDeleteModal);
};

// some function to delete listing, comment, or profile from database
const handleDelete = () => {...}

const some_component = () => {
  return (
    <>
      ...
      {showDeleteModal &&
        <DeleteModal
            handleDeleteModal={handleDeleteModal}
            handleDelete={handleDelete}
            deleteType="comment"
        />
      }
    </>
  )
}
```

`/Header.tsx` - Defines the UI of the Header component for the Single Item page.
```
// there are no props for this component
<Header/>
```

`/SearchBar.tsx` - Defines the UI of the searchbar in the home page.
```
<SearchBar
  placeHolderText="Search SwooperMarket"
  onSearch={handleSearch} // some function to handle when the user submits their search
/>
```

`/StickyAlert.tsx` - Defines the UI of success and error alerts in the website.
```
const [openSuccess, setOpenSuccess] = useState(false);
const [openError, setOpenError] = useState(false);

// depending on the state of the website, use setOpenSuccess() and setOpenError()
...

<StickyAlert
  successMessage="You've successfully listed your item on SwooperMarket!"
  errorMessage="An error has occurred with listing your item on SwooperMarket"
  openSuccess={openSuccess}
  setOpenSuccess={setOpenSuccess}
  openError={openError}
  setOpenError={setOpenError}
/>
```

`/EditListing/EditListingForm.tsx` - Defines the edit listing form for users to edit an existing listing. After filling out the form and pressing the button to update the listing, a PUT request will be sent to the postgres database to update the existing listing. If successful, the user is rerouted to the existing listing. The UI of this form mirrors that of the New Listing page, with a few additional fields in the form.
```
<EditListingForm
  listing={listing} // listing is an ItemType object obtained from the database
/>
```

`/EditProfile/EditProfileForm.tsx` - Defines the edit profile form for users to edit an existing profile. After filling out the form and pressing the button to update the profile, a PUT request will be sent to the postgres database to update the existing profile. If successful, the user is rerouted to the existing profile.
```
<EditProfileForm
  user={user} // user is an User object obtained from the database
/>
```

`/HomePage/ListingCard.tsx` - Defines the UI of a single listing card in the home page of the website.
```
<ListingCard
  item={item} // item is an ItemType object obtained from the database
/>
```

`/HomePage/Listings.tsx` - Defines the searchbar and filter on the home page of the website, as well as calls the ListingCard component to list out all relevant listings.
```
<Listings
  listings={listings} // listings is an array of product listings obtained from the database
/>
```

`/NavBar/NavBar.tsx` - Defines the UI of the Navigation Bar that is called in the layout.tsx of the dashboard.
```
// there are no props for this component
<NavBar/>
```

`/ProfilePage/ProfileHeader.tsx` - Defines the header of the profile page, which includes the profile picture, name, edit profile button (if applicable), email, phone number, and user bio (if applicable).
```
<ProfileHeader
  user_info={user_info} // user_info is an User object obtained from the database
/>
```

`/ProfilePage/ProfileListings.tsx` - Calls the ListingCard component to list out all listings for a user. The Available and Sold listings are separated.
```
<ProfileListings
  listings={user_listings} // listings is an array of product listings obtained from the database
  user_info={user_info} // user_info is an User object obtained from the database
/>
```

`/SingleItem/CommentSection.tsx` - Defines the UI of the comment section in a single listing page, calling the AddComment and UserComment components.
```
<CommentSection 
  comments={comment} // comments is an array of Comment objects
  listingid = {slug} // slug is the product listing ID obtained from the single item page URL
  username = {name}
/>
```

`/SingleItem/ItemDescriptors,tsx` - Defines the UI of the descriptions in a single listing page, calling the ItemHeader, ItemBody, and ItemInterest components.
```
<ItemDescriptors
  descriptors={descriptions} // descriptors is a Descriptor object
  listingId={slug}
  userid={listings.userid}
  image={listings.listing_img} // image is a string
/>
```

`/SingleItem/ItemPhotos.tsx` - Defines the UI of the photo in a single listing page.
```
<ItemPhotos
  photos={newPhoto}
/>
```

`/SingleItem/Comments/AddComment.tsx` - Defines the UI of the input section to add a new comment.
```
const [commentsList, setCommentsList] = useState(comments);
const [numOfComments, setNumOfComments] = useState(comments.length);

...

<AddComment
  commentsList={commentsList}
  setCommentsList={setCommentsList}
  numOfComments={numOfComments}
  setNumOfComments={setNumOfComments}
  listingid={listingid}
  username={username}
/>
```

`/SingleItem/Comments/UserComment.tsx` - Defines the UI of how comments are displayed.
```
const [commentsList, setCommentsList] = useState(comments);
const [numOfComments, setNumOfComments] = useState(comments.length);

...

{commentsList.map((item) => (
  <div key={item.comment_id}>
    <UserComment
      commentid={item.comment_id}
      username={item.user_name}
      userid = {item.user_id}
      comment={item.comment_text}
      time={formatDate(item.created_at)}
      commentsList={commentsList}
      setCommentsList={setCommentsList}
      numOfComments={numOfComments}
      setNumOfComments={setNumOfComments}
    />
  </div>
))}
```

`/SingleItem/Descriptors/ItemBody.tsx` - Defines the UI of the description, price, condition, and preferred pickup location for a single listing.
```
<ItemBody
  description={descriptors.description}
  price={descriptors.price}
  condition={descriptors.condition}
  pickup={descriptors.pickup}
/>
```

`/SingleItem/Descriptors/ItemHeader.tsx` - Defines the UI of the title, status, seller, email, and phone number for a single listing.
```
<ItemHeader 
  sold={descriptors.sold}
  title={descriptors.listingTitle}
  seller={descriptors.sellerId}
  email={descriptors.email}
  phone={descriptors.phone}
  userid={userid}
/>
```

`/SingleItem/Descriptors/ItemInterest.tsx` - Defines the UI for the edit, delete, and share buttons on a single listing. If the user presses the delete button, then a DELETE request is sent to the postgres database for that listing.
```
<ItemInterest
  listingId={listingId}
  userid={userid}
  image={image}
/>
```

`/ThemeRegistry/` - Defines the default themes used in the dashboard and login layouts.
```
<ThemeRegistry>
  <Box
    component="main"
    sx={{
      bgcolor: 'background.default',
    }}
  >
    {children}
  </Box>
</ThemeRegistry>
```
