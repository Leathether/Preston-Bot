import PyPDF2


# this is to read the pdf file that is passed through it.
def readPdf(name):
    pdfFile = PyPDF2.PdfReader(name)

    words = ""

    for i in pdfFile.pages:
        words += i.extract_text()


    words = words.split("\n")

    text = ""

    for i in words:
        text += i  + " "

    return text


syllabusText = readPdf("Syllabus.pdf")
calenderText = readPdf('calender.pdf')