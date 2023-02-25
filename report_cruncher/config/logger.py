import logging.config

import structlog
from gunicorn import glogging
from structlog.types import EventDict

from report_cruncher import constants
from report_cruncher.constants import LOG_TIMESTAMP_FORMAT


def add_app_name(
    logger: logging.Logger, method_name: str, event_dict: EventDict
) -> EventDict:
    event_dict["app"] = constants.APPLICATION_NAME
    return event_dict


def prepare_logging_config(min_log_level: int) -> dict:
    timestamp_processor = structlog.processors.TimeStamper(fmt=LOG_TIMESTAMP_FORMAT)
    processors = [
        structlog.stdlib.add_log_level,
        add_app_name,
        timestamp_processor,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.StackInfoRenderer(),
        structlog.dev.set_exc_info,
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.processors.JSONRenderer(sort_keys=True),
    ]
    structlog.configure(
        processors=processors,
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        wrapper_class=structlog.make_filtering_bound_logger(min_log_level),
        cache_logger_on_first_use=True,
    )

    pre_chain = [add_app_name, structlog.stdlib.add_log_level, timestamp_processor]

    return {
        "version": 1,
        "disable_existing_loggers": True,
        "formatters": {
            "json_formatter": {
                "()": structlog.stdlib.ProcessorFormatter,
                "processor": structlog.processors.JSONRenderer(sort_keys=True),
                "foreign_pre_chain": pre_chain,
            },
        },
        "handlers": {
            "error_console": {
                "class": "logging.StreamHandler",
                "formatter": "json_formatter",
            },
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "json_formatter",
            },
        },
        "loggers": {
            "gunicorn.access": {
                "propagate": True,
            },
            "gunicorn.error": {
                "propagate": True,
            },
        },
        "root": {
            "level": "INFO",
            "handlers": ["console"],
        },
    }


class GunicornLogger(glogging.Logger):
    def setup(self, cfg):
        logging.config.dictConfig(prepare_logging_config(logging.ERROR))
