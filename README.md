# How to reproduce the issue

1.  Open the browser's console
2.  Click the "Search" button
3.  You will see a message with the start and end date after 2 seconds
4.  Change the date and click the "Search" button again, you should see the message for that date appear as well
5.  Now go back to the date you started with and click "Search" again, you will see the query for that date become active again but this time no message is being logged to the console and the UI is still showing the data for the old date
