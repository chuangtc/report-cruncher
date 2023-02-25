from prometheus_client import Gauge, Counter

IN_PROGRESS = Gauge(
    "in_progress_requests", "in progress gauge", multiprocess_mode="livesum"
)
NUM_HEALTH_REQUESTS = Counter("num_health_requests", "number of health requests")
