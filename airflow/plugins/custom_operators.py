from airflow.models import BaseOperator
from airflow.utils.decorators import apply_defaults
import subprocess

class NLPTrainingOperator(BaseOperator):
    """
    Custom operator to run the NLP model training script.
    """
    @apply_defaults
    def __init__(self, script_path, *args, **kwargs):
        super(NLPTrainingOperator, self).__init__(*args, **kwargs)
        self.script_path = script_path

    def execute(self, context):
        self.log.info("Starting NLP training using script: %s", self.script_path)
        try:
            subprocess.check_call(['python3', self.script_path])
        except Exception as e:
            self.log.error("Error during NLP training: %s", e)
            raise e
        self.log.info("NLP training completed successfully.")
