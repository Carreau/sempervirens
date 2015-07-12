import json
from tornado import web
from notebook.base.handlers import APIHandler, json_errors
from IPython.html.utils import url_path_join as ujoin
import sempervirens as sv


class ConsentHandler(APIHandler):
    SUPPORTED_METHODS = ('GET', 'PUT')

    @web.authenticated
    @json_errors
    def get(self, name):
        self.finish(json.dumps({
            'name': sv.has_accepted(), 
            'short_text': sv.short_text()
            }))

    @web.authenticated
    @json_errors
    def put(self, consent):
        self.finish(sv.consent(consent))

def load_jupyter_server_extension(nbapp):
    nbapp.log.critical('Sempervirens Extension loaded')

    webapp = nbapp.web_app
    base_url = webapp.settings['base_url']
    webapp.add_handlers(".*$", [
        (ujoin(base_url, r"/Sempervirens/consent"), ConsentHandler),
    ])
