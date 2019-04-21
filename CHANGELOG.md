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