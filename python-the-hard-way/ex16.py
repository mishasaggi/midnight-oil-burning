# list of file commands
# close
# read - reads the contents of the file and assigns to var
# readline - reads just one line of a text file
# write('thing') - writes 'thing' to the file
# truncate - empties the file

from sys import argv

script, filename = argv

print "We're going to erase %r " % filename
print "If you don't want that, hit ctrl-c."
print "If you do want that, hit return."

raw_input("?")

print "Opening the file..."
target = open(filename, 'w')

print "Truncating the file. Goodbye!"
target.truncate()

print "Now I'm going to ask you for three lines."

line1 = raw_input("line1: ")
line2 = raw_input("line2: ")
line3 = raw_input("line3: ")

print "I'm going to write these to the file."

target.write(line1)
target.write("\n")
target.write(line2)
target.write("\n")
target.write(line3)
target.write("\n")

print "And finally, we close the file."
target.close()
