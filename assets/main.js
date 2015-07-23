var my_card = null;
    var can_click = true;
    var attempts = 0;
    var successful_attempts = 0;
    var accuracy = 0.0;
    var timeStart = false;
    var timeArray = [0, 0, 0]
    var imgArray = ['charizard.png', 'charizard.png', 'pikachu.jpeg', 'pikachu.jpeg', 'snorlax.jpg', 'snorlax.jpg', 'mewtwo.png', 'mewtwo.png', 'venusaur.jpg', 'venusaur.jpg', 'blastoise.jpeg', 'blastoise.jpeg', 'meowth.jpeg', 'meowth.jpeg', 'jigglypuff.jpeg', 'jigglypuff.jpeg', 'zapdos.jpg', 'zapdos.jpg']
    $(document).ready(function() {
        game_board();
    });

    function game_board() {
        shuffle(imgArray);
        for (var i = 0; i < imgArray.length; i++) {
            var img = $('<img>').attr('src', 'images/' + imgArray[i]).addClass('card card-front').attr('id', 'card_front' + (i + 1)).attr('data-card', imgArray[i]);
            var img_back = $('<img>').attr('src', 'images/back-card.jpeg').addClass('card card-back').attr('id', 'card_back' + (i + 1)).attr('onclick', 'card_click(' + (i + 1) + ')');
            var game_cards = $('<div>').addClass('card_container').attr('id', 'card_container' + (i + 1));
            $(game_cards).append(img, img_back);
            $('.game-area').append(game_cards);
        }
    }

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function card_click(card_number) {
        var card_front = '#card_front' + card_number;
        var card_back = '#card_back' + card_number;

        if (can_click == false) {
            console.log("disallow clicking")
            return;
        }
        $(card_back).toggleClass('card_back_selected');
        $(card_front).toggleClass('card_front_selected');
        if (my_card == null) {

            console.log('first card was clicked, on card1, it was ' + $(card_front).attr('data-card'));
            my_card = $(card_front).attr('data-card');
            can_click = false;
            setTimeout(function() {
                can_click = true;
            }, 600);


        } else {
            attempts = attempts + 1;
            if (attempts > 0) {
                console.log('attempts is equal to : ' + attempts)
                $('.attempts').html(attempts);
            }
            console.log('second card was clicked, it was card 1, it was ' + $(card_front).attr('data-card'));
            if (my_card == $(card_front).attr('data-card')) {
                console.log('they match');
                successful_attempts += 1;
                if (successful_attempts > 0) {
                    accuracy = (successful_attempts / attempts * 100);
                    var a = accuracy.toFixed(0);
                    $('.accuracy').html(a + '%');
                }
                can_click = false;
                setTimeout(function() {
                    $('.card_front_selected').addClass('card-match-front');
                    $('.card_back_selected').addClass('card-match-back');
                    can_click = true;
                }, 900);
                if (successful_attempts == 9) {
                    end_time = new Date;
                    console.log(end_time);

                    function getElapsedTime() {
                        if (end_time != null)
                            console.log(end_time - start_time);
                    }

                    setTimeout(function() {
                        alert("Congratulations! You are now a Pokemon Master!")
                    }, 1400);
                }

            } else {
                can_click = false;
                if (successful_attempts >= 0) {
                    accuracy = (successful_attempts / attempts * 100);
                    var a = accuracy.toFixed(0);
                    $('.accuracy').html(a + '%');
                }
                console.log('they do not match');
                setTimeout(function() {
                    $('.card_front_selected').removeClass('card_front_selected');
                    $('.card_back_selected').removeClass('card_back_selected');
                    can_click = true;
                }, 1000);

            }
            my_card = null
        }
    }

    function gameReset() {
        $('.card-match-front').removeClass('card-match-front');
        $('.card-match-back').removeClass('card-match-back');
        $('.card_front_selected').removeClass('card_front_selected');
        $('.card_back_selected').removeClass('card_back_selected');
        my_card = null
        successful_attempts = 0;
        attempts = 0;
        accuracy = 0;
        $('.attempts').html('000')
        $('.accuracy').html('100%')
        $('.time').html('0:0:0')
        $(".card").hide('slow');
        $(".start_game").show('slow');
        $('.game-area').html('');
        timeArray = [0, 0, 0]
        timeStart = false;
        game_board();
    }

    function game_start() {
        $(".start_game").hide('slow');
        $(".card").show('slow');
        timeStart = true;
    }

    setInterval(function startTime() {
        if (timeStart)
            timeArray[2]++;
        //if seconds > 59 increments minutes by 1
        if (timeArray[2] > 59) {
            timeArray[1]++;
            timeArray[2] = 0;
            //if minutes > 59 increments hours by 1
            if (timeArray[1] > 59) {
                timeArray[0]++;
                timeArray[1] = 0;
            }
        }
        //updates timer on webpage
        $('.time').html(timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2])
            //recalls this function in 1 sec
    }, 1000);