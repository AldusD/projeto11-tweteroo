import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors(), express.json());

// Functions and constants
const MAXLIMIT = 10;

const addUsername = tweetlist => {
    const finalTweetList = tweetlist.map( t => {
        const user = users.find(u => u.username === t.username);
        return {
            username: t.username,
            avatar: user.avatar,
            tweet: t.tweet
        }
    })
    return finalTweetList;
}

// Data
const users = new Array;
const tweets = new Array;

// Paths
app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    
    for(let u of users) {
        if(u.username === username) res.send("Username already in use").status(409);
    }

    //validation
    const validUsername = typeof(username) === 'string' && username != ''; 
    const validAvatar = typeof(avatar) === 'string' && avatar != '';
    
    if(validAvatar && validUsername) {
        users.push({
            username,
            avatar
        });
        res.send("OK").status(200);
    } else res.send("Validation error").status(400)
})

app.get("/tweets", (req, res) => {
    if(tweets.length === 0) {
        res.send(tweets).status(200);
    } else {

        const tweetsLimit = (tweets.length < 10) ? tweets.length : MAXLIMIT;
        const limitedTweets = new Array;

        for(let i = 0; i < tweetsLimit; i++) {
            limitedTweets.push( tweets[ tweets.length - 1 - i ] );
        }
        const toSendTweets = addUsername(limitedTweets);
        res.send(toSendTweets).status(200);
    }
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    tweets.push({
        username,
        tweet
    })
    res.send("Ok").status(200);
})


app.listen(5000, () => console.log("Running on port 5000"))