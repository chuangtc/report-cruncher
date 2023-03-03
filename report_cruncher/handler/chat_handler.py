from flask import Blueprint, Response, json, request

from report_cruncher.helper.embed_text import execute_question
from report_cruncher.helper.pdf_reader import read_from_txt

chat_blueprint = Blueprint("chat", __name__)


@chat_blueprint.route("/v1/chat", methods=["POST"])
def dataloader() -> Response:
    # // load post body
    data = request.get_json()
    question = data.get("question", None)
    if (question is None):
        payload = {"success": False, "Issue": "Missing question"}
        response = Response(
            response=json.dumps(payload), status=422, mimetype="application/json"
        )
        return response
    context = read_from_txt('finance.txt')
    _text = execute_question(context, question)

    # store the completion text into radis

    payload = {"success": True, "question": question, "text": _text}
    response = Response(
        response=json.dumps(payload), status=200, mimetype="application/json"
    )

    return response
