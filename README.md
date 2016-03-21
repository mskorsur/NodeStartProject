# Node Starting Program


 A simple program which utilizies Node.js platform with Express framework,
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
 file so that each subsequent request from that user/IP address can be properly handled in one of the matched routes.
 I made a mistake by putting it only into /login route, so even when a user logged in, the app didn't remember that state.
 However, session info isn't stored(session is initialized, but empty) until a user successfully logs in. An existing 
 connection with the Mongo database is used to provide storage for the session information. This means that cookie, which is
 constantly being sent between user and server, contains only sessionID and prevents anyone from reading any details about a 
 particular session.
 Express-session and connect-mongo modules have been used.

 2)Implemented authentication and authorisation. New login and register paths can now be handled and allow a user to log in
 using his username and password and reigster with the same data plus an email address. New users are directly saved to the database,
 and retrieved when they attempt to log in. For password encryption a module called password-hash has been used, so that only a hash print
 is saved in database and looked up for comparison when a user is logging in, instead of a plaintext password value. For now each new user
 has a default role of a basic member which grants him access to students data and allows him to post new students.If a guest tries to brute
 enter a /data or /send path, they're being redirected to the login page.Still need to figure out what other roles should there be and what 
 rights should be granted to them, so that full scale role based access control can be implemented.

 3)Views are now based on some basic Bootstrap templates to look more stylish and advanced. Handlebars remains the core
 templating language. Most of them are now revised and renamed to be more consistent with the rest of the application.

 4)Did some minor modules and source code files reorganisation in order for the application to be more readable and
 maintainable. Some middleware had been taken out of the app.js file and put in the libs folder. Also made a models folder 
 which contains database schemes for students and users.

