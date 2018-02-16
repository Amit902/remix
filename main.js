/*List of details of song , declaring an object to store detail of each song */
var songs = [
  {
    'name':'Baarish',
    'artist':'Ash King , Shashaa Tirupati',
    'album':'Half Girlfriend',
    'duration':'4:35',
    'fileName':'song9.mp3',
    'image':'image8.jpg',
  },
  {
    'name':'Enna Sona',
    'artist':'Arijit Singh , A. R. Rahman',
    'album':'Ok Jaanu',
    'duration':'3:33',
    'fileName':'song7.mp3',
    'image':'image7..jpg',
  },
  {
    'name':'Faded',
    'artist':'Alan Walker',
    'album':'-',
    'duration':'3:32',
    'fileName':'song5.mp3',
    'image':'image5.jpg',
  },
    {
      'name':'How would you feel',
      'artist':'Ed Sheeran',
      'album':'Divide',
      'duration':'4:40',
      'fileName':'song2.mp3',
      'image':'image2.jpg',
    },
    {
      'name':'I Don\'t Wanna Live Forever',
      'artist':'Zayn Malik, Taylor Swift',
      'album':'Fifty Shades Darker',
      'duration':'4:05',
      'fileName':'song11.mp3',
      'image':'image9.jpg',
    },
   {
     'name':'I Hate U , I Love U',
     'artist':['Gnash ',' Olivia O \'Brien'],
     'album':'A força do querer, vol. 1',
     'duration':'3:46',
     'fileName':'song.mp3',
     'image':'image1.jpg',
   },
   {
     'name':'Let it go',
     'artist':'James Bay',
     'album':'Chaos and the Calm',
     'duration':'4:21',
     'fileName':'song4.mp3',
     'image':'image4.jpg',
   },
   {
     'name':'Love the way you lie (feat.Rihaana)',
     'artist':'Eminem , Rihaana',
     'album':'Recovery',
     'duration':'4:23',
     'fileName':'song3.mp3',
     'image':'image3.jpg',
   },
   {
      'name':'Phir Bhi Tumko Chaahunga',
      'artist':'Arijit Singh , Shashaa Tirupati',
      'album':'Half Girlfriend',
      'duration':'5:51',
      'fileName':'song8.mp3',
      'image':'image11.jpg',
   },
   {
     'name':'Say You Won\'t Let Go',
     'artist':'James Arthur',
     'album':'Back from the Edge',
     'duration':'4:22',
     'fileName':'song10.mp3',
     'image':'image12.jpg',
   },
   {
     'name':'Tera Woh Pyaar',
     'artist':'Momina Mustehsan , Asim Azhar',
     'album':'Coke Studio 9 (2016)',
     'duration':'7:05',
     'fileName':'song6.mp3',
     'image':'image6.jpg',
   },
   {
     'name':'Thodi Der',
     'artist':'Shreya Ghoshal , Farhan Saeed',
     'album':'Half Girlfriend',
     'duration':'4:56',
     'fileName':'song12.mp3',
     'image':'image10.jpg',
   }
 ]

  var songNumber=1;       //initializing the default songnumber
  var willLoop=0;
  var willShuffle=0;
  var currentSongNumber=0;
  var mute=0;

    function fancyTimeFormat(time){               //function to change the time format to hh:mm:ss
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);              //~~ means Math.floor
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }


    function updateCurrentTime() {              //function to change the current time and duration of different song
      var song = document.querySelector('audio');
      //console.log(song.currentTime);
      //console.log(song.duration);
      var currentTime=Math.floor(song.currentTime);
      var duration=Math.floor(song.duration);
      var bar=(currentTime*100)/duration;
      currentTime = fancyTimeFormat(currentTime);
      duration = fancyTimeFormat(duration);
      $('.time-elapsed').text(currentTime);
      $('.song-duration').text(duration);
      Progressbar(bar);
    }

    function Progressbar(bar){                  // function to make the progressbar filled when the song is playing
          var ele = document.querySelector('.progress-filled');
          ele.style.width= bar +"%";
          //console.log(bar);
    }

    function welcome_screen(){
          var name = $('#name-input').val();
          if (name.length > 3) {
              $('.input-wrapper').addClass('success');
              $('#helpBlock').text("You are successfully logged in.");

              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $(".welcome-screen").slideUp(800);
              setTimeout(function(){
                $('.welcome-screen').addClass('hidden');

              }, 620);
              setTimeout(function(){
                $(".main").slideUp(300);
                $('.main').removeClass('hidden');
                 //initiallizing datatable after removing hidden class so that autoresize not occur
                     $('#songs').DataTable({        //adding datatables
                       paging:false,
                       language: {
                                     searchPlaceholder: "Search"
                                 },
                       scrollY:250,            //adding scrollbar
                       deferRender:true        //to set srollbar when required
                     });
              },50);
          } else {
              $('.input-wrapper').addClass('error');
              $('#helpBlock').text("Please enter more than 3 characters!!!");
          }
    }

    function changeVolume(val){
           var aud=document.querySelector('audio');
           aud.volume=val;
           if(val==0)
           {
               $('.favolume').addClass('fa-volume-off').removeClass('fa-volume-up')
              // console.log('volume0')
           }
           else {
             $('.favolume').addClass('fa-volume-up').removeClass('fa-volume-off')
            // console.log('volume high');
           }
    }

    function toggleSong(){
      var song = document.querySelector('audio');
      if (song.paused == true) {
          //console.log('Playing');
          $('.play-icon').removeClass('fa-play').addClass('fa-pause');
          song.play();
      } else {
          //console.log('Pausing');
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          song.pause();
      }
    }

    function addClickOnSongname(songObj,position){
      var song="#song"+position;
      var songName=songObj.fileName;
      $(song).click(function(){
          var audio = document.querySelector('audio');
          if(songNumber!== position)    //check for !== weak and strong equality??
          {
            audio.src="songs/"+songName;
            songNumber=position;
            //currentSongNumber=position;
            changeCurrentSongDetails(songObj);
          }
            toggleSong();
      });
    }

    function changeCurrentSongDetails(songObj){
      $('.current-song-image').attr('src',"images/"+songObj.image);
      $('.current-song-name').text(songObj.name);
      $('.current-song-album').text(songObj.album);
    }

    function effects_clicked(id1){
      $(id1).toggleClass('clicked');
      // console.log('clicked');
    }
/*    function timejump() {
      var aud=document.querySelector('audio');
      aud.currentTime=aud.duration-5;
    }*/

    //when the html document is loaded completely, after that, this function will execute

    window.onload = function() {

          changeCurrentSongDetails(songs[0]);
          setInterval(function(){
            updateCurrentTime();
          },1000);

           for(var i=0 ; i<songs.length; i++)
           {
             var obj = songs[i];
             var name='#song'+(i+1);
             var song=$(name);
             song.find('.song-name').text(obj.name);
             song.find('.song-artist').text(obj.artist);
             song.find('.song-album').text(obj.album);
             song.find('.song-length').text(obj.duration);
             addClickOnSongname(obj,i+1);
           }


     }


             $('.welcome-screen button').on('click', function() {
                  welcome_screen();
             });
             $('.welcome-screen').on('keypress', function(event) {
                 var target=event.target;
                         if (event.keyCode == 13 && target.tagName=='INPUT') {
                               welcome_screen();
                              // console.log('welcome');
                         }
             });

             $('.play-icon').on('click', function() {
                 toggleSong();
             });
             $('body').on('keypress', function(event) {
                 var target=event.target;
                         if (event.keyCode == 32 && target.tagName!='INPUT') {
                             toggleSong();
                         }
             });

             $('#upload').click(function(event){
               var x = document.getElementById("upload");
                 var txt = "";
                   var file = x.files[0];
                       txt +=" File:"+file.name;
                 var input=document.querySelector('audio');
                 input.src=x.value;
                 var ele=document.getElementById ("demo");
                 $('#demo').addClass('demo')
                 ele.innerHTML = txt;
             });

             $('.player-progress').click(function(event){
               var $this=$(this);
               var widthclicked= event.pageX-$this.offset().left;
               //console.log(event.pageX);  gives the position from left whereever clicked
               //console.log($this.offset().left);      gives the positon from left where 'this' start and always fixed
               //console.log(widthclicked);
               var totalwidth=$this.width();
               //console.log(totalwidth);           gives the total width of the player and always fixed
               var width=(widthclicked/totalwidth)*100;
               var song=document.querySelector('audio');
               song.currentTime=(song.duration*width)/100;
               //console.log(song.currentTime);
             });

//Js for Volume icon
              $('#volume1').on('change',function(){
                  changeVolume(this.value);
              });
              $('.favolume').hover(function(){
                  $('#volume1').removeClass('hidden')
                  $('#volume1').mouseleave(function(){
                    $('#volume1').addClass('hidden')
                  })
              });
              $('.favolume').on('click',function(){
                   changeVolume(mute);
                  // $('#volume1').slider({value:0});
                  mute=1-mute;
              });

             $('.fa-repeat').on('click',function() {
                 $('.fa-repeat').toggleClass('disabled')
                 willLoop = 1 - willLoop;

             });
             $('#playall').on('click',function() {
                toggleSong();
                 willLoop = 1 - willLoop;
             });
             $('.fa-random').on('click',function() {
                 $('.fa-random').toggleClass('disabled')
                 willShuffle = 1 - willShuffle;
             });
             $('audio').on('ended',function(){
                 var audio=document.querySelector('audio');
                 if(willShuffle==1)
                 {
                      var nextsongno=randomExcluded(1,5,songNumber);      //calling function to get random value
                      console.log(nextsongno);
                      var nextsong=songs[nextsongno-1];
                      audio.src="songs/"+nextsong.fileName;
                      toggleSong();
                      changeCurrentSongDetails(nextsong);
                      songNumber=nextsongno;
                 }
                 else if(willLoop==1)
                 {
                     if(songNumber<songs.length)
                     {
                       var nextsong =songs[songNumber];
                       audio.src="songs/"+nextsong.fileName;
                       changeCurrentSongDetails(nextsong);
                       toggleSong();
                       songNumber=songNumber+1;
                     }
                     else{
                       var nextsong =songs[0];
                       audio.src="songs/"+nextsong.fileName;
                       toggleSong();
                       changeCurrentSongDetails(nextsong);
                       songNumber=1;
                     }
                 }
                 else {
                     $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                     audio.currentTime=0;
                     //console.log(songNumber);
                 }
             });

                $('.fa-step-forward').on('click',function(){
                  var audio=document.querySelector('audio');
                  if(songNumber<songs.length)
                  {
                      var next=songs[songNumber];
                      audio.src="songs/"+next.fileName;
                      changeCurrentSongDetails(next);
                      toggleSong();
                      songNumber++;
                    }
                   else {
                       var next=songs[0];
                       audio.src="songs/"+next.fileName;
                       changeCurrentSongDetails(next);
                       toggleSong();
                       songNumber=1;
                   }
                });
                $('.fa-step-backward').on('click',function(){
                  var audio=document.querySelector('audio');
                  if(songNumber>1)
                  {
                      var prev=songs[songNumber-2];
                      audio.src="songs/"+prev.fileName;
                      changeCurrentSongDetails(prev);
                      toggleSong();
                      songNumber--;
   //                   console.log(songNumber);
                    }
                   else {
                       var prev=songs[songs.length-1];
                       audio.src="songs/"+prev.fileName;
                       changeCurrentSongDetails(prev);
                       toggleSong();
                       songNumber=songs.length;
                   }
                });

                $('.label').on('click',function(){
                    $('.effects').removeClass('hidden');
                    $('.content').addClass('hidden');
                    $('.label').addClass('hidden');
                });

                $('#back').on('click',function(){
                  $('.effects').addClass('hidden');
                  $('.content').removeClass('hidden');
                  $('.label').removeClass('hidden');
                });
/*
      var songList =['I Hate U , I Love U','Starving','Faded','Uncover'];
      var fileName = ['song.mp3','song2.mp3','song3.mp3','song4.mp3'];
      var artistList = ['Artist1','Artist2','Artist3','Artist4'];

      for(var i=0 ; i<fileName.length; i++)
      {
        var name='#song'+(i+1);
        var song=$(name);
        song.find('.song-name').text(songList[i]);
        song.find('.song-artist').text(artistList[i]);
        addClickOnSongname(fileName[i],i+1);
      }
    }
*/

  var wahwah;
  var convolver;
  var cabinet;
  var overdrive;
  var compressor;
  function tunaDemo(){

    var tuna = new Tuna(context);

    wahwah = new tuna.WahWah({
    automode: true,                //true/false
    baseFrequency: 0.5,            //0 to 1
    excursionOctaves: 2,           //1 to 6
    sweep: 0.6,                    //0 to 1
    resonance: 100,                 //1 to 100
    sensitivity: 0.5,              //-1 to 1
    bypass: 1
    });
    convolver = new tuna.Convolver({
    highCut: 100,                         //20 to 22050
    lowCut: 22050,                             //20 to 22050
    dryLevel: 0.5,                            //0 to 1+
    wetLevel: 1,                            //0 to 1+
    level: 0,                               //0 to 1+, adjusts total output of both wet and dry
    impulse: "impulse_rev.wav",    //the path to your impulse response
    bypass: 1
    });
    cabinet = new tuna.Cabinet({
    makeupGain: 10,                                 //0 to 20
    impulsePath: "impulse1.mp3",    //path to your speaker impulse
    bypass: 1
    });
    overdrive = new tuna.Overdrive({
    outputGain: 0.5,         //0 to 1+
    drive: 0.7,              //0 to 1
    curveAmount: 1,          //0 to 1
    algorithmIndex: 2,       //0 to 5, selects one of our drive algorithms
    bypass: 1
    });
    pingPongDelay = new tuna.PingPongDelay({
    wetLevel: 0.5, //0 to 1
    feedback: 0.3, //0 to 1
    delayTimeLeft: 150, //1 to 10000 (milliseconds)
    delayTimeRight: 200 //1 to 10000 (milliseconds)
    });
    filter = new tuna.Filter({
    frequency: 22050, //20 to 22050
    Q: 1, //0.001 to 100
    gain: 0, //-40 to 40 (in decibels)
    filterType: "notch", //lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
    bypass: 1
    });
    compressor = new tuna.Compressor({
    threshold: -42,    //-100 to 0
    makeupGain: 1,     //0 and up (in decibels)
    attack: 30,         //0 to 1000
    release: 0,        //0 to 3000
    ratio: 4,          //1 to 20
    knee: 5,           //0 to 40
    automakeup: true,  //true/false
    bypass: 1
    });
  }

      var context= new AudioContext();
      tunaDemo();
      var song =document.querySelector('audio');
      var source = context.createMediaElementSource(song);
      //var source=context.createBufferSource();
      source.connect(wahwah.input);
      source.connect(convolver.input);
      source.connect(cabinet.input);
      source.connect(overdrive.input);
      source.connect(compressor.input);
      wahwah.connect(context.destination);
      convolver.connect(context.destination);
      cabinet.connect(context.destination);
      overdrive.connect(context.destination);
      compressor.connect(context.destination);

      var button = document.querySelector('#wahwah');
      var button4 = document.querySelector('#convolver');
      var button5 = document.querySelector('#cabinet');
      var button8 = document.querySelector('#overdrive');
      var button11 = document.querySelector('#compressor');

      button.addEventListener("click",function(e){
          effects_clicked(button);
          if(wahwah.bypass){
            wahwah.bypass=false;
            console.log("wahwah on");
          }
          else{
            wahwah.bypass=true;
            console.log("wahwah off");
          }
      });
        button4.addEventListener("click",function(e){
          effects_clicked(button4);
             if(convolver.bypass){
               convolver.bypass=false;
               console.log("convolver on");
             }
             else{
               convolver.bypass=true;
               console.log("convolver off");
             }
         });
         button5.addEventListener("click",function(e){
           effects_clicked(button5);
              if(cabinet.bypass){
                cabinet.bypass=false;
                console.log("echo on");
              }
              else{
                cabinet.bypass=true;
                console.log("echo off");
              }
          });
            button8.addEventListener("click",function(e){
              effects_clicked(button8);
                 if(overdrive.bypass){
                   overdrive.bypass=false;
                   console.log("overdrive on");
                 }
                 else{
                   overdrive.bypass=true;
                   console.log("overdrive off");
                 }
             });
               button11.addEventListener("click",function(e){
                 effects_clicked(button11);
                    if(compressor.bypass){
                      compressor.bypass=false;
                      console.log("vibration on");
                    }
                    else{
                      compressor.bypass=true;
                      console.log("vibration off");
                    }
                });
