



# Meeting Room Booking Service Backend

A robust backend solution for a Meeting Room Booking System, developed using TypeScript (tsc), Mongoose, and Node.js. This system efficiently handles complex functionalities and serves RESTful APIs, supporting various CRUD operations to manage meeting room bookings seamlessly.

🚀 Live Link : https://meeting-room-booking-system-backend-chi.vercel.app/

## Tech Stack


**Server:** 
[NodeJS](https://nodejs.org/), [ExpressJS](https://www.expresjs.org/), [MongoDB](https://www.mongodb.com/), [Zod](https://zod.dev/), [Mongoose ODM](https://mongoosejs.com/), [JWT](https://www.npmjs.com/package/jsonwebtoken)


## Working of this project
### Purpose:

The Meeting Room Booking System is designed to facilitate the efficient management and booking of meeting rooms within an organization. It aims to streamline the process of checking room availability, making reservations, and managing user roles and permissions. The system ensures that booking conflicts are avoided and provides a secure and user-friendly interface for administrators and users alike.

### Functionality:

#### User Authentication and Role Management:

- Users can sign up and log in to the system.
- Roles (e.g., 'user' and 'admin') are assigned to users, dictating their access levels and permissions.
- Secure password handling and role-based access control ensure data security and appropriate access.
#### Meeting Room Management:

- Administrators can add, update, and delete meeting rooms.
- Each room has detailed information, including location, capacity, pricePerSlot and available amenities.
#### Booking Management:

- Users can check the availability of meeting rooms in real-time.
- Users can book available meeting rooms by specifying the date, time slots, and room preferences.
- The system prevents booking conflicts by ensuring that overlapping bookings for the same room are not allowed.

#### Slot Management:

- Administrators can define and manage time slots for each meeting room.
- Time slots can be created, updated, or deleted based on the organization’s requirements.
- The system ensures that time slots are properly allocated to avoid overlaps and double bookings.
- Users can select specific time slots for their meetings during the booking process, ensuring precise scheduling.
- Only available (unbooked) slots are displayed to users, enhancing the efficiency of the booking process.

#### CRUD Operations:

- The system supports Create, Read, Update, and Delete operations for users, rooms, and bookings.
- Users can view and manage their own bookings.
- Administrators have full control over all entities within the system.

#### Data Validation and Error Handling:

- Data validation is performed using Zod to ensure that all input data is correct and meets the required criteria.
- Custom error handling middleware manages errors gracefully, providing clear and concise error messages to the user.

#### Integration with MongoDB:

- Mongoose is used to model and interact with the MongoDB database.
- The database stores all relevant information, including user data, room details, and booking records.
- Efficient querying and data manipulation ensure quick response times and a smooth user experience.

Overall, the Meeting Room Booking System provides a comprehensive solution for managing meeting room bookings, enhancing productivity and organization within a company.
## Installation Guide
* Clone this repository [here](https://github.com/Nazmos27/meeting-room-booking-system-backend.git).
* The main branch is the most stable branch at any given time, ensure you're working from it.
* Then run this command to install all dependencies
```bash
  npm install
```
* You can either work with your MongoDB database or use your locally installed MongoDBCompass. Do configure to your choice in the application entry file.
* Create an .env file in your project root folder and add your variables. Variables name will be as of the Capital letter named of process.env.variables of the configure.ts file
### Usage
* Run this command to start the application.
```bash
  npm run start:dev
```
 
* Connect to the API using Postman on port 5000.


### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`NODE_ENVIRONMENT`
`DATABASE_URL`
`BCRYPT_SALT_ROUND`
`JWT_ACCESS_SECRET`


## API Reference

1. **User Sign Up**
-   _*Route:*_ `/api/auth/signup` (POST)
-   **Request Body:**

```json
{
  "name": "Md. Nazmos Sakib",
  "email": "sakib@gmail.com",
  "password": "secret-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "Dhaka, Bangladesh"
}
  
```




**2\. User Login**

-   _*Route:*_ `/api/auth/login` (POST)
-   **Request Body:**

```json
{
    "email": "sakib@gmail.com",
    "password": "secret-password",
}
```

### Room Routes

  
**3\. Create Room (Only Accessible by Admin)**

-   _*Route:*_ `/api/rooms` (POST)
-   **Request Headers:**

```plain
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

-    _*Request Body:*_

```json
{
  "name": "Conference Room",
  "roomNo": 201,
  "floorNo": 1,
  "capacity": 20,
  "pricePerSlot": 100,
  "amenities": ["Projector", "Whiteboard"]
}

```

**4\. Get a Room**

-    _*Route:*_ `/api/rooms/:id` (GET)


**5\. Get All Rooms**

-    _*Route:*_ `/api/rooms` (GET)


  
**6\. Update Room (Only Accessible by Admin)**

-    _*Route:*_ `/api/rooms/:id` (PUT)
-   **Request Headers:**

```plain
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! Do not copy and apply directly from the module. If you blindly follow the modules, you will be a copy master, not a developer.
```

-    **Request Body:**

```json
{
  "pricePerSlot": 200 //we can update any field dynamically, (e.g., name, roomNo, floorNo, capacity, pricePerSlot, amenities)..
}
```


**7\. Delete a Room (Soft Delete, Only Accessible by Admin)**

-   _*Route:*_ `/api/rooms/:id` (DELETE)
-   **Request Headers:**

```plain
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

###   

### Slot Routes

  

8\. **Create Slot (Only Accessible by Admin)**

-   _*Route:*_ `/api/slots`(**POST**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

**Request Body:**

```json
{
    "room": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "09:00",
    "endTime": "14:00"
}
```

**9\. Get available slots**

**Route:** `/api/slots/availability`(**GET**)

**Query Parameters:**

*   `date`: The specific date for which available slots are requested (format: YYYY-MM-DD).
*   `roomId`: ID of the room for which available slots are requested.

  

If we hit `/api/slots/availability` without any query params then we should get all the slots that are not booked ( isBooked: false)

  

**Request endpoint example**

`/api/slots/availability?date=2024-06-15&roomId=60d9c4e4f3b4b544b8b8d1c5`

or

`/api/slots/availability`

  

###   

### Booking Routes

  

**10\. Create a Booking (Only Accessible by Authenticated User)**

-    _*Route:*_ `/api/bookings` (POST)
-   **Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

-    **Request Body:**

```json
{
  "date": "2024-06-15",
  "slots": ["60d9c4e4f3b4b544b8b8d1c6", "60d9c4e4f3b4b544b8b8d1c7"],
  "room": "60d9c4e4f3b4b544b8b8d1c5",
  "user": "60d9c4e4f3b4b544b8b8d1c4"
}
``` 
**11\. Get All Bookings (Only Accessible by Admin)**

-   _*Route:*_ `/api/bookings` (GET)
-   **Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

**12\. Get User's Bookings (Only Accessible by Authenticated User)**

-   _*Route:*_ `/api/my-bookings`(**GET**)
-   **Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token! 
```


  

**13\. Update Booking (Only Accessible by Admin)**

-   _*Route:*_ `/api/bookings/:id` (PUT)
-   **Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

-   **Request Body:**

```json
{
  "isConfirmed": "confirmed"
}
```

**14\. Delete Booking (Soft Delete, Only Accessible by Admin)**

-   _*Route:*_ `/api/bookings/:id` (DELETE)
-   **Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

You must include "Bearer" at the beginning of the token!
```

## Conclusion
Email : nazmos789@gmail.com

LinkedIn : https://www.linkedin.com/in/nsakib27/

To know more about me and my works, visit my github profile.
If you have any questions, feel free to mail me!
Thank you for your valuable time.💌
