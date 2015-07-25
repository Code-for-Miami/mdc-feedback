# -*- coding: utf-8 -*-
"""The app module, containing the app factory function."""
import logging

from flask import Flask, render_template

from feedback.settings import ProductionConfig, DevelopmentConfig
from feedback.assets import assets
from feedback.extensions import (
    db,
    login_manager,
    migrate,
    debug_toolbar,
    cache
)
# from feedback.utils import thispage

from feedback import public, user, dashboard

def create_app(config_object=ProductionConfig):
    """An application factory, as explained here:
        http://flask.pocoo.org/docs/patterns/appfactories/
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_extensions(app)
    register_blueprints(app)
    register_errorhandlers(app)

    '''
    @app.before_first_request
    def before_first_request():
        if app.debug and not app.testing:
            # log to console for dev
            app.logger.setLevel(logging.DEBUG)
        elif app.testing:
            # disable logging output
            app.logger.setLevel(logging.CRITICAL)
        else:
            # for heroku, just send everything to the console (instead of a file)
            # and it will forward automatically to the logging service

            stdout = logging.StreamHandler(sys.stdout)
            stdout.setFormatter(logging.Formatter(
                '%(asctime)s | %(name)s | %(levelname)s in %(module)s [%(pathname)s:%(lineno)d]: %(message)s'
            ))
            app.logger.addHandler(stdout)
            app.logger.setLevel(logging.DEBUG)

            # log to a file. this is commented out for heroku deploy, but kept
            # in case we need it later

            # file_handler = logging.handlers.RotatingFileHandler(log_file(app), 'a', 10000000, 10)
            # file_handler.setFormatter(logging.Formatter(
            #     '%(asctime)s | %(name)s | %(levelname)s in %(module)s [%(pathname)s:%(lineno)d]: %(message)s')
            # )
            # app.logger.addHandler(file_handler)
            # app.logger.setLevel(logging.DEBUG)

        app.logger.info("app config before_first_request: %s", app.config)
        '''

    return app

def register_extensions(app):
    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    assets.init_app(app)
    cache.init_app(app)
    debug_toolbar.init_app(app)
    return None

def register_blueprints(app):
    app.register_blueprint(public.views.blueprint)
    app.register_blueprint(user.views.blueprint)
    app.register_blueprint(dashboard.views.blueprint)
    # app.jinja_env.globals['thispage'] = thispage
    return None

def register_errorhandlers(app):
    def render_error(error):
        # If a HTTPException, pull the `code` attribute; default to 500
        error_code = getattr(error, 'code', 500)

        # app.logger.exception(error)

        return render_template("{0}.html".format(error_code))

    for errcode in [401, 404, 500]:
        app.errorhandler(errcode)(render_error)
    return None
