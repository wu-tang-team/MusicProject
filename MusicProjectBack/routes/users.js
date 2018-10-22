const express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
var models = require('../models');
const auth = require("../config/auth");
const passport = require('passport');
var staticModels = require('../staticModels/youtube');



router.get('/mymusic', function (req, res, next) {

  res.send(JSON.stringify(
    staticModels.youtube
  ));
});


router.get("/signup", function (req, res, next) {
  res.render('signup')
});

router.post('/signup', function (req, res, next) {
  const hashedPassword = auth.hashPassword(req.body.password);
  models.users
    .findOne({
      where: {
        Username: req.body.username
      }
    })
    .then(user => {
      if (user) {
        res.send('this user already exists');
      } else {
        models.users
          .create({
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Username: req.body.username,
            Password: hashedPassword
          })
          .then(createdUser => {
            const isMatch = createdUser.comparePassword(req.body.password);

            if (isMatch) {
              const userId = createdUser.UserId;
         
              const token = auth.signUser(createdUser);
              res.cookie('jwt', token);
              res.send(JSON.stringify(
                createdUser
              ));
              // res.redirect('profile/' + userId);
            } else {
              console.error('not a match');
            }
          });
        }
    });
});

// router.get('/login', function (req, res, next) {
//   res.render('login');
// });

router.post('/login', function (req, res, next) {

  const hashedPassword = auth.hashPassword(req.body.password);
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    const isMatch = user.comparePassword(req.body.password)

    if (!user) {
      return res.status(401).json({
        message: "Login Failed"
      });
    }
    if (isMatch) {
      const token = auth.signUser(user);
      res.cookie('jwt', token);
      user.Password = ""
   
    
      res.send(JSON.stringify(
        user
      ));
    } else {

      res.redirect('login')
    }

  });
});

router.get('/login/github', passport.authenticate('github', {
  session: true,
  failureRedirect: "/users/login"
}));

router.get('/login/github/callback', passport.authenticate('github', {
  
    failureRedirect: '/users/login'
  }),
  function (req, res) {
   
    const token = auth.signUser(req.user);
    res.cookie('jwt', token);
    res.redirect('/users/profile/' + req.user.UserId)
  }
);


router.get('/profile/:id', auth.verifyUser, function (req, res, next) {
  if (req.params.id !== String(req.user.UserId)) {
    res.send('This is not your profile')
  } else {
    res.send(JSON.stringify( {
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      Email: req.user.Email,
      UserId: req.user.UserId,
      Username: req.user.Username,
      newUser: req.user.newUser
    }));
  }

});



router.get('/createsonglist/:id', function (req, res, next) {

  var UserId = req.params.id;
  models.users.findOne({
    where: {
      UserId: UserId
    }
  }).then(user => {


    if (!user) {
      return res.status(401).json({
        message: "Not logged in"
      });
    } else {

      res.render('createsonglist', {
        user: user
      });
    }
  })
})

router.post('/createsonglist/', function (req, res, next) {


  var UserId = req.body.Owner;
  
    models.songs
    .findAll({
      where: {
        Owner: UserId
      },
      raw:true

    }).then(songs => {
  
        if (songs.length >= 5) {
          models.users.update({
            newUser: 'false'
          }, {
          where: {UserId: UserId}
          })
          .then(wasUpdated=> {
          
            res.send(JSON.stringify(
              {allSongs: true}))
          })
        } else {
          models.songs
            .create({
              ArtistName: req.body.ArtistName,
              SongName: req.body.SongName,
              URL: req.body.URL,
              Owner: req.body.Owner
            
            }).then(song => {
              res.send(JSON.stringify(
                song
              ));
              // res.redirect('/users/createsonglist/' + UserId )
            })

          
        }
    })
  
})






router.get('/songs', auth.verifyUser, function (req, res, next) {
  models.songs.findAll({
    where: {
      Owner: req.user.UserId
    },
    raw: true,
  })
    .then(songs => {
      if (!songs) {
        return res.status(401).json({
          message: "this user does not have songs"
        });
      }
      res.send(JSON.stringify(
        songs
      ));
      // res.render('songs', {
      //   songs: songs
      // })
    });
});


router.get('/songs/:id', auth.verifyUser, function (req, res, next) {

  let UserId = parseInt(req.params.id);
  models.songs.findOne({
    where: {
      UserId: UserId
    },
    raw: true
  }).then(song => {
  

    if (!song) {
      return res.status(401).json({
        message: "There is no song found"
      });
    } else {

      res.send(JSON.stringify(
        song
      ));
    }
  });

})


router.put('/song/:id', function (req, res) {
  console.log(req.body)
  console.log('------`````-------')
  var Owner = parseInt(req.body.Owner)
  var UserId = parseInt(req.params.id);
  models.songs.update(
    {
      ArtistName: req.body.ArtistName,
      SongName: req.body.SongName,
      URL: req.body.URL
    },
    {
      where: {
        UserId: UserId
      }
  }) 
   
    .then(song => {
      res.send(JSON.stringify(
        song
      ));
    })
})

router.get('/allsongs', function (req, res, next) {
  models.songs.findAll({   
    raw: true,
  })
    .then(allSongs => {
      if (!allSongs) {
        return res.status(401).json({
          message: "this user does not have songs"
        });
      }
      
      models.comments.findAll({
        raw: true,
      })
        .then(comments => {
          for (var i=0;i<allSongs.length;i++){
            allSongs[i].comments = []
          }
          for (var i=0;i<allSongs.length;i++){
            for (var j=0;j<comments.length;j++){
              if (comments[j].TrackId === allSongs[i].UserId){
                allSongs[i].comments.push(comments[j])
              }
            }
        }
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',allSongs)
        res.send(JSON.stringify(
          allSongs
        ));
      })
    });
});

router.get('/allusers', function (req, res, next) {
  models.users.findAll({   
    raw: true,
  })
    .then(users => {
      if (!users) {
        return res.status(401).json({
          message: "this user does not have songs"
        });
      }
      for (var i = 0; i < users.length; i++) {
        users[i].Password = ""
      }

        models.comments.findAll({
          raw:true,
        }).then(comments => {

          models.songs.findAll({
            raw: true,
          })
            .then(songs => {
              for (var i=0;i<songs.length;i++){
                songs[i].comments = []
              }
              for (var i=0;i<songs.length;i++){
                for (var j=0;j<comments.length;j++){
                  if (songs[i].UserId === comments[j].TrackId){
                    songs[i].comments.push(comments[j])
                  }
                }
              }
              console.log(songs)
              for (var i=0;i<users.length;i++){
                users[i].songs = []
              }
              for (var i=0;i<users.length;i++){
                for (var j=0;j<songs.length;j++){
                  if (songs[j].Owner === users[i].UserId){
                    users[i].songs.push(songs[j])
                  }
                }
              }
              console.log('@@@@@@@@@@@@@@@@@@#########',users)
              res.send(JSON.stringify(
                users
              ))
            });
        })

      })
});

router.get('/allSongs', auth.verifyUser, function (req, res, next) {
  models.songs.findAll({
    raw: true,
  })
    .then(allSongs => {
      if (!allSongs) {
        return res.status(401).json({
          message: "No Songs Available"
        });
      }
      models.comments.findAll({
        raw: true,
      })
        .then(comments => {
          for (var i=0;i<allSongs.length;i++){
            allSongs[i].comments = []
          }
          for (var i=0;i<allSongs.length;i++){
            for (var j=0;j<comments.length;j++){
              
              if (comments[j].TrackId === allSongs[i].UserId){
                allSongs[i].comments.push(comments[j])
              }
            }
        }
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',users)
        res.send(JSON.stringify(
          allSongs
        ));
      })
     
    })

});

router.get('/allUsers', auth.verifyUser, function (req, res, next) {
  models.users.findAll({
    raw: true,
  })
    .then(allUsers => {
      if (!allUsers) {
        return res.status(401).json({
          message: "No Songs Available"
        });
      }
      res.send(JSON.stringify(
        allUsers
      ));
    });
});
router.post('/postcomment/', function (req, res, next) {
          models.comments
            .create({
              Comment: req.body.Comment,
              TrackId: req.body.TrackId,
              Owner: req.body.Owner,
              ownerName: req.body.ownerName
            
            }).then(comment => {
              models.comments.findAll({
                where: {
                
                  TrackId: comment.TrackId
                },
                raw: true,
              }).then(comments => {
                console.log(comments, '----comments')
                res.send(JSON.stringify(
                  comments
                ));
              })

            })

})

router.delete('/deletesongcomments/:id', function (req, res) {

  var UserId = parseInt(req.params.id);
  console.log(UserId, '   00000');
  models.comments.destroy({
      where: {TrackId: UserId}
    })
    .then(comments => {
        res.send(JSON.stringify(
        comments
        ));
    })
})


router.get('/allcomments', function (req, res, next) {
  models.comments.findAll({   
    raw: true,
  })
    .then(comments => {
      if (!comments) {
        return res.status(401).json({
          message: "this user does not have songs"
        });
      }
      for (var i = 0; i < comments.length; i++) {
        comments[i].Password = ""
      }
      models.songs.findAll({
        raw: true,
      })
      .then(songs => {
        for (var i=0;i<comments.length;i++){
          comments[i].songs = []
        }
        for (var i=0;i<comments.length;i++){
          for (var j=0;j<songs.length;j++){
            if (songs[j].Owner === comments[i].UserId){

              comments[i].songs.push(songs[j])
            }
          }
        }
   
       
        res.send(JSON.stringify(
          users
        ));
      })

    });
});

router.get('/mysongs/:id', function (req, res, next) {
  var UserId = req.params.id;
  models.songs.findAll({ 
    where: {
      Owner: UserId
    }, 
    raw: true,
  })
    .then(songs => {
      if (!songs) {
        return res.status(401).json({
          message: "this user does not have songs"
        });
      }
        res.send(JSON.stringify(
          songs
        ));
      })

});


router.get('/thissongcomments/:id', function (req, res, next) {
  var trackId = req.params.id;
  models.comments.findAll({ 
    where: {
      TrackId: trackId
    }, 
    raw: true,
  })
    .then(comments => {
      if (!comments) {
        return res.status(401).json({
          message: "this user does not have songs"
        });
      }
        res.send(JSON.stringify(
          comments
        ));
      })

});


router.get('/logout', function (req, res) {
  res.cookie('jwt', null);
  // res.redirect('/users/login');
});


module.exports = router;

