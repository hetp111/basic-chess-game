$(function () {
    $(document).on('submit', '#userNameForm', function (event) {
        event.preventDefault();
        socket.emit('submitName', {
            name: $('#userNameInput').val(),
        });
        $('#userName').text('Hi ' + $('#userNameInput').val());
        $('#userNameForm').hide();
        $('#userNameInput').val('');
    });
    socket.on('roomDetail', (roomData) => {
        // $('#onlinePlayers').html('');
        // roomData.users.forEach(user => {
        //     $('#onlinePlayers')
        //         .append($('<li class="list-group-item" id="' + user.id + '">')
        //             .html('<button type="button" data-room="' + user.room + '" class="btn btn-primary btn-sm joinGameRequest">' + user.name + '</button>'));
        // });
        console.log(roomData);
        $('#onlinePlayers')
                .append($('<li class="list-group-item" id="' + roomData.users[roomData.users.length-1].id + '">')
                    .html('<button type="button" data-room="' + roomData.users[roomData.users.length-1].room + '" class="btn btn-primary btn-sm joinGameRequest">' + roomData.users[roomData.users.length-1].name + '</button>'));

    });

    socket.on('existingUsers', (userData) => {
        $('#onlinePlayers').html('');
        userData.users.forEach(user => {
            if (userData.currentUserId != user.id) {
                $('#onlinePlayers')
                    .append($('<li class="list-group-item" id="' + user.id + '">')
                        .html('<button type="button" data-room="' + user.room + '" class="btn btn-primary btn-sm joinGameRequest">' + user.name + '</button>'));
            }
        });
    });

    socket.on('joinRequestRecieved', (userData) => {
        //console.log(userData);
        $('.notification')
            .html('<div class="alert alert-success">Recieved a game request from <strong>' + userData.name + '</strong>. <button data-room="' + userData.room + '" class="btn btn-primary btn-sm acceptGameRequest">Accept</button></div>')
    });

    $(document).on('click', '.joinGameRequest', function () {
        socket.emit('sendJoinRequest', {
            room: $(this).data('room')
        });
        $('.notification').html('<div class="alert alert-success">Game request sent.</div>');
    });

    $(document).on('click', '.acceptGameRequest', function () {

        socket.emit('acceptGameRequest', {
            room: $(this).data('room')
        });
        $('.notification')
            .html('<div class="alert alert-success">Please wait for game initialize from host.</div>');
    });

    socket.on('gameRequestAccepted', (userData) => {
        //console.log(userData);
        $('.notification')
            .html('<div class="alert alert-success">Game request accepted from <strong>' + userData.name + '</strong>.</div>');
        $('.notification')
            .append($('<div class="text-center">'))
            .append('Choose rotation. <button data-room="' + userData.room + '" data-color="black" type="button" class="btn btn-primary btn-sm setOrientation">Black</button> or <button data-room="' + userData.room + '" data-color="white" type="button" class="btn btn-primary btn-sm setOrientation">White</button>');

        $('#onlinePlayers li#' + userData.id).addClass('active');
    });

    socket.on('opponentDisconnect', function () {
        $('.notification')
            .html('<div class="alert alert-success">Opponent left the room</div>');
        board.reset();
        chess.reset();
    })





}(jQuery));