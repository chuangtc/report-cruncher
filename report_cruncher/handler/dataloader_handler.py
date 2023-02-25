import os
import tempfile

from flask import Blueprint, Response, json, request
from report_cruncher.constants import API_ERROR_NO_FILE_FOUND, API_ERROR_UNSUPPORTED_FILE_FOUND
from report_cruncher.helper.api_types import create_error_return
from werkzeug.utils import secure_filename

import PyPDF2

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
        read_pdf(file)
        # make call to openAI
        # get the embadding
        # store the embadding into radis
        payload = {"success": True}
        response = Response(
            response=json.dumps(payload), status=200, mimetype="application/json"
        )
    return response

# file = open('IBROHIM_ABDIVOKHIDOV_CV.pdf', 'rb')


def clear_text(text):
    text = text.replace('•', '')
    text = text.replace('_', '')
    text = text.replace('-', '')
    text = text.replace('—', '')

    return text


def read_pdf(file):
    pdfReader = PyPDF2.PdfReader(file)

    pages = len(pdfReader.pages)

    for i in range(pages):
        
        page = pdfReader.pages[i]
        print("Page\n", i)
        
        t = page.extract_text()
        c = clear_text(t)

        print('Content\n', c)

        return c

