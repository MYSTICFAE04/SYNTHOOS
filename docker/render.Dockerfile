FROM langflowai/langflow:latest

USER root

ENV PYTHONUNBUFFERED=1

ENTRYPOINT ["python", "-m", "langflow", "run"]
