const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://dbnikhil:<dbnikhilpass>@cluster1.ohvdnsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err.message));
