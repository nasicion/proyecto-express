$(document).ready(function() {
    $('input[type=checkbox]').click(function(evento) {
        console.log('marca');
        // Busco el id del elemento clickeado
        var id = evento.currentTarget.id;
        // Veo si esta completado o no
        var completada = evento.currentTarget.checked;

        // Hago un request AJAX para informar que fue completado o no
        $.ajax('/' + id + '/completado', {
            data: JSON.stringify({completada: completada}),
            type : 'POST',
            contentType : 'application/json',
            success : function(data){console.log(data)}
        });

        // Obtengo el valor de pendientes actual
        var pendientes = parseInt($('.pending-task-count').html());
        // le resto o agrego uno
        pendientes += (completada)?-1:1;
        // Actualizo el elemento
        $('.pending-task-count').html(pendientes);
    });

    $('.delete-button').click(function(evento) {
        var id = $(this).attr('data');
        var element = $(this);
         $.ajax('/' + id + '/borrar', {
            type : 'DELETE',
            success : function(data) {
                if(data === 'ok') {
                    location.reload();
                }
            }
        });
    });
});
