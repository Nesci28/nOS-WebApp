[24-04-2019]  
__Front-End__ 
- Fixed the sidebar on small screen
- Fixed the logo image (on small screen)
- (Fix the rigs not showing on cell phone) ???
- Changed the API endpoints automatically depending on the local IP (to test in cellphones, etc)
- Username should be case insensitive on the login page
- Fixed the weird error that was causing the rig Hostname to become [Object Event] on the switch activation
- Fixed the Configurations editor
- Fixed the SSH link in the "Actions" menu

[23-04-2019]  
__Front-End__
- Changed the API endpoints automatically depending on the environment (dev or prod)
- Added the About nOS and about Me pages
- Added a loading spinner on the pages the require an API response before showing up
- Added the logo

[22-04-2019]
__Back-End__
- Doesnt save the session on anonymous connection
- Delete the session from the store and the cookie completely on logout

__Front-End__
- Login correctly redirect to a new page
- Changed the UI of the login page
- Created a session cookie
- Fixed a lot of bugs

[21-04-2019]  
__Back-End__
- Added a DB for the different sessions
- Secured all the endpoints for the new Authentication system
- New endpoint to get the entry from the DB with the latest download link and md5

__Front-End__
- Fixed a couple of bugs with the Authentication system
- Refactorized the way the data is getting extracted from the back-end response
- V-Cards arent disappearing anymore on data refresh

[20-04-2019]  
__ Back-End __
- Finished the implementation of the Auth system

__ Front-End __
- Implemented the Auth system 
- Changed to the new server endpoints 

[19-04-2019]  
__Back-End__
- Added the login / Logout
- Fixed a bug where the email notification was getting send on every cronjob

[18-04-2019]  
__Back-End__
- Big code refactorization
- Passwords are now being hashed before getting sent to the DB 
- Cronjob every 1m to send an email to the user when the rig as been offline for more than 2 minutes (user account needs to be an email)

[16-04-2019]  
- My 3rd child was born

[14-04-2019]  
__Front-End__
- Added the "Download" section
- Send a "POST" to the new email endpoint when the rig is detected to be down

__Back-End__
- Added a POST /email endpoint

[13-04-2019]  
__Front-End__
- Took out "Miners" and "Coins" from the toolbar Menu (those links are deprecated)
- Changed the background image to a solid color
- Create a "Delete" button in the rig's card

__Back-End__
- New endpoints "/delete"
- Deals with API from the Front-End and the Rig itself
- Created a now.json
- Sensible information is now in a dotenv file
- Changed /db endpoint to a POST

[12-04-2019] 
- UI overhaul
- Added the external commands (restart, shutdown, etc.)
- Fixed a few UI bugs
- Added a page to see the miner logs

__Beta Version 1.0.0__