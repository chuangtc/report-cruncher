from report_cruncher import wsgi


if __name__ == "__main__":
    wsgi.app.run(debug=False, port=1234)
