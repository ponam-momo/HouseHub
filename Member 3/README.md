# HouseHub

(House Rental Management System)

Software Engineering Project Report

Course Code:3112

B.sc in Computer Science

Submitted by:

Punom Das Momo(202204031)	Foujia Akther(202204009)	Mansora Akther Mim (202104028)
		
Session:2022-23

Department of Computer Science and Engineering 
Netrokona University,Netrokona
 
1.	 Introduction
	 
1.1	Purpose

Finding a rental house or room is usually a tiring process. People have to walk around different areas, ask locals, or depend on brokers who often charge extra money. On the other side, house owners also don't have a proper platform to advertise their vacant rooms/flats. Our project "HouseHub" tries to solve this problem by giving both sides a common platform - owners can post their property with details and pictures, and tenants can search and filter according to their need and directly send a request to the owner.

1.2	Project Scope

The system will have two main types of users - Owner and Tenant, and an Admin will look after the platform from behind.Features like Google Map integration, real time chat and online payment are not included in this version, they are mentioned later as future scope.


2.	 Overall Description
	 
2.1	Existing Problem
Right now most people find rooms/houses through Facebook groups, local brokers, or by physically visiting an area and asking around. This takes a lot of time and there is no way to filter or compare options properly. HouseHub aims to bring this whole process onto one website.

2.2	User Classes

User Type (	What they can do )
Owner	(Sign up, post a listing (house/room) with details and photos, edit or delete it, view and respond to requests from tenants.)
Tenant	(Sign up, search/filter listings, view listing details, save listings to wishlist, send a request to the owner if interested.)
Admin	(Login to a separate dashboard, view all users and listings, block a user or remove a fake/duplicate listing.)

2.3	Operating Environment

-	Runs in a web browser (Chrome/Firefox), no installation needed for the user
-	Backend server built on Node.js and Express.js
-	Database: MySQL
-	Works on both laptop and mobile screen (responsive design using Bootstrap)
-	
2.4	Constraints
-	A person has to be logged in to post a listing or to send/accept a request
-	Anyone (without login) can just browse and search listings
 
-	Password will never be stored as plain text, it will be hashed
-	Only the Admin account can delete a user permanently
2.5	Assumptions
-	Every user registers with a unique, working email address
-	Server and database will be running while the app is being demoed/used
-	Images uploaded will be in normal formats like jpg/png

3.
# Functional_Requirements	( Features We Are Planning to Build )

3.1	Registration and Login
A new user can sign up by choosing whether they are an Owner or a Tenant, then fill up a small form (name, email, password, phone). Existing users log in with email and password. We are planning to use JWT so that the user stays logged in during the session.

3.2	Post/Manage Listing (Owner side)

Owner can add a new listing with title, description, location (area/district), rent amount, room type (single room/full house/mess), number of bedrooms, and available amenities (wifi, gas, parking, furnished, etc). Owner can also edit or delete their own listing later, and upload more than one photo per listing.

3.3	Search and Filter (Tenant side)

Tenant can see all the listings in a card/grid layout, and use filters (location, price range, room type) to narrow down the results. There will also be a simple keyword search box on top.

3.4	Listing Details Page

When a tenant clicks on any listing, it opens a details page showing all the info, an image gallery, and the owner's contact number/email.

3.5	Interest Request System

Instead of directly showing everyone's phone number, the tenant will click an "Interested" button which sends a request to the owner. The owner will see this in their dashboard and can Accept or Reject it. Once accepted, the tenant gets the contact details.

3.6	Wishlist / Save for Later

Tenant can bookmark a listing to check it again later, this will be under a "My Saved Listings" page.

3.7	Admin Dashboard

A basic dashboard for admin to see the list of users and listings, and take action (block user / remove listing) if something looks fake or inappropriate.

3.8	Review and Rating - optional, if time permits

If we get time after finishing the core features, we will try to add a simple star rating + comment option for tenants who already rented through the platform.
 
4.	 Database Design (Basic Idea)
	 
Below is a rough idea of the main tables we will need. This may change a bit once we start actual implementation.

Table _ 	Key Fields	 _ Notes

users _	          id, role	name, email, password(hashed), phone, role(owner/tenant/admin)
listings_	      id, owner_id	title, description, location, price, room_type, bedrooms, amenities, status
listing_images_   id, listing_id	image_url
requests_	      id, listing_id, tenant_id	status(pending/accepted/rejected), created_at
wishlist_	      id, tenant_id, listing_id	just a reference table to store saved listings


5.	
# Non-Functional Requirements
-	Security - password hashing (bcrypt), JWT for login sessions, basic input validation on every form
-	Usability - simple and clean UI using Bootstrap so it looks fine on mobile too
-	Performance - search results should load quickly, within 2-3 seconds normally
-	Maintainability - backend code will follow MVC pattern (routes/controllers/models) so it's easier for the team to work on different parts without conflict

6.	 Tools and Technology

Part	Technology
Frontend	HTML, CSS, Bootstrap 5, JavaScript (fetch API)
Backend	Node.js, Express.js
Database	MySQL
Auth	JWT + bcrypt
Image Upload	Multer


7.	 Rough Timeline

Week	Work	Who

1-2 	Requirement gathering, writing this report, DB schema	All

3-5 	Auth module, Admin panel, and related frontend pages	Member 1

3-7	    Listing CRUD, image upload, and related frontend pages	Member 2

3-7	    Search/filter, request system, wishlist, and frontend   integration	Member 3

 
 9	Putting everything together, testing	All
10	Fixing bugs, finishing report, final submission	All


8.	 Team Work Division

 Member 1 – Authentication & Security, User Profile Management, the Admin Dashboard, login/signup, JWT-based session handling, password hashing, and role-based access control (backend + frontend).
 
 Member 2 – Property Listing Management: add/edit/delete listings, image upload, and the Listing Details Page (backend + frontend).
 
 Member 3 – Search & Filter system, the Interest Request/Approval system, and Wishlist (backend + frontend).
 
All three members will review each other's modules and take part together in the integration and testing phase (Week 9), so that everyone develops a clear understanding of HouseHub as a whole system, not just their own individual part.

9.	
# Future Scope
-	Google Maps integration to show listing location
-	Real time chat between owner and tenant
-	Online advance payment for booking
-	Verified badge for owners after NID verification

10.	 Conclusion
With the features listed above, HouseHub covers all the basic things expected from a full-stack web application - authentication, role-based access, CRUD operations, image upload, and search/filtering - while staying realistic for the team to finish within the project timeline. We have kept the harder features like maps and payment for later so that we can focus on getting the core system working properly first.
