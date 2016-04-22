
//Schema

 // ONE-ONE relationships
    //1 embedding- preferred, more efficient 
    // single collection - user
      { 
        _id: "blah"
        username: "something",
        settings: {
          difficulty: 1,
          learning_curve: 2,
          streak: True
      }
    }
      
    //2 linking- use a foreign key. Mongo doesn't enforce foreign keys so this is just an application level design
    // collection - user
      {
        _id: "blah1"
      }
    // collection - user settings
      {
        userid: "blah1",
        settings: {
          difficulty: 1,
          learning_curve: 2,
          streak: True
        }
      }
      
  // ONE-MANY relationships
    // 1 embedding
      {
        _id: "blah2",
        username: "newuser",
        decks: [{
          deckName: "cards against humanity - the high tech version",
          cards: []
        },{
          deckName: "the essential oatmeal",
          cards: []
        }],
        settings: {
          difficulty: 3,
          streak: True
        }
      }
    /* Advantages:
    All of user's decks can be accessed at once (single read)
    Adding a new deck is just an append to the array */
    
    /* Potential Issues:
    There is an upperlimit to a document size (16mb) so that places a limitation on decks array document
    Write performance (for high write traffic) - As more and more deck of cards get added to a user account,
    document padding predictionby mongo becomes inaccurate and so the doc has to be moved around in memory more than necessary (io load)
    Any filtering required on the decks has to be done on the application side. */
      
    // 2 linking
      
      // collection - users
      {
        _id: "blah2",
        username: "newuser",
        settings: {
          difficulty: 3,
          streak: True
        }
      
      // collection - decks
      {
        {
          userid: "blah2",
          deckName: "cards against humanity - the high tech version",
          cards: []
        },
        {
          userid: "blah2",
          deckName: "the essential oatmeal",
          cards: []
        }
      }
    /* Advantages
    the number of decks will not place limits on the users document.
    Pagination/ filtering on the decks is easier */
    
    /* Potential Problems
    If the number of decks for a user is very large and we need to retrieve all decks at once, that is a lot of reads. */
      
    // 3 bucketing - we can split the decks into buckets
    
      // collection - users
      {
        _id: "blah2",
        username: "newuser",
        settings: {
          difficulty: 3,
          streak: True
        }
      
      // collection - decks
      {
        {
          userid: "blah2",
          bucket: 1,
          decks: [{
            deckName: "cards against humanity - the high tech version",
            cards: []
          },{}] //... max 50 decks
        },
        {
          userid: "blah2",
          bucket: 2,
          decks: [] //max 50 decks
        }
      }
      
      /* Advantages
      One read will give 50 decks. */
      
      
  // MANY-MANY relationships
    //two-way embedding
    
    //Example- shared read-only decks: these are associated with multiple users
    
    //collection - users
    {
      {
        _id: 1,
        username: "javi",
        decks: [1, 3]
      },
      {
        _id: 2,
        username: "momo",
        decks: [1, 2]
      }
    }

    //collection - decks
    {
      {
        _id: 1,
        deckName: "cards against humanity - the high tech version",
        cards: []
        users: [1,2]
      },
      {
        _id: 2,
        deckName: "the essential oatmeal",
        cards: [2]
      },
      {
        _id: 3,
        deckName: "Japanese",
        cards: [1]
      }
    }
    
    /* Two queries are needed, one in each direction. First to find either a user or a deck and then an $in query to to find */
    
    
    //one-way embedding- advantageous if one side is hugely unbalanced in size
    
    //collection - users
    {
      {
        _id: 1,
        username: "javi",
        decks: [1, 3]
      },
      {
        _id: 2,
        username: "momo",
        decks: [1, 2]
      }
    }
    
    //collection - categories
    {
      {
        _id: 1,
        name: "languages"
      },
      {
        _id: 2,
        name: "programming"
      }
    }
    
    //collections - decks
    {
      {
        _id: 1,
        title: "python",
        categories: [2],
        users: [1, 2]
      },
      {
        _id: 2,
        title: "japanese",
        categories: [1],
        users: [1]
      }
    }

    
    /*
    Establish Relationship Balance
    Establish the max size of N and the size of M. F.ex if N is a max of 3 categories for a deck and M is a max of 500000 decks 
    in a category you should pick One Way Embedding. If N is a max of 3 and M is a max of 5 then Two Way Embedding might work well. */
    
