from flask import Blueprint, Response, json

chat_blueprint = Blueprint("chat", __name__)


@chat_blueprint.route("/v1/chat", methods=["GET"])
def chat() -> Response:
    payload = {"success": True}
    response = Response(
        response=json.dumps(payload), status=200, mimetype="application/json"
    )
    return response
