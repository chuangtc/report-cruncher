import os
import tempfile

from flask import Blueprint, Response, json, request
from report_cruncher.constants import API_ERROR_NO_FILE_FOUND, API_ERROR_UNSUPPORTED_FILE_FOUND
from report_cruncher.helper.api_types import create_error_return
from werkzeug.utils import secure_filename

from report_cruncher.helper.embed_text import execute, execute_question
from report_cruncher.helper.pdf_reader import read_pdf

chat_blueprint = Blueprint("chat", __name__)


@chat_blueprint.route("/v1/chat", methods=["POST"])
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
    question = request.values.get("question",None)
    if (question is None):
        payload = {"success": False, "Issue" : "Missing question"}
        response = Response(
            response=json.dumps(payload), status=422, mimetype="application/json"
        )
        return response

    
    with tempfile.TemporaryDirectory() as temp_dir:
        file_path = os.path.join(temp_dir, secure_filename(file.filename))
        file.save(file_path)

        # extract information from PDF
        extracted_text = read_pdf(file_path)

        
        # get the answer from article and question
        _text = execute_question(extracted_text,question)
        
        # store the completion text into radis     

        payload = {"success": True, "question": question,"text": _text}
        response = Response(
            response=json.dumps(payload), status=200, mimetype="application/json"
        )
    return response
