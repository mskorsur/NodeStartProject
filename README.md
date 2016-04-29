# Node Starting Program


 A simple program which utilizes Node.js platform with Express framework,
 Mongo database and Handlebars templating engine.
 
 This project was created in order to familiarise myself with all of the 
 technologies listed above.

 Short description: Modeled data represents a student entry with all of the associate information.
 We can either pull down data form the server which will list all of the current students in the database
 or we can fill out a simple form and save a new entry in the database.

 Ready to be used as a starting point for a university's project / bachelor's thesis.

 ------------
 UPDATE #1: Decided to switch from Jade templating engine to Handlebars. The reason for this was
 mainly because Handlebars' views closely resemble native HTML which, in turn, makes it more simple
 and natural to work with. Along with blocks, helpers and partials I think it provides far more 
 option and choices.

 -------------
 UPDATE #2 MAJOR REVAMP!!
 Let's break it down step by step:
 1)Implemented sessions. It is important to note that middleware needs to be placed directly in the "main" app
 file so that each subsequent request from that user/IP address can be properly handled
 (recognized as a part of a session) in one of the matched routes.
 I made a mistake by putting it only into /login route, so even when a user logged in, the app didn't remember that state.
 However, session info isn't stored(session is initialized, but empty) until a user successfully logs in. An existing 
 connection with the Mongo database is used to provide storage for the session information. This means that cookie, which is
 constantly being sent between user and server, contains only sessionID and prevents anyone from reading any details about a 
 particular session.
 Express-session and connect-mongo modules have been used.

 2)Implemented authentication and authorisation. New login and register paths can now be handled and allow a user to log in
 using his username and password or register with the same data plus an e-mail address. New users are directly saved to the database,
 and retrieved when they attempt to log in. For password encryption, a module called bcrypt-nodejs had been used, so that only a hash print
 is saved in database and looked up for comparison when a user tries signing in, instead of a plaintext password value. For now, each new user
 has a default role of a basic member which grants him access to students data and allows him to post new students. If a guest tries to bypass login
 step to enter /data or /send path, they're being redirected to the login page. Still need to figure out what other roles should there be and what 
 permissions should be granted to them, so that full scale role based access control can be implemented.

 3)Views are now based on a couple of basic Bootstrap templates to look more stylish and user-friendly. Handlebars remains the core
 templating language. Most of them are revised and renamed to be more consistent with the rest of the application.

 4)Did some minor modules and source code files reorganisation in order for the application to be more readable and
 maintainable. Some middleware had been taken out of the app.js file and put in the libs folder. Also made a models folder 
 which contains database schemes for students and users.

 ------
 UPDATE #3 
 Implemented a deeper version of role-based access control. Now every guest can view a homepage which will display
 a welcoming message and the option to login or register. Moreover, the guest is able to view all students currently 
 stored in the database, but cannot post new ones. Login and register forms have been transformed as modals and insterted
 into the homepage view, so each of their own dedicated views is no longer necessary and has been deleted. Also it is no
 longer necessary to listen for GET requests for those paths and render a form. 
 After a successful login or registration, a user can use every functionality of the application which includes listing all students,
 posting new students in the database and viewing his own profile page which is a new feature that I've developed. On that profile page, 
 the user can view his specific account info and has an option to change his present password to a new one.
 Finally, I have slightly modified all of the views a bit to be more consistent and fluid, most notably, students are now listed
 in a form of table rather than in ordered list.