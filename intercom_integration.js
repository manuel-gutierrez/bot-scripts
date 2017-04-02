Create an user: 

Check the user is created. 
if the user is cereated then go to send message. 
if the user is not created then grab data and create the user
    Normal: Once the user is created go to send message
	Exeption : User was not created: Display a message and create error log in database.

Send a Message:

Check if a conversation is active
if conversation is active then retrieve the last active conversation id
    send new message to the conversation threat.
	exeption: Display a message and create error log in database.
if a conversation is not created.
	Set chat attribute to true
	Create conversation
	Save conversation id
	exception: Display a message and create error log in database.

Notification : Admin reply

Get conversation id. 
Retrieve conversation
Send Admin answer to the user. 
exception: Display a message and create error log in database.


Notification : close conversation. 
Get conversation id. 
Retrieve conversation
Send Admin answer to the user.  
Notify user that the conversation was closed.

exception: Display a message and create error log in database.


Close Conversation

Closed by notification: Go to notification flow 
Closed by user: 
Get conversation id. 
Send post closing the conversation. 

exception: Display a message and create error log in database and send email. 









