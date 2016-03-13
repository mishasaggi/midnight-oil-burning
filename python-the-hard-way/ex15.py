# use argv or raw_input to ask the user what file to 
# open instead of "hard coding" the file's name.

from sys import argv

script, filename = argv
#makes a file object
txt = open(filename)

print "Here's your file %r:" %filename
print txt.read()

print "Type the filename again:"

file_again = raw_input("> ")

txt_again = open(file_again)

print txt_again.read()

# It's important to close files when you are done with them.
txt.close()

txt_again.close()

# run with python ex15.py ex14.py
