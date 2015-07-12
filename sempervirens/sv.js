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
                    title: 'SciPy 2015',
                    buttons: {'Ok':{class:'btn-primary',
                                    click: function(){}
                                },
                              'Nop':{}
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
            $.ajax(settings).
                done(function(data){console.log(data); show_dialog(data)})

//        var internal_name = IPython.keyboard_manager.actions.register(clear_all_cells_restart, 'clear-and-restart' , 'scipy-2015')
//        IPython.keyboard_manager.command_shortcuts.remove_shortcut('0,0')
//        IPython.keyboard_manager.command_shortcuts.add_shortcut('0,0,0', internal_name)
//        IPython.toolbar.add_buttons_group([internal_name,'ipython.restart-kernel'])

    }
    
    return {load_ipython_extension: _on_load };
})
