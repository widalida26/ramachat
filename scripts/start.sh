#!/bin/bash
cd /home/ubuntu/ramachat/server
<<<<<<< HEAD
authbind --deep pm2 start app.js
=======
authbind --deep pm2 start -f index.js
>>>>>>> 5c74e49cef5306f6ea304c6fd46de9938dcdc553
