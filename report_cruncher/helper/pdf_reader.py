import PyPDF2


def write_to_txt(filename, data) -> None:
    try:
        with open(filename, "w") as f:
            f.write(data)
    except Exception as e:
        print(e)

def read_from_txt(filename) -> str:
    try:
        with open(filename, "r") as f:
            return f.read()
    except Exception as e:
        print(e)
def read_pdf(file) -> str:
    _data = ""

    pdfReader = PyPDF2.PdfReader(file)

    pages = len(pdfReader.pages)

    for i in range(pages):

        page = pdfReader.pages[i]

        t = page.extract_text()

        _data += t

    write_to_txt("finance.txt", _data)

    return _data
