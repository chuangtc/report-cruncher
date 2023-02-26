import PyPDF2


def read_pdf(file):
    text_array = []

    pdfReader = PyPDF2.PdfReader(file)

    pages = len(pdfReader.pages)

    for i in range(pages):
        
        page = pdfReader.pages[i]
        
        text_array.append(page.extractText())

        return text_array