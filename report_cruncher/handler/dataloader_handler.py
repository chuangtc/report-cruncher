import os
import tempfile

from flask import Blueprint, Response, json, request
from report_cruncher.constants import API_ERROR_NO_FILE_FOUND, API_ERROR_UNSUPPORTED_FILE_FOUND
from report_cruncher.helper.api_types import create_error_return
from werkzeug.utils import secure_filename

from openai.embed_text import execute
from reader.pdf_reader import read_pdf

dataloader_blueprint = Blueprint("dataloader", __name__)


@dataloader_blueprint.route("/v1/dataloader", methods=["POST"])
def dataloader() -> Response:
    mimetype = "application/json"
    if "file" not in request.files:
        return Response(
            response=json.dumps(
                create_error_return(
                    API_ERROR_NO_FILE_FOUND,
                    "no file was found in the file param for the datalouder",
                )
            ),
            status=400,
            mimetype=mimetype,
        )
    file = request.files["file"]
    if file.filename.rsplit(".", 1)[1].lower() not in ["pdf"]:
        return Response(
            response=json.dumps(
                create_error_return(
                    API_ERROR_UNSUPPORTED_FILE_FOUND,
                    "the given file type is currently not supported for datalouder",
                )
            ),
            status=400,
            mimetype=mimetype,
        )
    with tempfile.TemporaryDirectory() as temp_dir:
        file_path = os.path.join(temp_dir, secure_filename(file.filename))
        file.save(file_path)
        
        # extract information from PDF
        exracted_text = read_pdf(file_path)

        # make call to openAI
        # get the embadding
        _em = execute(exracted_text)
        
        # store the embadding into radis
        

        payload = {"success": True}
        response = Response(
            response=json.dumps(payload), status=200, mimetype="application/json"
        )
    return response
