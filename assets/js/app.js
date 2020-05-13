'use strict';

const textarea = document.querySelector('#tweet');
const submitButton = document.querySelector('#form');
const tweetList = document.querySelector('.tweet-list');
const deleteAll = document.querySelector('#deleteAll');


function copyTweet(event){
    event.preventDefault();
    let tweet = textarea.value;
    
    const list = document.createElement('li');
    list.innerText = tweet;
    tweetList.appendChild(list);
    tweetList.classList.remove('white');
    
    setToLocal(tweet);
    
    const deleteButton = document.createElement('a');
    deleteButton.classList = 'delete-tweet';
    deleteButton.innerText = 'X';
    list.appendChild(deleteButton);
    
    tweetList.addEventListener('click', deleteTweet);
}

function setToLocal(tweet){
    let tweets;
    tweets = getFromLocal();
    tweets.push(tweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    
}

function getFromLocal(){
    let tweets;
    
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function deleteTweet(event){
    if(event.target.className === 'delete-tweet'){
        event.target.parentElement.remove();
        deleteFromLocal(event.target.parentElement.innerText);
        
    }
}
function readLocal(){
    tweetList.classList.add('white');
    let tweets;
    tweets = getFromLocal();
    tweets.forEach(function (tweet) {
        const list = document.createElement('li');
        list.innerText = tweet;
        tweetList.appendChild(list);
        tweetList.classList.remove('white');
        const deleteButton = document.createElement('a');
        deleteButton.classList = 'delete-tweet';
        deleteButton.innerText = 'X';
        list.appendChild(deleteButton);
        tweetList.addEventListener('click', deleteTweet);
    })
    
}
function deleteFromLocal(tweet){
    let tweets;
    let chosenTweet;
    //Elimina la X del tweet //
    chosenTweet = tweet.substring(0, tweet.length -1);
    tweets = getFromLocal();
    tweets.forEach(function(tweet, index){
        if(chosenTweet === tweet){
            tweets.splice(index, 1);
            
        }})
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }
    
    function deleteAllTweets(event){
        event.preventDefault();
        let tweets = [];
        localStorage.setItem('tweets', JSON.stringify(tweets));
        tweetList.innerText='';
        tweetList.classList.add('white');
    }
    
    window.addEventListener('load', readLocal)
    submitButton.addEventListener('submit', copyTweet);
    deleteAll.addEventListener('submit', deleteAllTweets);