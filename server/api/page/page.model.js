'use strict';

import mongoose from 'mongoose';

var PageSchema = new mongoose.Schema({
  name: String,
  info: String,
  userInput: [{
   originalName: String,
   newName: String,
   nameModel: String,
   userValue: String
 }],
  active: Boolean
});

export default mongoose.model('Page', PageSchema);
