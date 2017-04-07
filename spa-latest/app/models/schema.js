//================================================================================================
var mongoose = require('mongoose'),
Schema = mongoose.Schema
//================================================================================================
var UserSchema = Schema({
				
				AgencyName        : String,
				AgencyEmail       : String,
				AgencyPassword    : String,
				AgencyRoute       : String,
				AgencyWebUrl      : String,
				AgencyMobile      : Number,
				AgencyPhone 	  : Number,
				Active            : Boolean
 		});
module.exports = mongoose.model('bmc',UserSchema);
//================================================================================================

