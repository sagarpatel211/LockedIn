import kfp
from kfp import dsl
import subprocess

@dsl.pipeline(
    name="LinkedIn Sanity Kubeflow Pipeline",
    description="A sample pipeline to train a NLP model and deploy it"
)
def linkedin_sanity_pipeline():
    @dsl.ContainerOp(
        name="Train Model",
        image="python:3.9-slim",
        command=["sh", "-c"],
        arguments=[
            "pip install --no-cache-dir -r ml-model/requirements.txt && "
            "jupyter nbconvert --to notebook --execute ml-model/train_model.ipynb --output ml-model/output.ipynb && "
            "python mlops/mlflow_tracking.py"
        ],
        file_outputs={}
    )
    def train_model_step():
        pass

if __name__ == "__main__":
    kfp.compiler.Compiler().compile(linkedin_sanity_pipeline, "linkedin_sanity_pipeline.yaml")
