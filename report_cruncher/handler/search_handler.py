from flask import Blueprint, Response, json, request

search_blueprint = Blueprint("search", __name__)


@search_blueprint.route("/v1/search", methods=["GET"])
def search() -> Response:
    query = request.args.get("query")
    payload = {"success": True, "query": query}
    response = Response(
        response=json.dumps(payload), status=200, mimetype="application/json"
    )
    return response
