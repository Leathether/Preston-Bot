# imports the PDF reader
import PyPDF2


# this is to read the pdf file that is passed through it.
# this is a fucntion, so it is reuseable code.
# This has linear time complexity for each character in the pdf text.


# All of this has to be in the RAM, so it might need some rework.
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

# this currently has 2 documents
syllabusText = readPdf("Syllabus.pdf")
calenderText = readPdf('calender.pdf')