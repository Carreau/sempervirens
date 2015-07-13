define(['jquery', 'base/js/dialog', 'base/js/namespace'],function($, dialog, IPython){
    "use strict"


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

    function _on_load(){

        console.log('[Telemetry] evergreen loaded')
        var show_dialog  = function(data){
            if(!data.need_asking){
                console.log('user has already responded:', data.has_accepted, data)
                return
            }
            var div = $('<div/>').append(
                $('<p/>').text(data.short_text)
            )
            dialog.modal({
                    body: div ,
                    title: 'Anonymous data contribution',
                    buttons: {
                              'Ask me later':{},
                              'No':{click: function(){set_consent(false)}},
                              'Ok':{class:'btn-primary',
                                    click: function(){set_consent(true)}
                                },

                        },
                    notebook:IPython.notebook,
                    keyboard_manager: IPython.notebook.keyboard_manager,
                })
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
    
    return {load_ipython_extension: _on_load };
})
