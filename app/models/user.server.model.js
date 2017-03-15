const moment = require("moment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        trim: true,
        index: true
    },
    username: {
        type: String,
        trim: true,
        index: true
    },
    password: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    website: {
        type: String,
        set: (url) => {
            if(!url){
                return url;
            }else{
                if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
                    url = "http://" + url;
                }
                
                return url;
            }
        }
    }
});

UserSchema.virtual('erstelltAm').get(function(){
    var datum;
    
    if(this.created){
        datum = moment(this.created).format('DD.MM.YYYY HH:ss');
    }
    
    return datum;
    
});

//Auf die statics-Methoden wird über das Schema zugegriffen. In unserem Fall User.findByUsername
UserSchema.statics.findByUsername = function(username, cb){
    this.findOne({username: new RegExp(username,'i')}, cb);
};

//Auf methods wird über das vom Schema abgeleitetes Objekt zugegriffen.
UserSchema.methods.authenticate = function(password){
    return this.password === password;
}

UserSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('User', UserSchema);