define(['jquery', 'base/js/dialog', 'base/js/namespace'],function($, dialog, IPython){
    "use strict"




    function notif(text){
        $('#semp').remove()
        var div  = $('<div/>');
        $('body').append(div);
        var yes = $('<button/>').addClass('btn btn-default btn-xs').text('Yes').css('float','right')
        var no = $('<button/>').addClass('btn btn-default btn-xs').text('Not for now').css('float','right')
        var later = $('<button/>').addClass('btn btn-default btn-xs').text('Ask Me Later').css('float','right')
        var info = $('<button/>').addClass('btn btn-default btn-xs').text('More Info').css('float','right')
        div.append($('<p/>')
                    .text(text)
                    .css('display','inline')
                    .css('margin','4px')
                )

        div.append(  yes.css('display', 'inline').css('margin-left', '3px').click(function(){div.slideUp('slow'); set_consent(true)}))
        div.append(   no.css('display', 'inline').css('margin-left', '3px').click(function(){div.slideUp('slow'); set_consent(false)}))
        div.append(later.css('display', 'inline').css('margin-left', '3px').click(function(){div.slideUp('slow')}))
        div.append( info.css('display', 'inline').css('margin-left', '3px').click(function(){div.slideUp('slow')}))

        div.css('position','absolute')
        .attr('id', 'semp') 
        .css('top', 0)
        .css('opacity', 0)
        .css('transition','opacity')
        .css('transition-duration','0.7s')
        .css('width', '100%')
        .css('padding', '5px')
        .css('z-index','2000')
        .css('color', 'white')
        .css('background-color', '#03C9A9CC');

        setTimeout(function(){
            div.css('opacity', 0.95), 100})

    }
        

//    var clear_all_cells_restart = {
//        help: 'Clear all cells and restart kernel without confirmations',
//        icon : 'fa-car',
//        help_index : '',
//        handler : function (env) {
//            var on_success = undefined;
//            var on_error = undefined;
//            env.notebook.clear_all_output();
//            env.notebook.kernel.restart(on_success, on_error);
//            // env.notebook.execute_all_cells();A
//            // setTimeout( function(){....}, 2000)
//        }
//    }
//
    function set_consent(value){
        var settings = {
                url : '/sempervirens/consent',
                processData : false,
                type : "PUT",
                data: JSON.stringify({'consent':value}),
                dataType: "json",
                contentType: 'application/json',
        };
        $.ajax(settings)
    }

    window.set_consent = set_consent;

    function _on_load(){

        console.log('[Telemetry] evergreen loaded')
        var show_dialog  = function(data){
            if(!data.need_asking){
                console.log('user has already responded:', data.has_accepted, data)
                return
            }
            // var div = $('<div/>').append(
            //     $('<p/>').text(data.short_text)
            // )
            notif(data.short_text)
            //dialog.modal({
            //        body: div ,
            //        title: 'Anonymous data contribution',
            //        buttons: {
            //                  'Ask me later':{},
            //                  'No':{click: function(){set_consent(false)}},
            //                  'Ok':{class:'btn-primary',
            //                        click: function(){set_consent(true)}
            //                    },

            //            },
            //        notebook:IPython.notebook,
            //        keyboard_manager: (IPython.notebook||{}).keyboard_manager,
            //    })
        }

        var settings = {
                url : '/sempervirens/consent',
                processData : false,
                type : "GET",
                dataType: "json",
                contentType: 'application/json',
        };
        $.ajax(settings)
          .done(show_dialog)


    }
    
    return {load_ipython_extension: _on_load, 
            set_consent: set_consent};
})
