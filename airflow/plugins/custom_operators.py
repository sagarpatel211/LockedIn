from airflow.models import BaseOperator
from airflow.utils.decorators import apply_defaults
import onnxruntime as ort

class FilterBragPostsOperator(BaseOperator):
    @apply_defaults
    def __init__(self, model_path, *args, **kwargs):
        super(FilterBragPostsOperator, self).__init__(*args, **kwargs)
        self.model_path = model_path

    def execute(self, context):
        # Retrieve posts from previous task via XCom.
        posts = context['ti'].xcom_pull(task_ids='fetch_data', key='posts')
        if not posts:
            self.log.info("No posts found to filter")
            return

        # Load the ONNX model.
        try:
            session = ort.InferenceSession(self.model_path)
            self.log.info("ONNX model loaded successfully.")
        except Exception as e:
            self.log.error(f"Failed to load model: {e}")
            return

        # Dummy filtering: if a post’s content contains the word "brag", consider it as brag post.
        filtered_posts = []
        for post in posts:
            if "brag" in post['content'].lower():
                self.log.info(f"Filtering out post: {post}")
            else:
                filtered_posts.append(post)

        self.log.info(f"Posts after filtering: {filtered_posts}")
        context['ti'].xcom_push(key='filtered_posts', value=filtered_posts)
