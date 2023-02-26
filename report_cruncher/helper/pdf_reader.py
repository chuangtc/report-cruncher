import PyPDF2


def read_pdf(file):
    pdfReader = PyPDF2.PdfReader(file)

    pages = len(pdfReader.pages)

    for i in range(pages):
        
        page = pdfReader.pages[i]
        
        t = page.extract_text()

        return t