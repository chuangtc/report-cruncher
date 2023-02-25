FROM python:3.9-slim-bullseye

ENV HOME=/usr/local/lib

# Update the system
RUN apt-get update && apt-get install -y curl \
    && curl -sSL https://install.python-poetry.org | POETRY_HOME=/etc/poetry python3 - \
    && rm -rf /var/lib/apt/lists/*

# Env for poetry
ENV PATH=/etc/poetry/bin:$PATH
ENV POETRY_VIRTUALENVS_CREATE=false
ENV PROMETHEUS_MULTIPROC_DIR=/tmp/report-cruncher-metrics-tmp

# Prepare necessary dirs
RUN mkdir -p $PROMETHEUS_MULTIPROC_DIR

# Copy the application files
COPY ./ /app
WORKDIR /app

# Install dependencies
RUN poetry install

# Check testing
# RUN cd tests && coverage run -m pytest ./

# Create non root user
RUN groupadd -g 998 app_user
RUN useradd app_user -u 999 -g 998

RUN chown -R app_user:app_user $PROMETHEUS_MULTIPROC_DIR
RUN chown -R app_user:app_user /app
RUN chmod +x /app/run.sh

USER 999
EXPOSE 8000

ENTRYPOINT ["/app/run.sh"]
